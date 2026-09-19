"use strict";
/* ===== La República ===== juego de diseño de la ciudad de Platón ===== depende de: store.js =====
   Adaptado del material del IES Gabriel Aresti (BATX 2). Diseñas una ciudad de 30 ciudadanos
   repartidos en 3 clases eligiendo personajes con nombre (cada uno cuesta la suma de sus virtudes),
   dentro de un presupuesto de puntos. Luego 6 turnos de eventos ponen a prueba tu diseño.
   3 virtudes: Sabiduría-Justicia (SJ ⚖️), Valentía (V 🛡️), Templanza (T 🍷).
   Perfiles: Guardián 4/4/4→5/5/5 · Guerrero (SJ≤3) x/4/4→3/5/5 · Productor (SJ,V≤3) x/x/4→3/3/5. */

const REP_POP = 30, REP_TURNS = 6, REP_ARM0 = 8;
const REP_MODES = {
  facil: { name:"Fácil", budget:270, ratio:false, d:"Más puntos y sin la regla de proporción. Para aprender." },
  real:  { name:"Real",  budget:225, ratio:true,  d:"Presupuesto justo y regla de Platón: productores ≥ 2 × (guardianes + guerreros)." }
};

// Elenco con nombre. sj/v/t = stats; coste = sj+v+t. Guardianes y guerreros son individuos (una vez);
// los productores son perfiles con cantidad (la masa anónima).
const REP_ROSTER = {
  Z: [ // Guardianes (filósofos-gobernantes): todas las virtudes ≥4
    { id:"solon", name:"Solón", sj:4, v:4, t:4, note:"el legislador" },
    { id:"pericles", name:"Pericles", sj:4, v:4, t:5, note:"el estadista" },
    { id:"socrates", name:"Sócrates", sj:5, v:4, t:4, note:"el que examina" },
    { id:"hipatia", name:"Hipatia", sj:5, v:4, t:5, note:"la sabia" },
    { id:"platon", name:"Platón", sj:5, v:5, t:5, note:"el filósofo-rey" }
  ],
  G: [ // Guerreros (defensores): valentía y templanza ≥4, poca sabiduría-justicia
    { id:"ayax", name:"Áyax", sj:1, v:5, t:4, note:"la fuerza bruta" },
    { id:"aquiles", name:"Aquiles", sj:1, v:5, t:5, note:"el mejor de los aqueos" },
    { id:"leonidas", name:"Leónidas", sj:2, v:5, t:4, note:"el espartano" },
    { id:"odiseo", name:"Odiseo", sj:3, v:4, t:4, note:"el astuto" },
    { id:"diomedes", name:"Diomedes", sj:3, v:4, t:5, note:"el equilibrado" },
    { id:"hector", name:"Héctor", sj:2, v:5, t:5, note:"el defensor de Troya" }
  ],
  E: [ // Productores (la masa): templanza ≥4, resto bajo
    { id:"labriego", name:"Labriegos", sj:1, v:1, t:4, note:"lo básico" },
    { id:"artesanos", name:"Artesanos", sj:2, v:2, t:4, note:"oficio y orden" },
    { id:"mercaderes", name:"Mercaderes", sj:3, v:3, t:5, note:"prósperos" }
  ]
};
// ACCIONES de turno (modo con acciones): cuestan AP (6 en total, máx. 2/turno; no repetir en el turno).
// Modifican el estado mutable de la ciudad rep.t durante la partida.
const REP_ACTS = [
  { id:"moviliza", name:"Movilización", ap:2, d:"Un productor se forma como guerrero (−1 productor, +1 guerrero).", ok:()=>rep.t.nE>1,
    run:()=>{ rep.t.nE--; rep.t.nG++; rep.t.sumV+=3; rep.t.sumTot+=3; rep.t.tE=Math.max(0,rep.t.tE-4); } },
  { id:"heroismo", name:"Heroísmo", ap:1, d:"Este turno, los guerreros valen ×1,5 en las comprobaciones.", ok:()=>!rep.t.hero,
    run:()=>{ rep.t.hero=true; } },
  { id:"educacion", name:"Reforma educativa", ap:1, d:"Los guardianes ganan sabiduría-justicia (+3).",
    run:()=>{ rep.t.sjZ+=3; rep.t.sumTot+=3; } },
  { id:"grano", name:"Reparto de grano", ap:1, d:"Los productores ganan templanza (+5).",
    run:()=>{ rep.t.tE+=5; rep.t.sumTot+=5; } },
  { id:"purga", name:"Purga de corruptos", ap:2, d:"Recuperas 1 punto de armonía.", ok:()=>rep.armonia<REP_ARM0,
    run:()=>{ rep.armonia=Math.min(REP_ARM0, Math.round((rep.armonia+1)*10)/10); } }
];
function repNGeff(){ return rep.t.hero ? rep.t.nG*1.5 : rep.t.nG; }

const REP_AP0 = 6;   // puntos de acción para los 6 turnos (modo con acciones)
const rep = repFresh();
function repFresh(){ return { mode:"real", acciones:"si", selZ:new Set(), selG:new Set(), cntE:{}, armonia:REP_ARM0, turn:0, deck:[], resolved:false, nZ:0,nG:0,nE:0,sumSJ:0,sumV:0,sumT:0, t:null, ap:0, apTurn:0, used:new Set() }; }
function repBox(){ return document.getElementById("repbox"); }
function cost(c){ return c.sj + c.v + c.t; }
function repShuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }

// ---- cálculo del estado de la ciudad diseñada ----
function repCompute(){
  let nZ=0,nG=0,nE=0,pts=0,sj=0,v=0,t=0, sjZ=0, tE=0;
  REP_ROSTER.Z.forEach(c=>{ if(rep.selZ.has(c.id)){ nZ++; pts+=cost(c); sj+=c.sj; v+=c.v; t+=c.t; sjZ+=c.sj; } });
  REP_ROSTER.G.forEach(c=>{ if(rep.selG.has(c.id)){ nG++; pts+=cost(c); sj+=c.sj; v+=c.v; t+=c.t; } });
  REP_ROSTER.E.forEach(c=>{ const n=rep.cntE[c.id]||0; if(n){ nE+=n; pts+=cost(c)*n; sj+=c.sj*n; v+=c.v*n; t+=c.t*n; tE+=c.t*n; } });
  rep.nZ=nZ; rep.nG=nG; rep.nE=nE; rep.sumSJ=sj; rep.sumV=v; rep.sumT=t; rep._sjZ=sjZ; rep._tE=tE;
  return { nZ,nG,nE, pop:nZ+nG+nE, pts };
}
function repLegal(){
  const s=repCompute(); const m=REP_MODES[rep.mode]; const errs=[];
  if(s.pop!==REP_POP) errs.push("La ciudad debe tener exactamente "+REP_POP+" ciudadanos (ahora "+s.pop+").");
  if(s.pts>m.budget) errs.push("Te pasas del presupuesto ("+s.pts+"/"+m.budget+" puntos).");
  if(s.nZ<1||s.nG<1||s.nE<1) errs.push("Debe haber al menos un ciudadano de cada clase.");
  if(m.ratio && s.nE < 2*(s.nZ+s.nG)) errs.push("Regla de Platón: los productores ("+s.nE+") deben ser ≥ 2×(guardianes+guerreros) = "+2*(s.nZ+s.nG)+".");
  return { ok:errs.length===0, errs, s };
}

/* ---------- setup: diseña tu ciudad ---------- */
function renderRepStart(){
  const box=repBox(); if(!box) return; Object.assign(rep, repFresh());
  box.innerHTML='<div class="rep-wrap">'+
    '<div class="rep-modes-pick" id="repModes"></div>'+
    '<div class="rep-design"><div class="rep-roster" id="repRoster"></div>'+
      '<aside class="rep-summary" id="repSummary"></aside></div>'+
    '</div>';
  drawRepModes(); drawRepRoster(); drawRepSummary();
}
function drawRepModes(){
  document.getElementById("repModes").innerHTML=
    '<span class="flabel">Dificultad</span>'+
    Object.entries(REP_MODES).map(([k,m])=>'<button class="pbtn" data-mode="'+k+'" aria-pressed="'+(k===rep.mode)+'">'+m.name+'</button>').join("")+
    '<span class="flabel" style="margin-left:.8rem">Acciones</span>'+
    '<button class="pbtn" data-acc="si" aria-pressed="'+(rep.acciones==="si")+'">Con acciones</button>'+
    '<button class="pbtn" data-acc="no" aria-pressed="'+(rep.acciones==="no")+'">Sin acciones</button>'+
    '<span class="rep-mode-d">'+REP_MODES[rep.mode].d+(rep.acciones==="no"?" · Sin acciones: pones a prueba tu diseño inicial tal cual.":" · Con acciones: reaccionas a los eventos gastando AP.")+'</span>';
  document.querySelectorAll("#repModes [data-mode]").forEach(b=>b.addEventListener("click",()=>{ rep.mode=b.dataset.mode; drawRepModes(); drawRepSummary(); }));
  document.querySelectorAll("#repModes [data-acc]").forEach(b=>b.addEventListener("click",()=>{ rep.acciones=b.dataset.acc; drawRepModes(); }));
}
function statPips(c){ return '<span class="rep-pips">⚖️'+c.sj+' 🛡️'+c.v+' 🍷'+c.t+' <em>· '+cost(c)+' pts</em></span>'; }
function drawRepRoster(){
  const sec=(title,cls,list,sel)=>'<div class="rep-rsec"><h3>'+title+'</h3>'+list.map(c=>{
    if(cls==="E"){ const n=rep.cntE[c.id]||0; return '<div class="rep-rrow prod"><div class="rep-rname">'+c.name+' <span class="rep-note">'+c.note+'</span><br>'+statPips(c)+'</div>'+
      '<div class="rep-step"><button data-esub="'+c.id+'">−</button><span class="n">'+n+'</span><button data-eadd="'+c.id+'">+</button></div></div>'; }
    const on=sel.has(c.id);
    return '<button class="rep-rrow pick'+(on?" on":"")+'" data-pick="'+cls+':'+c.id+'"><span class="rep-check">'+(on?"✓":"")+'</span><span class="rep-rname">'+c.name+' <span class="rep-note">'+c.note+'</span><br>'+statPips(c)+'</span></button>';
  }).join("")+'</div>';
  document.getElementById("repRoster").innerHTML =
    sec("🦉 Guardianes <span class=\"rep-floor\">todas las virtudes ≥4</span>","Z",REP_ROSTER.Z,rep.selZ)+
    sec("🛡️ Guerreros <span class=\"rep-floor\">valentía y templanza ≥4</span>","G",REP_ROSTER.G,rep.selG)+
    sec("🌾 Productores <span class=\"rep-floor\">templanza ≥4 · la masa</span>","E",REP_ROSTER.E,null);
  document.querySelectorAll("#repRoster [data-pick]").forEach(b=>b.addEventListener("click",()=>{
    const [cls,id]=b.dataset.pick.split(":"); const set=cls==="Z"?rep.selZ:rep.selG; set.has(id)?set.delete(id):set.add(id); drawRepRoster(); drawRepSummary(); }));
  document.querySelectorAll("#repRoster [data-eadd]").forEach(b=>b.addEventListener("click",()=>{ const id=b.dataset.eadd; const s=repCompute(); if(s.pop<REP_POP){ rep.cntE[id]=(rep.cntE[id]||0)+1; drawRepRoster(); drawRepSummary(); } }));
  document.querySelectorAll("#repRoster [data-esub]").forEach(b=>b.addEventListener("click",()=>{ const id=b.dataset.esub; if(rep.cntE[id]>0){ rep.cntE[id]--; drawRepRoster(); drawRepSummary(); } }));
}
function drawRepSummary(){
  const { ok, errs, s }=repLegal(); const m=REP_MODES[rep.mode];
  document.getElementById("repSummary").innerHTML=
    '<div class="rep-sum-h">Tu ciudad</div>'+
    '<div class="rep-sum-row"><span>Población</span><b class="'+(s.pop===REP_POP?"ok":"")+'">'+s.pop+' / '+REP_POP+'</b></div>'+
    '<div class="rep-sum-row"><span>Puntos</span><b class="'+(s.pts<=m.budget?"ok":"bad")+'">'+s.pts+' / '+m.budget+'</b></div>'+
    '<div class="rep-sum-classes"><span>🦉 '+s.nZ+'</span><span>🛡️ '+s.nG+'</span><span>🌾 '+s.nE+'</span></div>'+
    (m.ratio?'<div class="rep-sum-row"><span>Proporción</span><b class="'+(s.nE>=2*(s.nZ+s.nG)?"ok":"bad")+'">prod ≥ 2×élite</b></div>':'')+
    (ok?'<button class="rep-play" id="repPlay">Fundar la república →</button>'
       :'<ul class="rep-errs">'+errs.map(e=>'<li>'+e+'</li>').join("")+'</ul>');
  const p=document.getElementById("repPlay"); if(p) p.addEventListener("click",repStart);
}

// ---- eventos: se comprueban sobre la ciudad diseñada ----
const REP_EVENTS = [
  { id:"corrupcion", name:"Corrupción", img:"ev-corrupcion", threat:"Sin guardianes verdaderamente justos, la corrupción cunde.",
    danger:()=> (rep.t.sjZ/Math.max(1,rep.t.nZ)) < 4.5, bad:()=>"La justicia media de tus guardianes es baja.", ok:"Tus guardianes son sabios y justos." },
  { id:"golpe", name:"Golpe de estado", img:"ev-golpe", threat:"Demasiados guerreros frente a los guardianes (guerreros > guardianes ×4) → golpe.",
    danger:()=> repNGeff() > rep.t.nZ*4, bad:"El ejército desborda al gobierno.", ok:"El ejército respeta a los guardianes." },
  { id:"ataque", name:"Ataque exterior", img:"ev-ataque", threat:"Pocos brazos o poco valor para defender la ciudad.",
    danger:()=> repNGeff() < 5 || rep.t.sumV < 55, bad:()=>"Faltan defensores o falta valentía (total "+rep.t.sumV+").", ok:"Hay defensa suficiente." },
  { id:"hambruna", name:"Hambruna", img:"ev-hambruna", threat:"Pocos productores para alimentar a la ciudad.",
    danger:()=> rep.t.nE < 16, bad:()=>"Solo hay "+rep.t.nE+" productores.", ok:"El abastecimiento está cubierto." },
  { id:"matxinada", name:"Rebelión de los productores", img:"ev-matxinada", threat:"Productores descontentos (poca templanza) se rebelan.",
    danger:()=> (rep.t.tE/Math.max(1,rep.t.nE)) < 4.4, bad:"Tus productores son pobres y descontentos.", ok:"Tus productores viven con templanza." },
  { id:"sabiduria", name:"Deriva moral", img:"ev-sabiduria", threat:"Si a la ciudad le falta virtud en conjunto, pierde el rumbo.",
    danger:()=> rep.t.sumTot < 225, bad:()=>"La virtud total de la ciudad es baja ("+rep.t.sumTot+").", ok:"La ciudad rebosa virtud." }
];
const REP_IMG = "media/juegos/platon/";

/* ---------- turnos ---------- */
function repStart(){
  repCompute(); rep.armonia=REP_ARM0; rep.turn=0; rep.deck=repShuffle(REP_EVENTS.map(e=>e.id));
  rep.ap=(rep.acciones==="si")?REP_AP0:0;
  rep.t={ nZ:rep.nZ, nG:rep.nG, nE:rep.nE, sjZ:rep._sjZ, tE:rep._tE, sumV:rep.sumV, sumTot:rep.sumSJ+rep.sumV+rep.sumT, hero:false };
  repRenderTurn();
}
function repFmt(n){ return Number.isInteger(n)?n:n.toFixed(1).replace(/\.0$/,""); }
function repRenderTurn(){
  rep.resolved=false; rep.apTurn=0; rep.used=new Set(); rep.t.hero=false;
  const ev=REP_EVENTS.find(e=>e.id===rep.deck[rep.turn]);
  repBox().innerHTML='<div class="rep-wrap">'+
    '<div class="rep-hud"><span class="stat">Turno <b>'+(rep.turn+1)+'</b>/'+REP_TURNS+'</span>'+
      '<span class="stat">⚖️ Armonía <b id="repArm">'+repFmt(rep.armonia)+'</b></span>'+
      (rep.acciones==="si"?'<span class="stat">🔧 AP <b id="repAp">'+rep.ap+'</b></span>':'')+'</div>'+
    '<div class="rep-arm'+(rep.armonia<=3?' low':'')+'"><i style="width:'+Math.max(0,rep.armonia/REP_ARM0*100)+'%"></i></div>'+
    '<div class="rep-classes" id="repClasses"></div>'+
    '<div class="rep-event reveal" id="repEvent"></div>'+
    (rep.acciones==="si"?'<div class="rep-actions-h">Acciones (máx. 2 este turno)</div><div class="rep-acts" id="repActs"></div>':'')+
    '<div class="rep-resolve"><button id="repResolve">Afrontar el evento →</button></div>'+
    '</div>';
  repDrawTurn(ev);
  document.getElementById("repResolve").addEventListener("click",()=>repResolve(ev));
}
function repDrawTurn(ev){
  document.getElementById("repClasses").innerHTML=[
    { em:"🦉", l:"Guardianes", c:rep.t.nZ }, { em:"🛡️", l:"Guerreros", c:rep.t.nG+(rep.t.hero?" ×1,5":"") }, { em:"🌾", l:"Productores", c:rep.t.nE }
  ].map(x=>'<div class="rep-class"><div class="c">'+x.em+' '+x.c+'</div><div class="l">'+x.l+'</div></div>').join("");
  const danger=ev.danger(); const evb=document.getElementById("repEvent"); evb.classList.toggle("danger",danger); evb.classList.toggle("safe",!danger);
  evb.innerHTML='<img class="rep-ev-img" src="'+REP_IMG+ev.img+'.jpg" alt="">'+
    '<div class="rep-ev-body"><span class="rep-ev-tag">🃏 Evento del turno</span><h3>'+ev.name+'</h3>'+
    '<div class="threat">'+ev.threat+'</div>'+
    '<div class="rep-status '+(danger?"bad":"ok")+'">'+(danger?"⚠ "+(typeof ev.bad==="function"?ev.bad():ev.bad)+" −1,5 de armonía.":"✓ "+(typeof ev.ok==="function"?ev.ok():ev.ok))+'</div></div>';
  if(rep.acciones==="si"){
    const acts=document.getElementById("repActs");
    acts.innerHTML=REP_ACTS.map(a=>{ const dis=rep.apTurn>=2||rep.used.has(a.id)||rep.ap<a.ap||(a.ok&&!a.ok());
      return '<button class="rep-act" data-act="'+a.id+'"'+(dis?" disabled":"")+'><b>'+a.name+' <span class="ap">'+a.ap+' AP</span></b><span class="d">'+a.d+'</span></button>'; }).join("");
    acts.querySelectorAll("[data-act]").forEach(b=>b.addEventListener("click",()=>repDoAct(b.dataset.act,ev)));
  }
}
function repDoAct(id,ev){
  const a=REP_ACTS.find(x=>x.id===id);
  if(rep.apTurn>=2||rep.used.has(id)||rep.ap<a.ap||(a.ok&&!a.ok())) return;
  a.run(); rep.ap-=a.ap; rep.apTurn++; rep.used.add(id);
  const ael=document.getElementById("repAp"); if(ael) ael.textContent=rep.ap;
  const arm=document.getElementById("repArm"); if(arm) arm.textContent=repFmt(rep.armonia);
  document.querySelector("#republica .rep-arm > i").style.width=Math.max(0,rep.armonia/REP_ARM0*100)+"%";
  repDrawTurn(ev);
}
function repResolve(ev){
  if(rep.resolved) return; rep.resolved=true;
  if(ev.danger()) rep.armonia=Math.round((rep.armonia-1.5)*10)/10;
  rep.turn++;
  if(rep.turn>=REP_TURNS || rep.armonia<=0) repResult(); else repRenderTurn();
}
function repResult(){
  const a=rep.armonia; let emoji,rank;
  if(a<=0){ emoji="💥"; rank="La república colapsa"; }
  else if(a>=6.5){ emoji="🏛️"; rank="República armónica"; }
  else if(a>=3.5){ emoji="⚖️"; rank="República estable"; }
  else { emoji="⚠️"; rank="República frágil, pero en pie"; }
  const key="aula-republica-best"; const best=store.get(key,0); const record=a>best; if(record) store.set(key,a);
  const qs=["¿Qué muestra este juego sobre la necesidad de equilibrio en la sociedad de Platón?",
    "¿Qué riesgos trae el poder excesivo de cada clase social?",
    "¿Es cierto, como decía Platón, que sin gobernantes filósofos no puede salvarse la sociedad?",
    "¿Merece la pena una ciudad justa si para lograrla hay que renunciar a la igualdad entre clases?"];
  repBox().innerHTML='<div class="rep-wrap"><div class="rep-result">'+
    '<div class="rep-badge">'+emoji+'</div><div class="rep-rank">'+rank+'</div>'+
    '<div class="rep-final">'+repFmt(Math.max(0,a))+' <span>/ 8 de armonía</span></div>'+
    '<p class="rep-pop">'+REP_TURNS+' turnos · ciudad '+rep.t.nZ+'/'+rep.t.nG+'/'+rep.t.nE+' · '+(rep.acciones==="si"?"con acciones":"sin acciones")+' · '+(record?"¡tu mejor república! 🎉":"mejor marca: "+repFmt(Math.max(best,a)))+'</p>'+
    '<blockquote class="rep-reflect">Para pensar: '+qs[Math.floor(Math.random()*qs.length)]+'</blockquote>'+
    '<div class="rep-actions2"><button class="btn2 primary" id="repAgain">Diseñar otra ciudad</button></div>'+
    '</div></div>';
  document.getElementById("repAgain").addEventListener("click",renderRepStart);
}

/* ---------- init ---------- */
function initRep(){ renderRepStart(); }
document.addEventListener("DOMContentLoaded", initRep);
(function(){ const nav=document.getElementById("tabs"); if(nav) nav.addEventListener("click", e=>{ const b=e.target.closest("button"); if(b && b.dataset.view==="republica") renderRepStart(); }); })();
