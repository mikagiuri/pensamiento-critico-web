"use strict";
/* ===== La República ===== juego de gestión de Platón ===== depende de: store.js =====
   Adaptado del material de gamificación del IES Gabriel Aresti (BATX 2), traducido.
   Repartes la población en 3 clases; cada turno un evento amenaza la ARMONÍA si la
   república está desequilibrada. Gastas acciones (AP) para corregirla. 6 turnos. */

const REP_TURNS = 6, REP_AP = 10, REP_ARM0 = 8;
// virtudes base por clase (según la tabla del juego)
const REP_BASE = {
  Z: { tem:4, val:4, sab:5, jus:4 },   // Guardianes (filósofos-gobernantes)
  G: { tem:4, val:4, sab:1, jus:1 },   // Guerreros (defensores)
  E: { tem:4, val:1, sab:1, jus:1 }    // Productores
};

const rep = null_state();
function null_state(){ return { nZ:10, nG:10, nE:10, bon:{ Zjus:0, Gsab:0, Gval:0, Etem:0 }, armonia:REP_ARM0, ap:REP_AP, turn:0, deck:[], apTurn:0, used:new Set(), hero:false, resolved:false }; }
function repReset(){ Object.assign(rep, null_state()); }
function repBox(){ return document.getElementById("repbox"); }
function repShuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
function repPop(){ return rep.nZ + rep.nG + rep.nE; }
function repGeff(){ return rep.hero ? rep.nG * 1.5 : rep.nG; }   // Heroísmo: los guerreros valen ×1,5 este turno

// EVENTOS: cada uno define una condición de PELIGRO; si es verdadera → −1,5 ARMONÍA
const REP_EVENTS = [
  { id:"corrupcion", name:"Corrupción", threat:"Si los guardianes no son justos (Justicia = 5), la corrupción cunde.",
    danger:() => (REP_BASE.Z.jus + rep.bon.Zjus) < 5, ok:"Tus guardianes son justos.", bad:"Tus guardianes no alcanzan Justicia = 5." },
  { id:"sabiduria", name:"Sabiduría olvidada", threat:"Si la sabiduría de guardianes y guerreros es escasa (suma < 40), se pierde el rumbo.",
    danger:() => (rep.nZ*REP_BASE.Z.sab + rep.nG*(REP_BASE.G.sab + rep.bon.Gsab)) < 40,
    ok:()=>"Sabiduría (guardianes+guerreros) = " + (rep.nZ*REP_BASE.Z.sab + rep.nG*(REP_BASE.G.sab+rep.bon.Gsab)) + " ≥ 40.",
    bad:()=>"Sabiduría = " + (rep.nZ*REP_BASE.Z.sab + rep.nG*(REP_BASE.G.sab+rep.bon.Gsab)) + " < 40." },
  { id:"matxinada", name:"Rebelión de los productores", threat:"Demasiados productores frente a los guerreros (productores > guerreros ×1,8) → revuelta.",
    danger:() => rep.nE > rep.nG*1.8, ok:"El equilibrio productores/guerreros aguanta.", bad:"Hay demasiados productores para tan pocos guerreros." },
  { id:"golpe", name:"Golpe de estado", threat:"Demasiados guerreros frente a los guardianes (guerreros > guardianes ×3) → golpe.",
    danger:() => repGeff() > rep.nZ*3, ok:"Los guerreros están bajo el gobierno de los guardianes.", bad:"El ejército supera con mucho a los guardianes." },
  { id:"ataque", name:"Ataque exterior", threat:"Pocos guerreros para defender (guerreros < población / 3,5) → invasión.",
    danger:() => repGeff() < repPop()/3.5, ok:"Hay defensores suficientes.", bad:"No hay guerreros suficientes para defender la ciudad." },
  { id:"hambruna", name:"Hambruna", threat:"Una clase productora desbordada (productores > (guardianes+guerreros) ×2) desorganiza el abastecimiento.",
    danger:() => rep.nE > (rep.nZ+rep.nG)*2, ok:"El abastecimiento está organizado.", bad:"La clase productora está desbordada." }
];

// ACCIONES: coste en AP; máx. 2 por turno; no repetir la misma acción en el turno
const REP_ACTS = [
  { id:"politica", name:"Prácticas políticas", ap:1, d:"Los guardianes elevan su Justicia a 5.", run:()=>{ rep.bon.Zjus = Math.max(rep.bon.Zjus, 1); } },
  { id:"ejemplo", name:"Ejemplaridad de los guardianes", ap:1, d:"Los guerreros ganan +1 de Sabiduría.", run:()=>{ rep.bon.Gsab += 1; } },
  { id:"agoge", name:"Agogé", ap:1, d:"Los guerreros elevan su Valor a 5.", run:()=>{ rep.bon.Gval = Math.max(rep.bon.Gval, 1); } },
  { id:"vida", name:"Vida sencilla", ap:1, d:"Los productores elevan su Templanza a 5.", run:()=>{ rep.bon.Etem = Math.max(rep.bon.Etem, 1); } },
  { id:"deporte", name:"Juegos deportivos", ap:2, d:"Un productor se forma como guerrero (1 productor → 1 guerrero).", run:()=>{ if(rep.nE>0){ rep.nE--; rep.nG++; } } },
  { id:"heroismo", name:"Heroísmo", ap:1, d:"Este turno, los guerreros valen ×1,5 en las comprobaciones.", run:()=>{ rep.hero = true; } }
];

/* ---------- setup ---------- */
function renderRepStart(){
  const box = repBox(); if(!box) return; repReset();
  box.innerHTML = '<div class="rep-wrap">' +
    '<div class="rep-col-h">Reparte la población en las tres clases</div>' +
    '<div class="rep-setup" id="repSetup"></div>' +
    '<p class="rep-pop" id="repPopLine"></p>' +
    '<button class="rep-play" id="repPlay">Fundar la república →</button>' +
    '</div>';
  drawRepSetup();
  document.getElementById("repPlay").addEventListener("click", repStart);
}
const REP_CLASSDEF = [
  { k:"nZ", em:"🦉", name:"Guardianes", d:"Filósofos-gobernantes. Sabiduría y justicia." },
  { k:"nG", em:"🛡️", name:"Guerreros", d:"Defensores de la ciudad. Valor." },
  { k:"nE", em:"🌾", name:"Productores", d:"Agricultores, artesanos, comerciantes. Templanza." }
];
function drawRepSetup(){
  const s = document.getElementById("repSetup");
  s.innerHTML = REP_CLASSDEF.map(c =>
    '<div class="rep-classrow"><div><div class="rep-cl-name"><span class="em">' + c.em + '</span>' + c.name + '</div><div class="rep-cl-desc">' + c.d + '</div></div>' +
    '<div class="rep-step"><button data-dec="' + c.k + '">−</button><span class="n">' + rep[c.k] + '</span><button data-inc="' + c.k + '">+</button></div></div>').join("");
  s.querySelectorAll("[data-inc]").forEach(b => b.addEventListener("click", () => { const k=b.dataset.inc; if(rep[k]<25) rep[k]++; drawRepSetup(); }));
  s.querySelectorAll("[data-dec]").forEach(b => b.addEventListener("click", () => { const k=b.dataset.dec; if(rep[k]>1) rep[k]--; drawRepSetup(); }));
  const warn = repDangers();
  document.getElementById("repPopLine").innerHTML = 'Población: <b>' + repPop() + '</b>' +
    (warn.length ? ' · <span class="rep-warn">riesgo ahora: ' + warn.join(", ") + '</span>' : ' · <span style="color:var(--ok)">de momento, equilibrada</span>');
}
function repDangers(){ return REP_EVENTS.filter(e => e.danger()).map(e => e.name); }

/* ---------- partida ---------- */
function repStart(){ rep.armonia = REP_ARM0; rep.ap = REP_AP; rep.turn = 0; rep.deck = repShuffle(REP_EVENTS.map(e=>e.id)); repRenderTurn(); }

function repFmt(n){ return Number.isInteger(n) ? n : n.toFixed(1).replace(/\.0$/,""); }
function repRenderTurn(){
  rep.apTurn = 0; rep.used = new Set(); rep.hero = false; rep.resolved = false;
  const ev = REP_EVENTS.find(e => e.id === rep.deck[rep.turn]);
  repBox().innerHTML = '<div class="rep-wrap">' +
    '<div class="rep-hud"><span class="stat">Turno <b>' + (rep.turn+1) + '</b>/' + REP_TURNS + '</span>' +
      '<span class="stat">⚖️ Armonía <b id="repArm">' + repFmt(rep.armonia) + '</b></span>' +
      '<span class="stat">🔧 AP <b id="repAp">' + rep.ap + '</b></span></div>' +
    '<div class="rep-arm' + (rep.armonia<=3?' low':'') + '"><i style="width:' + Math.max(0,rep.armonia/REP_ARM0*100) + '%"></i></div>' +
    '<div class="rep-classes" id="repClasses"></div>' +
    '<div class="rep-event" id="repEvent"></div>' +
    '<div class="rep-actions-h">Acciones (máx. 2 este turno · no repetir)</div>' +
    '<div class="rep-acts" id="repActs"></div>' +
    '<div class="rep-resolve"><button id="repResolve">Resolver turno →</button></div>' +
    '</div>';
  repDrawState(ev);
  document.getElementById("repResolve").addEventListener("click", () => repResolve(ev));
}
function repDrawState(ev){
  document.getElementById("repClasses").innerHTML = [
    { em:"🦉", l:"Guardianes", c:rep.nZ, v:"Justicia " + (REP_BASE.Z.jus+rep.bon.Zjus) + " · Sabiduría " + REP_BASE.Z.sab },
    { em:"🛡️", l:"Guerreros", c:rep.nG + (rep.hero?" ×1,5":""), v:"Valor " + (REP_BASE.G.val+rep.bon.Gval) + " · Sabiduría " + (REP_BASE.G.sab+rep.bon.Gsab) },
    { em:"🌾", l:"Productores", c:rep.nE, v:"Templanza " + (REP_BASE.E.tem+rep.bon.Etem) }
  ].map(x => '<div class="rep-class"><div class="c">' + x.em + ' ' + x.c + '</div><div class="l">' + x.l + '</div><div class="v">' + x.v + '</div></div>').join("");
  const danger = ev.danger();
  document.getElementById("repEvent").innerHTML = '<h3>🃏 ' + ev.name + '</h3><div class="threat">' + ev.threat + '</div>' +
    '<div class="rep-status ' + (danger?"bad":"ok") + '">' + (danger ? "⚠ Peligro: " + (typeof ev.bad==="function"?ev.bad():ev.bad) + " Si no lo corriges, −1,5 de armonía." : "✓ " + (typeof ev.ok==="function"?ev.ok():ev.ok)) + '</div>';
  const acts = document.getElementById("repActs");
  acts.innerHTML = REP_ACTS.map(a => { const dis = rep.apTurn>=2 || rep.used.has(a.id) || rep.ap<a.ap;
    return '<button class="rep-act" data-act="' + a.id + '"' + (dis?" disabled":"") + '><b>' + a.name + ' <span class="ap">' + a.ap + ' AP</span></b><span class="d">' + a.d + '</span></button>'; }).join("");
  acts.querySelectorAll("[data-act]").forEach(b => b.addEventListener("click", () => repDoAct(b.dataset.act, ev)));
}
function repDoAct(id, ev){
  const a = REP_ACTS.find(x => x.id===id);
  if(rep.apTurn>=2 || rep.used.has(id) || rep.ap<a.ap) return;
  a.run(); rep.ap -= a.ap; rep.apTurn++; rep.used.add(id);
  document.getElementById("repAp").textContent = rep.ap;
  repDrawState(ev);
}
function repResolve(ev){
  if(rep.resolved) return; rep.resolved = true;
  if(ev.danger()) rep.armonia = Math.round((rep.armonia - 1.5)*10)/10;
  rep.turn++;
  if(rep.turn >= REP_TURNS || rep.armonia <= 0) repResult();
  else repRenderTurn();
}

/* ---------- resultado ---------- */
function repResult(){
  const a = rep.armonia; let emoji, rank;
  if(a <= 0){ emoji="💥"; rank="La república colapsa"; }
  else if(a >= 6.5){ emoji="🏛️"; rank="República armónica"; }
  else if(a >= 3.5){ emoji="⚖️"; rank="República estable"; }
  else { emoji="⚠️"; rank="República frágil, pero en pie"; }
  const key="aula-republica-best"; const best=store.get(key,0); const record = a>best; if(record) store.set(key, a);
  const qs = [
    "¿Qué muestra este juego sobre la necesidad de equilibrio en la sociedad de Platón?",
    "¿Qué riesgos trae el poder excesivo de cada clase social?",
    "¿Dónde ves el paralelismo con la vida cotidiana?",
    "¿Es cierto, como decía Platón, que sin gobernantes filósofos no puede salvarse la sociedad?"
  ];
  repBox().innerHTML = '<div class="rep-wrap"><div class="rep-result">' +
    '<div class="rep-badge">' + emoji + '</div><div class="rep-rank">' + rank + '</div>' +
    '<div class="rep-final">' + repFmt(Math.max(0,a)) + ' <span>/ 8 de armonía</span></div>' +
    '<p class="rep-pop">' + REP_TURNS + ' turnos superados · población ' + repPop() +
      ' · ' + (record ? '¡tu mejor república! 🎉' : 'mejor marca: ' + repFmt(Math.max(best,a))) + '</p>' +
    '<blockquote class="rep-reflect">Para pensar: ' + qs[Math.floor(Math.random()*qs.length)] + '</blockquote>' +
    '<div class="rep-actions2"><button class="btn2 primary" id="repAgain">Otra república</button></div>' +
    '</div></div>';
  document.getElementById("repAgain").addEventListener("click", renderRepStart);
}

/* ---------- init ---------- */
function initRep(){ renderRepStart(); }
document.addEventListener("DOMContentLoaded", initRep);
(function(){ const nav=document.getElementById("tabs"); if(nav) nav.addEventListener("click", e => { const b=e.target.closest("button"); if(b && b.dataset.view==="republica") renderRepStart(); }); })();
