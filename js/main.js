(function () {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // scroll suave para âncoras (se você usar depois)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
})();
