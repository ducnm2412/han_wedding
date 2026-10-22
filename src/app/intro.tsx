"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Flourish, InviteFrame } from "./ornaments";

const pano = [
  { src: "/photos/a1.jpg", alt: "Cô dâu chú rể trong khu vườn đèn lồng" },
  { src: "/photos/hero.jpg", alt: "Cô dâu với vương miện và khăn voan" },
  { src: "/photos/a3.jpg", alt: "Cặp đôi bên bờ hồ" },
];

export default function Intro() {
  const ref = useRef<HTMLElement>(null);
  const img = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!ref.current || !img.current) return;
        const r = ref.current.getBoundingClientRect();
        // p: 0 khi section vừa chạm đáy màn hình, 1 khi đã cuộn qua
        const p = Math.min(Math.max((window.innerHeight - r.top) / (window.innerHeight + r.height), 0), 1);
        img.current.style.transform = `translateY(${(p - 0.5) * -12}%) scale(${1.12 - p * 0.08})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section ref={ref} className={`intro px-4 pt-16 pb-24 md:px-8 md:pt-20 md:pb-44 ${seen ? "is-in" : ""}`}>
      <div className="relative mx-auto max-w-7xl">
        <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/9] lg:aspect-[21/9]">
          <div ref={img} className="absolute inset-0 grid gap-2 will-change-transform sm:grid-cols-3">
            {pano.map((ph, i) => (
              <div key={ph.src} className={`relative ${i ? "hidden sm:block" : ""}`}>
                <Image src={ph.src} alt={ph.alt} fill sizes="(min-width:640px) 33vw, 100vw" className="object-cover object-[50%_30%]" />
              </div>
            ))}
          </div>
        </div>

        <ul className="intro-card mt-10 hidden gap-8 md:absolute md:top-full md:left-0 md:mt-10 md:grid md:w-[58%] md:grid-cols-3">
          {[
            ["Một ê-kíp trọn gói", "Váy, makeup và chụp ảnh cùng một nơi."],
            ["Nhiều bối cảnh", "Vườn, ven sông, phim trường và studio."],
            ["Album in cao cấp", "Chỉnh màu từng tấm, giao tận tay."],
          ].map(([t, d]) => (
            <li key={t} className="border-t-2 border-gold pt-5">
              <p className="display text-3xl font-semibold text-wine">{t}</p>
              <p className="mt-2 text-base text-ink/80">{d}</p>
            </li>
          ))}
        </ul>

        <div className="intro-card relative z-10 mx-4 -mt-32 bg-paper px-8 py-10 shadow-xl sm:mx-auto sm:max-w-md md:absolute md:right-12 md:-bottom-28 md:mx-0 md:mt-0 md:max-w-[420px] md:px-12 md:py-11">
          <InviteFrame className="inset-3 text-gold" />
          <h2 className="display text-3xl font-medium md:text-[2.4rem]">
            Lưu giữ ngày đẹp nhất,
            <br />
            <span className="text-wine italic">theo cách của hai bạn.</span>
          </h2>
          <Flourish className="mt-3 ml-0 w-48 text-gold" />
          <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/80">
            HAN wedding là studio ảnh cưới tại Biên Hòa. Bạn chọn váy, trang điểm và chụp ảnh cùng một ê-kíp — mọi
            thứ được lên kế hoạch từ buổi tư vấn đầu tiên.
          </p>
          <div className="mt-6 flex items-center gap-6">
            <div>
              <p className="display text-3xl text-wine">74K</p>
              <p className="text-sm text-ink/70">người theo dõi fanpage</p>
            </div>
            <a href="#dich-vu" className="ml-auto bg-wine px-5 py-2.5 text-sm font-medium text-white hover:bg-wine-deep">
              Xem dịch vụ
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
