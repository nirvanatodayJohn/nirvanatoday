"use client";

import { useState } from "react";
import { StarIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { JudgeMeReview } from "@/lib/judgeme";
import { cn, formatRelativeDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { submitReviewAction } from "@/lib/actions/reviews";
import Link from "next/link";

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

interface ReviewsListProps {
  reviews: JudgeMeReview[];
  productId: string;
  productHandle: string;
  hasPurchased: boolean;
}

export default function ReviewsList({
  reviews,
  productId,
  productHandle,
  hasPurchased,
}: ReviewsListProps) {
  // Form state
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) {
      setMessage({ type: "error", text: "Please enter your review text." });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const result = await submitReviewAction(productId, productHandle, rating, body);
      if (result.error) {
        setMessage({ type: "error", text: result.error });
      } else {
        setMessage({
          type: "success",
          text: "Thank you! Your review has been submitted successfully and will appear shortly.",
        });
        setBody("");
        setRating(5);
      }
    } catch {
      setMessage({ type: "error", text: "An error occurred while submitting your review. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (reviews.length === 0 && !hasPurchased) {
    return (
      <section className="rounded-2xl border border-border bg-background px-6 py-12 text-center max-w-4xl mx-auto">
        <div className="space-y-4">
          <p className="text-xl font-semibold text-foreground">No reviews yet</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Customer feedback for this product will appear here once reviews are available.
          </p>
          <div className="pt-4 border-t border-border max-w-sm mx-auto">
            <p className="text-xs text-muted-foreground/80 leading-relaxed">
              Only verified purchasers of this product can submit a review. Have you bought this item?{" "}
              <Link href="/auth?mode=login" className="font-semibold text-primary underline hover:text-primary/85">
                Log in
              </Link>{" "}
              to write a review.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length 
    : 0;
  const reviewLabel = reviews.length === 1 ? "Verified Review" : "Verified Reviews";

  return (
    <section className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <div>
          <h2 className="font-serif text-2xl font-bold tracking-normal text-foreground sm:text-3xl">
            Customer Feedbacks
          </h2>
        </div>

        {reviews.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
            No reviews have been written for this product yet.
          </div>
        ) : (
          reviews.map((review) => (
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
          ))
        )}
      </div>

      <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
        <h2 className="font-serif text-2xl font-bold tracking-normal text-foreground sm:text-3xl">
          {reviews.length > 0 ? "Average Rating" : "Write a Review"}
        </h2>

        <div className="rounded-2xl border border-border bg-card p-4 sm:p-6">
          {reviews.length > 0 && (
            <>
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
            </>
          )}

          <div className={cn("border-border", reviews.length > 0 ? "mt-8 border-t pt-6" : "")}>
            {hasPurchased ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold tracking-tight text-foreground">
                  Write your Review
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Share your experience with this product to help other shoppers.
                </p>

                {/* Rating Input */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-foreground">Rating</label>
                  <div className="flex items-center gap-1">
                    {starValues.map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="transition-transform duration-100 hover:scale-110 focus:outline-none"
                      >
                        <HugeiconsIcon
                          icon={StarIcon}
                          className={cn(
                            "size-8 cursor-pointer transition-colors duration-150",
                            star <= (hoverRating ?? rating)
                              ? "fill-current text-primary"
                              : "text-muted-foreground/30"
                          )}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Body Textarea */}
                <div className="space-y-1.5">
                  <label htmlFor="review-body" className="text-sm font-semibold text-foreground">
                    Review Content
                  </label>
                  <textarea
                    id="review-body"
                    placeholder="Describe what you liked or disliked about this product..."
                    value={body}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-24 resize-none bg-background border-border focus-visible:ring-primary focus-visible:border-primary"
                    required
                  />
                </div>

                {message && (
                  <div
                    className={cn(
                      "rounded-lg p-3 text-sm font-medium",
                      message.type === "success"
                        ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
                        : "bg-destructive/10 text-destructive border border-destructive/20"
                    )}
                  >
                    {message.text}
                  </div>
                )}

                <Button type="submit" disabled={isSubmitting} className="w-full mt-2">
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </Button>
              </form>
            ) : (
              <div className="rounded-xl bg-muted/30 border border-border/50 p-4 space-y-3 text-center">
                <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <h4 className="text-sm font-semibold text-foreground">Verified Purchaser Only</h4>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  To maintain the high quality and trust of our community reviews, only customers who have purchased this item can share their feedback.
                </p>
                <div className="pt-2 border-t border-border/40">
                  <Link
                    href="/auth?mode=login"
                    className="inline-flex h-9 w-full items-center justify-center rounded-md bg-secondary px-4 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80"
                  >
                    Log In to Review
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </section>
  );
}
