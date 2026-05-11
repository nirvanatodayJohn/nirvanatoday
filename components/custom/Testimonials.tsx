"use client"
import { StarIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type Testimonial = {
    name: string;
    quote: string;
    stars: number;
    avatar: string;
    role: string;
};
function StarRow({ count }: { count: number }) {
    return (
        <div className="flex items-center gap-1 text-amber-500" aria-label={`${count} star review`}>
            {Array.from({ length: count }).map((_, index) => (
                <HugeiconsIcon
                    key={index}
                    icon={StarIcon}
                    strokeWidth={1.8}
                    className="size-4 fill-current"
                />
            ))}
        </div>
    );
}
function createAvatar(initials: string, background: string, foreground: string) {
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" fill="none">
      <rect width="96" height="96" rx="28" fill="${background}"/>
      <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="${foreground}" font-family="Arial, sans-serif" font-size="30" font-weight="700">${initials}</text>
    </svg>
  `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}


const TESTIMONIALS: Testimonial[] = [
    {
        name: "Jenna M.",
        role: "THCA vape and flower customer",
        quote:
            "I have tried a few different shops, and I did not expect the THCA vapes and flower here to be priced this low. The products are lab tested and the labels actually tell you what you are getting, so it feels like you know the quality before you even try it.",
        stars: 5,
        avatar: createAvatar("JM", "#E8F4DA", "#497A2F"),
    },
    {
        name: "Daniel S.",
        role: "Nationwide shipping customer",
        quote:
            "I've ordered from Nirvana Today a few times now, and honestly, I'm always surprised by how fast my orders get here. Even though I'm not in Florida, they still show up quick, and the packaging is always discreet. It feels like they really do have a nationwide operation.",
        stars: 5,
        avatar: createAvatar("DS", "#F2F7E9", "#5A8D3A"),
    },
    {
        name: "Austin Hayes",
        role: "Repeat THCA buyer",
        quote:
            "I've been using Nirvana Today for a bit now, and I have to say, I'm pretty impressed with the THCA vapes and flower. The prices are way lower than I expected, especially for lab-tested stuff. Feels like I found a solid go-to for quality without paying a premium.",
        stars: 5,
        avatar: createAvatar("AH", "#EDF2E4", "#6A9650"),
    },
    {
        name: "Jenna M.",
        role: "Value-focused customer",
        quote:
            "I have tried a few different shops, and I did not expect the THCA vapes and flower here to be priced this low. The products are lab tested and the labels actually tell you what you are getting, so it feels like you know the quality before you even try it.",
        stars: 5,
        avatar: createAvatar("JM", "#E6F0E1", "#5F8947"),
    },
    {
        name: "Daniel S.",
        role: "Fast delivery customer",
        quote:
            "I've ordered from Nirvana Today a few times now, and honestly, I'm always surprised by how fast my orders get here. Even though I'm not in Florida, they still show up quick, and the packaging is always discreet. It feels like they really do have a nationwide operation.",
        stars: 5,
        avatar: createAvatar("DS", "#F0F6E6", "#628A49"),
    },
    {
        name: "Austin Hayes",
        role: "Quality-without-premium buyer",
        quote:
            "I've been using Nirvana Today for a bit now, and I have to say, I'm pretty impressed with the THCA vapes and flower. The prices are way lower than I expected, especially for lab-tested stuff. Feels like I found a solid go-to for quality without paying a premium.",
        stars: 5,
        avatar: createAvatar("AH", "#E7F1E1", "#5A8244"),
    },
];


export default function Testimonials() {
    return (
        <section className="border-t py-16 px-10">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
                <p className="text-center text-lg font-semibold text-foreground sm:text-2xl">
                    What our Customers Say
                </p>

                <div className="rounded-[calc(var(--radius)*3.5)] border bg-card p-3 sm:p-4">
                    <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                        {TESTIMONIALS.map((testimonial, i) => (
                            <article
                                key={i}
                                className="grid min-h-80 grid-rows-[auto_1fr_auto] rounded-2xl border border-border/60 bg-muted px-6 py-7"
                            >
                                <div>
                                    <StarRow count={testimonial.stars} />
                                </div>

                                <div className="flex items-start py-6">
                                    <p className="text-balance font-serif text-base font-medium text-foreground italic">
                                        "{testimonial.quote}"
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 border-t border-border/60 pt-5">
                                    <img
                                        src={testimonial.avatar}
                                        alt={`${testimonial.name} profile`}
                                        className="size-14 rounded-full border border-border/60 bg-background object-cover"
                                    />
                                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                                        {testimonial.name}
                                    </h3>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
