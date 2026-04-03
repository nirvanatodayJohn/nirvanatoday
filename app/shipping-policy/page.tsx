import React from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail01Icon } from "@hugeicons/core-free-icons";

export const metadata = {
  title: "Shipping Policy | Nirvana Today",
  description: "Learn about our shipping times, methods and regional restrictions.",
};

export default function ShippingPolicyPage() {
  return (
    <main className="min-h-screen bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-16 space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl text-balance">
            Shipping Policy
          </h1>
        </div>

        {/* Content Section */}
        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12 text-foreground/80 leading-relaxed">
          <section className="space-y-6">
            <p className="text-lg font-medium text-foreground">
              We aim to ship all orders by the next business day (Monday through Friday).
            </p>
            <p>
              Subject to items being in stock and pending credit card authorization and verification. We will arrange for delivery of the products you order to the address which you specify in the check-out procedure.
            </p>
          </section>

          <section className="space-y-4 rounded-3xl bg-muted/40 p-8 border border-border/40">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Standard Delivery
            </h2>
            <p>
              Orders with Standard Shipping typically ship within 2-4 days of receiving credit card authorization. Processing on your order begins as soon as we receive payment verification.
            </p>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-bold tracking-tight text-foreground underline decoration-primary decoration-4 underline-offset-8">
              Shipping Disclaimers
            </h2>
            
            <div className="space-y-8">
               <div className="space-y-3">
                  <h3 className="text-lg font-bold text-foreground">THCA Products</h3>
                  <p className="text-muted-foreground">Not available for shipment to the following states:</p>
                  <p className="font-semibold text-foreground">Arkansas, Hawaii, Idaho, Kansas, Louisiana, Oklahoma, Oregon, Rhode Island, Utah, Vermont</p>
               </div>

               <div className="space-y-3">
                  <h3 className="text-lg font-bold text-foreground">Delta-8 Products</h3>
                  <p className="text-muted-foreground">Not available for shipment to the following states:</p>
                  <p className="font-semibold text-foreground">Alaska, Arizona, California, Colorado, Connecticut, Delaware, Hawaii, Idaho, Iowa, Massachusetts, Michigan, Minnesota, Mississippi, Montana, Nevada, New Hampshire, New York, North Dakota, Oregon, Rhode Island, Utah, Vermont, Virginia, Washington, West Virginia</p>
               </div>

               <div className="space-y-3">
                  <h3 className="text-lg font-bold text-foreground">Kratom Products</h3>
                  <p className="text-muted-foreground">Not available for shipment to the following states:</p>
                  <p className="font-semibold text-foreground">Alabama, Arkansas, Indiana, Rhode Island, Wisconsin</p>
                  <p className="text-sm text-muted-foreground">Or the following counties:</p>
                  <p className="text-sm font-medium">Sarasota County (Florida), San Diego (California), Oceanside (California), Alton (Illinois), Jerseyville (Illinois), Edwardsville County (Illinois), Columbus (Mississippi), Union County (Mississippi), Ascension (Louisiana), Franklin (Louisiana), Rapides (Louisiana)</p>
               </div>
            </div>
          </section>

          <section className="pt-12 border-t border-border/40">
            <div className="flex flex-col items-center justify-center text-center space-y-6">
              <h2 className="text-xl font-bold text-foreground">
                Still have questions?
              </h2>
              <Link href="/contact-us">
                <button className="flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold text-primary-foreground transition-all hover:scale-[1.03] active:scale-95 shadow-xl shadow-primary/20">
                  <HugeiconsIcon icon={Mail01Icon} className="size-4" strokeWidth={2.5} />
                  Contact Us
                </button>
              </Link>
              <p className="text-sm font-medium text-muted-foreground">
                Thank you!
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
