"use strict";
/* ===== Ilustraciones de tema (Pensamiento crítico, 2.º ESO) — imágenes de DOMINIO PÚBLICO / CC0 =====
   Mismo formato que ilustraciones_fil.js: {f, t, pie, tema: clave THEORY «ipc-*», license, artist, page (Commons)}.
   Buscadas con tools/buscar_pd_galerias.py (Wikimedia Commons, solo PD/CC0/PDM) y revisadas a ojo.
   Las usan ilustracionesview.js (tira al pie de cada tema) y galeriaview.js (grupo «PC» de la Galería). */
const ILUSTRACIONES_IPC = [
 {
  "f": "media/ilustraciones/ipc_pensador.jpg",
  "t": "El pensador (Rodin)",
  "pie": "Pararse a pensar antes de creer o de actuar.",
  "tema": "ipc-pensar",
  "license": "CC0",
  "artist": "Auguste Rodin / Alexis Rudier",
  "page": "https://commons.wikimedia.org/wiki/File:The_Thinker_MET_DP-13618-011.jpg"
 },
 {
  "f": "media/ilustraciones/ipc_sueno_razon.jpg",
  "t": "El sueño de la razón produce monstruos (Goya)",
  "pie": "Cuando dejamos de pensar, aparecen los monstruos del miedo y la mentira.",
  "tema": "ipc-pensar",
  "license": "CC0",
  "artist": "Francisco Goya",
  "page": "https://commons.wikimedia.org/wiki/File:Plate_43_from_%27Los_Caprichos%27-_The_sleep_of_reason_produces_monsters_(El_sue%C3%B1o_de_la_razon_produce_monstruos)_MET_22AA_BG05R4.jpg"
 },
 {
  "f": "media/ilustraciones/ipc_caverna.jpg",
  "t": "La caverna de Platón (grabado de 1604)",
  "pie": "¿Y si lo que vemos son solo sombras? Salir de la cueva es pensar por uno mismo.",
  "tema": "ipc-pensar",
  "license": "CC0",
  "artist": "Rijksmuseum",
  "page": "https://commons.wikimedia.org/wiki/File:Grot_van_Plato,_RP-P-OB-10.544.jpg"
 },
 {
  "f": "media/ilustraciones/ipc_ciceron.jpg",
  "t": "Cicerón denuncia a Catilina (Maccari)",
  "pie": "Argumentar en público: razones frente a acusaciones.",
  "tema": "ipc-argumentar",
  "license": "Public domain",
  "artist": "Cesare Maccari",
  "page": "https://commons.wikimedia.org/wiki/File:Cicero_Denounces_Catiline_in_the_Roman_Senate_by_Cesare_Maccari.png"
 },
 {
  "f": "media/ilustraciones/ipc_leccion_medieval.jpg",
  "t": "Una clase en la universidad medieval (s. XIV)",
  "pie": "Escuchar, preguntar y discutir: así se aprendía a razonar.",
  "tema": "ipc-argumentar",
  "license": "Public domain",
  "artist": "Laurentius de Voltolina",
  "page": "https://commons.wikimedia.org/wiki/File:Laurentius_de_Voltolina_001.jpg"
 },
 {
  "f": "media/ilustraciones/ipc_prestidigitador.jpg",
  "t": "El prestidigitador (El Bosco)",
  "pie": "Mientras miramos el truco, alguien nos roba la bolsa: las falacias distraen.",
  "tema": "ipc-falacias",
  "license": "Public domain",
  "artist": "Hieronymus Bosch and workshop / Workshop of Hieronymus Bosch / After Hieronymus Bosch",
  "page": "https://commons.wikimedia.org/wiki/File:The_Conjurer,_ca._1502.jpg"
 },
 {
  "f": "media/ilustraciones/ipc_ciegos.jpg",
  "t": "La parábola de los ciegos (Bruegel)",
  "pie": "Seguir a alguien solo porque manda o porque lo siguen todos.",
  "tema": "ipc-falacias",
  "license": "Public domain",
  "artist": "Pieter Brueghel the Elder",
  "page": "https://commons.wikimedia.org/wiki/File:Bruegel,_Pieter_(I)_-_Blind_leading_the_blind_Google_Art_Project.jpeg"
 },
 {
  "f": "media/ilustraciones/ipc_traje_emperador.jpg",
  "t": "El traje nuevo del emperador",
  "pie": "Nadie se atreve a decir lo evidente: la presión del grupo y la autoridad.",
  "tema": "ipc-falacias",
  "license": "Public domain",
  "artist": "Vilhelm Pedersen (1820 - 1859)",
  "page": "https://commons.wikimedia.org/wiki/File:Emperor_Clothes_01.jpg"
 },
 {
  "f": "media/ilustraciones/ipc_crecepelo.jpg",
  "t": "Anuncio de un remedio milagroso",
  "pie": "Falsas promesas y falsas autoridades: el reclamo publicitario.",
  "tema": "ipc-falacias",
  "license": "Public domain",
  "artist": "desconocido",
  "page": "https://commons.wikimedia.org/wiki/File:The_Infallible_Mountebank,_or_Quack_Doctor_(BM_1850,1109.3).jpg"
 },
 {
  "f": "media/ilustraciones/ipc_pato_conejo.jpg",
  "t": "¿Pato o conejo? (1892)",
  "pie": "La misma imagen, dos lecturas: vemos lo que esperamos ver.",
  "tema": "ipc-sesgos",
  "license": "Public domain",
  "artist": "Unknown artistUnknown artist",
  "page": "https://commons.wikimedia.org/wiki/File:Kaninchen_und_Ente.png"
 },
 {
  "f": "media/ilustraciones/ipc_joven_anciana.jpg",
  "t": "¿Joven o anciana? (W. E. Hill, 1915)",
  "pie": "Cuando ya has visto una figura, cuesta ver la otra.",
  "tema": "ipc-sesgos",
  "license": "Public domain",
  "artist": "W. E. Hill",
  "page": "https://commons.wikimedia.org/wiki/File:My_Wife_and_My_Mother-in-Law.jpg"
 },
 {
  "f": "media/ilustraciones/ipc_muller_lyer.jpg",
  "t": "La ilusión de Müller-Lyer",
  "pie": "Las dos líneas miden lo mismo: nuestros sentidos también se engañan.",
  "tema": "ipc-sesgos",
  "license": "Public domain",
  "artist": "Franz Carl Müller-Lyer, Franz Brentano",
  "page": "https://commons.wikimedia.org/wiki/File:M%C3%BCller-Lyer_illusion_-_Franz_Bretano_-_1892.png"
 },
 {
  "f": "media/ilustraciones/ipc_poggendorff.jpg",
  "t": "La ilusión de Poggendorff",
  "pie": "¿La línea de A sigue en B o en C? Compruébalo con una regla: el cerebro interpreta, no solo ve.",
  "tema": "ipc-sesgos",
  "license": "Public domain",
  "artist": "desconocido",
  "page": "https://commons.wikimedia.org/wiki/File:Poggendorff_figure.jpg"
 },
 {
  "f": "media/ilustraciones/ipc_elefante.jpg",
  "t": "Los ciegos y el elefante (Hanabusa Itchō)",
  "pie": "Cada uno toca una parte y cree tener toda la verdad: por eso hay que dialogar.",
  "tema": "ipc-dialogo",
  "license": "Public domain",
  "artist": "Hanabusa Itchō",
  "page": "https://commons.wikimedia.org/wiki/File:Blind_monks_examining_an_elephant.jpg"
 },
 {
  "f": "media/ilustraciones/ipc_banquete.jpg",
  "t": "El banquete de Platón (Feuerbach)",
  "pie": "Un diálogo entre amigos sobre qué es el amor.",
  "tema": "ipc-dialogo",
  "license": "Public domain",
  "artist": "Anselm Feuerbach",
  "page": "https://commons.wikimedia.org/wiki/File:Plato%27s_Symposium_-_Anselm_Feuerbach_-_Google_Cultural_Institute.jpg"
 },
 {
  "f": "media/ilustraciones/ipc_babel.jpg",
  "t": "La torre de Babel (Bruegel)",
  "pie": "Cuando no nos entendemos, no hay proyecto común posible.",
  "tema": "ipc-dialogo",
  "license": "Public domain",
  "artist": "Pieter Brueghel the Elder",
  "page": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project_-_edited.jpg"
 },
 {
  "f": "media/ilustraciones/ipc_moon_hoax.jpg",
  "t": "El gran engaño de la Luna (1835)",
  "pie": "Un periódico inventó vida en la Luna… y mucha gente se lo creyó.",
  "tema": "ipc-medios",
  "license": "Public domain",
  "artist": "Day, Benjamin Henry, 1810-1889, copyright claimant",
  "page": "https://commons.wikimedia.org/wiki/File:Lunar_animals_and_other_objects_Discovered_by_Sir_John_Herschel_in_his_observatory_at_the_Cape_of_Good_Hope_and_copied_from_sketches_in_the_Edinburgh_Journal_of_Science._LCCN2003665049.jpg"
 },
 {
  "f": "media/ilustraciones/ipc_prensa_amarilla.jpg",
  "t": "Caricatura de la «prensa amarilla» (1898)",
  "pie": "Noticias exageradas para vender más periódicos.",
  "tema": "ipc-medios",
  "license": "Public domain",
  "artist": "Leon Barritt",
  "page": "https://commons.wikimedia.org/wiki/File:PulitzerHearstWarYellowKids.jpg"
 },
 {
  "f": "media/ilustraciones/ipc_imprenta.jpg",
  "t": "Un taller de imprenta (Jost Amman, 1568)",
  "pie": "La imprenta multiplicó la información… y también los bulos.",
  "tema": "ipc-medios",
  "license": "Public domain",
  "artist": "desconocido",
  "page": "https://commons.wikimedia.org/wiki/File:Fotothek_df_tg_0002099_St%C3%A4ndebuch_%5E_Handwerk_%5E_Buchdrucker_%5E_Typograph.jpg"
 },
 {
  "f": "media/ilustraciones/ipc_daumier_prensa.jpg",
  "t": "«¡No os metáis con ella!» (Daumier, 1834)",
  "pie": "La libertad de prensa, defendida frente al poder.",
  "tema": "ipc-medios",
  "license": "Public domain",
  "artist": "Print made by: Honoré Daumier Printed by: Delaunois Published by: Aubert",
  "page": "https://commons.wikimedia.org/wiki/File:Ne_vous_y_frottez_pas!_(Don%27t_meddle_with_it!)_(BM_1865,0114.119_1).jpg"
 },
 {
  "f": "media/ilustraciones/ipc_juegos_ninos.jpg",
  "t": "Juegos de niños (Bruegel, 1560)",
  "pie": "Jugar juntos, con reglas compartidas, crea grupo.",
  "tema": "ipc-grupo",
  "license": "Public domain",
  "artist": "Pieter Brueghel the Elder",
  "page": "https://commons.wikimedia.org/wiki/File:Children%27s_Games_(Bruegel).jpg"
 },
 {
  "f": "media/ilustraciones/ipc_haz_varas.jpg",
  "t": "El anciano y el haz de varas (Esopo)",
  "pie": "Una vara se rompe; muchas juntas, no: la fuerza del grupo.",
  "tema": "ipc-grupo",
  "license": "Public domain",
  "artist": "Jacob Gole (Life time: 1660-1737)",
  "page": "https://commons.wikimedia.org/wiki/File:Pater_et_Filii_Litigantes.jpg"
 },
 {
  "f": "media/ilustraciones/ipc_mosqueteros.jpg",
  "t": "Los tres mosqueteros (Leloir, 1894)",
  "pie": "«Todos para uno y uno para todos».",
  "tema": "ipc-grupo",
  "license": "Public domain",
  "artist": "Jules Huyot / After Maurice Leloir",
  "page": "https://commons.wikimedia.org/wiki/File:Dartagnan-musketeers_-_Maurice_Leloir.jpg"
 },
 {
  "f": "media/ilustraciones/ipc_segadores.jpg",
  "t": "Los segadores (Bruegel, 1565)",
  "pie": "Trabajar y descansar juntos: la comunidad que sostiene a cada uno.",
  "tema": "ipc-grupo",
  "license": "Public domain",
  "artist": "Pieter Brueghel the Elder",
  "page": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder-_The_Harvesters_-_Google_Art_Project.jpg"
 },
 {
  "f": "media/ilustraciones/ipc_sirga.jpg",
  "t": "Los sirgadores del Volga (Repin)",
  "pie": "Tirar todos a una: la cohesión también es esfuerzo compartido.",
  "tema": "ipc-grupo",
  "license": "Public domain",
  "artist": "Ilya Repin",
  "page": "https://commons.wikimedia.org/wiki/File:Ilya_Repin_-_Barge_Haulers_on_the_Volga_-_Google_Art_Project.jpg"
 },
 {
  "f": "media/ilustraciones/ipc_earthrise.jpg",
  "t": "Salida de la Tierra (Apolo 8, 1968)",
  "pie": "Vista desde la Luna, la Tierra es un hogar pequeño y frágil.",
  "tema": "ipc-huella",
  "license": "Public domain",
  "artist": "NASA",
  "page": "https://commons.wikimedia.org/wiki/File:NASA_Earthrise_AS08-14-2383_Apollo_8,_1968-12-24,_from_print.jpg"
 },
 {
  "f": "media/ilustraciones/ipc_blue_marble.jpg",
  "t": "La canica azul (Apolo 17, 1972)",
  "pie": "El único planeta que tenemos.",
  "tema": "ipc-huella",
  "license": "Public domain",
  "artist": "Earth Science and Remote Sensing Unit, NASA Johnson Space Center Technical support Marit Jentoft-Nilsen (Global Science ",
  "page": "https://commons.wikimedia.org/wiki/File:Blue_marble_apollo_17_19721207_(cropped).png"
 },
 {
  "f": "media/ilustraciones/ipc_coalbrookdale.jpg",
  "t": "Coalbrookdale de noche (1801)",
  "pie": "La Revolución industrial: progreso… y humo.",
  "tema": "ipc-huella",
  "license": "Public domain",
  "artist": "Philip James de Loutherbourg",
  "page": "https://commons.wikimedia.org/wiki/File:Philipp_Jakob_Loutherbourg_d._J._-_Coalbrookdale_by_Night_-_WGA13730.jpg"
 },
 {
  "f": "media/ilustraciones/ipc_documerica.jpg",
  "t": "Contaminación industrial (Documerica, años 70)",
  "pie": "Fotografías de la EPA que mostraron el coste ambiental.",
  "tema": "ipc-huella",
  "license": "Public domain",
  "artist": "Doug Wilson",
  "page": "https://commons.wikimedia.org/wiki/File:SMOKE_AND_STEAM_FROM_LUMBER_AND_PULP_MILL_STACKS_-_NARA_-_552164.jpg"
 }
];
