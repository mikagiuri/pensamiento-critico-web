"use strict";
/* ===== Filosofía y cine / arte =====
   Hilo transversal: por cada tema, películas y obras de arte con la pregunta
   filosófica que plantean. {tema:clave THEORY, kind:"cine"|"arte", t:título,
   year, autor:director/artista, q:conexión filosófica}. cineview.js lo inyecta
   como una tira en la teoría (y lo lista en la sección «Cine y arte»). */
const CINE = [
  // Filosofía 1.º
  { tema:"fil-t1", kind:"cine", t:"Ágora", year:2009, autor:"Alejandro Amenábar", q:"Hipatia defiende la razón y la pregunta libre frente al dogma: ¿para qué sirve filosofar?" },
  { tema:"fil-t1", kind:"cine", t:"El club de los poetas muertos", year:1989, autor:"Peter Weir", q:"Pensar por uno mismo y «carpe diem»: el valor de cuestionar lo recibido." },
  { tema:"fil-t2", kind:"cine", t:"Blade Runner", year:1982, autor:"Ridley Scott", q:"Si un replicante siente y recuerda, ¿qué nos hace humanos? Los límites de lo humano." },
  { tema:"fil-t2", kind:"cine", t:"2001: Una odisea del espacio", year:1968, autor:"Stanley Kubrick", q:"Del hueso-herramienta a la nave: hominización, técnica y evolución." },
  { tema:"fil-t2", kind:"arte", t:"La creación de Adán", year:1512, autor:"Miguel Ángel", q:"El origen y la dignidad del ser humano: naturaleza y cultura." },
  { tema:"fil-t3", kind:"cine", t:"Matrix", year:1999, autor:"Hnas. Wachowski", q:"¿Es real el mundo? Escepticismo, la caverna de Platón y el genio maligno de Descartes." },
  { tema:"fil-t3", kind:"cine", t:"El show de Truman", year:1998, autor:"Peter Weir", q:"Apariencia y realidad: ¿cómo sé que no me están engañando?" },
  { tema:"fil-t3", kind:"cine", t:"Origen", year:2010, autor:"Christopher Nolan", q:"Sueño y realidad: ¿qué criterio distingue lo verdadero de lo aparente?" },
  { tema:"fil-t7", kind:"arte", t:"La fuente (urinario)", year:1917, autor:"Marcel Duchamp", q:"Un ready-made en un museo: ¿qué convierte algo en arte? (teoría institucional)." },
  { tema:"fil-t7", kind:"arte", t:"Las Meninas", year:1656, autor:"Velázquez", q:"El arte que se piensa a sí mismo: representación, mirada y punto de vista." },
  { tema:"fil-t7", kind:"cine", t:"El misterio Picasso", year:1956, autor:"Henri-Georges Clouzot", q:"El proceso creativo en vivo: ¿qué es crear y qué es la belleza?" },
  // Historia de la Filosofía
  { tema:"hf-mito", kind:"arte", t:"La escuela de Atenas", year:1511, autor:"Rafael", q:"El paso del mito al logos y la comunidad de filósofos griegos." },
  { tema:"hf-platon", kind:"cine", t:"Matrix", year:1999, autor:"Hnas. Wachowski", q:"El mito de la caverna en clave contemporánea: liberarse de las sombras." },
  { tema:"hf-platon", kind:"cine", t:"El show de Truman", year:1998, autor:"Peter Weir", q:"Salir de la caverna: del mundo fabricado al conocimiento de lo real." },
  { tema:"hf-helenismo", kind:"cine", t:"Gladiator", year:2000, autor:"Ridley Scott", q:"Marco Aurelio y el estoicismo: el deber, la virtud y la aceptación del destino." },
  { tema:"hf-medieval", kind:"cine", t:"El nombre de la rosa", year:1986, autor:"Jean-Jacques Annaud", q:"Razón y fe, el método y los universales (Guillermo, inspirado en Ockham)." },
  { tema:"hf-metafisica", kind:"cine", t:"Ex Machina", year:2014, autor:"Alex Garland", q:"Dualismo y materialismo: ¿puede la materia pensar? El test de Turing." },
  { tema:"hf-contrato", kind:"cine", t:"El señor de las moscas", year:1990, autor:"Harry Hook", q:"El estado de naturaleza de Hobbes: sin pacto, «el hombre es un lobo para el hombre»." },
  { tema:"hf-sospecha", kind:"cine", t:"Tiempos modernos", year:1936, autor:"Charles Chaplin", q:"La alienación del trabajo en la cadena de montaje (Marx)." },
  { tema:"hf-capitalismo", kind:"cine", t:"Parásitos", year:2019, autor:"Bong Joon-ho", q:"Desigualdad y lucha de clases: la crítica del capitalismo hoy." },
  { tema:"hf-utilitarismo", kind:"cine", t:"Eye in the Sky", year:2015, autor:"Gavin Hood", q:"¿Sacrificar a una para salvar a muchos? Utilitarismo frente a deontología." },
  { tema:"hf-existencialismo", kind:"cine", t:"El séptimo sello", year:1957, autor:"Ingmar Bergman", q:"La muerte, el sentido y el silencio de Dios: la angustia existencial." },
  { tema:"hf-analitica", kind:"cine", t:"La llegada", year:2016, autor:"Denis Villeneuve", q:"¿El lenguaje determina cómo pensamos? El giro lingüístico." },
  { tema:"hf-posmodernidad", kind:"cine", t:"Matrix", year:1999, autor:"Hnas. Wachowski", q:"El simulacro y la hiperrealidad (Baudrillard): lo real sustituido por su copia." },
  { tema:"hf-beauvoir", kind:"cine", t:"Las sufragistas", year:2015, autor:"Sarah Gavron", q:"«No se nace mujer, se llega a serlo»: la lucha por los derechos y la libertad." },
  { tema:"hf-siglo21", kind:"cine", t:"Black Mirror (serie)", year:2011, autor:"Charlie Brooker", q:"Tecnoética: vigilancia, identidad digital y los límites de la técnica." },
  { tema:"hf-siglo21", kind:"cine", t:"WALL·E", year:2008, autor:"Andrew Stanton", q:"Consumismo, tecnología y crisis ecológica: los retos del siglo XXI." }
];
