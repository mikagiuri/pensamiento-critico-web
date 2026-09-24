// Generado por tools/build_eso.js — solo Pensamiento crítico (2.º ESO).
const WEEK = [
 [
  "8:00",
  "",
  "",
  "",
  "",
  ""
 ],
 [
  "8:55",
  "",
  "",
  "",
  "",
  ""
 ],
 [
  "9:50",
  "",
  "",
  "",
  "",
  [
   "ipc",
   "P. crítico · S2"
  ]
 ],
 [
  "11:15",
  "",
  "",
  "",
  [
   "ipc",
   "P. crítico · S1"
  ],
  ""
 ],
 [
  "12:10",
  "",
  "",
  "",
  "",
  ""
 ],
 [
  "13:05",
  "",
  "",
  "",
  "",
  ""
 ]
];
const SUBJECTS = {
 "ipc": {
  "name": "Pensamiento crítico",
  "kick": "2.º de ESO · Inicio de curso",
  "color": "var(--ipc)",
  "intro": "Fundamentar los conceptos del curso (opinión, pregunta y tipos de pregunta, argumentación, debate, diálogo, crítica, criterio, autonomía, conflicto, negociación) y hacer la preevaluación inicial.",
  "mats": [
   [
    "Contrato de aula",
    "Normas, compromisos y hoja de firma.",
    "ipc\\gestion_aula",
    "ipc-contrato"
   ],
   [
    "Diario de aprendizaje",
    "Portada, plantilla de entrada y hoja de evidencias.",
    "ipc\\gestion_aula",
    "ipc-diario"
   ],
   [
    "Evaluación inicial",
    "«¿Buena razón o truco?»: test de 10 ítems + escrito breve.",
    "ipc\\fichas",
    "ipc-eval-inicial"
   ],
   [
    "Lecturas para pensar",
    "Cuatro cuentos filosóficos con dibujo y preguntas: Sócrates, la serpiente, Hakuin y los dos monjes.",
    "ipc\\fichas",
    "ipc-lec-tamices"
   ]
  ],
  "tools": [
   [
    "Cuestionario: falacias",
    "cuestionarios",
    "falacias"
   ],
   [
    "Juego: Elige A o B (dilemas)",
    "dilemas",
    ""
   ],
   [
    "Juego: Si la clase fuera el mundo",
    "mundo",
    ""
   ],
   [
    "Teoría: mi huella en el planeta",
    "teoria",
    "ipc-huella"
   ],
   [
    "Cuestionario: huella ecológica",
    "cuestionarios",
    "ipc-huella-q"
   ]
  ]
 }
};
const DECKS = {
 "ipc-conceptos": {
  "name": "Pensamiento crítico · Conceptos básicos",
  "subject": "ipc",
  "cards": [
   [
    "💬",
    "Opinión",
    "Lo que alguien piensa sobre algo. Vale más cuando se apoya en razones y no solo en gustos."
   ],
   [
    "🧩",
    "Argumento",
    "Una afirmación (conclusión) defendida con razones (premisas)."
   ],
   [
    "❓",
    "Pregunta",
    "La herramienta del pensamiento: abre la investigación en vez de cerrarla."
   ],
   [
    "🗣️",
    "Debate",
    "Confrontar posturas con argumentos para defender una idea."
   ],
   [
    "🤝",
    "Diálogo",
    "Pensar juntos para acercarse a la verdad, no para «ganar»."
   ],
   [
    "🔍",
    "Pensamiento crítico",
    "Examinar las ideas (propias y ajenas) antes de aceptarlas, buscando razones y pruebas."
   ],
   [
    "📏",
    "Criterio",
    "La razón o la regla en la que baso un juicio o una decisión."
   ],
   [
    "🧭",
    "Autonomía",
    "Pensar y decidir por uno mismo, con criterio propio, frente a seguir a la masa."
   ],
   [
    "🕊️",
    "Principio de caridad",
    "Interpretar la postura del otro en su versión más fuerte antes de criticarla."
   ],
   [
    "⚔️",
    "Conflicto",
    "Choque de intereses o de ideas; puede resolverse con diálogo y negociación."
   ],
   [
    "🤲",
    "Negociación",
    "Buscar un acuerdo en el que las partes ceden algo para ganar algo."
   ]
  ]
 },
 "ipc-falacias": {
  "name": "Pensamiento crítico · Falacias",
  "subject": "ipc",
  "cards": [
   [
    "🙅",
    "Ad hominem",
    "Atacar a la persona en vez de a su argumento: «¿Qué vas a decir tú, que llegas tarde todos los días?»."
   ],
   [
    "🥊",
    "Hombre de paja",
    "Deformar lo que dice el otro para rebatir una versión más fácil de tumbar."
   ],
   [
    "🚪",
    "Falso dilema",
    "Presentar solo dos opciones cuando hay más: «O estás conmigo o estás contra mí»."
   ],
   [
    "👥",
    "Ad populum",
    "«Lo hace todo el mundo, así que es bueno». Que muchos lo hagan no lo hace verdad."
   ],
   [
    "🎓",
    "Apelación a la autoridad",
    "«Lo dice un famoso, será verdad». Citar a quien no es experto en el tema."
   ],
   [
    "🔗",
    "Falsa causa (post hoc)",
    "Creer que si algo ocurrió después, fue por su causa: «Aprobé con estos calcetines»."
   ],
   [
    "😱",
    "Apelación al miedo",
    "Convencer asustando con consecuencias terribles de las que no se da ninguna prueba."
   ],
   [
    "😢",
    "Apelación a la compasión",
    "Dar pena en lugar de dar razones."
   ],
   [
    "🎲",
    "Generalización precipitada",
    "Sacar una regla general de muy pocos casos: «Fui dos veces y siempre está lleno»."
   ],
   [
    "⏳",
    "Apelación a la tradición",
    "«Siempre se ha hecho así», como si eso por sí solo lo justificara."
   ]
  ]
 },
 "ipc-sesgos": {
  "name": "Pensamiento crítico · Sesgos cognitivos",
  "subject": "ipc",
  "cards": [
   [
    "🧲",
    "Sesgo de confirmación",
    "Buscar y creer solo lo que confirma lo que ya pienso, ignorando lo demás."
   ],
   [
    "⚓",
    "Anclaje",
    "Quedarse pegado al primer dato recibido al juzgar (el primer precio, la primera cifra)."
   ],
   [
    "📺",
    "Disponibilidad",
    "Creer que algo es más probable solo porque lo recuerdo con facilidad (sale mucho en las noticias)."
   ],
   [
    "🐑",
    "Arrastre (efecto bandwagon)",
    "Pensar u opinar como el grupo por no quedarme fuera."
   ],
   [
    "✨",
    "Efecto halo",
    "Si alguien me cae bien o me parece atractivo, doy por buenas todas sus ideas."
   ],
   [
    "⏰",
    "FOMO",
    "Miedo a perderse algo; empuja a decidir por impulso para no quedar atrás."
   ],
   [
    "🔀",
    "Sesgo ≠ falacia",
    "La falacia es un error en el argumento; el sesgo es un atajo mental que tuerce cómo pensamos."
   ]
  ]
 },
 "ipc-publicidad": {
  "name": "Pensamiento crítico · Publicidad y medios",
  "subject": "ipc",
  "cards": [
   [
    "🌟",
    "Testimonio / influencer",
    "Alguien famoso recomienda el producto para que confíes en él."
   ],
   [
    "👥",
    "Todos lo tienen (bandwagon)",
    "«Únete a los millones que ya lo usan»."
   ],
   [
    "⏳",
    "Escasez y urgencia",
    "«Solo hoy», «últimas unidades»: presionan para decidir sin pensar."
   ],
   [
    "🌈",
    "Publicidad aspiracional",
    "No vende el producto, sino la vida feliz y admirada que promete."
   ],
   [
    "😂",
    "Humor y emoción",
    "Te hace reír o emocionarte para que asocies esa sensación con la marca."
   ],
   [
    "🎯",
    "Clickbait",
    "Titular exagerado que promete más de lo que da, para que hagas clic."
   ],
   [
    "✅",
    "Contrastar fuentes",
    "Antes de creer o compartir: ¿quién lo dice?, ¿con qué pruebas?, ¿lo confirman otros?"
   ],
   [
    "🧠",
    "Alfabetización mediática",
    "Saber leer críticamente los medios: distinguir información, opinión y publicidad."
   ]
  ]
 },
 "ipc-huella": {
  "name": "Pensamiento crítico · Mi huella en el planeta",
  "subject": "ipc",
  "cards": [
   [
    "👣",
    "Huella ecológica",
    "Tierra y mar productivos que hacen falta para producir lo que consumimos y absorber nuestros residuos. Se mide en hectáreas globales."
   ],
   [
    "🌱",
    "Biocapacidad",
    "Lo que la naturaleza puede regenerar en un año: bosques, pesca, cosechas, suelo."
   ],
   [
    "🌍",
    "¿Cuántos planetas?",
    "La humanidad consume como si tuviera unos 1,7 planetas. Viviendo como en España harían falta más de dos."
   ],
   [
    "📅",
    "Día de la Sobrecapacidad",
    "Fecha en que ya hemos gastado lo que el planeta regenera en todo el año. Últimamente, a finales de julio o principios de agosto."
   ],
   [
    "🏭",
    "Huella de carbono",
    "El CO₂ que emitimos con la energía, el transporte y lo que compramos. Es la parte más grande de la huella de los países ricos."
   ],
   [
    "⚖️",
    "Justicia ambiental",
    "Quien más consume no es quien más sufre las consecuencias: sequías e inundaciones golpean más a los pobres."
   ],
   [
    "♻️",
    "Reducir, reutilizar, reciclar",
    "En ese orden: lo mejor es no generar el residuo; reciclar es el último recurso."
   ],
   [
    "🎭",
    "Greenwashing",
    "Publicidad que pinta de «verde» algo que no lo es. Pregunta: ¿qué cambia de verdad en lo que hace la empresa?"
   ]
  ]
 },
 "ipc-prejuicios": {
  "name": "Pensamiento crítico · Prejuicios y estereotipos",
  "subject": "ipc",
  "cards": [
   [
    "🔍",
    "¿Estereotipo o dato?",
    "Un dato se puede comprobar y habla de hechos («el 30 % de…»). Un estereotipo mete a todo un grupo en el mismo saco («todos los X son…»)."
   ],
   [
    "🌍",
    "Racismo",
    "Juzgar o tratar peor a alguien por su color de piel u origen étnico, como si eso dijera algo de cómo es."
   ],
   [
    "🧳",
    "Xenofobia",
    "Rechazo a las personas que vienen de otros países: se las ve como una amenaza o una carga sin conocerlas."
   ],
   [
    "🪙",
    "Aporofobia",
    "Rechazo a las personas pobres (palabra de la filósofa Adela Cortina). Al turista rico se le recibe bien; al pobre, no."
   ],
   [
    "♀️",
    "Machismo y sexismo",
    "Creer que un género vale más o sirve para unas cosas y no para otras («eso es de chicas», «los chicos no lloran»)."
   ],
   [
    "🏳️‍🌈",
    "LGTBIfobia",
    "Rechazo o burla hacia las personas por su orientación sexual o su identidad de género."
   ],
   [
    "👵",
    "Edadismo",
    "Prejuicios por la edad: «los mayores no se enteran», «los jóvenes no saben nada»."
   ],
   [
    "♿",
    "Capacitismo",
    "Tratar a las personas con discapacidad como si fueran menos capaces en todo, o solo como objeto de pena."
   ],
   [
    "🕊️",
    "Prejuicio religioso",
    "Ideas negativas sobre alguien por su religión o por no tener ninguna."
   ],
   [
    "👀",
    "Por la apariencia",
    "Juzgar por el cuerpo, el peso, la ropa o la cara. Las burlas por el peso son una de las formas de acoso más frecuentes."
   ],
   [
    "🧠",
    "Estigma de la salud mental",
    "Creer que quien tiene un problema de salud mental es peligroso, flojo o «se lo inventa». El estigma hace que no se pida ayuda."
   ],
   [
    "🙋",
    "¿Qué puedo hacer?",
    "Pedir datos antes de generalizar, conocer a la persona antes que a la etiqueta y no reírse de la broma que humilla."
   ]
  ]
 },
 "ipc-moda": {
  "name": "Pensamiento crítico · Moda rápida (documental)",
  "subject": "ipc",
  "cards": [
   [
    "📅",
    "52 colecciones al año",
    "Antes había unas 4 colecciones al año; hoy algunas cadenas sacan una microcolección cada semana."
   ],
   [
    "👕",
    "120.000 millones",
    "Según el documental, cada año se producen en el mundo más de 120.000 millones de prendas."
   ],
   [
    "🏷️",
    "Sin estrenar",
    "Según un estudio de Greenpeace, alrededor del 40 % de la ropa que se compra no se llega a usar nunca."
   ],
   [
    "🎉",
    "El top de fiesta",
    "Una prenda de fiesta se usa de media una o dos veces antes de tirarla."
   ],
   [
    "🛢️",
    "Ropa de petróleo",
    "Cerca del 70 % de los tejidos nuevos son fibras sintéticas que salen del petróleo."
   ],
   [
    "♻️",
    "El mito del reciclaje",
    "Reciclar ropa vieja para hacer ropa nueva casi no existe: el poliéster «reciclado» sale sobre todo de botellas de plástico."
   ],
   [
    "🔥",
    "El destino: Bulgaria",
    "Mucha ropa desechada acaba en países pobres de Europa del Este, donde algunas familias la queman en estufas porque no pueden pagar la leña."
   ],
   [
    "☠️",
    "Humo tóxico",
    "Quemar tejidos con plásticos suelta gases contaminantes y dioxinas, que pueden causar cáncer."
   ],
   [
    "📱",
    "Influencers",
    "Las redes sociales empujan las tendencias sin parar y llevan directamente a la tienda online."
   ],
   [
    "🙂",
    "Felicidad de un día",
    "La alegría de estrenar ropa dura muy poco: por eso volvemos a comprar."
   ],
   [
    "🔄",
    "Alternativas",
    "Segunda mano, intercambio, préstamo y arreglar la ropa alargan su vida."
   ],
   [
    "🌱",
    "La prenda más sostenible",
    "La que no hace falta fabricar. Conclusión del documental: la moda rápida nunca será sostenible."
   ]
  ]
 }
};
const QUIZZES = {
 "falacias": {
  "name": "Falacias",
  "subject": "ipc",
  "items": [
   {
    "q": "¿Qué es una falacia?",
    "o": [
     "Un argumento con razones sólidas y pruebas.",
     "Un razonamiento que parece bueno pero no lo es; muchas veces se usa para convencer o engañar.",
     "Una frase que siempre es verdadera.",
     "Una opinión con la que no estoy de acuerdo."
    ],
    "a": 1,
    "fb": "Una falacia parece un buen razonamiento, pero sus razones no sostienen la conclusión."
   },
   {
    "q": "En la asamblea de clase, Naroa propone cambiar de sitio las mochilas. Julen le contesta: «¿Y tú qué vas a proponer, si llegas tarde todos los días?».",
    "o": [
     "Hombre de paja.",
     "Falso dilema.",
     "Ad hominem (ataque a la persona).",
     "Apelación a la tradición."
    ],
    "a": 2,
    "fb": "Julen ataca a la persona (llega tarde) en vez de responder a su idea."
   },
   {
    "q": "«O venís todos al concierto del sábado o es que ya no sois mis amigos».",
    "o": [
     "Falso dilema.",
     "Apelación al miedo.",
     "Ad populum (apelación a la mayoría).",
     "Generalización precipitada."
    ],
    "a": 0,
    "fb": "Presenta solo dos opciones cuando hay más: ir otro día, o no poder ir y seguir siendo amigos."
   },
   {
    "q": "«El streamer que más sigo dice que estos cereales dan energía para todo el día. Si lo dice él, es verdad».",
    "o": [
     "Apelación a la tradición.",
     "Falsa causa (post hoc).",
     "Ad hominem.",
     "Apelación a la autoridad."
    ],
    "a": 3,
    "fb": "Un streamer no es experto en alimentación; «lo dice él» no es una prueba."
   },
   {
    "q": "Iker: «Deberíamos usar menos plástico en el comedor». Lucía: «Claro, tú lo que quieres es que comamos con las manos y sin bandeja».",
    "o": [
     "Ad hominem.",
     "Falso dilema.",
     "Apelación a la compasión.",
     "Hombre de paja."
    ],
    "a": 3,
    "fb": "Lucía deforma lo que dijo Iker (menos plástico no es comer con las manos) para tumbarlo más fácil."
   },
   {
    "q": "«Me puse los calcetines verdes y aprobé el examen de mates. Los calcetines verdes hacen aprobar».",
    "o": [
     "Generalización precipitada.",
     "Falsa causa (post hoc).",
     "Apelación al miedo.",
     "Ad populum."
    ],
    "a": 1,
    "fb": "Aprobó después de ponérselos, pero la causa fue estudiar (o la suerte), no los calcetines."
   },
   {
    "q": "«Todo el mundo en mi cuadrilla tiene esa marca de auriculares. Si los tiene todo el mundo, son los mejores».",
    "o": [
     "Apelación a la autoridad.",
     "Apelación a la tradición.",
     "Ad populum (apelación a la mayoría).",
     "Falso dilema."
    ],
    "a": 2,
    "fb": "Que muchos los tengan solo dice que están de moda, no que suenen mejor."
   },
   {
    "q": "A su entrenadora: «Tienes que ponerme de titular. Llevo toda la semana triste y, si no juego, mi padre se llevará un disgusto enorme».",
    "o": [
     "Apelación a la compasión (ad misericordiam).",
     "Apelación al miedo.",
     "Ad hominem.",
     "Generalización precipitada."
    ],
    "a": 0,
    "fb": "Da pena (tristeza, disgusto del padre) en lugar de dar razones deportivas."
   },
   {
    "q": "«Tienes que apuntarte al refuerzo de los sábados. Si no, suspenderás todo, repetirás y te quedarás sin amigos».",
    "o": [
     "Apelación a la compasión.",
     "Apelación al miedo (ad metum).",
     "Falsa causa.",
     "Hombre de paja."
    ],
    "a": 1,
    "fb": "Convence asustando con un futuro terrible del que no da ninguna prueba."
   },
   {
    "q": "«He ido dos veces al polideportivo nuevo y las dos veces estaba lleno. Siempre está lleno; no merece la pena ir».",
    "o": [
     "Falsa causa (post hoc).",
     "Ad populum.",
     "Apelación a la tradición.",
     "Generalización precipitada."
    ],
    "a": 3,
    "fb": "Dos visitas no bastan para decir «siempre está lleno»."
   },
   {
    "q": "«Yo aprendí a nadar tirándome al agua sin flotador, y mi padre igual. Así se ha aprendido toda la vida, así que así aprenderás tú».",
    "o": [
     "Apelación a la tradición (ad antiquitatem).",
     "Apelación a la autoridad.",
     "Falso dilema.",
     "Ad hominem."
    ],
    "a": 0,
    "fb": "«Siempre se ha hecho así» no demuestra que sea la mejor manera ni la más segura."
   }
  ]
 },
 "ipc-sesgos-q": {
  "name": "Sesgos cognitivos",
  "subject": "ipc",
  "items": [
   {
    "q": "¿Qué es un sesgo cognitivo?",
    "o": [
     "Un argumento con pruebas sólidas.",
     "Un atajo mental que tuerce cómo pensamos, muchas veces sin darnos cuenta.",
     "Una mentira dicha a propósito.",
     "Una opinión bien fundada."
    ],
    "a": 1,
    "fb": "El sesgo es un atajo mental que deforma nuestro juicio, aunque no queramos."
   },
   {
    "q": "Aitor solo sigue cuentas que piensan como él y da por falso todo lo demás. ¿Qué sesgo es?",
    "o": [
     "Sesgo de confirmación.",
     "Efecto halo.",
     "Anclaje.",
     "FOMO."
    ],
    "a": 0,
    "fb": "Sesgo de confirmación: buscar solo lo que confirma lo que ya creemos."
   },
   {
    "q": "En una tienda, el primer precio que ves (200 €) hace que 120 € te parezca barato. ¿Qué sesgo actúa?",
    "o": [
     "Disponibilidad.",
     "Anclaje.",
     "Arrastre.",
     "Confirmación."
    ],
    "a": 1,
    "fb": "Anclaje: el primer dato («ancla») condiciona los juicios siguientes."
   },
   {
    "q": "Tras ver muchas noticias de accidentes de avión crees que volar es muy peligroso, aunque los datos digan lo contrario. ¿Qué sesgo es?",
    "o": [
     "Efecto halo.",
     "Sesgo de disponibilidad.",
     "Falso dilema.",
     "Anclaje."
    ],
    "a": 1,
    "fb": "Disponibilidad: lo que recordamos con facilidad nos parece más probable de lo que es."
   },
   {
    "q": "Cambias de opinión solo porque todo tu grupo piensa distinto y no quieres quedar fuera. ¿Qué sesgo es?",
    "o": [
     "Arrastre (efecto bandwagon).",
     "Anclaje.",
     "Efecto halo.",
     "Confirmación."
    ],
    "a": 0,
    "fb": "Arrastre: seguir a la mayoría por no quedar fuera del grupo."
   },
   {
    "q": "Como esa chica te cae genial, das por buenas todas sus ideas sin examinarlas. ¿Qué sesgo es?",
    "o": [
     "FOMO.",
     "Efecto halo.",
     "Disponibilidad.",
     "Anclaje."
    ],
    "a": 1,
    "fb": "Efecto halo: una impresión positiva (simpatía, atractivo) contagia a todo lo demás."
   },
   {
    "q": "Compras algo a toda prisa «porque todos van y no quiero perdérmelo». ¿Qué está actuando?",
    "o": [
     "FOMO (miedo a perderse algo).",
     "Sesgo de confirmación.",
     "Principio de caridad.",
     "Anclaje."
    ],
    "a": 0,
    "fb": "FOMO: el miedo a quedarse fuera empuja a decidir por impulso."
   },
   {
    "q": "¿En qué se diferencian un sesgo y una falacia?",
    "o": [
     "Son exactamente lo mismo.",
     "La falacia es un error en el argumento; el sesgo es un atajo mental que tuerce cómo pensamos.",
     "El sesgo aparece solo en matemáticas.",
     "La falacia solo la cometen los adultos."
    ],
    "a": 1,
    "fb": "Falacia = fallo en el razonamiento; sesgo = desviación en el modo de pensar."
   },
   {
    "q": "¿Qué es el efecto halo?",
    "o": [
     "Que una impresión positiva contamina el juicio sobre todo lo demás.",
     "Que el primer dato ancla la decisión.",
     "Que seguimos a la mayoría.",
     "Que nos confirma en lo que creemos."
    ],
    "a": 0,
    "fb": "Si alguien me cae bien, doy por buenas sus ideas."
   },
   {
    "q": "¿Cómo se defiende uno de los sesgos?",
    "o": [
     "Buscando información que contradiga nuestras ideas y desconfiando de las decisiones con prisa.",
     "Evitando toda información.",
     "Siguiendo la mayoría.",
     "Reenviando sin comprobar."
    ],
    "a": 0,
    "fb": "Vigilar los sesgos es buscar lo que nos contradice."
   }
  ]
 },
 "ipc-medios-q": {
  "name": "Publicidad y medios",
  "subject": "ipc",
  "items": [
   {
    "q": "Un anuncio saca a tu influencer favorito usando el producto. ¿Qué técnica es?",
    "o": [
     "Escasez.",
     "Testimonio de una figura conocida.",
     "Humor.",
     "Datos científicos."
    ],
    "a": 1,
    "fb": "Testimonio: una figura conocida presta su imagen para que confíes en el producto."
   },
   {
    "q": "«¡Solo hoy! ¡Últimas unidades!» ¿Qué técnica publicitaria es?",
    "o": [
     "Escasez y urgencia.",
     "Publicidad aspiracional.",
     "Testimonio.",
     "Humor."
    ],
    "a": 0,
    "fb": "Escasez y urgencia: presionan para que compres sin pensarlo."
   },
   {
    "q": "Un anuncio no muestra el producto, sino una vida feliz y admirada que este promete. ¿Cómo se llama?",
    "o": [
     "Clickbait.",
     "Publicidad aspiracional.",
     "Bandwagon.",
     "Contraste de fuentes."
    ],
    "a": 1,
    "fb": "Publicidad aspiracional: vende un estilo de vida, no el producto en sí."
   },
   {
    "q": "Un titular exagerado promete mucho más de lo que el artículo da, para que hagas clic. Es…",
    "o": [
     "alfabetización mediática.",
     "clickbait.",
     "un argumento.",
     "un testimonio."
    ],
    "a": 1,
    "fb": "Clickbait: cebo de clics mediante titulares exagerados o engañosos."
   },
   {
    "q": "Te llega un mensaje viral alarmante. ¿Qué es lo más sensato antes de creerlo o reenviarlo?",
    "o": [
     "Reenviarlo rápido por si acaso.",
     "Contrastar la fuente: quién lo dice, con qué pruebas y si lo confirman otros.",
     "Creerlo porque lo manda un amigo.",
     "Borrarlo sin mirarlo."
    ],
    "a": 1,
    "fb": "Contrastar fuentes: ¿quién lo dice?, ¿qué pruebas hay?, ¿lo confirman medios fiables?"
   },
   {
    "q": "«Únete a los millones de personas que ya lo usan.» En publicidad, esto es…",
    "o": [
     "apelar a que todos lo tienen (efecto bandwagon).",
     "escasez.",
     "humor.",
     "un dato técnico."
    ],
    "a": 0,
    "fb": "Bandwagon: «lo usa todo el mundo» como razón para que lo uses tú."
   },
   {
    "q": "Saber distinguir en un medio la información, la opinión y la publicidad se llama…",
    "o": [
     "clickbait.",
     "alfabetización mediática.",
     "posverdad.",
     "anclaje."
    ],
    "a": 1,
    "fb": "Alfabetización mediática: leer los medios de forma crítica."
   },
   {
    "q": "¿Por qué la publicidad usa tanto el humor y la emoción?",
    "o": [
     "Porque aporta datos objetivos del producto.",
     "Para que asocies esa emoción agradable con la marca y la recuerdes.",
     "Porque la ley la obliga.",
     "Para informar de los ingredientes."
    ],
    "a": 1,
    "fb": "La emoción positiva se asocia a la marca y ayuda a recordarla, sin necesidad de dar razones."
   },
   {
    "q": "¿Qué es la alfabetización mediática?",
    "o": [
     "Leer críticamente los medios, distinguiendo información, opinión y publicidad.",
     "Creer todo lo que dice la prensa.",
     "Evitar los medios.",
     "Solo consumir publicidad."
    ],
    "a": 0,
    "fb": "Saber leer los medios de forma crítica es la alfabetización mediática."
   },
   {
    "q": "Estás a punto de compartir un mensaje viral. ¿Qué haces (pensamiento crítico)?",
    "o": [
     "Contrastar la fuente y las pruebas antes de compartir.",
     "Reenviarlo ya.",
     "Creerlo porque lo manda un amigo.",
     "Ocultarlo sin mirar."
    ],
    "a": 0,
    "fb": "Contrastar fuentes es clave para no difundir bulos."
   }
  ]
 },
 "ipc-huella-q": {
  "name": "Mi huella en el planeta",
  "subject": "ipc",
  "items": [
   {
    "q": "¿Qué mide la huella ecológica?",
    "o": [
     "Los kilómetros que andamos al día.",
     "La tierra y el mar productivos que hacen falta para producir lo que consumimos y absorber nuestros residuos.",
     "El número de árboles de una ciudad.",
     "La basura que reciclamos."
    ],
    "a": 1,
    "fb": "Huella ecológica: superficie productiva necesaria para nuestro consumo y nuestros residuos (en hectáreas globales)."
   },
   {
    "q": "Una familia gasta el sueldo de todo el año en cinco meses y luego vive de préstamos. ¿Con qué idea se compara?",
    "o": [
     "Con el Día de la Sobrecapacidad de la Tierra.",
     "Con el reciclaje.",
     "Con la biocapacidad.",
     "Con la huella hídrica."
    ],
    "a": 0,
    "fb": "El Día de la Sobrecapacidad marca cuándo hemos gastado lo que el planeta regenera en todo el año; desde entonces vivimos «a crédito»."
   },
   {
    "q": "Si toda la humanidad viviera como se vive de media en España, ¿cuántos planetas harían falta?",
    "o": [
     "Menos de uno.",
     "Exactamente uno.",
     "Más de dos.",
     "Diez."
    ],
    "a": 2,
    "fb": "Más de dos planetas: nuestro consumo supera con mucho lo que nos tocaría."
   },
   {
    "q": "¿Qué es la biocapacidad?",
    "o": [
     "Lo que la naturaleza puede regenerar en un año.",
     "La capacidad de una fábrica.",
     "El número de habitantes de un país.",
     "La energía de las baterías."
    ],
    "a": 0,
    "fb": "Biocapacidad: bosques que vuelven a crecer, peces que se reproducen, suelo que vuelve a dar cosecha."
   },
   {
    "q": "En los países ricos, ¿cuál es la parte más grande de la huella ecológica?",
    "o": [
     "El agua de beber.",
     "La huella de carbono (energía, transporte, consumo).",
     "El papel del colegio.",
     "Las mascotas."
    ],
    "a": 1,
    "fb": "La huella de carbono: el CO₂ de la energía, el transporte y lo que compramos."
   },
   {
    "q": "Los países que más consumen no son los que más sufren sequías o inundaciones. ¿Cómo se llama este problema?",
    "o": [
     "Greenwashing.",
     "Injusticia ambiental.",
     "Biocapacidad.",
     "Reciclaje."
    ],
    "a": 1,
    "fb": "Injusticia ambiental: los daños recaen sobre quien menos ha contaminado y menos medios tiene."
   },
   {
    "q": "¿Cuál es el orden correcto para reducir residuos?",
    "o": [
     "Reciclar, reutilizar, reducir.",
     "Reutilizar, reciclar, reducir.",
     "Reducir, reutilizar, reciclar.",
     "Da igual el orden."
    ],
    "a": 2,
    "fb": "Primero reducir (no generar el residuo), luego reutilizar y, al final, reciclar."
   },
   {
    "q": "Una marca de ropa rápida anuncia una «colección verde» pero sigue sacando miles de prendas nuevas cada semana. Eso es…",
    "o": [
     "justicia ambiental.",
     "greenwashing.",
     "biocapacidad.",
     "consumo responsable."
    ],
    "a": 1,
    "fb": "Greenwashing: pintarse de verde en la publicidad sin cambiar lo que se hace."
   },
   {
    "q": "¿Cuál de estas acciones reduce más tu huella en el día a día?",
    "o": [
     "Ir al instituto andando o en transporte público en vez de en coche.",
     "Cambiar de móvil cada año.",
     "Comprar ropa nueva cada mes.",
     "Dejar la luz encendida."
    ],
    "a": 0,
    "fb": "El transporte es una de las partes que más pesa: andar, bici o transporte público reducen mucho la huella."
   }
  ]
 },
 "ipc-hecho-q": {
  "name": "¿Hecho, opinión, hipótesis o pregunta?",
  "subject": "ipc",
  "items": [
   {
    "q": "«El agua hierve a 100 °C al nivel del mar.»",
    "o": [
     "Un hecho.",
     "Una opinión.",
     "Una hipótesis.",
     "Una pregunta filosófica."
    ],
    "a": 0,
    "fb": "Es un hecho: se puede comprobar y cualquiera que lo mida obtiene lo mismo."
   },
   {
    "q": "«El reguetón es la peor música que existe.»",
    "o": [
     "Un hecho.",
     "Una opinión.",
     "Una hipótesis.",
     "Una pregunta filosófica."
    ],
    "a": 1,
    "fb": "Es una opinión: expresa un gusto o una valoración. Se puede defender con razones, pero no se «comprueba» como un hecho."
   },
   {
    "q": "«Puede que las plantas crezcan más con música: lo probaremos con dos macetas iguales.»",
    "o": [
     "Un hecho.",
     "Una opinión.",
     "Una hipótesis.",
     "Una pregunta filosófica."
    ],
    "a": 2,
    "fb": "Es una hipótesis: una suposición que todavía no sabemos si es verdad, pero que se puede poner a prueba."
   },
   {
    "q": "«¿Es justo que unos países tengan mucho más que otros?»",
    "o": [
     "Un hecho.",
     "Una opinión.",
     "Una hipótesis.",
     "Una pregunta filosófica."
    ],
    "a": 3,
    "fb": "Es una pregunta filosófica: no se responde con un dato ni con un experimento, sino pensando y dando razones."
   },
   {
    "q": "«Bilbao está en Bizkaia.»",
    "o": [
     "Un hecho.",
     "Una opinión.",
     "Una hipótesis.",
     "Una pregunta filosófica."
    ],
    "a": 0,
    "fb": "Es un hecho: basta mirar un mapa para comprobarlo."
   },
   {
    "q": "«Las series de ahora son más aburridas que las de antes.»",
    "o": [
     "Un hecho.",
     "Una opinión.",
     "Una hipótesis.",
     "Una pregunta filosófica."
    ],
    "a": 1,
    "fb": "Es una opinión: depende de gustos. Ojo: que sea opinión no significa que no haya que razonarla."
   },
   {
    "q": "«Quizá mirar el móvil antes de dormir empeora el sueño: comparemos a quienes lo hacen y a quienes no.»",
    "o": [
     "Un hecho.",
     "Una opinión.",
     "Una hipótesis.",
     "Una pregunta filosófica."
    ],
    "a": 2,
    "fb": "Es una hipótesis: se plantea como posible y se propone una forma de comprobarla. Una hipótesis NO es lo mismo que una opinión."
   },
   {
    "q": "«¿Qué es la felicidad?»",
    "o": [
     "Un hecho.",
     "Una opinión.",
     "Una hipótesis.",
     "Una pregunta filosófica."
    ],
    "a": 3,
    "fb": "Pregunta filosófica: es abierta, importante y no tiene una única respuesta de libro."
   },
   {
    "q": "«En 1969 unos astronautas llegaron a la Luna.»",
    "o": [
     "Un hecho.",
     "Una opinión.",
     "Una hipótesis.",
     "Una pregunta filosófica."
    ],
    "a": 0,
    "fb": "Es un hecho histórico comprobado con muchas pruebas independientes (aunque circulen bulos que digan lo contrario)."
   },
   {
    "q": "«Pensar críticamente es aburrido.»",
    "o": [
     "Un hecho.",
     "Una opinión.",
     "Una hipótesis.",
     "Una pregunta filosófica."
    ],
    "a": 1,
    "fb": "Es una opinión: una valoración personal. Otra persona puede pensar lo contrario con buenas razones."
   },
   {
    "q": "«Si estudio con música, tal vez me concentre peor: voy a probar una semana con música y otra sin ella.»",
    "o": [
     "Un hecho.",
     "Una opinión.",
     "Una hipótesis.",
     "Una pregunta filosófica."
    ],
    "a": 2,
    "fb": "Es una hipótesis: una suposición que se comprueba con una prueba sencilla."
   },
   {
    "q": "«¿Podemos estar seguros de algo?»",
    "o": [
     "Un hecho.",
     "Una opinión.",
     "Una hipótesis.",
     "Una pregunta filosófica."
    ],
    "a": 3,
    "fb": "Pregunta filosófica: sobre el conocimiento mismo. La ciencia no la puede zanjar con un experimento."
   }
  ]
 },
 "ipc-moda-q": {
  "name": "Moda rápida: el documental",
  "subject": "ipc",
  "items": [
   {
    "q": "¿A quién se dirige sobre todo el negocio de la moda rápida?",
    "o": [
     "A los adolescentes.",
     "A las personas mayores.",
     "A las empresas.",
     "A los deportistas."
    ],
    "a": 0,
    "fb": "El documental explica que el público principal son los adolescentes."
   },
   {
    "q": "Antes había unas 4 colecciones al año. ¿Cuántas microcolecciones sacan hoy algunas cadenas?",
    "o": [
     "8.",
     "52, una cada semana.",
     "12, una al mes.",
     "Ninguna."
    ],
    "a": 1,
    "fb": "Hasta 52 al año: una microcolección nueva cada semana, para que siempre haya algo «nuevo» que comprar."
   },
   {
    "q": "Según un estudio de Greenpeace, ¿qué parte de la ropa que se compra no se llega a usar nunca?",
    "o": [
     "Casi nada.",
     "Un 5 %.",
     "Alrededor del 40 %.",
     "Toda."
    ],
    "a": 2,
    "fb": "Alrededor del 40 %: casi la mitad de lo que se compra se queda sin estrenar."
   },
   {
    "q": "¿De dónde salen cerca del 70 % de los tejidos nuevos?",
    "o": [
     "Del algodón ecológico.",
     "De la lana.",
     "De ropa reciclada.",
     "Del petróleo (fibras sintéticas)."
    ],
    "a": 3,
    "fb": "Son fibras sintéticas derivadas del petróleo, como el poliéster."
   },
   {
    "q": "El poliéster «reciclado» de muchas grandes marcas sale sobre todo de…",
    "o": [
     "botellas de plástico viejas.",
     "ropa usada.",
     "algodón.",
     "papel."
    ],
    "a": 0,
    "fb": "De botellas de plástico, no de ropa usada: reciclar ropa para hacer ropa nueva casi no existe."
   },
   {
    "q": "¿Qué hacen algunas familias pobres de Bulgaria con la ropa desechada que les venden?",
    "o": [
     "La exportan a Asia.",
     "La queman en las estufas para calentarse.",
     "La convierten en papel.",
     "La devuelven a las tiendas."
    ],
    "a": 1,
    "fb": "La queman para calentarse porque no pueden pagar leña: sale humo tóxico y la ciudad se contamina."
   },
   {
    "q": "¿Por qué es tan contaminante quemar esta ropa?",
    "o": [
     "Porque es de papel.",
     "Porque lleva mucha agua.",
     "Porque muchas prendas llevan plásticos y sueltan gases tóxicos y dioxinas.",
     "Porque huele mal."
    ],
    "a": 2,
    "fb": "Los plásticos de los tejidos liberan gases contaminantes y dioxinas, perjudiciales para la salud."
   },
   {
    "q": "En el documental, la felicidad por estrenar una prenda dura…",
    "o": [
     "años.",
     "toda la temporada.",
     "un mes.",
     "poco más de un día."
    ],
    "a": 3,
    "fb": "Poco más de un día: por eso el ciclo de comprar vuelve a empezar enseguida."
   },
   {
    "q": "Una tienda te da un descuento por dejar tu ropa vieja en su contenedor «de reciclaje». ¿Qué técnica hay detrás?",
    "o": [
     "Te anima a volver a comprar y lava la imagen de la marca (greenwashing).",
     "Es caridad sin más.",
     "Obliga a no comprar.",
     "Es un impuesto."
    ],
    "a": 0,
    "fb": "El descuento es para la siguiente compra: sigues consumiendo y la marca parece «verde». El documental lo llama un truco de marketing."
   },
   {
    "q": "Según la conclusión del documental, ¿cuál es la prenda más sostenible?",
    "o": [
     "La de algodón.",
     "La que no hace falta fabricar.",
     "La más barata.",
     "La que se tira al contenedor."
    ],
    "a": 1,
    "fb": "La que no hace falta producir: comprar menos, usar más tiempo, arreglar y compartir."
   }
  ]
 }
};
