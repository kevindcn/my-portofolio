# Hero Dot Background — Panduan Implementasi (untuk Antigravity)

Efek: titik-titik kecil yang bergerak pelan di **belakang** konten hero. Saat kursor mendekat, titik **hanya bergeser halus mengikuti arah kursor** (tanpa membesar dan tanpa berubah warna).

> **Prinsip utama: ini hanya efek tambahan.** Desain, layout, teks, warna, ukuran, dan struktur hero yang sudah ada **tidak boleh berubah sama sekali**. Efek hanya ditambahkan sebagai satu `<canvas>` transparan di lapisan paling belakang.

---

## 0. Prompt siap tempel ke Antigravity

```
Tambahkan efek "dot background" ke hero section yang SUDAH ADA mengikuti panduan di HERO_DOT_EFFECT.md.

Aturan keras:
- JANGAN mengubah layout, teks, warna, font, ukuran, spacing, atau struktur HTML/JSX hero.
- JANGAN mengubah style elemen yang sudah ada kecuali yang disebut eksplisit di panduan (position & isolation pada elemen hero).
- JANGAN menambah library baru. Gunakan file dot-background.js dari panduan apa adanya.
- Canvas harus berada DI BELAKANG konten, transparan, dan tidak menangkap klik (pointer-events: none).
- Efek hanya aktif di hero, bukan seluruh halaman.

Kerjakan langkah di bagian 2, lalu jalankan checklist di bagian 4 dan laporkan hasilnya.
Jika ada konflik dengan kode yang ada, BERHENTI dan tanyakan, jangan mengubah desain untuk menyesuaikan efek.
```

---

## 1. Aturan wajib

### Yang HARUS dilakukan
- Buat **file baru** terpisah untuk efek (`dot-background.js`). Jangan menyisipkan logika efek ke dalam file komponen/halaman yang sudah ada.
- Pasang efek lewat **satu pemanggilan fungsi** pada elemen hero.
- Pertahankan warna brand: oranye `255,106,0` (ubah lewat opsi `color` jika brand berbeda).
- Hormati `prefers-reduced-motion` (sudah ditangani di modul).
- Respons hover hanya berupa **pergeseran posisi** yang digerakkan dengan fisika pegas teredam (spring). Jangan diganti dengan lerp kasar atau transisi instan. Jangan menambahkan perubahan ukuran, warna, glow, atau garis ke kursor.

### Yang TIDAK BOLEH dilakukan
- Mengubah `padding`, `margin`, `height`, `background`, `display`, atau `z-index` elemen hero/anak-anaknya.
- Membungkus ulang (wrapper) isi hero atau memindahkan elemen anak.
- Menambahkan library (tsParticles, particles.js, three.js, dsb.).
- Menaruh canvas di `body` atau `position: fixed` (efek harus terbatas di hero).
- Mengubah gambar/foto, badge, tombol, atau navbar.

---

## 2. Langkah implementasi

### 2.1 Audit hero (baca saja, jangan ubah apa pun)

Cari elemen pembungkus hero (biasanya `<section class="hero">`, `#hero`, atau komponen `Hero`). Catat:

1. Selector/ref elemen hero tersebut.
2. Apakah ada **anak langsung hero yang berlatar belakang solid dan menutupi seluruh area** (misal `div` full-size dengan `background: #0a0a0a`)? Jika ada, titik tidak akan terlihat. Lihat bagian 5.
3. Apakah ada CSS seperti `.hero > :first-child` atau `.hero :first-child`? Canvas akan disisipkan sebagai anak pertama, jadi cek agar selector itu tidak berubah target. Jika berisiko, ganti `hero.prepend(cv)` menjadi `hero.append(cv)` di modul (efek visual tetap sama karena memakai `z-index: -1`).
4. Framework yang dipakai: HTML biasa, React, Next.js, Vue, dsb.

### 2.2 Buat file `dot-background.js`

Letakkan di folder script/util proyek (contoh: `js/dot-background.js` atau `src/lib/dot-background.js`).

```js
// dot-background.js
// Efek titik di belakang konten sebuah elemen. Tidak mengubah isi elemen target.

export function createDotBackground(hero, options = {}) {
  const cfg = {
    mode: 'float',          // 'float' | 'net' | 'grid'
    color: '255,106,0',     // RGB aksen (oranye)
    maxParticles: 110,      // batas jumlah titik (mode float & net)
    density: 14000,         // makin besar = makin sedikit titik
    gap: 32,                // jarak antar titik (mode grid)
    radius: 150,            // radius pengaruh kursor
    power: 60,              // kekuatan dorongan kursor
    stiffness: .012,        // kekencangan pegas (kecil = lebih lambat & lembut)
    damping: .78,           // redaman (kecil = berhenti cepat, besar = licin & meluncur)
    ...options,
  };

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hero dijadikan stacking context agar canvas bisa di belakang konten
  // tanpa menyentuh z-index elemen lain. Nilai asli disimpan untuk dikembalikan.
  const prev = { position: hero.style.position, isolation: hero.style.isolation };
  if (getComputedStyle(hero).position === 'static') hero.style.position = 'relative';
  hero.style.isolation = 'isolate';

  const cv = document.createElement('canvas');
  cv.setAttribute('aria-hidden', 'true');
  cv.dataset.dotBg = '';
  Object.assign(cv.style, {
    position: 'absolute', inset: '0', width: '100%', height: '100%',
    zIndex: '-1', pointerEvents: 'none', display: 'block',
  });
  hero.prepend(cv);
  const ctx = cv.getContext('2d');

  let W = 0, H = 0, parts = [], grid = [], running = true, raf = 0;
  const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, a: 0, ta: 0 };

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = hero.clientWidth; H = hero.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    init();
    if (reduced) frame(0);
  }

  function init() {
    parts = [];
    const n = Math.min(cfg.maxParticles, Math.floor((W * H) / cfg.density));
    for (let i = 0; i < n; i++) {
      parts.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
        ox: 0, oy: 0, sx: 0, sy: 0,
        r: Math.random() * 1.4 + .6,
        o: Math.random() * .5 + .25,
        hot: Math.random() < .15,
      });
    }
    grid = [];
    for (let x = cfg.gap / 2; x < W; x += cfg.gap)
      for (let y = cfg.gap / 2; y < H; y += cfg.gap)
        grid.push({ hx: x, hy: y, ox: 0, oy: 0, sx: 0, sy: 0 });
  }

  // Dorongan kursor -> [offsetX, offsetY, kedekatan 0..1]
  function push(px, py, R, power) {
    if (mouse.a < .005) return [0, 0];
    const dx = px - mouse.x, dy = py - mouse.y, d = Math.hypot(dx, dy) || 1;
    if (d >= R) return [0, 0];
    const t = 1 - d / R;
    const s = t * t * (3 - 2 * t);            // smoothstep: tepi lembut, tidak ada "patahan"
    const f = s * power * mouse.a;
    return [dx / d * f, dy / d * f];
  }

  // Fisika pegas teredam: halus saat didorong dan halus saat kembali (tanpa menyentak)
  function spring(p, tx, ty) {
    const damp = Math.pow(cfg.damping, dt);
    p.sx = (p.sx + (tx - p.ox) * cfg.stiffness * dt) * damp;
    p.sy = (p.sy + (ty - p.oy) * cfg.stiffness * dt) * damp;
    p.ox += p.sx * dt;
    p.oy += p.sy * dt;
  }

  // dt = waktu antar frame (1 = 60fps), supaya gerakan konsisten di layar 60/120/144Hz
  let dt = 1, lastT = null;
  const smooth = n => 1 - Math.pow(1 - n, dt);

  function drift(p) {
    p.x += p.vx * dt; p.y += p.vy * dt;
    if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
  }

  function drawFloat() {
    for (const p of parts) {
      drift(p);
      const [tx, ty] = push(p.x, p.y, cfg.radius, cfg.power);
      spring(p, tx, ty);
      ctx.fillStyle = p.hot
        ? `rgba(${cfg.color},${p.o})`
        : `rgba(255,255,255,${p.o * .5})`;
      ctx.beginPath();
      ctx.arc(p.x + p.ox, p.y + p.oy, p.r, 0, 7); // ukuran tetap
      ctx.fill();
    }
  }

  function drawNet() {
    for (const p of parts) {
      drift(p);
      const [tx, ty] = push(p.x, p.y, cfg.radius * .87, cfg.power * .75);
      spring(p, tx, ty);
    }
    for (let i = 0; i < parts.length; i++) {
      const a = parts[i], ax = a.x + a.ox, ay = a.y + a.oy;
      for (let j = i + 1; j < parts.length; j++) {
        const b = parts[j], d = Math.hypot(ax - (b.x + b.ox), ay - (b.y + b.oy));
        if (d < 120) {
          ctx.strokeStyle = `rgba(${cfg.color},${(1 - d / 120) * .25})`;
          ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(b.x + b.ox, b.y + b.oy); ctx.stroke();
        }
      }
      ctx.fillStyle = `rgba(${cfg.color},.7)`;
      ctx.beginPath(); ctx.arc(ax, ay, a.r, 0, 7); ctx.fill();
    }
  }

  function drawGrid(t) {
    for (const g of grid) {
      const [tx, ty] = push(g.hx, g.hy, cfg.radius + 20, cfg.power * .55);
      spring(g, tx, ty);
      const wave = Math.sin(g.hx * .01 + g.hy * .01 + t * .0015) * .5 + .5;
      ctx.fillStyle = `rgba(255,255,255,${.08 + wave * .12})`;
      ctx.beginPath();
      ctx.arc(g.hx + g.ox, g.hy + g.oy, 1 + wave * .8, 0, 7); // ukuran tetap
      ctx.fill();
    }
  }

  function frame(t) {
  dt = lastT === null ? 1 : Math.min(t - lastT, 50) / 16.667; lastT = t;
    if (running) {
      mouse.x += (mouse.tx - mouse.x) * smooth(.1);
      mouse.y += (mouse.ty - mouse.y) * smooth(.1);
      mouse.a += (mouse.ta - mouse.a) * smooth(.05);
      ctx.clearRect(0, 0, W, H);
      if (cfg.mode === 'net') drawNet();
      else if (cfg.mode === 'grid') drawGrid(t);
      else drawFloat();
    }
    if (!reduced) raf = requestAnimationFrame(frame);
  }

  const onMove = (e) => {
    if (e.pointerType === 'touch') return; // jangan ganggu scroll di mobile
    const r = hero.getBoundingClientRect();
    mouse.tx = e.clientX - r.left; mouse.ty = e.clientY - r.top;
    if (mouse.a < .02) { mouse.x = mouse.tx; mouse.y = mouse.ty; }
    mouse.ta = 1;
  };
  const onLeave = () => { mouse.ta = 0; };

  hero.addEventListener('pointermove', onMove, { passive: true });
  hero.addEventListener('pointerleave', onLeave);

  const io = new IntersectionObserver(([e]) => { running = e.isIntersecting; });
  io.observe(hero);
  const ro = new ResizeObserver(resize);
  ro.observe(hero);

  resize();
  frame(0);

  return {
    setMode(m) { cfg.mode = m; },
    destroy() {
      cancelAnimationFrame(raf);
      io.disconnect(); ro.disconnect();
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
      cv.remove();
      hero.style.position = prev.position;
      hero.style.isolation = prev.isolation;
    },
  };
}
```

### 2.3 Pasang di HTML biasa

Tambahkan **hanya** blok ini sebelum `</body>`. Ganti `.hero` dengan selector hero yang ditemukan di audit:

```html
<script type="module">
  import { createDotBackground } from './js/dot-background.js';
  createDotBackground(document.querySelector('.hero'), { mode: 'float' });
</script>
```

Tidak ada perubahan lain pada HTML.

### 2.4 Pasang di React / Next.js

Buat hook terpisah `useDotBackground.js` (tambahkan `'use client'` jika memakai Next.js App Router):

```jsx
'use client';
import { useEffect } from 'react';
import { createDotBackground } from '@/lib/dot-background';

export function useDotBackground(ref, options) {
  useEffect(() => {
    if (!ref.current) return;
    const bg = createDotBackground(ref.current, options);
    return () => bg.destroy(); // aman untuk React StrictMode
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
```

Pada komponen Hero, **hanya tambahkan 2 hal**: satu `ref` dan satu pemanggilan hook. Jika `<section>` hero sudah punya `ref`, gunakan ref yang sama.

```jsx
import { useRef } from 'react';
import { useDotBackground } from '@/hooks/useDotBackground';

export default function Hero() {
  const heroRef = useRef(null);
  useDotBackground(heroRef, { mode: 'float' });

  return (
    <section ref={heroRef} className="...class lama, jangan diubah...">
      {/* seluruh isi hero lama, tidak diubah */}
    </section>
  );
}
```

> Jika Hero adalah Server Component (Next.js), jangan jadikan seluruh komponen `'use client'`. Buat client component kecil yang hanya menjalankan efek, atau jalankan hook di wrapper client terpisah.

### 2.5 CSS

**Tidak perlu CSS tambahan.** Semua style canvas sudah diterapkan lewat JavaScript dan modul hanya menambahkan `position: relative` (jika elemen hero masih `static`) dan `isolation: isolate` pada hero. Keduanya tidak mengubah tampilan.

---

## 3. Konfigurasi

| Opsi | Default | Keterangan |
|---|---|---|
| `mode` | `'float'` | `'float'` titik melayang, `'net'` titik + garis penghubung, `'grid'` grid titik bergelombang |
| `color` | `'255,106,0'` | Warna aksen dalam format `R,G,B` |
| `maxParticles` | `110` | Batas jumlah titik (float & net) |
| `density` | `14000` | Luas area per titik. Naikkan untuk titik lebih sedikit |
| `gap` | `32` | Jarak antar titik pada mode grid |
| `radius` | `150` | Radius pengaruh kursor (px) |
| `power` | `60` | Kekuatan dorongan kursor |
| `stiffness` | `.012` | Kekencangan pegas. Turunkan (misal `.008`) agar gerakan lebih lambat dan lembut |
| `damping` | `.78` | Redaman. Naikkan ke `.82` untuk efek lebih "meluncur", turunkan agar lebih cepat berhenti |

Rekomendasi agar teks tetap terbaca: gunakan `float` dengan nilai default, atau `grid` untuk kesan paling rapi.

---

## 4. Checklist verifikasi (wajib dijalankan sebelum selesai)

- [ ] Hero tampil **persis sama** seperti sebelum efek (bandingkan screenshot sebelum dan sesudah, tanpa melihat titik).
- [ ] Tinggi/lebar hero tidak berubah, tidak muncul scrollbar baru.
- [ ] Teks, tombol, badge, dan foto tetap berada **di atas** titik.
- [ ] Semua tombol dan link di hero tetap bisa diklik.
- [ ] Teks tetap bisa diseleksi.
- [ ] Titik bergerak pelan, dan saat kursor masuk hanya **bergeser** halus menjauhi kursor, lalu kembali pelan saat kursor keluar.
- [ ] Saat hover, ukuran dan warna titik **tidak berubah**.
- [ ] Tidak ada error di console.
- [ ] Di mobile (touch), titik tetap bergerak dan scroll normal.
- [ ] Dengan `prefers-reduced-motion` aktif, titik tampil diam (tidak bergerak).
- [ ] Hanya file baru (`dot-background.js`, plus hook jika React) dan 1 pemanggilan efek yang ditambahkan. Tidak ada file desain yang diubah.

---

## 5. Troubleshooting

| Masalah | Penyebab | Solusi |
|---|---|---|
| Titik tidak terlihat | Ada elemen anak full-size dengan background solid yang menutupi canvas | Jangan ubah desain. Laporkan elemennya, lalu pilih: jadikan background elemen itu `transparent`, atau pindahkan warna latar ke hero itu sendiri (hanya jika disetujui) |
| Titik muncul di atas teks | Ada elemen dengan `z-index` negatif atau stacking context yang aneh | Pastikan hero memiliki `isolation: isolate` (sudah otomatis). Periksa apakah ada `!important` yang menimpa |
| Hero jadi bergeser atau berubah ukuran | Hero sebelumnya `position: static` dan layout bergantung padanya | Canvas bersifat `absolute` sehingga tidak mempengaruhi layout. Jika tetap bergeser, cek selector `:first-child` (lihat 2.1 poin 3) |
| Efek hilang saat navigasi (SPA) | Hook tidak di-cleanup / di-mount ulang | Pastikan `destroy()` dipanggil di cleanup `useEffect` |
| Berat di HP lama | Terlalu banyak titik | Turunkan `maxParticles` (misal 60) atau naikkan `density` |
| Titik buram | Canvas tidak mengikuti device pixel ratio | Sudah ditangani (`dpr` maksimal 2). Pastikan modul tidak dimodifikasi |
| Efek tidak bereaksi ke kursor | Ada overlay transparan di atas hero yang menangkap event | Event dipasang di hero. Pastikan overlay itu berada di dalam hero, bukan di luar |

---

## 6. Rollback

Efek bisa dilepas total tanpa bekas:

1. Hapus pemanggilan `createDotBackground(...)` (atau hook `useDotBackground` dan `ref`-nya).
2. Hapus file `dot-background.js`.

Karena modul mengembalikan `position` dan `isolation` ke nilai awal saat `destroy()`, tampilan hero kembali seperti semula.
