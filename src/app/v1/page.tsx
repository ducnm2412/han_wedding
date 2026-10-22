import Image from "next/image";
import Gallery from "./gallery";
import BookingForm from "../booking-form";

const PHONE = "0589653242";
const PHONE_LABEL = "058 965 3242";
const FACEBOOK = "https://www.facebook.com/profile.php?id=100045414323876";
const MAPS = "https://maps.app.goo.gl/EoumoWzNgTjZxS7B8";

const nav = [
  ["Album", "#album"],
  ["Váy cưới", "#vay-cuoi"],
  ["Gói chụp", "#goi-chup"],
  ["Liên hệ", "#dat-lich"],
];

const services = [
  { name: "Chụp ảnh cưới", text: "Ngoại cảnh, phim trường và studio — chụp cả ngày, chỉnh màu từng tấm, in album cao cấp." },
  { name: "Cho thuê váy cưới", text: "Hàng trăm mẫu váy xòe, đuôi cá, lụa satin và áo dài lễ gia tiên, thử thoải mái tại studio." },
  { name: "Gói chụp theo concept", text: "Vườn châu Âu, ven sông, cổ điển rèm nhung, nơ đỏ hiện đại — chọn concept, HAN lo phần còn lại." },
  { name: "Makeup và làm tóc cô dâu", text: "Trang điểm trong veo, giữ lớp nền suốt buổi chụp và ngày cưới, làm tóc theo từng mẫu váy." },
  { name: "Dịch vụ cưới đi kèm", text: "Hoa cầm tay, vest chú rể và các dịch vụ ngày cưới khác — hỏi HAN để nhận danh sách đầy đủ." },
];

const dresses = [
  { src: "/photos/d1.jpg", code: "HW-01", name: "Ball gown đính pha lê", kind: "Váy xòe" },
  { src: "/photos/d2.jpg", code: "HW-02", name: "Cúp ngực satin", kind: "Váy xòe" },
  { src: "/photos/d3.jpg", code: "HW-03", name: "Lụa xếp nơ vai", kind: "Váy chữ A" },
  { src: "/photos/d4.jpg", code: "HW-04", name: "Satin ngà nhún eo", kind: "Váy chữ A" },
  { src: "/photos/d5.jpg", code: "HW-05", name: "Corset ren champagne", kind: "Váy chữ A" },
  { src: "/photos/d7.jpg", code: "HW-06", name: "Satin bất đối xứng", kind: "Váy đuôi cá" },
  { src: "/photos/d8.jpg", code: "HW-07", name: "Lụa nhún hoa", kind: "Váy chữ A" },
  { src: "/photos/d9.jpg", code: "HW-08", name: "Cúp ngực xếp ly", kind: "Váy xòe" },
  { src: "/photos/d10.jpg", code: "HW-09", name: "Taffeta tối giản", kind: "Váy chữ A" },
  { src: "/photos/d6.jpg", code: "HW-10", name: "Satin đổ vai", kind: "Váy chữ A" },
];

// Nội dung gói & giá là bản nháp — cần xác nhận với studio trước khi chạy thật.
const packages = [
  {
    name: "Studio",
    for: "Cho cặp đôi muốn bộ ảnh gọn đẹp trong một buổi.",
    items: ["Chụp tại studio HAN, 2 concept", "1 váy cưới, 1 vest chú rể", "Makeup và làm tóc cô dâu", "Album 25×25 cm, 1 ảnh phóng lớn"],
  },
  {
    name: "Ngoại cảnh Biên Hòa",
    for: "Gói được chọn nhiều nhất: studio kết hợp ngoại cảnh.",
    items: ["Studio + 1 điểm ngoại cảnh", "2 váy cưới, 1 áo dài lễ gia tiên", "Makeup, làm tóc, hoa cầm tay", "Album 30×30 cm, 2 ảnh phóng lớn"],
    featured: true,
  },
  {
    name: "Trọn gói ngày cưới",
    for: "Từ buổi chụp ảnh đến ngày rước dâu.",
    items: ["Gói ngoại cảnh đầy đủ", "Váy và makeup ngày cưới", "Chụp phóng sự lễ gia tiên", "Ưu đãi các dịch vụ đi kèm"],
  },
];

const steps = [
  ["Tư vấn", "Gặp tại studio hoặc qua Zalo, chọn concept và ngân sách."],
  ["Thử váy", "Thử váy, áo dài, chốt trang phục và lịch chụp."],
  ["Chụp ảnh", "Makeup, làm tóc và chụp trọn buổi cùng ê-kíp HAN."],
  ["Chọn ảnh", "Nhận file gốc, chọn ảnh để chỉnh sửa và in album."],
  ["Nhận album", "Album và ảnh phóng lớn được giao tận tay."],
];

export default function Home() {
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-8">
          <a href="#" className="display text-2xl text-ink" aria-label="HAN wedding – về đầu trang">
            HAN <span className="italic">wedding</span>
          </a>
          <nav className="hidden gap-8 text-sm text-ink md:mr-auto md:ml-16 md:flex" aria-label="Điều hướng chính">
            {nav.map(([l, h]) => (
              <a key={h} href={h} className="hover:underline underline-offset-4">
                {l}
              </a>
            ))}
          </nav>
          <a href={`tel:${PHONE}`} className="hidden border border-white/70 px-4 py-2 text-sm text-white md:inline-block">
            {PHONE_LABEL}
          </a>
        </div>
      </header>

      <main>
        {/* Hero: cô dâu là trung tâm, chữ HAN tràn qua ảnh */}
        <section className="relative grid min-h-[100svh] md:grid-cols-[5fr_7fr]">
          <div className="relative z-10 flex flex-col justify-end px-4 pt-28 pb-10 md:px-8 md:pb-16 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
            <h1>
              <span className="hero-mark display block text-[clamp(7rem,24vw,22rem)] leading-[0.8] font-light text-wine">
                HAN
              </span>
              <span className="display mt-4 block text-3xl italic md:text-4xl">Chụp ảnh cưới đẹp Biên Hòa</span>
            </h1>
            <p className="mt-6 max-w-sm text-smoke">
              Studio ảnh cưới, váy cưới và makeup cô dâu cho các cặp đôi Biên Hòa – Đồng Nai. Gần 74.000 người
              đang theo dõi những bộ ảnh của HAN.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#dat-lich" className="bg-wine px-6 py-3 font-medium text-white hover:bg-wine-deep">
                Đặt lịch tư vấn
              </a>
              <a href="#album" className="border border-ink px-6 py-3 font-medium">
                Xem album
              </a>
            </div>
          </div>
          <div className="relative min-h-[70svh] md:min-h-full">
            <Image src="/photos/hero.jpg" alt="Cô dâu trong váy cưới đính pha lê, khăn voan dài" fill priority sizes="(min-width:768px) 58vw, 100vw" className="object-cover object-top" />
          </div>
        </section>

        {/* Giới thiệu + dịch vụ */}
        <section className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
          <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20">
            <div>
              <h2 className="display text-5xl md:text-6xl">Một studio, trọn những ngày trước lễ cưới.</h2>
              <p className="mt-6 max-w-md text-lg text-smoke">
                Ở HAN, bạn chọn váy, trang điểm và chụp ảnh cùng một ê-kíp. Không phải chạy qua nhiều nơi,
                không lo váy không hợp concept — mọi thứ được lên kế hoạch từ buổi tư vấn đầu tiên.
              </p>
              <div className="relative mt-10 aspect-[4/5] max-w-sm">
                <Image src="/photos/makeup.jpg" alt="Cô dâu được trang điểm nhẹ nhàng, cài hoa trên tóc" fill sizes="384px" className="object-cover" />
              </div>
            </div>
            <ul className="divide-y divide-line border-y border-line self-start">
              {services.map((s) => (
                <li key={s.name} className="py-7">
                  <h3 className="display text-3xl md:text-4xl">{s.name}</h3>
                  <p className="mt-2 max-w-lg text-smoke">{s.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Album */}
        <section id="album" className="bg-paper py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <h2 className="display text-5xl md:text-7xl">Album cưới</h2>
              <a href={FACEBOOK} target="_blank" rel="noreferrer" className="text-wine underline underline-offset-4">
                Xem thêm trên Facebook
              </a>
            </div>
            <Gallery />
          </div>
        </section>

        {/* Điểm nhấn: thanh treo váy */}
        <section id="vay-cuoi" className="overflow-hidden bg-ink py-24 text-white md:py-32">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <h2 className="display text-5xl md:text-7xl">Phòng thử váy</h2>
            <p className="mt-4 max-w-md text-white/70">
              Lướt ngang để xem váy trên móc. Nhắn mã váy cho HAN để giữ lịch thử.
            </p>
          </div>
          <div className="relative mt-14">
            <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-white/40" />
            <ul className="rail flex gap-6 overflow-x-auto px-4 pt-6 pb-8 scroll-pl-4 md:gap-10 md:px-8 md:scroll-pl-8 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:scroll-pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
              {dresses.map((d) => (
                <li key={d.code} className="hanger relative w-[62vw] shrink-0 sm:w-[300px]">
                  <div className="relative aspect-[2/3] bg-white/5">
                    <Image src={d.src} alt={`${d.name} – ${d.kind}`} fill sizes="300px" className="object-cover" />
                    <span className="absolute top-4 -right-2 rotate-3 bg-ivory px-3 py-1 text-sm text-ink shadow">
                      {d.code}
                    </span>
                  </div>
                  <p className="display mt-4 text-2xl">{d.name}</p>
                  <p className="text-sm text-white/60">{d.kind}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Gói chụp */}
        <section id="goi-chup" className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
          <h2 className="display text-5xl md:text-7xl">Gói chụp</h2>
          <p className="mt-4 max-w-lg text-smoke">
            Báo giá thay đổi theo concept, số váy và địa điểm. Gọi hoặc nhắn Zalo để nhận bảng giá mới nhất.
          </p>
          <div className="mt-14 grid gap-px bg-line md:grid-cols-3">
            {packages.map((p) => (
              <article key={p.name} className={`flex flex-col p-8 md:p-10 ${p.featured ? "bg-wine text-white" : "bg-ivory"}`}>
                <h3 className="display text-4xl">{p.name}</h3>
                <p className={`mt-3 ${p.featured ? "text-white/80" : "text-smoke"}`}>{p.for}</p>
                <ul className="mt-8 space-y-3">
                  {p.items.map((i) => (
                    <li key={i} className={`border-b pb-3 ${p.featured ? "border-white/25" : "border-line"}`}>
                      {i}
                    </li>
                  ))}
                </ul>
                <a
                  href="#dat-lich"
                  className={`mt-10 self-start px-6 py-3 font-medium ${p.featured ? "bg-white text-wine" : "border border-ink"}`}
                >
                  Nhận báo giá
                </a>
              </article>
            ))}
          </div>

          <h3 className="display mt-28 text-4xl md:text-5xl">Quy trình</h3>
          <ol className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map(([t, d], i) => (
              <li key={t} className="border-t border-ink pt-5">
                <span className="display text-5xl text-wine">{i + 1}</span>
                <p className="mt-2 font-medium">{t}</p>
                <p className="mt-1 text-sm text-smoke">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Đặt lịch */}
        <section id="dat-lich" className="grid bg-wine md:grid-cols-[2fr_3fr]">
          <div className="relative min-h-[50svh]">
            <Image src="/photos/c3.jpg" alt="Cô dâu trong áo dài đỏ trước rèm nhung" fill sizes="(min-width:768px) 40vw, 100vw" className="object-cover" />
          </div>
          <div className="px-4 py-20 md:px-14 md:py-28">
            <h2 className="display text-5xl text-white md:text-6xl">Đặt lịch tư vấn</h2>
            <p className="mt-4 mb-12 max-w-md text-white/75">
              Để lại thông tin, HAN gọi lại trong ngày để hẹn giờ thử váy và xem album mẫu tại studio.
            </p>
            <BookingForm />
          </div>
        </section>

        {/* Bản đồ */}
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-24 md:grid-cols-[1fr_2fr] md:px-8">
          <div>
            <h2 className="display text-5xl">Ghé studio</h2>
            <p className="mt-4 text-smoke">HAN wedding, Biên Hòa, Đồng Nai.</p>
            <dl className="mt-8 space-y-4">
              <div>
                <dt className="text-sm text-smoke">Điện thoại / Zalo</dt>
                <dd>
                  <a href={`tel:${PHONE}`} className="display text-3xl">
                    {PHONE_LABEL}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-smoke">Fanpage</dt>
                <dd>
                  <a href={FACEBOOK} target="_blank" rel="noreferrer" className="underline underline-offset-4">
                    HAN wedding trên Facebook
                  </a>
                </dd>
              </div>
            </dl>
            <a href={MAPS} target="_blank" rel="noreferrer" className="mt-8 inline-block bg-ink px-6 py-3 font-medium text-white">
              Chỉ đường bằng Google Maps
            </a>
          </div>
          <iframe
            title="Bản đồ HAN wedding Biên Hòa"
            src="https://www.google.com/maps?q=HAN+wedding+Bi%C3%AAn+H%C3%B2a&output=embed"
            className="h-[420px] w-full border-0 grayscale-[40%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
      </main>

      <footer className="border-t border-line px-4 pt-10 pb-28 text-sm text-smoke md:px-8 md:pb-10">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4">
          <p>
            <span className="display text-xl text-ink">HAN wedding</span> — Chụp ảnh cưới đẹp Biên Hòa
          </p>
          <p>© 2026 HAN wedding</p>
        </div>
      </footer>

      {/* Nút liên hệ nhanh */}
      <div className="fixed right-4 bottom-4 z-30 flex gap-2 md:flex-col">
        <a href={`tel:${PHONE}`} className="flex h-12 items-center bg-wine px-4 text-sm font-medium text-white shadow-lg">
          Gọi ngay
        </a>
        <a href={`https://zalo.me/${PHONE}`} target="_blank" rel="noreferrer" className="flex h-12 items-center bg-[#0068ff] px-4 text-sm font-medium text-white shadow-lg">
          Zalo
        </a>
        <a href={FACEBOOK} target="_blank" rel="noreferrer" className="flex h-12 items-center bg-ink px-4 text-sm font-medium text-white shadow-lg">
          Messenger
        </a>
      </div>
    </>
  );
}
