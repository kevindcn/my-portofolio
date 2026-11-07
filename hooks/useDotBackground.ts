"use client";

import { useEffect, type RefObject } from "react";
import { createDotBackground, type DotBackgroundOptions } from "@/lib/dot-background";

export function useDotBackground(
  ref: RefObject<HTMLElement | null>,
  options?: DotBackgroundOptions
) {
  useEffect(() => {
    if (!ref.current) return;
    const bg = createDotBackground(ref.current, options);
    return () => bg.destroy(); // aman untuk React StrictMode
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
