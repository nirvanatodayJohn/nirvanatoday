const domain = `${process.env.SHOPIFY_SHOP}.myshopify.com`;
const endpoint = `https://${domain}/api/2024-01/graphql.json`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

type ShopifyFetchArgs = {
  query: string;
  variables?: Record<string, any>;
  cache?: RequestCache;
};

async function shopifyFetch<T>({ query, variables, cache = "force-cache" }: ShopifyFetchArgs): Promise<{ status: number; body: T }> {
  if (!key) {
    throw new Error("SHOPIFY_STOREFRONT_ACCESS_TOKEN is not set in environment variables.");
  }

  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": key,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      cache,
      // next: { revalidate: 900 }, // 15 mins
    });

    return {
      status: result.status,
      body: await result.json(),
    };
  } catch (e) {
    console.error("Error fetching from Shopify:", e);
    throw {
      error: e,
      query,
    };
  }
}

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  category: string;
  price: string;
  compareAtPrice?: string;
  image: string;
  badge?: string;
  availableForSale: boolean;
};

export type Article = {
  id: string;
  title: string;
  handle: string;
  excerpt: string;
  contentHtml: string;
  publishedAt: string;
  author: string;
  image: string;
  tags: string[];
};

const productFragment = `
  fragment product on Product {
    id
    title
    handle
    description
    availableForSale
    productType
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      edges {
        node {
          url
          altText
        }
      }
    }
    tags
    collections(first: 10) {
      edges {
        node {
          title
          handle
        }
      }
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

export async function getProducts(): Promise<Product[]> {
  const query = `
    query getProducts {
      products(first: 50) {
        edges {
          node {
            ...product
          }
        }
      }
    }
    ${productFragment}
  `;

  const res = await shopifyFetch<any>({ query });

  return res.body.data.products.edges.map((edge: any) => {
    const node = edge.node;
    const price = node.priceRange.minVariantPrice;
    const compareAt = node.compareAtPriceRange?.minVariantPrice;

    return {
      id: node.id,
      handle: node.handle,
      title: node.title,
      description: node.description,
      category: node.productType || "Product", // Fallback for empty Shopify Product Type
      price: new Intl.NumberFormat("en-IN", { // Updated to en-IN for Rupee formatting
        style: "currency",
        currency: price.currencyCode,
      }).format(price.amount),
      compareAtPrice: compareAt && compareAt.amount > 0 ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: compareAt.currencyCode,
      }).format(compareAt.amount) : undefined,
      image: node.images.edges[0]?.node.url ,
      badge: node.tags.find((tag: string) => tag.toLowerCase().includes("support") || tag.toLowerCase().includes("focus")) || "",
      availableForSale: node.availableForSale,
    };
  });
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        ...product
      }
    }
    ${productFragment}
  `;

  const res = await shopifyFetch<any>({
    query,
    variables: { handle },
  });

  const node = res.body.data.product;
  if (!node) return null;

  const price = node.priceRange.minVariantPrice;
  const compareAt = node.compareAtPriceRange?.minVariantPrice;

  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description,
    category: node.productType || "Product", // Fallback for empty Shopify Product Type
    price: new Intl.NumberFormat("en-IN", { // Updated to en-IN for Rupee formatting
      style: "currency",
      currency: price.currencyCode,
    }).format(price.amount),
    compareAtPrice: compareAt && compareAt.amount > 0 ? new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: compareAt.currencyCode,
    }).format(compareAt.amount) : undefined,
    image: node.images.edges[0]?.node.url || "https://cdn.shopify.com/s/files/1/0753/2635/7667/files/Gummies.png", // Fallback image
    badge: node.tags.find((tag: string) => tag.toLowerCase().includes("support") || tag.toLowerCase().includes("focus")) || "",
    availableForSale: node.availableForSale,
  };
}

const articleFragment = `
  fragment article on Article {
    id
    title
    handle
    excerpt
    contentHtml
    publishedAt
    authorV2 {
      name
    }
    image {
      url
      altText
    }
    tags
  }
`;

export type PaginatedArticles = {
  articles: Article[];
  totalArticles: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export async function getArticles(page: number = 1, pageSize: number = 9): Promise<PaginatedArticles> {
  // First, we fetch all article cursors to calculate total and map to pages (up to 250)
  // Storefront doesn't have offset, so we need cursors to jump to Page X.
  const query = `
    query getArticles {
      blogByHandle(handle: "blogs") {
        articles(first: 250, sortKey: PUBLISHED_AT, reverse: true) {
          edges {
            cursor
            node {
              ...article
            }
          }
        }
      }
    }
    ${articleFragment}
  `;

  const res = await shopifyFetch<any>({ 
    query, 
    cache: "no-store" 
  });

  if (!res.body?.data || !res.body.data.blogByHandle) {
    return { articles: [], totalArticles: 0, hasNextPage: false, hasPreviousPage: false };
  }

  const allEdges = res.body.data.blogByHandle.articles.edges;
  const totalArticles = allEdges.length;

  // Calculate the slice for the requested page
  const startIdx = (page - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const pagedEdges = allEdges.slice(startIdx, endIdx);

  const articles = pagedEdges.map((edge: any) => {
    const node = edge.node;
    return {
      id: node.id,
      title: node.title,
      handle: node.handle,
      excerpt: node.excerpt || "",
      contentHtml: node.contentHtml,
      publishedAt: node.publishedAt,
      author: node.authorV2?.name || "Nirvana Today Team",
      image: node.image?.url || "https://cdn.shopify.com/s/files/1/0753/2635/7667/files/Gummies.png",
      tags: node.tags,
    };
  });

  return {
    articles,
    totalArticles,
    hasNextPage: endIdx < totalArticles,
    hasPreviousPage: page > 1
  };
}

export async function getArticleByHandle(handle: string): Promise<Article | null> {
  const query = `
    query getArticle($handle: String!) {
      blogByHandle(handle: "blogs") {
        articleByHandle(handle: $handle) {
          ...article
        }
      }
    }
    ${articleFragment}
  `;

  const res = await shopifyFetch<any>({
    query,
    variables: { handle },
    cache: "no-store",
  });

  if (!res.body?.data) {
    console.error("❌ Shopify getArticleByHandle Error:", JSON.stringify(res.body));
    return null;
  }

  const node = res.body.data.blogByHandle?.articleByHandle;
  if (!node) return null;

  return {
    id: node.id,
    title: node.title,
    handle: node.handle,
    excerpt: node.excerpt || "",
    contentHtml: node.contentHtml,
    publishedAt: node.publishedAt,
    author: node.authorV2?.name || "Nirvana Today Team",
    image: node.image?.url || "https://cdn.shopify.com/s/files/1/0753/2635/7667/files/Gummies.png",
    tags: node.tags,
  };
}

/**
 * 🔐 CUSTOMER AUTHENTICATION
 */

export async function createCustomer(email: string, password: string, firstName: string = "", lastName: string = "") {
  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const res = await shopifyFetch<any>({
    query,
    variables: { 
      input: { email, password, firstName, lastName } 
    },
    cache: "no-store",
  });

  return res.body.data.customerCreate;
}

export async function createAccessToken(email: string, password: string) {
  const query = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const res = await shopifyFetch<any>({
    query,
    variables: { 
      input: { email, password } 
    },
    cache: "no-store",
  });

  return res.body.data.customerAccessTokenCreate;
}

export async function getCustomer(accessToken: string) {
  const query = `
    query getCustomer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        firstName
        lastName
        email
        phone
        defaultAddress {
          address1
          city
          country
        }
        orders(first: 10) {
          edges {
            node {
              id
              orderNumber
              processedAt
              totalPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const res = await shopifyFetch<any>({
    query,
    variables: { customerAccessToken: accessToken },
    cache: "no-store",
  });

  return res.body.data.customer;
}
