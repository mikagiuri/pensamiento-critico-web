"use strict";
/* ===== Vista "Esquemas de autor" ===== depende de: esquemas_autor.js =====
   Muestra los esquemas por tema/autor (mapas ds-* del departamento) en formato
   textual limpio, imprimible. Complementa la vista "Esquemas" (grafos mermaid). */

let eaBlock = "all";
const EA_BLOCKS = { A: "Antigua", B: "Medieval-Moderna", C: "Contemporánea" };

const EA_CSS = `
#esqautor .ea-actions{display:flex;align-items:center;gap:12px;margin:6px 0 16px;flex-wrap:wrap}
#esqautor .ea-print{background:var(--accent);color:var(--on-accent);border:0;border-radius:10px;
  padding:9px 16px;font-size:.92rem;font-weight:600}
#esqautor .ea-print:hover{background:var(--accent-2)}
#esqautor .easchema{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);
  padding:18px 20px;margin:0 0 14px;break-inside:avoid}
#esqautor .easchema h2{font-family:var(--serif);font-weight:600;font-size:1.25rem;margin:0 0 10px;color:var(--ink)}
#esqautor .easchema h3{font-family:var(--serif);font-weight:600;font-size:1.02rem;margin:14px 0 6px;color:var(--hf)}
#esqautor .easchema ul{list-style:none;margin:0;padding:0;display:grid;gap:4px}
#esqautor .easchema li{font-size:.94rem;color:var(--ink);padding-left:16px;position:relative}
#esqautor .easchema li::before{content:"";position:absolute;left:2px;top:.55em;width:6px;height:6px;
  border-radius:50%;background:var(--ipc)}
@media print{
  body *{visibility:hidden}
  #esqautor, #esqautor *{visibility:visible}
  #esqautor{position:absolute;left:0;top:0;width:100%;padding:0;margin:0}
  #esqautor .ea-actions, #esqautor .filterbar, #esqautor .eyebrow, #esqautor .lead{display:none}
  #esqautor .easchema{border:1px solid #ccc;box-shadow:none;break-inside:avoid}
}
`;
let _eaCss = false;
function eaInjectCss(){ if (_eaCss) return; const s = document.createElement("style"); s.textContent = EA_CSS; document.head.appendChild(s); _eaCss = true; }

function eaEsc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

function renderEAFilter(){
  const box = document.getElementById("eafilter");
  if (!box) return;
  box.innerHTML = '<div class="fgroup"><span class="flabel">Bloque</span>' +
    ["all", "A", "B", "C"].map(function (b){
      return '<button class="fbtn" data-eb="' + b + '" aria-pressed="' + (b === eaBlock) + '">' +
        (b === "all" ? "Todos" : EA_BLOCKS[b]) + '</button>'; }).join("") + '</div>';
  box.querySelectorAll("[data-eb]").forEach(function (b){ b.addEventListener("click", function (){
    eaBlock = b.dataset.eb; renderEAFilter(); renderEABody(); }); });
}

function renderEABody(){
  const box = document.getElementById("eabody");
  if (!box) return;
  const list = ESQUEMAS_AUTOR.filter(function (e){ return eaBlock === "all" || e.block === eaBlock; });
  box.innerHTML = list.map(function (sch){
    const secs = (sch.sections || []).map(function (s){
      const h = s.heading ? '<h3>' + eaEsc(s.heading) + '</h3>' : '';
      const items = (s.items || []).map(function (i){ return '<li>' + eaEsc(i) + '</li>'; }).join("");
      return h + '<ul>' + items + '</ul>';
    }).join("");
    return '<article class="easchema"><h2>' + eaEsc(sch.title) + '</h2>' + secs + '</article>';
  }).join("");
}

eaInjectCss();
renderEAFilter();
renderEABody();

/* Botón imprimir (se conecta en index.html o aquí por id). */
(function(){
  const b = document.getElementById("eaprint");
  if (b) b.addEventListener("click", function(){ window.print(); });
})();
