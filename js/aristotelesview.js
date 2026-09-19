"use strict";
/* ===== Eudaimonía ===== juego de la ética de Aristóteles ===== depende de: juego_aristoteles.js (JUEGO_ARIS), store.js ===== */

const ARI = { char: null, eud: 0, phr: 0, round: 0, deck: [], answered: false };
function ariBox(){ return document.getElementById("aribox"); }
function ariShuffle(a){ a = a.slice(); for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function ariEsc(s){ return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

/* ---------- elección de personaje ---------- */
function renderAriStart(){
  const box = ariBox(); if (!box) return;
  const cards = JUEGO_ARIS.chars.map(c =>
    '<button class="ari-char" data-char="' + c.id + '">' +
      '<div class="ari-char-h"><span class="ari-emoji">' + c.emoji + '</span><b>' + c.name + '</b><span class="ari-orient">' + c.orient + '</span></div>' +
      '<div class="ari-stats"><span>🧠 Alma <b>' + c.alma + '</b></span><span>🏋️ Cuerpo <b>' + c.cuerpo + '</b></span><span>💰 Bienes <b>' + c.bienes + '</b></span><span>🧭 Phrónesis <b>' + c.phronesis + '</b></span></div>' +
      '<div class="ari-traits"><span class="ari-vir">' + c.virtud + '</span><span class="ari-deb">' + c.debilidad + '</span></div>' +
      '<div class="ari-frase">«' + c.frase + '»</div>' +
    '</button>').join("");
  box.innerHTML = '<div class="ari-wrap">' +
    '<div class="ari-col-h">Elige tu personaje · 8 dilemas · la phrónesis ayuda en las decisiones con azar 🎲</div>' +
    '<div class="ari-chars">' + cards + '</div></div>';
  box.querySelectorAll("[data-char]").forEach(b => b.addEventListener("click", () => ariStart(b.dataset.char)));
}

/* ---------- partida ---------- */
function ariStart(id){
  const c = JUEGO_ARIS.chars.find(x => x.id === id);
  ARI.char = c; ARI.eud = c.alma + c.cuerpo + c.bienes; ARI.phr = c.phronesis; ARI.round = 0;
  ARI.deck = ariShuffle(JUEGO_ARIS.dilemmas).slice(0, JUEGO_ARIS.meta.rounds);
  ariRenderDilemma();
}

function ariHud(){
  return '<div class="ari-hud">' +
    '<span class="ari-who">' + ARI.char.emoji + ' ' + ARI.char.name + '</span>' +
    '<span class="ari-stat">Ronda <b>' + (ARI.round + 1) + '</b>/' + JUEGO_ARIS.meta.rounds + '</span>' +
    '<span class="ari-stat">🌿 Eudaimonía <b id="ariEud">' + ARI.eud + '</b></span>' +
    '<span class="ari-stat">🧭 Phrónesis <b id="ariPhr">' + ARI.phr + '</b></span>' +
  '</div>';
}

function ariRenderDilemma(){
  const d = ARI.deck[ARI.round]; ARI.answered = false;
  const opts = d.opts.map((o, i) => '<button class="ari-opt" data-i="' + i + '"><span class="k">' + "ABC"[i] + '</span><span>' + ariEsc(o.t) + (o.risk ? ' <span class="ari-risk">azar 🎲</span>' : '') + '</span></button>').join("");
  ariBox().innerHTML = '<div class="ari-wrap">' + ariHud() +
    '<div class="ari-card"><div class="ari-virtue">' + ariEsc(d.virtue) + '</div>' +
      '<p class="ari-sit">' + ariEsc(d.sit) + '</p>' +
      '<div class="ari-opts">' + opts + '</div>' +
      '<div class="ari-res" id="ariRes"></div>' +
      '<div class="ari-foot"><button class="ari-next" id="ariNext" hidden>' + (ARI.round === JUEGO_ARIS.meta.rounds - 1 ? "Ver balance" : "Siguiente dilema →") + '</button></div>' +
    '</div></div>';
  ariBox().querySelectorAll(".ari-opt").forEach(b => b.addEventListener("click", () => ariChoose(+b.dataset.i)));
  document.getElementById("ariNext").addEventListener("click", ariNext);
}

function ariChoose(i){
  if (ARI.answered) return; ARI.answered = true;
  const d = ARI.deck[ARI.round], o = d.opts[i];
  const opts = [...document.querySelectorAll(".ari-opt")];
  opts.forEach((b, j) => { b.disabled = true; if (j !== i) b.classList.add("dim"); });
  opts[i].classList.add("chosen");
  let dEud = o.eud || 0, dPhr = o.phr || 0; const lines = [];
  lines.push('<b>Tu decisión:</b> ' + ariEsc(o.t) + ariDelta(o.eud, o.phr));
  // riesgo (dado): la phrónesis mejora las probabilidades
  if (o.risk){
    const p = Math.min(0.85, 0.35 + ARI.phr * 0.06);
    const ok = Math.random() < p;
    dEud += ok ? 2 : -2;
    lines.push('<b>🎲 Azar' + (ARI.phr >= 6 ? ' (tu prudencia ayuda)' : '') + ':</b> ' + (ok ? 'te favorece' : 'te es adverso') + ' ' + ariDelta(ok ? 2 : -2, 0));
  }
  // carta de azar
  const cc = JUEGO_ARIS.chance[Math.floor(Math.random() * JUEGO_ARIS.chance.length)];
  dEud += cc.eud || 0; dPhr += cc.phr || 0;
  lines.push('<div class="ari-chance">🃏 <b>' + ariEsc(cc.t) + '.</b> ' + ariEsc(cc.d) + ' ' + ariDelta(cc.eud, cc.phr) + '</div>');

  ARI.eud += dEud; ARI.phr = Math.max(0, ARI.phr + dPhr);
  const eEl = document.getElementById("ariEud"); if (eEl){ eEl.textContent = ARI.eud; eEl.parentElement.classList.add("bump"); setTimeout(() => eEl.parentElement.classList.remove("bump"), 250); }
  const pEl = document.getElementById("ariPhr"); if (pEl) pEl.textContent = ARI.phr;
  const res = document.getElementById("ariRes"); res.innerHTML = lines.join(""); res.classList.add("show");
  document.getElementById("ariNext").hidden = false;
}

function ariDelta(eud, phr){
  const parts = [];
  if (eud) parts.push('<span class="' + (eud > 0 ? "up" : "down") + '">' + (eud > 0 ? "+" : "") + eud + ' 🌿</span>');
  if (phr) parts.push('<span class="' + (phr > 0 ? "up" : "down") + '">' + (phr > 0 ? "+" : "") + phr + ' 🧭</span>');
  return parts.length ? ' <span class="ari-d">' + parts.join(" ") + '</span>' : ' <span class="ari-d">—</span>';
}

function ariNext(){ ARI.round++; if (ARI.round >= JUEGO_ARIS.meta.rounds) ariResult(); else ariRenderDilemma(); }

/* ---------- balance final ---------- */
function ariBand(eud){ return JUEGO_ARIS.bands.find(b => eud >= b.min) || JUEGO_ARIS.bands[JUEGO_ARIS.bands.length - 1]; }
function ariResult(){
  const band = ariBand(ARI.eud);
  const key = "aula-eudaimonia-best"; const best = store.get(key, {}); const prev = best[ARI.char.id] || 0;
  const record = ARI.eud > prev; if (record){ best[ARI.char.id] = ARI.eud; store.set(key, best); }
  const q = JUEGO_ARIS.reflect[Math.floor(Math.random() * JUEGO_ARIS.reflect.length)];
  ariBox().innerHTML = '<div class="ari-wrap"><div class="ari-result">' +
    '<div class="ari-badge">' + band.emoji + '</div>' +
    '<div class="ari-rank">' + band.label + '</div>' +
    '<div class="ari-final">' + ARI.eud + ' <span>eudaimonía</span></div>' +
    '<p class="ari-stats2">' + ARI.char.emoji + ' ' + ARI.char.name + ' · phrónesis final ' + ARI.phr +
      ' · ' + (record ? '¡tu mejor vida hasta ahora! 🎉' : 'mejor con ' + ARI.char.name + ': ' + Math.max(prev, ARI.eud)) + '</p>' +
    '<blockquote class="ari-reflect">Para pensar: ' + ariEsc(q) + '</blockquote>' +
    '<div class="ari-actions"><button class="btn2 primary" id="ariAgain">Otra vida</button>' +
      '<button class="btn2" id="ariHome">Cambiar de personaje</button></div>' +
  '</div></div>';
  document.getElementById("ariAgain").addEventListener("click", () => ariStart(ARI.char.id));
  document.getElementById("ariHome").addEventListener("click", renderAriStart);
}

/* ---------- init ---------- */
function initAri(){ if (typeof JUEGO_ARIS === "undefined") return; renderAriStart(); }
document.addEventListener("DOMContentLoaded", initAri);
(function(){ const nav = document.getElementById("tabs"); if (nav) nav.addEventListener("click", e => {
  const b = e.target.closest("button"); if (b && b.dataset.view === "eudaimonia") renderAriStart();
}); })();
