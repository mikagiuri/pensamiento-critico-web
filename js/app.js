"use strict";
/* ===== Arranque: navegación, tema, horario y materias =====
   depende de: store.js, data.js, y de las funciones globales
   loadDeck() / loadQuiz() (flashcards.js, quiz.js, cargados antes). */

/* ----- navegación entre vistas ----- */
const tabs = document.getElementById("tabs");
const views = [...document.querySelectorAll(".view")];
function show(id){
  views.forEach(v => v.classList.toggle("active", v.id === id));
  [...tabs.children].forEach(b => b.setAttribute("aria-current", b.dataset.view === id ? "true" : "false"));
  window.scrollTo(0, 0);
}
tabs.addEventListener("click", e => { const b = e.target.closest("button"); if (b) show(b.dataset.view); });

/* ----- tema claro / oscuro / sistema ----- */
const themeBtn = document.getElementById("theme");
function applyTheme(t){
  if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
  else document.documentElement.removeAttribute("data-theme");
}
function themeIcon(t){ return t === "light" ? "☀" : t === "dark" ? "☾" : "◐"; }
let theme = store.get("aula-theme", "system");
applyTheme(theme);
themeBtn.textContent = themeIcon(theme);
themeBtn.addEventListener("click", () => {
  theme = theme === "system" ? "light" : theme === "light" ? "dark" : "system";
  store.set("aula-theme", theme);
  applyTheme(theme);
  themeBtn.textContent = themeIcon(theme);
});

/* ----- horario ----- */
(function buildWeek(){
  const tb = document.getElementById("weekbody");
  WEEK.forEach(row => {
    const tr = document.createElement("tr");
    const th = document.createElement("td"); th.className = "h"; th.textContent = row[0]; tr.appendChild(th);
    for (let i = 1; i < 6; i++){
      const td = document.createElement("td"), c = row[i];
      if (Array.isArray(c)){ const s = document.createElement("span"); s.className = "pill " + c[0]; s.textContent = c[1]; td.appendChild(s); }
      else td.innerHTML = '<span style="color:var(--muted)">·</span>';
      tr.appendChild(td);
    }
    tb.appendChild(tr);
  });
})();

/* ----- vistas de materia ----- */
/* Mapa de recursos de una materia: por cada tipo de contenido, cuántos elementos
   hay de esa materia. Da al hub un índice navegable de todo lo disponible (además
   de los enlaces curados de s.tools). Guardas typeof por si un build no trae alguna
   colección. Al pulsar una ficha, navctx.js preselecciona la materia en esa vista. */
function subjectResourceMap(subjId){
  const defs = [
    ["teoria", "Teoría", typeof THEORY !== "undefined" ? THEORY : null],
    ["lecturas", "Lecturas", typeof LECTURAS !== "undefined" ? LECTURAS : null],
    ["cuestionarios", "Cuestionarios", typeof QUIZZES !== "undefined" ? QUIZZES : null],
    ["tarjetas", "Tarjetas", typeof DECKS !== "undefined" ? DECKS : null],
    ["infografias", "Infografías", typeof INFOGRAFIAS !== "undefined" ? INFOGRAFIAS : null],
    ["esquemas", "Esquemas", typeof ESQUEMAS !== "undefined" ? ESQUEMAS : null],
    ["mapas", "Mapas", typeof MAPS !== "undefined" ? MAPS : null],
    ["materiales", "Materiales", typeof MATERIALS !== "undefined" ? MATERIALS : null]
  ];
  return defs.map(([go, label, coll]) => {
    if (!coll) return null;
    const n = Object.keys(coll).filter(k => coll[k] && coll[k].subject === subjId).length;
    return n ? { go, label, n } : null;
  }).filter(Boolean);
}

function renderSubjects(){
  Object.entries(SUBJECTS).forEach(([id, s]) => {
    const el = document.getElementById(id);
    const mats = s.mats.map(m => {
      const inner = `<h4>${m[0]}</h4><p>${m[1]}</p><span class="tag">${m[2]}</span>`;
      return m[3] ? `<div class="mat mat-link" data-mat="${m[3]}" role="button" tabindex="0">${inner}</div>` : `<div class="mat">${inner}</div>`;
    }).join("");
    const tools = s.tools.length
      ? `<div class="toolrow">${s.tools.map(t => `<button class="btn" data-go="${t[1]}" data-arg="${t[2]}">${t[0]} →</button>`).join("")}</div>`
      : "";
    const resMap = subjectResourceMap(id);
    const hub = resMap.length
      ? `<div class="sec-head"><h2 class="sec">Explora la materia</h2><p>Todo lo disponible, por tipo. Pulsa para abrirlo.</p></div>
      <div class="hubmap" style="--c:${s.color}">${resMap.map(r => `<button class="hubtile" data-hub="${r.go}"><span class="hubtile-n">${r.n}</span><span class="hubtile-l">${r.label}</span></button>`).join("")}</div>`
      : "";
    el.innerHTML = `<div class="subhead" style="--c:${s.color}"><span class="kick">${s.kick}</span><h1>${s.name}</h1></div>
      <p class="lead">${s.intro}</p>
      ${hub}
      <div class="sec-head"><h2 class="sec">Materiales</h2></div>
      <div class="mats">${mats}</div>${tools}`;
  });
  document.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => {
    const go = b.dataset.go, arg = b.dataset.arg;
    show(go);
    if (go === "tarjetas") loadDeck(arg);
    if (go === "cuestionarios") loadQuiz(arg);
    if (go === "teoria") loadTheory(arg);
    if (go === "materiales") loadMaterial(arg);
    if (go === "mapas") loadMap(arg);
  }));
  /* Fichas del hub: solo cambian de vista; navctx.js preselecciona la materia. */
  document.querySelectorAll("[data-hub]").forEach(b => b.addEventListener("click", () => show(b.dataset.hub)));
  document.querySelectorAll("[data-mat]").forEach(b => b.addEventListener("click", () => {
    show("materiales");
    loadMaterial(b.dataset.mat);
  }));
}
renderSubjects();
