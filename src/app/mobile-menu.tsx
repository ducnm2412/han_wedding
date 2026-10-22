"use client";

import { useEffect, useState } from "react";

type Props = { nav: string[][]; phone: string; phoneLabel: string };

/** Nút ☰ và menu toàn màn hình cho điện thoại / máy tính bảng. */
export default function MobileMenu({ nav, phone, phoneLabel }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(true)}
        aria-label="Mở menu"
        aria-expanded={open}
        className="flex h-11 w-11 flex-col items-center justify-center gap-1.5"
      >
        <span className="h-0.5 w-6 bg-current" />
        <span className="h-0.5 w-6 bg-current" />
        <span className="h-0.5 w-4 self-center bg-current" />
      </button>

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-0 z-50 flex flex-col bg-wine-deep text-white transition-all duration-500 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <span className="display text-3xl">
            HAN <span className="italic">wedding</span>
          </span>
          <button onClick={() => setOpen(false)} aria-label="Đóng menu" className="flex h-11 w-11 items-center justify-center text-3xl">
            ×
          </button>
        </div>
        <nav className="flex flex-1 flex-col justify-center gap-2 px-8" aria-label="Điều hướng">
          {nav.map(([l, h], i) => (
            <a
              key={h}
              href={h}
              onClick={() => setOpen(false)}
              className={`display border-b border-gold/30 py-3 text-4xl transition-all duration-500 ${open ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"}`}
              style={{ transitionDelay: open ? `${150 + i * 70}ms` : "0ms" }}
            >
              {l}
            </a>
          ))}
        </nav>
        <div className="space-y-3 px-8 pb-10">
          <a href={`tel:${phone}`} className="block text-2xl font-semibold text-gold">
            {phoneLabel}
          </a>
          <a href="#dat-lich" onClick={() => setOpen(false)} className="block bg-white py-3.5 text-center font-semibold text-wine">
            Đặt lịch tư vấn
          </a>
        </div>
      </div>
    </div>
  );
}
