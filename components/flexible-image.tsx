"use client";
import { useMemo, useState } from "react";

type FlexibleImageProps = {
  basePath: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
};

const EXTENSIONS = ["png", "webp", "jpg", "jpeg"] as const;

export function FlexibleImage({ basePath, alt, className, style }: FlexibleImageProps) {
  const candidates = useMemo(() => EXTENSIONS.map((ext) => `${basePath}.${ext}`), [basePath]);
  const [index, setIndex] = useState(0);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={candidates[index]}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
      decoding="async"
      onError={() => setIndex((current) => Math.min(candidates.length - 1, current + 1))}
    />
  );
}
