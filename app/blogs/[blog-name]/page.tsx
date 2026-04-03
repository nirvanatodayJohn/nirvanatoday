import { getArticleByHandle } from "@/lib/shopify";
import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  Calendar01Icon,
  Clock01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ "blog-name": string }> }) {
  const { "blog-name": blogName } = await params;
  const article = await getArticleByHandle(blogName);
  if (!article) return { title: "Post Not Found" };
  
  return {
    title: `${article.title} | Nirvana Today`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ "blog-name": string }> }) {
  const { "blog-name": blogName } = await params;
  const article = await getArticleByHandle(blogName);

  if (!article) return notFound();

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Article Header & Navigation */}
      <div className="bg-linear-to-b from-muted/20 to-background">
        <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 lg:px-8">
          <Link
            href="/blogs"
            className="group mb-10 inline-flex items-center gap-2 rounded-full border border-border/80 bg-white px-4 py-2 text-sm font-semibold text-muted-foreground shadow-sm transition-all hover:bg-muted/30 hover:text-primary"
          >
            <HugeiconsIcon
              icon={ArrowLeft01Icon}
              size={16}
              strokeWidth={2.5}
              className="transition-transform group-hover:-translate-x-1"
            />
            Journal
          </Link>

          <header className="flex flex-col gap-8 pb-16">
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 border-y border-border/50 py-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={Calendar01Icon} size={16} strokeWidth={2.5} />
                {new Date(article.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={UserIcon} size={16} strokeWidth={2.5} />
                {article.author}
              </div>
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={Clock01Icon} size={16} strokeWidth={2.5} />
                5 min read
              </div>
            </div>
          </header>
        </div>
      </div>

      {/* Featured Image */}
      <div className="mx-auto mb-16 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border/10 shadow-2xl">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div 
          className="prose-clean max-w-none text-lg text-foreground/90 selection:bg-primary/20"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="mt-16 flex flex-wrap gap-2 border-t border-border/40 pt-10">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted/60 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {/* CSS for content cleanup */}
      <style dangerouslySetInnerHTML={{ __html: `
        .prose-clean p { margin-bottom: 2rem; line-height: 1.8; }
        .prose-clean h2 { font-size: 2.25rem; font-weight: 800; margin-top: 4rem; margin-bottom: 1.5rem; letter-spacing: -0.02em; color: var(--foreground); }
        .prose-clean h3 { font-size: 1.75rem; font-weight: 700; margin-top: 3.5rem; margin-bottom: 1.25rem; color: var(--foreground); }
        .prose-clean ul { list-style: circle; padding-left: 1.5rem; margin-bottom: 2rem; }
        .prose-clean li { margin-bottom: 1.25rem; line-height: 1.8; padding-left: 0.5rem; }
        .prose-clean a { color: #6ea94f; font-weight: 700; text-underline-offset: 4px; text-decoration: underline; }
        .prose-clean a:hover { color: #4c7f3a; }
        .prose-clean strong { font-weight: 800; }
        .prose-clean ol { list-style: decimal; padding-left: 1.5rem; margin-bottom: 2rem; }
      `}} />
    </main>
  );
}
