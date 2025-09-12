"use client";

import Image from "next/image";
import React, { useState } from "react";

const Footer = () => {
  const [expanded, setExpanded] = useState(false);

  const text =
    "The literal and graphical information presented on this website about the Pokémon Trading Card Game Pocket, including card images and text, is copyright The Pokémon Company, DeNA Co., Ltd., and/or Creatures, Inc. This website is not produced by, endorsed by, supported by, or affiliated with any of those copyright holders.";

  return (
    <footer className="p-4 flex justify-center items-center">
      {/* Tablet/Desktop: always show full text */}
      <p className="hidden md:flex items-center gap-2 md:w-[70%] lg:w-[50%] p-2 leading-relaxed text-sm">
        <img
          src="/icons/psyduck.png"
          alt="Psyduck logo"
          width={30}
          height={30}
          className="inline"
        />
        <span>{text}</span>
      </p>

      {/* Mobile: one line + Read more toggle */}
      <div className="md:hidden flex items-center gap-2 w-full">
        <img
          src="/icons/psyduck.png"
          alt="Psyduck logo"
          width={24}
          height={24}
          className="shrink-0"
        />

        <p
          id="disclaimer"
          className={`flex-1 text-sm p-2 ${
            expanded ? "whitespace-normal" : "truncate whitespace-nowrap"
          }`}
        >
          {text}
        </p>

        <button
          type="button"
          aria-expanded={expanded}
          aria-controls="disclaimer"
          onClick={() => setExpanded((v) => !v)}
          className="shrink-0 text-xs underline underline-offset-2"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      </div>
    </footer>
  );
};

export default Footer;
