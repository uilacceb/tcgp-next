"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-[#d3d9db] dark:bg-[#001c29] z-1000">
      <Link href="/">
        <Image
          src="/icons/logo.png"
          alt="logo"
          width={100}
          height={100}
          className="cursor-pointer"
        />
      </Link>
      <div className="flex gap-2">
        {/* <input
          className="border-2 border-gray-400 h-[70%] px-2 py-2 rounded-full bg-[#f1f1f1] dark:text-zinc-900"
          placeholder="Search pokemon"
        ></input> */}
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
