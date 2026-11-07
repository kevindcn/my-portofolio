# Raka.dev — Website Portofolio (Tech Blue Edition)

Website portofolio pribadi bergaya **tech/futuristic biru**, terinspirasi dari
layout referensi desain (hero, layanan, timeline pengalaman, why-hire-me,
portofolio, testimoni, CTA, blog, footer) tetapi dengan palet warna, tipografi,
dan elemen signature yang berbeda: **biru elektrik + navy gelap + aksen cyan**,
lengkap dengan micro-interaction dan animasi scroll.

Dibangun dengan **Next.js 14 (App Router) + TypeScript + Tailwind CSS +
Framer Motion**, siap di-deploy ke **Vercel**.

---

## 1. Ringkasan Desain

| Token | Nilai | Kegunaan |
|---|---|---|
| `ink` | `#050B18` | Background utama (navy gelap) |
| `surface` / `surface2` | `#0A1428` / `#0F1D38` | Panel & kartu |
| `border` | `#1B2A4A` | Garis tipis / outline |
| `primary` | `#2F6BFF` | Aksen biru elektrik (CTA, ikon, glow) |
| `cyan` | `#22D3EE` | Aksen sinyal / highlight sekunder |
| `ice` | `#E7EEFF` | Teks utama |
| `muted` | `#8CA0C9` | Teks sekunder |

- **Font display:** Space Grotesk (judul, tegas & geometris — kesan teknikal)
- **Font body:** Inter (teks isi, mudah dibaca)
- **Font mono:** JetBrains Mono (label, tag, angka — nuansa "kode")
- **Elemen signature:** lingkaran orbit di Hero (avatar dikelilingi badge
  skill yang melayang) + grid garis halus ala "circuit board" di background
  + efek glow biru pada tombol dan kartu saat hover.

Semua token warna diatur terpusat di `tailwind.config.ts`, jadi mengganti
nuansa warna cukup dilakukan di satu tempat.

---

## 2. Struktur Proyek

```
portfolio/
├── app/
│   ├── layout.tsx        # Root layout, font, metadata SEO
│   ├── page.tsx           # Menyusun seluruh section homepage
│   └── globals.css        # Base style & utility class (btn, card, dst)
├── components/
│   ├── Navbar.tsx          # Navigasi sticky + menu mobile
│   ├── Hero.tsx             # Hero + elemen signature orbit
│   ├── SkillsMarquee.tsx    # Strip skill berjalan (marquee)
│   ├── Services.tsx         # 3 kartu layanan utama
│   ├── Experience.tsx       # Timeline pengalaman kerja
│   ├── WhyHireMe.tsx        # Alasan bekerja sama + statistik
│   ├── Portfolio.tsx        # Grid proyek unggulan
│   ├── Testimonials.tsx     # Testimoni klien
│   ├── CTA.tsx               # Form kontak / ajakan diskusi
│   ├── Blog.tsx               # Daftar tulisan terbaru
│   └── Footer.tsx             # Footer + newsletter
├── public/                 # Aset statis (favicon, gambar, dsb.)
├── tailwind.config.ts       # Token warna, font, animasi kustom
├── next.config.mjs
├── package.json
└── README.md                # Dokumen ini
```

---

## 3. Menjalankan Secara Lokal

Prasyarat: **Node.js 18.18+** (disarankan 20 LTS) dan npm.

```bash
# 1. Masuk ke folder proyek
cd portfolio

# 2. Install dependency
npm install

# 3. Jalankan mode pengembangan
npm run dev
```

Buka **http://localhost:3000** di browser. Perubahan pada file akan
langsung ter-refresh (hot reload).

Perintah lain yang tersedia:

```bash
npm run build   # build produksi
npm run start   # jalankan hasil build produksi secara lokal
npm run lint    # cek linting
```

> Catatan: proyek menggunakan `next/font/google` (Space Grotesk, Inter,
> JetBrains Mono) yang butuh koneksi internet saat proses build pertama kali
> untuk mengunduh file font — pastikan mesin build (lokal maupun Vercel)
> memiliki akses internet normal.

---

## 4. Personalisasi Konten

Semua teks masih berupa **konten contoh (dummy)** yang perlu diganti sesuai
data Anda:

1. **Identitas & Hero** → `components/Hero.tsx`
   Ganti nama, judul profesi, deskripsi singkat, dan badge skill (React,
   Node.js, dst).
2. **Layanan** → `components/Services.tsx`, array `services`.
3. **Pengalaman kerja** → `components/Experience.tsx`, array `timeline`.
4. **Kenapa memilih saya & statistik** → `components/WhyHireMe.tsx`.
5. **Proyek portofolio** → `components/Portfolio.tsx`, array `projects`
   (tambahkan gambar asli dengan `next/image` bila perlu — ganti blok ikon
   inisial dengan `<Image src="/proyek/nama.png" ... />`).
6. **Testimoni** → `components/Testimonials.tsx`.
7. **Tulisan blog** → `components/Blog.tsx`.
8. **Kontak, sosial media, footer** → `components/Footer.tsx` dan
   `components/CTA.tsx`.
9. **Judul tab & meta SEO** → `app/layout.tsx` (`metadata`).
10. **Warna & font** → `tailwind.config.ts` (bagian `theme.extend`).

### Menghubungkan form kontak ke email sungguhan

Form di `components/CTA.tsx` saat ini hanya menyimpan status "terkirim" di
state lokal (tidak benar-benar mengirim email). Untuk membuatnya fungsional,
pilih salah satu:

- **Resend** (https://resend.com) + Next.js Route Handler (`app/api/contact/route.ts`)
- **Formspree** (https://formspree.io) — cukup arahkan `action` form ke endpoint mereka
- **EmailJS** — kirim email langsung dari client

Contoh minimal dengan Route Handler + Resend tersedia di komentar
`// TODO` pada `CTA.tsx` sebagai titik awal.

---

## 5. Deploy ke Vercel

### Opsi A — Lewat Dashboard Vercel (paling mudah)

1. Push folder proyek ini ke repository GitHub/GitLab/Bitbucket:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: tech blue portfolio"
   git branch -M main
   git remote add origin <URL_REPO_ANDA>
   git push -u origin main
   ```
2. Buka https://vercel.com → **Add New... → Project**.
3. Pilih repository yang baru di-push.
4. Vercel otomatis mendeteksi framework **Next.js** — biarkan pengaturan
   default (`Build Command: next build`, `Output: .next`).
5. Klik **Deploy**. Setelah selesai, Anda akan mendapat link publik seperti
   `https://nama-proyek.vercel.app` yang siap dibagikan.
6. (Opsional) Tambahkan domain kustom di **Project → Settings → Domains**.

### Opsi B — Lewat Vercel CLI

```bash
npm install -g vercel
vercel login
cd portfolio
vercel          # deploy preview
vercel --prod   # deploy ke production
```

### Environment Variables (jika memakai layanan email seperti Resend)

Tambahkan di **Project → Settings → Environment Variables** pada dashboard
Vercel, misalnya:

```
RESEND_API_KEY=xxxxxxxxxxxxxxxx
CONTACT_TO_EMAIL=hello@rakadev.id
```

Setiap kali environment variable diubah, lakukan **Redeploy** agar
perubahan diterapkan.

---

## 6. Checklist Kualitas

- [x] Responsif dari mobile (375px) sampai desktop lebar
- [x] Navigasi keyboard & fokus terlihat (elemen interaktif bawaan HTML)
- [x] Menghormati `prefers-reduced-motion` (animasi dinonaktifkan otomatis)
- [x] Struktur semantik (`header`, `main`, `section`, `footer`)
- [ ] Ganti seluruh konten dummy dengan data asli sebelum go-live
- [ ] Tambahkan gambar/screenshot proyek nyata di bagian Portofolio
- [ ] Hubungkan form kontak ke layanan email sungguhan
- [ ] Tambahkan `favicon.ico` dan gambar Open Graph di folder `public/`

---

## 7. Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) — animasi & scroll reveal
- [Lucide React](https://lucide.dev/) — ikon
- Deploy target: [Vercel](https://vercel.com/)

---

Selamat membangun! Jika ingin menambah halaman detail proyek (`/proyek/[slug]`),
integrasi CMS (Contentful/Sanity) untuk blog, atau dark/light mode toggle,
struktur App Router di proyek ini sudah siap dikembangkan ke arah sana.
