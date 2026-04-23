"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Calendar01Icon } from "@hugeicons/core-free-icons";
import type { Article } from "@/lib/shopify";
import { formatRelativeDate } from "@/lib/utils";

interface BlogCardProps {
  article: Article;
  variant?: "default" | "compact";
}

export default function BlogCard({ article, variant = "default" }: BlogCardProps) {
  const isCompact = variant === "compact";
  const [loaded, setLoaded] = useState(false);

  return (
    <Link
      href={`/blog/${article.handle}`}
      className="group flex h-full flex-col rounded-3xl border bg-primary shadow-sm shadow-black/10 ring-1 ring-black/10 p-4"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl">
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-linear-to-br from-white via-accent to-white/50" />
        )}
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onLoad={() => setLoaded(true)}
        />
      </div>

      <div className="mt-6 flex flex-1 flex-col px-3 pb-2">
        <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-medium text-primary-foreground">
          <span className="flex items-center gap-1.5">
            <HugeiconsIcon icon={Calendar01Icon} strokeWidth={2} className="size-3.5" />
            {formatRelativeDate(article.publishedAt)}
          </span>
        </div>

        <h3 className="mb-3 text-xl font-bold tracking-tight text-primary-foreground line-clamp-2 leading-snug">
          {article.title}
        </h3>

        {!isCompact && (
          <p className="mb-6 line-clamp-2 text-sm text-primary-foreground/50 leading-relaxed">
            {article.excerpt ||
              "Dive into this article to learn more and explore our latest findings in wellness."}
          </p>
        )}

        <div className="mt-auto flex items-center gap-2 text-sm font-bold text-primary-foreground">
          Read more{" "}
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            strokeWidth={2.5}
            className="size-4 text-primary transition-transform duration-300 group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  );
}

