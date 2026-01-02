(function () {
  const canvas = document.getElementById("fx-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let w, h, dpr;

  const cfg = {
    count: 80,
    maxSpeed: 0.35,
    linkDist: 140
  };

  const pts = [];

  function resize() {
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    w = canvas.width = Math.floor(innerWidth * dpr);
    h = canvas.height = Math.floor(innerHeight * dpr);
    canvas.style.width = innerWidth + "px";
    canvas.style.height = innerHeight + "px";
  }

  function rnd(a, b) { return a + Math.random() * (b - a); }

  function init() {
    pts.length = 0;
    for (let i = 0; i < cfg.count; i++) {
      pts.push({
        x: rnd(0, w), y: rnd(0, h),
        vx: rnd(-cfg.maxSpeed, cfg.maxSpeed) * dpr,
        vy: rnd(-cfg.maxSpeed, cfg.maxSpeed) * dpr,
        r: rnd(1.1, 2.3) * dpr,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // grid glow leve
    ctx.globalAlpha = 0.06;
    ctx.strokeStyle = "#7cdbff";
    const step = 70 * dpr;
    ctx.beginPath();
    for (let x = 0; x <= w; x += step) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }
    for (let y = 0; y <= h; y += step) {
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    }
    ctx.stroke();
    ctx.globalAlpha = 1;

    // partículas
    for (const p of pts) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      ctx.beginPath();
      ctx.fillStyle = "rgba(124,219,255,0.8)";
      ctx.shadowColor = "rgba(124,219,255,0.65)";
      ctx.shadowBlur = 12 * dpr;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // linhas entre partículas
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < cfg.linkDist * dpr) {
          const alpha = (1 - dist / (cfg.linkDist * dpr)) * 0.22;
          ctx.strokeStyle = `rgba(54,163,255,${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  resize();
  init();
  draw();

  addEventListener("resize", () => {
    resize();
    init();
  });
})();
