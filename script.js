// Menú en celular
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => links.classList.remove("open")));

// Aparecer al hacer scroll
const observer = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }
  }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Notitas de manifestación
const notes = [
  "You are becoming everything you dreamed of. ✨",
  "You’ve got this — today and always. 💜",
  "You are still growing, still capable, still magical. 🌙",
  "You’ve never been this ready before. 🌈",
  "Your heart knows the way. Trust it. 💫",
  "Little steps are still steps. Be proud. 🌸",
  "You are loved more than you know. 💕",
  "Good things are on their way to you. 🍀",
  "Breathe. You are exactly where you need to be. 🕊️",
  "Your light makes the world brighter. ☀️",
];
const notasES = [
  "Te estás convirtiendo en todo lo que soñaste. ✨",
  "Vos podés, hoy y siempre. 💜",
  "Seguís creciendo, seguís siendo capaz, seguís siendo mágica. 🌙",
  "Nunca habías estado tan lista. 🌈",
  "Tu corazón conoce el camino. Confiá en él. 💫",
  "Los pasitos pequeños también son pasos. Sentite orgullosa. 🌸",
  "Sos más amada de lo que imaginás. 💕",
  "Cosas buenas vienen en camino hacia vos. 🍀",
  "Respirá. Estás justo donde necesitás estar. 🕊️",
  "Tu luz hace el mundo más brillante. ☀️",
];
const noteBtn = document.getElementById("note-btn");
const noteOut = document.getElementById("note-output");
let lastNote = -1;
noteBtn.addEventListener("click", () => {
  let i;
  do { i = Math.floor(Math.random() * notes.length); } while (i === lastNote);
  lastNote = i;
  noteOut.style.opacity = 0;
  setTimeout(() => { noteOut.textContent = (lang === "es" ? notasES : notes)[i]; noteOut.style.opacity = 1; }, 200);
});

// Visor de imágenes (lightbox)
const lb = document.getElementById("lightbox");
const lbImg = lb.querySelector("img");
let group = [];
let index = 0;
const show = () => { lbImg.src = group[index].src; lbImg.alt = group[index].alt; };
document.querySelectorAll(".gallery").forEach((gallery) => {
  const imgs = [...gallery.querySelectorAll("img")];
  imgs.forEach((img, i) => img.addEventListener("click", () => {
    group = imgs; index = i; show(); lb.hidden = false; document.body.style.overflow = "hidden";
  }));
});
const close = () => { lb.hidden = true; document.body.style.overflow = ""; };
const step = (d) => { index = (index + d + group.length) % group.length; show(); };
lb.querySelector(".lb-close").addEventListener("click", close);
lb.querySelector(".lb-prev").addEventListener("click", () => step(-1));
lb.querySelector(".lb-next").addEventListener("click", () => step(1));
lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
document.addEventListener("keydown", (e) => {
  if (lb.hidden) return;
  if (e.key === "Escape") close();
  if (e.key === "ArrowLeft") step(-1);
  if (e.key === "ArrowRight") step(1);
});

// Cambiar idioma (español / inglés)
// Los textos en español están en el HTML, en los atributos data-es (texto) y data-es-alt (descripción de imágenes).
let lang = "en";
const langBtn = document.querySelector(".lang-toggle");
document.querySelectorAll("[data-es]").forEach((el) => { el.dataset.en = el.innerHTML; });
document.querySelectorAll("[data-es-alt]").forEach((el) => { el.dataset.enAlt = el.alt; });
const setLang = (l) => {
  lang = l;
  const es = l === "es";
  document.documentElement.lang = l;
  document.querySelectorAll("[data-es]").forEach((el) => { el.innerHTML = es ? el.dataset.es : el.dataset.en; });
  document.querySelectorAll("[data-es-alt]").forEach((el) => { el.alt = es ? el.dataset.esAlt : el.dataset.enAlt; });
  document.title = es ? "Alarconitas ✨ Hecho con amor por Jenn y Alli" : "Alarconitas ✨ Made with love by Jenn & Alli";
  langBtn.setAttribute("aria-label", es ? "Switch to English" : "Cambiar a español");
  if (lastNote >= 0) noteOut.textContent = (es ? notasES : notes)[lastNote];
  document.getElementById("year").textContent = new Date().getFullYear();
  try { localStorage.setItem("lang", l); } catch {}
};
langBtn.addEventListener("click", () => setLang(lang === "es" ? "en" : "es"));
let saved = null;
try { saved = localStorage.getItem("lang"); } catch {}
setLang(saved || (navigator.language.toLowerCase().startsWith("es") ? "es" : "en"));
