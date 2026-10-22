"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Flourish } from "./ornaments";

// Tên, chất liệu và mô tả là bản nháp — cần xác nhận với studio.
const dresses = [
  { src: "/photos/d1.jpg", name: "Pha lê thiên nga", kind: "Váy xòe", fabric: "Tulle đính pha lê", text: "Thân corset đính kết dày, chân váy xòe nhiều lớp lấp lánh dưới đèn — hợp lễ đường và tiệc tối." },
  { src: "/photos/d2.jpg", name: "Satin cúp ngực", kind: "Váy xòe", fabric: "Satin Hàn Quốc", text: "Đường cúp ngực gọn, satin bóng nhẹ, tôn vai và cổ. Thanh lịch cho cô dâu thích tối giản." },
  { src: "/photos/d3.jpg", name: "Nơ vai lụa", kind: "Váy chữ A", fabric: "Lụa Mikado", text: "Nơ bản lớn trên vai, chân váy chữ A đứng form — nổi bật khi chụp ngoại cảnh." },
  { src: "/photos/d4.jpg", name: "Ngà nhún eo", kind: "Váy chữ A", fabric: "Satin ngà", text: "Tông ngà ấm, nhún eo tạo dáng thon, đi lại thoải mái suốt ngày cưới." },
  { src: "/photos/d5.jpg", name: "Corset champagne", kind: "Váy chữ A", fabric: "Ren champagne", text: "Màu champagne nhẹ nhàng, corset ren tinh tế, hợp concept cổ điển." },
  { src: "/photos/d7.jpg", name: "Satin bất đối xứng", kind: "Váy đuôi cá", fabric: "Satin lụa", text: "Đường cắt chéo hiện đại, ôm dáng — dành cho cô dâu cá tính." },
  { src: "/photos/d8.jpg", name: "Lụa nhún hoa", kind: "Váy chữ A", fabric: "Lụa tơ tằm", text: "Hoa lụa nhún thủ công trên thân váy, mềm mại khi chuyển động." },
  { src: "/photos/d9.jpg", name: "Xếp ly cổ điển", kind: "Váy xòe", fabric: "Taffeta", text: "Xếp ly cúp ngực, chân váy phồng cổ điển — kinh điển cho lễ cưới." },
];

// Độ nghiêng ngẫu nhiên nhẹ như ảnh rải trên bàn
const tilt = [-3, 2.5, -1.5, 3, -2.5, 1.5, -3, 2];

export default function Dresses() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const drag = useRef<number | null>(null);
  const stage = useRef<HTMLDivElement>(null);
  const prev = useRef<Record<number, number>>({});
  const moved = useRef(false);
  const [dx, setDx] = useState(0); // độ lệch khi đang kéo, tính theo số thẻ
  const n = dresses.length;
  const go = (k: number) => setI(((k % n) + n) % n);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 4000);
    return () => clearInterval(t);
  }, [paused, n]);

  return (
    <section id="vay-cuoi" className="flex min-h-[83svh] flex-col justify-center overflow-hidden bg-paper py-6 md:py-8">
      <div className="mx-auto max-w-7xl px-4 text-center md:px-8">
        <h2 className="display text-4xl md:text-5xl">Bộ sưu tập váy cưới</h2>
        <Flourish className="mt-1 text-gold" />
      </div>

      <div
        ref={stage}
        className="relative mx-auto mt-6 h-[min(56svh,430px)] w-full max-w-[1400px] touch-pan-y select-none [perspective:1400px] md:h-[min(68svh,620px)]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onPointerDown={(e) => {
          drag.current = e.clientX;
          moved.current = false;
          setPaused(true);
        }}
        onPointerMove={(e) => {
          if (drag.current === null || !stage.current) return;
          const card = stage.current.clientHeight * 0.75 * 0.74; // khoảng cách giữa 2 thẻ
          if (Math.abs(e.clientX - drag.current) > 6) moved.current = true;
          setDx((e.clientX - drag.current) / card);
        }}
        onPointerUp={() => {
          if (drag.current === null) return;
          drag.current = null;
          const steps = Math.round(-dx);
          setDx(0);
          if (steps) go(i + steps);
          else if (Math.abs(dx) > 0.15) go(i + (dx < 0 ? 1 : -1));
        }}
        onPointerCancel={() => ((drag.current = null), setDx(0))}
        onKeyDown={(e) => (e.key === "ArrowRight" ? go(i + 1) : e.key === "ArrowLeft" ? go(i - 1) : null)}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Bộ sưu tập váy cưới"
      >
        {dresses.map((x, k) => {
          let o = k - i;
          if (o > n / 2) o -= n;
          if (o < -n / 2) o += n;
          const jump = Math.abs((prev.current[k] ?? o) - o) > 1.5;
          prev.current[k] = o;
          const f = o + dx; // vị trí thực, kể cả khi đang kéo
          const a = Math.abs(f);
          const dragging = dx !== 0;
          return (
            <button
              key={x.src}
              onClick={() => !moved.current && go(k)}
              tabIndex={o === 0 ? -1 : 0}
              aria-label={o === 0 ? x.name : `Xem ${x.name}`}
              className="coverflow polaroid absolute top-0 left-1/2 flex aspect-[4/5] h-full flex-col bg-white p-[3.5%] pb-0 shadow-[0_18px_40px_-12px_rgba(60,20,30,.35)]"
              style={{
                transform: `translateX(${-50 + f * 82}%) translateZ(${-a * 80}px) rotateY(${Math.max(-3, Math.min(3, f)) * -14}deg) rotateZ(${o === 0 && !dragging ? 0 : tilt[k]}deg)`,
                transition: dragging ? "none" : jump ? "opacity .5s ease" : undefined,
                zIndex: 10 - Math.round(a),
                opacity: a > 3.4 ? 0 : Math.max(0, 1 - a * 0.15),
                pointerEvents: a > 3.4 ? "none" : "auto",
                filter: a ? `brightness(${1 - a * 0.1})` : "none",
              }}
            >
              <span className="relative block flex-1 overflow-hidden bg-ivory">
                <Image src={x.src} alt={`${x.name} – ${x.kind}`} fill sizes="(min-width:768px) 400px, 70vw" className={`object-cover object-top ${o === 0 ? "dress-breathe" : ""}`} draggable={false} />
              </span>
              <span className="script block py-[5%] text-center text-[clamp(1.1rem,2.2vw,1.9rem)] leading-none text-ink/85">{x.name}</span>
            </button>
          );
        })}
        <button onClick={() => go(i - 1)} aria-label="Váy trước" className="absolute top-1/2 left-3 z-20 h-11 w-11 -translate-y-1/2 rounded-full bg-white/90 text-xl text-wine shadow-lg hover:bg-wine hover:text-white md:left-8">‹</button>
        <button onClick={() => go(i + 1)} aria-label="Váy sau" className="absolute top-1/2 right-3 z-20 h-11 w-11 -translate-y-1/2 rounded-full bg-white/90 text-xl text-wine shadow-lg hover:bg-wine hover:text-white md:right-8">›</button>
      </div>

      <div className="mt-6 text-center">
        <a href="#dat-lich" className="inline-block bg-wine px-7 py-3 text-sm font-medium text-white hover:bg-wine-deep">
          Hẹn thử váy này
        </a>
      </div>
    </section>
  );
}
