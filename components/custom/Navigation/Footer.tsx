import Link from "next/link";

import {
  Facebook01Icon,
  HourglassIcon,
  InstagramIcon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type FooterLink = {
  label: string;
  href: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Quick Links",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Lab Results", href: "/lab-results" },
      { label: "Blogs", href: "/blogs" },
      { label: "Faq's", href: "/faqs" },
      { label: "Contact Us", href: "/contact-us" },
    ],
  },
  {
    title: "Our Category",
    links: [
      { label: "THCA Flower", href: "/shop/thca-flower" },
      { label: "CBD", href: "/shop/cbd" },
      { label: "Capsules", href: "/shop/type/capsules" },
      { label: "Gummies", href: "/shop/type/gummies" },
      { label: "Nootropics", href: "/shop/nootropics" },
    ],
  },
  {
    title: "Customer Services",
    links: [
      { label: "Shipping & Returns", href: "/shipping-returns" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-conditions" },
      { label: "FDA Disclaimer", href: "/fda-disclaimer" },
    ],
  },
];

const SOCIAL_LINKS = [
  { label: "Facebook", href: "#", icon: Facebook01Icon },
  { label: "Instagram", href: "#", icon: InstagramIcon },
  { label: "X", href: "#", icon: NewTwitterIcon },
];

export default function Footer() {
  return (
    <footer className="border-t border bg-background">
      <div className="mx-auto flex w-full max-w-7xl pt-4 flex-col px-4">
        <div className="flex flex-col pb-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-2xl transition-colors hover:text-primary"
            >
              <Image src="/Logo2.png" alt="Nirvana Today Logo" className="size-14" width={100} height={100} />
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                aria-label={link.label}
                className="inline-flex p-2 items-center justify-center rounded-full border bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <HugeiconsIcon icon={link.icon} strokeWidth={1.8} className="size-5" />
              </Link>
            ))}
          </div>
        </div>

        <div className="grid p-4 rounded-2xl border lg:grid-cols-[1fr_1fr_1fr_1.15fr]">
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className="space-y-5">
              <h2 className="text-xl font-semibold text-foreground">
                {section.title}
              </h2>
              <ul className="space-y-1 ">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Stay in the loop
            </h2>
            <p className="max-w-sm text-sm text-muted-foreground">
              Get wellness tips, product launches and exclusive discounts.
            </p>

            <form className="space-y-2">
              <label htmlFor="footer-email" className="sr-only">
                Your Email Address
              </label>
              <Input
                id="footer-email"
                type="email"
                placeholder="Your Email Address"
                className="w-full"
              />
              <Button
                type="submit"
                className="w-full"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="py-4 text-sm text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Nirvana Today. All rights reserved.</p>
        </div>
      </div>
      {/* TODO: Need to work on it */}
      {/* <div className="border-t border-border/60 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="rounded-3xl border border-border/60 bg-card px-6 py-8 text-center sm:px-10">
            <div className="mx-auto flex size-20 items-center justify-center rounded-2xl border border-primary/40 bg-primary/8 text-primary">
              <HugeiconsIcon icon={HourglassIcon} strokeWidth={1.8} className="size-8" />
            </div>
            <div className="mt-5 space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                Third-Party Tested
              </h2>
              <p className="mx-auto max-w-3xl text-base leading-7 text-muted-foreground">
                COAs for every batch, covering potency, heavy metals, and residual solvents.
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </footer>
  );
}
