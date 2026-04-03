import Link from "next/link";
import {
    File,
    ArrowUpRight01Icon,
    Beaker,
    CircleCheck,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";

const labResultsData = [
    {
        category: "Gummies",
        items: [
            { name: "CBD Gummies THC Free 1500mg 60ct", url: "https://drive.google.com/file/d/1wZwXgMMwc-jUEj850QDRr-zrRUkP_p5i/view?usp=drive_link" },
            { name: "CBD Gummies THC Free 750mg 30ct", url: "https://drive.google.com/file/d/1wZwXgMMwc-jUEj850QDRr-zrRUkP_p5i/view?usp=drive_link" },
            { name: "CBD Extra Strength Sleep Gummies 30ct", url: "https://drive.google.com/file/d/17Xkdt5joj7SL-wafE_9d9QZfEuiXtOeH/view" },
            { name: "CBD RELAX Gummies THC Free 750mg", url: "https://drive.google.com/file/d/1wZpkyCmrkc3OfT5Rqw3g_4O2X-WVsqj1/view" },
            { name: "CBD Sleep Gummies Melatonin THC Free 1500mg 60ct", url: "https://drive.google.com/file/d/1wZwXgMMwc-jUEj850QDRr-zrRUkP_p5i/view?usp=drive_link" },
            { name: "CBD Sleep Gummies Melatonin THC Free 750mg 30ct", url: "https://drive.google.com/file/d/1wZwXgMMwc-jUEj850QDRr-zrRUkP_p5i/view?usp=drive_link" },
            { name: "Delta 8 Extra Stregth Gummies 30ct", url: "https://drive.google.com/file/d/1w_UuNDz9M7ics4VzWJhONHTZ8vOi_NNi/view" },
            { name: "Delta 8 Gummies 1000mg 30ct", url: "https://drive.google.com/file/d/1wa4VeZKfc8GX_0RdwqseTGxI8u5ohPAJ/view?usp=drive_link" },
            { name: "Delta 8 Gummies 500mg 15ct", url: "https://drive.google.com/file/d/1wa4VeZKfc8GX_0RdwqseTGxI8u5ohPAJ/view?usp=drive_link" },
            { name: "Delta 9 + Lion’s Mane Gummies 30ct", url: "https://drive.google.com/file/d/1waLrIBxzg0cQsAbntXfJr7VOTZMsufJk/view?usp=drive_link" },
            { name: "Delta 9 Extra Strength Gummies 10ct", url: "https://drive.google.com/file/d/1wZwXgMMwc-jUEj850QDRr-zrRUkP_p5i/view" }
        ]
    },
    {
        category: "Tinctures",
        items: [
            { name: "Relax Tincture THC Free 2500mg", url: "https://drive.google.com/file/d/17LPpXrpYBSCqpA8lx9GB6fcAuU6WPx77/view" },
            { name: "Sleep Tincture THC Free 1500mg", url: "https://nirvanatoday.com/" },
            { name: "Full Spectrum CBD Tincture 3000mg", url: "https://drive.google.com/file/d/1w9E-2pvnfMp1ugbAnudRBcfYOyclkPVJ/view?usp=drive_link" },
            { name: "Full Spectrum CBD Tincture 1500mg", url: "https://drive.google.com/file/d/1wDPQ5oc0FRqKaZwVuRwjzAh0Ml7Awmmw/view?usp=drive_link" },
            { name: "Full Spectrum CBD Tincture 1000mg", url: "https://drive.google.com/file/d/1wDysPEB1xpzD0mGq-YmMEUa9-PUORslz/view?usp=drive_link" },
            { name: "Full Spectrum CBD Tincture 300mg", url: "https://drive.google.com/file/d/1wxgWz-bEfBR2yxmGeT5qVTtfjjJhMB1L/view" },
            { name: "Full Spectrum CBD Pet Tincture 300mg", url: "https://drive.google.com/file/d/1wxgWz-bEfBR2yxmGeT5qVTtfjjJhMB1L/view" },
            { name: "CBD Tincture THC Free 1000mg", url: "https://drive.google.com/file/d/1wE6Ru8gXQHAJdVOf96JX14Nl8X_oJCTY/view?usp=drive_link" },
            { name: "CBD Pet Tincture THC Free 1000mg", url: "https://drive.google.com/file/d/1wE6Ru8gXQHAJdVOf96JX14Nl8X_oJCTY/view?usp=drive_link" },
            { name: "CBD Pet Tincture THC Free 250mg", url: "https://drive.google.com/file/d/1wIFj26xs7el426_MEYKDHELA7vgdE3Ab/view?usp=drive_link" }
        ]
    },
    {
        category: "Flower & Pre Roll",
        items: [
            { name: "Delta 8 Pre Roll", url: "https://drive.google.com/file/d/1wo7TKhT-4ji0CAl7mT2PBMHkkFiM2Iuo/view" },
            { name: "HHC Pre Roll", "url": "https://drive.google.com/file/d/1woI7GvuMYMAUpj6TJfd0Orz8Uhxv5bHv/view" }
        ]
    },
    {
        category: "Topicals",
        items: [
            { name: "CBD Roll on Gel 1200mg", url: "https://drive.google.com/file/d/1o1iYF_NKttDevct1Ek1X9hpKRrepqkBT/view" },
            { name: "CBD Roll on Gel 4500mg", url: "https://drive.google.com/file/d/1o2Ac7RBv5CXZKXtZEgVGu9e8PyUoB7CH/view" },
            { name: "Delta 8 Balm 300mg", url: "https://drive.google.com/file/d/1rNW1DBX032kbBjBv6EIcDXFg-CE7mBag/view?usp=drive_link" },
            { name: "Full Spectrum CBD Balm 3000mg", url: "https://drive.google.com/file/d/1x10e6s41RFhuPpN6QyChyCg6uOsyMm3z/view" },
            { name: "Full Spectrum CBD Balm 1500mg", url: "https://drive.google.com/file/d/1wzm2bjA3S_674IrrDmFASr7vJ9wmK71_/view" },
            { name: "Full Spectrum CBD Balm 750mg", url: "https://drive.google.com/file/d/1qx-iklMR69ntyWLBdCrnXcbT1R5LhR1s/view?usp=drive_link" }
        ]
    },
    {
        category: "Vapes",
        items: [
            { name: "Full Spectrum CBD Disposable 2ML", url: "https://drive.google.com/file/d/1waf2QFIlRWu6nwOZ-vLD7rtnnH6OKWwP/view?usp=drive_link" },
            { name: "HHC Disposable 2ML", url: "https://drive.google.com/file/d/1wizIWzfe4o3ktZhPF4hpJ1NZ5xaMvtkQ/view" },
            { name: "Delta 8 Disposable 2ML", url: "https://drive.google.com/file/d/1weXNvBvyYf8g_SBtJL-FZ3rlFNubKl2n/view?usp=drive_link" },
            { name: "THCP Euphoria Disposable 2ML", url: "https://drive.google.com/file/d/19xmEOIvbUGWTcAgrxeEfe-mHmCT46Bw7/view" },
            { name: "Zen Blend Disposable 2ML", url: "https://drive.google.com/file/d/1BcpZvMFknZdZ5bCuMnnde3K2_oDeVaYa/view" }
        ]
    },
    {
        category: "Capsules",
        items: [
            { name: "Full Spectrum CBD Capsules 60ct", url: "https://drive.google.com/file/d/1wu4ZRBc5fd2gXgsQ0_9_aeU8p8RPYW-M/view?usp=drive_link" },
            { name: "Full Spectrum CBD Sleep Capsules Melatonin 60ct", url: "https://drive.google.com/file/d/1wu4ZRBc5fd2gXgsQ0_9_aeU8p8RPYW-M/view?usp=drive_link" },
            { name: "Delta 8 Capsules 1500mg 60ct", url: "https://drive.google.com/file/d/1wr3godcZQ7qJySIn_sSM-fUgOLtEdTqI/view?usp=drive_link" }
        ]
    }
];

export default function LabResultsPage() {
    return (
        <main className="min-h-screen bg-background pb-20">
            {/* Hero Section */}
            <section className="relative h-[40vh] min-h-75 flex items-center justify-center overflow-hidden bg-neutral-50 dark:bg-neutral-950">
                <div className="absolute inset-0 z-0 opacity-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-200 bg-primary rounded-full blur-[120px]" />
                </div>

                <div className="container relative z-10 mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                        <HugeiconsIcon icon={CircleCheck} size={16} />
                        <span>Third-Party Tested</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                        Quality You Can <span className="text-primary italic">Verify</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                        Transparency is at our core. Explore the detailed laboratory analysis for every Nirvana Today product to see exactly what goes into our premium blends.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <div className="container mx-auto px-6 -mt-10 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {labResultsData.map((section, idx) => (
                        <div
                            key={section.category}
                            className={cn(
                                "group flex flex-col h-full bg-card border rounded-3xl p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 fill-mode-both",
                                "animate-in fade-in slide-in-from-bottom-4 duration-700",
                                idx === 0 ? "delay-0" : idx === 1 ? "delay-100" : idx === 2 ? "delay-200" : idx === 3 ? "delay-300" : idx === 4 ? "delay-400" : "delay-500"
                            )}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                    <HugeiconsIcon icon={Beaker} size={22} />
                                </div>
                                <h2 className="text-xl font-semibold tracking-tight">{section.category}</h2>
                            </div>

                            <div className="flex-1 space-y-1">
                                {section.items.map((item, itemIdx) => (
                                    <Link
                                        key={itemIdx}
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between group/link p-3 rounded-2xl hover:bg-secondary transition-all duration-200"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <HugeiconsIcon icon={File} size={18} className="text-muted-foreground group-hover/link:text-primary shrink-0"  />
                                            <span className="text-sm font-medium text-foreground/80 group-hover/link:text-foreground line-clamp-1">
                                                {item.name}
                                            </span>
                                        </div>
                                        <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 text-primary shrink-0" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

