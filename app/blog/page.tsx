import { getArticles, type Article } from "@/lib/shopify";
import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Calendar01Icon, UserIcon } from "@hugeicons/core-free-icons";
import { cn, formatRelativeDate } from "@/lib/utils";
import BlogCard from "@/components/custom/BlogCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

export const metadata = {
  title: "Blog | Nirvana Today",
  description: "Read the latest about wellness, THCA, and CBD at Nirvana Today.",
};

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const isFirstPage = currentPage === 1;
  const pageSize = isFirstPage ? 7 : 6;

  const { articles, totalArticles, hasNextPage, hasPreviousPage } = await getArticles(currentPage, pageSize);
  
  // Custom total pages calculation to account for the first page taking 7 and others taking 6
  // (Total - 7) / 6 + 1
  const totalPages = totalArticles > 7 
    ? Math.ceil((totalArticles - 7) / 6) + 1 
    : 1;

  if (!articles || articles.length === 0) {
    return (
      <main className="min-h-screen bg-background pt-32 pb-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight">No articles found</h1>
      </main>
    );
  }

  const featuredArticle = isFirstPage ? articles[0] : null;
  const gridArticles = isFirstPage ? articles.slice(1) : articles;

  return (
    <main className="min-h-screen bg-background pb-24 pt-16">
      <div className="mx-auto w-full px-4">

        {/* Page Header */}
        <div className="mb-10 max-w-3xl space-y-4">
          <h1 className="text-5xl font-bold tracking-tighter text-foreground sm:text-7xl">
            Latest Blog Posts
          </h1>
          <p className="text-xl text-muted-foreground font-medium">
            Thoughts, news, and deep dives from the Nirvana Today team.
          </p>
        </div>

        {/* Featured Article - Only on Page 1 */}
        {featuredArticle && (
          <Link
            href={`/blog/${featuredArticle.handle}`}
            className="group flex flex-col md:flex-row overflow-hidden rounded-3xl border bg-muted p-4 mb-8"
          >
            <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-3xl bg-background md:w-[55%] md:aspect-auto">
              <Image
                src={featuredArticle.image}
                alt={featuredArticle.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 55vw"
              />
            </div>

            <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12 w-full">
              <div className="mb-4 flex flex-wrap items-center gap-2 text-sm font-medium text-muted-foreground line-clamp-1">
                <div className="flex items-center gap-1.5 rounded-full bg-background px-3 py-1.5 shadow-xs border border-border/50">
                  <HugeiconsIcon icon={Calendar01Icon} strokeWidth={2} className="size-4" />
                  {formatRelativeDate(featuredArticle.publishedAt)}
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-background px-3 py-1.5 shadow-xs border border-border/50">
                  <HugeiconsIcon icon={UserIcon} strokeWidth={2} className="size-4" />
                  {featuredArticle.author}
                </div>
              </div>

              <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl lg:leading-[1.1] transition-colors group-hover:text-primary">
                {featuredArticle.title}
              </h2>

              <p className="mb-8 line-clamp-3 text-lg text-muted-foreground">
                {featuredArticle.excerpt || "Dive deep into our latest findings and exploring the potential of plant medicine."}
              </p>

              <div className="mt-auto flex items-center gap-3 text-base font-bold text-foreground">
                <span className="flex size-12 items-center justify-center rounded-full bg-background border border-border/50 text-foreground transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
                  <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2.5} className="size-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
                Read full article
              </div>
            </div>
          </Link>
        )}

        {/* Latest Articles Grid */}
        <div className="space-y-10">
          <h3 className="text-2xl pl-2 font-bold tracking-tight">{!isFirstPage ? "Previous Posts" : "More from the blog"}</h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gridArticles.map((article: Article) => (
              <BlogCard key={article.id} article={article} />
            ))}
          </div>

          {/* Numbered Pagination Controls */}
          {totalPages > 1 && (
            <div className="pt-12">
              <Pagination>
                <PaginationContent className="gap-2">
                  <PaginationItem>
                    <PaginationPrevious
                      href={hasPreviousPage ? `/blog?page=${currentPage - 1}` : undefined}
                      className={!hasPreviousPage ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href={`/blog?page=${page}`}
                        isActive={currentPage === page}
                        className={cn(
                          "size-8 rounded-lg font-bold transition-all duration-300",
                          currentPage === page
                            ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs shadow-primary/20 scale-110"
                            : "hover:bg-muted text-muted-foreground"
                        )}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      href={hasNextPage ? `/blog?page=${currentPage + 1}` : undefined}
                      className={!hasNextPage ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
