# Kevin Daniel Christio — Personal Portfolio Website

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-FF69B4?style=for-the-badge&logo=framer)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)

Website portofolio pribadi modern, responsif, dan interaktif milik **Kevin Daniel Christio Nainggolan** — *Creative Product Designer & UI/UX Specialist*. Dibuat dengan estetika **Dark Minimalist** dipadukan dengan aksen **Vibrant Orange (`#ff6b00`)**, animasi transisi halus dengan **Framer Motion**, serta siap dideploy secara otomatis ke **Vercel**.

---

## 🎨 Desain & Identitas Visual

- **Palet Warna Utama**:
  - `Background`: Pitch Dark (`#070709` / `#09090b`)
  - `Surface / Cards`: Charcoal Zinc (`#121215` / `#18181b`)
  - `Primary Accent`: Vibrant Electric Orange (`#ff6b00` & `#ea580c`)
  - `Borders & Dividers`: Subtle Dark Zinc (`#27272a` / `rgba(255,255,255,0.08)`)
  - `Typography`: Pure Ice White (`#fafafa`) & Muted Grey (`#a1a1aa`)
- **Tipografi**:
  - **Heebo**: Font display & heading tegas, modern, dan berkarakter (weights: 400–900).
  - **Barlow**: Font body text yang bersih, proporsional, dan nyaman dibaca.
- **Elemen Karakteristik**:
  - Komposisi tipografi kreatif pada Hero section (*"Creative Product Designer"*).
  - Foto profil dalam bingkai kurva artistik dengan floating badge (*Frontend Developer*, *UI/UX Designer*, *Product Designer*, *Figma*).
  - Ambient radial glow oranye lembut di latar belakang.
  - Section *Discuss* terpusat dengan garis pembatas minimalis dan *brand signature*.

---

## ✨ Fitur & Struktur Halaman

Website ini dirancang secara modular dan responsif pada setiap layarnya:

1. **Sticky Navigation (`Navbar.tsx`)**:
   - Menu navigasi dengan backdrop blur dinamis saat scroll.
   - Drawer menu navigasi khusus tampilan mobile.
   - Direct button *"Let's Talk"* yang langsung mengarah ke section kontak.
2. **Hero Section (`Hero.tsx`)**:
   - Headline interaktif, bio ringkas, dan tombol aksi ganda (*View Portfolio* & *Let's Collaborate*).
   - Showcase foto profil presisi dengan floating pill badges.
3. **Skills Marquee (`SkillsMarquee.tsx`)**:
   - Animasi strip berjalan tanpa putus (*infinite marquee*) menampilkan keahlian: Figma, UI/UX, Next.js, React, Tailwind CSS, TypeScript, Prototyping, Design System, dll.
4. **Services / Layanan (`Services.tsx`)**:
   - Kartu layanan mendalam: UI/UX Design, Design System & Tokens, dan Frontend Prototyping.
5. **Portfolio & Studi Kasus (`Portfolio.tsx`)**:
   - Filter kategori proyek interaktif (*All*, *UI/UX*, *Frontend*, *Fullstack*, *Design*).
   - Carousel slider preview proyek otomatis dan interaktif.
   - Halaman detail studi kasus dinamis dengan rute `/projects/[slug]`.
6. **Timeline Pengalaman (`Experience.tsx`)**:
   - Rekam jejak profesional dan magang di instansi terkemuka (PT Pertamina Geothermal Energy Tbk, Setjen DPR RI Pustekinfo, dll.).
7. **What I Bring to Every Project (`WhyHireMe.tsx`)**:
   - Layout grid 12-kolom terpusat menampilkan 4 pilar kompetensi utama, metrik pencapaian (5+ Projects & Designs, 4+ Roles), dan tombol kolaborasi.
8. **Contact & Footer Minimalis (`CTA.tsx`)**:
   - Section terpusat dengan pill badge *"Let's Connect"*.
   - Tombol LinkedIn terhubung langsung ke profil.
   - Tombol email pintar anti-duplikasi penerima di Outlook/Gmail.
   - Footer garis horizontal panjang dengan tanda tangan identitas di pojok kiri bawah.

---

## 📂 Struktur Direktori Proyek

```text
portfolio/
├── app/
│   ├── layout.tsx            # Root layout, konfigurasi Heebo/Barlow, dan SEO metadata
│   ├── page.tsx              # Halaman utama (menyusun seluruh section)
│   ├── globals.css           # Styling dasar, utility classes, dan custom keyframes
│   └── projects/
│       ├── page.tsx          # Halaman indeks seluruh proyek
│       └── [slug]/page.tsx   # Halaman detail studi kasus proyek dinamis
├── components/
│   ├── Navbar.tsx            # Navigasi sticky desktop & mobile
│   ├── Hero.tsx              # Hero banner utama
│   ├── SkillsMarquee.tsx     # Infinite skills ticker
│   ├── Services.tsx          # Kartu layanan desain & frontend
│   ├── Portfolio.tsx         # Showcase proyek dengan filter & carousel
│   ├── Experience.tsx        # Timeline riwayat kerja & magang
│   ├── WhyHireMe.tsx         # Nilai tambah & statistik proyek
│   ├── CTA.tsx               # Section ajakan diskusi + footer garis minimalis
│   └── ScrollToTop.tsx       # Floating scroll-to-top indicator
├── lib/
│   └── data.ts               # Database lokal proyek & detail studi kasus
├── public/
│   ├── projects/             # Aset gambar proyek, mockup, dan ikon
│   └── profile-tight.png     # Foto profil cutout berkualitas tinggi
├── tailwind.config.ts        # Konfigurasi tema warna, font, dan animasi
├── next.config.mjs           # Konfigurasi Next.js & remote image domain
├── package.json
└── README.md
```

---

## 🚀 Menjalankan Secara Lokal

### Prasyarat
- **Node.js** v18.18 atau lebih baru (disarankan Node.js 20 LTS)
- **npm**, **yarn**, atau **pnpm**

### Langkah Instalasi
```bash
# 1. Clone repositori
git clone https://github.com/kevindcn/my-portofolio.git

# 2. Masuk ke folder proyek
cd my-portofolio

# 3. Install seluruh dependencies
npm install

# 4. Jalankan server pengembangan
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.

### Perintah Lain yang Tersedia
```bash
npm run build   # Membangun aplikasi untuk produksi (Next.js production build)
npm run start   # Menjalankan aplikasi hasil build secara lokal
npm run lint    # Mengecek kualitas kode dengan ESLint
```

---

## ☁️ Deployment ke Vercel

Proyek ini telah dikonfigurasi optimal untuk deployment instan di platform **Vercel**:

1. Pastikan seluruh perubahan kode telah di-push ke GitHub:
   ```bash
   git add .
   git commit -m "feat: updates"
   git push origin main
   ```
2. Kunjungi [vercel.com](https://vercel.com) dan login menggunakan akun GitHub.
3. Klik **"Add New..."** ➔ **"Project"** ➔ pilih repositori **`my-portofolio`**.
4. Vercel akan otomatis mendeteksi framework **Next.js** (biarkan pengaturan build default).
5. Klik **"Deploy"**. Website akan siap diakses publik dalam 1–2 menit.

---

## 🛠️ Tech Stack & Ekosistem

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animasi & Interaksi**: [Framer Motion](https://www.framer.com/motion/)
- **Icon Pack**: [Lucide React](https://lucide.dev/)
- **Optimasi Gambar & Font**: `next/image` & `next/font/google`
- **Hosting & CI/CD**: [Vercel](https://vercel.com/)

---

## 📬 Kontak & Hubungan Profesional

- **Nama**: Kevin Daniel Christio Nainggolan
- **Email**: [kevindanielnainggolan@gmail.com](mailto:kevindanielnainggolan@gmail.com)
- **LinkedIn**: [linkedin.com/in/kevin-daniel-christio](https://www.linkedin.com/in/kevin-daniel-christio/)
- **GitHub**: [github.com/kevindcn](https://github.com/kevindcn)

---
*© 2026 Kevin Daniel Christio Nainggolan. All rights reserved.*
