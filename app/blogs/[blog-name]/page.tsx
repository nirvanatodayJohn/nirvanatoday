import { getArticleByHandle, getArticles, type Article } from "@/lib/shopify";
import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { notFound } from "next/navigation";
import { FaqAccordion } from "@/components/custom/Blog/FaqAccordion";

export async function generateStaticParams() {
  const { articles } = await getArticles(1, 250);
  return articles.map((article: Article) => ({
    "blog-name": article.handle,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ "blog-name": string }> }) {
  const { "blog-name": blogName } = await params;
  const article = await getArticleByHandle(blogName);
  if (!article) return { title: "Post Not Found" };

  return {
    title: `${article.title} | Nirvana Today`,
    description: article.excerpt,
    keywords: [...article.tags, "Nirvana Today Blog", "Wellness Article"],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

const calculateReadingTime = (html: string) => {
  const text = html.replace(/<[^>]+>/g, "");
  const wordCount = text.split(/\s+/).length;
  // A standard reading speed is around 200 words per minute
  return Math.max(1, Math.ceil(wordCount / 200));
};

export default async function ArticlePage({ params }: { params: Promise<{ "blog-name": string }> }) {
  const { "blog-name": blogName } = await params;
  const article = await getArticleByHandle(blogName);

  if (!article) return notFound();

  const readingTime = calculateReadingTime(article.contentHtml);

  return (
    <main className="min-h-screen bg-background">
      <div className="relative bg-background pt-10">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <Link
            href="/blogs"
            className="group mb-12 sm:mb-24 inline-flex items-center gap-2 text-[15px] font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <HugeiconsIcon
              icon={ArrowLeft01Icon}
              size={20}
              strokeWidth={2}
              className="transition-transform group-hover:-translate-x-1"
            />
            All Blogs
          </Link>

          <header className="flex flex-col items-start gap-4 pb-12 text-left sm:pb-20">
            <h1 className="text-balance text-4xl font-extrabold text-foreground sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center justify-start gap-x-4 gap-y-2 text-sm font-medium text-muted-foreground">
              <time dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <div className="h-1 w-1 rounded-full bg-muted-foreground/40"></div>
              <span>{article.author}</span>
              <div className="h-1 w-1 rounded-full bg-muted-foreground/40"></div>
              <span>{readingTime} min read</span>
            </div>
          </header>
        </div>
      </div>

      {/* Featured Image */}
      {article.image && (
        <div className="mx-auto mb-16 max-w-4xl px-5  sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[20px] sm:rounded-[28px] shadow-sm ring-1 ring-border/10">
            <div className="relative aspect-video w-full">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <article className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <FaqAccordion html={article.contentHtml} />
      </article>

      {/* Apple-grade Typography CSS Injection */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .prose-apple { font-family: var(--font-sans); }
        .prose-apple p { font-size: 21px; line-height: 1.6; margin-bottom: 1.25rem; font-weight: 400; opacity: 0.9; }
        .prose-apple h1, .prose-apple h2, .prose-apple h3, .prose-apple h4 { text-wrap: balance; font-family: var(--font-sans); }
        .prose-apple h2 { font-size: 32px; font-weight: 700; margin-top: 2.5rem; margin-bottom: 1rem; letter-spacing: -0.02em; line-height: 1.2; }
        .prose-apple h3 { font-size: 24px; font-weight: 600; margin-top: 2rem; margin-bottom: 1rem; letter-spacing: -0.015em; line-height: 1.3; }
        .prose-apple h4 { font-size: 20px; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.75rem; }
        .prose-apple ul { font-size: 21px; line-height: 1.6; list-style: none; padding-left: 0; margin-bottom: 1.5rem; opacity: 0.9; }
        .prose-apple ul li { position: relative; padding-left: 1.5rem; margin-bottom: 0.5rem; }
        .prose-apple ul li::before { content: "•"; position: absolute; left: 0; color: inherit; opacity: 0.5; font-weight: bold; font-size: 1.2em; line-height: 1; top: -2px; }
        .prose-apple ol { font-size: 21px; line-height: 1.6; list-style: decimal; padding-left: 1.5rem; margin-bottom: 1.5rem; opacity: 0.9; }
        .prose-apple ol li { margin-bottom: 0.5rem; padding-left: 0.5rem; }
        .prose-apple a { font-weight: 500; border-bottom: 1px solid transparent; transition: border-color 0.2s ease; opacity: 1 !important; text-decoration: underline; text-underline-offset: 4px; text-decoration-color: hsl(var(--foreground) / 0.3); }
        .prose-apple a:hover { text-decoration-color: hsl(var(--foreground)); }
        .prose-apple strong { font-weight: 700; color: hsl(var(--foreground)); opacity: 1 !important; }
        .prose-apple img { border-radius: 16px; margin: 2rem 0; width: 100%; height: auto; border: 1px solid hsl(var(--border) / 0.3); }
        .prose-apple blockquote { border-left: 3px solid hsl(var(--foreground) / 0.1); padding-left: 1.5rem; margin: 2rem 0; font-style: italic; color: hsl(var(--muted-foreground)); font-size: 24px; line-height: 1.5; font-weight: 400; letter-spacing: -0.01em; }
        
        @media (max-width: 640px) {
          .prose-apple p { font-size: 18px; line-height: 1.55; }
          .prose-apple ul, .prose-apple ol { font-size: 18px; }
          .prose-apple h2 { font-size: 28px; margin-top: 2rem; }
          .prose-apple h3 { font-size: 22px; margin-top: 1.5rem; }
          .prose-apple img { margin: 1.5rem 0; border-radius: 12px; }
        }
      `}} />
    </main>
  );
}
