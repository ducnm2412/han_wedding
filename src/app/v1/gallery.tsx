"use client";

import Image from "next/image";
import { useState } from "react";

type Shot = { src: string; alt: string; tag: Tag; tall?: boolean };
type Tag = "Ngoại cảnh" | "Studio" | "Áo dài lễ gia tiên";

const shots: Shot[] = [
  { src: "/photos/a1.jpg", alt: "Cô dâu chú rể trong khu vườn đèn lồng", tag: "Ngoại cảnh", tall: true },
  { src: "/photos/a3.jpg", alt: "Cặp đôi bên bờ hồ buổi sớm", tag: "Ngoại cảnh" },
  { src: "/photos/a9.jpg", alt: "Concept nơ đỏ trong studio", tag: "Studio", tall: true },
  { src: "/photos/a10.jpg", alt: "Cô dâu áo dài đỏ khăn voan", tag: "Áo dài lễ gia tiên", tall: true },
  { src: "/photos/a4.jpg", alt: "Cặp đôi trên bãi cỏ trước biệt thự", tag: "Ngoại cảnh" },
  { src: "/photos/a8.jpg", alt: "Cặp đôi với rèm nhung đỏ", tag: "Studio" },
  { src: "/photos/a2.jpg", alt: "Chú rể đứng cạnh cô dâu trong vườn", tag: "Ngoại cảnh", tall: true },
  { src: "/photos/a11.jpg", alt: "Áo dài đỏ đôi cho cô dâu chú rể", tag: "Áo dài lễ gia tiên" },
  { src: "/photos/a13.jpg", alt: "Ảnh cưới phông trắng tối giản", tag: "Studio", tall: true },
  { src: "/photos/a7.jpg", alt: "Cô dâu tựa vai chú rể bên hồ", tag: "Ngoại cảnh" },
  { src: "/photos/a12.jpg", alt: "Cô dâu áo dài trắng cầm dù giấy", tag: "Áo dài lễ gia tiên", tall: true },
  { src: "/photos/a14.jpg", alt: "Cặp đôi trên ban công nhìn ra sông", tag: "Ngoại cảnh" },
  { src: "/photos/c2.jpg", alt: "Bộ ảnh concept đỏ trắng", tag: "Studio" },
  { src: "/photos/a6.jpg", alt: "Cô dâu chú rể trong vườn hoa trắng", tag: "Ngoại cảnh" },
];

const tags: ("Tất cả" | Tag)[] = ["Tất cả", "Ngoại cảnh", "Studio", "Áo dài lễ gia tiên"];

export default function Gallery() {
  const [active, setActive] = useState<(typeof tags)[number]>("Tất cả");
  const list = active === "Tất cả" ? shots : shots.filter((s) => s.tag === active);

  return (
    <div>
      <div role="tablist" aria-label="Lọc album" className="mb-10 flex flex-wrap gap-x-8 gap-y-3">
        {tags.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={active === t}
            onClick={() => setActive(t)}
            className={`display border-b pb-1 text-2xl transition-colors ${
              active === t ? "border-wine text-wine italic" : "border-transparent text-smoke hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
        {list.map((s) => (
          <figure key={s.src} className="mb-3 break-inside-avoid md:mb-4">
            <div className={`relative w-full overflow-hidden ${s.tall ? "aspect-[2/3]" : "aspect-[4/5]"}`}>
              <Image src={s.src} alt={s.alt} fill sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw" className="object-cover" />
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
}
