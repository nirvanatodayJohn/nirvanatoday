"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUp } from "@hugeicons/core-free-icons";

export default function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-5 right-5 z-1000 flex flex-col gap-3">
      {isVisible && (
        <div className="group">
          <Button
            size="icon-lg"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="cen rounded-full transition-transform group-hover:-translate-y-1 active:scale-95"
          >
            <HugeiconsIcon icon={ArrowUp} className="" />
          </Button>
        </div>
      )}
    </div>
  );
}
