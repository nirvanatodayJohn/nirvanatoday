export default function CategoryLoading() {
    return (
        <div className="min-h-screen bg-background">
            <main className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                {/* Header Skeleton */}
                <div className="flex flex-col gap-4 border-b border-border/40 pb-12 sm:flex-row sm:items-end sm:justify-between text-left">
                    <div className="space-y-4">
                        <div className="h-4 w-32 animate-pulse rounded bg-muted/40" />
                        <div className="h-16 w-3/4 animate-pulse rounded-2xl bg-muted" />
                        <div className="h-6 w-2/3 animate-pulse rounded bg-muted/30" />
                    </div>
                    <div className="h-6 w-24 animate-pulse rounded bg-muted/20" />
                </div>

                {/* Product Grid Skeleton */}
                <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="flex flex-col space-y-4">
                             <div className="relative aspect-4/5 w-full animate-pulse rounded-[2rem] bg-muted/30" />
                             <div className="flex items-start justify-between px-2 text-left">
                                <div className="space-y-2">
                                    <div className="h-6 w-32 animate-pulse rounded bg-muted" />
                                    <div className="h-4 w-24 animate-pulse rounded bg-muted/60" />
                                </div>
                                <div className="h-6 w-16 animate-pulse rounded bg-muted" />
                             </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}
