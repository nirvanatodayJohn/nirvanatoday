"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { FAQ_ITEMS } from "@/lib/data"

export default function FAQ() {
    return (
        <section className="border-t px-10 py-16">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-muted-foreground sm:text-base">
                        Everything you need to know about our products, shipping, and policies.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-x-12 gap-y-0 lg:grid-cols-2">
                    <div className="flex flex-col">
                        <Accordion className="w-full">
                            {FAQ_ITEMS.slice(0, Math.ceil(FAQ_ITEMS.length / 2)).map((item, index) => (
                                <AccordionItem key={index} value={`item-left-${index}`} className="border-border/60">
                                    <AccordionTrigger className="py-5 text-left text-sm font-medium hover:no-underline sm:text-base">
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-6 text-muted-foreground sm:text-sm">
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    <div className="flex flex-col">
                        <Accordion className="w-full">
                            {FAQ_ITEMS.slice(Math.ceil(FAQ_ITEMS.length / 2)).map((item, index) => (
                                <AccordionItem key={index} value={`item-right-${index}`} className="border-border/60">
                                    <AccordionTrigger className="py-5 text-left text-sm font-medium hover:no-underline sm:text-base">
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-6 text-muted-foreground sm:text-sm">
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    )
}
