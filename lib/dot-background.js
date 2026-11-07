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
    dt = lastT === null ? 1 : Math.min(t - lastT, 50) / 16.667;
    lastT = t;
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
