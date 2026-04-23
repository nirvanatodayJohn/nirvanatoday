export default function ProductLoading() {
    return (
        <div className="min-h-screen bg-background text-left">
            <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="h-6 w-32 animate-pulse rounded bg-muted/60" />
            </div>

            <main className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
                    {/* Media Skeleton */}
                    <div className="aspect-square w-full animate-pulse rounded-[3rem] bg-muted/30" />

                    {/* Info Skeleton */}
                    <div className="flex flex-col justify-center space-y-8">
                        <div className="space-y-4">
                            <div className="h-4 w-32 animate-pulse rounded bg-muted/40" />
                            <div className="h-16 w-full animate-pulse rounded-2xl bg-muted" />
                            <div className="h-16 w-3/4 animate-pulse rounded-2xl bg-muted/80" />
                        </div>

                        <div className="h-10 w-40 animate-pulse rounded bg-muted/60" />

                        <div className="space-y-4 pt-8">
                            <div className="h-4 w-full animate-pulse rounded bg-muted/40" />
                            <div className="h-4 w-full animate-pulse rounded bg-muted/40" />
                            <div className="h-4 w-2/3 animate-pulse rounded bg-muted/40" />
                        </div>

                        {/* USP Skeleton */}
                        <div className="mt-12 grid grid-cols-2 gap-6 border-y border-border/40 py-10">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-6 w-32 animate-pulse rounded bg-muted/30" />
                            ))}
                        </div>

                        <div className="mt-12 flex gap-4">
                            <div className="h-16 flex-1 animate-pulse rounded-2xl bg-muted" />
                            <div className="h-16 flex-1 animate-pulse rounded-2xl bg-muted/60" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
