import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LogoutCircle02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { getCustomer } from "@/lib/shopify";
import { logoutAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default async function AccountPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("shopify_customer_token")?.value;

  if (!token) {
    redirect("/auth?mode=login");
  }

  const customer = await getCustomer(token);

  if (!customer) {
    redirect("/auth?mode=login");
  }

  const fullName = [customer.firstName, customer.lastName].filter(Boolean).join(" ") || "Guest";
  const shippingAddress = customer.defaultAddress;
  const hasOrders = customer.orders?.edges?.length > 0;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border/60 bg-background/95 p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">
              Account
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Welcome back, {customer.firstName || "there"}.
            </h1>
            <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
              Everything important in one place - your orders, addresses, and personal account details.
            </p>
          </div>
          <form action={logoutAction}>
            <Button variant="destructive" type="submit" className="h-10 rounded-full px-5">
              <HugeiconsIcon icon={LogoutCircle02Icon} strokeWidth={2.2} className="size-4" />
              Log Out
            </Button>
          </form>
        </div>
      </div>

      <Tabs defaultValue="orders" className="mt-8 gap-6">
        <TabsList className="h-auto rounded-full p-1">
          <TabsTrigger value="orders" className="rounded-full px-5 py-2">
            Orders
          </TabsTrigger>
          <TabsTrigger value="addresses" className="rounded-full px-5 py-2">
            Addresses
          </TabsTrigger>
          <TabsTrigger value="account" className="rounded-full px-5 py-2">
            Account
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <Card className="rounded-3xl border-border/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-semibold tracking-tight">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {hasOrders ? (
                <div className="space-y-3">
                  {customer.orders.edges.map((edge: any) => {
                    const order = edge.node;
                    return (
                      <div
                        key={order.id}
                        className="flex items-center justify-between rounded-2xl border border-border/60 bg-muted/20 p-4"
                      >
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-foreground">Order #{order.orderNumber}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.processedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-foreground">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: order.totalPrice.currencyCode,
                          }).format(order.totalPrice.amount)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <Empty className="rounded-2xl border border-dashed border-border/70 bg-muted/20">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">O</EmptyMedia>
                    <EmptyTitle>No orders yet</EmptyTitle>
                    <EmptyDescription>
                      Once you place your first order, it will appear here with date and total.
                    </EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent>
                    <Link
                      href="/shop"
                      className="inline-flex h-9 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
                    >
                      Start shopping
                    </Link>
                  </EmptyContent>
                </Empty>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="addresses">
          <Card className="rounded-3xl border-border/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-semibold tracking-tight">Addresses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
                <p className="text-xs font-semibold text-muted-foreground">
                  Shipping
                </p>
                {shippingAddress ? (
                  <div className="mt-2 space-y-1 text-sm text-foreground">
                    <p>{fullName}</p>
                    <p>{shippingAddress.address1}</p>
                    <p>
                      {shippingAddress.city}, {shippingAddress.country}
                    </p>
                  </div>
                ) : (
                  <Empty className="mt-3 rounded-xl border border-dashed border-border/70 p-6">
                    <EmptyHeader>
                      <EmptyTitle>No shipping address</EmptyTitle>
                      <EmptyDescription>
                        Add one at checkout and it will be saved here for faster purchases.
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                )}
              </div>

              <Separator />

              <Empty className="rounded-2xl border border-dashed border-border/70 bg-muted/10">
                <EmptyHeader>
                  <EmptyTitle>No billing address</EmptyTitle>
                  <EmptyDescription>
                    Billing details will show up here after your first completed purchase.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card className="rounded-3xl border-border/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-semibold tracking-tight">Account Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
                  <p className="text-xs font-semibold text-muted-foreground">Name</p>
                  <p className="mt-2 text-sm font-medium text-foreground">{fullName}</p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
                  <p className="text-xs font-semibold text-muted-foreground">Email</p>
                  <p className="mt-2 text-sm font-medium text-foreground break-all">{customer.email}</p>
                </div>
                <div className="rounded-2xl border border-dashed border-border/70 bg-muted/10 p-4">
                  <p className="text-xs font-semibold text-muted-foreground">Phone</p>
                  {customer.phone ? (
                    <p className="mt-2 text-sm font-medium text-foreground">{customer.phone}</p>
                  ) : (
                    <Empty className="mt-3 rounded-xl border border-dashed border-border/70 p-5">
                      <EmptyHeader>
                        <EmptyTitle>No phone number</EmptyTitle>
                        <EmptyDescription>
                          Add a number during checkout if you want delivery updates.
                        </EmptyDescription>
                      </EmptyHeader>
                    </Empty>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
