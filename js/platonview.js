"use strict";
/* ===== La República ===== juego de diseño de la ciudad de Platón (v3) =====
   Diseñas una ciudad con perfiles (+/−) y 4 virtudes: Sabiduría-Justicia (SJ ⚖️),
   Valentía (V 🛡️), Templanza (T 🍷) y Producción (P 🌾). Coste = suma de las 4.
   Luego, 6 turnos de eventos (fundados en Platón/Aristóteles) con penalizaciones
   graduadas, eventos positivos, eventos que MATAN ciudadanos, y penalización
   creciente a las ciudades de menos de 30 habitantes.
   Perfiles: Guardián SJ/V/T ≥4 · Guerrero V/T ≥4 · Productor T/P ≥4. */

const REP_ARM0 = 10, REP_TURNS = 6, REP_DECK_N = 7, REP_TARGET = 30;
const REP_AP0 = 6;
const REP_MODES = {
  facil: { name:"Fácil", budget:415, ratio:false },
  real:  { name:"Real",  budget:345, ratio:true }
};
const REP_ROSTER = {
  Z: [ { id:"z_recto", name:"Guardianes rectos", sj:4,v:4,t:4,p:4, note:"los cuatro al mínimo" },
       { id:"z_sabio", name:"Guardianes sabios", sj:5,v:4,t:4,p:4, note:"más sabiduría-justicia" },
       { id:"z_pleno", name:"Guardianes plenos", sj:5,v:5,t:5,p:5, note:"virtud máxima" } ],
  G: [ { id:"g_tropa", name:"Guerreros", sj:1,v:4,t:4,p:1, note:"lo básico" },
       { id:"g_vet", name:"Veteranos", sj:2,v:5,t:4,p:2, note:"curtidos" },
       { id:"g_heroe", name:"Héroes", sj:3,v:5,t:5,p:3, note:"los mejores" } ],
  E: [ { id:"labriego", name:"Productores", sj:1,v:1,t:4,p:4, note:"labriegos, artesanos y mercaderes" } ]
};
const REP_IMG = "media/juegos/platon/";
const REP_ACTS = [
  { id:"moviliza", name:"Movilización", ap:2, d:"Un productor se forma como guerrero.", ok:()=>rep.t.E.n>1,
    run:()=>{ repMove("E","G",1); } },
  { id:"heroismo", name:"Heroísmo", ap:1, d:"Este turno, los guerreros valen ×1,5.", ok:()=>!rep.t.hero, run:()=>{ rep.t.hero=true; } },
  { id:"educacion", name:"Reforma educativa", ap:1, d:"Los guardianes ganan sabiduría-justicia (+3).", run:()=>{ rep.t.Z.sj+=3; if(rep.t.Z.max<5)rep.t.Z.max=5; rep.t.Z.just=rep.t.Z.n; } },
  { id:"cosecha", name:"Impulso a la producción", ap:1, d:"Los productores rinden más (+6 producción).", run:()=>{ rep.t.E.p+=6; } },
  { id:"purga", name:"Purga de corruptos", ap:2, d:"Recuperas 1 punto de armonía.", ok:()=>rep.armonia<REP_ARM0, run:()=>{ rep.armonia=Math.min(REP_ARM0, rep.armonia+1); } }
];

const rep = repFresh();
function repFresh(){ return { mode:"real", acciones:"si", cnt:{}, armonia:REP_ARM0, turn:0, deck:[], resolved:false, nZ:0,nG:0,nE:0, t:null, ap:0, apTurn:0, used:new Set() }; }
function repBox(){ return document.getElementById("repbox"); }
function cost(c){ return c.sj+c.v+c.t+c.p; }
function repShuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }

// ---- estado de la ciudad diseñada ----
function repCompute(){
  const cls={}; let pts=0;
  ["Z","G","E"].forEach(k=>{ let n=0,sj=0,v=0,t=0,p=0,max=0,just=0;
    REP_ROSTER[k].forEach(c=>{ const q=rep.cnt[c.id]||0; if(q){ n+=q; pts+=cost(c)*q; sj+=c.sj*q; v+=c.v*q; t+=c.t*q; p+=c.p*q; max=Math.max(max,c.sj); if(c.sj>=5)just+=q; } });
    cls[k]={n,sj,v,t,p,max,just}; });
  rep.nZ=cls.Z.n; rep.nG=cls.G.n; rep.nE=cls.E.n; rep._cls=cls;
  return { nZ:cls.Z.n, nG:cls.G.n, nE:cls.E.n, pop:cls.Z.n+cls.G.n+cls.E.n, pts };
}
function repLegal(){
  const s=repCompute(); const m=REP_MODES[rep.mode]; const errs=[];
  if(s.nZ<1||s.nG<1||s.nE<1) errs.push("Debe haber al menos un guardián, un guerrero y un productor.");
  if(s.pts>m.budget) errs.push("Te pasas del presupuesto ("+s.pts+"/"+m.budget+" puntos).");
  if(m.ratio && s.nE < 2*(s.nZ+s.nG)) errs.push("Regla de Platón: los productores ("+s.nE+") deben ser ≥ 2×(guardianes+guerreros) = "+2*(s.nZ+s.nG)+".");
  return { ok:errs.length===0, errs, s };
}

// ---- durante la partida: totales derivados y muertes ----
function T(){ return rep.t; }
function repPop(){ return rep.t.Z.n+rep.t.G.n+rep.t.E.n; }
function repNGeff(){ return rep.t.hero ? rep.t.G.n*1.5 : rep.t.G.n; }
function repSum(stat){ return rep.t.Z[stat]+rep.t.G[stat]+rep.t.E[stat]; }
function repKill(cls,n){ const c=rep.t[cls]; if(c.n<=0)return 0; const k=Math.min(n,c.n); const f=(c.n-k)/c.n;
  c.sj*=f; c.v*=f; c.t*=f; c.p*=f; c.just=Math.round(c.just*f); c.n-=k; return k; }
function repMove(a,b,n){ const A=rep.t[a],B=rep.t[b]; if(A.n<n)return; const proto=REP_ROSTER[b][0];
  const fa=(A.n-n)/A.n; A.sj*=fa;A.v*=fa;A.t*=fa;A.p*=fa; A.n-=n;
  B.n+=n; B.sj+=proto.sj*n; B.v+=proto.v*n; B.t+=proto.t*n; B.p+=proto.p*n; }

/* ================= EVENTOS (v3) — d: cambio de armonía (± ); kill:{cls,n}; ================= */
const F=Math.floor;
const REP_EVENTS = [
  // — negativos graduados (Platón, República) —
  { id:"rebelion", name:"Rebelión de los productores", src:"Rep. IV", img:"ev-matxinada",
    threat:"Demasiados productores frente a los guerreros: X = (productores − guerreros) ÷ 6.",
    effect:()=>{ const x=F(Math.max(0,rep.t.E.n-rep.t.G.n)/6); return { d:-x, msg:x?("Revuelta: −"+x):"La masa está contenida." }; } },
  { id:"golpe", name:"Golpe de estado", src:"Rep. VIII", img:"ev-golpe",
    threat:"Un ejército muy superior al gobierno da un golpe (mata a un guardián).",
    effect:()=>{ if(repNGeff()>rep.t.Z.n*3){ const k=repKill("Z",1); return { d:-2, msg:"¡Golpe! −2 y muere "+k+" guardián." }; }
      if(rep.t.G.n>rep.t.Z.n*2) return { d:-1, msg:"Tensión militar: −1." }; return { d:0, msg:"El ejército respeta al gobierno." }; } },
  { id:"corrupcion", name:"Corrupción", src:"Rep. I", img:"ev-corrupcion",
    threat:"Pierdes 1 punto por cada guardián que no sea plenamente justo (SJ<5).",
    effect:()=>{ const x=rep.t.Z.n-rep.t.Z.just; return { d:-x, msg:x?("−"+x+" por guardianes poco justos"):"Todos tus guardianes son justos." }; } },
  { id:"caverna", name:"Sombras en la caverna", src:"Rep. VII", img:"ev-sabiduria",
    threat:"Si la sabiduría-justicia media de la polis es baja (<3), sigue entre sombras.",
    effect:()=>{ const avg=repSum("sj")/Math.max(1,repPop()); return avg<3 ? { d:-2, msg:"Ignorancia: −2." } : { d:0, msg:"La ciudad busca la luz." }; } },
  // — Aristóteles / muertes / tamaño —
  { id:"ataque", name:"Ataque exterior", src:"Pol. VII", img:"ev-ataque",
    threat:"Si hay pocos defensores (guerreros < productores ÷ 3), el enemigo entra y mata.",
    effect:()=>{ if(repNGeff() < rep.t.E.n/3){ const k=repKill("G",F(rep.t.G.n/4))+repKill("E",F(rep.t.E.n/12)); return { d:-2, msg:"Invasión: −2"+(k?" y mueren "+k+" ciudadanos.":".") }; } return { d:0, msg:"La defensa aguanta." }; } },
  { id:"peste", name:"La peste", src:"—", img:"ev-hambruna",
    threat:"Una epidemia se ceba en la masa: mata a parte de los productores y guerreros.",
    effect:()=>{ const k=repKill("E",F(rep.t.E.n/6))+repKill("G",F(rep.t.G.n/10)); return { d:-1, msg:"Peste: −1 y mueren "+k+" ciudadanos." }; } },
  { id:"hambruna", name:"Hambruna", src:"Pol. I", img:"ev-hambruna",
    threat:"Si la producción no alimenta a la población, hay hambre y muertes.",
    effect:()=>{ const surplus=repSum("p")-repPop(); if(surplus<0){ const x=F(-surplus/4), k=repKill("E",F(-surplus/6)); return { d:-x, msg:"Hambre: −"+x+(k?" y mueren "+k+" productores.":".") }; } return { d:0, msg:"La producción alimenta a la ciudad." }; } },
  { id:"menguada", name:"Ciudad menguada", src:"Pol. I", img:"ev-ataque",
    threat:"Una polis pequeña no se basta a sí misma: cuanto menos de 30 habitantes, peor.",
    effect:()=>{ const x=F(Math.max(0,REP_TARGET-repPop())/4); return { d:-x, msg:x?("Debilidad ("+repPop()+" hab.): −"+x):"Ciudad autosuficiente." }; } },
  // — positivos —
  { id:"alianza", name:"Alianza comercial", src:"Rep.", img:"ev-corrupcion",
    threat:"Si los productores son la mayoría (≥60%), florece el comercio.",
    effect:()=>{ return rep.t.E.n >= 0.6*repPop() ? { d:2, msg:"Comercio próspero: +2." } : { d:0, msg:"Sin mayoría productora." }; } },
  { id:"victoria", name:"Victoria militar", src:"—", img:"ev-golpe",
    threat:"Un ejército fuerte (guerreros ≥ guardianes ×3) gana una guerra.",
    effect:()=>{ return repNGeff() >= rep.t.Z.n*3 ? { d:1, msg:"Victoria: +1." } : { d:0, msg:"Sin fuerza para vencer." }; } },
  { id:"reforma", name:"Reforma justa", src:"Rep.", img:"ev-sabiduria",
    threat:"Si tus guardianes son plenamente justos (SJ medio ≥5), recuperas armonía.",
    effect:()=>{ return (rep.t.Z.sj/Math.max(1,rep.t.Z.n))>=5 ? { d:2, msg:"Buen gobierno: +2." } : { d:0, msg:"Falta justicia plena arriba." }; } },
  { id:"cosecha", name:"Cosecha abundante", src:"—", img:"ev-hambruna",
    threat:"Si sobra producción (excedente ≥ 40% de la población), hay bonanza.",
    effect:()=>{ return (repSum("p")-repPop()) >= repPop()*0.4 ? { d:2, msg:"Excedente: +2." } : { d:0, msg:"Sin excedente notable." }; } }
];

/* ---------- setup ---------- */
function renderRepStart(){
  const box=repBox(); if(!box) return; Object.assign(rep, repFresh());
  box.innerHTML='<div class="rep-wrap"><div class="rep-modes-pick" id="repModes"></div>'+
    '<div class="rep-design"><div class="rep-roster" id="repRoster"></div><aside class="rep-summary" id="repSummary"></aside></div></div>';
  drawRepModes(); drawRepRoster(); drawRepSummary();
}
function drawRepModes(){
  document.getElementById("repModes").innerHTML=
    '<span class="flabel">Dificultad</span>'+Object.entries(REP_MODES).map(([k,m])=>'<button class="pbtn" data-mode="'+k+'" aria-pressed="'+(k===rep.mode)+'">'+m.name+'</button>').join("")+
    '<span class="flabel" style="margin-left:.8rem">Acciones</span><button class="pbtn" data-acc="si" aria-pressed="'+(rep.acciones==="si")+'">Con acciones</button><button class="pbtn" data-acc="no" aria-pressed="'+(rep.acciones==="no")+'">Sin acciones</button>'+
    '<button class="pbtn rep-rnd" id="repRandom">🎲 Aleatoria</button>';
  document.querySelectorAll("#repModes [data-mode]").forEach(b=>b.addEventListener("click",()=>{ rep.mode=b.dataset.mode; drawRepModes(); drawRepSummary(); }));
  document.querySelectorAll("#repModes [data-acc]").forEach(b=>b.addEventListener("click",()=>{ rep.acciones=b.dataset.acc; drawRepModes(); }));
  const rnd=document.getElementById("repRandom"); if(rnd) rnd.addEventListener("click",repRandom);
}
function statPips(c){ return '<span class="rep-pips">⚖️'+c.sj+' 🛡️'+c.v+' 🍷'+c.t+' 🌾'+c.p+' <em>· '+cost(c)+'</em></span>'; }
function drawRepRoster(){
  const sec=(title,list)=>'<div class="rep-rsec"><h3>'+title+'</h3>'+list.map(c=>{ const n=rep.cnt[c.id]||0;
    return '<div class="rep-rrow prod"><div class="rep-rname">'+c.name+' <span class="rep-note">'+c.note+'</span><br>'+statPips(c)+'</div>'+
      '<div class="rep-step"><button data-esub="'+c.id+'">−</button><span class="n">'+n+'</span><button data-eadd="'+c.id+'">+</button></div></div>'; }).join("")+'</div>';
  document.getElementById("repRoster").innerHTML =
    sec("🦉 Guardianes <span class=\"rep-floor\">los cuatro stats ≥4</span>",REP_ROSTER.Z)+
    sec("🛡️ Guerreros <span class=\"rep-floor\">valentía y templanza ≥4</span>",REP_ROSTER.G)+
    sec("🌾 Productores <span class=\"rep-floor\">templanza y producción ≥4</span>",REP_ROSTER.E);
  document.querySelectorAll("#repRoster [data-eadd]").forEach(b=>b.addEventListener("click",()=>{ const id=b.dataset.eadd; rep.cnt[id]=(rep.cnt[id]||0)+1; drawRepRoster(); drawRepSummary(); }));
  document.querySelectorAll("#repRoster [data-esub]").forEach(b=>b.addEventListener("click",()=>{ const id=b.dataset.esub; if(rep.cnt[id]>0){ rep.cnt[id]--; drawRepRoster(); drawRepSummary(); } }));
}
function drawRepSummary(){
  const { ok, errs, s }=repLegal(); const m=REP_MODES[rep.mode];
  document.getElementById("repSummary").innerHTML=
    '<div class="rep-sum-h">Tu ciudad</div>'+
    '<div class="rep-sum-row"><span>Población</span><b class="'+(s.pop>=REP_TARGET?"ok":"")+'">'+s.pop+(s.pop<REP_TARGET?' <small>(&lt;30: penaliza)</small>':'')+'</b></div>'+
    '<div class="rep-sum-row"><span>Puntos</span><b class="'+(s.pts<=m.budget?"ok":"bad")+'">'+s.pts+' / '+m.budget+'</b></div>'+
    '<div class="rep-sum-classes"><span>🦉 '+s.nZ+'</span><span>🛡️ '+s.nG+'</span><span>🌾 '+s.nE+'</span></div>'+
    (m.ratio?'<div class="rep-sum-row"><span>Proporción</span><b class="'+(s.nE>=2*(s.nZ+s.nG)?"ok":"bad")+'">prod ≥ 2×élite</b></div>':'')+
    (ok?'<button class="rep-play" id="repPlay">Fundar la república →</button>':'<ul class="rep-errs">'+errs.map(e=>'<li>'+e+'</li>').join("")+'</ul>');
  const p=document.getElementById("repPlay"); if(p) p.addEventListener("click",repStart);
}
function repRandom(){
  const m=REP_MODES[rep.mode], pick=arr=>arr[Math.floor(Math.random()*arr.length)];
  for(let a=0;a<200;a++){ rep.cnt={};
    [REP_ROSTER.Z,REP_ROSTER.G,REP_ROSTER.E].forEach(arr=>{ rep.cnt[pick(arr).id]=1; });
    for(let g=0;g<300;g++){ const s=repCompute(); if(s.pts>=m.budget-6) break;
      const r=Math.random(), cls=r<0.7?REP_ROSTER.E:(r<0.86?REP_ROSTER.G:REP_ROSTER.Z); const c=pick(cls);
      if(s.pts+cost(c)>m.budget) continue; rep.cnt[c.id]=(rep.cnt[c.id]||0)+1; }
    if(repLegal().ok){ drawRepRoster(); drawRepSummary(); return; } }
  rep.cnt={}; rep.cnt[REP_ROSTER.Z[0].id]=1; rep.cnt[REP_ROSTER.G[0].id]=1; rep.cnt[REP_ROSTER.E[0].id]=6;
  drawRepRoster(); drawRepSummary();
}

/* ---------- turnos ---------- */
function repStart(){
  repCompute(); const c=rep._cls; rep.armonia=REP_ARM0; rep.turn=0; rep.ap=(rep.acciones==="si")?REP_AP0:0;
  const n=(rep.mode==="real")?7:6;   // Real es más exigente (más eventos)
  const rest=repShuffle(REP_EVENTS.filter(e=>e.id!=="menguada").map(e=>e.id)).slice(0,n-1);
  rep.deck=repShuffle(rest.concat("menguada"));   // «Ciudad menguada» siempre presente (castiga el tamaño pequeño)
  rep.t={ Z:Object.assign({},c.Z), G:Object.assign({},c.G), E:Object.assign({},c.E), hero:false };
  repRenderTurn();
}
function repFmt(n){ n=Math.round(n*10)/10; return Number.isInteger(n)?n:n.toFixed(1); }
function repRenderTurn(){
  rep.resolved=false; rep.apTurn=0; rep.used=new Set(); rep.t.hero=false;
  const ev=REP_EVENTS.find(e=>e.id===rep.deck[rep.turn]);
  repBox().innerHTML='<div class="rep-wrap">'+
    '<div class="rep-hud"><span class="stat">Turno <b>'+(rep.turn+1)+'</b>/'+REP_TURNS+'</span>'+
      '<span class="stat">⚖️ Armonía <b id="repArm">'+repFmt(rep.armonia)+'</b>/'+REP_ARM0+'</span>'+
      (rep.acciones==="si"?'<span class="stat">🔧 AP <b id="repAp">'+rep.ap+'</b></span>':'')+'</div>'+
    '<div class="rep-arm'+(rep.armonia<=4?' low':'')+'"><i style="width:'+Math.max(0,rep.armonia/REP_ARM0*100)+'%"></i></div>'+
    '<div class="rep-classes" id="repClasses"></div>'+
    '<div class="rep-event reveal" id="repEvent"></div>'+
    (rep.acciones==="si"?'<div class="rep-actions-h">Acciones (máx. 2 este turno)</div><div class="rep-acts" id="repActs"></div>':'')+
    '<div class="rep-resolve"><button id="repResolve">Afrontar el evento →</button></div></div>';
  repDrawTurn(ev);
  document.getElementById("repResolve").addEventListener("click",()=>repResolve(ev));
}
function repDrawTurn(ev){
  document.getElementById("repClasses").innerHTML=[
    { em:"🦉", l:"Guardianes", c:rep.t.Z.n }, { em:"🛡️", l:"Guerreros", c:rep.t.G.n+(rep.t.hero?" ×1,5":"") }, { em:"🌾", l:"Productores", c:rep.t.E.n }
  ].map(x=>'<div class="rep-class"><div class="c">'+x.em+' '+x.c+'</div><div class="l">'+x.l+'</div></div>').join("");
  // previsualizar el efecto sin aplicarlo (clonando rep.t)
  const snap=JSON.parse(JSON.stringify(rep.t)); const pre=ev.effect(); rep.t=snap;
  const good=pre.d>0, bad=pre.d<0; const evb=document.getElementById("repEvent");
  evb.classList.toggle("danger",bad); evb.classList.toggle("safe",!bad);
  evb.innerHTML='<img class="rep-ev-img" src="'+REP_IMG+ev.img+'.jpg" alt="">'+
    '<div class="rep-ev-body"><span class="rep-ev-tag">🃏 Evento del turno'+(ev.src&&ev.src!=="—"?' · '+ev.src:'')+'</span><h3>'+ev.name+'</h3>'+
    '<div class="threat">'+ev.threat+'</div>'+
    '<div class="rep-status '+(bad?"bad":good?"good":"ok")+'">'+(bad?"⚠ ":good?"✓ ":"• ")+pre.msg+'</div></div>';
  if(rep.acciones==="si"){ const acts=document.getElementById("repActs");
    acts.innerHTML=REP_ACTS.map(a=>{ const dis=rep.apTurn>=2||rep.used.has(a.id)||rep.ap<a.ap||(a.ok&&!a.ok());
      return '<button class="rep-act" data-act="'+a.id+'"'+(dis?" disabled":"")+'><b>'+a.name+' <span class="ap">'+a.ap+' AP</span></b><span class="d">'+a.d+'</span></button>'; }).join("");
    acts.querySelectorAll("[data-act]").forEach(b=>b.addEventListener("click",()=>repDoAct(b.dataset.act,ev))); }
}
function repDoAct(id,ev){ const a=REP_ACTS.find(x=>x.id===id);
  if(rep.apTurn>=2||rep.used.has(id)||rep.ap<a.ap||(a.ok&&!a.ok())) return;
  a.run(); rep.ap-=a.ap; rep.apTurn++; rep.used.add(id);
  const ael=document.getElementById("repAp"); if(ael)ael.textContent=rep.ap;
  const arm=document.getElementById("repArm"); if(arm)arm.textContent=repFmt(rep.armonia);
  document.querySelector("#republica .rep-arm > i").style.width=Math.max(0,rep.armonia/REP_ARM0*100)+"%";
  repDrawTurn(ev); }
function repResolve(ev){
  if(rep.resolved) return; rep.resolved=true;
  const r=ev.effect(); rep.armonia=Math.min(REP_ARM0, Math.round((rep.armonia+r.d)*10)/10);
  rep.turn++;
  if(rep.turn>=REP_TURNS || rep.armonia<=0 || repPop()<3) repResult(); else repRenderTurn();
}
function repResult(){
  const a=rep.armonia; let emoji,rank;
  if(a<=0||repPop()<3){ emoji="💥"; rank="La república colapsa"; }
  else if(a>=8){ emoji="🏛️"; rank="República armónica"; }
  else if(a>=5){ emoji="⚖️"; rank="República estable"; }
  else { emoji="⚠️"; rank="República frágil, pero en pie"; }
  const key="aula-republica-best"; const best=store.get(key,0); const record=a>best; if(record) store.set(key,a);
  const qs=["¿Qué muestra este juego sobre la necesidad de equilibrio en la sociedad de Platón?",
    "¿Qué riesgos trae el poder excesivo de cada clase social?",
    "¿Es cierto, como decía Platón, que sin gobernantes filósofos no puede salvarse la sociedad?",
    "¿Merece la pena una ciudad justa si para lograrla hay que renunciar a la igualdad entre clases?"];
  repBox().innerHTML='<div class="rep-wrap"><div class="rep-result">'+
    '<div class="rep-badge">'+emoji+'</div><div class="rep-rank">'+rank+'</div>'+
    '<div class="rep-final">'+repFmt(Math.max(0,a))+' <span>/ '+REP_ARM0+' de armonía</span></div>'+
    '<p class="rep-pop">'+REP_TURNS+' turnos · ciudad final '+rep.t.Z.n+'/'+rep.t.G.n+'/'+rep.t.E.n+' · '+(rep.acciones==="si"?"con acciones":"sin acciones")+' · '+(record?"¡tu mejor república! 🎉":"mejor marca: "+repFmt(Math.max(best,a)))+'</p>'+
    '<blockquote class="rep-reflect">Para pensar: '+qs[Math.floor(Math.random()*qs.length)]+'</blockquote>'+
    '<div class="rep-actions2"><button class="btn2 primary" id="repAgain">Diseñar otra ciudad</button></div></div></div>';
  document.getElementById("repAgain").addEventListener("click",renderRepStart);
}
function initRep(){ renderRepStart(); }
document.addEventListener("DOMContentLoaded", initRep);
(function(){ const nav=document.getElementById("tabs"); if(nav) nav.addEventListener("click", e=>{ const b=e.target.closest("button"); if(b && b.dataset.view==="republica") renderRepStart(); }); })();
