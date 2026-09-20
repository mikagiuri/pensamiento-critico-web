"use strict";
/* ===== Botón «Imprimir» en las vistas de contenido =====
   Añade un botón que llama a window.print(); el @media print de styles.css deja
   en el papel solo el contenido de la vista activa (sin cabecera, menú, filtros ni
   índice). El botón se inserta en un sitio estable (antes de .theory-layout), que no
   se re-renderiza al cambiar de tema/lectura. */
(function(){
  var VIEWS = ["teoria", "materiales", "lecturas", "disertaciones", "pau"];
  VIEWS.forEach(function(id){
    var view = document.getElementById(id); if (!view) return;
    var layout = view.querySelector(".theory-layout"); if (!layout) return;
    if (view.querySelector(".print-row")) return;
    var row = document.createElement("div");
    row.className = "print-row";
    var btn = document.createElement("button");
    btn.className = "btn print-btn"; btn.type = "button";
    btn.textContent = "🖨 Imprimir";
    btn.title = "Imprimir esta página";
    btn.addEventListener("click", function(){ window.print(); });
    row.appendChild(btn);
    layout.parentNode.insertBefore(row, layout);
  });
})();
