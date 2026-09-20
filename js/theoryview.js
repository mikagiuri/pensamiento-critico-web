"use strict";
/* ===== Vista de teoría ===== depende de: theory.js ===== */

let theoryKey = Object.keys(THEORY)[0];
let theorySubject = "all";
let theoryBlock = "all";

const THEORY_SUBJECTS = { fil: "Filosofía 1.º", hf: "Historia de la Filosofía", ipc: "Pensamiento crítico" };
const THEORY_BLOCKS = { A: "Bloque A · Antigua", B: "Bloque B · Medieval-Moderna", C: "Bloque C · Contemporánea" };

function blockOf(t){
  const m = (t.tema || "").match(/Tema (\d+)/);
  if (!m) return null;
  const n = +m[1];
  if (n >= 1 && n <= 10) return "A";
  if (n >= 11 && n <= 17) return "B";
  if (n >= 18 && n <= 27) return "C";
  return null;
}

function renderTheoryFilter(){
  const box = document.getElementById("theoryfilter");
  const subjBtns = ["all", "fil", "hf", "ipc"].map(s =>
    '<button class="fbtn" data-subj="' + s + '" aria-pressed="' + (s === theorySubject) + '">' +
    (s === "all" ? "Todas" : THEORY_SUBJECTS[s]) + '</button>'
  ).join("");
  let blockBtns = "";
  if (theorySubject === "hf"){
    blockBtns = ["all", "A", "B", "C"].map(b =>
      '<button class="fbtn" data-block="' + b + '" aria-pressed="' + (b === theoryBlock) + '">' +
      (b === "all" ? "Todos los bloques" : THEORY_BLOCKS[b]) + '</button>'
    ).join("");
  }
  box.innerHTML = '<div class="fgroup"><span class="flabel">Materia</span>' + subjBtns + '</div>' +
    (blockBtns ? '<div class="fgroup"><span class="flabel">Bloque</span>' + blockBtns + '</div>' : '');
  box.querySelectorAll("[data-subj]").forEach(b => b.addEventListener("click", () => {
    theorySubject = b.dataset.subj;
    if (theorySubject !== "hf") theoryBlock = "all";
    renderTheoryFilter();
    renderTheoryChips();
  }));
  box.querySelectorAll("[data-block]").forEach(b => b.addEventListener("click", () => {
    theoryBlock = b.dataset.block;
    renderTheoryFilter();
    renderTheoryChips();
  }));
}

function renderTheoryChips(){
  const box = document.getElementById("theorychips");
  const entries = Object.entries(THEORY).filter(([k, t]) => {
    if (theorySubject !== "all" && t.subject !== theorySubject) return false;
    if (theorySubject === "hf" && theoryBlock !== "all" && blockOf(t) !== theoryBlock) return false;
    return true;
  });
  box.innerHTML = entries
    .map(([k, t]) => '<button class="chip" data-th="' + k + '" aria-pressed="' + (k === theoryKey) + '">' + t.title + '</button>').join("");
  box.querySelectorAll("[data-th]").forEach(b => b.addEventListener("click", () => loadTheory(b.dataset.th)));
}

/* Recursos del MISMO tema (enlaces contextuales), sin cambiar la navegación:
   reutiliza el mapa curado UNIDADES (HF) y coincidencia directa de clave (Filosofía). */
function theoryRelated(key){
  const out = [];
  const has = (o, k) => typeof o !== "undefined" && o && o[k];
  if (typeof UNIDADES !== "undefined"){
    for (const n of Object.keys(UNIDADES)){
      const u = UNIDADES[n];
      if (u && u.teoria === key){
        out.push({ go: "unidad", arg: n, label: "Ver el tema completo →" });
        if (u.quiz && has(QUIZZES, u.quiz)) out.push({ go: "cuestionarios", arg: u.quiz, label: "Cuestionario" });
        if (u.lectura && has(LECTURAS, u.lectura)) out.push({ go: "lecturas", arg: u.lectura, label: "Leer el texto" });
        break;
      }
    }
  }
  if (has(QUIZZES, key) && !out.some(r => r.go === "cuestionarios")) out.push({ go: "cuestionarios", arg: key, label: "Cuestionario" });
  if (has(INFOGRAFIAS, key)) out.push({ go: "infografias", arg: key, label: "Infografía" });
  return out;
}

function goTheoryRelated(go, arg){
  if (typeof show === "function") show(go);
  if (go === "cuestionarios" && typeof loadQuiz === "function") loadQuiz(arg);
  else if (go === "lecturas" && typeof loadLectura === "function") loadLectura(arg);
  else if (go === "infografias" && typeof loadInfografia === "function") loadInfografia(arg);
  else if (go === "teoria") loadTheory(arg);
  else if (go === "unidad" && typeof unidadKey !== "undefined"){
    unidadKey = +arg;
    if (typeof renderUnidadChips === "function") renderUnidadChips();
    if (typeof renderUnidadBody === "function") renderUnidadBody();
  }
}

function loadTheory(k){
  theoryKey = k;
  renderTheoryChips();
  const t = THEORY[k], body = document.getElementById("theorybody");
  const rel = theoryRelated(k);
  const relHtml = rel.length
    ? '<div class="toolrow theory-related" style="margin:.1rem 0 1.1rem"><span class="flabel" style="align-self:center">De este tema:</span>' +
      rel.map(r => '<button class="btn" data-go="' + r.go + '" data-arg="' + r.arg + '">' + r.label + '</button>').join(" ") + '</div>'
    : '';
  body.innerHTML = '<div class="theory-head"><span class="kick" style="color:var(--' + t.subject + ')">' + t.tema + '</span><h1>' + t.title + '</h1></div>' + relHtml + t.html;
  body.querySelectorAll(".theory-related [data-go]").forEach(b => b.addEventListener("click", () => goTheoryRelated(b.dataset.go, b.dataset.arg)));
  const hs = [...body.querySelectorAll("h2")];
  hs.forEach((h, i) => { h.id = "th-" + i; });
  body.querySelectorAll(".figimg").forEach(img => img.addEventListener("click", () => openLightbox(img.src)));
  const toc = document.getElementById("toc");
  toc.innerHTML = '<div class="toc-title">En este tema</div><ol>' +
    hs.map((h, i) => '<li><a href="#th-' + i + '">' + h.textContent + '</a></li>').join("") + '</ol>';
}

renderTheoryFilter();
loadTheory(theoryKey);
