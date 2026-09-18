"use strict";
/* ===== Vista de materiales ===== depende de: materials.js ===== */

let materialKey = Object.keys(MATERIALS)[0];
let materialSubject = "all";

const MATERIAL_SUBJECTS = { fil: "Filosofía 1.º", hf: "Historia de la Filosofía", ipc: "Pensamiento crítico" };

function renderMaterialFilter(){
  const box = document.getElementById("materialfilter");
  const subjBtns = ["all", "fil", "hf", "ipc"].map(s =>
    '<button class="fbtn" data-subj="' + s + '" aria-pressed="' + (s === materialSubject) + '">' +
    (s === "all" ? "Todas" : MATERIAL_SUBJECTS[s]) + '</button>'
  ).join("");
  box.innerHTML = '<div class="fgroup"><span class="flabel">Materia</span>' + subjBtns + '</div>';
  box.querySelectorAll("[data-subj]").forEach(b => b.addEventListener("click", () => {
    materialSubject = b.dataset.subj;
    renderMaterialFilter();
    renderMaterialChips();
  }));
}

function renderMaterialChips(){
  const box = document.getElementById("materialchips");
  const entries = Object.entries(MATERIALS).filter(([k, t]) =>
    materialSubject === "all" || t.subject === materialSubject
  );
  box.innerHTML = entries
    .map(([k, t]) => '<button class="chip" data-mat="' + k + '" aria-pressed="' + (k === materialKey) + '">' + t.title + '</button>').join("");
  box.querySelectorAll("[data-mat]").forEach(b => b.addEventListener("click", () => loadMaterial(b.dataset.mat)));
}

function loadMaterial(k){
  materialKey = k;
  renderMaterialChips();
  const t = MATERIALS[k], body = document.getElementById("materialbody");
  body.innerHTML = '<div class="theory-head"><span class="kick" style="color:var(--' + t.subject + ')">' + t.tema + '</span><h1>' + t.title + '</h1></div>' + t.html;
  const hs = [...body.querySelectorAll("h2")];
  hs.forEach((h, i) => { h.id = "mh-" + i; });
  const toc = document.getElementById("mtoc");
  toc.innerHTML = '<div class="toc-title">En este material</div><ol>' +
    hs.map((h, i) => '<li><a href="#mh-' + i + '">' + h.textContent + '</a></li>').join("") + '</ol>';
}

renderMaterialFilter();
loadMaterial(materialKey);
