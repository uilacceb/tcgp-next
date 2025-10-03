// app/components/CardVideos.tsx
"use client";

import { useRef, useState } from "react";

type Props = {
  videoUrl?: string | null;
  width?: number;
  className?: string;
  children: React.ReactNode; // the "card" content (e.g., <img .../>)
};

export default function CardVideo({
  videoUrl,
  width = 400,
  className = "",
  children,
}: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  if (!videoUrl) {
    // No video URL: just render the card normally
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`relative ${className}`}>
      {!isPlaying ? (
        <div
          role="button"
          tabIndex={0}
          className="cursor-pointer focus:outline-none"
          onClick={() => setIsPlaying(true)}
          onKeyDown={(e) =>
            (e.key === "Enter" || e.key === " ") && setIsPlaying(true)
          }
        >
          {children}
        </div>
      ) : (
        <video
          ref={videoRef}
          width={width}
          controls
          autoPlay
          muted
          className="rounded-lg"
          onEnded={() => setIsPlaying(false)} // show card again after playback
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}
