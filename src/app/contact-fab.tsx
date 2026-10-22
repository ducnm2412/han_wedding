"use client";

import { useState } from "react";

type Props = { phone: string; facebook: string };

/** Nút liên hệ nổi: desktop hiện đủ 3 nút, mobile gộp thành 1 nút bấm để bung ra. */
export default function ContactFab({ phone, facebook }: Props) {
  const [open, setOpen] = useState(false);

  const items = [
    {
      label: "Nhắn Zalo",
      href: `https://zalo.me/${phone}`,
      cls: "bg-[#0068ff]",
      icon: <span className="text-sm font-semibold">Zalo</span>,
    },
    {
      label: "Nhắn Messenger",
      href: facebook,
      cls: "bg-gradient-to-br from-[#00b2ff] to-[#a033ff]",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
          <path d="M12 2C6.4 2 2 6.1 2 11.6c0 2.9 1.2 5.4 3.1 7.1V22l2.9-1.6c1.2.3 2.5.5 4 .5 5.6 0 10-4.1 10-9.4S17.6 2 12 2zm1 12.6-2.6-2.7-5 2.7 5.5-5.8 2.6 2.7 5-2.7-5.5 5.8z" />
        </svg>
      ),
    },
    {
      label: "Gọi điện",
      href: `tel:${phone}`,
      cls: "bg-wine",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
          <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="fixed right-4 bottom-4 z-30 flex flex-col items-end gap-3">
      {items.map((it, i) => (
        <a
          key={it.label}
          href={it.href}
          target={it.href.startsWith("tel:") ? undefined : "_blank"}
          rel="noreferrer"
          aria-label={it.label}
          onClick={() => setOpen(false)}
          className={`flex items-center gap-2 transition-all duration-300 md:pointer-events-auto md:translate-y-0 md:opacity-100 ${
            open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: open ? `${(items.length - 1 - i) * 60}ms` : "0ms" }}
        >
          <span className="rounded-full bg-paper px-3 py-1 text-xs font-semibold text-ink shadow md:hidden">{it.label}</span>
          <span className={`fab flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg md:h-14 md:w-14 ${it.cls}`}>{it.icon}</span>
        </a>
      ))}

      {/* Nút gộp trên mobile */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Đóng liên hệ" : "Mở liên hệ"}
        aria-expanded={open}
        className="fab flex h-14 w-14 items-center justify-center rounded-full bg-wine text-white shadow-lg md:hidden"
      >
        <svg viewBox="0 0 24 24" className={`h-6 w-6 transition-transform duration-300 ${open ? "rotate-45" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          {open ? <path d="M12 5v14M5 12h14" /> : <path d="M4 5h16v11H8l-4 4z" />}
        </svg>
      </button>
    </div>
  );
}
