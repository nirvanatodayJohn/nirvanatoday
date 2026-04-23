import { MetadataRoute } from 'next'
import { getProducts, getArticles } from '@/lib/shopify'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nirvanatoday.com'

  // Fetch all data
  const { products } = await getProducts(1, 250)
  const { articles } = await getArticles(1, 250)

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/product/${product.handle}`,
    lastModified: new Date(), 
  }))

  const blogUrls = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.handle}`,
    lastModified: new Date(article.publishedAt),
  }))

  const staticUrls = [
    '',
    '/shop',
    '/blog',
    '/about-us',
    '/no-gimmicks',
    '/contact',
    '/terms-conditions',
    '/privacy-policy',
    '/shipping-policy',
    '/lab-results',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }))

  return [...staticUrls, ...productUrls, ...blogUrls]
}
