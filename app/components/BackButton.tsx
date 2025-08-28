"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = ({ href }: { href?: string }) => {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => (href ? router.replace(href) : router.back())}
      className="px-3 py-1 rounded flex cursor-pointer"
    >
      <Image
        src="/icons/return.png"
        alt="back arrow logo"
        height={20}
        width={25}
        className=" dark:invert dark:brightness-0 dark:opacity-100"
      />
      <p className="pl-1 font-bold">back</p>
    </button>
  );
};

export default BackButton;
