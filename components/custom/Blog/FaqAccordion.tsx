"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface FaqAccordionProps {
  html: string;
}

export function FaqAccordion({ html }: FaqAccordionProps) {
  const segments: React.ReactNode[] = [];

  const regex = /<h3[^>]*>(.*?\?)<\/h3>([\s\S]*?)(?=<h3|$)/gi;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(html)) !== null) {
    // Push content before the match as raw HTML
    const before = html.substring(lastIndex, match.index);
    if (before.trim()) {
      segments.push(<div key={`text-${lastIndex}`} dangerouslySetInnerHTML={{ __html: before }} />);
    }

    const question = match[1].replace(/<[^>]+>/g, "").trim();
    const answer = match[2].trim();

    segments.push(
      <Accordion className="border-none rounded-none bg-transparent" key={`faq-${match.index}`}>
        <AccordionItem value="item-1" className="border-b border-border/10">
          <AccordionTrigger className="text-2xl font-semibold hover:no-underline p-0 py-4 border-none bg-transparent">
            {question}
          </AccordionTrigger>
          <AccordionContent className="text-lg text-foreground/80 leading-relaxed p-0 pb-4 bg-transparent border-none">
            <div dangerouslySetInnerHTML={{ __html: answer }} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    lastIndex = regex.lastIndex;
  }

  // Push remaining content
  const remaining = html.substring(lastIndex);
  if (remaining.trim()) {
    segments.push(<div key="text-end" dangerouslySetInnerHTML={{ __html: remaining }} />);
  }

  return (
    <div className="faq-container prose-apple">
      {segments.length > 0 ? segments : <div dangerouslySetInnerHTML={{ __html: html }} />}
    </div>
  );
}
