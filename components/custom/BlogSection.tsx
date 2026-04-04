import { getArticles } from "@/lib/shopify";
import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Calendar01Icon } from "@hugeicons/core-free-icons";

export default async function BlogSection() {
  const { articles } = await getArticles(1, 3);

  if (!articles || articles.length === 0) return null;

  return (
    <section className="border-t py-16">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div className="max-w-2xl space-y-1">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Latest Blogs</h2>
            <p className="text-muted-foreground">
              Deep dives into wellness, THCA flower, and lifestyle from the Nirvana Today team.
            </p>
          </div>
          <Link
            href="/blogs"
            className="hidden items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-colors sm:flex group"
          >
            View all blogs
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              strokeWidth={2.5}
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/blogs/${article.handle}`}
              className="group flex flex-col h-full rounded-3xl bg-muted p-4 border "
            >
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl bg-background">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <div className="mt-6 flex flex-1 flex-col px-3 pb-2">
                <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-medium text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <HugeiconsIcon icon={Calendar01Icon} strokeWidth={2} className="size-3.5" />
                    {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-bold tracking-tight text-foreground line-clamp-2 leading-snug transition-colors group-hover:text-primary">
                  {article.title}
                </h3>

                <p className="mb-6 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
                  {article.excerpt || "Dive into this article to learn more and explore our latest findings in wellness."}
                </p>

                <div className="mt-auto flex items-center gap-2 text-sm font-bold text-foreground">
                  Read more <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2.5} className="size-4 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex justify-center sm:hidden">
          <Link
            href="/blogs"
            className="flex items-center gap-2 text-base font-bold text-foreground"
          >
            View all blogs <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2.5} className="size-5 text-primary" />
          </Link>
        </div>
      </div>
    </section>
  );
}
