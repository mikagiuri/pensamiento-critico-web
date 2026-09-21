"use strict";
/* ===== Esquemas de Filosofía 1.º (mapas conceptuales, mermaid) =====
   Se añaden al objeto ESQUEMAS como grupo «F1». Depende de esquemas.js (cargado antes). */
if (typeof ESQUEMAS !== "undefined") Object.assign(ESQUEMAS, {
 "FIL-T1-01": {
  "subject": "fil",
  "block": "F1",
  "tema": "Filosofía · Tema 1",
  "title": "¿Qué es la filosofía?",
  "mermaid": "flowchart TD\n  center[\"¿QUÉ ES LA FILOSOFÍA?\"]:::axis\n  origen[\"del mito al logos\"]:::key\n  mito[\"mito: explicación por los dioses\"]\n  logos[\"logos: explicación racional\"]\n  carac[\"características\"]:::key\n  c1[\"racional (da razones)\"]\n  c2[\"crítica (no acepta sin examen)\"]\n  c3[\"radical (va a la raíz)\"]\n  c4[\"universal (todo puede ser pensado)\"]\n  saber[\"saber de segundo grado: pregunta por los fundamentos\"]:::key\n  center -->|\"nace\"| origen\n  origen --> mito\n  origen -->|\"pasa al\"| logos\n  center -->|\"es un saber\"| carac\n  carac --> c1\n  carac --> c2\n  carac --> c3\n  carac --> c4\n  center -->|\"por eso es\"| saber\nclassDef axis fill:#1f5d5a,color:#fff,stroke:#1f5d5a;\nclassDef key fill:#9a6a22,color:#fff,stroke:#9a6a22;"
 },
 "FIL-T1-02": {
  "subject": "fil",
  "block": "F1",
  "tema": "Filosofía · Tema 1",
  "title": "Las ramas de la filosofía",
  "mermaid": "flowchart TD\n  fil[\"LA FILOSOFÍA\"]:::axis\n  q1[\"¿qué es la realidad?\"]\n  met[\"Metafísica y Ontología\"]:::key\n  q2[\"¿qué podemos conocer?\"]\n  epi[\"Epistemología\"]:::key\n  q3[\"¿cómo debemos actuar?\"]\n  eti[\"Ética\"]:::key\n  q4[\"¿cómo organizar la convivencia?\"]\n  pol[\"Filosofía política\"]:::key\n  q5[\"¿qué es la belleza y el arte?\"]\n  est[\"Estética\"]:::key\n  q6[\"¿cómo razonar correctamente?\"]\n  log[\"Lógica\"]:::key\n  fil --> q1 --> met\n  fil --> q2 --> epi\n  fil --> q3 --> eti\n  fil --> q4 --> pol\n  fil --> q5 --> est\n  fil --> q6 --> log\nclassDef axis fill:#1f5d5a,color:#fff,stroke:#1f5d5a;\nclassDef key fill:#9a6a22,color:#fff,stroke:#9a6a22;"
 },
 "FIL-T2-01": {
  "subject": "fil",
  "block": "F1",
  "tema": "Filosofía · Tema 2",
  "title": "Naturaleza y cultura en el ser humano",
  "mermaid": "flowchart TD\n  center[\"EL SER HUMANO\"]:::axis\n  bio[\"dimensión biológica\"]:::key\n  hom[\"hominización: evolución del cuerpo\"]\n  ev[\"homínidos, bipedismo, mano, encéfalo\"]\n  cul[\"dimensión cultural\"]:::key\n  hum[\"humanización: aprendizaje social\"]\n  simb[\"animal simbólico: lenguaje, técnica, cultura\"]\n  sintesis[\"naturaleza y cultura se entrelazan\"]:::key\n  center --> bio\n  bio --> hom --> ev\n  center --> cul\n  cul --> hum --> simb\n  bio -->|\"se combinan en\"| sintesis\n  cul -->|\"se combinan en\"| sintesis\nclassDef axis fill:#1f5d5a,color:#fff,stroke:#1f5d5a;\nclassDef key fill:#9a6a22,color:#fff,stroke:#9a6a22;"
 },
 "FIL-T2-02": {
  "subject": "fil",
  "block": "F1",
  "tema": "Filosofía · Tema 2",
  "title": "El problema mente-cuerpo",
  "mermaid": "flowchart TD\n  q[\"¿CUERPO Y MENTE?\"]:::axis\n  dual[\"Dualismo\"]:::key\n  d1[\"dos realidades distintas: alma y cuerpo (Platón, Descartes)\"]\n  mon[\"Monismo\"]:::key\n  m1[\"una sola realidad\"]\n  mat[\"materialismo: todo es materia\"]\n  emer[\"emergentismo: la mente surge del cerebro\"]\n  q --> dual --> d1\n  q --> mon --> m1\n  m1 --> mat\n  m1 --> emer\nclassDef axis fill:#1f5d5a,color:#fff,stroke:#1f5d5a;\nclassDef key fill:#9a6a22,color:#fff,stroke:#9a6a22;"
 },
 "FIL-T3-01": {
  "subject": "fil",
  "block": "F1",
  "tema": "Filosofía · Tema 3",
  "title": "Racionalismo, empirismo y Kant",
  "mermaid": "flowchart TD\n  con[\"EL CONOCIMIENTO\"]:::axis\n  fuente[\"¿cuál es su fuente?\"]:::key\n  rac[\"Racionalismo\"]:::key\n  r1[\"la razón; ideas innatas (Descartes)\"]\n  emp[\"Empirismo\"]:::key\n  e1[\"la experiencia; mente como tabula rasa (Locke, Hume)\"]\n  kant[\"Kant: síntesis crítica\"]:::key\n  k1[\"conocemos fenómenos: experiencia + formas a priori\"]\n  con --> fuente\n  fuente --> rac --> r1\n  fuente --> emp --> e1\n  rac -->|\"los reúne\"| kant\n  emp -->|\"los reúne\"| kant\n  kant --> k1\nclassDef axis fill:#1f5d5a,color:#fff,stroke:#1f5d5a;\nclassDef key fill:#9a6a22,color:#fff,stroke:#9a6a22;"
 },
 "FIL-T3-02": {
  "subject": "fil",
  "block": "F1",
  "tema": "Filosofía · Tema 3",
  "title": "La ciencia y su método",
  "mermaid": "flowchart TD\n  ci[\"LA CIENCIA\"]:::axis\n  met[\"método hipotético-deductivo\"]:::key\n  h[\"problema, hipótesis, contrastación, ley\"]\n  pop[\"Popper: falsacionismo\"]:::key\n  p1[\"una teoría es científica si puede ser refutada\"]\n  kuhn[\"Kuhn: paradigmas\"]:::key\n  ku[\"ciencia normal, crisis, revolución, nuevo paradigma\"]\n  ci --> met --> h\n  ci --> pop --> p1\n  ci --> kuhn --> ku\nclassDef axis fill:#1f5d5a,color:#fff,stroke:#1f5d5a;\nclassDef key fill:#9a6a22,color:#fff,stroke:#9a6a22;"
 }
});
