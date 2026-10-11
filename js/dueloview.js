"use strict";
/* ===== «Duelo de razones» (11-10: de juego aparte a sección de la web) — vista sobre duelo.js =====
   Antes eran cinco copias autónomas (media/juego_duelo_de_razones*.html, una por lengua). Ahora: datos en duelo.js
   (traducidos por tm/<lang>.json) y textos de interfaz en DUE_TXT (traducidos por ui/<lang>.json). Mismas reglas y
   equilibrio que el original (docs/17_duelo_de_razones_juego_debate.md): 6 intervenciones, medidor de público, temple,
   señalar la falacia (A) o contraargumentar (B), comodines «¿Cómo lo sabes?» y «¿Qué gana?».
   Nivel según la web (eso | fil | hf; en la web local, todos con un filtro). «Modo proyector»: pantalla completa y letra grande.
   Enlaces profundos: #duelo/<nivel> y #duelo/<nivel>/<id del tema> (p. ej. desde Polémicas: #duelo/hf/pol-erasmo-lutero). */
const DUE_TXT = {
  eyebrow: "Juego de debate · una conversación, un tema",
  h1: "Discute y convence",
  lede: "Debates un tema contra el ordenador y un medidor marca a quién va convenciendo el público. En cada turno, ante lo que acaba de decir, eliges tu jugada.",
  rA: "<b>Señalar la falacia.</b> Si su argumento hace trampa, la nombras y le obligas a defenderla. Cuando la trampa es el corazón de su postura, esto le hace mucho daño.",
  rB: "<b>Contraargumentar.</b> Dejas pasar su jugada y respondes con una razón tuya. Si es lo bastante fuerte, convence más que entretenerte en corregir una trampa pequeña… pero si es floja y su trampa era gorda, te hunde. Ojo: sus argumentos también tienen fuerza; si tu razón es más floja que la suya, el público se va con él.",
  rT: "<b>Temple.</b> Cuando te faltan al respeto o te tocan la fibra (un insulto, una amenaza, un ataque personal) pierdes temple, aunque caces la jugada: el golpe duele igual. No se recupera solo, así que se acumula. A cero pierdes los estribos (solo te sale insultar, rendirte o huir); entonces para y respira para recobrar algo de calma.",
  rC: "<b>Comodines (uno de cada por partida).</b> <b>¿Cómo lo sabes?</b> desmonta las trampas que fingen tener apoyo (un famoso, todo el mundo, pocos casos, una falsa causa, la tradición) aunque no sepas su nombre; ante un argumento legítimo te resta, porque te da sus razones. <b>¿Qué gana?</b> saca a la luz el interés oculto de quien habla, si lo tiene; si no lo tiene, te resta: presuponer mala fe sin indicios es atacar a la persona.",
  elige: "Elige el tema de esta partida:",
  nivel: "Nivel", nEso: "2.º ESO", nFil: "Filosofía 1.º", nHf: "Historia de la Filosofía",
  proyector: "Modo proyector", salirProy: "Salir del modo proyector",
  pie: "No siempre gana quien pilla la trampa: a veces gana quien pega más fuerte con razones.",
  intervencion: "Intervención", temple: "Temple", tu: "Tú", ordenador: "Ordenador", conviccion: "Convicción del público",
  estribos: "🥵 Has perdido los estribos — ¿con qué sales?",
  respira: "Parar y respirar", respiraSub: "no respondes en caliente; recuperas la calma",
  respiraHead: "Has parado a tiempo.", respiraBody: "No ganas terreno esta vez, pero recuperas la calma. A veces lo más inteligente es no responder en caliente.",
  provoca: "💢 Te está provocando — responde", turno: "Tu turno — ¿cómo respondes?",
  aHot: "Señalar que es una trampa (no un argumento)", aHotSub: "le dices que eso no responde al tema",
  a: "Señalar la falacia y obligarle a defenderla", aSub: "la nombras; si es el eje de su postura, le haces mucho daño",
  b: "Contraargumentar con una razón tuya", bSub: "dejas pasar su jugada y pegas con lo tuyo",
  queFal: "🎯 ¿Qué falacia es? Nómbrala para desmontarla", volver: "‹ volver",
  eligeContra: "⚔️ Elige tu contraargumento", fuerzaAp: "fuerza aparente",
  noArg: "Eso no es un argumento: es {e}. Respóndeme al tema.",
  paras: "Le paras los pies.", parasBody: "Has señalado {e} en vez de picar. El público lo nota y te da la razón. Aun así pierdes un punto de temple: te ha tocado la fibra.",
  notaFibra: "Y como además es una falta de respeto, pierdes un punto de temple aunque la hayas cazado.",
  esoEs: "Eso es {f}.", esoEsDuda: "Eso es {f}…", esoEsQ: "Eso es {f}: {q}",
  noTrampa: "No había trampa ahí.", noTrampaBody: "Era un argumento legítimo, y lo has acusado de «{f}». Señalar falacias donde no las hay parece que esquivas el tema, y el público se enfría contigo.",
  eje: "Era el eje de toda su postura: desmontarla ha sido demoledor.", menor: "Era una trampa menor, pero oye, suma.",
  dos: "Esta carta esconde dos trampas a la vez ({todas}): cualquiera de las dos vale.", y: "y",
  cazada: "¡Cazada y con nombre!", cazadaBody: "Era <b>{f}</b> <span class='due-tec'>({tec})</span> y le obligas a defenderla.",
  faltaNoEsa: "Viste la falta de respeto, pero no era esa falacia.", faltaNoEsaBody: "Era <b>{real}</b> <span class='due-tec'>({tec})</span>, no «{f}».",
  noEsa: "Viste la trampa, pero no era esa.", noEsaBody: "Había trampa, sí, pero no «{f}»: era <b>{real}</b> <span class='due-tec'>({tec})</span>. Acusarla con otro nombre resta: el público ve que no sabes bien qué falla.",
  sabes: "★ ¿Cómo lo sabes?", sabesSub: "pide pruebas; sirve aunque no sepas el nombre de la trampa",
  gana: "★ ¿Qué gana?", ganaSub: "busca un interés oculto; sin indicios, te resta", usado: "ya usado",
  sabesYo: "¿Cómo lo sabes? ¿Qué pruebas tienes?",
  noAfirm: "Eso no era una afirmación.", noAfirmBody: "Te estaba provocando; preguntarle cómo lo sabe no le para los pies, y la provocación te ha tocado la fibra.",
  siSabia: "Sí lo sabía.", siSabiaBody: "Te explica sus razones y el público le escucha: era un argumento legítimo. Pedir pruebas está bien, pero aquí has gastado el comodín.",
  sinPruebas: "No tenía pruebas.", sinPruebasBody: "Le preguntas cómo lo sabe y no puede enseñar nada: su «{f}» se queda sin apoyo. Si además le pones nombre, sumas más.",
  noPruebas: "Su trampa no iba de pruebas.", noPruebasBody: "Era «{f}»: no se arregla pidiendo pruebas.",
  ganaYo: "¿Y tú qué ganas con que me lo crea?",
  interes: "¡Tenía un interés!", interesBody: "Preguntas qué gana quien lo dice y sale a la luz: {i} No demuestra que mienta, pero el público ya no se fía igual.",
  sinIndicios: "Le acusas sin indicios.", sinIndiciosBody: "Nada indica que gane algo con esto. Pensar en los intereses es parte del pensamiento crítico, pero presuponer mala fe sin indicios es atacar a la persona.",
  tramposo: "Tu propio golpe era tramposo.", tramposoBody: "Has contraatacado con <b>{f}</b> <span class='due-tec'>({tec})</span>, y el ordenador te caza. El público te lo descuenta.",
  pesaba: "Su argumento pesaba más.", pesabaBody: "Tu razón (fuerza {n}) era más floja que lo que él había dicho.",
  pesabaEst: "Pasar de su provocación está bien, pero hacía falta una respuesta más sólida.", pesabaArg: "No había trampa que señalar: tocaba una razón más fuerte.",
  buen: "Buen contraargumento.", tablas: "Tablas en este turno.", respondido: "Has respondido con una razón de fuerza {n}.",
  elegante: "Y has pasado de su provocación: elegante.", tocaba: "Su jugada no tenía trampa; aquí tocaba argumentar.",
  masFuerte: "Has pegado más fuerte que su trampa.", masFuerteBody: "Dejaste pasar su <b>{f}</b> (una trampa menor) y metiste un contraargumento potente. A veces conviene no entretenerse en corregir: el público se queda con tu razón.",
  enPie: "Su trampa seguía en pie.", enPieBody: "Su <b>{f}</b> era el eje de su postura y la has dejado pasar; tu contraargumento no daba para tanto. Aquí habría convenido <b>señalarla</b>.",
  papeles: "Has perdido los papeles.", papelesBody: "Descolocado, solo te ha salido {r}. El público se va con el ordenador. Por eso lo primero es no picar.",
  desmonta: "Para desmontarla:", schop: "Schopenhauer la recogió como <b>{s}</b> en «El arte de tener razón».",
  veredicto: "Ver el veredicto", seguir: "Seguir el debate",
  fin: "Fin del debate", delPublico: "{n}% del público",
  gano: "Has convencido al público", perdio: "El público se ha ido con el ordenador", empate: "Debate reñido, sin ganador claro",
  ganoMsg: "Has sabido cuándo señalar una trampa y cuándo pegar fuerte con una razón, sin perder los estribos. Eso es discutir bien.",
  perdioMsg: "Te han colado trampas, o has gastado turnos en nimiedades mientras lo gordo quedaba sin responder, o te descolocaron. Mira el medidor y prueba otra línea.",
  empateMsg: "Ha estado igualado. Afina cuándo señalar la falacia y cuándo contraatacar y lo inclinas a tu favor.",
  otraVez: "Debatir otra vez (este tema)", otroTema: "Elegir otro tema",
  descargar: "⬇ Descargar la conversación", dTitulo: "Duelo de razones · conversación", dFecha: "Fecha: {d}", dTema: "Tema: {t}",
  dJugada: "→ {h}", dMedidor: "Convicción del público tras la jugada: {n}%", dResultado: "Resultado: {n}% del público", dSinNombre: "Sin nombre ni datos personales."
};
const dueT = (k, v) => String(DUE_TXT[k] == null ? k : DUE_TXT[k]).replace(/\{(\w+)\}/g, (_, x) => (v && v[x] != null ? v[x] : ""));
const DUE_FIBRA = new Set(["persona"]);   // además de trampa, falta de respeto: cuesta temple aunque la caces
const DUE_SIN_PRUEBAS = new Set(["famoso", "todos", "pocos", "causa", "siempre"]);   // fingen tener apoyo: se caen al pedir pruebas
const DUE_MAXT = 6, DUE_NIVELES = ["eso", "fil", "hf"];
let DS = null, dueSeed = 1, dueNivel = null;
/* #duelo/<nivel>/<tema> sin codificar la barra (setDeepHash la codificaría) */
function dueHash(){ const h = "#duelo" + [].slice.call(arguments).filter(Boolean).map(x => "/" + encodeURIComponent(x)).join(""); if (location.hash !== h){ try { history.replaceState(null, "", h); } catch (e){} } }
function dueRnd(){ dueSeed = (dueSeed * 1103515245 + 12345) & 0x7fffffff; return dueSeed / 0x7fffffff; }
function dueShuffle(a){ for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(dueRnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function dueBox(){ return document.getElementById("duelobox"); }
function dueClamp(v){ return Math.max(0, Math.min(100, v)); }
/* nivel de esta web: la ficha de materia que existe (#eso/#fil/#hf); en la web local (varias), el elegido en el filtro */
function dueNivelWeb(){
  const hay = ["ipc", "fil", "hf"].filter(id => document.getElementById(id) && typeof SUBJECTS !== "undefined" && SUBJECTS[id]);
  if (hay.length === 1) return hay[0] === "ipc" ? "eso" : hay[0];
  return null;
}
function dueTemas(){ const L = dueNivel || dueNivelWeb(); return DUELO_TEMAS.map((t, i) => ({ t, i })).filter(({ t }) => !L || (t.nivel || []).includes(L)); }

function dueFresh(ti){
  return { ti, meter: 50, temple: 3, turno: 0, thread: [], move: null, hand: null, fase: "turn",
    cola: dueShuffle(DUELO_TEMAS[ti].opp.map((_, i) => i)), comodines: { sabes: 1, gana: 1 } };
}
function dueRender(){ if (!DS) return dueIntro(); if (DS.fase === "end") return dueFin(); dueJuego(); }

function dueIntro(){
  const box = dueBox(); if (!box) return;
  const multi = !dueNivelWeb();
  box.innerHTML = '<div class="due-intro due-fade"><div class="due-center"><div class="due-eyebrow">' + dueT("eyebrow") + '</div><h2 class="due-h1">' + dueT("h1") + '</h2><p class="due-lede">' + dueT("lede") + '</p></div>' +
    '<div class="due-rules">' + [["A", "rA"], ["B", "rB"], ["♦", "rT"], ["★", "rC"]].map(([n, k]) => '<div class="due-rule"><span class="due-n">' + n + '</span><p>' + dueT(k) + '</p></div>').join("") + '</div>' +
    (multi ? '<div class="due-niveles" role="group" aria-label="' + dueT("nivel") + '">' + [["", "todos"]].concat([["eso", "nEso"], ["fil", "nFil"], ["hf", "nHf"]]).map(([v, k]) =>
      '<button type="button" class="fbtn" data-due-nivel="' + v + '" aria-pressed="' + ((dueNivel || "") === v) + '">' + (k === "todos" ? "—" : dueT(k)) + '</button>').join("") + '</div>' : '') +
    '<div class="due-center due-elige">' + dueT("elige") + '</div><div class="due-pick">' +
    dueTemas().map(({ t, i }) => '<button type="button" class="due-btn" data-due-ti="' + i + '">' + t.claim + '<span class="due-sides">' + t.tuLado + '</span></button>').join("") + '</div>' +
    '<p class="due-pie">' + dueT("pie") + '</p></div>';
}
function dueEmpezar(ti){ dueSeed = (Date.now() & 0x7fffffff) || 1; DS = dueFresh(ti); dueTurno(true); }
function duePush(side, text){ DS.thread.push({ side, text }); }

function dueTurno(first){
  if (DS.turno >= DUE_MAXT){ DS.fase = "end"; return dueRender(); }
  const T = DUELO_TEMAS[DS.ti];
  if (!first && dueRnd() < 0.32){
    const pool = (T.estrat && T.estrat.length) ? T.estrat : Object.keys(DUELO_ESTRAT).map(k => DUELO_ESTRAT[k]);
    const e = pool[Math.floor(dueRnd() * pool.length)];
    DS.move = { kind: "estrat", e, t: e.t };
  } else {
    if (!DS.cola.length) DS.cola = dueShuffle(T.opp.map((_, i) => i));
    const m = T.opp[DS.cola.shift()];
    DS.move = { kind: "arg", t: m.t, f: m.f, fAlt: m.fAlt, peso: m.peso || 0, fuerza: m.fuerza, interes: m.interes };
  }
  duePush("cpu", DS.move.t);
  DS.fase = "turn"; dueRender();
}
function dueHud(){
  const T = DUELO_TEMAS[DS.ti], you = DS.meter, cpu = 100 - DS.meter, low = DS.temple <= 1;
  return '<div class="due-hud"><div class="due-turnlbl">' + dueT("intervencion") + ' <b>' + Math.min(DS.turno + 1, DUE_MAXT) + '</b> / ' + DUE_MAXT + '</div>' +
    '<div class="due-temple' + (low ? " low" : "") + '"><div class="due-who">' + dueT("temple") + '</div><div class="due-dots">' + "♦".repeat(DS.temple) + "♢".repeat(3 - DS.temple) + '</div></div></div>' +
    '<div class="due-meter-wrap"><div class="due-meter-top"><span class="due-you">' + dueT("tu") + ' ' + you + '%</span><span>' + dueT("conviccion") + '</span><span class="due-cpu">' + dueT("ordenador") + ' ' + cpu + '%</span></div>' +
    '<div class="due-meter"><div class="due-fill" style="width:' + you + '%"></div><div class="due-mid"></div></div></div>' +
    '<div class="due-topic"><b>' + T.claim + '</b> · <span class="due-you-side">' + T.tuLado + '</span></div>';
}
function dueHilo(){
  return '<div class="due-thread" id="duethread">' + DS.thread.map((m, i) => '<div class="due-bubble ' + m.side + (i === DS.thread.length - 1 && m.side === "cpu" ? " latest" : "") + '"><div class="due-nm">' +
    (m.side === "cpu" ? dueT("ordenador") : dueT("tu")) + '</div>' + m.text + '</div>').join("") + '</div>';
}
function dueScroll(){ const t = document.getElementById("duethread"); if (t) t.scrollTop = t.scrollHeight; }
function dueBtn(attr, cls, txt, sub, dis){ return '<button type="button" class="due-btn due-choice ' + (cls || "") + '" ' + attr + (dis ? " disabled" : "") + '>' + txt + (sub ? '<small>' + sub + '</small>' : '') + '</button>'; }

function dueJuego(){
  const box = dueBox(); if (!box) return;
  let h = dueHud() + dueHilo();
  if (DS.fase === "turn"){
    if (DS.temple <= 0){
      h += '<div class="due-phase hot">' + dueT("estribos") + '</div><div class="due-choices due-fade">' + dueBtn('data-due="respira"', "due-primary", dueT("respira"), dueT("respiraSub")) +
        DUELO_REACCIONES.map((r, i) => dueBtn('data-due-rx="' + i + '"', "due-a", r.lbl, r.t)).join("") + '</div>';
    } else {
      const hot = DS.move.kind === "estrat", c = DS.comodines;
      h += '<div class="due-phase' + (hot ? " hot" : "") + '">' + dueT(hot ? "provoca" : "turno") + '</div><div class="due-choices due-fade">' +
        dueBtn('data-due="a"', "due-a", dueT(hot ? "aHot" : "a"), dueT(hot ? "aHotSub" : "aSub")) + dueBtn('data-due="b"', "due-b", dueT("b"), dueT("bSub")) + '</div>' +
        '<div class="due-choices due-comodines due-fade">' + dueBtn('data-due-com="sabes"', "", dueT("sabes"), c.sabes ? dueT("sabesSub") : dueT("usado"), !c.sabes) +
        (DUELO_TEMAS[DS.ti].opp.some(o => o.interes) ? dueBtn('data-due-com="gana"', "", dueT("gana"), c.gana ? dueT("ganaSub") : dueT("usado"), !c.gana) : "") + '</div>';
    }
  } else if (DS.fase === "name"){
    h += '<div class="due-phase">' + dueT("queFal") + '</div><div class="due-choices due-grid-fal due-fade">' +
      DUELO_ORDEN_FAL.map(k => dueBtn('data-due-fal="' + k + '"', "", DUELO_FALACIAS[k].nombre, DUELO_FALACIAS[k].tec)).join("") + '</div><button type="button" class="due-back" data-due="back">' + dueT("volver") + '</button>';
  } else if (DS.fase === "counter"){
    h += '<div class="due-phase">' + dueT("eligeContra") + '</div><div class="due-choices due-fade">' + DS.hand.map((c, i) => {
      const n = c.f ? 1 : c.str;
      return dueBtn('data-due-c="' + i + '"', "", '<span class="due-carta">' + c.t + '</span>', '<span class="due-pips">' + "●".repeat(n) + "○".repeat(3 - n) + '</span> ' + dueT("fuerzaAp"));
    }).join("") + '</div><button type="button" class="due-back" data-due="back">' + dueT("volver") + '</button>';
  }
  box.innerHTML = h; dueScroll();
}

function dueA(){
  if (DS.move.kind === "estrat"){
    const e = DS.move.e; DS.temple = Math.max(0, DS.temple - 1);
    duePush("you", dueT("noArg", { e: e.nombre }));
    const d = 8; DS.meter = dueClamp(DS.meter + d);
    return dueFB("win", dueT("paras"), dueT("parasBody", { e: e.nombre }), { q: e.q, schop: e.schop }, d);
  }
  DS.fase = "name"; dueRender();
}
function dueNombrar(k){
  const m = DS.move, fa = DUELO_FALACIAS[k];
  const fibra = m.f && DUE_FIBRA.has(m.f); if (fibra) DS.temple = Math.max(0, DS.temple - 1);
  const nota = fibra ? " " + dueT("notaFibra") : "";
  if (m.f === null){
    duePush("you", dueT("esoEs", { f: fa.nombre }));
    const d = -10; DS.meter = dueClamp(DS.meter + d);
    return dueFB("lose", dueT("noTrampa"), dueT("noTrampaBody", { f: fa.nombre }), {}, d);
  }
  const real = DUELO_FALACIAS[m.f], alts = m.fAlt || [];
  if (k === m.f || alts.includes(k)){
    duePush("you", dueT("esoEsQ", { f: fa.nombre, q: fa.q }));
    const d = 6 + m.peso * 3; DS.meter = dueClamp(DS.meter + d);
    let extra = m.peso >= 3 ? " " + dueT("eje") : (m.peso === 1 ? " " + dueT("menor") : "");
    if (alts.length) extra = " " + dueT("dos", { todas: [m.f].concat(alts).map(x => DUELO_FALACIAS[x].nombre).join(" " + dueT("y") + " ") }) + extra;
    return dueFB("win", dueT("cazada"), dueT("cazadaBody", { f: fa.nombre, tec: fa.tec }) + extra + nota, { q: fa.q }, d);
  }
  duePush("you", dueT("esoEsDuda", { f: fa.nombre }));
  const d = -3; DS.meter = dueClamp(DS.meter + d);
  if (fibra) return dueFB("mid", dueT("faltaNoEsa"), dueT("faltaNoEsaBody", { real: real.nombre, tec: real.tec, f: fa.nombre }) + nota, { q: real.q }, d);
  dueFB("mid", dueT("noEsa"), dueT("noEsaBody", { f: fa.nombre, real: real.nombre, tec: real.tec }), { q: real.q }, d);
}
function dueComodin(k){
  const m = DS.move; DS.comodines[k] = 0;
  if (k === "sabes"){
    duePush("you", dueT("sabesYo"));
    if (m.kind === "estrat"){ DS.temple = Math.max(0, DS.temple - 1); return dueFB("mid", dueT("noAfirm"), dueT("noAfirmBody"), {}, 0); }
    if (m.f === null){ const d = -3; DS.meter = dueClamp(DS.meter + d); return dueFB("lose", dueT("siSabia"), dueT("siSabiaBody"), {}, d); }
    const fa = DUELO_FALACIAS[m.f];
    if (DUE_FIBRA.has(m.f)) DS.temple = Math.max(0, DS.temple - 1);
    if (DUE_SIN_PRUEBAS.has(m.f)){ const d = 8; DS.meter = dueClamp(DS.meter + d); return dueFB("win", dueT("sinPruebas"), dueT("sinPruebasBody", { f: fa.nombre }), { q: fa.q }, d); }
    return dueFB("mid", dueT("noPruebas"), dueT("noPruebasBody", { f: fa.nombre }), { q: fa.q }, 0);
  }
  duePush("you", dueT("ganaYo"));
  if (m.kind === "arg" && m.interes){ const d = 12; DS.meter = dueClamp(DS.meter + d); return dueFB("win", dueT("interes"), dueT("interesBody", { i: m.interes }), {}, d); }
  if (m.kind === "estrat") DS.temple = Math.max(0, DS.temple - 1);
  const d = -6; DS.meter = dueClamp(DS.meter + d); dueFB("lose", dueT("sinIndicios"), dueT("sinIndiciosBody"), {}, d);
}
function dueB(){
  const pool = dueShuffle(DUELO_TEMAS[DS.ti].counters.slice());
  const sol = pool.filter(c => !c.f), tra = pool.filter(c => c.f);
  let hand = dueShuffle([sol[0], sol[1] || sol[0], (dueRnd() < 0.6 && tra[0]) ? tra[0] : (sol[2] || sol[0])]).slice(0, 3);
  hand = [...new Set(hand)];
  let pi = 0; while (hand.length < 3 && pi < pool.length){ if (!hand.includes(pool[pi])) hand.push(pool[pi]); pi++; }
  DS.hand = hand; DS.fase = "counter"; dueRender();
}
function dueContra(i){
  const c = DS.hand[i], m = DS.move;
  if (m.kind === "estrat" || (m.f && DUE_FIBRA.has(m.f))) DS.temple = Math.max(0, DS.temple - 1);
  duePush("you", c.t);
  if (c.f){ const fa = DUELO_FALACIAS[c.f], d = -10; DS.meter = dueClamp(DS.meter + d); return dueFB("lose", dueT("tramposo"), dueT("tramposoBody", { f: fa.nombre, tec: fa.tec }), { q: fa.q }, d); }
  const sin = (m.kind === "arg" && m.f) ? m.peso : 0;
  const rival = m.kind === "arg" ? (m.fuerza || (m.f ? 1 : 2)) : 2;   // (08-10) el ordenador también tiene fuerza
  const d = (c.str - rival) * 5 - sin * 4;
  DS.meter = dueClamp(DS.meter + d);
  if (!sin){
    if (d < 0) return dueFB("lose", dueT("pesaba"), dueT("pesabaBody", { n: c.str }) + " " + dueT(m.kind === "estrat" ? "pesabaEst" : "pesabaArg"), {}, d);
    return dueFB(d > 0 ? "win" : "mid", dueT(d > 0 ? "buen" : "tablas"), dueT("respondido", { n: c.str }) + " " + dueT(m.kind === "estrat" ? "elegante" : "tocaba"), {}, d);
  }
  const fa = DUELO_FALACIAS[m.f];
  if (d > 0) return dueFB("win", dueT("masFuerte"), dueT("masFuerteBody", { f: fa.nombre }), {}, d);
  dueFB("lose", dueT("enPie"), dueT("enPieBody", { f: fa.nombre }), { q: fa.q }, d);
}
function dueReaccion(i){
  const r = DUELO_REACCIONES[i];
  duePush("you", r.t);
  const d = -12; DS.meter = dueClamp(DS.meter + d); DS.temple = 1;
  dueFB("lose", dueT("papeles"), dueT("papelesBody", { r: r.lbl.toLocaleLowerCase() }), {}, d);
}
function dueFB(cls, head, body, extra, delta, cont){
  extra = extra || {};
  const last = DS.turno + 1 >= DUE_MAXT;
  DS.cont = cont || null;
  DS.log = DS.log || []; DS.log.push({ i: DS.thread.length, head: head, body: body, meter: DS.meter });
  dueBox().innerHTML = dueHud() + dueHilo() + '<div class="due-fb ' + cls + ' due-fade"><div class="due-head">' + (cls === "win" ? "✓" : cls === "lose" ? "✕" : "◆") + ' ' + head + '</div>' +
    '<div class="due-body">' + body + '</div>' +
    (typeof delta === "number" && delta !== 0 ? '<div class="due-body">' + dueT("conviccion") + ': <span class="due-delta ' + (delta > 0 ? "pos" : "neg") + '">' + (delta > 0 ? "+" : "") + delta + '</span> → ' + DS.meter + '%</div>' : "") +
    (extra.q ? '<div class="due-desmonta">' + dueT("desmonta") + ' <b>' + extra.q + '</b></div>' : "") +
    (extra.schop ? '<div class="due-schop">' + dueT("schop", { s: extra.schop }) + '</div>' : "") +
    '</div><div class="due-choices due-sigue"><button type="button" class="due-btn due-primary" data-due="cont">' + dueT(last ? "veredicto" : "seguir") + '</button></div>' +
    '<button type="button" class="due-back due-descarga" data-due="descargar">' + dueT("descargar") + '</button>';
  dueScroll();
}
function dueFin(){
  const you = DS.meter, win = you > 55, lose = you < 45, cls = win ? "win" : lose ? "lose" : "tie";
  dueBox().innerHTML = dueHud() + '<div class="due-intro due-center due-fade"><div class="due-eyebrow">' + dueT("fin") + '</div><div class="due-verdict ' + cls + '">' + dueT("delPublico", { n: you }) + '</div>' +
    '<h2>' + dueT(win ? "gano" : lose ? "perdio" : "empate") + '</h2><p class="due-lede">' + dueT(win ? "ganoMsg" : lose ? "perdioMsg" : "empateMsg") + '</p>' +
    '<div class="due-pick due-fin"><button type="button" class="due-btn due-primary" data-due="again">' + dueT("otraVez") + '</button><button type="button" class="due-btn" data-due="home">' + dueT("otroTema") + '</button></div>' +
    '<button type="button" class="due-back due-descarga" data-due="descargar">' + dueT("descargar") + '</button></div>';
}

/* ---- «Descargar la conversación»: .txt con la partida entera (sin nombre ni datos personales) ---- */
function dueTexto(h){ const d = document.createElement("div"); d.innerHTML = String(h).replace(/<br\s*\/?>/g, "\n"); return (d.textContent || "").replace(/[ \t]+/g, " ").trim(); }
function dueDescargar(){
  if (!DS) return;
  const T = DUELO_TEMAS[DS.ti], hoy = new Date(), f = hoy.toISOString().slice(0, 10), out = [];
  out.push(dueT("dTitulo"), dueT("dFecha", { d: hoy.toLocaleString() }), dueT("dTema", { t: dueTexto(T.claim) }), dueTexto(T.cpuLado), dueTexto(T.tuLado), dueT("dSinNombre"), "");
  const log = DS.log || [];
  DS.thread.forEach((m, i) => {
    out.push((m.side === "cpu" ? dueT("ordenador") : dueT("tu")) + ": " + dueTexto(m.text));
    log.filter(x => x.i === i + 1).forEach(x => { out.push("   " + dueT("dJugada", { h: dueTexto(x.head) }) + " " + dueTexto(x.body), "   " + dueT("dMedidor", { n: x.meter })); });
  });
  out.push("", dueT("dResultado", { n: DS.meter }));
  if (DS.fase === "end") out.push(dueTexto(dueT(DS.meter > 55 ? "gano" : DS.meter < 45 ? "perdio" : "empate")));
  const blob = new Blob(["\ufeff" + out.join("\r\n") + "\r\n"], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "duelo-" + (T.id || "partida") + "-" + f + ".txt";
  document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}

/* ---- modo proyector: pantalla completa y letra grande (la clase lo ve desde el fondo) ---- */
function dueProyector(){
  const sec = document.getElementById("duelo"); if (!sec) return;
  const on = !sec.classList.contains("due-proy");
  sec.classList.toggle("due-proy", on);
  try { if (on && sec.requestFullscreen) sec.requestFullscreen(); else if (!on && document.fullscreenElement) document.exitFullscreen(); } catch (e){}
  const b = document.getElementById("dueproy"); if (b) b.textContent = dueT(on ? "salirProy" : "proyector");
}
document.addEventListener("fullscreenchange", () => {
  const sec = document.getElementById("duelo");
  if (sec && !document.fullscreenElement && sec.classList.contains("due-proy")){ sec.classList.remove("due-proy"); const b = document.getElementById("dueproy"); if (b) b.textContent = dueT("proyector"); }
});

document.addEventListener("click", e => {
  const t = e.target; if (!t.closest || !t.closest("#duelo")) return;
  if (t.closest("#dueproy")) return dueProyector();
  const nv = t.closest("[data-due-nivel]"); if (nv){ dueNivel = nv.dataset.dueNivel || null; return dueIntro(); }
  const ti = t.closest("[data-due-ti]"); if (ti){ dueEmpezar(+ti.dataset.dueTi); dueHash(dueNivel || dueNivelWeb(), DUELO_TEMAS[+ti.dataset.dueTi].id); return; }
  const fal = t.closest("[data-due-fal]"); if (fal) return dueNombrar(fal.dataset.dueFal);
  const c = t.closest("[data-due-c]"); if (c) return dueContra(+c.dataset.dueC);
  const com = t.closest("[data-due-com]"); if (com && !com.disabled) return dueComodin(com.dataset.dueCom);
  const rx = t.closest("[data-due-rx]"); if (rx) return dueReaccion(+rx.dataset.dueRx);
  const a = t.closest("[data-due]"); if (!a) return;
  const k = a.dataset.due;
  if (k === "a") return dueA();
  if (k === "b") return dueB();
  if (k === "back"){ DS.fase = "turn"; return dueRender(); }
  if (k === "respira"){ DS.temple = 1; return dueFB("mid", dueT("respiraHead"), dueT("respiraBody"), {}, 0, () => { DS.turno++; dueTurno(false); }); }
  if (k === "cont"){ const f = DS.cont; DS.cont = null; if (f) return f(); DS.turno++; return dueTurno(false); }
  if (k === "descargar") return dueDescargar();
  if (k === "again"){ return dueEmpezar(DS.ti); }
  if (k === "home"){ DS = null; dueHash(dueNivel); return dueIntro(); }
});

/* enlace profundo: #duelo/<nivel>[/<id del tema>] (los temas «pol-…» salen de Polémicas) */
function loadDuelo(arg){
  if (typeof DUELO_TEMAS === "undefined") return;
  const [nv, id] = String(arg || "").split("/");
  if (DUE_NIVELES.includes(nv) && !dueNivelWeb()) dueNivel = nv;
  const i = id ? DUELO_TEMAS.findIndex(t => t.id === id) : -1;
  if (i >= 0) return dueEmpezar(i);
  DS = null; dueIntro();
}
window.loadDuelo = loadDuelo;
if (dueBox() && typeof DUELO_TEMAS !== "undefined") dueIntro();
