"use strict";
/* ===== Viaje del alumno (29-09-2026): ficha de la materia, enlaces de cada tema, itinerario PAU y migas =====
   Nace del estudio del viaje del usuario (docs/estudio_viaje_usuario_web.md y cuaderno: viaje_del_alumno.html) y de
   las decisiones del profesor del 29-09: nada que desplace ni duplique el contenido; en las webs del alumnado no hay
   Inicio, se entra en la ficha de la materia; y esa ficha se ordena: lista limpia de temas → la web en números →
   itinerario PAU (HF). Este módulo añade, SIN tocar la navegación ni los datos:
   1. En la ficha de la materia: la lista de temas con sus títulos (en 2.º ESO castellano, las unidades de «Clases»),
      y en HF el itinerario PAU completo, tras «Explora la materia». Retira la fila de botones curados (tools) en las
      webs de una materia.
   2. Al final de cada tema de Teoría, «Para seguir con este tema»: TODAS las tarjetas, cuestionarios, infografías,
      mapas, esquemas, lecturas, comentarios y dilemas del tema, los conceptos del diccionario, y el paso al tema
      anterior/siguiente. En Tarjetas, Cuestionarios y Clases, la tira de una línea «De este tema».
   3. En cada sección de PAU, una línea con los pasos de la prueba y «estás aquí».
   4. Migas de contexto: «Inicio › Grupo › Sección» (Inicio = la ficha de la materia cuando no hay portada).
   Los temas se deducen de las claves y de mapas curados (como QUIZ_TEMA en quiz.js). Envuelve loaders globales igual
   que resume.js (window.loadX). Las colecciones son const/let de otros <script> (no cuelgan de window): se leen con
   G() (eval indirecto en el ámbito global) y guardas por si un build no trae alguna. Textos en cadenas enteras para que
   web_i18n/ui/<lang>.json los traduzca. Estilos: styles.css («Viaje del alumno»). */
(function(){
  var TXT = {
    ariaItin: "Itinerario del tema", ariaPau: "Itinerario PAU", ariaCrumbs: "Dónde estás", deEsteTema: "De este tema:",
    p1: "Lee la teoría", p1clases: "Sigue las clases", p2: "Repasa con tarjetas", p3: "Ponte a prueba", p4: "Repaso visual",
    aqui: "Estás aquí", siguiente: "Siguiente paso",
    temas: "Temas", exploraciones: "Exploraciones", unidades: "Unidades", tema: "Tema {n}", unidad: "Unidad {n}",
    seguir: "Para seguir con este tema", tarjetas: "Tarjetas", cuestionarios: "Cuestionarios", infografias: "Infografías", mapas: "Mapas conceptuales",
    esquemas: "Esquemas", lecturas: "Lecturas", comentarios: "Comentarios de texto", dilemas: "Dilemas éticos", pistas: "Pistas progresivas", conceptos: "Conceptos",
    nTarjetas: "{n} tarjetas", nPreguntas: "{n} preguntas", anterior: "Tema anterior", siguienteTema: "Tema siguiente", anexos: "Exploraciones", epoca: "La época", epocaDe: "Época: {e}", volverTema: "Volver al tema",
    blEstudiar: "Estudiar", blPau: "Preparar la PAU", blPensar: "Pensar y escribir", blAmpliar: "Ampliar", pauBadge: "Lectura PAU",
    cronogramas: "Cronogramas", disertaciones: "Disertaciones", comparativas: "Comparativas", polemicas: "Polémicas", comunidades: "Comunidades",
    puenteFil: "Lo volverás a ver en 2.º", puenteHf: "Ya lo viste en 1.º", hfSig: "HF",
    perseguidos: "Perseguidos", duelo: "Duelo de razones", juegos: "Juegos", logica: "Rincón de lógica", masFondo: "Más a fondo en este tema",
    videosEu: "Vídeos en euskera (Ikusgela)", videoEu: "Vídeo en euskera de Ikusgela", transcripcion: "Transcripción", transcripcionT: "Texto del vídeo: subtítulos de Ikusgela", infografia: "Infografía", mapa: "Mapa", esquema: "Esquema", lectura: "Lectura", dilema: "Dilema", comentario: "Comentario",
    pau: "Itinerario PAU", pauLead: "Prepara la PAU en orden: primero cómo es la prueba, luego cada ejercicio y, al final, la práctica por temas.",
    pau1: "Cómo es la prueba", pau2: "Ejercicio 1 · El comentario de texto", pau3: "Ejercicio 2 · La disertación",
    pau4: "Ejercicio 3 · La exposición", pau5: "Cómo se corrige", pau6: "Practica por temas", inicio: "Inicio",
    s1: "Teoría", s1clases: "Clases", s2: "Tarjetas", s3: "Cuestionario", s4: "Repaso",
    spau1: "La prueba", spau2: "Ej. 1 · Comentario", spau3: "Ej. 2 · Disertación", spau4: "Ej. 3 · Exposición", spau5: "Corrección", spau6: "Por temas"
  };
  function t(key, vars){ return String(TXT[key] || "").replace(/\{(\w+)\}/g, function(m, k){ return vars && k in vars ? String(vars[k]) : m; }); }
  function esc(s){ return String(s == null ? "" : s).replace(/[&<>"]/g, function(c){ return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function strip(s){ return String(s == null ? "" : s).replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(); }
  /* lectura de globales léxicos (const/let de otros scripts) por su nombre */
  function G(name){ try { return (0, eval)("typeof " + name + " !== 'undefined' ? " + name + " : undefined"); } catch (e){ return undefined; } }
  function coll(name){ var v = G(name); return v && typeof v === "object" ? v : null; }
  function fn(name){ var f = window[name]; return typeof f === "function" ? f : null; }
  function view(id){ return !!document.getElementById(id); }
  var SUBJ_COLOR = { fil: "var(--fil)", hf: "var(--hf)", ipc: "var(--ipc)" };
  function singleSubject(){ var S = coll("SUBJECTS"), ks = S ? Object.keys(S) : []; return ks.length === 1 ? ks[0] : null; }

  /* ---------- tema de cada recurso ----------
     Filosofía y HF: número de tema. Pensamiento crítico: clave de tema (las de QUIZ_TEMAS.ipc). */
  function temaNum(o){
    if (!o) return null;
    if (typeof o.tema === "number") return o.tema;
    var m = String(o.tema || "").match(/(?:Tema|Thème|Topic|الموضوع)\s+(\d+)|(\d+)\.\s*gaia/); return m ? +(m[1] || m[2]) : null;
  }
  var IPC_KEY = /^(?:map-)?ipc-([a-z]+)/;
  var IPC_ALIAS = { conceptos: "pensar", publicidad: "medios", prejuicios: "sesgos", moda: "huella", consumo: "huella", fastfashion: "huella", critico: "pensar", bulos: "falacias", hecho: "pensar", tecnologia: "medios", genero: "grupo", emociones: "pensar" };
  var IPC_TEMAS = ["pensar", "argumentar", "falacias", "sesgos", "dialogo", "medios", "grupo", "huella"];
  function ipcTema(key){
    var m = IPC_KEY.exec(key), k = m ? (IPC_ALIAS[m[1]] || m[1]) : null;
    if (!k){ var Q = coll("QUIZ_TEMA"); k = Q && Q[key]; }
    return IPC_TEMAS.indexOf(k) >= 0 ? k : null;
  }
  var DECK_TEMA = {
    aporias: 4, mito: 3, presocraticos: 4, sofistas: 5, kant: 19, kantPreguntas: 19, racionalismoEmpirismo: 14, historicidad: 1, metodos: 2,
    platon: 6, antropologia: 7, aristoteles: 7, etica: 8, politica: 9, helenismo: 10, medieval: 11, feRazon: 12, modernidad: 13, metafisica: 15, contrato: 16,
    utilitarismo: 17, ilustracion: 18, eticaDeber: 20, sospecha: 21, capitalismo: 22, posmodernidad: 23, analitica: 24, existencialismo: 25, beauvoir: 26, siglo21: 27,
    "fil-que-es": 1, "fil-ramas": 1, "fil-caracteristicas": 1, "fil-metodo": 1, "fil-saberes": 1, "fil-presocraticos": 1,
    "fil-ser-humano": 2, "fil-mente": 2, "fil-concepciones": 2, "fil-identidad": 2, "fil-conocer": 3, "fil-verdad": 3, "fil-metafisica": 3.5, "fil-ciencia": 3, "fil-posverdad": 3,
    "fil-logica": 4, "fil-etica": 5, "fil-helenismo": 5, "fil-politica": 6, "fil-arte": 7, "fil-argumentacion": 4, "fil-etica-teorias": 5, "fil-poder": 6, "fil-arte-sociedad": 7
  };
  var MAP_TEMA = {
    "map-descartes": 14, "map-kant": 19, "map-critica-razon-pura": 19, "map-ilustracion-modernidad": 18, "map-san-agustin": 12, "map-platon": 6,
    "map-aristoteles": 7, "map-helenismo": 10, "map-nietzsche": 21, "map-hegel": 21, "map-ideologia": 22, "map-presocraticos": 4, "map-sofistas-socrates": 5,
    "map-medieval": 11, "map-etica-clasica": 8, "map-politica-clasica": 9, "map-renacimiento": 13, "map-sustancias-modernas": 15, "map-contrato-social": 16,
    "map-utilitarismo-liberalismo": 17, "map-maestros-sospecha": 21, "map-critica-capitalismo": 22, "map-postmodernidad": 23, "map-filosofia-lenguaje": 24,
    "map-existencialismo": 25, "map-feminismo-beauvoir": 26,
    "map-filosofia-ciencia": 3, "map-ser-humano": 2, "map-conocimiento": 3, "map-racionalismo-empirismo": 3, "map-fil-que-es": 1, "map-fil-mito-logos": 1, "map-fil-cuerpo-mente": 2,
    "map-fil-logica": 4, "map-fil-etica": 5, "map-fil-politica": 6, "map-fil-estetica": 7, "map-fil-metafisica": 3.5
  };
  var IG_TEMA = { "hf-platon": 6, "hf-kant": 19, "hf-helenismo": 10, "hf-beauvoir": 26, "hf-posmodernidad": 23,
    "fil-t1": 1, "fil-ramas": 1, "fil-mito-logos": 1, "fil-t2": 2, "fil-natur-cultura": 2, "fil-cuerpo-mente": 2, "fil-t3": 3, "fil-conocer": 3, "fil-posverdad": 3,
    "fil-t4": 4, "fil-t5": 5, "fil-t6": 6, "fil-t7": 7, "fil-metafisica": 3.5 };
  var ESQ_REL = { AP: 6, AA: 7, B1: 12, BH: 14, CK: 19, CC: 21, CM: 21, CF: 21, C5A: 22, C5B: 27, CdB: 26, C8: 25, C8K: 25, C6: 23, C7: 24, C9: 26 };
  /* (07-10) temas sin número del bloque A (AP: Platón entero, AA: Aristóteles entero): van entre los temas 5 y 6
     y comparten los recursos de los temas 6 y 7. */
  var SIGLA_TEMA = { AP: 6, AA: 7, M: 3.5 }, SIGLA_ORDEN = { AP: 5.1, AA: 5.2, M: 3.5 };  /* M: metafísica de Filosofía 1.º, entre T3 y T4 */
  function esAnexo(o){ return !!o && typeof o.temaN === "number"; }
  var THEORY_EXTRA = { "fil-presocraticos": 1, "fil-comunidades-perseguidos": 1, "hf-comunidades-perseguidos": 1, "fil-helenismo": 5, "fil-discriminacion": 6, "hf-descartes-makro": 14, "hf-platon-superficie": 6, "hf-descartes-simulacion": 14, "hf-platon-agustin": 11, "hf-platon-prejuicio": 6, "hf-montaigne-ensayos": 13, "hf-renacimiento-magia": 13, "fil-spinoza-sistema": 1, "fil-grandes-preguntas": 1, "fil-marxismos": 6, "hf-marxismos": 21, "hf-spinoza-sistema": 15, "hf-kant-juicios": 19, "hf-kant-poetas": 19, "hf-marx-biblioteca": 21, "hf-spinoza-universal": 15, "hf-corazon-piedra": 21, "hf-aristoteles-arabe": 12, "hf-verdad-no-contradice": 12, "hf-islam-ideas": 12, "hf-toledo-traductores": 12, "hf-judios-andalus": 12, "hf-beefs": 2, "hf-euskal-herria": 1, "hf-confucio": 1, "hf-schmitt": 16, "fil-montaigne-ensayos": 1 };
  /* (18-10) un anexo que no está en la lista va a su tema por su temaN (antes salía suelto al principio de la ficha) */
  function extraDe(key, o){ return THEORY_EXTRA[key] || (esAnexo(o) ? o.temaN : 0); }
  /* unidades del curso de 2.º ESO («Clases») → tema */
  var CLASES_TEMA = { 1: "pensar", 2: "falacias", 3: "argumentar", 4: "falacias", 5: "falacias", 6: "medios", 7: "dialogo", 8: "sesgos", 9: "medios", 10: "pensar",
    11: "dialogo", 12: "grupo", 13: "huella", 14: "argumentar", 19: "huella", 20: "medios" };
  /* diccionario de HF: la unidad del libro (código) → tema, vía QUIZ_TEMA («ltfh-<código>»); los que no tienen test en el libro, a mano */
  var GLO_UNIDAD = { A5: 5, A4: 4, "A1-A2": 1, A3: 3, DM: 14 };
  var GLO_IPC = [["pensar", "pensar"], ["argument", "argumentar"], ["falacia", "falacias"], ["sesgo", "sesgos"], ["diálogo", "dialogo"], ["dialogo", "dialogo"], ["medio", "medios"], ["publicidad", "medios"], ["grupo", "grupo"], ["huella", "huella"]];
  function gloTema(g){
    if (g.subject === "ipc" && g.k) return g.k;   /* (24-10) clave de tema que no se traduce (tools/build_diccionario_ipc.js) */
    if (g.subject === "ipc"){ var tt = String(g.tema || "").toLowerCase(); for (var i = 0; i < GLO_IPC.length; i++) if (tt.indexOf(GLO_IPC[i][0]) >= 0) return GLO_IPC[i][1]; return null; }
    if (g.subject === "hf"){ var Q = coll("QUIZ_TEMA"), c = Q && Q["ltfh-" + g.unidad], m = c && String(c).match(/^T(\d+)$/); return m ? +m[1] : (GLO_UNIDAD[g.unidad] || null); }
    return temaNum(g);
  }

  function temaOf(go_, key, o){
    if (o && o.subject === "ipc") return ipcTema(key);
    switch (go_){
      case "teoria": return extraDe(key, o) || (o && o.sigla ? SIGLA_TEMA[o.sigla] || null : temaNum(o));
      case "tarjetas": return DECK_TEMA[key] || null;
      case "cuestionarios": { var Q = coll("QUIZ_TEMA"), m = Q && Q[key] && String(Q[key]).match(/^T(\d+)$/); return m ? +m[1] : (Q && Q[key] === "M" ? 3.5 : null); }
      case "mapas": return MAP_TEMA[key] || null;
      case "infografias": { var A = coll("TEMA_ALIAS"); return IG_TEMA[key] || (A && A[key]) || null; }
      case "esquemas": {
        var m1 = /^ds-([ABC])(\d+)$/.exec(key); if (m1) return m1[1] === "A" ? +m1[2] : m1[1] === "B" ? 10 + +m1[2] : 17 + +m1[2];
        if (/^FIL-M-/.test(key)) return 3.5;   /* (08-10) tema M de 1.º */
        var m2 = /^FIL-(T(\d)|PRE|HEL|TA)-/.exec(key); if (m2) return m2[2] ? +m2[2] : m2[1] === "PRE" ? 1 : m2[1] === "HEL" ? 5 : 4;
        var m3 = /^([A-Za-z0-9]+)-REL-/.exec(key); return (m3 && ESQ_REL[m3[1]]) || null;
      }
      /* (20-10, F9a) lecturas del tema M de 1.º: «Filosofía · M (…)», como en lecRama de lecturasview.js */
      case "lecturas": case "comentario": return o && /·\s*M(?:\s|$|\()/.test(String(o.tema || "")) ? 3.5 : temaNum(o);
    }
    return null;
  }
  var COLL = { teoria: "THEORY", tarjetas: "DECKS", cuestionarios: "QUIZZES", mapas: "MAPS", infografias: "INFOGRAFIAS", esquemas: "ESQUEMAS", lecturas: "LECTURAS", comentario: "COMENTARIO" };
  /* claves de una colección de esa materia y tema, en el orden de definición */
  function keysOf(go_, subject, tema){
    var c = coll(COLL[go_]); if (!c || !view(go_)) return [];
    var out = Object.keys(c).filter(function(k){ var o = c[k]; return o && o.subject === subject && temaOf(go_, k, o) === tema; });
    if (go_ === "cuestionarios" && fn("quizTipo")) out.sort(function(a, b){ return quizTipo(a) - quizTipo(b); });   // banco, breve, libro
    if (go_ === "tarjetas") out = out.filter(function(k){ return c[k].tipo !== "frases"; });
    return out;
  }
  function labelOf(go_, key){
    var c = coll(COLL[go_]), o = c && c[key]; if (!o) return key;
    var s = strip(o.name || o.label || o.title || key);
    /* nombres de baraja/cuestionario con prefijo de materia: «Filosofía 1.º · X» → «X» (el tema ya lo dice el bloque) */
    return s.replace(/^(Filosofía 1\.º|Filosofia 1\.º?|Pensamiento crítico|Pentsamendu kritikoa)\s*·\s*/, "").replace(/\((Filosofía 1\.º|Filosofia 1\.º?)\s*·\s*/, "(");
  }
  /* tamaño del recurso (tarjetas o preguntas) para el bloque del final del tema */
  function sizeOf(go_, key){
    var c = coll(COLL[go_]), o = c && c[key]; if (!o) return "";
    if (go_ === "tarjetas" && o.cards) return t("nTarjetas", { n: o.cards.length });
    if (go_ === "cuestionarios" && o.items) return t("nPreguntas", { n: o.items.length });
    return "";
  }

  /* ---------- itinerario de un tema ---------- */
  function sid(n){ return "S" + String(n).padStart(2, "0"); }
  function unidadesDe(tema){
    var C = G("CURSO"); if (!coll("CLASES_IDX") || !Array.isArray(C) || !view("clases")) return [];
    return C.filter(function(u){ return CLASES_TEMA[u.unidad] === tema && u.sesiones && u.sesiones.length; })
      .map(function(u){ return { go: "clases", arg: sid(u.sesiones[0].n), label: t("unidad", { n: u.unidad }) + " · " + strip(String(u.titulo).replace(/\*\*/g, "")) }; });
  }
  function items(go_, subject, tema){ return keysOf(go_, subject, tema).map(function(k){ return { go: go_, arg: k, label: labelOf(go_, k), size: sizeOf(go_, k) }; }); }
  function dilemasDe(teoriaKeys){
    var D = G("DILEMAS"), out = []; if (!Array.isArray(D) || !view("dilemas") || !teoriaKeys.length) return out;
    D.forEach(function(d){ if (d && d.debate && teoriaKeys.indexOf(d.debate.unidad) >= 0) out.push({ go: "dilemas", arg: d.id, label: strip(d.titulo) }); });
    return out;
  }
  /* (01-10) itinerarios de «Pistas» (pistas_uhs.js): cada uno declara su unidad de teoría (unidad) */
  function pistasDe(teoriaKeys){
    var P = G("PISTAS"), out = []; if (!Array.isArray(P) || !view("pistas") || !teoriaKeys.length) return out;
    P.forEach(function(p){ if (p && teoriaKeys.indexOf(p.unidad) >= 0) out.push({ go: "pistas", arg: p.id, label: strip(p.titulo) }); });
    return out;
  }
  function conceptosDe(subject, tema){
    var Gl = G("DICCIONARIO"); if (!Array.isArray(Gl) || !view("diccionario")) return [];
    return Gl.filter(function(g){ return g && g.subject === subject && g.t && gloTema(g) === tema; }).map(function(g){ return { t: strip(g.t), def: strip(g.def) }; });
  }
  /* (11-10) fichas de época (epocas_fichas.js, vista Biografías): la de un tema de HF (con / con2 por temasHF) y, en
     Filosofía 1.º, las de las teorías con contenido histórico (EPOCA_FIL). Se enlazan al pie de la teoría, en la tira
     «De este tema» de Tarjetas, Cuestionarios, Lecturas e Infografías, en el Diccionario y en Cronogramas. */
  var EPOCA_FIL = { "fil-presocraticos": ["ant"], "fil-spinoza-sistema": ["mod"], "fil-montaigne-ensayos": ["ren"], "fil-marxismos": ["con", "con2"], "fil-t6": ["con", "con2"], "fil-grandes-preguntas": "*" };
  function epocaFicha(subject, tema){
    var EF = G("EPOCAS_FICHAS"); if (!EF || subject !== "hf" || typeof tema !== "number") return null;
    var porTema = Object.keys(EF).filter(function(k){ return (EF[k].temasHF || []).indexOf(tema) >= 0; })[0];
    var epo = porTema || (window.Epocas && window.Epocas.epocaDeTema ? window.Epocas.epocaDeTema(tema) : null);
    return epo && EF[epo] ? epo : null;
  }
  function epocasDeTeoria(key, subject, tema){
    var EF = G("EPOCAS_FICHAS"); if (!EF || !view("biografias")) return [];
    var m = EPOCA_FIL[key]; if (m) return (m === "*" ? Object.keys(EF) : m).filter(function(k){ return EF[k]; });
    var e = epocaFicha(subject, tema); return e ? [e] : [];
  }
  function nombreEpoca(k){ return typeof bioNombreFicha === "function" ? bioNombreFicha(k) : k; }
  function epocaItem(k){ return { go: "biografias", arg: "epoca-" + k, label: t("epocaDe", { e: nombreEpoca(k) }) }; }
  /* pasos (para la tira de una línea de Tarjetas, Cuestionarios y Clases) */
  function itinerario(subject, tema){
    var pre = function(arr, key){ return arr.map(function(r){ r.label = t(key) + " · " + r.label; return r; }); };
    var teoria = items("teoria", subject, tema), clases = subject === "ipc" ? unidadesDe(tema) : [];
    var repaso = [].concat(pre(items("infografias", subject, tema), "infografia"), pre(items("mapas", subject, tema), "mapa"), pre(items("esquemas", subject, tema), "esquema"),
      pre(items("lecturas", subject, tema), "lectura"), pre(items("comentario", subject, tema), "comentario"), pre(dilemasDe(teoria.map(function(x){ return x.arg; })), "dilema"));
    var pasos = [];
    if (teoria.length) pasos.push({ id: "teoria", label: t("p1"), short: t("s1"), items: teoria.concat(clases) });
    else if (clases.length) pasos.push({ id: "clases", label: t("p1clases"), short: t("s1clases"), items: clases });
    var tarj = items("tarjetas", subject, tema), cues = items("cuestionarios", subject, tema);
    if (tarj.length) pasos.push({ id: "tarjetas", label: t("p2"), short: t("s2"), items: tarj });
    if (cues.length) pasos.push({ id: "cuestionarios", label: t("p3"), short: t("s3"), items: cues });
    if (repaso.length) pasos.push({ id: "repaso", label: t("p4"), short: t("s4"), items: repaso });
    return pasos;
  }
  function hereIndex(pasos, here){
    var hereIdx = -1;
    pasos.forEach(function(p, i){ if (hereIdx < 0 && p.items.some(function(x){ return x.go === here.go && (here.arg == null || String(x.arg) === String(here.arg)); })) hereIdx = i; });
    if (hereIdx < 0 && here.go) pasos.forEach(function(p, i){ if (hereIdx < 0 && p.id === here.go) hereIdx = i; });
    return hereIdx;
  }
  function btn(x, cls){ if (x.href) return '<a class="' + (cls || "itin-lnk") + '" href="' + esc(x.href) + '">' + esc(x.label) + '</a>';   /* (22-10) enlace profundo (#vista/arg) */
    return '<button class="' + (cls || "itin-lnk") + '" type="button" data-igo="' + esc(x.go) + '" data-iarg="' + esc(x.arg) + '">' + esc(x.label) + (x.size ? ' <i>' + esc(x.size) + '</i>' : '') + '</button>'; }
  /* Tira de UNA línea «De este tema» (Tarjetas, Cuestionarios, Clases): un enlace por paso o por tipo de repaso. */
  function stripHtml(pasos, here, extra){
    var hereIdx = hereIndex(pasos, here), out = [];
    pasos.forEach(function(p, i){
      if (i === hereIdx) return;
      if (p.id === "repaso"){
        var seen = {};
        p.items.forEach(function(x){ var tipo = x.label.split(" · ")[0]; if (seen[tipo]) return; seen[tipo] = 1; out.push({ go: x.go, arg: x.arg, label: tipo }); });
      } else out.push({ go: p.items[0].go, arg: p.items[0].arg, label: (p.short || p.label) + (p.items.length > 1 ? " (" + p.items.length + ")" : "") });
    });
    if (extra) out = out.concat(extra);
    if (!out.length) return "";
    return '<div class="toolrow related-row itin-strip"><span class="flabel" style="align-self:center">' + esc(t("deEsteTema")) + '</span>' +
      out.map(function(x){ return '<button class="btn" type="button" data-igo="' + esc(x.go) + '" data-iarg="' + esc(x.arg) + '">' + esc(x.label) + '</button>'; }).join(" ") + '</div>';
  }
  /* Barra de una línea con los pasos (vistas de PAU). */
  function barHtml(pasos, here, kick, aria, color){
    var hereIdx = hereIndex(pasos, here);
    return '<nav class="itin itin-bar" style="--c:' + color + '" aria-label="' + esc(aria) + '"><span class="itin-kick">' + esc(kick) + '</span><ol class="itin-pills">' +
      pasos.map(function(p, i){
        var f = p.items[0], isHere = i === hereIdx;
        return '<li><button class="itin-pill' + (isHere ? ' here' : '') + '" type="button" data-igo="' + esc(f.go) + '" data-iarg="' + esc(f.arg) + '"' + (isHere ? ' aria-current="step"' : '') +
          ' title="' + esc(p.label) + '"><span class="itin-n" aria-hidden="true">' + (i + 1) + '</span>' + esc(p.short || p.label) + (p.items.length > 1 ? ' <i>' + p.items.length + '</i>' : '') + '</button></li>';
      }).join("") + '</ol></nav>';
  }
  /* Bloque completo de pasos (itinerario PAU en la ficha de la materia). Sin botón de arranque: el profesor no lo quiere. */
  function stepsHtml(pasos, here){
    var hereIdx = hereIndex(pasos, here);
    return '<ol class="itin-steps">' + pasos.map(function(p, i){
      var isHere = i === hereIdx;
      return '<li class="itin-step' + (isHere ? ' here' : '') + '"><span class="itin-n" aria-hidden="true">' + (i + 1) + '</span><div class="itin-body">' +
        '<span class="itin-l">' + esc(p.label) + (isHere ? ' <i class="itin-here">' + esc(t("aqui")) + '</i>' : '') + '</span>' +
        '<div class="itin-links">' + p.items.map(function(x){ return btn(x); }).join("") + '</div></div></li>';
    }).join("") + '</ol>';
  }

  /* ---------- temas de la materia, en orden ---------- */
  function temasDe(subject, conAnexos){
    var T = coll("THEORY"); if (!T || !view("teoria")) return [];
    /* (07-10) los anexos no forman parte de la secuencia «Tema anterior / siguiente»: se abren desde su tema
       y desde la lista de temas de la ficha (conAnexos) */
    var ks = Object.keys(T).filter(function(k){ return T[k].subject === subject && (conAnexos || !esAnexo(T[k])); });
    var orden = function(k){ return T[k].sigla ? SIGLA_ORDEN[T[k].sigla] || 0 : temaOf("teoria", k, T[k]) || 0; };
    if (subject !== "ipc") ks.sort(function(a, b){ return (orden(a) - orden(b)) || ((extraDe(a, T[a]) ? 1 : 0) - (extraDe(b, T[b]) ? 1 : 0)); });
    return ks;
  }

  /* ---------- navegación ---------- */
  var LOADERS = Object.assign({ disertaciones: "loadDisert", comentario: "loadComentario" }, window.VIEW_LOADERS || {});
  function go(view_, arg){
    if (!view(view_)) return;
    if (view_ === "dilemas" && fn("goRelated")) return goRelated("dilemas", arg);
    if (fn("show")) show(view_);
    if (view_ === "diccionario"){   // concepto del final del tema → Diccionario con el término buscado
      var inp = document.querySelector("#diccionario .dicsearch, #diccionario input[type=search], #diccionario input[type=text]");
      if (inp && arg){ inp.value = arg; try { inp.dispatchEvent(new Event("input", { bubbles: true })); } catch (e){} }
      return;
    }
    var f = LOADERS[view_];
    if (arg != null && arg !== "" && f && fn(f)) window[f](arg);
  }
  document.addEventListener("click", function(e){
    var b = e.target.closest && e.target.closest("[data-igo]"); if (!b) return;
    e.preventDefault(); go(b.dataset.igo, b.dataset.iarg);
  });

  /* ---------- final de cada tema de Teoría ---------- */
  /* (12-10, rediseño Lote 3 · H0) temas de HF con lectura PAU: T6 (República VII), T14 (Discurso II-IV),
     T18 (¿Qué es la Ilustración?), T23 (Ecce Homo) y T26 (El segundo sexo). Saca la insignia «Lectura PAU». */
  var PAU_TEMAS = { 6: 1, 14: 1, 18: 1, 21: 1, 26: 1 };   /* (20-10) el profesor: la lectura PAU de Ecce Homo cuelga del tema 21, no del 23 */
  /* (18-10, P-025 · plan del agente 47, Lote A) piezas que ya existían y faltaban en la caja: cronograma (HF), modelo de
     disertación, comparativas (temas con lectura PAU), Rincón de lógica (1.º T4) y, en «Ampliar», polémicas, comunidades,
     perseguidos, debates del Duelo y juegos. Decisiones del profesor del 18-10 (docs/36): el modelo «máquina» va en el T2
     de 1.º y Rayuela en todos los temas de 1.º. Los rótulos son los del menú y los de los datos: no hay texto nuevo que traducir. */
  /* cronogramas sin unidad del libro en el código: a mano; los demás (A9, B2, B7, C5…) por su unidad, como cronoFichasHtml */
  var CRONO_TEMA = { "A1-OS": [1], "A2-OS": [2], "A-GRECIA-KRO-01": [4], "A-GRECIA-KRO-02": [5, 6], "A-GRECIA-KRO-03": [10],
    "B-MED": [11, 12], "B-REN": [13], "B-MOD": [14, 15], "B-ILU": [18], "C-XIX": [21], "B2": [12], "C5": [22] };
  function cronosDe(subject, tema){
    var C = G("CRONOGRAMAS"); if (subject !== "hf" || !Array.isArray(C) || !view("cronogramas")) return [];
    return C.filter(function(c){
      var code = String(c.code || c.id || ""), pref = Object.keys(CRONO_TEMA).filter(function(p){ return code === p || code.indexOf(p + "-") === 0; })
        .sort(function(a, b){ return b.length - a.length; })[0], ts;
      if (pref) ts = CRONO_TEMA[pref];
      else { var n = gloTema({ subject: subject, unidad: code.split("-")[0] }); ts = typeof n === "number" ? [n] : []; }   /* aquí subject es siempre "hf" (sin literal: check_builds lo tomaría por un dato de otra materia) */
      return ts.indexOf(tema) >= 0;
    }).map(function(c){ return { go: "cronogramas", arg: c.id, label: strip(c.title) }; });
  }
  var DISERT_TEMA = { "modelo-platon": [6, 9], "modelo-kant": [20], "modelo-nietzsche": [21], "modelo-medieval": [12], "modelo-descartes": [14], "modelo-beauvoir": [26],
    "fil-modelo-filosofia": [1], "fil-modelo-naturaleza": [2], "fil-modelo-maquina": [2], "fil-modelo-vidabuena": [5], "fil-modelo-justicia": [6], "fil-modelo-sentidos": [3], "fil-modelo-arte": [7], "fil-modelo-materia": [3.5] };
  function disertDe(subject, tema){
    var D = coll("DISERTACIONES"); if (!D || !view("disertaciones")) return [];
    return Object.keys(DISERT_TEMA).filter(function(k){ return D[k] && D[k].subject === subject && DISERT_TEMA[k].indexOf(tema) >= 0; })
      .map(function(k){ return { go: "disertaciones", arg: k, label: strip(D[k].title) }; });
  }
  function comparativasDe(subject, tema){
    var Pa = coll("PAU"); if (subject !== "hf" || !PAU_TEMAS[tema] || !Pa || !Pa["comparativas-temas"] || !view("pau")) return [];
    return [{ go: "pau", arg: "comparativas-temas", label: strip(Pa["comparativas-temas"].title) }];
  }
  /* rótulo de una sección tal como lo pone el menú (ya traducido); si no está en el menú, el de TXT */
  function navLabel(v, k){ var b = document.querySelector('#tabs [data-view="' + v + '"]'); return b ? strip(b.textContent) : t(k || v); }
  /* (22-10, curar_webs lote 2) en HF el Rincón de lógica no está en el menú (opción A del profesor, docs/36): solo lo enlazan
     los temas que lo necesitan, y a la mesa o pestaña concreta (enlace profundo): los juicios de Kant (T19) y los silogismos (AA). */
  /* (22-10, T9 de docs/nube/logica_huecos_traspaso; enlaces y niveles de la jefa de lógica) siete temas: cada enlace
     [ruta, rótulo, niveles del itinerario (docs/39 §3)], y tras él «Itinerario: nivel N» (#logica/itinerario/N); sin nivel = rama lateral.
     Rótulos ya traducidos: LOG_TXT (por ui), LAB.t, LABMP.t, PARADOJAS y PARADOJAS_TXT (por tm); no hay cadenas nuevas.
     El nivel de cada paradoja es el de su ficha (paradojas.js). En hf-kant, desde la v264, las antinomias (quinto mundo de la mesa Spinoza; no hay ruta a un mundo, se enlaza la mesa). */
  var LOGICA_HF = {
    "hf-metodos": [["inferencia", "tabInferencia", [4]], ["falacias", "tabFalacias", [7]], ["induccion", "mesaInduccion", []]],
    "hf-aa": [["silogismos", "tabSilog", [1, 2]], ["cuadrado", "tabCuadrado", [6]]],
    "hf-cinco-vias": [["mundos", "mp:mundoVias", [11]], ["paradojas/primermotor", "par:primermotor", [11]], ["deduccion", "mesaDeduccion", [4]]],
    "hf-descartes-makro": [["arbol", "mesaArbol", [7]], ["demos", "mesaDemos", [9]]],
    "hf-kant": [["kant", "mesaKant", [9]], ["mundos", "mp:mundoAnt", [11]]],
    "hf-kant-juicios": [["kant", "mesaKant", [9]], ["cuantificadores", "tabCuantificadores", [6]]],
    "hf-analitica": [["tablas", "tabTablas", [3]], ["cuantificadores", "tabCuantificadores", [6]], ["paradojas/barbero", "par:barbero", [5]]]
  };
  function logRot(k){
    var m = /^(mp|par):(.+)$/.exec(k);
    if (m && m[1] === "mp") return (typeof LABMP !== "undefined" && LABMP.t && LABMP.t[m[2]]) || m[2];
    if (m) { var p = typeof PARADOJAS !== "undefined" ? PARADOJAS.filter(function(x){ return x.id === m[2]; })[0] : null; return p ? strip(p.titulo) : m[2]; }
    return (typeof LOG_TXT !== "undefined" && LOG_TXT[k]) || (typeof LAB !== "undefined" && LAB.t && LAB.t[k]) || k;
  }
  function logicaDe(subject, tema, key){
    if (!view("logica")) return [];
    if (subject === "fil") return tema === 4 ? [{ go: "logica", arg: "portada", label: navLabel("logica", "logica") }] : [];
    var c = LOGICA_HF[key]; if (!c) return [];
    var fmt = typeof PARADOJAS_TXT !== "undefined" ? PARADOJAS_TXT.lineaNivel : typeof LOG_ITIN !== "undefined" ? LOG_ITIN.nivel : "{n}";
    return c.reduce(function(a, p){
      return a.concat([{ href: "#logica/" + p[0], label: logRot(p[1]) }], p[2].map(function(n){ return { href: "#logica/itinerario/" + n, label: fmt.replace("{n}", n), nivel: true }; }));
    }, []);
  }
  /* polémicas, comunidades y perseguidos declaran sus temas (claves de THEORY) en «temas» */
  function porTemas(name, go_, teoriaKeys, label){
    var A = G(name); if (!Array.isArray(A) || !view(go_) || !teoriaKeys.length) return [];
    return A.filter(function(x){ return x && (x.temas || []).some(function(k){ return teoriaKeys.indexOf(k) >= 0; }); })
      .map(function(x){ return { go: go_, arg: x.id, label: label(x) }; });
  }
  /* debates del Duelo: los «pol-<id>» heredan los temas de su polémica; solo los del nivel de esta web */
  function dueloDe(subject, polIds){
    var D = G("DUELO_TEMAS"); if (!Array.isArray(D) || !view("duelo") || !polIds.length) return [];
    return D.filter(function(d){ return d && /^pol-/.test(d.id) && polIds.indexOf(d.id.slice(4)) >= 0 && (d.nivel || []).indexOf(subject) >= 0; })
      .map(function(d){ return { go: "duelo", arg: subject + "/" + d.id, label: strip(d.claim) }; });
  }
  var JUEGOS_TEMA = { hf: { 4: ["universo"], 5: ["palabra"], 6: ["republica", "universo"], 7: ["universo"], 8: ["eudaimonia"], 9: ["republica", "palabra"], 10: ["universo"], 13: ["universo", "palabra"], 15: ["leibniz", "afectos"] }, fil: { 1: ["palabra"], 2: ["universo"], 3: ["universo"], 3.5: ["universo"], 4: ["leibniz", "palabra"], 7: ["palabra"] } };   // (19-10) + universo, palabra; (20-10) + afectos
  function juegosDe(subject, tema){
    var js = ((JUEGOS_TEMA[subject] || {})[tema] || []).slice();
    if (subject === "fil") js.push("rayuela");   /* decisión del profesor (18-10): Rayuela en todos los temas de 1.º */
    return js.filter(function(v){ return view(v); }).map(function(v){ return { go: v, arg: "", label: navLabel(v, "juegos") }; });
  }
  /* (19-10) puentes 1.º <-> 2.º (informe fil1->hf2 §5.2; borrador de DSH, visto bueno de la 50). Muestra aprobada por el profesor; extendido a todos los temas del mapa (borrador 3 de DSH).
     En la web completa el enlace abre el tema; en las webs del alumnado, la otra web publicada en la misma lengua. */
  /* (25-10) remapeo de los puentes sobre la teoría nueva de 1.º (los 94 de la opción A, aprobada por el profesor): borrador de Ollama revisable; textos en ui/<lang>.json. Ver 1_vivo/encargos/puentes_remapeo_2026-10-25 */
  var PUENTES = {
    "fil-t1": [
      {"k":"hf-historicidad","n":1,"tit":"Historicidad y universalidad de la filosofía","txt":"En 1.º has visto que la filosofía es una forma de saber que se pregunta por cuestiones generales."},
      {"k":"hf-mito","n":3,"tit":"El surgimiento de la filosofía: del mito al logos","txt":"En 1.º has visto que la filosofía nace como paso del mito al logos."},
      {"k":"hf-preso","n":4,"tit":"El problema de la realidad en los presocráticos","txt":"En 1.º has visto que los primeros filósofos buscaron explicaciones racionales de la naturaleza."},
      {"k":"hf-platon","n":6,"tit":"Platón: la teoría de las Ideas y la República","txt":"En 1.º has visto que hay distintos tipos de saber y que no todos valen lo mismo."},
      {"k":"hf-metodos","n":2,"tit":"Los métodos de la filosofía","txt":"En 1.º has visto que el saber filosófico es racional, crítico y argumentado."},
      {"k":"hf-ilustracion","n":18,"tit":"El proyecto ilustrado: potencia y límites de la razón","txt":"En 1.º has visto que la filosofía rechaza el dogmatismo y examina creencias."},
      {"k":"hf-kant","n":19,"tit":"La filosofía crítica de Kant y el problema de la metafísica","txt":"En 1.º has visto que la filosofía se divide en ramas según sus preguntas."},
      {"k":"hf-metafisica","n":15,"tit":"El debate metafísico moderno: dualismo y materialismo","txt":"En 1.º has visto que la metafísica estudia la realidad y el ser."},
      {"k":"hf-etica-deber","n":20,"tit":"Éticas de la felicidad y éticas del deber: Kant frente al utilitarismo","txt":"En 1.º has visto que la ética es una rama práctica de la filosofía."},
      {"k":"hf-analitica","n":24,"tit":"La filosofía analítica: Wittgenstein y el giro lingüístico","txt":"En 1.º has visto que la filosofía dialoga con la ciencia y se ocupa de sus fundamentos."},
      {"k":"hf-modernidad","n":13,"tit":"El nacimiento de la modernidad: Renacimiento, protestantismo y revolución científica","txt":"En 1.º has visto que la ciencia estudia parcelas comprobables y la filosofía pregunta por fundamentos."},
      {"k":"hf-siglo21","n":27,"tit":"La sociedad actual: retos del siglo XXI","txt":"En 1.º has visto que la filosofía cumple funciones críticas, orientadoras y de análisis."}
    ],
    "hf-historicidad": [
      {"k":"fil-t1","n":1,"tit":"¿Qué es la filosofía?","txt":"Ya viste en 1.º qué es la filosofía; aquí distingues su historicidad y su universalidad."},
      {"k":"fil-t2","n":2,"tit":"¿Qué es el ser humano?","txt":"Ya viste en 1.º la pregunta por el ser humano; aquí la tratas como pregunta universal que reaparece en cada contexto."},
      {"k":"fil-metafisica","n":"M","tit":"La realidad: ¿qué hay y cómo es? (Metafísica)","txt":"Ya viste en 1.º que preguntar qué existe es inevitable; aquí ves cómo esa pregunta reaparece históricamente."},
      {"k":"fil-t5","n":5,"tit":"Las preguntas de la ética","txt":"Ya viste en 1.º la pregunta por la vida buena; aquí ves por qué reaparece en contextos distintos."}
    ],
    "hf-mito": [
      {"k":"fil-t1","n":1,"tit":"¿Qué es la filosofía?","txt":"Ya viste en 1.º el paso del mito al logos; aquí estudias sus condiciones históricas y sus tensiones."},
      {"k":"fil-t3","n":3,"tit":"¿Qué podemos conocer?","txt":"Ya viste en 1.º la afinidad entre ciencia y filosofía; aquí la rastreas en el paso del mito al logos."}
    ],
    "hf-preso": [
      {"k":"fil-t1","n":1,"tit":"¿Qué es la filosofía?","txt":"Ya viste en 1.º el origen racional de la filosofía; aquí concretas esa búsqueda en el problema de la physis y el arché."},
      {"k":"fil-t2","n":2,"tit":"¿Qué es el ser humano?","txt":"Ya viste en 1.º el enigma de la identidad; aquí lo conectas con el problema presocrático del cambio."},
      {"k":"fil-metafisica","n":"M","tit":"La realidad: ¿qué hay y cómo es? (Metafísica)","txt":"Ya viste en 1.º la oposición apariencia/realidad; aquí la sitúas en el problema presocrático del ser."},
      {"k":"fil-t7","n":7,"tit":"¿Qué es el arte? (Estética)","txt":"Ya viste en 1.º la belleza como número; aquí retomas a los pitagóricos como filósofos de la physis."}
    ],
    "hf-platon": [
      {"k":"fil-t1","n":1,"tit":"¿Qué es la filosofía?","txt":"Ya viste en 1.º los tipos de saber; aquí distingues opinión y ciencia en Platón."},
      {"k":"fil-t2","n":2,"tit":"¿Qué es el ser humano?","txt":"Ya viste en 1.º la separación cuerpo-alma; aquí Platón la fundamenta en su teoría de las Ideas."},
      {"k":"fil-t3","n":3,"tit":"¿Qué podemos conocer?","txt":"Ya viste en 1.º la tensión sentidos/razón; aquí la explicas desde la teoría platónica de las Ideas."},
      {"k":"fil-metafisica","n":"M","tit":"La realidad: ¿qué hay y cómo es? (Metafísica)","txt":"Ya viste en 1.º la sospecha sobre los sentidos; aquí Platón la transforma en teoría de las Ideas."},
      {"k":"fil-t5","n":5,"tit":"Las preguntas de la ética","txt":"Ya viste en 1.º el objetivismo moral; aquí Platón le da su fundamento metafísico."},
      {"k":"fil-t6","n":6,"tit":"La vida en sociedad (Filosofía política)","txt":"Ya viste en 1.º la República como ciudad justa; aquí conocerás su fundamento: el mundo de las Ideas."},
      {"k":"fil-t7","n":7,"tit":"¿Qué es el arte? (Estética)","txt":"Ya viste en 1.º que la belleza podía entenderse como algo objetivo; aquí Platón la eleva a Idea."}
    ],
    "hf-metodos": [
      {"k":"fil-t1","n":1,"tit":"¿Qué es la filosofía?","txt":"Ya viste en 1.º los rasgos del saber filosófico; aquí los conviertes en métodos: argumento, interpretación e investigación."},
      {"k":"fil-t4","n":4,"tit":"Lógica y argumentación","txt":"Ya viste en 1.º que Aristóteles fundó la lógica; aquí sitúas ese método dentro del conjunto de la filosofía."}
    ],
    "hf-ilustracion": [
      {"k":"fil-t1","n":1,"tit":"¿Qué es la filosofía?","txt":"Ya viste en 1.º la actitud crítica; aquí la Ilustración la convierte en proyecto público de la razón."},
      {"k":"fil-t3","n":3,"tit":"¿Qué podemos conocer?","txt":"Ya viste en 1.º la idea de no dejarse engañar; aquí la desarrollas como lema ilustrado del sapere aude."},
      {"k":"fil-t5","n":5,"tit":"Las preguntas de la ética","txt":"Ya viste en 1.º la autonomía moral; aquí la enmarcas en el proyecto ilustrado."},
      {"k":"fil-t6","n":6,"tit":"La vida en sociedad (Filosofía política)","txt":"Ya viste en 1.º las olas feministas; aquí la primera exige su parte de la razón ilustrada."}
    ],
    "hf-kant": [
      {"k":"fil-t1","n":1,"tit":"¿Qué es la filosofía?","txt":"Ya viste en 1.º las ramas de la filosofía; aquí Kant las organiza en sus cuatro preguntas y examina la metafísica."},
      {"k":"fil-t3","n":3,"tit":"¿Qué podemos conocer?","txt":"Ya viste en 1.º la pregunta «¿qué podemos conocer?»; aquí la estudias como proyecto crítico de Kant."},
      {"k":"fil-metafisica","n":"M","tit":"La realidad: ¿qué hay y cómo es? (Metafísica)","txt":"Ya viste en 1.º qué es la metafísica; aquí Kant examina por qué no puede ser un saber científico."},
      {"k":"fil-t7","n":7,"tit":"¿Qué es el arte? (Estética)","txt":"Ya viste en 1.º el Kant estético; aquí lo enmarcas en su crítica de la razón."}
    ],
    "hf-metafisica": [
      {"k":"fil-t1","n":1,"tit":"¿Qué es la filosofía?","txt":"Ya viste en 1.º qué es la metafísica; aquí entras en el debate moderno entre dualismo y materialismo."},
      {"k":"fil-t2","n":2,"tit":"¿Qué es el ser humano?","txt":"Ya viste en 1.º la oposición dualismo/monismo; aquí la sitúas en la metafísica moderna."},
      {"k":"fil-metafisica","n":"M","tit":"La realidad: ¿qué hay y cómo es? (Metafísica)","txt":"Ya viste en 1.º los tipos de realidad; aquí ves el debate moderno entre dualismo y materialismo."}
    ],
    "hf-etica-deber": [
      {"k":"fil-t1","n":1,"tit":"¿Qué es la filosofía?","txt":"Ya viste en 1.º que la ética es una rama; aquí distingues éticas de la felicidad y éticas del deber."},
      {"k":"fil-t2","n":2,"tit":"¿Qué es el ser humano?","txt":"Ya viste en 1.º la idea de persona; aquí Kant la fundamenta como fin en sí misma y dignidad."},
      {"k":"fil-metafisica","n":"M","tit":"La realidad: ¿qué hay y cómo es? (Metafísica)","txt":"Ya viste en 1.º el problema de la libertad; aquí Kant la exige para la ética del deber."},
      {"k":"fil-t5","n":5,"tit":"Las preguntas de la ética","txt":"Ya viste en 1.º la autonomía kantiana; aquí la integras en la ética del deber."}
    ],
    "hf-analitica": [
      {"k":"fil-t1","n":1,"tit":"¿Qué es la filosofía?","txt":"Ya viste en 1.º la relación entre filosofía y ciencia; aquí estudias la filosofía de la ciencia y el giro lingüístico."},
      {"k":"fil-t2","n":2,"tit":"¿Qué es el ser humano?","txt":"Ya viste en 1.º que el lenguaje define a la persona; aquí estudias cómo el lenguaje ordena el mundo."},
      {"k":"fil-t3","n":3,"tit":"¿Qué podemos conocer?","txt":"Ya viste en 1.º la verdad de los juicios; aquí la analizas desde el lenguaje y la lógica."},
      {"k":"fil-t4","n":4,"tit":"Lógica y argumentación","txt":"Ya viste en 1.º la lógica de Frege y Russell; aquí entiendes por qué Russell quiso ordenar el mundo en palabras."},
      {"k":"fil-t5","n":5,"tit":"Las preguntas de la ética","txt":"Ya viste en 1.º el emotivismo de Ayer; aquí lo sitúas en la filosofía analítica."},
      {"k":"fil-t7","n":7,"tit":"¿Qué es el arte? (Estética)","txt":"Ya viste en 1.º el problema de definir el arte; aquí lo repiensas con Wittgenstein y los parecidos de familia."}
    ],
    "hf-modernidad": [
      {"k":"fil-t1","n":1,"tit":"¿Qué es la filosofía?","txt":"Ya viste en 1.º el diálogo filosofía-ciencia; aquí la revolución científica obliga a refundar el conocimiento moderno."},
      {"k":"fil-t3","n":3,"tit":"¿Qué podemos conocer?","txt":"Ya viste en 1.º el saber científico; aquí lo sitúas en la revolución científica moderna."}
    ],
    "hf-siglo21": [
      {"k":"fil-t1","n":1,"tit":"¿Qué es la filosofía?","txt":"Ya viste en 1.º para qué sirve la filosofía; aquí aplicas esas funciones a los retos del siglo XXI."},
      {"k":"fil-t2","n":2,"tit":"¿Qué es el ser humano?","txt":"Ya viste en 1.º que la cultura construye identidad y normas; aquí analizas las normas de género y cuerpo como construcciones sociales."},
      {"k":"fil-t3","n":3,"tit":"¿Qué podemos conocer?","txt":"Ya viste en 1.º el problema de la posverdad; aquí lo insertas en los retos del siglo XXI."},
      {"k":"fil-metafisica","n":"M","tit":"La realidad: ¿qué hay y cómo es? (Metafísica)","txt":"Ya viste en 1.º el problema de la mente artificial; aquí lo conectas con los retos del mundo virtual y los cuidados."},
      {"k":"fil-t5","n":5,"tit":"Las preguntas de la ética","txt":"Ya viste en 1.º la ética del cuidado; aquí la aplicas a los retos del siglo XXI."},
      {"k":"fil-t6","n":6,"tit":"La vida en sociedad (Filosofía política)","txt":"Ya viste en 1.º los retos globales; aquí se convierten en el mapa de problemas del siglo XXI."},
      {"k":"fil-t7","n":7,"tit":"¿Qué es el arte? (Estética)","txt":"Ya viste en 1.º la centralidad de la imagen; aquí la analizas como reto del siglo XXI."}
    ],
    "fil-t2": [
      {"k":"hf-antropologia","n":7,"tit":"La antropología clásica: Sócrates, Platón y Aristóteles","txt":"En 1.º has visto que el ser humano es un enigma para sí mismo."},
      {"k":"hf-existencialismo","n":25,"tit":"El existencialismo: Heidegger, Sartre y la filosofía española","txt":"En 1.º has visto que solo el ser humano se pregunta qué es."},
      {"k":"hf-historicidad","n":1,"tit":"Historicidad y universalidad de la filosofía","txt":"En 1.º has abierto una pregunta que no es solo científica."},
      {"k":"hf-sofistas","n":5,"tit":"La Ilustración griega: sofistas, Sócrates y Aspasia","txt":"En 1.º has distinguido entre rasgos naturales y rasgos culturales."},
      {"k":"hf-politica","n":9,"tit":"La política clásica: Platón y Aristóteles","txt":"En 1.º has visto que Aristóteles define al ser humano como zôon politikón."},
      {"k":"hf-siglo21","n":27,"tit":"La sociedad actual: retos del siglo XXI","txt":"En 1.º has visto que la identidad se forma dentro de una cultura."},
      {"k":"hf-metafisica","n":15,"tit":"El debate metafísico moderno: dualismo y materialismo","txt":"En 1.º has visto el problema mente-cuerpo y las posturas dualista y monista."},
      {"k":"hf-platon","n":6,"tit":"Platón: la teoría de las Ideas y la República","txt":"En 1.º has visto que el dualismo separa cuerpo y alma."},
      {"k":"hf-racionalismo","n":14,"tit":"Racionalismo y empirismo: Descartes y Hume","txt":"En 1.º has visto la autoconciencia y la introspección."},
      {"k":"hf-analitica","n":24,"tit":"La filosofía analítica: Wittgenstein y el giro lingüístico","txt":"En 1.º has visto que el lenguaje es un rasgo profundamente humano."},
      {"k":"hf-etica-deber","n":20,"tit":"Éticas de la felicidad y éticas del deber: Kant frente al utilitarismo","txt":"En 1.º has visto la noción de persona como ser consciente y con lenguaje."},
      {"k":"hf-preso","n":4,"tit":"El problema de la realidad en los presocráticos","txt":"En 1.º has visto el problema de la identidad personal con el barco de Teseo."},
      {"k":"hf-etica","n":8,"tit":"La ética clásica: intelectualismo, virtudes y eudaimonía","txt":"En 1.º has distinguido el sentido como propósito de la vida."},
      {"k":"hf-helenismo","n":10,"tit":"El helenismo: cinismo, estoicismo, epicureísmo y escepticismo","txt":"En 1.º has visto que hay varias respuestas al sentido de la vida."}
    ],
    "hf-antropologia": [
      {"k":"fil-t2","n":2,"tit":"¿Qué es el ser humano?","txt":"Ya viste en 1.º que el ser humano se pregunta por su propio ser; aquí Sócrates convierte ese preguntarse en método filosófico."},
      {"k":"fil-metafisica","n":"M","tit":"La realidad: ¿qué hay y cómo es? (Metafísica)","txt":"Ya viste en 1.º la sustancia aristotélica; aquí la usas para entender el alma como forma del cuerpo."}
    ],
    "hf-existencialismo": [
      {"k":"fil-t2","n":2,"tit":"¿Qué es el ser humano?","txt":"Ya viste en 1.º que el ser humano es sujeto y objeto de su pregunta; aquí el existencialismo parte de esa autorreferencia."},
      {"k":"fil-t3","n":3,"tit":"¿Qué podemos conocer?","txt":"Ya viste en 1.º a Ortega y el perspectivismo; aquí lo integras en la filosofía española de la razón vital."},
      {"k":"fil-metafisica","n":"M","tit":"La realidad: ¿qué hay y cómo es? (Metafísica)","txt":"Ya viste en 1.º la pregunta por el tiempo y el cambio; aquí Heidegger la lleva a la existencia humana."},
      {"k":"fil-t5","n":5,"tit":"Las preguntas de la ética","txt":"Ya viste en 1.º que sin libertad no hay moral; aquí Sartre convierte la libertad en la condición radical de la existencia."}
    ],
    "hf-sofistas": [
      {"k":"fil-t2","n":2,"tit":"¿Qué es el ser humano?","txt":"Ya viste en 1.º la tensión naturaleza-cultura; aquí los sofistas la formulan como physis/nomos."},
      {"k":"fil-t4","n":4,"tit":"Lógica y argumentación","txt":"Ya viste en 1.º las falacias; aquí ves por qué Sócrates se enfrentó a los sofistas por su uso manipulador de la palabra."},
      {"k":"fil-t5","n":5,"tit":"Las preguntas de la ética","txt":"Ya viste en 1.º el relativismo moral; aquí lo sitúas en la polis y en Protágoras."}
    ],
    "hf-politica": [
      {"k":"fil-t2","n":2,"tit":"¿Qué es el ser humano?","txt":"Ya viste en 1.º la definición de animal político; aquí la desarrollas dentro de la política clásica."},
      {"k":"fil-t4","n":4,"tit":"Lógica y argumentación","txt":"Ya viste en 1.º cómo definir; aquí usas esa herramienta para entender por qué Aristóteles llama al ser humano 'animal político'."},
      {"k":"fil-t6","n":6,"tit":"La vida en sociedad (Filosofía política)","txt":"Ya viste en 1.º al ser humano como animal social y político; aquí Platón y Aristóteles lo fundamentan con sus textos."},
      {"k":"fil-t7","n":7,"tit":"¿Qué es el arte? (Estética)","txt":"Ya viste en 1.º que el arte transmite valores de la polis; aquí ves cómo Platón lo regula en su ciudad ideal."}
    ],
    "hf-racionalismo": [
      {"k":"fil-t2","n":2,"tit":"¿Qué es el ser humano?","txt":"Ya viste en 1.º la mirada interior; aquí Descartes la convierte en certeza primera."},
      {"k":"fil-t3","n":3,"tit":"¿Qué podemos conocer?","txt":"Ya viste en 1.º el problema de las fuentes del conocimiento; aquí lo encarnas en Descartes y Hume."},
      {"k":"fil-metafisica","n":"M","tit":"La realidad: ¿qué hay y cómo es? (Metafísica)","txt":"Ya viste en 1.º el dualismo mente-cuerpo; aquí lo estudias dentro del racionalismo cartesiano."},
      {"k":"fil-t4","n":4,"tit":"Lógica y argumentación","txt":"Ya viste en 1.º la diferencia entre deducción e inducción; aquí distingues con ella el racionalismo y el empirismo."},
      {"k":"fil-t5","n":5,"tit":"Las preguntas de la ética","txt":"Ya viste en 1.º la ética emotivista de Hume; aquí la conectas con su empirismo."},
      {"k":"fil-t7","n":7,"tit":"¿Qué es el arte? (Estética)","txt":"Ya viste en 1.º el Hume estético; aquí lo estudias como figura central del empirismo."}
    ],
    "hf-etica": [
      {"k":"fil-t2","n":2,"tit":"¿Qué es el ser humano?","txt":"Ya viste en 1.º la pregunta por el fin de la vida; aquí Aristóteles la responde con la eudaimonía."},
      {"k":"fil-t5","n":5,"tit":"Las preguntas de la ética","txt":"Ya viste en 1.º la diferencia entre moral y ética; aquí la sitúas en los autores clásicos."},
      {"k":"fil-t7","n":7,"tit":"¿Qué es el arte? (Estética)","txt":"Ya viste en 1.º el papel formativo de las emociones en el arte; aquí lo conectas con la ética de Aristóteles."}
    ],
    "hf-helenismo": [
      {"k":"fil-t2","n":2,"tit":"¿Qué es el ser humano?","txt":"Ya viste en 1.º las respuestas al sentido; aquí comparas las terapias de las escuelas helenísticas."},
      {"k":"fil-t3","n":3,"tit":"¿Qué podemos conocer?","txt":"Ya viste en 1.º el escepticismo como actitud; aquí lo estudias como escuela helenística."},
      {"k":"fil-metafisica","n":"M","tit":"La realidad: ¿qué hay y cómo es? (Metafísica)","txt":"Ya viste en 1.º el debate sobre la libertad; aquí lo ves en las escuelas helenísticas."},
      {"k":"fil-t5","n":5,"tit":"Las preguntas de la ética","txt":"Ya viste en 1.º la ética eudaimonista; aquí ves sus derivas helenísticas."}
    ],
    "fil-t3": [
      {"k":"hf-kant","n":19,"tit":"La filosofía crítica de Kant y el problema de la metafísica","txt":"En 1.º has abierto la pregunta por los límites del conocimiento humano."},
      {"k":"hf-racionalismo","n":14,"tit":"Racionalismo y empirismo: Descartes y Hume","txt":"En 1.º has visto que sentidos y razón compiten como fuentes del conocimiento."},
      {"k":"hf-platon","n":6,"tit":"Platón: la teoría de las Ideas y la República","txt":"En 1.º has distinguido los sentidos y la razón como vías de conocimiento."},
      {"k":"hf-helenismo","n":10,"tit":"El helenismo: cinismo, estoicismo, epicureísmo y escepticismo","txt":"En 1.º has visto el escepticismo como postura ante el conocimiento."},
      {"k":"hf-analitica","n":24,"tit":"La filosofía analítica: Wittgenstein y el giro lingüístico","txt":"En 1.º has visto la verdad como propiedad de nuestros juicios."},
      {"k":"hf-posmodernidad","n":23,"tit":"Nietzsche y la posmodernidad: Habermas frente a los rupturistas","txt":"En 1.º has examinado la noción de verdad y sus criterios."},
      {"k":"hf-siglo21","n":27,"tit":"La sociedad actual: retos del siglo XXI","txt":"En 1.º has visto cómo la posverdad y las fake news manipulan la convicción."},
      {"k":"hf-modernidad","n":13,"tit":"El nacimiento de la modernidad: Renacimiento, protestantismo y revolución científica","txt":"En 1.º has visto la ciencia como sistema de conocimientos racionales."},
      {"k":"hf-existencialismo","n":25,"tit":"El existencialismo: Heidegger, Sartre y la filosofía española","txt":"En 1.º has visto el perspectivismo de Ortega y el papel de la representación."},
      {"k":"hf-ilustracion","n":18,"tit":"El proyecto ilustrado: potencia y límites de la razón","txt":"En 1.º has visto que conocer sirve para no dejarse engañar."},
      {"k":"hf-sospecha","n":21,"tit":"Los filósofos de la sospecha: Marx, Nietzsche y Freud","txt":"En 1.º has aprendido a desconfiar de lo que parece evidente."},
      {"k":"hf-mito","n":3,"tit":"El surgimiento de la filosofía: del mito al logos","txt":"En 1.º has visto que ciencia y filosofía nacen de una misma actitud racional."}
    ],
    "hf-posmodernidad": [
      {"k":"fil-t3","n":3,"tit":"¿Qué podemos conocer?","txt":"Ya viste en 1.º la cuestión de la verdad; aquí la pones en crisis con Nietzsche y la posmodernidad."},
      {"k":"fil-t5","n":5,"tit":"Las preguntas de la ética","txt":"Ya viste en 1.º la sospecha nietzscheana; aquí ves su herencia posmoderna."},
      {"k":"fil-t7","n":7,"tit":"¿Qué es el arte? (Estética)","txt":"Ya viste en 1.º la ruptura de Duchamp; aquí la lees como síntoma de la posmodernidad."}
    ],
    "hf-sospecha": [
      {"k":"fil-t3","n":3,"tit":"¿Qué podemos conocer?","txt":"Ya viste en 1.º la necesidad de no dejarse engañar; aquí la aplicas como sospecha filosófica."},
      {"k":"fil-t5","n":5,"tit":"Las preguntas de la ética","txt":"Ya viste en 1.º la sospecha moral de Nietzsche; aquí la comparas con Marx y Freud."},
      {"k":"fil-t6","n":6,"tit":"La vida en sociedad (Filosofía política)","txt":"Ya viste en 1.º la crítica marxista del pacto entre desiguales; aquí Marx inaugura la sospecha económica."},
      {"k":"fil-t7","n":7,"tit":"¿Qué es el arte? (Estética)","txt":"Ya viste en 1.º que el arte transmite valores e intereses; aquí aplicas la sospecha filosófica."}
    ],
    "fil-metafisica": [
      {"k":"hf-kant","n":19,"tit":"La filosofía crítica de Kant y el problema de la metafísica","txt":"En 1.º has visto que la ciencia no sustituye a la metafísica."},
      {"k":"hf-historicidad","n":1,"tit":"Historicidad y universalidad de la filosofía","txt":"En 1.º has abierto la pregunta por la realidad y la existencia."},
      {"k":"hf-preso","n":4,"tit":"El problema de la realidad en los presocráticos","txt":"En 1.º has visto la sospecha de Parménides de que el mundo no es lo que parece."},
      {"k":"hf-platon","n":6,"tit":"Platón: la teoría de las Ideas y la República","txt":"En 1.º has visto que lo real puede no ser lo aparente."},
      {"k":"hf-metafisica","n":15,"tit":"El debate metafísico moderno: dualismo y materialismo","txt":"En 1.º has distinguido monismo, pluralismo, idealismo y materialismo."},
      {"k":"hf-antropologia","n":7,"tit":"La antropología clásica: Sócrates, Platón y Aristóteles","txt":"En 1.º has visto que la sustancia es lo concreto compuesto de materia y forma."},
      {"k":"hf-medieval","n":11,"tit":"La filosofía medieval: etapas, métodos y el problema de los universales","txt":"En 1.º has distinguido sustancia, esencia y accidentes."},
      {"k":"hf-fe-razon","n":12,"tit":"Fe y razón: la asimilación de la filosofía griega y la existencia de Dios","txt":"En 1.º has separado esencia y existencia."},
      {"k":"hf-racionalismo","n":14,"tit":"Racionalismo y empirismo: Descartes y Hume","txt":"En 1.º has visto el dualismo de Descartes y su problema de interacción."},
      {"k":"hf-siglo21","n":27,"tit":"La sociedad actual: retos del siglo XXI","txt":"En 1.º has preguntado si una inteligencia artificial podría pensar."},
      {"k":"hf-existencialismo","n":25,"tit":"El existencialismo: Heidegger, Sartre y la filosofía española","txt":"En 1.º has visto que el tiempo plantea el problema de la identidad."},
      {"k":"hf-helenismo","n":10,"tit":"El helenismo: cinismo, estoicismo, epicureísmo y escepticismo","txt":"En 1.º has distinguido determinismo, libertarismo y compatibilismo."},
      {"k":"hf-etica-deber","n":20,"tit":"Éticas de la felicidad y éticas del deber: Kant frente al utilitarismo","txt":"En 1.º has visto que sin libertad no tendrían sentido culpar o felicitar."}
    ],
    "hf-medieval": [
      {"k":"fil-metafisica","n":"M","tit":"La realidad: ¿qué hay y cómo es? (Metafísica)","txt":"Ya viste en 1.º qué es una esencia; aquí ves el debate medieval sobre si existe fuera de la mente."},
      {"k":"fil-t4","n":4,"tit":"Lógica y argumentación","txt":"Ya viste en 1.º las proposiciones A, E, I, O; aquí te preguntas si sus términos universales existen de verdad."}
    ],
    "hf-fe-razon": [
      {"k":"fil-metafisica","n":"M","tit":"La realidad: ¿qué hay y cómo es? (Metafísica)","txt":"Ya viste en 1.º la distinción entre esencia y existencia; aquí Tomás la emplea para hablar de Dios."},
      {"k":"fil-t4","n":4,"tit":"Lógica y argumentación","txt":"Ya viste en 1.º la navaja de Ockham; aquí la relacionas con el pensamiento de Guillermo de Ockham y su idea de fe-razón."}
    ],
    "fil-t4": [
      {"k":"hf-metodos","n":2,"tit":"Los métodos de la filosofía","txt":"En 1.º has visto que la lógica nace con Aristóteles como estudio de la forma del razonamiento."},
      {"k":"hf-racionalismo","n":14,"tit":"Racionalismo y empirismo: Descartes y Hume","txt":"En 1.º has visto que la deducción garantiza la conclusión y la inducción solo la hace probable."},
      {"k":"hf-analitica","n":24,"tit":"La filosofía analítica: Wittgenstein y el giro lingüístico","txt":"En 1.º has visto que Frege y Russell crearon la lógica formal que fundamenta la informática y la filosofía analítica."},
      {"k":"hf-medieval","n":11,"tit":"La filosofía medieval: etapas, métodos y el problema de los universales","txt":"En 1.º has visto que las proposiciones categóricas hablan de todos o de algunos S."},
      {"k":"hf-sofistas","n":5,"tit":"La Ilustración griega: sofistas, Sócrates y Aspasia","txt":"En 1.º has visto que reconocer falacias es defenderse del engaño y la manipulación."},
      {"k":"hf-fe-razon","n":12,"tit":"Fe y razón: la asimilación de la filosofía griega y la existencia de Dios","txt":"En 1.º has visto que la navaja de Ockham pide no multiplicar supuestos sin necesidad."},
      {"k":"hf-politica","n":9,"tit":"La política clásica: Platón y Aristóteles","txt":"En 1.º has visto que una buena definición combina género próximo y diferencia específica."}
    ],
    "fil-t5": [
      {"k":"hf-etica","n":8,"tit":"La ética clásica: intelectualismo, virtudes y eudaimonía","txt":"En 1.º has distinguido moral y ética y has abierto la pregunta por la vida buena."},
      {"k":"hf-historicidad","n":1,"tit":"Historicidad y universalidad de la filosofía","txt":"En 1.º has planteado la pregunta por la vida buena como problema ético."},
      {"k":"hf-etica-deber","n":20,"tit":"Éticas de la felicidad y éticas del deber: Kant frente al utilitarismo","txt":"En 1.º has visto que la moral presupone libertad y que Kant opone autonomía a heteronomía."},
      {"k":"hf-existencialismo","n":25,"tit":"El existencialismo: Heidegger, Sartre y la filosofía española","txt":"En 1.º has vinculado libertad y responsabilidad moral."},
      {"k":"hf-helenismo","n":10,"tit":"El helenismo: cinismo, estoicismo, epicureísmo y escepticismo","txt":"En 1.º has estudiado las éticas materiales que buscan la felicidad."},
      {"k":"hf-ilustracion","n":18,"tit":"El proyecto ilustrado: potencia y límites de la razón","txt":"En 1.º has opuesto autonomía y heteronomía."},
      {"k":"hf-racionalismo","n":14,"tit":"Racionalismo y empirismo: Descartes y Hume","txt":"En 1.º has visto el emotivismo de Hume: los juicios morales expresan sentimientos."},
      {"k":"hf-analitica","n":24,"tit":"La filosofía analítica: Wittgenstein y el giro lingüístico","txt":"En 1.º has visto que Ayer convierte el emotivismo en análisis del lenguaje moral."},
      {"k":"hf-sofistas","n":5,"tit":"La Ilustración griega: sofistas, Sócrates y Aspasia","txt":"En 1.º has distinguido objetivismo, relativismo y subjetivismo moral."},
      {"k":"hf-platon","n":6,"tit":"Platón: la teoría de las Ideas y la República","txt":"En 1.º has visto que el objetivismo moral afirma verdades morales universales."},
      {"k":"hf-utilitarismo","n":17,"tit":"Utilitarismo y liberalismo: las bases del capitalismo","txt":"En 1.º has estudiado el cálculo felicífico de Bentham."},
      {"k":"hf-sospecha","n":21,"tit":"Los filósofos de la sospecha: Marx, Nietzsche y Freud","txt":"En 1.º has visto la genealogía de la moral de Nietzsche."},
      {"k":"hf-posmodernidad","n":23,"tit":"Nietzsche y la posmodernidad: Habermas frente a los rupturistas","txt":"En 1.º has estudiado la crítica de Nietzsche a la moral."},
      {"k":"hf-siglo21","n":27,"tit":"La sociedad actual: retos del siglo XXI","txt":"En 1.º has estudiado la ética del cuidado de Noddings y Tronto."},
      {"k":"hf-beauvoir","n":26,"tit":"El feminismo contemporáneo: Simone de Beauvoir","txt":"En 1.º has visto la ética del cuidado como teoría propia."},
      {"k":"hf-capitalismo","n":22,"tit":"La crítica del capitalismo: de Marx a Rawls","txt":"En 1.º has distinguido ética de mínimos y éticas de máximos."}
    ],
    "hf-utilitarismo": [
      {"k":"fil-t5","n":5,"tit":"Las preguntas de la ética","txt":"Ya viste en 1.º el utilitarismo; aquí lo relacionas con liberalismo y capitalismo."},
      {"k":"fil-t6","n":6,"tit":"La vida en sociedad (Filosofía política)","txt":"Ya viste en 1.º las grandes ideologías; aquí el liberalismo se estudia como fundamento del capitalismo."}
    ],
    "hf-beauvoir": [
      {"k":"fil-t5","n":5,"tit":"Las preguntas de la ética","txt":"Ya viste en 1.º la ética del cuidado; aquí la inscribes en el feminismo contemporáneo."},
      {"k":"fil-t6","n":6,"tit":"La vida en sociedad (Filosofía política)","txt":"Ya viste en 1.º las olas del feminismo; aquí sus ideas se piensan a fondo con Beauvoir y Butler."}
    ],
    "hf-capitalismo": [
      {"k":"fil-t5","n":5,"tit":"Las preguntas de la ética","txt":"Ya viste en 1.º la ética de mínimos; aquí la conectas con Rawls y Habermas."},
      {"k":"fil-t6","n":6,"tit":"La vida en sociedad (Filosofía política)","txt":"Ya viste en 1.º el velo de ignorancia; aquí Rawls se entiende al final del debate abierto por Marx."},
      {"k":"fil-t7","n":7,"tit":"¿Qué es el arte? (Estética)","txt":"Ya viste en 1.º el debate sobre el papel político del arte; aquí lo sitúas en la crítica del capitalismo."}
    ],
    "fil-t6": [
      {"k":"hf-politica","n":9,"tit":"La política clásica: Platón y Aristóteles","txt":"En 1.º has visto por qué el ser humano es un «animal político»; en 2.º verás cómo Platón y Aristóteles fundaron la filosofía política."},
      {"k":"hf-contrato","n":16,"tit":"El origen de la sociedad y el poder: Maquiavelo y el contrato social","txt":"En 1.º has visto el Estado como pacto frente a comunidad natural; en 2.º leerás a Hobbes, Locke y Rousseau en sus propios textos."},
      {"k":"hf-platon","n":6,"tit":"Platón: la teoría de las Ideas y la República","txt":"En 1.º has imaginado con Platón la ciudad justa; en 2.º verás la teoría de las Ideas que la sostiene."},
      {"k":"hf-capitalismo","n":22,"tit":"La crítica del capitalismo: de Marx a Rawls","txt":"En 1.º has diseñado la sociedad justa tras el velo de ignorancia; en 2.º Rawls aparecerá como respuesta a la crítica del capitalismo."},
      {"k":"hf-utilitarismo","n":17,"tit":"Utilitarismo y liberalismo: las bases del capitalismo","txt":"En 1.º has perfilado el liberalismo y el socialismo; en 2.º verás las bases filosóficas del liberalismo y su crítica."},
      {"k":"hf-siglo21","n":27,"tit":"La sociedad actual: retos del siglo XXI","txt":"En 1.º has asomado a los retos de hoy; en 2.º los pensarás con los filósofos del siglo XXI."},
      {"k":"hf-ilustracion","n":18,"tit":"El proyecto ilustrado: potencia y límites de la razón","txt":"En 1.º has recorrido las olas del feminismo; en 2.º verás nacer la primera dentro de la Ilustración."},
      {"k":"hf-beauvoir","n":26,"tit":"El feminismo contemporáneo: Simone de Beauvoir","txt":"En 1.º has estudiado el feminismo y la perspectiva de género; en 2.º leerás a Simone de Beauvoir y a Judith Butler."},
      {"k":"hf-sospecha","n":21,"tit":"Los filósofos de la sospecha: Marx, Nietzsche y Freud","txt":"En 1.º has leído la crítica de Marx a la sociedad capitalista; en 2.º será uno de los maestros de la sospecha."}
    ],
    "hf-contrato": [
      {"k":"fil-t6","n":6,"tit":"La vida en sociedad (Filosofía política)","txt":"Ya viste en 1.º la idea del pacto; aquí cada contractualista defiende la suya, texto a texto."}
    ],
    "fil-t7": [
      {"k":"hf-preso","n":4,"tit":"El problema de la realidad en los presocráticos","txt":"En 1.º has visto que los pitagóricos explicaban la belleza por el número y la proporción."},
      {"k":"hf-platon","n":6,"tit":"Platón: la teoría de las Ideas y la República","txt":"En 1.º has visto la concepción objetiva de la belleza en los griegos."},
      {"k":"hf-racionalismo","n":14,"tit":"Racionalismo y empirismo: Descartes y Hume","txt":"En 1.º has visto que Hume une subjetividad del gusto y criterio del crítico."},
      {"k":"hf-kant","n":19,"tit":"La filosofía crítica de Kant y el problema de la metafísica","txt":"En 1.º has visto que Kant distingue el gusto de la mera preferencia personal."},
      {"k":"hf-analitica","n":24,"tit":"La filosofía analítica: Wittgenstein y el giro lingüístico","txt":"En 1.º has visto que definir el arte es difícil por la diversidad de obras."},
      {"k":"hf-etica","n":8,"tit":"La ética clásica: intelectualismo, virtudes y eudaimonía","txt":"En 1.º has visto que el arte puede educar o purificar emociones y valores."},
      {"k":"hf-capitalismo","n":22,"tit":"La crítica del capitalismo: de Marx a Rawls","txt":"En 1.º has visto que el arte puede comprometerse o reivindicar autonomía."},
      {"k":"hf-sospecha","n":21,"tit":"Los filósofos de la sospecha: Marx, Nietzsche y Freud","txt":"En 1.º has visto que el arte no es inocente y puede servir a intereses."},
      {"k":"hf-politica","n":9,"tit":"La política clásica: Platón y Aristóteles","txt":"En 1.º has visto que el arte tiene una dimensión política."},
      {"k":"hf-posmodernidad","n":23,"tit":"Nietzsche y la posmodernidad: Habermas frente a los rupturistas","txt":"En 1.º has visto que el arte contemporáneo rompe con las certezas clásicas."},
      {"k":"hf-siglo21","n":27,"tit":"La sociedad actual: retos del siglo XXI","txt":"En 1.º has visto que la estética contemporánea es sobre todo audiovisual."}
    ]
  };
  var WEB_REPO = { fil: "aula-de-filosofia-web", hf: "historia-filosofia-web" };
  function puentesHtml(subject, key){
    var arr = PUENTES[key]; if (!arr || !arr.length) return "";
    var T = coll("THEORY"), lang = (document.documentElement.lang || "es").slice(0, 2), otra = subject === "fil" ? "hf" : "fil";
    var url = "https://mikagiuri.github.io/" + WEB_REPO[otra] + (lang === "es" ? "" : "-" + lang) + "/#teoria/";
    return '<div class="fin-bloque fin-puentes"><h3>' + esc(t(subject === "fil" ? "puenteFil" : "puenteHf")) + '</h3>' + arr.map(function(x){
      var lab = (otra === "hf" ? t("hfSig") + " · " : "") + (typeof x.n === "number" ? t("tema", { n: x.n }) : x.n) + " · " + x.tit;
      var a = T && T[x.k] ? btn({ go: "teoria", arg: x.k, label: lab }) : '<a class="itin-lnk" href="' + esc(url + x.k) + '" target="_blank" rel="noopener">' + esc(lab) + ' ↗</a>';
      return '<div class="fin-puente">' + a + '<p>' + esc(x.txt) + '</p></div>'; }).join("") + '</div>';
  }
  /* (24-10) ampliación de 1.º (actividades_74): enlaces del final del tema a sus apartados nuevos */
  var AMPLIACION_FIL = {
    "fil-t2": [["#teoria/fil-t2/4", "Las emociones: el cuerpo que valora"], ["#teoria/fil-t2/3", "De las actitudes a las políticas: cinco modelos de convivencia"]],
    "fil-t3": [["#teoria/fil-t3/1", "¿Podemos fiarnos de lo que percibimos y recordamos?"], ["#teoria/fil-t3/5", "La posverdad, más a fondo"], ["#teoria/fil-t3/7", "Quién ha podido hacer ciencia: barreras con fecha"], ["#teoria/fil-t3/7", "El efecto Matilda"]],
    "fil-metafisica": [["#teoria/fil-metafisica/5", "La inteligencia artificial, objeto de estudio filosófico"]],
    "fil-t4": [["#teoria/fil-t4/12", "Por qué razonamos mal: los sesgos cognitivos"]],
    "fil-t5": [["#teoria/fil-t5/4", "El estoicismo como ética de la virtud"], ["#teoria/fil-t5/4", "¿Basta con ser buena persona? Objeciones a la ética de la virtud"], ["#teoria/fil-t5/5", "La estructura de la ética del deber"], ["#teoria/fil-t5/11", "Ética medioambiental y otros ámbitos de la ética aplicada"]],
    "fil-t6": [["#teoria/fil-t6/3", "Estado, nación, país y patria: cuatro palabras que no significan lo mismo"], ["#teoria/fil-t6/5", "Qué distingue a una democracia liberal"], ["#teoria/fil-t6/6", "La Declaración Universal de Derechos Humanos por dentro"], ["#teoria/fil-t6/6", "¿Universales o relativos? El debate sobre el fundamento de los derechos"], ["#teoria/fil-t6/7", "Movimientos sociales y desobediencia civil"]]
  };
  function finHtml(subject, tema, key){
    var T = coll("THEORY"), teoria = items("teoria", subject, tema);
    var row = function(label, arr){ return arr.length ? '<div class="fin-row"><span class="fin-l">' + esc(label) + '</span><div class="fin-links">' + arr.map(function(x){ return btn(x); }).join("") + '</div></div>' : ""; };
    var cs = conceptosDe(subject, tema);
    var conceptosHtml = cs.length ? '<div class="fin-row"><span class="fin-l">' + esc(t("conceptos")) + '</span><div class="fin-links">' +
      cs.map(function(c){ return '<button class="itin-term" type="button" data-igo="diccionario" data-iarg="' + esc(c.t) + '" title="' + esc(c.def) + '">' + esc(c.t) + '</button>'; }).join("") + '</div></div>' : "";
    /* (07-10) anexos de este tema: fuera de la secuencia, aquí y en el índice de temas */
    var anexosArr = !esAnexo(T[key]) ? Object.keys(T).filter(function(k){ return T[k].subject === subject && esAnexo(T[k]) && T[k].temaN === tema; })
      .map(function(k){ return { go: "teoria", arg: k, label: strip(T[k].title).replace(/^(Exploración|Esplorazioa|Exploration|Anexo|Eranskina|Annexe|Annex|Appendix)\s*-\s*/, "") }; }) : [];
    var epocaArr = epocasDeTeoria(key, subject, tema).map(function(k){ return { go: "biografias", arg: "epoca-" + k, label: nombreEpoca(k) }; });   // (11-10) con / con2 y Filosofía 1.º
    /* (18-10) vídeos en euskera de Ikusgela del tema (videos_eu.js): enlaces externos; en euskera, con su título original */
    var V = G("VIDEOS_EU"), euWeb = (document.documentElement.lang || "").slice(0, 2) === "eu";
    var videosArr = Array.isArray(V) ? V.filter(function(v){ return (v.temas || []).indexOf(key) >= 0; }) : [];
    var videosHtml = videosArr.length ? '<div class="fin-row"><span class="fin-l">' + esc(t("videosEu")) + '</span><div class="fin-links">' +
      videosArr.map(function(v){ return '<a class="itin-lnk" href="https://www.youtube.com/watch?v=' + esc(v.id) + '" target="_blank" rel="noopener" hreflang="eu" title="' + esc(t("videoEu") + " · «" + v.eu_titulo + "»") + '">' +
        esc(euWeb ? v.eu_titulo : v.es) + ' <i>' + esc(v.dur) + '</i></a>' +
        /* (19-10) su transcripción (media/ikusgela/<id>.html, subtítulos de Ikusgela) */
        '<a class="itin-lnk" href="media/ikusgela/' + esc(v.id) + '.html" target="_blank" rel="noopener" hreflang="eu" title="' + esc(t("transcripcionT")) + '">' + esc(t("transcripcion")) + '</a>'; }).join("") + '</div></div>' : "";
    var P = { tarjetas: row(t("tarjetas"), items("tarjetas", subject, tema)), cuestionarios: row(t("cuestionarios"), items("cuestionarios", subject, tema)),
      infografias: row(t("infografias"), items("infografias", subject, tema)), mapas: row(t("mapas"), items("mapas", subject, tema)),
      esquemas: row(t("esquemas"), items("esquemas", subject, tema)), lecturas: row(t("lecturas"), items("lecturas", subject, tema)),
      comentario: row(t("comentarios"), items("comentario", subject, tema)), dilemas: row(t("dilemas"), dilemasDe(teoria.map(function(x){ return x.arg; }))),
      pistas: row(t("pistas"), pistasDe(teoria.map(function(x){ return x.arg; }))), conceptos: conceptosHtml, anexos: row(t("anexos"), anexosArr), epoca: row(t("epoca"), epocaArr), videos: videosHtml };
    /* (18-10, P-025) lo que faltaba. En «Ampliar», una fila de más de seis enlaces se pliega con su total (regla 4.7 de docs/35). */
    var rowFold = function(label, arr){ return arr.length > 6 ? '<details class="fin-row fin-fold"><summary class="fin-l">' + esc(label) + ' (' + arr.length + ')</summary><div class="fin-links">' +
      arr.map(function(x){ return btn(x); }).join("") + '</div></details>' : row(label, arr); };
    var tk = teoria.map(function(x){ return x.arg; });
    var pols = porTemas("POLEMICAS", "polemicas", tk, function(p){ return strip(p.a) + " / " + strip(p.b); });
    P.cronogramas = row(t("cronogramas"), cronosDe(subject, tema));
    P.disertaciones = row(t("disertaciones"), disertDe(subject, tema));
    P.comparativas = row(t("comparativas"), comparativasDe(subject, tema));
    P.logica = row(t("logica"), logicaDe(subject, tema, key));
    P.masFondo = row(t("masFondo"), (AMPLIACION_FIL[key] || []).map(function(x){ return { href: x[0], label: x[1] }; }));
    P.polemicas = rowFold(t("polemicas"), pols);
    P.comunidades = rowFold(t("comunidades"), porTemas("COMUNIDADES", "comunidades", tk, function(c){ return strip(c.nombre); }));
    P.perseguidos = rowFold(t("perseguidos"), porTemas("PERSEGUIDOS", "perseguidos", tk, function(c){ return strip(c.nombre); }));
    P.duelo = rowFold(t("duelo"), dueloDe(subject, pols.map(function(x){ return x.arg; })));
    P.juegos = row(t("juegos"), juegosDe(subject, tema));
    /* (12-10, rediseño Lote 3) la caja del final del tema se ordena en TRES bloques en TODOS los temas */
    var blk = function(titulo, arr){ var inner = arr.filter(Boolean).join(""); return inner ? '<div class="fin-bloque"><h3>' + esc(titulo) + '</h3>' + inner + '</div>' : ""; };
    var amp = function(titulo, arr){ var inner = arr.filter(Boolean).join(""); return inner ? '<details class="fin-bloque fin-amp"><summary>' + esc(titulo) + '</summary>' + inner + '</details>' : ""; };
    var ampComun = [P.anexos].concat(subject === "hf" ? [P.dilemas, P.pistas, P.logica] : [])   /* (22-10) en HF, la lógica va en «Ampliar» */.concat([P.polemicas, P.comunidades, P.perseguidos, P.duelo, P.juegos, P.videos]);
    var rowsHtml = puentesHtml(subject, key) + blk(t("blEstudiar"), [P.masFondo, P.tarjetas, P.cuestionarios, P.infografias, P.mapas, P.esquemas, P.conceptos, P.epoca, P.cronogramas]) +
      (subject === "hf" ? blk(t("blPau"), [P.lecturas, P.comentario, P.disertaciones, P.comparativas]) : blk(t("blPensar"), [P.lecturas, P.disertaciones, P.dilemas, P.pistas, P.logica])) +
      amp(t("blAmpliar"), ampComun);
    /* tema anterior / siguiente, en el orden de la materia; desde un anexo, solo «Volver al tema» */
    var ks = temasDe(subject), i = ks.indexOf(key), prev = i > 0 ? ks[i - 1] : null, next = i >= 0 && i < ks.length - 1 ? ks[i + 1] : null;
    if (i < 0 && esAnexo(T[key])) prev = ks.filter(function(k){ return !T[k].sigla && temaOf("teoria", k, T[k]) === tema; })[0] || null;
    var card = function(k, kick, cls){
      if (!k) return '<span class="fin-pn-empty"></span>';
      var tn = temaOf("teoria", k, T[k]), lab = (T[k].sigla ? T[k].sigla + " · " : typeof tn === "number" ? t("tema", { n: tn }) + " · " : "") + strip(T[k].title);
      return '<button class="fin-pn-card' + cls + '" type="button" data-igo="teoria" data-iarg="' + esc(k) + '"><span class="kick">' + esc(kick) + '</span><b>' + esc(lab) + '</b></button>';
    };
    if (!rowsHtml && !prev && !next) return "";
    return '<section class="itin-fin" style="--c:' + (SUBJ_COLOR[subject] || "var(--accent)") + '" aria-label="' + esc(t("seguir")) + '">' +
      (rowsHtml ? '<h2>' + esc(t("seguir")) + '</h2>' + rowsHtml : '') +
      '<div class="fin-pager">' + card(prev, "‹ " + t(i < 0 && esAnexo(T[key]) ? "volverTema" : "anterior"), "") + card(next, t("siguienteTema") + " ›", " fin-next") + '</div></section>';
  }
  function itemTema(go_, key){ var c = coll(COLL[go_]), o = c && c[key]; return o ? { subject: o.subject, tema: temaOf(go_, key, o) } : null; }
  function renderTeoria(k){
    k = String(k || "").replace(/(?:\/|§)\d+$/, "");   /* (07-10) «clave/n»: enlace a un apartado */
    var body = document.getElementById("theorybody"), tm = itemTema("teoria", k); if (!body || !tm) return;
    var rel = body.querySelector(".related-row"); if (rel) rel.remove();   // la tira antigua de la cabecera: todo va al final
    body.querySelectorAll(":scope > .itin-fin, :scope > .th-part > .itin-fin").forEach(function(o){ o.remove(); });
    if (tm.tema == null) return;
    var tmp = document.createElement("div"); tmp.innerHTML = finHtml(tm.subject, tm.tema, k);
    /* (25-10, el profesor: «solo enlaces relacionados con el apartado, no con el tema completo») en la vista por
       apartados la caja va dentro del ÚLTIMO apartado: sale una sola vez, al final del tema, y no debajo de cada uno */
    var partes = body.querySelectorAll(":scope > .th-part"), host = partes.length ? partes[partes.length - 1] : body;
    if (tmp.firstElementChild) host.appendChild(tmp.firstElementChild);
  }
  function renderDeck(k){
    var host = document.getElementById("itin-tarjetas"), tm = itemTema("tarjetas", k); if (!host) return;
    var pasos = tm && tm.tema != null ? itinerario(tm.subject, tm.tema) : [], ep = tm && view("biografias") ? epocaFicha(tm.subject, tm.tema) : null;
    host.innerHTML = pasos.length > 1 || ep ? stripHtml(pasos, { go: "tarjetas", arg: k }, ep ? [epocaItem(ep)] : null) : "";
  }
  function renderQuiz(k){
    var host = document.getElementById("itin-quiz"), tm = itemTema("cuestionarios", k); if (!host) return;
    var pasos = tm && tm.tema != null ? itinerario(tm.subject, tm.tema) : [], ep = tm && view("biografias") ? epocaFicha(tm.subject, tm.tema) : null;
    host.innerHTML = pasos.length > 1 || ep ? stripHtml(pasos, { go: "cuestionarios", arg: k }, ep ? [epocaItem(ep)] : null) : "";
  }
  function renderClase(k){
    var root = document.getElementById("clases-root"), idx = coll("CLASES_IDX"); if (!root || !idx) return;
    var key = fn("clNorm") ? clNorm(k) : k, it = key && idx[key]; if (!it) return;
    var tema = CLASES_TEMA[it.unidad]; if (!tema) return;
    var pasos = itinerario("ipc", tema); if (pasos.length < 2) return;
    root.querySelectorAll(":scope > .itin-strip").forEach(function(o){ o.remove(); });
    var tmp = document.createElement("div"); tmp.innerHTML = stripHtml(pasos, { go: "clases", arg: sid(it.u.sesiones[0].n) });
    if (tmp.firstElementChild) root.insertBefore(tmp.firstElementChild, root.querySelector(".cl-pager") || null);
  }
  function wrap(name, after){
    var orig = window[name]; if (typeof orig !== "function") return;
    window[name] = function(k){ var out = orig.apply(this, arguments); try { after(k); } catch (e){} return out; };
  }
  wrap("loadTheory", renderTeoria); wrap("loadDeck", renderDeck); wrap("loadQuiz", renderQuiz); wrap("loadClase", renderClase);

  /* ---------- itinerario PAU (Historia de la Filosofía) ---------- */
  function pauPasos(){
    /* (19-10) sin entrada en el menú (p. ej. «resumenes», Resúmenes), el título de la sección: nunca la clave cruda */
    var navLabel = function(id){ var b = document.querySelector('#tabs button[data-view="' + id + '"]'), h = document.querySelector("#" + id + " h1"); return b ? strip(b.textContent) : h ? strip(h.textContent) : ""; };
    var item = function(go_, name, key){ var c = coll(name); if (!view(go_) || !c || !c[key]) return null; return { go: go_, arg: key, label: strip(c[key].title || c[key].name || key) }; };
    var sec = function(id){ return view(id) ? { go: id, arg: "", label: navLabel(id) || id } : null; };
    var steps = [
      { id: "pau", label: t("pau1"), short: t("spau1"), items: [item("prepara_PAU", "PAU", "estructura"), item("prepara_PAU", "PAU", "modelos")] },
      { id: "comentario", label: t("pau2"), short: t("spau2"), items: [item("comentario", "COMENTARIO", "metodo"), item("comentario", "COMENTARIO", "consejos"), item("prepara_PAU", "PAU", "ejercicio1"), sec("lecturas")] },
      { id: "disertaciones", label: t("pau3"), short: t("spau3"), items: [item("disertaciones", "DISERTACIONES", "metodologia"), item("disertaciones", "DISERTACIONES", "temas"), item("disertaciones", "DISERTACIONES", "comparativas")] },
      { id: "pau-ej3", label: t("pau4"), short: t("spau4"), items: [item("prepara_PAU", "PAU", "ejercicio3"), item("prepara_PAU", "PAU", "comparativas-temas")] },
      { id: "rubricas", label: t("pau5"), short: t("spau5"), items: [sec("rubricas")] },
      { id: "unidad", label: t("pau6"), short: t("spau6"), items: [sec("cuestionarios"), sec("unidad"), sec("resumenes"), sec("cronogramas")] }
    ];
    return steps.map(function(s){ s.items = s.items.filter(Boolean); return s; }).filter(function(s){ return s.items.length; });
  }
  function pauHere(id){
    var key = { pau: G("pauKey"), comentario: G("comentarioKey"), disertaciones: G("disertKey") }[id];
    return id ? { go: id, arg: key == null ? null : key } : { go: null };
  }
  function pauBar(id){ var pasos = pauPasos(); return pasos.length < 3 ? "" : barHtml(pasos, pauHere(id), t("pau"), t("ariaPau"), "var(--hf)"); }
  function pauHtml(){
    var pasos = pauPasos(); if (pasos.length < 3) return "";
    return '<nav class="itin itin-pau" style="--c:var(--hf)" aria-label="' + esc(t("ariaPau")) + '">' +
      '<div class="itin-top"><span class="itin-kick">' + esc(t("pau")) + '</span><b>' + esc(t("pauLead")) + '</b></div>' + stepsHtml(pasos, { go: null }) + '</nav>';
  }
  var PAU_VIEWS = { pau: 1, disertaciones: 1, comentario: 1, rubricas: 1, unidad: 1 };
  function mount(host, html, where){
    if (!host) return;
    host.querySelectorAll(":scope > .itin").forEach(function(o){ o.remove(); });
    if (!html) return;
    var tmp = document.createElement("div"); tmp.innerHTML = html; var el = tmp.firstElementChild;
    if (where === "start") host.insertBefore(el, host.firstChild); else if (where && where.nodeType) host.insertBefore(el, where); else host.appendChild(el);
  }
  function renderPau(id){
    var sec = document.getElementById(id); if (!sec || !PAU_VIEWS[id]) return;
    var lead = sec.querySelector(":scope > .lead");
    mount(sec, pauBar(id), lead ? lead.nextSibling : "start");
  }
  wrap("loadPau", function(){ renderPau("pau"); }); wrap("loadDisert", function(){ renderPau("disertaciones"); }); wrap("loadComentario", function(){ renderPau("comentario"); });

  /* (25-10, orden del profesor; tabla de bloques hecha con Nous) Filosofía 1.º por bloques, como HF: cada bloque con
     el color de su rama y sus subtemas numerados (1.1, 1.2…) = los apartados <h2> de su teoría (ya traducidos en cada
     lengua) y, detrás, las entradas que son parte del bloque. Lo que no es tema (actividades, ampliaciones, lecturas
     largas) va plegado en «Exploraciones (n)» de su bloque. Una clave nueva que no esté aquí sale al final, sin bloque. */
  var FIL_BLOQUES = [
    /* (25-10, profesor) el apartado 10 de fil-t1 (modelo de examen) y los presocráticos, como exploraciones; «clave/n» = un apartado */
    ["fil-t1", "int", [], ["fil-t1/10", "fil-presocraticos", "fil-utilidad", "fil-t1-lipman", "fil-grandes-preguntas", "fil-montaigne-ensayos", "fil-spinoza-sistema", "fil-comunidades-perseguidos"]],
    ["fil-t2", "ant", [], []],
    ["fil-t3", "con", ["fil-t3-semmelweis"], ["fil-conciencia-espejo"]],
    ["fil-metafisica", "con", [], []],
    ["fil-t4", "log", [], []],
    ["fil-t5", "eti", ["fil-helenismo"], ["fil-t5-minimos-maximos"]],
    ["fil-t6", "pol", [], ["fil-t1-filosofia-mujer", "fil-marxismos", "fil-discriminacion"]],
    ["fil-t7", "est", [], []]
  ];
  function filBloquesHtml(T, ks){
    var usadas = {};
    function boton(k, sec, num, label, ga){
      return '<li' + (ga || "") + '><button type="button" data-igo="teoria" data-iarg="' + esc(sec ? k + "/" + sec : k) + '"><span class="temas-n">' + esc(num) + '</span><span class="temas-t">' + esc(label) + '</span></button></li>';
    }
    var html = FIL_BLOQUES.filter(function(b){ return T[b[0]]; }).map(function(b, i){
      var n = i + 1, ga = ' data-rama="' + b[1] + '"', out = "", j = 0, a = 0, aps = {}, re = /<h2\b[^>]*>([\s\S]*?)<\/h2>/g, m;
      usadas[b[0]] = 1;
      while ((m = re.exec(T[b[0]].html || ""))) {
        var tit = strip(m[1]).replace(/^\s*\d+\.\s*/, ""); a++;
        if (b[3].indexOf(b[0] + "/" + a) >= 0) { aps[b[0] + "/" + a] = tit; continue; }   // apartado que va a «Exploraciones»
        j++; out += boton(b[0], a, n + "." + j, tit, ga);
      }
      b[2].forEach(function(k){ if (!T[k]) return; usadas[k] = 1; j++; out += boton(k, 0, n + "." + j, strip(T[k].title), ga); });
      var exp = b[3].filter(function(k){ if (aps[k]) return true; if (T[k]) { usadas[k] = 1; return true; } return false; }).map(function(k){
        return '<li class="temas-extra"' + ga + '><button type="button" data-igo="teoria" data-iarg="' + esc(k) + '"><span class="temas-t">' + esc(aps[k] || strip(T[k].title)) + '</span></button></li>';
      });
      if (exp.length) out += '<li class="temas-exp"' + ga + '><details><summary>' + esc(t("exploraciones")) + ' (' + exp.length + ')</summary><ol class="itin-temas">' + exp.join("") + '</ol></details></li>';
      /* (25-10, petición del profesor) cada bloque se pliega y despliega con su cabecera; al entrar, todos plegados */
      return '<details class="filb"' + ga + '><summary><h3 class="temas-b"' + ga + '>' + esc("Bloque") + ' ' + n + ' · ' + esc(strip(T[b[0]].title)) + ' <span class="filb-n">(' + j + ')</span></h3></summary><ol class="itin-temas"' + ga + '>' + out + '</ol></details>';
    }).join("");
    var resto = ks.filter(function(k){ return !usadas[k]; });
    if (resto.length) html += '<ol class="itin-temas">' + resto.map(function(k){ return boton(k, 0, "·", strip(T[k].title)); }).join("") + '</ol>';
    return '<div class="sec-head"><h2 class="sec">' + esc(t("temas")) + '</h2></div>' + html;
  }

  /* ---------- ficha de la materia: temas → la web en números → itinerario PAU ---------- */
  function temasHtml(subject){
    var T = coll("THEORY"), ks = temasDe(subject, true), C = G("CURSO");
    if (!ks.length && subject === "ipc" && Array.isArray(C) && view("clases")){   // 2.º ESO en castellano: las unidades de «Clases»
      return '<div class="sec-head"><h2 class="sec">' + esc(t("unidades")) + '</h2></div><ol class="itin-temas" style="--c:var(--ipc)">' + C.filter(function(u){ return u.sesiones && u.sesiones.length; }).map(function(u){
        return '<li><button type="button" data-igo="clases" data-iarg="' + esc(sid(u.sesiones[0].n)) + '"><span class="temas-n">' + esc(t("unidad", { n: u.unidad })) + '</span><span class="temas-t">' + esc(strip(String(u.titulo).replace(/\*\*/g, ""))) + '</span></button></li>';
      }).join("") + '</ol>';
    }
    if (!ks.length) return "";
    /* HF: agrupada por época, con el color de Biografías; Filosofía 1.º: por rama (js/epocas.js). Las demás, seguidas. */
    var EP = { int: "Introducción", ant: "Antigua", med: "Medieval", ren: "Renacimiento", mod: "Moderna", ilu: "Ilustración", con: "Contemporánea" };
    var RM = { int: "Introducción", ant: "Antropología", con: "Conocimiento", log: "Lógica", eti: "Ética", pol: "Política", est: "Estética" };
    var grpNames = null, grpAttr = "", grpOf = null;
    if (subject === "hf"){ grpNames = EP; grpAttr = "ep"; grpOf = window.Epocas ? function(n){ return window.Epocas.epocaDeTema(n); } : function(n){ return n <= 2 ? "int" : n <= 10 ? "ant" : n <= 12 ? "med" : n <= 17 ? "mod" : n <= 20 ? "ilu" : "con"; }; }
    /* (25-10, petición del profesor) en 1.º el Tema 1 también lleva grupo, «Introducción», en gris como la de HF */
    else if (subject === "fil"){ grpNames = RM; grpAttr = "rama"; grpOf = function(n){ return n === 1 ? "int" : window.Ramas ? window.Ramas.ramaDeTema(n) : ({ 2: "ant", 3: "con", 4: "log", 5: "eti", 6: "pol", 7: "est" })[n] || null; }; }
    if (subject === "fil" && T["fil-t1"]) return filBloquesHtml(T, ks);
    var groups = [], last = null;
    ks.forEach(function(k){
      var n = temaOf("teoria", k, T[k]), g = grpOf && typeof n === "number" ? grpOf(n) : "";
      if (!groups.length || last !== g){ groups.push({ g: g, ks: [] }); last = g; }
      groups[groups.length - 1].ks.push(k);
    });
    /* (18-10, orden del profesor) HF empieza por el Tema 3: la Introducción (temas 1-2) y lo que no tenga época, al final */
    if (subject === "hf") groups = groups.filter(function(gr){ return gr.g && gr.g !== "int"; }).concat(groups.filter(function(gr){ return gr.g === "int"; }), groups.filter(function(gr){ return !gr.g; }));
    /* (30-10, petición del profesor) HF con la misma portada que Filosofía 1.º: cada época es un bloque plegable
       «Bloque N · Época (n)», con su color; la Introducción, al final y sin número. n = temas del bloque (sin exploraciones). */
    var bloqueN = 0;
    return '<div class="sec-head"><h2 class="sec">' + esc(t("temas")) + '</h2></div>' + groups.map(function(gr){
      var plegable = subject === "hf" && !!gr.g, nTemas = 0, numB = (plegable && gr.g !== "int") ? ++bloqueN : 0;
      var cuerpo = '<ol class="itin-temas" style="--c:' + (SUBJ_COLOR[subject] || "var(--accent)") + '">' + (function(){
        /* (11-10) las exploraciones de cada tema van plegadas en «Exploraciones (n)», al final de lo de ese tema */
        var out = "", exp = [], ga = gr.g ? ' data-' + grpAttr + '="' + esc(gr.g) + '"' : '';
        function flush(){
          if (!exp.length) return;
          out += '<li class="temas-exp"' + ga + '><details><summary>' + esc(t("exploraciones")) + ' (' + exp.length + ')</summary><ol class="itin-temas">' + exp.join("") + '</ol></details></li>';
          exp = [];
        }
        gr.ks.forEach(function(k){
          var n = temaOf("teoria", k, T[k]), extra = !!extraDe(k, T[k]), anexo = extra && typeof T[k].temaN === "number";   /* anexos: «Exploración - …», sin «Tema N» */
          /* (12-10, rediseño Lote 1 · F4) el ampliado que ya declara su tema en el rótulo («Filosofía · Tema 1»,
             presocráticos; «Filosofía · Tema 5», helenismo) va sangrado bajo su tema y NO repite la ficha «Tema N» */
          var declaraN = extra && !anexo && temaNum(T[k]) != null;
          var li = '<li' + (extra ? ' class="temas-extra"' : '') + ga + '><button type="button" data-igo="teoria" data-iarg="' + esc(k) + '">' +
            (T[k].sigla ? '<span class="temas-n">' + esc(T[k].sigla) + '</span>' : typeof n === "number" && !anexo && !declaraN ? '<span class="temas-n">' + esc(t("tema", { n: n })) + '</span>' : '') + '<span class="temas-t">' + esc(anexo ? strip(T[k].title).replace(/^[^\s-]+ - /, "") : strip(T[k].title)) + (subject === "hf" && !anexo && typeof impBadge === "function" ? ' ' + impBadge("tema", typeof n === "number" && !T[k].sigla ? n : k) : '') + '</span>' + (subject === "hf" && PAU_TEMAS[n] ? '<span class="temas-pau">' + esc(t("pauBadge")) + '</span>' : '') + (anexo && T[k].clase ? '<span class="temas-anexo">En clase</span>' : '') + '</button></li>';
          if (anexo) exp.push(li);
          else { if (!extra) { flush(); nTemas++; } out += li; }
        });
        flush();
        return out;
      })() + '</ol>';
      if (plegable){
        var nom = esc((grpNames && grpNames[gr.g]) || gr.g);
        return '<details class="filb" data-ep="' + esc(gr.g) + '"><summary><h3 class="temas-b" data-ep="' + esc(gr.g) + '">' + (numB ? esc("Bloque") + ' ' + numB + ' · ' : '') + nom + ' <span class="filb-n">(' + nTemas + ')</span></h3></summary>' + cuerpo + '</details>';
      }
      return (gr.g ? '<h3 class="temas-b" data-' + grpAttr + '="' + esc(gr.g) + '">' + esc((grpNames && grpNames[gr.g]) || gr.g) + '</h3>' : '') + cuerpo;
    }).join("");
  }
  ["fil", "hf", "ipc"].forEach(function(s){
    var el = document.getElementById(s); if (!el) return;
    if (singleSubject() === s) el.querySelectorAll(":scope > .toolrow").forEach(function(o){ o.remove(); });   // sin la fila de botones curados: la lista de temas la sustituye
    var tmp = document.createElement("div");
    tmp.innerHTML = temasHtml(s);
    var first = el.querySelector(":scope > .sec-head");   // «Explora la materia» (la web en números)
    [].slice.call(tmp.children).forEach(function(n){ if (first) el.insertBefore(n, first); else el.appendChild(n); });
    if (s === "hf" && view("pau")){
      tmp.innerHTML = '<div class="itin-hub">' + pauHtml() + '</div>';
      var hub = el.querySelector(".hubmap");
      if (tmp.firstElementChild){ if (hub && hub.parentNode === el) el.insertBefore(tmp.firstElementChild, hub.nextSibling); else el.appendChild(tmp.firstElementChild); }
    }
  });

  /* ---------- migas de contexto ---------- */
  var LANDING = { inicio: 1, fil: 1, hf: 1, ipc: 1 };
  function homeId(){ return view("inicio") ? "inicio" : singleSubject(); }
  function crumbs(id){
    var v = document.getElementById(id); if (!v || !v.classList.contains("view")) return;
    var old = v.querySelector(":scope > .crumbs"); if (old) old.remove();
    if (LANDING[id]) return;
    // (13-10) conmutadores: si la vista es un modo de un grupo, la miga usa la ENTRADA del grupo
    // como sección y añade el modo (p. ej. «Practicar › Cuestionarios › Retos»).
    var entry = (typeof commuteEntry === "function") ? commuteEntry(id) : id;
    var mode = (typeof commuteLabel === "function" && entry !== id) ? commuteLabel(id) : "";
    var tabId = entry;   /* la vista «teoria» se abre desde el botón «Teoría» de su materia (#hf o #fil) */
    if (entry === "teoria"){ var TT = G("THEORY"), kk = G("theoryKey"), ss = TT && kk != null && TT[kk] && TT[kk].subject;
      tabId = (ss && document.querySelector('#tabs button[data-view="' + ss + '"]')) ? ss : (["hf", "fil"].filter(function(x){ return document.querySelector('#tabs button[data-view="' + x + '"]'); })[0] || entry); }
    var btn_ = document.querySelector('#tabs button[data-view="' + tabId + '"]'), h1 = v.querySelector("h1.title, h1");
    var secLabel = btn_ ? strip(btn_.textContent) : h1 ? strip(h1.textContent) : entry;
    var grp = btn_ && btn_.closest(".navsec"), gl = grp && grp.querySelector(".navgroup") ? strip(grp.querySelector(".navgroup").textContent) : "";
    var item = mode ? "" : crumbItem(id);
    /* (12-10) sin «Inicio» (ya no existe): «Grupo › Sección › [modo o elemento abierto]» */
    var parts = [];
    if (gl) parts.push(esc(gl));
    parts.push(esc(secLabel));
    if (mode) parts.push(esc(mode));
    else if (item) parts.push(esc(item));
    var html = parts.map(function(p, i){ return '<span' + (i === parts.length - 1 ? ' aria-current="page"' : '') + '>' + p + '</span>'; }).join('<span class="crumb-sep" aria-hidden="true">›</span>');
    var nav = document.createElement("nav"); nav.className = "crumbs"; nav.setAttribute("aria-label", t("ariaCrumbs")); nav.innerHTML = html;
    v.insertBefore(nav, v.firstChild);
  }
  /* (12-10) título del elemento abierto: el tema actual en Teoría; el resto de vistas no añaden crumb */
  function crumbItem(id){
    if (id === "teoria"){
      var m = /^#teoria\/([\w-]+)/.exec(location.hash || "");   /* enlace profundo: el tema exacto, no el primero */
      var k = m ? m[1] : G("theoryKey");
      var T = G("THEORY");
      if (k != null && T && T[k]) return T[k].title;
    }
    return null;
  }
  document.addEventListener("click", function(e){
    var a = e.target.closest && e.target.closest("[data-crumb]"); if (!a) return;
    e.preventDefault(); if (fn("show")) show(a.dataset.crumb);
  });
  if (fn("show")){
    var origShow = window.show;
    window.show = function(id){ origShow.apply(this, arguments); try { crumbs(id); renderPau(id); } catch (e){}; if (id === "teoria") setTimeout(function(){ try { crumbs("teoria"); } catch (e){} }, 0); };
  }
  var active = document.querySelector(".view.active"); if (active) crumbs(active.id);

  /* arranque: las vistas ya cargaron su primer elemento antes de este envoltorio */
  try {
    if (view("teoria") && G("theoryKey") != null) renderTeoria(G("theoryKey"));
    if (G("deckKey") != null) renderDeck(G("deckKey"));
    if (G("quizKey") != null) renderQuiz(G("quizKey"));
  } catch (e){}

  window.Itinerario = { itinerario: itinerario, temaOf: temaOf, go: go, epocaFicha: epocaFicha, gloTema: gloTema, claseTema: function(u){ return CLASES_TEMA[u] || null; }, temasDe: temasDe, esAnexo: esAnexo, PUENTES: PUENTES };
})();
