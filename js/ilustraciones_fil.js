"use strict";
/* ===== Ilustraciones de tema (Filosofía 1.º) — imágenes de DOMINIO PÚBLICO =====
   {f:ruta, t:título, pie, tema:clave THEORY, license, artist, page(Commons)}.
   Recopiladas de Wikimedia Commons (PD). Sin atribución obligatoria; se cita por cortesía. */
const ILUSTRACIONES = [
 {
  "f": "media/ilustraciones/altamira_bison.jpg",
  "t": "Bisonte de Altamira",
  "pie": "Arte rupestre paleolítico: los primeros símbolos y la cultura.",
  "tema": "fil-t2",
  "license": "Public domain",
  "artist": "unknown prehistoric artist",
  "page": "https://commons.wikimedia.org/wiki/File:Altamira,_bison.jpg"
 },
 {
  "f": "media/ilustraciones/evolucion_huxley.jpg",
  "t": "El lugar del hombre en la naturaleza",
  "pie": "Esqueletos comparados (Huxley, 1863): la continuidad evolutiva.",
  "tema": "fil-t2",
  "license": "Public domain",
  "artist": "Benjamin Waterhouse Hawkins (1807–94)",
  "page": "https://commons.wikimedia.org/wiki/File:Huxley_-_Mans_Place_in_Nature.jpg"
 },
 {
  "f": "media/ilustraciones/homo_erectus_craneo.png",
  "t": "Cráneo de Homo erectus",
  "pie": "Un homínido extinto en la línea hacia el ser humano.",
  "tema": "fil-t2",
  "license": "Public domain",
  "artist": "Franz Weidenreich",
  "page": "https://commons.wikimedia.org/wiki/File:Homo_erectus_skull_cross-section.png"
 },
 {
  "f": "media/ilustraciones/java_man.jpg",
  "t": "El «hombre de Java»",
  "pie": "Reconstrucción de Pithecanthropus (Homo erectus): la hominización.",
  "tema": "fil-t2",
  "license": "Public domain",
  "artist": "J. H. McGREGOR",
  "page": "https://commons.wikimedia.org/wiki/File:Java_man.jpg"
 },
 {
  "f": "media/ilustraciones/herramientas_liticas.jpg",
  "t": "Herramientas líticas",
  "pie": "Útiles del Paleolítico (Lartet & Christy): cultura material y técnica.",
  "tema": "fil-t2",
  "license": "Public domain",
  "artist": "Édouard Lartet &amp; Henry Christy, ed. T. Rupert Jones",
  "page": "https://commons.wikimedia.org/wiki/File:Reliquiae_aquitanicae--pl._A-1--BHL20495573.jpg"
 },
 {
  "f": "media/ilustraciones/hooke_pulga.jpg",
  "t": "La pulga de Hooke",
  "pie": "Micrographia (1665): la mirada de la ciencia con el microscopio.",
  "tema": "fil-t3",
  "license": "Public domain",
  "artist": "Robert Hooke",
  "page": "https://commons.wikimedia.org/wiki/File:HookeFlea01.jpg"
 },
 {
  "f": "media/ilustraciones/byrne_euclides.png",
  "t": "Los Elementos de Euclides",
  "pie": "Edición de Byrne (1847): la geometría como saber demostrativo.",
  "tema": "fil-t3",
  "license": "Public domain",
  "artist": "Oliver Byrne, Euclid",
  "page": "https://commons.wikimedia.org/wiki/File:Byrne_Euclid_p9_image.png"
 },
 {
  "f": "media/ilustraciones/frege_begriffsschrift.png",
  "t": "La conceptografía de Frege",
  "pie": "Frege funda la lógica moderna (de primer orden).",
  "tema": "fil-t3",
  "license": "Public domain",
  "artist": "Frege",
  "page": "https://commons.wikimedia.org/wiki/File:Frege-gegens%C3%A4tze.png"
 },
 {
  "f": "media/ilustraciones/principia_mathematica.png",
  "t": "«1+1=2» en Principia Mathematica",
  "pie": "Lógica simbólica: derivar la aritmética de la lógica.",
  "tema": "fil-t3",
  "license": "Public domain",
  "artist": "Whitehead and Russell",
  "page": "https://commons.wikimedia.org/wiki/File:Principia_Mathematica_54-43.png"
 },
 {
  "f": "media/ilustraciones/escuela_atenas.jpg",
  "t": "La Escuela de Atenas",
  "pie": "Rafael: los filósofos griegos reunidos; el paso del mito al logos.",
  "tema": "fil-t1",
  "license": "Public domain",
  "artist": "Raphael",
  "page": "https://commons.wikimedia.org/wiki/File:%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg"
 },
 {
  "f": "media/ilustraciones/acropolis.jpg",
  "t": "La Acrópolis de Atenas",
  "pie": "Atenas, cuna de la filosofía y de la vida en la polis.",
  "tema": "fil-t1",
  "license": "CC0",
  "artist": "Jebulon",
  "page": "https://commons.wikimedia.org/wiki/File:Acropolis_Parthenon_Athens_Greece.jpg"
 },
 {
  "f": "media/ilustraciones/muerte_socrates.jpg",
  "t": "La muerte de Sócrates",
  "pie": "David: Sócrates elige la coherencia moral antes que salvar la vida.",
  "tema": "fil-t5",
  "license": "Public domain",
  "artist": "Jacques-Louis David",
  "page": "https://commons.wikimedia.org/wiki/File:David_-_The_Death_of_Socrates.jpg"
 },
 {
  "f": "media/ilustraciones/justicia.jpg",
  "t": "Alegoría de la Justicia",
  "pie": "La ética pregunta qué es lo justo y cómo debemos actuar.",
  "tema": "fil-t5",
  "license": "Public domain",
  "artist": "Sienese school",
  "page": "https://commons.wikimedia.org/wiki/File:Allegory_of_Justice-f3434433.jpg"
 },
 {
  "f": "media/ilustraciones/venus_milo.jpg",
  "t": "Venus de Milo",
  "pie": "La belleza clásica: proporción y armonía como ideal estético.",
  "tema": "fil-t7",
  "license": "Public domain",
  "artist": "Unknown artistUnknown artist",
  "page": "https://commons.wikimedia.org/wiki/File:Venus_de_Milo_Louvre_Ma399_n4.jpg"
 },
 {
  "f": "media/ilustraciones/las_meninas.jpg",
  "t": "Las Meninas",
  "pie": "Velázquez: el arte que se piensa a sí mismo (representación y mirada).",
  "tema": "fil-t7",
  "license": "Public domain",
  "artist": "?",
  "page": "https://commons.wikimedia.org/wiki/File:Las_Meninas_(1656),_by_Velazquez.jpg"
 }
];
