import Link from "next/link"
import { getProducts } from "@/lib/shopify"
import ProductCard from "@/components/custom/ProductCard"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Gummies", "Tinctures", "Vapes", "Capsules", "Pets", "Flower"]

export default async function ShopPage(props: { searchParams: Promise<{ category?: string, page?: string }> }) {
    const searchParams = await props.searchParams;
    const selectedCategory = searchParams.category || "All";
    const currentPage = Number(searchParams.page) || 1;
    const pageSize = 12;

    // We get all products first to filter them before paginating
    // In a real large-scale app, we would filter via Shopify API
    const { products: allProducts } = await getProducts(1, 250);

    let filteredProducts = allProducts;

    // Filter logic
    if (selectedCategory !== "All") {
        const query = selectedCategory.toLowerCase();
        filteredProducts = allProducts.filter(p =>
            (p.category && p.category.toLowerCase().includes(query)) ||
            (p.title && p.title.toLowerCase().includes(query)) ||
            (p.tags && p.tags.some(t => t.toLowerCase().includes(query)))
        );
    }

    // Now paginate the filtered results
    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / pageSize);
    const startIdx = (currentPage - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    const paginatedProducts = filteredProducts.slice(startIdx, endIdx);

    const hasNextPage = endIdx < totalProducts;
    const hasPreviousPage = currentPage > 1;

    return (
        <main className="flex-1 bg-background">

            {/* Filter & Sort Bar */}
            <div className="z-30 bg-muted">
                <div className="mx-auto flex w-full items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
                        {CATEGORIES.map((cat) => {
                            const isActive = selectedCategory === cat;
                            const href = cat === "All" ? "/shop" : `/shop?category=${cat}`;

                            return (
                                <Link
                                    key={cat}
                                    href={href}
                                    className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-bold transition-all duration-300 ${isActive
                                        ? "bg-primary text-background"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                        }`}
                                >
                                    {cat}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <section className="w-full p-4">
                {paginatedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 mt-2">
                        {paginatedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="py-24 text-center">
                        <h2 className="text-2xl font-bold text-foreground">No products found.</h2>
                        <p className="mt-4 text-muted-foreground text-lg">We couldn't find any products in the "{selectedCategory}" category.</p>
                        <Link href="/shop" className="mt-8 inline-block text-foreground font-bold hover:underline">
                            View all products
                        </Link>
                    </div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="py-16">
                        <Pagination>
                            <PaginationContent className="gap-2">
                                <PaginationItem>
                                    <PaginationPrevious
                                        href={hasPreviousPage ? `/shop?category=${selectedCategory}&page=${currentPage - 1}` : undefined}
                                        className={!hasPreviousPage ? "pointer-events-none opacity-50" : ""}
                                    />
                                </PaginationItem>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            href={`/shop?category=${selectedCategory}&page=${page}`}
                                            isActive={currentPage === page}
                                            className={cn(
                                                "size-10 rounded-xl font-bold transition-all duration-300",
                                                currentPage === page
                                                    ? "bg-primary text-background hover:bg-primary/90 shadow-lg scale-110"
                                                    : "hover:bg-muted text-muted-foreground"
                                            )}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext
                                        href={hasNextPage ? `/shop?category=${selectedCategory}&page=${currentPage + 1}` : undefined}
                                        className={!hasNextPage ? "pointer-events-none opacity-50" : ""}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </section>
        </main>
    )
}
