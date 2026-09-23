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
 }
};
const QUIZZES = {
 "falacias": {
  "name": "Falacias (Pensamiento crítico)",
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
  "name": "Sesgos cognitivos (Pensamiento crítico)",
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
  "name": "Publicidad y medios (Pensamiento crítico)",
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
 }
};
