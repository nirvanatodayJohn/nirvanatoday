import { MetadataRoute } from 'next'
import { getProducts, getArticles } from '@/lib/shopify'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nirvanatoday.com'

  // Fetch all data
  const { products } = await getProducts(1, 250)
  const { articles } = await getArticles(1, 250)

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/shop/product/${product.handle}`,
    lastModified: new Date(), 
  }))

  const blogUrls = articles.map((article) => ({
    url: `${baseUrl}/blogs/${article.handle}`,
    lastModified: new Date(article.publishedAt),
  }))

  const staticUrls = [
    '',
    '/shop',
    '/blogs',
    '/about-us',
    '/no-gimmicks',
    '/contact-us',
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
