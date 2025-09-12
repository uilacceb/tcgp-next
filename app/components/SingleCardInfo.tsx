// components/SingleCardInfo.tsx
"use client";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  unoptimized?: boolean;
};

export default function SingleCardInfo({
  src,
  alt,
  width,
  height,
  unoptimized = false,
}: Props) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="aspect-[7/10] md:w-[150px] lg:w-[200px] 
                      relative z-[1]"
    />
  );
}
