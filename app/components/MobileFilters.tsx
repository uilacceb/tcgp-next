// app/components/MobileFilters.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SideFilter from "./SideFilter";

export default function MobileFilters() {
  const [open, setOpen] = useState(false);

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  return (
    <>
      {/* Floating trigger (mobile only) */}
      <button
        className="md:hidden fixed bottom-4 right-4 z-40 rounded-full p-2
                   bg-white/90 dark:bg-neutral-800 shadow-lg
                   border border-black/10 dark:border-white/10"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-controls="mobile-filter"
        aria-expanded={open}
      >
        <Image src="/icons/filter.png" alt="filter" width={40} height={40} />
      </button>

      {/* Drawer + overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
          id="mobile-filter"
        >
          {/* Backdrop */}
          <button
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-label="Close filters"
          />

          {/* Slide-in panel from the left */}
          <div
            className={`absolute left-0 top-0 h-full w-[88%] max-w-sm
                        bg-white dark:bg-neutral-900 shadow-2xl
                        border-r border-black/10 dark:border-white/10
                        transform transition-transform duration-200
                        -translate-x-full ${open ? "translate-x-0" : ""}`}
          >
            {/* Column layout so we can make the middle scrollable */}
            <div className="flex h-full flex-col">
              {/* SCROLLABLE CONTENT */}
              <div
                className="flex-1 overflow-y-auto px-4 pb-4
                           [-webkit-overflow-scrolling:touch]"
              >
                {/* Use the mobile variant so it isn't hidden by md: classes */}
                <SideFilter variant="mobile" onSelect={() => setOpen(false)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
