"use strict";
/* ===== Vista de rúbricas ===== depende de: rubricas.js ===== */

function renderRubricas(){
  const box = document.getElementById("rubricaslist");
  const keys = Object.keys(RUBRICAS);
  box.innerHTML = keys.map(k => {
    const r = RUBRICAS[k];
    const rows = r.sections.map(s => {
      const items = s.items.map(it =>
        '<tr><td class="r-code">' + it.code + '</td><td>' + it.text + '</td><td class="r-pts">' + it.pts + '</td></tr>'
      ).join("");
      return '<tr class="r-sec"><td colspan="3">' + s.title + ' <span class="r-max">(máx. ' + s.max + ')</span></td></tr>' + items;
    }).join("");
    return '<article class="rcard"><h3>' + r.title + '</h3>' +
      '<p class="r-tema">' + r.tema + '</p>' +
      '<p class="r-intro">' + r.intro + '</p>' +
      '<div class="tablewrap"><table class="rubrica"><thead><tr><th>Ítem</th><th>Contenido a identificar</th><th>Puntos</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '</article>';
  }).join("");
}

renderRubricas();
