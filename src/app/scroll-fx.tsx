"use client";

import { useEffect, useState } from "react";

// Các phần tử được gắn hiệu ứng hiện ra khi cuộn (cả cuộn xuống lẫn cuộn lên)
const TARGETS = [
  "main section h2",
  "main section h2 + svg",
  "#album [role=tablist] li",
  "#album [role=tablist] ~ p",
  "#vay-cuoi > div:last-child",
  "#goi-chup article",
  "#goi-chup ol li",
  "#dat-lich form",
  "footer > div:first-child > *",
].join(",");

export default function ScrollFx() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(TARGETS));

    // Phần tử cùng cha hiện lần lượt
    els.forEach((el) => {
      const sibs = Array.from(el.parentElement?.children ?? []).filter((c) => els.includes(c as HTMLElement));
      el.style.setProperty("--d", `${Math.min(sibs.indexOf(el), 5) * 90}ms`);
      el.dataset.reveal = "";
      el.dataset.from = "bottom";
    });

    const imgs = Array.from(document.querySelectorAll<HTMLElement>("#album .album-tile, .intro .grid > div, #dich-vu li, #dat-lich .arch"));
    imgs.forEach((el, n) => {
      el.dataset.curtain = "";
      el.style.setProperty("--d", `${(n % 5) * 110}ms`);
    });

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) el.classList.add("is-visible");
          else {
            el.classList.remove("is-visible");
            // Ra khỏi phía trên → lần sau quay lại (cuộn lên) sẽ trượt từ trên xuống
            el.dataset.from = e.boundingClientRect.top < 0 ? "top" : "bottom";
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((el) => io.observe(el));
    // Ảnh bị clip-path cắt về 0 nên không tự "giao" với màn hình được → theo dõi khung cha
    const curtainIo = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          imgs.filter((el) => el.parentElement === e.target).forEach((el) => el.classList.toggle("is-visible", e.isIntersecting)),
        ),
      { threshold: 0.1 },
    );
    new Set(imgs.map((el) => el.parentElement!)).forEach((parent) => curtainIo.observe(parent));

    const hero = document.querySelector<HTMLElement>("main > section:first-of-type");
    const wall = hero?.firstElementChild as HTMLElement | null;
    const text = hero?.lastElementChild as HTMLElement | null;
    const root = document.documentElement;
    const heads = Array.from(document.querySelectorAll<HTMLElement>("main section h2"));
    let lastY = window.scrollY;
    let skew = 0;
    let target = 0;
    let loop = 0;

    // Nghiêng ảnh theo tốc độ cuộn, rồi nhả dần về 0
    const tick = () => {
      skew += (target - skew) * 0.12;
      target *= 0.88;
      root.style.setProperty("--skew", `${skew.toFixed(3)}deg`);
      loop = Math.abs(skew) > 0.01 || Math.abs(target) > 0.01 ? requestAnimationFrame(tick) : 0;
    };

    let raf = 0;
    const onScroll = () => {
      const now = window.scrollY;
      const v = now - lastY;
      lastY = now;
      target = Math.max(-3.5, Math.min(3.5, v * 0.06));
      if (!loop) loop = requestAnimationFrame(tick);
      if (Math.abs(v) > 2) root.dataset.scroll = now < 200 ? "top" : v > 0 ? "down" : "up";

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const vh = window.innerHeight;
        heads.forEach((h) => {
          const r = h.getBoundingClientRect();
          if (r.bottom < -200 || r.top > vh + 200) return;
          h.style.transform = `translateY(${Math.max(-16, Math.min(16, (r.top + r.height / 2 - vh / 2) * -0.035)).toFixed(1)}px)`;
        });
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? y / max : 0);
        setShowTop(y > 900);
        if (hero && y < hero.offsetHeight) {
          if (wall) wall.style.transform = `translateY(${y * 0.35}px)`;
          if (text) {
            text.style.opacity = String(Math.max(0, 1 - y / (hero.offsetHeight * 0.55)));
            text.style.transform = `translateY(${y * 0.15}px)`;
          }
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      curtainIo.disconnect();
      cancelAnimationFrame(raf);
      cancelAnimationFrame(loop);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div aria-hidden className="fixed inset-x-0 top-0 z-40 h-[3px] origin-left bg-gold" style={{ transform: `scaleX(${progress})` }} />
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Lên đầu trang"
        className={`fixed bottom-4 left-4 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-paper text-wine shadow-lg transition-all duration-500 hover:bg-wine hover:text-white ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  );
}
