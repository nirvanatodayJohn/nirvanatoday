"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

import {
  ArrowRight01Icon,
  Cancel01Icon,
  Menu01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import CartSheet from "@/components/custom/CartSheet";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { BANNER_ITEMS, PRIMARY_LINKS, PRODUCT_FAMILIES, ProductFamily, SHOP_BY_TYPE } from "@/lib/data";
import Image from "next/image";


function toSlug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function getFamilyHref(name: string) {
  return `/shop/${toSlug(name)}`;
}

function getTypeHref(name: string) {
  return `/shop/type/${toSlug(name)}`;
}

function getProductHref(familyName: string, itemName: string) {
  return `${getFamilyHref(familyName)}/${toSlug(itemName)}`;
}

function isPathActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function DesktopTopLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        navigationMenuTriggerStyle(),
        active && "bg-muted text-foreground"
      )}
    >
      {label}
    </Link>
  );
}

function FamilySelector({
  active,
  family,
  onActivate,
}: {
  active: boolean;
  family: ProductFamily;
  onActivate: (name: string | null) => void;
}) {
  return (
    <button
      type="button"
      onPointerEnter={() => onActivate(family.name)}
      onPointerMove={() => onActivate(family.name)}
      className={cn(
        "flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors",
        active
          ? "border-border bg-muted"
          : "border-transparent bg-transparent hover:border-border/50 hover:bg-muted/40"
      )}
    >
      <span className={cn("text-sm font-medium", active ? "text-primary" : "text-foreground")}>
        {family.name}
      </span>
      <HugeiconsIcon
        icon={ArrowRight01Icon}
        strokeWidth={2}
        className={cn(
          "size-4 shrink-0 transition-all duration-200",
          active ? "translate-x-0.5 text-primary opacity-100" : "text-muted-foreground opacity-0 -translate-x-1"
        )}
      />
    </button>
  );
}

function TypeLink({
  pathname,
  type,
}: {
  pathname: string;
  type: string;
}) {
  const href = getTypeHref(type);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center rounded-lg bg-transparent p-2.5 text-sm font-medium transition-colors hover:bg-muted hover:border-border/50 hover:text-primary",
        isPathActive(pathname, href) && "bg-muted text-primary border-border/50"
      )}
    >
      {type}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeFamilyName, setActiveFamilyName] = useState<string | null>(null);
  const marqueeItems = [...BANNER_ITEMS, ...BANNER_ITEMS];

  const shopAllActive = useMemo(
    () =>
      PRODUCT_FAMILIES.some((family) =>
        isPathActive(pathname, getFamilyHref(family.name))
      ),
    [pathname]
  );

  const shopByTypeActive = useMemo(
    () => SHOP_BY_TYPE.some((type) => isPathActive(pathname, getTypeHref(type))),
    [pathname]
  );

  const closeMobileMenu = () => setMobileOpen(false);

  const activeFamily = PRODUCT_FAMILIES.find(
    (family) => family.name === activeFamilyName
  );

  return (
    <header className="z-40 bg-background">
      <div
        className="relative isolate overflow-hidden border-b bg-primary/90 text-black"
      >
        <div
          className="relative mx-auto flex max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0, white 10%, white 90%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, white 10%, white 90%, transparent 100%)",
          }}
        >
          <div className="marquee-track flex min-w-max shrink-0 items-center gap-6 py-5 will-change-transform motion-reduce:animate-none">
            {marqueeItems.map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="flex shrink-0 items-center gap-4 text-sm font-semibold "
              >
                <span className="whitespace-nowrap text-black">{item}</span>
                <span
                  aria-hidden="true"
                  className="h-4 w-px rounded-full bg-black/60"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className=""
        >
          <Image src="/Logo.png" width={200} height={200} alt="Logo" className="w-fit sm:h-16 h-14" />
        </Link>

        <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
          <NavigationMenu className="w-full justify-center">
            <NavigationMenuList>
              <NavigationMenuItem>
                <DesktopTopLink
                  href="/"
                  label="Home"
                  active={isPathActive(pathname, "/")}
                />
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(shopAllActive && "bg-muted text-foreground")}
                >
                  Shop All
                </NavigationMenuTrigger>
                <NavigationMenuContent onMouseLeave={() => setActiveFamilyName(null)}>
                    <div className="flex gap-2 p-3 w-max min-w-120">
                    {/* Left Intro Card (That Beautiful Thing) */}
                    <div className="flex w-60 shrink-0 flex-col justify-between rounded-2xl bg-muted p-5 transition-all duration-300">
                      <div className="space-y-3">
                        <p className="text-sm font-medium text-primary">
                          {activeFamily ? `Shop ${activeFamily.name}` : "Shop All"}
                        </p>
                        <div className="space-y-2">
                          <h2 className="text-xl font-semibold tracking-tight text-foreground">
                            {activeFamily ? `Explore ${activeFamily.name}.` : "Explore by family."}
                          </h2>
                          <p className="text-sm leading-6 text-muted-foreground">
                            {activeFamily 
                              ? `Our premium selection of ${activeFamily.name} products.`
                              : "Find the perfect format that fits your routine."
                            }
                          </p>
                        </div>
                      </div>
                      <Link
                        href={activeFamily ? getFamilyHref(activeFamily.name) : "/shop"}
                        className={cn(
                          "mt-5 inline-flex w-fit items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-sm transition-colors hover:bg-card",
                          isPathActive(pathname, activeFamily ? getFamilyHref(activeFamily.name) : "/shop") && "bg-card"
                        )}
                      >
                        {activeFamily ? `Browse all ${activeFamily.name}` : "Browse all"}
                        <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={1.8} className="size-4" />
                      </Link>
                    </div>

                    {/* Middle: Family Navigation Menu */}
                    <div className={cn("flex w-52.5 shrink-0 flex-col gap-1 py-2 transition-all duration-300", activeFamily ? "border-r border-border/50 pr-2" : "pl-1")}>
                      {PRODUCT_FAMILIES.map((family) => (
                        <FamilySelector
                          key={family.name}
                          active={family.name === activeFamilyName}
                          family={family}
                          onActivate={setActiveFamilyName}
                        />
                      ))}
                    </div>

                    {/* Right dynamically loaded format list natively embedded for stability */}
                    {activeFamily && (
                      <div className="flex w-57.5 shrink-0 flex-col px-3 py-2 animate-in fade-in slide-in-from-left-4 duration-300">
                        <div className="grid gap-1">
                          {activeFamily.items.map((item) => (
                            <Link
                              key={item}
                              href={getProductHref(activeFamily.name, item)}
                              className="w-full block rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
                              onClick={() => setActiveFamilyName(null)}
                            >
                              {item}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(shopByTypeActive && "bg-muted text-foreground")}
                >
                  Shop by Type
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-fit grid grid-cols-2 gap-2">
                    {SHOP_BY_TYPE.map((type) => (
                      <TypeLink key={type} pathname={pathname} type={type} />
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {PRIMARY_LINKS.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <DesktopTopLink
                    href={link.href}
                    label={link.label}
                    active={isPathActive(pathname, link.href)}
                  />
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <CartSheet />
          <Link
            href="/account"
            aria-label="Account"
            className={buttonVariants({ variant: "ghost", size: "icon" })}
          >
            <HugeiconsIcon icon={UserIcon} strokeWidth={1.8} />
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <CartSheet />
          <Button
            variant="ghost"
            size="icon"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <HugeiconsIcon
              icon={mobileOpen ? Cancel01Icon : Menu01Icon}
              strokeWidth={1.8}
            />
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6">
            <div className="grid gap-2">
              <Link
                href="/"
                className={cn(
                  "rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-muted",
                  isPathActive(pathname, "/") && "bg-muted"
                )}
                onClick={closeMobileMenu}
              >
                Home
              </Link>
            </div>

            <Accordion className="rounded-xl border-border">
              <AccordionItem value="shop-all">
                <AccordionTrigger>Shop All</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  {PRODUCT_FAMILIES.map((family) => (
                    <div key={family.name} className="space-y-2 rounded-xl bg-muted/50 p-3">
                      <Link
                        href={getFamilyHref(family.name)}
                        className="block text-sm font-medium text-foreground"
                        onClick={closeMobileMenu}
                      >
                        {family.name}
                      </Link>
                      <div className="grid gap-1">
                        {family.items.map((item) => (
                          <Link
                            key={item}
                            href={getProductHref(family.name, item)}
                            className="rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                            onClick={closeMobileMenu}
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shop-by-type">
                <AccordionTrigger>Shop by Type</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2">
                    {SHOP_BY_TYPE.map((type) => (
                      <Link
                        key={type}
                        href={getTypeHref(type)}
                        className="rounded-xl px-3 py-2 text-sm transition-colors hover:bg-muted"
                        onClick={closeMobileMenu}
                      >
                        {type}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="grid gap-2">
              {PRIMARY_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-muted",
                    isPathActive(pathname, link.href) && "bg-muted"
                  )}
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/account"
                className={cn(
                  "rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-muted",
                  isPathActive(pathname, "/account") && "bg-muted"
                )}
                onClick={closeMobileMenu}
              >
                Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
