import Image from "next/image";
import BookingForm from "./booking-form";
import HeroWall from "./hero-wall";
import SiteHeader from "./site-header";
import Intro from "./intro";
import Services from "./services";
import Album from "./album";
import Dresses from "./dresses";
import ScrollFx from "./scroll-fx";
import Petals from "./petals";
import MobileMenu from "./mobile-menu";
import ContactFab from "./contact-fab";
import { Flourish, InviteFrame, SongHy } from "./ornaments";

const PHONE = "0589653242";
const PHONE_LABEL = "058 965 3242";
const FACEBOOK = "https://www.facebook.com/profile.php?id=100045414323876";
const MAPS = "https://maps.app.goo.gl/EoumoWzNgTjZxS7B8";

const nav = [
  ["Dịch vụ", "#dich-vu"],
  ["Album", "#album"],
  ["Váy cưới", "#vay-cuoi"],
  ["Gói chụp", "#goi-chup"],
  ["Liên hệ", "#dat-lich"],
];

// Nội dung gói là bản nháp — cần xác nhận giá và quyền lợi với studio.
const packages = [
  { name: "Studio", for: "Gọn đẹp trong một buổi", items: ["2 concept tại studio", "1 váy cưới, 1 vest", "Makeup & làm tóc", "Album 25×25 cm"] },
  { name: "Ngoại cảnh", for: "Được chọn nhiều nhất", items: ["Studio + 1 điểm ngoại cảnh", "2 váy cưới, 1 áo dài", "Makeup, tóc, hoa cầm tay", "Album 30×30 cm"], featured: true },
  { name: "Trọn gói", for: "Từ buổi chụp đến ngày cưới", items: ["Gói ngoại cảnh đầy đủ", "Váy & makeup ngày cưới", "Phóng sự lễ gia tiên", "Ưu đãi dịch vụ đi kèm"] },
];

const steps = [
  ["Tư vấn", "Chọn concept và ngân sách"],
  ["Thử váy", "Chốt trang phục, lịch chụp"],
  ["Chụp ảnh", "Makeup và chụp trọn buổi"],
  ["Chọn ảnh", "Chọn ảnh chỉnh sửa, in"],
  ["Nhận album", "Giao tận tay cặp đôi"],
];

export default function Home() {
  return (
    <>
      <SiteHeader>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <a href="#" className="display text-3xl">
            HAN <span className="italic">wedding</span>
          </a>
          <nav className="hidden gap-9 text-sm tracking-wide lg:flex" aria-label="Điều hướng chính">
            {nav.map(([l, h]) => (
              <a key={h} href={h} className="hover:underline underline-offset-8">
                {l}
              </a>
            ))}
          </nav>
          <a href={`tel:${PHONE}`} className="hidden text-sm underline-offset-8 hover:underline lg:inline">
            {PHONE_LABEL}
          </a>
          <MobileMenu nav={nav} phone={PHONE} phoneLabel={PHONE_LABEL} />
        </div>
      </SiteHeader>

      <main>
        {/* Hero: tường ảnh chạy nền, dòng chữ ở dưới */}
        <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink">
          <HeroWall />
          <Petals />
          <div className="absolute inset-x-0 bottom-0 h-[32%] bg-gradient-to-t from-ink via-ink/70 to-transparent" />
          <div className="relative mx-auto w-full max-w-7xl px-4 pt-20 pb-6 text-white md:px-8 md:pb-10">
            <div className="flex flex-col items-start gap-3 border-t border-gold/60 pt-4 text-left md:flex-row md:items-center md:gap-10 md:pt-6 md:justify-between md:gap-10 md:text-left">
              <div className="flex items-center gap-4">
                <SongHy className="h-8 w-8 shrink-0 text-sm text-gold md:h-10 md:w-10 md:text-base" />
                <h1 className="hero-mark display text-[clamp(2.25rem,4vw,3.25rem)] leading-none font-light whitespace-nowrap italic">HAN wedding</h1>
              </div>
              <p className="max-w-md pr-16 text-sm text-white/85 md:pr-0 md:border-l md:border-gold/50 md:pl-8 md:text-base">
                Chụp ảnh cưới, váy cưới và makeup cô dâu tại Biên Hòa — trọn vẹn trong một studio.
              </p>
              <div className="flex w-full shrink-0 gap-2 pr-16 md:w-auto md:gap-3 md:pr-0">
                <a href="#dat-lich" className="flex-1 bg-wine px-3 py-2.5 text-center text-sm font-medium whitespace-nowrap hover:bg-wine-deep md:flex-none md:px-5">
                  Đặt lịch tư vấn
                </a>
                <a href="#album" className="flex-1 border border-white/80 px-3 py-2.5 text-center text-sm font-medium whitespace-nowrap hover:bg-white hover:text-ink md:flex-none md:px-5">
                  Xem album cưới
                </a>
              </div>
            </div>
          </div>
        </section>

        <Intro />

        <Services />

        <Album />

        <Dresses />

        {/* Gói chụp: mỗi gói là một tấm thiệp mời */}
        <section id="goi-chup" className="bg-wine-deep py-14 text-white md:py-20">
          <div className="mx-auto max-w-6xl px-4 md:px-8">
            <h2 className="display text-center text-5xl md:text-6xl">Gói chụp</h2>
            <Flourish className="mt-2 text-gold" />
            <p className="mx-auto mt-3 max-w-lg text-center text-white/75">
              Báo giá theo concept, số váy và địa điểm. Nhắn HAN để nhận bảng giá mới nhất.
            </p>

            <div className="mt-12 grid items-center gap-6 md:grid-cols-3 md:gap-5">
              {packages.map((p) => (
                <article
                  key={p.name}
                  className={`invite-card relative bg-paper px-8 text-center text-ink shadow-[0_24px_50px_-20px_rgba(0,0,0,.6)] ${
                    p.featured ? "py-14 md:py-16" : "py-10 md:py-11"
                  }`}
                >
                  <InviteFrame className="inset-3 text-gold" />
                  <SongHy className={`text-wine ${p.featured ? "h-12 w-12 text-xl" : "h-10 w-10 text-lg"}`} />
                  <p className="mt-3 text-sm font-semibold text-wine">{p.for}</p>
                  <h3 className={`display mt-1 font-medium italic ${p.featured ? "text-5xl" : "text-4xl"}`}>{p.name}</h3>
                  <Flourish className="mt-2 w-40 text-gold" />
                  <ul className="mx-auto mt-5 max-w-[15rem] space-y-2.5 text-left text-[0.95rem]">
                    {p.items.map((i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-gold">✓</span>
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#dat-lich"
                    className={`relative mt-7 inline-block px-6 py-2.5 text-sm font-medium ${
                      p.featured ? "bg-wine text-white hover:bg-wine-deep" : "border border-wine text-wine hover:bg-wine hover:text-white"
                    }`}
                  >
                    Nhận báo giá
                  </a>
                </article>
              ))}
            </div>

            <ol className="mt-12 grid grid-cols-1 gap-x-6 gap-y-3 border-t border-gold/40 pt-8 sm:grid-cols-3 sm:gap-y-6 lg:grid-cols-5">
              {steps.map(([t, d], i) => (
                <li key={t} className="flex items-center gap-4 text-left sm:block sm:text-center">
                  <span className="display flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold text-lg text-gold sm:mx-auto sm:h-11 sm:w-11 sm:text-xl">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold sm:mt-3">{t}</p>
                    <p className="text-sm text-white/65">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Đặt lịch */}
        <section id="dat-lich" className="relative overflow-hidden bg-wine">
          <InviteFrame className="inset-4 text-gold md:inset-8" />
          <Petals className="opacity-70" />
          <div className="mx-auto grid max-w-7xl items-center gap-6 px-8 py-12 md:grid-cols-[1fr_1.3fr] md:gap-12 md:px-8 md:py-24">
            <div className="arch relative mx-auto hidden aspect-[3/4] w-full max-w-sm md:block">
              <Image src="/photos/c3.jpg" alt="Cô dâu trong áo dài đỏ" fill sizes="384px" className="object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-3 md:gap-4">
                <SongHy className="h-10 w-10 shrink-0 text-lg text-gold md:h-12 md:w-12 md:text-xl" />
                <h2 className="display text-4xl whitespace-nowrap text-white md:text-6xl">Đặt lịch tư vấn</h2>
              </div>
              <Flourish className="mt-3 ml-0 w-48 text-gold md:w-60" />
              <p className="mt-3 mb-7 max-w-md text-sm text-white/75 md:mb-12 md:text-base">
                Để lại thông tin, HAN gọi lại trong ngày để hẹn giờ thử váy và xem album mẫu.
              </p>
              <BookingForm />
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-ink text-white/75">
        <div className="mx-auto grid max-w-7xl gap-7 px-4 pt-10 pb-7 md:grid-cols-[1.1fr_1fr_1.4fr] md:gap-10 md:px-8 md:pt-14 md:pb-10">
          <div>
            <p className="display text-4xl text-white italic">HAN wedding</p>
            <Flourish className="mt-2 ml-0 w-40 text-gold" />
            <p className="mt-4 max-w-xs text-sm">
              Chụp ảnh cưới, váy cưới và makeup cô dâu tại Biên Hòa, Đồng Nai.
            </p>
            <p className="mt-3 text-sm">
              <span className="text-gold">★ 4.9</span> trên Google Maps
            </p>
          </div>

          <div className="space-y-4 text-sm">
            <p className="text-base font-semibold text-white">Liên hệ</p>
            <p>25 Nguyễn Ái Quốc, khu phố 8, Tân Triều, Đồng Nai</p>
            <p>
              <a href={`tel:${PHONE}`} className="text-lg font-semibold text-white hover:text-gold">
                {PHONE_LABEL}
              </a>
              <span className="block text-white/60">Gọi điện hoặc nhắn Zalo</span>
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <a href={MAPS} target="_blank" rel="noreferrer" className="bg-wine px-4 py-2 font-medium text-white hover:bg-wine-deep">
                Chỉ đường
              </a>
              <a href={FACEBOOK} target="_blank" rel="noreferrer" className="border border-white/40 px-4 py-2 font-medium text-white hover:border-white">
                Facebook
              </a>
            </div>
          </div>

          <iframe
            title="Bản đồ HAN wedding Biên Hòa"
            src="https://www.google.com/maps?q=HAN+Wedding+Ch%E1%BB%A5p+%E1%BA%A3nh+c%C6%B0%E1%BB%9Bi+%C4%91%E1%BA%B9p+Bi%C3%AAn+H%C3%B2a&output=embed"
            className="h-44 w-full border-0 grayscale-[30%] md:h-full md:min-h-56"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/50">
          © 2026 HAN wedding — Chụp ảnh cưới đẹp Biên Hòa
        </div>
      </footer>

      <ScrollFx />

      {/* Nút liên hệ nhanh */}
      <ContactFab phone={PHONE} facebook={FACEBOOK} />
    </>
  );
}
