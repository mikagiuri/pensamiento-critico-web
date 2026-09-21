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
 },
 "FIL-T5-01": {
  "subject": "fil",
  "block": "F1",
  "tema": "Filosofía · Tema 5",
  "title": "Ética y moral: tipos de teorías",
  "mermaid": "flowchart TD\n  center[\"LA ÉTICA\"]:::axis\n  moral[\"reflexiona sobre la MORAL\"]:::key\n  m1[\"normas y valores de una comunidad\"]\n  tipos[\"tipos de teorías éticas\"]:::key\n  mat[\"materiales: dicen cuál es el bien o fin\"]:::key\n  form[\"formales: dan la forma del deber, no el contenido\"]:::key\n  tele[\"teleológicas: miran el fin y las consecuencias\"]\n  deon[\"deontológicas: miran el deber en sí\"]\n  center -->|\"piensa la\"| moral --> m1\n  center --> tipos\n  tipos --> mat\n  tipos --> form\n  mat -->|\"suelen ser\"| tele\n  form -->|\"suelen ser\"| deon\nclassDef axis fill:#1f5d5a,color:#fff,stroke:#1f5d5a;\nclassDef key fill:#9a6a22,color:#fff,stroke:#9a6a22;"
 },
 "FIL-T5-02": {
  "subject": "fil",
  "block": "F1",
  "tema": "Filosofía · Tema 5",
  "title": "Las grandes teorías éticas",
  "mermaid": "flowchart TD\n  et[\"TEORÍAS ÉTICAS\"]:::axis\n  ar[\"Eudaimonismo (Aristóteles)\"]:::key\n  a1[\"fin: la felicidad (eudaimonía) mediante la virtud\"]\n  ep[\"Hedonismo y Utilitarismo (Epicuro, Mill)\"]:::key\n  e1[\"fin: el placer, o la mayor felicidad para el mayor número\"]\n  ka[\"Deontología (Kant)\"]:::key\n  k1[\"el deber por respeto a la ley: imperativo categórico\"]\n  em[\"Emotivismo (Hume)\"]:::key\n  h1[\"los juicios morales expresan sentimientos\"]\n  et --> ar --> a1\n  et --> ep --> e1\n  et --> ka --> k1\n  et --> em --> h1\nclassDef axis fill:#1f5d5a,color:#fff,stroke:#1f5d5a;\nclassDef key fill:#9a6a22,color:#fff,stroke:#9a6a22;"
 },
 "FIL-T7-01": {
  "subject": "fil",
  "block": "F1",
  "tema": "Filosofía · Tema 7",
  "title": "¿Qué es la belleza?",
  "mermaid": "flowchart TD\n  bel[\"LA BELLEZA\"]:::axis\n  q[\"¿dónde está?\"]:::key\n  obj[\"Objetivismo: en el objeto\"]:::key\n  o1[\"proporción y armonía (los clásicos)\"]\n  sub[\"Subjetivismo: en el sujeto\"]:::key\n  s1[\"sobre gustos no hay nada escrito\"]\n  jui[\"el juicio estético\"]:::key\n  j1[\"Kant: gusto sin concepto, con pretensión de universalidad\"]\n  bel --> q\n  q --> obj --> o1\n  q --> sub --> s1\n  bel -->|\"lo resuelve\"| jui --> j1\nclassDef axis fill:#1f5d5a,color:#fff,stroke:#1f5d5a;\nclassDef key fill:#9a6a22,color:#fff,stroke:#9a6a22;"
 },
 "FIL-T7-02": {
  "subject": "fil",
  "block": "F1",
  "tema": "Filosofía · Tema 7",
  "title": "Teorías sobre qué es el arte",
  "mermaid": "flowchart TD\n  art[\"¿QUÉ ES EL ARTE?\"]:::axis\n  mim[\"Mímesis: imitar la realidad\"]:::key\n  exp[\"Expresión: comunicar emociones\"]:::key\n  form[\"Formalismo: importa la forma (arte por el arte)\"]:::key\n  inst[\"Teoría institucional: arte es lo que el mundo del arte reconoce\"]:::key\n  fun[\"funciones del arte\"]:::key\n  f1[\"estética, cognoscitiva, social y crítica\"]\n  art --> mim\n  art --> exp\n  art --> form\n  art --> inst\n  art -->|\"cumple\"| fun --> f1\nclassDef axis fill:#1f5d5a,color:#fff,stroke:#1f5d5a;\nclassDef key fill:#9a6a22,color:#fff,stroke:#9a6a22;"
 },
 "FIL-TA-01": {
  "subject": "fil",
  "block": "F1",
  "tema": "Filosofía · Taller de argumentación",
  "title": "El argumento: validez y verdad",
  "mermaid": "flowchart TD\n  arg[\"EL ARGUMENTO\"]:::axis\n  prem[\"premisas\"]:::key\n  conc[\"conclusión\"]:::key\n  tipos[\"tipos\"]:::key\n  ded[\"deductivo: la conclusión se sigue con necesidad\"]\n  ind[\"inductivo: la conclusión es solo probable\"]\n  eval[\"evaluación\"]:::key\n  val[\"validez: la forma es correcta\"]\n  ver[\"verdad: las premisas son verdaderas\"]\n  sol[\"sólido: válido + premisas verdaderas\"]:::key\n  arg --> prem\n  prem -->|\"apoyan la\"| conc\n  arg --> tipos\n  tipos --> ded\n  tipos --> ind\n  arg --> eval\n  eval --> val\n  eval --> ver\n  val -->|\"juntas dan\"| sol\n  ver -->|\"juntas dan\"| sol\nclassDef axis fill:#1f5d5a,color:#fff,stroke:#1f5d5a;\nclassDef key fill:#9a6a22,color:#fff,stroke:#9a6a22;"
 },
 "FIL-TA-02": {
  "subject": "fil",
  "block": "F1",
  "tema": "Filosofía · Taller de argumentación",
  "title": "Las falacias",
  "mermaid": "flowchart TD\n  fal[\"LAS FALACIAS\"]:::axis\n  def[\"argumentos que parecen válidos pero no lo son\"]\n  formal[\"formales: fallo en la estructura lógica\"]:::key\n  inf[\"informales: fallo en el contenido o el lenguaje\"]:::key\n  ah[\"ad hominem: atacar a la persona\"]\n  ap[\"ad populum: apelar a la mayoría\"]\n  aver[\"ad verecundiam: apelar a la autoridad\"]\n  fc[\"falsa causa: confundir correlación con causa\"]\n  hp[\"hombre de paja: deformar la tesis rival\"]\n  fal --> def\n  fal --> formal\n  fal --> inf\n  inf --> ah\n  inf --> ap\n  inf --> aver\n  inf --> fc\n  inf --> hp\nclassDef axis fill:#1f5d5a,color:#fff,stroke:#1f5d5a;\nclassDef key fill:#9a6a22,color:#fff,stroke:#9a6a22;"
 }
});
