import { StarIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { JudgeMeReview } from "@/lib/judgeme";
import { cn, formatRelativeDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const ratingValues = [5, 4, 3, 2, 1] as const;
const starValues = [1, 2, 3, 4, 5] as const;

function formatReviewDate(date: string) {
  return formatRelativeDate(date);
}

function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "N";
}

function StarRow({
  rating,
  size = "default",
}: {
  rating: number;
  size?: "default" | "large";
}) {
  return (
    <div className="flex items-center gap-1 text-primary" aria-label={`${rating} star rating`}>
      {starValues.map((star) => (
        <HugeiconsIcon
          key={star}
          icon={StarIcon}
          className={cn(
            size === "large" ? "size-7" : "size-4",
            star <= Math.round(rating)
              ? "fill-current text-primary"
              : "text-muted-foreground/30"
          )}
        />
      ))}
    </div>
  );
}

export default function ReviewsList({ reviews }: { reviews: JudgeMeReview[] }) {
  if (reviews.length === 0) {
    return (
      <section className="rounded-2xl border border-border bg-background px-6 py-12 text-center">
        <div className="mx-auto space-y-2">
          <p className="text-lg font-semibold text-foreground">No reviews yet</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Customer feedback for this product will appear here once reviews are available.
          </p>
        </div>
      </section>
    );
  }

  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  const reviewLabel = reviews.length === 1 ? "Verified Review" : "Verified Reviews";

  return (
    <section className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <div>
          <h2 className="font-serif text-2xl font-bold tracking-normal text-foreground sm:text-3xl">
            Customer Feedbacks
          </h2>
        </div>

        {reviews.map((review) => (
          <article
            key={review.id}
            className="rounded-2xl border bg-card p-4 transition-colors hover:border-primary/50 sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-muted text-base font-semibold text-foreground">
                  {getInitial(review.reviewer.name)}
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-lg font-semibold text-foreground">
                    {review.reviewer.name}
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground">
                    {formatReviewDate(review.created_at)}
                  </p>
                </div>
              </div>
              <StarRow rating={review.rating} />
            </div>

            <p className="mt-4 text-base text-muted-foreground">
              {review.body}
            </p>
          </article>
        ))}
      </div>

      <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
        <h2 className="font-serif text-2xl font-bold tracking-normal text-foreground sm:text-3xl">
          Average Rating
        </h2>

        <div className="rounded-2xl border border-border bg-card p-4 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-3xl font-semibold text-foreground">
              {averageRating.toFixed(1)}
            </span>
            <StarRow rating={averageRating} size="large" />
          </div>

          <p className="mt-1 text-lg leading-relaxed text-muted-foreground">
            Based on {reviews.length} {reviewLabel.toLowerCase()}.
          </p>

          <div className="mt-8 space-y-4">
            {ratingValues.map((stars) => {
              const count = reviews.filter((review) => Math.round(review.rating) === stars).length;
              const percentage = (count / reviews.length) * 100;

              return (
                <div key={stars} className="flex items-center gap-4">
                  <span className="w-4 text-base font-semibold text-foreground">{stars}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="w-6 text-right text-sm font-semibold text-muted-foreground">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-8 border-t border-border pt-4">
            <h3 className="text-2xl font-semibold text-foreground">
              Write your Review
            </h3>
            <p className="mt-4 text-muted-foreground">
              Share your feedback and help others shop with confidence.
            </p>
            <Button className="w-full mt-2">Submit Review</Button>
          </div>
        </div>
      </aside>
    </section>
  );
}
