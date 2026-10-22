import Image from "next/image";

const cols = [
  ["a1", "d1", "a10", "a4", "d5"],
  ["hero", "a3", "c3", "d3", "a12"],
  ["a8", "about", "a14", "d2", "a2"],
  ["d9", "a7", "a11", "makeup", "a13"],
];

/** Bốn cột ảnh trôi chậm ngược chiều nhau làm nền cho hero. */
export default function HeroWall() {
  return (
    <div className="absolute inset-0 grid grid-cols-2 gap-3 px-3 md:grid-cols-4 md:gap-4 md:px-4" aria-hidden>
      {cols.map((col, c) => (
        <div key={c} className={`overflow-hidden ${c > 1 ? "hidden md:block" : ""}`}>
          <div className={`wall-track ${c % 2 ? "wall-down" : "wall-up"}`} style={{ animationDuration: `${60 + c * 8}s` }}>
            {[...col, ...col].map((src, i) => (
              <div key={i} className="relative mb-3 aspect-[2/3] w-full md:mb-4">
                <Image src={`/photos/${src}.jpg`} alt="" fill sizes="(min-width:768px) 25vw, 50vw" className="object-cover" priority={i < 2} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
