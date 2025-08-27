// components/SingleCardInfo.tsx
"use client";
import Image from "next/image";
import Link from "next/link";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  href: string; // pass `/${series}/${slug}`
};

export default function SingleCardInfo({ src, alt, width, height, href }: Props) {
  return (
    <Link href={href} scroll={false}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="aspect-[7/10] relative z-[1] rounded-[5px]"
      />
    </Link>
  );
}
