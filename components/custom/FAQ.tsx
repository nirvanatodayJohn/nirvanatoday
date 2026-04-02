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
        <section className="bg-background">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                <div className="flex flex-col items-center gap-4 text-center">
                    <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                        Frequently Asked Questions
                    </h2>
                    <p className="max-w-150 text-balance text-muted-foreground sm:text-lg">
                        Everything you need to know about our products, shipping, and policies.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-x-12 gap-y-0 lg:grid-cols-2">
                    <div className="flex flex-col">
                        <Accordion className="w-full">
                            {FAQ_ITEMS.slice(0, Math.ceil(FAQ_ITEMS.length / 2)).map((item, index) => (
                                <AccordionItem key={index} value={`item-left-${index}`} className="border-border/60">
                                    <AccordionTrigger className="py-5 text-left text-base font-medium hover:no-underline sm:text-lg">
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-6 text-muted-foreground sm:text-base">
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
                                    <AccordionTrigger className="py-5 text-left text-base font-medium hover:no-underline sm:text-lg">
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-6 text-muted-foreground sm:text-base">
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
