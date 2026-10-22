"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Flourish } from "./ornaments";

const FACEBOOK = "https://www.facebook.com/profile.php?id=100045414323876";

const sets = [
  {
    name: "Ngoại cảnh",
    text: "Vườn châu Âu, ven sông và biệt thự quanh Biên Hòa — ánh sáng tự nhiên, khung hình rộng.",
    photos: [
      { src: "/photos/a3.jpg", alt: "Cặp đôi bên bờ hồ buổi sớm" },
      { src: "/photos/a2.jpg", alt: "Chú rể và cô dâu trong vườn" },
      { src: "/photos/a4.jpg", alt: "Cặp đôi trên bãi cỏ trước biệt thự" },
      { src: "/photos/a14.jpg", alt: "Cặp đôi trên ban công nhìn ra sông" },
    ],
  },
  {
    name: "Studio",
    text: "Phông trắng tối giản, rèm nhung cổ điển, concept nơ đỏ — chụp được cả khi trời mưa.",
    photos: [
      { src: "/photos/a8.jpg", alt: "Cặp đôi với rèm nhung đỏ" },
      { src: "/photos/hero.jpg", alt: "Cô dâu với vương miện trước rèm nhung xanh" },
      { src: "/photos/a13.jpg", alt: "Ảnh cưới phông trắng tối giản" },
      { src: "/photos/a9.jpg", alt: "Concept nơ đỏ trong studio" },
    ],
  },
  {
    name: "Áo dài lễ gia tiên",
    text: "Áo dài đỏ, áo dài trắng và khăn voan truyền thống cho ngày lễ gia tiên.",
    photos: [
      { src: "/photos/a10.jpg", alt: "Cô dâu áo dài đỏ khăn voan" },
      { src: "/photos/a12.jpg", alt: "Cô dâu áo dài trắng cầm dù giấy" },
      { src: "/photos/a11.jpg", alt: "Áo dài đỏ đôi cho cô dâu chú rể" },
      { src: "/photos/c3.jpg", alt: "Cô dâu áo dài đỏ trước rèm nhung" },
    ],
  },
];

const tiles = ["col-span-2 row-span-2", "row-span-2", "", ""];

export default function Album() {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<number | null>(null);
  const set = sets[active];

  const step = useCallback((d: number) => setZoom((z) => (z === null ? z : (z + d + set.photos.length) % set.photos.length)), [set.photos.length]);

  useEffect(() => {
    if (zoom === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoom, step]);

  return (
    <section id="album" className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
      <div className="grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-12">
        <div className="flex min-w-0 flex-col">
          <h2 className="display text-5xl md:text-6xl">Album cưới</h2>
          <Flourish className="mt-2 ml-0 w-48 text-gold" />

          <ul role="tablist" aria-label="Chọn bộ album" className="mt-6 flex gap-2 overflow-x-auto [scrollbar-width:none] lg:overflow-visible [&::-webkit-scrollbar]:hidden lg:flex-col lg:gap-1 lg:border-l-2 lg:border-gold/60">
            {sets.map((s, i) => (
              <li key={s.name}>
                <button
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => setActive(i)}
                  className={`flex w-full shrink-0 items-center justify-between px-4 py-3.5 text-left text-base font-semibold whitespace-nowrap transition-colors duration-300 lg:text-lg ${
                    i === active ? "bg-wine text-white" : "text-ink/80 hover:bg-wine/5 hover:text-wine"
                  }`}
                >
                  {s.name}
                  <span className={`ml-4 text-sm font-normal ${i === active ? "text-white/80" : "text-ink/50"}`}>{s.photos.length} ảnh</span>
                </button>
              </li>
            ))}
          </ul>

          <p key={active} className="album-fade mt-5 text-ink/80">{set.text}</p>
          <a href={FACEBOOK} target="_blank" rel="noreferrer" className="mt-6 self-start border border-ink px-5 py-2.5 text-sm font-medium hover:bg-ink hover:text-white lg:mt-auto">
            Xem thêm trên Facebook
          </a>
        </div>

        <div key={active} className="grid min-w-0 h-[460px] grid-cols-3 grid-rows-2 gap-2 md:h-[540px] md:grid-cols-4 md:gap-3">
          {set.photos.map((p, i) => (
            <button
              key={p.src}
              onClick={() => setZoom(i)}
              className={`album-tile group relative overflow-hidden ${tiles[i]} ${i === 3 ? "hidden md:block" : ""}`}
              style={{ animationDelay: `${i * 90}ms` }}
              aria-label={`Phóng to: ${p.alt}`}
            >
              <Image src={p.src} alt={p.alt} fill sizes="(min-width:1024px) 40vw, 60vw" className="object-cover object-[50%_30%] transition-transform duration-700 group-hover:scale-105" />
            </button>
          ))}
        </div>
      </div>

      {zoom !== null && (
        <div role="dialog" aria-modal="true" aria-label="Xem ảnh" className="album-fade fixed inset-0 z-50 flex items-center justify-center bg-ink/92 p-4" onClick={() => setZoom(null)}>
          <div className="relative h-[85vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image src={set.photos[zoom].src} alt={set.photos[zoom].alt} fill sizes="90vw" className="object-contain" />
          </div>
          <button onClick={(e) => (e.stopPropagation(), step(-1))} aria-label="Ảnh trước" className="absolute left-3 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full border border-white/40 text-2xl text-white hover:bg-white/10 md:left-8">‹</button>
          <button onClick={(e) => (e.stopPropagation(), step(1))} aria-label="Ảnh sau" className="absolute right-3 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full border border-white/40 text-2xl text-white hover:bg-white/10 md:right-8">›</button>
          <button onClick={() => setZoom(null)} aria-label="Đóng" className="absolute top-4 right-4 h-11 w-11 rounded-full border border-white/40 text-xl text-white hover:bg-white/10">✕</button>
          <p className="absolute bottom-5 text-sm text-white/70">{zoom + 1} / {set.photos.length}</p>
        </div>
      )}
    </section>
  );
}
