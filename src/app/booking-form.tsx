"use client";

import { useState } from "react";

const field =
  "w-full border-0 border-b border-white/40 bg-transparent px-0 py-3 text-white placeholder:text-white/50 focus:border-white focus:outline-none focus:ring-0";

export default function BookingForm() {
  const [sent, setSent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const phone = String(d.get("phone") ?? "").replace(/\s/g, "");
    if (!/^0\d{9}$/.test(phone)) {
      setError("Số điện thoại cần đủ 10 số và bắt đầu bằng 0, ví dụ 0589653242.");
      return;
    }
    setError(null);
    const note = [
      `Đặt lịch tư vấn – ${d.get("name")}`,
      `SĐT: ${phone}`,
      `Dịch vụ: ${d.get("service")}`,
      d.get("date") ? `Ngày cưới dự kiến: ${d.get("date")}` : "",
      d.get("message") ? `Ghi chú: ${d.get("message")}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    try {
      await navigator.clipboard.writeText(note);
    } catch {}
    setSent(note);
  }

  if (sent) {
    return (
      <div className="text-white" role="status">
        <p className="display text-4xl">Đã chuẩn bị lời nhắn.</p>
        <p className="mt-4 max-w-md text-white/80">
          Nội dung đặt lịch đã được sao chép. Mở Zalo, dán vào khung chat và gửi — HAN sẽ gọi lại để hẹn
          giờ tư vấn.
        </p>
        <pre className="mt-6 whitespace-pre-wrap border-l border-white/40 pl-4 text-sm text-white/80">{sent}</pre>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="https://zalo.me/0589653242" target="_blank" rel="noreferrer" className="bg-white px-6 py-3 font-medium text-wine">
            Mở Zalo và gửi
          </a>
          <a href="tel:0589653242" className="border border-white px-6 py-3 text-white">
            Gọi 058 965 3242
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2" noValidate={false}>
      <label className="block">
        <span className="text-sm text-white/70">Tên của bạn</span>
        <input name="name" required autoComplete="name" className={field} placeholder="Nguyễn Ngọc Hân" />
      </label>
      <label className="block">
        <span className="text-sm text-white/70">Số điện thoại / Zalo</span>
        <input name="phone" required inputMode="tel" autoComplete="tel" className={field} placeholder="09xx xxx xxx" />
      </label>
      <label className="block">
        <span className="text-sm text-white/70">Bạn quan tâm</span>
        <select name="service" className={`${field} [&>option]:text-ink`} defaultValue="Gói chụp ảnh cưới">
          <option>Gói chụp ảnh cưới</option>
          <option>Thuê váy cưới</option>
          <option>Makeup và làm tóc cô dâu</option>
          <option>Trọn gói ngày cưới</option>
        </select>
      </label>
      <label className="block">
        <span className="text-sm text-white/70">Ngày cưới dự kiến</span>
        <input name="date" type="date" className={`${field} [color-scheme:dark]`} />
      </label>
      <label className="block sm:col-span-2">
        <span className="text-sm text-white/70">Bạn muốn HAN biết thêm điều gì?</span>
        <textarea name="message" rows={2} className={field} placeholder="Concept yêu thích, ngân sách, địa điểm chụp…" />
      </label>
      {error && (
        <p role="alert" className="text-sm text-white sm:col-span-2">
          {error}
        </p>
      )}
      <div className="sm:col-span-2">
        <button type="submit" className="bg-white px-8 py-4 font-medium text-wine transition-colors hover:bg-ivory">
          Đặt lịch tư vấn
        </button>
      </div>
    </form>
  );
}
