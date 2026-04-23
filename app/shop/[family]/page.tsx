import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import { getProductsByQuery, getCollectionByHandle, type Product } from "@/lib/shopify"
import ProductCard from "@/components/custom/ProductCard"
import { FaqAccordion } from "@/components/custom/Blog/FaqAccordion"

export default async function FamilyPage({ params }: { params: Promise<{ family: string }> }) {
    const { family } = await params;

    const singularFamily = family.endsWith('s') ? family.slice(0, -1) : family;
    const pluralFamily = family.endsWith('s') ? family : `${family}s`;

    // Support both lowercase/title-case tags AND title-based searching
    const familyTags = [singularFamily.toLowerCase(), pluralFamily.toLowerCase(), singularFamily.toUpperCase(), pluralFamily.toUpperCase(), singularFamily.charAt(0).toUpperCase() + singularFamily.slice(1)];
    const familyQuery = `(${familyTags.map(t => `tag:${t}`).join(' OR ')} OR title:*${singularFamily}*)`;

    // Fetch products that match the family tags
    const [products, collectionData] = await Promise.all([
        getProductsByQuery(familyQuery),
        getCollectionByHandle(family)
    ]);

    const title = collectionData?.title || family.charAt(0).toUpperCase() + family.slice(1).replace("-", " ");

    return (
        <div className="min-h-screen bg-background">
            <main className="mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col pb-8 sm:flex-row sm:items-end sm:justify-between text-left">
                    <div>
                        <Breadcrumb className="mb-2">
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{title}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl">
                            {title} <span className="text-muted-foreground">Store.</span>
                        </h1>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product: Product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {products.length === 0 && (
                    <div className="mt-32 flex flex-col items-center justify-center space-y-4 text-center">
                        <h3 className="text-2xl font-bold text-foreground">Coming Soon</h3>
                        <p className="max-w-md text-muted-foreground">
                            We're currently updating our {title} inventory. Check back soon for the latest drops!
                        </p>
                        <Link href="/shop" className="font-bold underline underline-offset-4 decoration-2">
                            Back to All Products
                        </Link>
                    </div>
                )}

                {/* Collection Content - Apple Styled */}
                {collectionData?.descriptionHtml && (
                    <section className="mx-auto mt-4 mb-16 max-w-4xl border-t border-border/10 pt-16">
                        <article className="prose-apple">
                            <FaqAccordion html={collectionData.descriptionHtml} />
                        </article>
                    </section>
                )}
            </main>

            {/* Apple-grade Typography CSS Injection */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .prose-apple { font-family: var(--font-sans); }
                .prose-apple p { font-size: 21px; line-height: 1.6; margin-bottom: 1.25rem; font-weight: 400; opacity: 0.9; }
                .prose-apple h1, .prose-apple h2, .prose-apple h3, .prose-apple h4 { text-wrap: balance; font-family: var(--font-sans); }
                .prose-apple h2 { font-size: 42px; font-weight: 700; margin-top: 3.5rem; margin-bottom: 1.5rem; letter-spacing: -0.03em; line-height: 1.1; }
                .prose-apple h3 { font-size: 28px; font-weight: 600; margin-top: 2.5rem; margin-bottom: 1.25rem; letter-spacing: -0.02em; line-height: 1.3; }
                .prose-apple h4 { font-size: 22px; font-weight: 600; margin-top: 1.5rem; margin-bottom: 1rem; }
                .prose-apple ul { font-size: 21px; line-height: 1.6; list-style: none; padding-left: 0; margin-bottom: 1.5rem; opacity: 0.9; }
                .prose-apple ul li { position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; }
                .prose-apple ul li::before { content: "•"; position: absolute; left: 0; color: inherit; opacity: 0.5; font-weight: bold; font-size: 1.2em; line-height: 1; top: -2px; }
                .prose-apple ol { font-size: 21px; line-height: 1.6; list-style: decimal; padding-left: 1.5rem; margin-bottom: 1.5rem; opacity: 0.9; }
                .prose-apple ol li { margin-bottom: 0.75rem; padding-left: 0.5rem; }
                .prose-apple a { font-weight: 500; border-bottom: 1px solid transparent; transition: border-color 0.2s ease; opacity: 1 !important; text-decoration: underline; text-underline-offset: 4px; text-decoration-color: hsl(var(--foreground) / 0.3); }
                .prose-apple a:hover { text-decoration-color: hsl(var(--foreground)); }
                .prose-apple strong { font-weight: 700; color: hsl(var(--foreground)); opacity: 1 !important; }
                .prose-apple blockquote { border-left: 3px solid hsl(var(--foreground) / 0.1); padding-left: 1.5rem; margin: 2.5rem 0; font-style: italic; color: hsl(var(--muted-foreground)); font-size: 26px; line-height: 1.5; font-weight: 400; letter-spacing: -0.02em; }
                
                /* Premium Table Styling */
                .prose-apple table { width: 100%; border-collapse: collapse; margin: 3rem 0; font-size: 18px; border-top: 1px solid hsl(var(--border) / 0.4); }
                .prose-apple th { text-align: left; padding: 1.5rem 1rem; font-weight: 600; color: hsl(var(--foreground)); border-bottom: 2px solid hsl(var(--border) / 0.6); text-transform: uppercase; font-size: 14px; letter-spacing: 0.05em; }
                .prose-apple td { padding: 1.5rem 1rem; border-bottom: 1px solid hsl(var(--border) / 0.3); vertical-align: top; color: hsl(var(--foreground) / 0.8); line-height: 1.5; }
                .prose-apple tr:hover td { background: hsl(var(--foreground) / 0.02); }
                .prose-apple td:first-child { font-weight: 600; color: hsl(var(--foreground)); }

                @media (max-width: 640px) {
                  .prose-apple p { font-size: 18px; line-height: 1.55; }
                  .prose-apple ul, .prose-apple ol { font-size: 18px; }
                  .prose-apple h2 { font-size: 32px; margin-top: 2.5rem; }
                  .prose-apple h3 { font-size: 24px; margin-top: 2rem; }
                }
            `}} />
        </div>
    )
}
