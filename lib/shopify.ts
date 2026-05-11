const domain = `${process.env.SHOPIFY_SHOP}.myshopify.com`;
const endpoint = `https://${domain}/api/2024-01/graphql.json`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// ─── Cache Tags ──────────────────────────────────────────────
// These tags let us surgically invalidate specific data via webhook.
// When Shopify sends a webhook, we call revalidateTag("products") or
// revalidateTag("blogs") to bust only that slice of cache.
export const CACHE_TAGS = {
  products: "products",
  blogs: "blogs",
  collections: "collections",
  judgeMeReviews: "judgeme-reviews",
} as const;

const EXCLUDED_TERMS = ["THCA", "Delta 10", "Delta-10"];

function isExcludedProduct(node: any): boolean {
  const title = (node.title || "").toUpperCase();
  const tags = (node.tags || []).map((t: string) => t.toUpperCase());
  const productType = (node.productType || "").toUpperCase();

  return EXCLUDED_TERMS.some(term => {
    const upperTerm = term.toUpperCase();
    return title.includes(upperTerm) || 
           tags.includes(upperTerm) || 
           productType.includes(upperTerm);
  });
}

type ShopifyFetchArgs = {
  query: string;
  variables?: Record<string, any>;
  cache?: RequestCache;
  tags?: string[];
};

async function shopifyFetch<T>({
  query,
  variables,
  cache = "force-cache",
  tags,
}: ShopifyFetchArgs): Promise<{ status: number; body: T }> {
  if (!key) {
    throw new Error(
      "SHOPIFY_STOREFRONT_ACCESS_TOKEN is not set in environment variables."
    );
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
      ...(tags && { next: { tags } }),
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

export type CustomerEmailMarketingSubscribePayload = {
  customer?: {
    id: string;
    email: string;
    emailMarketingConsent?: {
      marketingState: string;
      marketingOptInLevel: string;
    };
  };
  customerUserErrors: {
    field: string[];
    message: string;
    code?: string;
  }[];
};

export async function subscribeEmailMarketing(email: string) {
  const query = `
    mutation customerEmailMarketingSubscribe($email: String!) {
      customerEmailMarketingSubscribe(email: $email) {
        customer {
          id
          email
          emailMarketingConsent {
            marketingState
            marketingOptInLevel
          }
        }
        customerUserErrors {
          field
          message
          code
        }
      }
    }
  `;

  const res = await shopifyFetch<{
    data?: {
      customerEmailMarketingSubscribe?: CustomerEmailMarketingSubscribePayload;
    };
  }>({
    query,
    variables: { email },
    cache: "no-store",
  });

  return res.body.data?.customerEmailMarketingSubscribe ?? null;
}

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  category: string;
  price: string;
  compareAtPrice?: string;
  image: string;
  badge: string;
  tags: string[];
  availableForSale: boolean;
  rating?: number;
  reviewCount?: number;
  reviewWidget?: string;
  shopifyId?: string;
  options: { name: string; values: string[] }[];
  variants: {
    id: string;
    title: string;
    availableForSale: boolean;
    price: string;
    image?: string;
  }[];
};

export type PaginatedProducts = {
  products: Product[];
  totalProducts: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
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
    descriptionHtml
    availableForSale
    productType
    rating: metafield(namespace: "reviews", key: "rating") {
        value
    }
    reviewCount: metafield(namespace: "reviews", key: "rating_count") {
        value
    }
    judgemeRating: metafield(namespace: "judgeme", key: "average_rating") {
        value
    }
    judgemeCount: metafield(namespace: "judgeme", key: "review_count") {
        value
    }
    judgemeWidget: metafield(namespace: "judgeme", key: "widget") {
        value
    }
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
    options {
      name
      values
    }
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
          image {
            url
            altText
          }
          price {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

export async function getProducts(
  page: number = 1,
  pageSize: number = 12
): Promise<PaginatedProducts> {
  const query = `
    query getProducts {
      products(first: 250) {
        edges {
          node {
            ...product
          }
        }
      }
    }
    ${productFragment}
  `;

  const res = await shopifyFetch<any>({
    query,
    tags: [CACHE_TAGS.products],
  });

  if (!res.body?.data) {
    return {
      products: [],
      totalProducts: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    };
  }

  const allEdges = res.body.data.products.edges.filter((edge: any) => !isExcludedProduct(edge.node));
  const totalProducts = allEdges.length;

  const startIdx = (page - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const pagedEdges = allEdges.slice(startIdx, endIdx);

  const products = pagedEdges.map((edge: any) => {
    const node = edge.node;
    const price = node.priceRange.minVariantPrice;
    const compareAt = node.compareAtPriceRange?.minVariantPrice;

    return {
      id: node.variants.edges[0]?.node.id || node.id,
      shopifyId: node.id.split("/").at(-1),
      handle: node.handle,
      title: node.title,
      description: node.description,
      descriptionHtml: node.descriptionHtml,
      category: node.productType || "Product",
      price: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price.amount),
      compareAtPrice:
        compareAt && compareAt.amount > 0
          ? new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(compareAt.amount)
          : undefined,
      image: node.images.edges[0]?.node.url,
      badge:
        node.tags.find(
          (tag: string) =>
            (tag || "").toLowerCase().includes("support") ||
            (tag || "").toLowerCase().includes("focus")
        ) || "",
      tags: node.tags,
      availableForSale: node.availableForSale,
      rating: (() => {
        const val = node.rating?.value || node.judgemeRating?.value;
        if (!val) return undefined;
        try {
          const parsed = JSON.parse(val);
          return typeof parsed === 'object' ? parsed.value : parseFloat(val);
        } catch (e) {
          return parseFloat(val);
        }
      })(),
      reviewCount: (() => {
        const val = node.reviewCount?.value || node.judgemeCount?.value;
        return val ? parseInt(val) : 0;
      })(),
      reviewWidget: node.judgemeWidget?.value || undefined,
      options: node.options || [],
      variants: node.variants.edges.map((v: any) => ({
        id: v.node.id,
        title: v.node.title,
        availableForSale: v.node.availableForSale,
        image: v.node.image?.url,
        price: new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(v.node.price.amount),
      })),
    };
  });

  return {
    products,
    totalProducts,
    hasNextPage: endIdx < totalProducts,
    hasPreviousPage: page > 1,
  };
}

export async function getProductByHandle(
  handle: string
): Promise<Product | null> {
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
    tags: [CACHE_TAGS.products],
  });

  const node = res.body?.data?.product;
  if (!node) {
    console.error(`[Shopify] Product not found for handle: ${handle}`);
    return null;
  }

  const price = node.priceRange.minVariantPrice;
  const compareAt = node.compareAtPriceRange?.minVariantPrice;

  return {
    id: node.variants.edges[0]?.node.id || node.id,
    shopifyId: node.id.split("/").at(-1),
    handle: node.handle,
    title: node.title,
    description: node.description || "",
    descriptionHtml: node.descriptionHtml || node.description || "",
    category: node.productType || "Product",
    price: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.amount),
    compareAtPrice:
      compareAt && compareAt.amount > 0
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(compareAt.amount)
        : undefined,
    image:
      node.images?.edges?.[0]?.node?.url ||
      "https://cdn.shopify.com/s/files/1/0753/2635/7667/files/Gummies.png",
    badge:
      node.tags.find(
        (tag: string) =>
          tag.toLowerCase().includes("support") ||
          tag.toLowerCase().includes("focus")
      ) || "",
    tags: node.tags,
    availableForSale: node.availableForSale,
    rating: (() => {
      const val = node.rating?.value || node.judgemeRating?.value;
      if (!val) return undefined;
      try {
        const parsed = JSON.parse(val);
        return typeof parsed === 'object' ? parsed.value : parseFloat(val);
      } catch (e) {
        return parseFloat(val);
      }
    })(),
    reviewCount: (() => {
      const val = node.reviewCount?.value || node.judgemeCount?.value;
      return val ? parseInt(val) : 0;
    })(),
    reviewWidget: node.judgemeWidget?.value || undefined,
    options: node.options || [],
    variants: node.variants.edges.map((v: any) => ({
      id: v.node.id,
      title: v.node.title,
      availableForSale: v.node.availableForSale,
      image: v.node.image?.url,
      price: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(v.node.price.amount),
    })),
  };
}

export async function getProductsByTag(tag: string): Promise<Product[]> {
  return getProductsByQuery(`tag:${tag}`);
}

export async function getProductsByQuery(queryStr: string): Promise<Product[]> {
  const query = `
    query getProductsByQuery($query: String!) {
      products(first: 50, query: $query) {
        edges {
          node {
            ...product
          }
        }
      }
    }
    ${productFragment}
  `;

  const res = await shopifyFetch<any>({
    query,
    variables: { query: queryStr },
    tags: [CACHE_TAGS.products]
  });

  if (!res.body?.data?.products) return [];

  return res.body.data.products.edges
    .filter((edge: any) => !isExcludedProduct(edge.node))
    .map((edge: any) => {
    const node = edge.node;
    const price = node.priceRange.minVariantPrice;
    const compareAt = node.compareAtPriceRange?.minVariantPrice;

    return {
      id: node.variants.edges[0]?.node.id || node.id,
      shopifyId: node.id.split("/").at(-1),
      handle: node.handle,
      title: node.title,
      description: node.description,
      descriptionHtml: node.descriptionHtml,
      category: node.productType || "Product",
      price: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price.amount),
      compareAtPrice: compareAt && compareAt.amount > 0 ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(compareAt.amount) : undefined,
      image: node.images.edges[0]?.node.url || "",
      badge: node.tags.find((t: string) => (t || "").toLowerCase().includes("support") || (t || "").toLowerCase().includes("focus")) || "",
      tags: node.tags,
      availableForSale: node.availableForSale,
      rating: (() => {
        const val = node.rating?.value || node.judgemeRating?.value;
        if (!val) return undefined;
        try {
          const parsed = JSON.parse(val);
          return typeof parsed === 'object' ? parsed.value : parseFloat(val);
        } catch (e) {
          return parseFloat(val);
        }
      })(),
      reviewCount: (() => {
        const val = node.reviewCount?.value || node.judgemeCount?.value;
        return val ? parseInt(val) : 0;
      })(),
      reviewWidget: node.judgemeWidget?.value || undefined,
      options: node.options || [],
      variants: node.variants.edges.map((v: any) => ({
        id: v.node.id,
        title: v.node.title,
        availableForSale: v.node.availableForSale,
        image: v.node.image?.url,
        price: new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(v.node.price.amount),
      })),
    };
  });
}

export async function getCollectionByHandle(handle: string, cache: RequestCache = "force-cache"): Promise<{ title: string; descriptionHtml: string } | null> {
  const query = `
    query getCollection($handle: String!) {
      collection(handle: $handle) {
        title
        descriptionHtml
      }
    }
  `;

  const res = await shopifyFetch<any>({
    query,
    variables: { handle },
    cache,
    tags: [CACHE_TAGS.collections]
  });

  return res.body.data.collection || null;
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

export async function getArticles(
  page: number = 1,
  pageSize: number = 9
): Promise<PaginatedArticles> {
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
    tags: [CACHE_TAGS.blogs],
  });

  if (!res.body?.data || !res.body.data.blogByHandle) {
    return {
      articles: [],
      totalArticles: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    };
  }

  const allEdges = res.body.data.blogByHandle.articles.edges;
  const totalArticles = allEdges.length;

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
      image:
        node.image?.url ||
        "https://cdn.shopify.com/s/files/1/0753/2635/7667/files/Gummies.png",
      tags: node.tags,
    };
  });

  return {
    articles,
    totalArticles,
    hasNextPage: endIdx < totalArticles,
    hasPreviousPage: page > 1,
  };
}

export async function getArticleByHandle(
  handle: string
): Promise<Article | null> {
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
    tags: [CACHE_TAGS.blogs],
  });

  if (!res.body?.data) {
    console.error(
      "❌ Shopify getArticleByHandle Error:",
      JSON.stringify(res.body)
    );
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
    image:
      node.image?.url ||
      "https://cdn.shopify.com/s/files/1/0753/2635/7667/files/Gummies.png",
    tags: node.tags,
  };
}

/**
 * 🔐 CUSTOMER AUTHENTICATION
 * These mutations are user-specific and MUST NOT be cached.
 */

export async function createCustomer(
  email: string,
  password: string,
  firstName: string = "",
  lastName: string = ""
) {
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
      input: { email, password, firstName, lastName },
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
      input: { email, password },
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

export async function getCustomerPurchasedProductHandles(accessToken: string): Promise<string[]> {
  const query = `
    query getCustomerPurchasedProducts($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        orders(first: 50) {
          edges {
            node {
              lineItems(first: 100) {
                edges {
                  node {
                    variant {
                      product {
                        handle
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await shopifyFetch<any>({
      query,
      variables: { customerAccessToken: accessToken },
      cache: "no-store",
    });

    const orders = res.body?.data?.customer?.orders?.edges || [];
    const handles: string[] = [];

    for (const orderEdge of orders) {
      const lineItems = orderEdge.node?.lineItems?.edges || [];
      for (const itemEdge of lineItems) {
        const handle = itemEdge.node?.variant?.product?.handle;
        if (handle && !handles.includes(handle)) {
          handles.push(handle);
        }
      }
    }

    return handles;
  } catch (error) {
    console.error("[Shopify] Error fetching purchased product handles:", error);
    return [];
  }
}


export async function getCustomerOrder(accessToken: string, orderId: string) {
  const query = `
    query getCustomerOrder($customerAccessToken: String!, $orderId: ID!) {
      customer(customerAccessToken: $customerAccessToken) {
        order(id: $orderId) {
          id
          orderNumber
          processedAt
          statusUrl
          totalPrice {
            amount
            currencyCode
          }
          totalTax {
            amount
            currencyCode
          }
          subtotalPrice {
            amount
            currencyCode
          }
          totalShippingPrice {
            amount
            currencyCode
          }
          shippingAddress {
            address1
            address2
            city
            province
            zip
            country
            firstName
            lastName
            phone
          }
          lineItems(first: 20) {
            edges {
              node {
                title
                quantity
                variant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                  }
                  product {
                    handle
                  }
                }
              }
            }
          }
          successfulFulfillments(first: 5) {
            trackingCompany
            trackingInfo(first: 5) {
              number
              url
            }
          }
        }
      }
    }
  `;

  const res = await shopifyFetch<any>({
    query,
    variables: { customerAccessToken: accessToken, orderId },
    cache: "no-store",
  });

  return res.body.data?.customer?.order;
}

export async function updateCustomer(accessToken: string, customerInput: any) {
  const query = `
    mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
      customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
        customer {
          id
          firstName
          lastName
          email
          phone
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
    variables: { customerAccessToken: accessToken, customer: customerInput },
    cache: "no-store",
  });

  return res.body.data.customerUpdate;
}

export async function updateCustomerAddress(accessToken: string, addressId: string, addressInput: any) {
  const query = `
    mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
      customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
        customerAddress {
          id
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
    variables: { customerAccessToken: accessToken, id: addressId, address: addressInput },
    cache: "no-store",
  });

  return res.body.data.customerAddressUpdate;
}

export async function addCustomerAddress(accessToken: string, addressInput: any) {
  const query = `
    mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
      customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
        customerAddress {
          id
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
    variables: { customerAccessToken: accessToken, address: addressInput },
    cache: "no-store",
  });

  return res.body.data.customerAddressCreate;
}
export async function createCheckout(
  items: { id: string; quantity: number }[],
  customerAccessToken?: string
) {
  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const input: any = {
    lines: items.map((item) => ({
      merchandiseId: item.id,
      quantity: item.quantity,
    })),
  };

  if (customerAccessToken) {
    input.buyerIdentity = {
      customerAccessToken,
    };
  }

  const res = await shopifyFetch<any>({
    query,
    variables: { input },
    cache: "no-store",
  });

  const data = res.body.data?.cartCreate;

  if (!data) {
    console.error("Shopify cartCreate returned no data:", JSON.stringify(res.body));
    return { checkout: null, errors: res.body.errors || [] };
  }

  if (data.userErrors?.length > 0) {
    console.error("Shopify cartCreate errors:", JSON.stringify(data.userErrors));
    return { checkout: null, errors: data.userErrors };
  }

  return {
    checkout: { webUrl: data.cart?.checkoutUrl },
    errors: [],
  };
}
