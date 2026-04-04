import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCustomer } from "@/lib/shopify";
import { logoutAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AccountPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("shopify_customer_token")?.value;

    if (!token) {
        redirect("/auth?mode=login");
    }

    const customer = await getCustomer(token);

    if (!customer) {
        // Token might be invalid or expired
        redirect("/auth?mode=login");
    }

    return (
        <div className="container mx-auto py-10 px-6 max-w-4xl">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-bold tracking-tight">Your Account</h1>
                <form action={logoutAction}>
                    <Button variant="outline" type="submit">Log Out</Button>
                </form>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground uppercase">Name</p>
                            <p className="text-lg">{customer.firstName} {customer.lastName}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground uppercase">Email</p>
                            <p className="text-lg">{customer.email}</p>
                        </div>
                        {customer.phone && (
                            <div>
                                <p className="text-sm font-medium text-muted-foreground uppercase">Phone</p>
                                <p className="text-lg">{customer.phone}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {customer.orders.edges.length > 0 ? (
                            <div className="space-y-4">
                                {customer.orders.edges.map((edge: any) => {
                                    const order = edge.node;
                                    return (
                                        <div key={order.id} className="flex justify-between items-center p-3 border rounded-lg">
                                            <div>
                                                <p className="font-medium">Order #{order.orderNumber}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {new Date(order.processedAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <p className="font-bold">
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
                            <p className="text-muted-foreground">No orders yet.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
