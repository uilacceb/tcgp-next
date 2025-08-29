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
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      unoptimized={unoptimized}
      loading="lazy"
      decoding="async"
      // placeholder="empty"      // ensure you’re not using blurDataURL (extra work)
      className="aspect-[7/10] md:w-[150px] lg:w-[200px] 
                      relative z-[1]"
    />
  );
}
