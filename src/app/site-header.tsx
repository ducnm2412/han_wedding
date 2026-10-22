"use client";

import { useEffect, useState } from "react";

/** Nổi trong suốt trên hero, chuyển nền ngà khi cuộn xuống. */
export default function SiteHeader({ children }: { children: React.ReactNode }) {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-colors duration-300 ${
        solid ? "border-b border-line bg-ivory/95 text-ink backdrop-blur" : "bg-gradient-to-b from-ink/85 via-ink/40 to-transparent pb-6 text-white"
      }`}
    >
      {children}
    </header>
  );
}
