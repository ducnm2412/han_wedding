"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Flourish } from "./ornaments";

const services = [
  { name: "Chụp ảnh cưới", text: "Ngoại cảnh, phim trường và studio — chụp trọn buổi, chỉnh màu từng tấm, in album cao cấp.", src: "/photos/a1.jpg" },
  { name: "Váy cưới", text: "Hàng trăm mẫu váy xòe, đuôi cá, lụa satin cùng áo dài lễ gia tiên. Thử thoải mái tại studio.", src: "/photos/d1.jpg" },
  { name: "Concept riêng", text: "Vườn châu Âu, ven sông, rèm nhung cổ điển, nơ đỏ hiện đại — chọn concept, HAN lo phần còn lại.", src: "/photos/a9.jpg" },
  { name: "Makeup & làm tóc", text: "Lớp trang điểm trong veo giữ suốt buổi chụp và ngày cưới, kiểu tóc hợp từng mẫu váy.", src: "/photos/about.jpg" },
  { name: "Dịch vụ đi kèm", text: "Hoa cầm tay, vest chú rể, phóng sự lễ gia tiên và ngày cưới — hỏi HAN để nhận danh sách đầy đủ.", src: "/photos/a11.jpg" },
];

export default function Services() {
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState(false);
  const ref = useRef<HTMLUListElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Chờ chuột dừng một nhịp mới mở, tránh giật khi lướt ngang qua nhiều dải
  const hoverOpen = (i: number) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setActive(i), 140);
  };

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.2 });
    if (ref.current) io.observe(ref.current);
    return () => {
      io.disconnect();
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <section id="dich-vu" className="bg-wine py-14 text-white md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h2 className="display text-center text-5xl md:text-6xl">Dịch vụ</h2>
        <Flourish className="mt-2 text-gold" />

        <ul ref={ref} onMouseLeave={() => clearTimeout(timer.current)} className={`acc ${seen ? "is-in" : ""} mt-8 flex h-[720px] flex-col gap-2 md:h-[560px] md:flex-row md:gap-3`}>
          {services.map((s, i) => {
            const open = i === active;
            return (
              <li
                key={s.name}
                className={`acc-panel relative min-h-0 min-w-0 overflow-hidden ${open ? "is-open" : ""}`}
                style={{ "--i": i } as React.CSSProperties}
                onMouseEnter={() => hoverOpen(i)}
              >
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-expanded={open}
                  className="absolute inset-0 z-10 text-left"
                >
                  <span className="sr-only">{s.name}</span>
                </button>
                <Image
                  src={s.src}
                  alt=""
                  fill
                  sizes="(min-width:768px) 60vw, 100vw"
                  className={`object-cover object-[50%_30%] transition-[transform,filter] duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] ${open ? "scale-100" : "scale-[1.15] grayscale-[35%]"}`}
                />
                <div className={`absolute inset-0 transition-colors duration-1000 ${open ? "bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" : "bg-ink/55"}`} />

                {/* Tên dọc khi thu gọn */}
                <span
                  className={`display absolute inset-0 flex items-center justify-center text-2xl font-medium md:text-3xl whitespace-nowrap transition-opacity duration-300 md:[writing-mode:vertical-rl] md:rotate-180 ${
                    open ? "opacity-0" : "opacity-100 delay-300"
                  }`}
                  aria-hidden
                >
                  {s.name}
                </span>

                {/* Nội dung khi mở */}
                <div className={`acc-body absolute bottom-0 left-0 w-full p-6 md:w-[34rem] md:p-10 ${open ? "" : "pointer-events-none"}`}>
                  <h3 className="acc-item display text-4xl font-medium md:text-5xl">{s.name}</h3>
                  <div className="acc-line mt-3 h-px w-24 origin-left bg-gold" />
                  <p className="acc-item mt-4 max-w-md text-white/90" style={{ transitionDelay: "var(--d2)" }}>{s.text}</p>
                  <a href="#dat-lich" style={{ transitionDelay: "var(--d3)" }} className="acc-item relative z-20 mt-6 inline-block border border-white px-5 py-2.5 text-sm font-medium hover:bg-white hover:text-wine">
                    Đặt lịch tư vấn
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
