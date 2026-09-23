"use strict";
/* ===== Juego «Elige A o B» (dilemas) ===== depende de: dilemas.js (DILEMAS, DILEMAS_INTRO), store.js =====
   Cada dilema: situación → eliges A o B → escribes tu razón → «para pensar» (qué está en juego,
   otra salida, preguntas, dato) → giro «¿Y si…?» → mantienes o cambias de opinión.
   Guarda en este navegador lo elegido y la razón. «Modo clase»: contador de votos A/B para
   proyectar en el aula (también se guarda en este navegador). */

const DIL_KEY = "aula-dilemas", DIL_VOTES_KEY = "aula-dilemas-votos", DIL_CLASS_KEY = "aula-dilemas-clase";
const DIL_GROUPS = { tecno: "Tecnoéticos", dia: "Del día" };
const dil = { group: "tecno", cur: null, step: 0 };

function dilBox(){ return document.getElementById("dilbox"); }
function dilEsc(s){ return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
function dilState(){ const s = store.get(DIL_KEY, {}); return s && typeof s === "object" ? s : {}; }
function dilSave(id, patch){ const s = dilState(); s[id] = Object.assign({}, s[id], patch, { ts: Date.now() }); store.set(DIL_KEY, s); }
function dilVotes(){ const v = store.get(DIL_VOTES_KEY, {}); return v && typeof v === "object" ? v : {}; }
function dilClassMode(){ return !!store.get(DIL_CLASS_KEY, false); }
function dilList(g){ return DILEMAS.filter(d => !g || d.grupo === g); }
function dilById(id){ return DILEMAS.find(d => d.id === id); }

/* ---------- portada: grupos y tarjetas ---------- */
function renderDilStart(){
  const box = dilBox(); if (!box) return;
  const st = dilState(), list = dilList(dil.group), intro = DILEMAS_INTRO[dil.group] || {};
  const done = list.filter(d => st[d.id] && st[d.id].choice).length;
  const groups = Object.keys(DIL_GROUPS).filter(g => dilList(g).length);
  box.innerHTML =
    '<div class="dil-pick" role="group" aria-label="Tipo de dilema">' +
      groups.map(g => '<button class="pbtn" data-g="' + g + '" aria-pressed="' + (g === dil.group) + '">' + DIL_GROUPS[g] + ' <span class="n">' + dilList(g).length + '</span></button>').join("") +
      '<label class="dil-classmode"><input type="checkbox" id="dilclass"' + (dilClassMode() ? " checked" : "") + '> Modo clase (contar votos)</label>' +
    '</div>' +
    '<div class="dil-intro"><h2>' + dilEsc(intro.titulo) + '</h2><p>' + dilEsc(intro.texto) + '</p>' +
      '<p class="dil-progress"><b>' + done + '</b> de ' + list.length + ' decididos' + (done ? ' · <button class="linkbtn" id="dilreset">borrar mis respuestas</button>' : '') + '</p>' +
      (done === list.length && intro.cierre ? '<p class="dil-cierre">' + dilEsc(intro.cierre) + '</p>' : '') +
    '</div>' +
    '<button class="dil-play" id="dilrandom"><span aria-hidden="true">🎲</span> <b>Dilema al azar</b> <span>uno que aún no hayas decidido</span></button>' +
    '<div class="dil-grid">' + list.map(d => {
      const s = st[d.id] || {};
      return '<button class="dil-card" data-id="' + d.id + '">' +
        '<span class="dil-emoji" aria-hidden="true">' + d.emoji + '</span>' +
        '<span class="dil-tag">' + dilEsc(d.etiqueta) + '</span>' +
        '<span class="dil-title">' + dilEsc(d.titulo) + '</span>' +
        (s.choice ? '<span class="dil-badge dil-' + s.choice.toLowerCase() + '">Elegiste ' + s.choice + (s.cambio ? ' · cambiaste' : '') + '</span>' : '<span class="dil-badge pend">Sin decidir</span>') +
      '</button>';
    }).join("") + '</div>';
  box.querySelectorAll("[data-g]").forEach(b => b.addEventListener("click", () => { dil.group = b.dataset.g; renderDilStart(); }));
  box.querySelectorAll(".dil-card").forEach(b => b.addEventListener("click", () => openDil(b.dataset.id)));
  box.querySelector("#dilrandom").addEventListener("click", () => {
    const pend = list.filter(d => !(st[d.id] && st[d.id].choice)), pool = pend.length ? pend : list;
    openDil(pool[Math.floor(Math.random() * pool.length)].id);
  });
  box.querySelector("#dilclass").addEventListener("change", e => store.set(DIL_CLASS_KEY, e.target.checked));
  const rs = box.querySelector("#dilreset");
  if (rs) rs.addEventListener("click", () => {
    if (!confirm("¿Borrar tus respuestas de este grupo de dilemas en este navegador?")) return;
    const s = dilState(); list.forEach(d => delete s[d.id]); store.set(DIL_KEY, s); renderDilStart();
  });
}

/* ---------- un dilema ---------- */
function openDil(id){
  const d = dilById(id); if (!d) return;
  dil.cur = id; const s = dilState()[id] || {};
  dil.step = s.choice ? 2 : 0;
  renderDil();
  const v = document.getElementById("dilemas"); if (v) v.scrollIntoView({ block: "start" });
}

function dilVotesHtml(d){
  const v = dilVotes()[d.id] || { A: 0, B: 0 }, tot = (v.A || 0) + (v.B || 0);
  const pct = k => tot ? Math.round((v[k] || 0) * 100 / tot) : 0;
  return '<div class="dil-votes" aria-label="Votos de la clase">' + ["A", "B"].map(k =>
    '<div class="dil-vrow dil-' + k.toLowerCase() + '"><b>' + k + '</b>' +
      '<button class="vbtn" data-v="' + k + '" data-d="-1" aria-label="Quitar un voto a ' + k + '">−</button>' +
      '<span class="vbar"><span style="width:' + pct(k) + '%"></span></span>' +
      '<span class="vnum">' + (v[k] || 0) + (tot ? ' · ' + pct(k) + ' %' : '') + '</span>' +
      '<button class="vbtn" data-v="' + k + '" data-d="1" aria-label="Sumar un voto a ' + k + '">+</button>' +
    '</div>').join("") + '<button class="linkbtn" id="dilvreset">poner a cero</button></div>';
}

function renderDil(){
  const box = dilBox(), d = dilById(dil.cur); if (!box || !d) return;
  const s = dilState()[d.id] || {}, ch = s.choice;
  const opt = k => '<button class="dil-opt dil-' + k.toLowerCase() + (ch === k ? ' sel' : '') + (ch && ch !== k ? ' dim' : '') + '" data-opt="' + k + '"' + (ch ? ' aria-pressed="' + (ch === k) + '"' : '') + '>' +
    '<span class="dil-letter">' + k + '</span><span>' + dilEsc(d[k.toLowerCase()]) + '</span></button>';
  let html =
    '<button class="linkbtn dil-back" id="dilback">← Todos los dilemas</button>' +
    '<article class="dil-one">' +
      '<header class="dil-head"><span class="dil-emoji big" aria-hidden="true">' + d.emoji + '</span><div>' +
        '<span class="dil-tag">' + dilEsc(DIL_GROUPS[d.grupo]) + ' · ' + dilEsc(d.etiqueta) + '</span>' +
        '<h2>' + dilEsc(d.titulo) + '</h2></div></header>' +
      '<div class="dil-sit"><h3>La situación</h3><p>' + dilEsc(d.situacion) + '</p></div>' +
      '<p class="dil-ask">' + (ch ? 'Tu elección:' : '¿Qué harías tú? Elige una opción.') + '</p>' +
      '<div class="dil-opts">' + opt("A") + opt("B") + '</div>' +
      (dilClassMode() ? dilVotesHtml(d) : '');
  if (dil.step >= 1){
    html += '<div class="dil-why"><label for="dilrazon"><b>¿Por qué?</b> Escribe tu razón en una o dos frases (se guarda en este navegador).</label>' +
      '<textarea id="dilrazon" rows="3" placeholder="Elijo ' + ch + ' porque…">' + dilEsc(s.razon || "") + '</textarea>' +
      (dil.step === 1 ? '<button class="dil-next" id="dilthink">Ver «para pensar» →</button>' : '') + '</div>';
  }
  if (dil.step >= 2){
    html += '<div class="dil-think"><h3>Para pensar</h3>' +
      '<p><b>¿Qué está en juego?</b> ' + dilEsc(d.enjuego) + '</p>' +
      (d.otra ? '<p class="dil-otra"><b>¿Hay otra salida?</b> ' + dilEsc(d.otra) + '</p>' : '') +
      '<ol>' + (d.preguntas || []).map(q => '<li>' + dilEsc(q) + '</li>').join("") + '</ol>' +
      (d.dato ? '<p class="dil-dato"><b>Un dato:</b> ' + dilEsc(d.dato) + '</p>' : '') + '</div>';
    if (d.ysi){
      html += '<div class="dil-ysi"><h3>¿Y si…?</h3><p>' + dilEsc(d.ysi.replace(/^¿Y si…\?\s*/, "")) + '</p>' +
        '<div class="dil-keep"><button class="pbtn" data-keep="0" aria-pressed="' + (s.cambio === false) + '">Mantengo mi elección</button>' +
        '<button class="pbtn" data-keep="1" aria-pressed="' + (s.cambio === true) + '">Cambiaría de opinión</button></div></div>';
    }
    const list = dilList(d.grupo), i = list.findIndex(x => x.id === d.id), nx = list[(i + 1) % list.length];
    html += '<div class="dil-foot"><button class="dil-next" id="dilnext">Siguiente: ' + nx.emoji + ' ' + dilEsc(nx.titulo) + ' →</button></div>';
  }
  html += '</article>';
  box.innerHTML = html;

  box.querySelector("#dilback").addEventListener("click", renderDilStart);
  box.querySelectorAll("[data-opt]").forEach(b => b.addEventListener("click", () => {
    const k = b.dataset.opt, prev = (dilState()[d.id] || {}).choice;
    dilSave(d.id, prev && prev !== k ? { choice: k, cambio: true } : { choice: k });
    if (dil.step < 1) dil.step = 1;
    renderDil();
    const ta = document.getElementById("dilrazon"); if (ta && dil.step === 1){ try { ta.focus({ preventScroll: false }); } catch (e){} }
  }));
  const ta = box.querySelector("#dilrazon");
  if (ta) ta.addEventListener("input", () => dilSave(d.id, { razon: ta.value.slice(0, 600) }));
  const th = box.querySelector("#dilthink");
  if (th) th.addEventListener("click", () => { dil.step = 2; renderDil(); const t = document.querySelector(".dil-think"); if (t) t.scrollIntoView({ behavior: "smooth", block: "start" }); });
  box.querySelectorAll("[data-keep]").forEach(b => b.addEventListener("click", () => { dilSave(d.id, { cambio: b.dataset.keep === "1" }); renderDil(); }));
  const nx = box.querySelector("#dilnext");
  if (nx){ const list = dilList(d.grupo), i = list.findIndex(x => x.id === d.id); nx.addEventListener("click", () => openDil(list[(i + 1) % list.length].id)); }
  box.querySelectorAll(".vbtn").forEach(b => b.addEventListener("click", () => {
    const all = dilVotes(), v = all[d.id] || { A: 0, B: 0 };
    v[b.dataset.v] = Math.max(0, (v[b.dataset.v] || 0) + (+b.dataset.d)); all[d.id] = v; store.set(DIL_VOTES_KEY, all);
    renderDil();
  }));
  const vr = box.querySelector("#dilvreset");
  if (vr) vr.addEventListener("click", () => { const all = dilVotes(); delete all[d.id]; store.set(DIL_VOTES_KEY, all); renderDil(); });
}

if (dilBox() && typeof DILEMAS !== "undefined") renderDilStart();
