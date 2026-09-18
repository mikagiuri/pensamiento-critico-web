"use strict";
/* ===== Vista Glosario ===== depende de: glosario.js =====
   Lista de referencia buscable y filtrable, extraída del libro MDLTFH (castellano).
   Filtra por bloque (A/B/C) y área temática; busca en término + definición sin
   distinguir mayúsculas ni acentos. Estilos propios inyectados una vez (usan las
   variables de tema de styles.css, así que respetan claro/oscuro). */

const GLO_BLOCKS = { A: "Antigua", B: "Medieval-Moderna", C: "Contemporánea" };
let gloBloque = ["A", "B", "C"].find(function (b){ return GLOSARIO.some(function (g){ return g.bloque === b; }); }) || "all", gloArea = "all", gloQuery = "";  /* bloque concreto por defecto, nunca «Todos» */

const GLO_CSS = `
#glosario .glotools{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:12px 0 4px}
#glosario .glosearch{flex:1;min-width:220px;padding:10px 14px;border:1px solid var(--line);border-radius:12px;font:inherit;background:var(--surface);color:var(--ink)}
#glosario .glosearch:focus{outline:2px solid var(--accent);outline-offset:0;border-color:var(--accent)}
#glosario .gloarea{padding:10px 12px;border:1px solid var(--line);border-radius:12px;font:inherit;background:var(--surface);color:var(--ink);max-width:100%}
#glosario .glocount{color:var(--muted);font-size:13px;margin:10px 0 16px}
#glosario .glolist{display:grid;gap:10px}
#glosario .gloitem{border:1px solid var(--line);border-left:3px solid var(--accent);border-radius:var(--radius);padding:13px 16px 14px;background:var(--surface);box-shadow:var(--shadow)}
#glosario .gloitem .top{display:flex;justify-content:space-between;gap:12px;align-items:baseline}
#glosario .gloitem h4{margin:0 0 5px;font-size:17px;font-family:var(--serif);color:var(--ink)}
#glosario .gloitem .tag{font-size:11px;letter-spacing:.05em;text-transform:uppercase;color:var(--muted);font-weight:600;white-space:nowrap}
#glosario .gloitem p{margin:0;font-size:14.5px;line-height:1.55;color:var(--ink)}
#glosario .gloitem .src{color:var(--muted);font-size:12px;margin-top:7px}
#glosario mark{background:var(--accent);color:var(--on-accent);padding:0 2px;border-radius:3px}
#glosario .gloempty{color:var(--muted);padding:24px 2px}
`;

function gloFold(s){ return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
function gloEsc(s){ return (s || "").replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c])); }
function gloBold(s){ return s.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>"); }
function gloHi(escaped, q){
  if (!q || q.length < 2) return escaped;
  const rx = new RegExp("(" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi");
  return escaped.replace(rx, "<mark>$1</mark>");
}

let _gloReady = false;
function gloInject(){
  if (_gloReady) return;
  const st = document.createElement("style"); st.textContent = GLO_CSS;
  document.head.appendChild(st); _gloReady = true;
}

function renderGloControls(){
  const box = document.getElementById("glofilter");
  if (!box) return;
  gloInject();
  const areas = Array.from(new Set(GLOSARIO.map(g => g.area).filter(Boolean))).sort((a, b) => a.localeCompare(b, "es"));
  const blkBtns = ["all", "A", "B", "C"].map(b =>
    '<button class="fbtn" data-blk="' + b + '" aria-pressed="' + (b === gloBloque) + '">' +
    (b === "all" ? "Todos" : GLO_BLOCKS[b]) + '</button>').join("");
  const areaOpts = ['<option value="all">Todas las áreas</option>']
    .concat(areas.map(a => '<option value="' + a + '">' + a + '</option>')).join("");
  box.innerHTML =
    '<div class="fgroup"><span class="flabel">Bloque</span>' + blkBtns + '</div>' +
    '<div class="glotools">' +
      '<input class="glosearch" id="glosearch" type="search" placeholder="Buscar término o definición…" autocomplete="off" aria-label="Buscar en el glosario">' +
      '<select class="gloarea" id="gloarea" aria-label="Filtrar por área">' + areaOpts + '</select>' +
    '</div>';

  box.querySelectorAll("[data-blk]").forEach(b => b.addEventListener("click", () => {
    gloBloque = b.dataset.blk;
    box.querySelectorAll("[data-blk]").forEach(x => x.setAttribute("aria-pressed", x.dataset.blk === gloBloque));
    renderGloList();
  }));
  const sel = document.getElementById("gloarea");
  sel.value = gloArea;
  sel.addEventListener("change", () => { gloArea = sel.value; renderGloList(); });
  const inp = document.getElementById("glosearch");
  inp.value = gloQuery;
  let t = null;
  inp.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => { gloQuery = inp.value.trim(); renderGloList(); }, 120); });
}

function renderGloList(){
  const list = document.getElementById("glolist");
  const cnt = document.getElementById("glocount");
  if (!list) return;
  const q = gloFold(gloQuery);
  const rows = GLOSARIO.filter(g => {
    if (gloBloque !== "all" && g.bloque !== gloBloque) return false;
    if (gloArea !== "all" && g.area !== gloArea) return false;
    if (q && !gloFold(g.t + " " + g.def + " " + g.area).includes(q)) return false;
    return true;
  });
  if (cnt) cnt.textContent = rows.length + (rows.length === 1 ? " término" : " términos") +
    (rows.length !== GLOSARIO.length ? " (de " + GLOSARIO.length + ")" : "");
  if (!rows.length){ list.innerHTML = '<p class="gloempty">No hay términos que coincidan con la búsqueda.</p>'; return; }
  list.innerHTML = rows.map(g => {
    const term = gloHi(gloEsc(g.t), gloQuery);
    const def = gloHi(gloBold(gloEsc(g.def)), gloQuery);
    const tag = (g.area ? g.area : "") + (g.bloque ? " · " + (GLO_BLOCKS[g.bloque] || g.bloque) : "");
    const src = g.tema ? '<div class="src">' + gloEsc(g.tema) + (g.unidad ? " · " + g.unidad : "") + '</div>' : "";
    return '<article class="gloitem"><div class="top"><h4>' + term + '</h4><span class="tag">' + gloEsc(tag) + '</span></div><p>' + def + '</p>' + src + '</article>';
  }).join("");
}

renderGloControls();
renderGloList();
