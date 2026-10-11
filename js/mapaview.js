"use strict";
/* ===== Mapa de la web (11-10-2026) =====
   Petición del profesor: un mapa de la web dentro de la propia web. Se abre desde el pie («Mapa de la web», #mapa).
   Se construye al cargar a partir del menú (#tabs) tal como lo deja cada build, así que cada web publicada
   (Filosofía 1.º, HF, ESO, y sus traducciones) muestra solo sus secciones, en el orden del menú, con una línea
   de qué hay en cada una y, cuando se puede contar, cuántos elementos tiene. Debajo, los temas de cada materia
   con sus exploraciones (de Itinerario.temasDe) y, dentro de Ilustres, las fichas de época.
   Los textos van en MAPA_TXT y MAPA_DESC (se traducen con el diccionario de interfaz ui/<lang>.json). */
const MAPA_TXT = {
  secciones: "Secciones", temas: "Temas de cada materia", tema: "Tema {n}", exploraciones: "Exploraciones",
  epocas: "Fichas de época", otras: "Otras secciones", elementos: "elementos"
};
const MAPA_SUBJ = { fil: "Filosofía 1.º Bachillerato", hf: "Historia de la Filosofía 2.º Bachillerato", ipc: "Pensamiento crítico 2.º ESO" };
const MAPA_DESC = {
  inicio: "Portada del taller, con las tres materias y el horario.",
  fil: "La ficha de la materia: temas, recursos y cómo estudiar.",
  hf: "La ficha de la materia: temas, recursos y cómo estudiar.",
  ipc: "La ficha de la materia: unidades, recursos y cómo estudiar.",
  sesiones: "Lo que se hace en cada sesión de clase.",
  calendario: "Fechas del curso, evaluaciones y exámenes.",
  tiempo: "Reparto del tiempo de cada tema.",
  teoria: "Los apuntes de cada tema, con sus exploraciones para ir más allá.",
  clases: "El curso de Pensamiento crítico, sesión a sesión.",
  materiales: "Fichas, actividades y documentos para descargar.",
  cuentos: "Cuentos para pensar, con sus preguntas.",
  tarjetas: "Tarjetas de repaso: pregunta por delante, respuesta por detrás.",
  reto: "Preguntas contrarreloj para repasar jugando.",
  parejas: "Juego de memoria: une cada concepto con su pareja.",
  glosario: "Los conceptos de cada tema, con su definición y su origen.",
  ilustres: "Biografías de los pensadores y fichas de cada época.",
  citas: "Frases célebres de los filósofos, explicadas.",
  adagios: "Lemas clásicos en latín y griego, con su historia.",
  duelo: "Debate contra el ordenador: caza sus falacias o responde con razones más fuertes, sin perder el temple.",
  polemicas: "Pensadores que coincidieron en el tiempo y se enfrentaron: elige con quién vas y por qué.",
  mundo: "Si la clase fuera el mundo: los datos del planeta, en tu aula.",
  camino: "Historias en las que eliges qué hacer y ves las consecuencias.",
  eudaimonia: "Juego sobre la felicidad según Aristóteles.",
  republica: "Juego para organizar la ciudad ideal de Platón.",
  rayuela: "Encuentra la contradicción en los textos de los filósofos.",
  nudos: "Problemas que parecen fáciles y no lo son.",
  dilemas: "Casos difíciles para debatir qué está bien.",
  logica: "Tablas de verdad, silogismos, cuadrado de oposición y diagramas.",
  leibniz: "Leibniz y sus inventos: la calculadora, el binario y el cálculo.",
  infografias: "Cada tema resumido en una imagen.",
  galeria: "Obras de arte e ilustraciones de los temas.",
  mapas: "Mapas conceptuales de los temas.",
  cronogramas: "Líneas de tiempo de autores y épocas.",
  genealogias: "Quién influyó en quién: maestros, discípulos y rivales.",
  esquemas: "Esquemas de las ideas principales de cada tema.",
  esqautor: "Un resumen por autor, para la PAU.",
  diapositivas: "Presentaciones de los temas.",
  rescritura: "Aprende a reescribir un texto con tus palabras.",
  pistas: "Problemas con pistas que se van abriendo poco a poco.",
  cuestionarios: "Preguntas tipo test de cada tema, con corrección.",
  juegosucio: "Las trampas de la discusión, para reconocerlas.",
  unidad: "Todas las preguntas de una unidad, juntas.",
  rubricas: "Cómo se corrigen los trabajos y los exámenes.",
  evidencias: "Evidencias de aprendizaje del curso pasado.",
  recursos: "Enlaces y herramientas externas.",
  pau: "Cómo es la prueba de acceso a la universidad.",
  comentario: "Cómo se hace un comentario de texto, con ejemplos resueltos.",
  disertaciones: "Cómo se escribe una disertación, con modelos.",
  lecturas: "Los textos de los autores para leer y comentar.",
  tutoria: "Materiales de tutoría.",
  signos: "Curso de lengua de signos."
};
/* cuántos elementos tiene cada sección (si su colección está cargada en esta web) */
const MAPA_CUENTA = { tarjetas: "DECKS", cuestionarios: "QUIZZES", glosario: "GLOSARIO", ilustres: "ILUSTRES", citas: "CITAS", adagios: "ADAGIOS", polemicas: "POLEMICAS",
  infografias: "INFOGRAFIAS", mapas: "MAPS", esquemas: "ESQUEMAS", cronogramas: "CRONOGRAMAS", genealogias: "GENEALOGIAS", lecturas: "LECTURAS",
  galeria: "GALERIA", dilemas: "DILEMAS", disertaciones: "DISERTACIONES", nudos: "NUDOS", pistas: "PISTAS", materiales: "MATERIALS" };
function mapaG(name){ try { return (0, eval)("typeof " + name + " !== 'undefined' ? " + name + " : undefined"); } catch (e){ return undefined; } }
function mapaEsc(s){ return String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
function mapaStrip(s){ return String(s == null ? "" : s).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(); }
function mapaCuenta(v){
  if (v === "teoria"){ const It = window.Itinerario; return It && It.temasDe ? ["fil", "hf", "ipc"].reduce((n, s) => n + It.temasDe(s, true).length, 0) : 0; }
  const c = MAPA_CUENTA[v] && mapaG(MAPA_CUENTA[v]);
  return c ? (Array.isArray(c) ? c.length : Object.keys(c).length) : 0;
}
function mapaItem(el){
  if (el.tagName === "A") return '<li><a class="mapa-a" href="' + mapaEsc(el.getAttribute("href")) + '" target="_blank" rel="noopener">' + mapaEsc(mapaStrip(el.innerHTML)) + '</a></li>';
  const v = el.dataset.view; if (!v || v === "mapa" || !document.getElementById(v)) return "";
  const n = mapaCuenta(v), extra = v === "ilustres" ? mapaEpocas() : "";
  return '<li><button type="button" class="mapa-a" data-igo="' + mapaEsc(v) + '" data-iarg="">' + mapaEsc(mapaStrip(el.textContent)) + '</button>' +
    (n ? ' <span class="mapa-n" title="' + n + " " + MAPA_TXT.elementos + '">' + n + '</span>' : '') +
    (MAPA_DESC[v] ? '<span class="mapa-d">' + mapaEsc(MAPA_DESC[v]) + '</span>' : '') + extra + '</li>';
}
function mapaEpocas(){
  const EF = mapaG("EPOCAS_FICHAS"); if (!EF || typeof iluNombreFicha !== "function") return "";
  return '<span class="mapa-sub"><b>' + MAPA_TXT.epocas + ':</b> ' + Object.keys(EF).map(k =>
    '<button type="button" class="mapa-a" data-igo="ilustres" data-iarg="epoca-' + k + '">' + mapaEsc(iluNombreFicha(k)) + '</button>').join(" · ") + '</span>';
}
function mapaTemas(){
  const It = window.Itinerario, T = mapaG("THEORY"); if (!It || !It.temasDe || !T) return "";
  const lab = k => { const o = T[k], n = It.temaOf("teoria", k, o); return (o.sigla ? o.sigla + " · " : typeof n === "number" ? MAPA_TXT.tema.replace("{n}", n) + " · " : "") + mapaStrip(o.title); };
  const lnk = k => '<button type="button" class="mapa-a" data-igo="teoria" data-iarg="' + mapaEsc(k) + '">' + mapaEsc(lab(k)) + '</button>';
  const exp = k => mapaStrip(T[k].title).replace(/^(Exploración|Esplorazioa|Exploration|Anexo|Eranskina|Annexe|Annex|Appendix|استكشاف)\s*[-–:]\s*/, "");
  return ["fil", "hf", "ipc"].map(s => {
    const ks = It.temasDe(s); if (!ks.length) return "";
    const todos = It.temasDe(s, true), anexos = todos.filter(k => It.esAnexo && It.esAnexo(T[k]));
    return '<div class="mapa-grupo"><h3>' + mapaEsc(MAPA_SUBJ[s]) + '</h3><ol class="mapa-temas">' + ks.map(k => {
      const n = It.temaOf("teoria", k, T[k]), ex = T[k].sigla ? [] : anexos.filter(a => T[a].temaN === n);
      return '<li>' + lnk(k) + (ex.length ? '<details class="mapa-exp"><summary>' + MAPA_TXT.exploraciones + ' (' + ex.length + ')</summary><ul>' +
        ex.map(a => '<li><button type="button" class="mapa-a" data-igo="teoria" data-iarg="' + mapaEsc(a) + '">' + mapaEsc(exp(a)) + '</button></li>').join("") + '</ul></details>' : '') + '</li>';
    }).join("") + '</ol></div>';
  }).join("");
}
function renderMapa(){
  const box = document.getElementById("mapabox"), tabs = document.getElementById("tabs"); if (!box || !tabs) return;
  const grupos = [], sueltos = [];
  [...tabs.children].forEach(el => {
    if (el.classList.contains("navsec")){
      const g = el.querySelector(".navgroup"), items = [...el.querySelectorAll(".navmenu > button, .navmenu > a")].map(mapaItem).join("");
      if (items) grupos.push('<div class="mapa-grupo"><h3>' + mapaEsc(mapaStrip(g ? g.textContent : "")) + '</h3><ul class="mapa-lista">' + items + '</ul></div>');
    } else if (el.matches("button[data-view], a")) sueltos.push(mapaItem(el));
  });
  const s = sueltos.join("");
  box.innerHTML = '<h2 class="sec">' + MAPA_TXT.secciones + '</h2><div class="mapa-cols">' +
    (s ? '<div class="mapa-grupo"><h3>' + MAPA_TXT.otras + '</h3><ul class="mapa-lista">' + s + '</ul></div>' : '') + grupos.join("") + '</div>' +
    (function(){ const t = mapaTemas(); return t ? '<h2 class="sec">' + MAPA_TXT.temas + '</h2><div class="mapa-cols">' + t + '</div>' : ""; })();
}
document.addEventListener("DOMContentLoaded", () => { try { renderMapa(); } catch (e){} });
