export default function ShopLoading() {
    return (
        <main className="flex-1 bg-background">
            {/* Header Skeleton */}
            <section className="border-b border-border/40 py-16 sm:py-24">
                <div className="mx-auto w-full max-w-7xl px-4">
                    <div className="flex flex-col items-center text-center">
                        <div className="h-16 w-64 animate-pulse rounded-2xl bg-muted" />
                        <div className="mt-8 h-6 w-96 animate-pulse rounded-lg bg-muted/60" />
                    </div>
                </div>
            </section>

            {/* Filter Bar Skeleton */}
            <div className="sticky top-20 z-30 border-b border-border/40 bg-background/80 backdrop-blur-xl">
                <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="h-9 w-24 animate-pulse rounded-full bg-muted/50" />
                        ))}
                    </div>
                    <div className="hidden gap-4 sm:flex">
                        <div className="h-6 w-16 animate-pulse rounded bg-muted/40" />
                        <div className="h-6 w-16 animate-pulse rounded bg-muted/40" />
                    </div>
                </div>
            </div>

            {/* Product Grid Skeleton */}
            <section className="py-12 sm:py-20">
                <div className="mx-auto w-full max-w-7xl px-4">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="flex flex-col gap-6">
                                <div className="relative aspect-4/5 w-full animate-pulse rounded-[2rem] bg-muted/30" />
                                <div className="flex justify-between px-2">
                                    <div className="space-y-2">
                                        <div className="h-6 w-40 animate-pulse rounded bg-muted" />
                                        <div className="h-4 w-24 animate-pulse rounded bg-muted/60" />
                                    </div>
                                    <div className="h-6 w-16 animate-pulse rounded bg-muted" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
