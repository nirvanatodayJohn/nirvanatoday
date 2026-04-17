"use client";

import { StarIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";

interface ReviewStarsProps {
  rating?: number;
  count?: number;
  className?: string;
  starClassName?: string;
  showCount?: boolean;
}

export default function ReviewStars({
  rating = 0,
  count = 0,
  className,
  starClassName,
  showCount = true,
}: ReviewStarsProps) {
  const numericRating = Number(rating);
  const numericCount = Number(count);

  if (numericCount === 0 && !numericRating) {
    return null;
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => {
          const isFull = i <= Math.floor(numericRating);
          const isPartial = i === Math.ceil(numericRating) && numericRating % 1 !== 0;

          return (
            <HugeiconsIcon
              key={i}
              icon={StarIcon}
              className={cn(
                "size-4",
                starClassName,
                isFull || isPartial
                  ? "fill-current text-primary"
                  : "text-muted-foreground/30"
              )}
              strokeWidth={isFull ? 0 : 2}
            />
          );
        })}
      </div>
      {showCount && (
        <span className="text-xs font-bold text-foreground">
          {numericRating.toFixed(1)} <span className="ml-1 font-medium text-muted-foreground">({numericCount} reviews)</span>
        </span>
      )}
    </div>
  );
}
