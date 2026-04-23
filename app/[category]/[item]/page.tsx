import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import { getProductsByQuery } from "@/lib/shopify"
import ProductCard from "@/components/custom/ProductCard"

export default async function CategoryItemPage({ params }: { params: Promise<{ category: string, item: string }> }) {
    const { category, item } = await params;

    const normalizedItem = item === "pre-rolls" ? "pre-roll" : item;
    const singularItem = normalizedItem.endsWith('s') ? normalizedItem.slice(0, -1) : normalizedItem;
    const pluralItem = normalizedItem.endsWith('s') ? normalizedItem : `${normalizedItem}s`;
    
    const singularCategory = category.endsWith('s') ? category.slice(0, -1) : category;
    const pluralCategory = category.endsWith('s') ? category : `${category}s`;

    // Support both lowercase and title-case for family/items
    const categoryTags = [singularCategory.toLowerCase(), pluralCategory.toLowerCase(), singularCategory.toUpperCase(), pluralCategory.toUpperCase(), singularCategory.charAt(0).toUpperCase() + singularCategory.slice(1)];
    const itemTags = [singularItem.toLowerCase(), pluralItem.toLowerCase(), singularItem.charAt(0).toUpperCase() + singularItem.slice(1), pluralItem.charAt(0).toUpperCase() + pluralItem.slice(1)];

    const categoryQuery = `(${categoryTags.map(t => `tag:${t}`).join(' OR ')} OR title:*${singularCategory}*)`;
    const itemQuery = `(${itemTags.map(t => `tag:${t}`).join(' OR ')} OR title:*${singularItem}*)`;
    
    const query = `${categoryQuery} AND ${itemQuery}`;
    const products = await getProductsByQuery(query);

    const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ");
    const itemTitle = item.charAt(0).toUpperCase() + item.slice(1).replace("-", " ");
    const fullTitle = `${categoryTitle} ${itemTitle}`;

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
                                    <BreadcrumbLink href={`/${category}`}>{categoryTitle}</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{itemTitle}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl">
                            {categoryTitle} <span className="text-muted-foreground">{itemTitle}.</span>
                        </h1>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {products.length === 0 && (
                    <div className="mt-32 flex flex-col items-center justify-center space-y-4 text-center">
                        <h3 className="text-2xl font-bold text-foreground">Coming Soon</h3>
                        <p className="max-w-md text-muted-foreground">
                            We're currently updating our {fullTitle} selection. Check back soon for the latest drops!
                        </p>
                        <Link href={`/${category}`} className="font-bold underline underline-offset-4 decoration-2">
                            Back to All {categoryTitle}
                        </Link>
                    </div>
                )}
            </main>
        </div>
    )
}
