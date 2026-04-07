"use client";

import { StarIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";

interface ReviewStarsProps {
  rating?: number;
  count?: number;
  className?: string;
  showCount?: boolean;
}

export default function ReviewStars({ rating = 0, count = 0, className, showCount = true }: ReviewStarsProps) {
  if (count === 0 && !rating) {
    return null;
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => {
          const isFull = i <= Math.floor(rating);
          const isPartial = i === Math.ceil(rating) && rating % 1 !== 0;

          return (
            <HugeiconsIcon
              key={i}
              icon={StarIcon}
              className={cn(
                "size-4",
                isFull || isPartial ? "text-primary" : "text-muted-foreground/30"
              )}
              strokeWidth={isFull ? 0 : 2}
            />
          );
        })}
      </div>
      {showCount && (
        <span className="text-[13px] font-bold text-foreground">
          {rating.toFixed(1)} <span className="text-muted-foreground font-medium ml-1">({count} reviews)</span>
        </span>
      )}
    </div>
  );
}
