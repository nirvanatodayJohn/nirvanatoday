import Link from "next/link";
import React from "react";

export const metadata = {
  title: "FDA Disclaimer | Nirvana Today",
  description: "Required FDA disclaimer and age verification statements.",
};

export default function FDADisclaimerPage() {
  return (
    <main className="min-h-screen bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4">
        {/* Header Section */}
        <div className="mb-16 space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl text-balance">
            FDA Disclaimer
          </h1>
        </div>

        {/* Content Section with a prominent cautionary box */}
        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12 text-foreground/80 leading-relaxed">
          <section className="rounded-3xl bg-amber-50/50 dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-700/30 p-8 sm:p-12">
            <div className="space-y-6">
              <p className="text-lg font-bold text-amber-900 dark:text-amber-200">
                The Federal Food, Drug, and Cosmetic Act requires this notice.
              </p>
              <p className="text-amber-900/80 dark:text-amber-200/70">
                The statements made regarding these products have not been evaluated by the Food and Drug Administration. The efficacy of these products has not been confirmed by FDA-approved research. These products are not intended to diagnose, treat, cure or prevent any disease. All information presented here is not meant as a substitute for or alternative to information from health care practitioners. Please consult your health care professional about potential interactions or other possible complications before using any product.
              </p>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Age Verification & Usage
            </h2>
            <div className="space-y-6">
              <p>
                Delta 8 THC products are not for use by or sale to persons under the age of 21. Delta 8 THC products should be used only as directed on the label.
              </p>
              <p>
                Hemp-derived products, including Delta 8 THC products, have not been evaluated by the FDA or any other state or federal agency. Delta 8 THC products are not intended to diagnose, treat, cure, remedy or prevent any disease, illness, or condition or any other ailment.
              </p>
              <p className="font-bold text-foreground">
                Sales of Delta 8 THC products will not ship/sell to states where it is illegal.
              </p>
            </div>
          </section>

          <section className="pt-12 border-t border-border/40 text-sm text-muted-foreground italic">
            <p>
              For more information about our shipping restrictions, please visit our <Link href="/shipping-policy" className="text-primary font-bold hover:underline">Shipping Policy</Link>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
