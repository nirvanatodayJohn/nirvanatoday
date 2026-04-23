import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft02Icon, PackageIcon, TruckIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { getCustomerOrder } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("shopify_customer_token")?.value;

  if (!token) {
    redirect("/auth?mode=login");
  }

  const { id } = await params;
  // Decode the ID from the URL (it might be double encoded or need base64 decoding if we passed it in a specific way)
  const decodedId = decodeURIComponent(id);
  
  const order = await getCustomerOrder(token, decodedId);

  if (!order) {
    return (
      <main className="mx-auto w-full max-w-4xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Order not found</h1>
        <p className="mt-4 text-muted-foreground">We couldn't find the details for this order.</p>
        <Link href="/account" className="mt-8 inline-block font-bold text-primary underline">
          Back to Account
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/account"
        className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
      >
        <HugeiconsIcon icon={ArrowLeft02Icon} className="size-4 transition-transform group-hover:-translate-x-1" />
        Back to Orders
      </Link>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Order Details</p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Order #{order.orderNumber}
          </h1>
          <p className="text-muted-foreground">
            Placed on {new Date(order.processedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-3">
            <Link href={order.statusUrl} target="_blank">
                <Button variant="outline" className="rounded-full">
                    View Full Status
                </Button>
            </Link>
        </div>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {/* Main Order Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Order Items */}
          <div className="rounded-3xl border border-border/60 bg-background p-6 sm:p-8">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold">
              <HugeiconsIcon icon={PackageIcon} className="size-5" />
              Items
            </h2>
            <div className="divide-y divide-border/60">
              {order.lineItems.edges.map((edge: any) => {
                const item = edge.node;
                return (
                  <div key={item.variant.id} className="flex gap-4 py-6 first:pt-0 last:pb-0">
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl border border-border/40 bg-muted/20">
                      {item.variant.image ? (
                        <Image
                          src={item.variant.image.url}
                          alt={item.variant.image.altText || item.title}
                          fill
                          className="object-contain p-2"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted text-xs text-muted-foreground">No image</div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <Link href={`/product/${item.variant.product.handle}`} className="font-semibold hover:underline">
                          {item.title}
                        </Link>
                        <p className="text-sm text-muted-foreground">{item.variant.title}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-sm">Qty: {item.quantity}</p>
                        <p className="font-bold">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: item.variant.price.currencyCode,
                          }).format(item.variant.price.amount * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Fulfillment/Tracking */}
          {order.successfulFulfillments?.length > 0 && (
            <div className="rounded-3xl border border-border/60 bg-primary/5 p-6 sm:p-8">
              <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-primary">
                <HugeiconsIcon icon={TruckIcon} className="size-5" />
                Shipping & Tracking
              </h2>
              <div className="space-y-4">
                {order.successfulFulfillments.map((fulfillment: any, idx: number) => (
                  <div key={idx} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-primary/20 bg-background p-4">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{fulfillment.trackingCompany}</p>
                      <p className="font-bold">{fulfillment.trackingInfo[0]?.number || "Fulfillment in progress"}</p>
                    </div>
                    {fulfillment.trackingInfo[0]?.url && (
                        <Link href={fulfillment.trackingInfo[0].url} target="_blank">
                            <Button variant="outline" size="sm" className="rounded-full border-primary/30 text-primary hover:bg-primary/10">
                                Track Package
                            </Button>
                        </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Summary */}
        <div className="space-y-8">
          {/* Summary */}
          <div className="rounded-3xl border border-border/60 bg-muted/20 p-6">
            <h2 className="mb-6 text-lg font-semibold">Order Summary</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: order.subtotalPrice.currencyCode,
                  }).format(order.subtotalPrice.amount)}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: order.totalShippingPrice.currencyCode,
                  }).format(order.totalShippingPrice.amount)}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax</span>
                <span>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: order.totalTax.currencyCode,
                  }).format(order.totalTax.amount)}
                </span>
              </div>
              <div className="pt-4 border-t border-border flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: order.totalPrice.currencyCode,
                  }).format(order.totalPrice.amount)}
                </span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="rounded-3xl border border-border/60 bg-background p-6">
            <h2 className="mb-4 text-base font-semibold">Shipping Address</h2>
            <div className="text-sm text-muted-foreground space-y-1">
              <p className="font-bold text-foreground">
                {order.shippingAddress.firstName} {order.shippingAddress.lastName}
              </p>
              <p>{order.shippingAddress.address1}</p>
              {order.shippingAddress.address2 && <p>{order.shippingAddress.address2}</p>}
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.province}{" "}
                {order.shippingAddress.zip}
              </p>
              <p>{order.shippingAddress.country}</p>
              {order.shippingAddress.phone && <p className="pt-2">{order.shippingAddress.phone}</p>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
