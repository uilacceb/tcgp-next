"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Image
      src="/icons/theme.png"
      alt="theme toggle"
      width={40}
      height={40}
      className="cursor-pointer"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    />
  );
}
