import { getArticles } from "@/lib/shopify";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import BlogCard from "@/components/custom/BlogCard";

export default async function BlogSection() {
  const { articles } = await getArticles(1, 3);

  if (!articles || articles.length === 0) return null;

  return (
    <section className="border-t py-16">
      <div className="w-full px-4">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div className="max-w-2xl space-y-1">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Latest from the Blog</h2>
            <p className="text-muted-foreground">
              Deep dives into wellness, THCA flower, and lifestyle from the Nirvana Today team.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-colors sm:flex group"
          >
            View all posts
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              strokeWidth={2.5}
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <BlogCard key={article.id} article={article} />
          ))}
        </div>

        <div className="mt-12 flex justify-center sm:hidden">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-base font-bold text-foreground"
          >
            View all posts <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2.5} className="size-5 text-primary" />
          </Link>
        </div>
      </div>
    </section>
  );
}
