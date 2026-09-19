"use strict";
/* ===== Parejas ===== depende de: data glosario.js (GLOSARIO) =====
   Juego de emparejar término ↔ definición: rondas de 6 parejas del glosario,
   por bloque, con puntos, racha, errores, tiempo y mejor marca (localStorage). */

const PAR_N = 6;                 // parejas por ronda
const PAR_BLOCK_NAME = { A: "Bloque A · Antigua-medieval", B: "Bloque B · Moderna", C: "Bloque C · Contemporánea" };

const par = { block: null, pairs: [], sel: null, matched: null, errors: 0, score: 0, streak: 0, t0: 0, tick: null };

function parBox(){ return document.getElementById("parbox"); }
function parShuffle(a){ a = a.slice(); for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function parBlocksPresent(){ return [...new Set(GLOSARIO.map(g => g.bloque))].filter(Boolean).sort(); }
function parPoolOf(b){ return GLOSARIO.filter(g => g.bloque === b && g.t && g.def); }
function escPar(s){ return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

/* ---------- inicio ---------- */
function renderParStart(){
  const box = parBox(); if (!box) return;
  if (par.tick){ clearInterval(par.tick); par.tick = null; }
  const present = parBlocksPresent();
  if (!present.length){ box.innerHTML = '<p class="lead">No hay glosario para jugar en esta web.</p>'; return; }
  if (!present.includes(par.block)) par.block = present[0];
  const picks = present.map(b => '<button class="pbtn" data-pblock="' + b + '" aria-pressed="' + (b === par.block) + '">' + PAR_BLOCK_NAME[b] + '</button>').join("");
  box.innerHTML = '<div class="par-wrap">' +
    '<div class="par-pick"><span class="flabel">Bloque</span>' + picks + '</div>' +
    '<button class="par-play" id="parPlay"><span>🧩</span><span><b>Jugar</b> · empareja ' + PAR_N + ' términos con su definición</span></button>' +
    '</div>';
  box.querySelectorAll("[data-pblock]").forEach(b => b.addEventListener("click", () => { par.block = b.dataset.pblock; renderParStart(); }));
  document.getElementById("parPlay").addEventListener("click", parStart);
}

/* ---------- ronda ---------- */
function parStart(){
  const pool = parPoolOf(par.block);
  par.pairs = parShuffle(pool).slice(0, Math.min(PAR_N, pool.length));
  par.sel = null; par.matched = new Set(); par.errors = 0; par.score = 0; par.streak = 0; par.t0 = Date.now();
  renderParRound();
  if (par.tick) clearInterval(par.tick);
  par.tick = setInterval(parUpdateTime, 500);
}

function parElapsed(){ return Math.floor((Date.now() - par.t0) / 1000); }
function parUpdateTime(){ const el = document.getElementById("parTime"); if (el) el.textContent = parElapsed() + " s"; }

function renderParRound(){
  const box = parBox();
  const left = parShuffle(par.pairs.map((_, i) => i));   // orden de términos
  const right = parShuffle(par.pairs.map((_, i) => i));   // orden de definiciones
  const terms = left.map(i => '<button class="par-item par-term" data-side="t" data-pair="' + i + '">' + escPar(par.pairs[i].t) + '</button>').join("");
  const defs = right.map(i => '<button class="par-item par-def" data-side="d" data-pair="' + i + '">' + escPar(par.pairs[i].def) + '</button>').join("");
  box.innerHTML = '<div class="par-wrap">' +
    '<div class="par-hud">' +
      '<span class="stat">Parejas <b id="parDone">0</b> / ' + par.pairs.length + '</span>' +
      '<span class="stat">Errores <b id="parErr">0</b></span>' +
      '<span class="stat">⏱ <b id="parTime">0 s</b></span>' +
      '<span class="par-score" id="parScore">0 pts</span>' +
    '</div>' +
    '<div class="par-board">' +
      '<div><div class="par-col-h">Término</div><div class="par-terms">' + terms + '</div></div>' +
      '<div><div class="par-col-h">Definición</div><div class="par-defs">' + defs + '</div></div>' +
    '</div></div>';
  box.querySelectorAll(".par-item").forEach(el => el.addEventListener("click", () => parClick(el)));
}

function parClick(el){
  if (el.disabled || el.classList.contains("matched")) return;
  const side = el.dataset.side, pair = +el.dataset.pair;
  if (!par.sel){ par.sel = { el, side, pair }; el.classList.add("sel"); return; }
  if (par.sel.el === el){ el.classList.remove("sel"); par.sel = null; return; }   // deseleccionar
  if (par.sel.side === side){ par.sel.el.classList.remove("sel"); par.sel = { el, side, pair }; el.classList.add("sel"); return; } // cambiar de misma columna

  // hay uno de cada columna: comprobar
  const a = par.sel; a.el.classList.remove("sel");
  if (a.pair === pair){
    // acierto
    par.streak++; const gain = 100 + Math.min(par.streak - 1, 5) * 20;
    par.score += gain; par.matched.add(pair);
    [a.el, el].forEach(x => { x.classList.add("matched", "pop"); x.disabled = true; setTimeout(() => x.classList.remove("pop"), 280); });
    document.getElementById("parDone").textContent = par.matched.size;
    document.getElementById("parScore").textContent = par.score + " pts";
    par.sel = null;
    if (par.matched.size === par.pairs.length) setTimeout(renderParResult, 420);
  } else {
    // fallo
    par.errors++; par.streak = 0;
    document.getElementById("parErr").textContent = par.errors;
    [a.el, el].forEach(x => { x.classList.add("wrong"); setTimeout(() => x.classList.remove("wrong"), 320); });
    par.sel = null;
  }
}

/* ---------- resultado ---------- */
function parRank(errors){
  if (errors === 0) return ["🏆", "¡Perfecto, sin fallos!"];
  if (errors <= 2)  return ["🎓", "Muy bien"];
  if (errors <= 5)  return ["🌱", "Bien, a seguir"];
  return ["📚", "A repasar el glosario"];
}

function renderParResult(){
  if (par.tick){ clearInterval(par.tick); par.tick = null; }
  const secs = parElapsed();
  const timeBonus = Math.max(0, 120 - secs) * 2;
  par.score += timeBonus;
  const [emoji, rank] = parRank(par.errors);
  const key = "aula-parejas-best";
  const bestMap = store.get(key, {}); const prev = bestMap[par.block] || 0;
  const record = par.score > prev; if (record){ bestMap[par.block] = par.score; store.set(key, bestMap); }
  parBox().innerHTML = '<div class="par-wrap"><div class="par-result">' +
    '<div class="par-badge">' + emoji + '</div>' +
    '<div class="par-rank">' + rank + '</div>' +
    '<div class="par-final">' + par.score + '</div>' +
    '<p class="par-stats">' + par.pairs.length + ' parejas · ' + par.errors + (par.errors === 1 ? ' error' : ' errores') + ' · ' + secs + ' s' +
      ' · ' + (record ? '¡nueva mejor marca! 🎉' : 'mejor: ' + Math.max(prev, par.score) + ' pts') + '</p>' +
    '<div class="par-actions"><button class="btn2 primary" id="parAgain">Otra ronda</button>' +
      '<button class="btn2" id="parHome">Cambiar bloque</button></div>' +
    '</div></div>';
  document.getElementById("parAgain").addEventListener("click", parStart);
  document.getElementById("parHome").addEventListener("click", renderParStart);
}

/* ---------- init ---------- */
function initPar(){ if (typeof GLOSARIO === "undefined") return; renderParStart(); }
document.addEventListener("DOMContentLoaded", initPar);
(function(){ const nav = document.getElementById("tabs"); if (nav) nav.addEventListener("click", e => {
  const b = e.target.closest("button"); if (b && b.dataset.view === "parejas") renderParStart();
}); })();
