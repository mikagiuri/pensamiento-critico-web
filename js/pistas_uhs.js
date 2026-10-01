// Generado por tools/build_eso.js — solo Pensamiento crítico (2.º ESO).
const PISTAS = [
 {
  "id": "ipc-falacias",
  "subject": "ipc",
  "tema": "Las falacias",
  "unidad": "ipc-falacias",
  "materia": "Pensamiento crítico · 2.º ESO",
  "titulo": "¿Qué es una falacia?",
  "lede": "Aprende a reconocer la trampa. Pide solo las pistas que necesites.",
  "ciclos": [
   {
    "fase": "Fase 1 · Recuperación",
    "etiqueta": "Pregunta inicial",
    "pregunta": "¿Qué es una falacia?",
    "intro": [
     "Intenta explicarlo con tus palabras. No hace falta saberse ningún nombre raro."
    ],
    "pistas": [
     "Una falacia es un tipo de <em>argumento</em>, no una simple mentira.",
     "Tiene algo de truco: a primera vista parece un buen argumento.",
     "Consigue convencer, pero sus razones no sostienen de verdad lo que dice.",
     "Una falacia es un argumento que <strong>parece bueno pero no lo es</strong>: convence sin tener razón."
    ],
    "comprobacion": {
     "pregunta": "¿Cuál de estas frases explica mejor qué es una falacia?",
     "opciones": [
      [
       "Un argumento que parece bueno, pero cuyas razones no prueban lo que dice.",
       true
      ],
      [
       "Cualquier mentira.",
       false,
       "Una mentira es decir algo falso a sabiendas. Una falacia es un fallo al razonar, aunque quien la usa ni siquiera se dé cuenta."
      ],
      [
       "Una opinión con la que no estoy de acuerdo.",
       false,
       "Que no estés de acuerdo no convierte un argumento en falaz: hay que mirar si sus razones sostienen la conclusión."
      ],
      [
       "Un error de ortografía en un texto.",
       false,
       "Las falacias son errores al razonar, no al escribir."
      ]
     ],
     "ok": "Bien. La clave es que <em>parece</em> un buen argumento, pero no lo es.",
     "mal": "Todavía no."
    },
    "rescate": [
     {
      "boton": "Necesito un ejemplo",
      "etiqueta": "Ejemplo",
      "titulo": "Mira esta conversación",
      "definicion": [
       "Ane: «Deberíamos reciclar más en clase: el papel que tiramos se puede aprovechar».",
       "Iker: «¿Tú? Pero si el otro día te vi tirar una lata al suelo. No le hagáis caso»."
      ],
      "parrafos": [
       "Iker consigue que la clase dude de Ane. Pero ¿ha dicho algo contra la idea de reciclar el papel?"
      ],
      "comprobacion": {
       "etiqueta": "Comprobación del ejemplo",
       "pregunta": "¿Qué hace Iker?",
       "opciones": [
        [
         "Ataca a Ane en lugar de responder a su argumento.",
         true
        ],
        [
         "Demuestra que reciclar papel no sirve.",
         false,
         "No dice nada sobre el papel: solo habla de lo que hizo Ane."
        ],
        [
         "Da una razón mejor que la de Ane.",
         false,
         "Lo que Ane hiciera con una lata no dice nada sobre si conviene reciclar papel."
        ],
        [
         "Nada raro: es un buen argumento.",
         false,
         "Convence, pero no responde a lo que Ane propone: ahí está la trampa."
        ]
       ],
       "ok": "Correcto. Su respuesta parece un argumento, pero no toca la idea de Ane: es una falacia.",
       "mal": "Vuelve a leer la conversación.",
       "intentos": 2
      }
     },
     {
      "etiqueta": "Definición y explicación",
      "titulo": "Falacia",
      "definicion": [
       "Una <strong>falacia</strong> es un argumento que parece bueno pero no lo es: convence sin tener razón.",
       "No es lo mismo que una mentira: puedes decir cosas verdaderas y razonar mal, o usar una falacia sin darte cuenta.",
       "Por eso no basta con saberse nombres: hay que aprender a ver dónde está el truco."
      ],
      "comprobacion": {
       "boton": "Comprobar comprensión",
       "etiqueta": "Comprobación final",
       "pregunta": "¿Cuál de estas afirmaciones es verdadera?",
       "opciones": [
        [
         "Una falacia puede convencer aunque sus razones no prueben nada.",
         true
        ],
        [
         "Una falacia siempre dice cosas falsas.",
         false,
         "Puede decir cosas verdaderas: el fallo está en cómo razona."
        ],
        [
         "Las falacias solo las usan quienes quieren engañar.",
         false,
         "También se cuelan sin querer: por eso conviene aprender a detectarlas."
        ],
        [
         "Si un argumento convence, no puede ser una falacia.",
         false,
         "Justo al revés: las falacias son peligrosas porque convencen."
        ]
       ],
       "ok": "Correcto.",
       "mal": "Todavía no."
      }
     }
    ]
   },
   {
    "fase": "Fase 2 · Profundización",
    "etiqueta": "Nueva pregunta",
    "pregunta": "¿Por qué es tramposo atacar a la persona en vez de a su argumento?",
    "intro": [
     "Lo que hizo Iker tiene nombre: <em>ad hominem</em> («contra la persona»). Piensa por qué no sirve como respuesta."
    ],
    "pistas": [
     "Separa dos cosas: <em>quién</em> dice algo y <em>qué</em> dice.",
     "Una idea puede ser buena aunque la diga alguien que no la cumple.",
     "Si alguien critica a la persona, la idea sigue ahí, sin responder.",
     "El ataque personal desvía la atención: la conversación pasa de la idea a la persona, y la idea queda sin discutir."
    ],
    "comprobacion": {
     "pregunta": "¿Cuál de estas respuestas es un ataque a la persona?",
     "opciones": [
      [
       "«No le hagas caso a lo que dice sobre el móvil: es un pesado».",
       true
      ],
      [
       "«Dice que el móvil distrae en clase, pero hay estudios que dicen otra cosa».",
       false,
       "Aquí se responde con una razón sobre el móvil, no contra la persona."
      ],
      [
       "«Puede que tenga razón, pero me gustaría ver datos».",
       false,
       "Pedir pruebas es una forma razonable de responder a una idea."
      ],
      [
       "«No estoy de acuerdo, porque el móvil también sirve para buscar información».",
       false,
       "Es un contraargumento: discute la idea, no a quien la dice."
      ]
     ],
     "ok": "Exacto. «Es un pesado» no dice nada sobre el móvil: solo descalifica a quien habla.",
     "mal": "No exactamente."
    },
    "rescate": [
     {
      "boton": "Mostrar la explicación",
      "etiqueta": "La falacia ad hominem",
      "titulo": "Contra la persona",
      "definicion": [
       "La falacia <strong>ad hominem</strong> consiste en atacar a la persona (cómo es, qué hizo, de dónde viene) en lugar de responder a lo que dice.",
       "Es tramposa porque no toca la idea: una propuesta no es mejor ni peor según quién la diga.",
       "Para responder bien, pregúntate: ¿qué razones da? ¿Son buenas? Eso es lo que hay que discutir."
      ],
      "comprobacion": {
       "boton": "Terminar comprobando",
       "pregunta": "Si quien propone algo no lo cumple, ¿qué podemos decir de su propuesta?",
       "opciones": [
        [
         "Nada todavía: hay que examinar sus razones, no a la persona.",
         true
        ],
        [
         "Que la propuesta es falsa.",
         false,
         "Que alguien no cumpla una idea no la hace falsa."
        ],
        [
         "Que no hay que escucharla.",
         false,
         "Eso es justo la falacia: rechazar la idea por la persona."
        ],
        [
         "Que la propuesta es verdadera.",
         false,
         "Tampoco: la persona no cuenta ni a favor ni en contra."
        ]
       ],
       "ok": "Correcto: la idea se juzga por sus razones.",
       "mal": "Relee la explicación."
      }
     }
    ]
   }
  ],
  "cierre": {
   "titulo": "Ya sabes detectar el truco",
   "parrafos": [
    "Una falacia es un argumento que parece bueno pero no lo es. El ataque a la persona (ad hominem) es de las más frecuentes: cambia de tema y deja la idea sin responder.",
    "Reto: busca hoy un ejemplo real (en redes, en la tele, en una discusión) y explica dónde está la trampa."
   ]
  }
 }
];
