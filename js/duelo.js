/* (11-10) «Duelo de razones»: datos del juego de debate (antes en media/juego_duelo_de_razones*.html, cinco copias;
   ahora una sección de la web: dueloview.js). Se traducen por tm/<lang>.json como el resto de datos.
   DUELO_FALACIAS: las doce falacias (nombre, nombre técnico, pregunta para desmontarla). DUELO_ESTRAT: estratagemas que atacan
   el temple (Schopenhauer, El arte de tener razón). DUELO_REACCIONES: lo que te sale al perder los estribos.
   DUELO_TEMAS: id (estable: #duelo/<nivel>/<id>), nivel (eso|fil|hf), claim, cpuLado, tuLado, opp (argumentos del ordenador:
   f = falacia o null, peso 1-3, fuerza opcional, interes opcional, fAlt = otras falacias válidas), counters (tus cartas: str 1-3, o f si
   es tramposa), estrat opcional (provocaciones propias del tema). Reglas y equilibrio: docs/17_duelo_de_razones_juego_debate.md.
   (12-10, sesión 40) Duelos de filósofos «pol-<id>»: uno por polémica de polemicas.js (campo «duelo»), con tesis, citas y trucos de su ficha. */
const DUELO_FALACIAS = {
 "persona": {
  "nombre": "Atacar a la persona",
  "tec": "ad hominem",
  "q": "¿Qué tiene que ver cómo es la persona con si su idea es buena?"
 },
 "famoso": {
  "nombre": "Lo dice un famoso",
  "tec": "falsa autoridad",
  "q": "¿Es experto de verdad en ESTO, o solo es famoso?"
 },
 "siempre": {
  "nombre": "Siempre se ha hecho así",
  "tec": "apelación a la tradición",
  "q": "Que sea de toda la vida, ¿lo hace bueno?"
 },
 "pena": {
  "nombre": "Dar pena en vez de razones",
  "tec": "apelación a la pena",
  "q": "¿Me da una razón, o solo busca que me dé lástima?"
 },
 "deformar": {
  "nombre": "Deformar lo que has dicho",
  "tec": "hombre de paja",
  "q": "¿De verdad he dicho eso, o lo ha exagerado para atacarlo?"
 },
 "pocos": {
  "nombre": "Con pocos casos, concluir de todos",
  "tec": "generalización apresurada",
  "q": "¿Con cuántos casos? ¿De verdad vale para todos?"
 },
 "causa": {
  "nombre": "Pasó después, luego fue la causa",
  "tec": "falsa causa",
  "q": "¿Hay prueba de que uno causa el otro, o solo vienen seguidos?"
 },
 "dos": {
  "nombre": "Solo hay dos opciones",
  "tec": "falso dilema",
  "q": "¿Seguro que no hay ninguna opción más?"
 },
 "miedo": {
  "nombre": "Asustar para convencer",
  "tec": "apelación al miedo",
  "q": "¿Me da una razón, o solo me mete miedo?"
 },
 "todos": {
  "nombre": "Lo dice todo el mundo",
  "tec": "ad populum",
  "q": "Que lo haga mucha gente, ¿lo convierte en verdad?"
 },
 "notrue": {
  "nombre": "Redefinir a conveniencia",
  "tec": "«no true scotsman»",
  "q": "¿Cambias la definición solo para esquivar el contraejemplo? (Sócrates aceptó la distinción… y se la dio la vuelta.)"
 },
 "equivoco": {
  "nombre": "Jugar con el doble sentido",
  "tec": "equívoco / anfibología",
  "q": "Esa palabra tiene dos sentidos: ¿en cuál la usas? Si cambias de sentido a mitad de camino, no has probado nada."
 }
};
const DUELO_ORDEN_FAL = ["persona","famoso","siempre","pena","deformar","pocos","causa","dos","miedo","todos","notrue","equivoco"];
const DUELO_ESTRAT = {
 "insulto": {
  "t": "“¿En serio piensas eso? Hay que ser muy corto para no verlo. Anda, déjalo.”",
  "nombre": "el insulto",
  "schop": "estratagema 38, la «última ratio»",
  "q": "No es una razón, es un insulto. Pídele que hable del tema, no de ti."
 },
 "ira": {
  "t": "“Claro, tú siempre tan lento para todo; normal que no lo pilles.”",
  "nombre": "provocar la ira",
  "schop": "estratagema 8",
  "q": "«Encolerizado, nadie juzga bien.» Respira: no muerdas el anzuelo."
 },
 "persona": {
  "t": "“Tú no tienes ni idea de la vida, así que mejor no opines de esto.”",
  "nombre": "el ataque personal",
  "schop": "ad hominem, estratagema 21",
  "q": "Que lo digas tú no cambia si la idea es buena o mala."
 },
 "categoria": {
  "t": "“Eso que dices es típico de un facha. Solo un pringado pensaría así.”",
  "nombre": "meterte en un saco odioso",
  "schop": "subsumir en una categoría aborrecible",
  "q": "La etiqueta no refuta nada. ¿Dónde está la razón?"
 },
 "miedo": {
  "t": "“Como sigas llevándome la contraria, te vas a quedar sin amigos.”",
  "nombre": "la amenaza",
  "schop": "apelación al miedo (ad baculum)",
  "q": "El miedo no es una razón. ¿Por qué sería verdad lo que dice?"
 },
 "desvio": {
  "t": "“¿Y tú qué? El otro día hiciste lo mismo. Hablemos de eso mejor.”",
  "nombre": "desviar y señalarte",
  "schop": "estratagemas 18 y 29",
  "q": "Que yo falle no responde a la pregunta. Volvamos al tema."
 },
 "autoridad": {
  "t": "“Lo dijo un premio Nobel y está más que demostrado. No hay más que hablar.”",
  "nombre": "la autoridad para callarte",
  "schop": "estratagema 30",
  "q": "¿Quién, dónde y por qué? Una cita sin razón no cierra el tema."
 }
};
const DUELO_REACCIONES = [
 {
  "lbl": "Insultarle tú también",
  "t": "“¡Pues tú más tonto, anda ya!”"
 },
 {
  "lbl": "Rendirte y darle la razón",
  "t": "“Vale, vale… lo que tú digas.”"
 },
 {
  "lbl": "Huir del tema",
  "t": "“Paso, hablemos de otra cosa.”"
 }
];
const DUELO_TEMAS = [
 {
  "id": "moviles",
  "nivel": [
   "eso"
  ],
  "claim": "¿Hay que dejar los móviles fuera de clase?",
  "cpuLado": "El ordenador defiende: «que se usen libremente en clase».",
  "tuLado": "Tú defiendes: «mejor fuera del aula».",
  "opp": [
   {
    "t": "El móvil te da diccionario y calculadora al instante; bien usado es una herramienta de estudio.",
    "f": null
   },
   {
    "t": "Lo dijo un gurú de la tecnología en una charla: prohibir el móvil es de analfabetos digitales.",
    "f": "famoso",
    "peso": 1,
    "interes": "Ese gurú asesora a una empresa que vende tabletas y aplicaciones a los institutos."
   },
   {
    "t": "En todos los institutos modernos ya se usan; quedarse atrás es de pueblo.",
    "f": "todos",
    "peso": 2
   },
   {
    "t": "O móvil libre, o criaremos a chavales incapaces de vivir en el siglo XXI.",
    "f": "dos",
    "peso": 3
   },
   {
    "t": "Conozco a dos que aprobaron buscando cosas en el móvil; está claro que ayuda a todos.",
    "f": "pocos",
    "peso": 2
   },
   {
    "t": "Si enseñamos a usarlo con normas, aprenden a autorregularse mejor que si se prohíbe del todo.",
    "f": null
   }
  ],
  "counters": [
   {
    "t": "En las aulas que recogieron los móviles subió la atención y bajaron las copias: hay datos.",
    "str": 3
   },
   {
    "t": "Una herramienta útil puede usarse en momentos concretos, no tenerla encima toda la hora.",
    "str": 2
   },
   {
    "t": "Para lo que haga falta están las tablets del centro, sin notificaciones personales.",
    "str": 2
   },
   {
    "t": "Mucha gente agradece desconectar un rato; el aula puede ser ese sitio.",
    "str": 1
   },
   {
    "t": "O el móvil fuera, o esto será un cibercafé y nadie aprenderá nada.",
    "f": "dos"
   },
   {
    "t": "Lo dice mi tío, que lleva 30 años de profe, así que fuera y punto.",
    "f": "famoso"
   }
  ]
 },
 {
  "id": "comida",
  "nivel": [
   "eso"
  ],
  "claim": "¿Conviene comer comida rápida cada día?",
  "cpuLado": "El ordenador defiende: «sí, adelante, cada día».",
  "tuLado": "Tú defiendes: «de vez en cuando sí, a diario no».",
  "opp": [
   {
    "t": "Es barata y rápida; para quien tiene poco tiempo, resuelve la comida.",
    "f": null
   },
   {
    "t": "La anuncia el futbolista más famoso del mundo, así que tan mala no será.",
    "f": "famoso",
    "peso": 1,
    "interes": "El futbolista cobra millones por anunciar esa cadena de comida rápida."
   },
   {
    "t": "Toda la clase come ahí los viernes; por algo será.",
    "f": "todos",
    "peso": 2
   },
   {
    "t": "Mi primo come hamburguesas y está fortísimo: esta comida te pone fuerte.",
    "f": "causa",
    "peso": 2
   },
   {
    "t": "O comes esto, o te quedas con hambre; no hay otra opción barata.",
    "f": "dos",
    "peso": 3
   },
   {
    "t": "No me quites el único gusto del día, con lo mal que lo paso ya.",
    "f": "pena",
    "peso": 1
   }
  ],
  "counters": [
   {
    "t": "En la etiqueta pone que un menú lleva casi toda la sal y la grasa de un día entero: a diario pasa factura.",
    "str": 3
   },
   {
    "t": "Comerla de vez en cuando no es el problema; el problema es cada día.",
    "str": 2
   },
   {
    "t": "Con lo que cuesta un menú diario cocinas variado por menos a la semana.",
    "str": 2
   },
   {
    "t": "Hay bocadillos y fruta igual de rápidos y más baratos.",
    "str": 1
   },
   {
    "t": "Conozco a uno que enfermó comiendo eso; luego todo el que lo come enferma.",
    "f": "pocos"
   },
   {
    "t": "Como sigas comiendo eso, acabarás en el hospital seguro.",
    "f": "miedo"
   }
  ]
 },
 {
  "id": "mascota",
  "nivel": [
   "eso"
  ],
  "claim": "¿Adoptamos una mascota hoy mismo?",
  "cpuLado": "El ordenador defiende: «sí, hoy mismo».",
  "tuLado": "Tú defiendes: «prepararlo bien antes, no hoy a lo loco».",
  "opp": [
   {
    "t": "Hay animales en la protectora que necesitan un hogar cuanto antes; esperar también les cuesta.",
    "f": null
   },
   {
    "t": "Mira qué carita; si no lo traemos hoy me voy a poner tristísimo.",
    "f": "pena",
    "peso": 2
   },
   {
    "t": "En mi familia siempre hemos tenido perro, así que hay que tener uno ya.",
    "f": "siempre",
    "peso": 1
   },
   {
    "t": "Todos mis amigos tienen mascota; soy el único que no.",
    "f": "todos",
    "peso": 1
   },
   {
    "t": "O lo adoptamos hoy, o nos quedamos sin mascota para siempre.",
    "f": "dos",
    "peso": 3
   },
   {
    "t": "La veterinaria dice de esperar, pero como no tiene hijos, no sabe de familias.",
    "f": "persona",
    "peso": 2
   }
  ],
  "counters": [
   {
    "t": "Un perro vive diez o quince años y cada día hay que darle de comer, sacarlo y pagar veterinario: hay que organizarlo antes.",
    "str": 3
   },
   {
    "t": "Podemos adoptar en cuanto sepamos quién lo saca cada día; es prepararlo, no renunciar.",
    "str": 2
   },
   {
    "t": "Si lo traemos sin plan y luego no podemos cuidarlo, el que peor lo pasa es el animal.",
    "str": 2
   },
   {
    "t": "Una semana para preparar la casa y el horario no es tanto.",
    "str": 1
   },
   {
    "t": "O sea, que según tú los animales no importan nada.",
    "f": "deformar"
   },
   {
    "t": "Un veterinario influencer dijo que cuanto antes mejor, así que hoy.",
    "f": "famoso"
   }
  ]
 },
 {
  "id": "trasimaco",
  "nivel": [
   "fil",
   "hf"
  ],
  "claim": "¿La justicia es solo la conveniencia del más fuerte? · Sócrates vs. Trasímaco",
  "cpuLado": "El ordenador es Trasímaco: ser injusto es más rentable y más feliz; la justicia solo sirve al poderoso.",
  "tuLado": "Tú eres Sócrates: la justicia es una virtud que beneficia a quien la tiene, y la vida justa es más feliz.",
  "estrat": [
   {
    "t": "Irrumpe como una fiera: “¡Menuda sarta de tonterías lleváis diciendo todo el rato!”",
    "nombre": "la entrada a lo bestia",
    "schop": "amedrentar antes de argumentar",
    "q": "El tono no es un argumento. ¿Qué tiene que decir del tema?"
   },
   {
    "t": "Suelta una risotada: “Ahí está la ironía de siempre de Sócrates; ya sabía yo que te escabullirías.”",
    "nombre": "la burla",
    "schop": "ridiculizar en vez de refutar",
    "q": "Reírse no refuta nada. Pídele la razón."
   },
   {
    "t": "“Sócrates, ¿todavía tienes niñera? Porque te deja con los mocos colgando y no te los limpia.”",
    "nombre": "el insulto de la nodriza",
    "schop": "estratagema 38, la «última ratio»",
    "q": "Es un insulto, no una respuesta. Vuelve al tema."
   }
  ],
  "opp": [
   {
    "t": "El justo siempre saca menos: no engaña en los negocios, paga sus impuestos y, al gobernar, beneficia a otros y no a sí mismo.",
    "f": null
   },
   {
    "t": "Cuando un médico se equivoca, en ese instante no actúa como médico. Igual el que manda: en sentido estricto, el gobernante no yerra.",
    "f": "notrue",
    "peso": 1
   },
   {
    "t": "Tú solo preguntas para ganar, por amor al honor; no buscas la verdad, así que tus preguntas no cuentan.",
    "f": "persona",
    "peso": 3
   },
   {
    "t": "Mira quién triunfa: tiranos y tramposos. Está clarísimo que la injusticia es lo que hace feliz.",
    "f": "pocos",
    "peso": 2
   },
   {
    "t": "O eres injusto y sacas tajada, o eres justo y te comen vivo; no hay término medio.",
    "f": "dos",
    "peso": 2
   },
   {
    "t": "El justo es un primo al que explotan; el injusto, el listo que explota. O una cosa o la otra. Por eso la injusticia es la virtud.",
    "f": "dos",
    "fAlt": [
     "persona"
    ],
    "peso": 2
   }
  ],
  "counters": [
   {
    "t": "Hasta una banda de ladrones necesita algo de justicia entre ellos para lograr algo; la injusticia los enfrenta y los destruye.",
    "str": 3
   },
   {
    "t": "Los gobernantes se equivocan y dictan leyes que les perjudican; entonces obedecerlas no beneficia al fuerte.",
    "str": 2
   },
   {
    "t": "El médico, en cuanto médico, busca el bien del enfermo, no el suyo; quien manda bien busca el bien del gobernado.",
    "str": 2
   },
   {
    "t": "Si la función del alma es vivir, y la justicia es su virtud, el justo vive bien; y vivir bien es ser feliz.",
    "str": 2
   },
   {
    "t": "Un sofista cobra por enseñar a tener razón sin tenerla; ¿cómo vamos a creerte a ti?",
    "f": "persona"
   },
   {
    "t": "O admites que la justicia es una virtud, o reconoces que te gustaría que te robaran; elige.",
    "f": "dos"
   }
  ]
 },
 {
  "id": "atheismusstreit",
  "nivel": [
   "hf"
  ],
  "claim": "El Atheismusstreit (1798): ¿es ateo identificar a Dios con el orden moral del mundo?",
  "cpuLado": "El ordenador son los acusadores de Fichte: eso es ateísmo, y el ateísmo hay que prohibirlo.",
  "tuLado": "Eres Fichte: el Dios digno de fe es el orden moral vivo del mundo; un Dios-cosa aparte sería un ídolo.",
  "estrat": [
   {
    "t": "Circula un panfleto anónimo, “Carta de un padre a su hijo estudiante”: quien lea tu revista perderá la fe y el alma.",
    "nombre": "el panfleto anónimo",
    "schop": "atacar sin dar la cara (envenenar el pozo)",
    "q": "Quien acusa en la sombra no argumenta. ¿Qué afirma y con qué prueba?"
   },
   {
    "t": "El gobierno de Sajonia amenaza con confiscar la revista y castigar a quien la lea.",
    "nombre": "la amenaza de censura",
    "schop": "la fuerza en vez de razones (ad baculum)",
    "q": "Amordazar una idea no la refuta. ¿Dónde está el argumento?"
   },
   {
    "t": "“¡Ateo!” Con esa palabra basta; no hay más que hablar contigo.",
    "nombre": "la etiqueta infamante",
    "schop": "subsumir en una categoría aborrecible",
    "q": "La etiqueta no refuta nada. ¿En qué consiste exactamente lo que digo?"
   }
  ],
  "opp": [
   {
    "t": "Un Dios que no es sustancia, ni persona, ni creador, sino solo “el orden moral”, ¿en qué se distingue de no tener Dios?",
    "f": null
   },
   {
    "t": "Fichte dice que Dios es solo una idea que nos hacemos; o sea, que niega a Dios. Es un ateo.",
    "f": "deformar",
    "peso": 3
   },
   {
    "t": "Si quitas al Dios personal, se derrumban la moral, el juramento y el Estado. Hay que prohibirlo ya.",
    "f": "miedo",
    "peso": 3
   },
   {
    "t": "Fichte es un jacobino y un revoltoso; ya se sabe qué clase de filosofía sale de un hombre así.",
    "f": "persona",
    "peso": 2
   },
   {
    "t": "El catecismo que toda la cristiandad confiesa dice que Dios es persona y creador; ¿quién es él para enmendarlo?",
    "f": "siempre",
    "peso": 1
   },
   {
    "t": "Toda la gente de bien se escandaliza con esa revista; por algo será.",
    "f": "todos",
    "peso": 1
   }
  ],
  "counters": [
   {
    "t": "El Dios verdadero es el orden moral vivo del mundo, aquello en lo que confías al obrar bien: eso no es “una idea mía”, es lo más real.",
    "str": 3
   },
   {
    "t": "Hacer de Dios una cosa o una persona, un ser más entre los seres, lo rebaja a ídolo; negar ese ídolo no es negar a Dios.",
    "str": 3
   },
   {
    "t": "Castigar una idea con la censura no la refuta: si me equivoco, demostradlo, no me amordacéis.",
    "str": 2
   },
   {
    "t": "Juzgad mis razones, no mi política: que yo sea jacobino o no, no dice si tengo razón.",
    "str": 2
   },
   {
    "t": "O aceptáis mi idealismo entero, o sois unos fanáticos supersticiosos.",
    "f": "dos"
   },
   {
    "t": "Quien me acusa es un cura ignorante que no ha leído una línea de Kant.",
    "f": "persona"
   }
  ]
 },
 {
  "id": "descartes-dualismo",
  "nivel": [
   "fil",
   "hf"
  ],
  "claim": "El dualismo de Descartes: ¿mente y cuerpo son dos sustancias o una sola?",
  "cpuLado": "El ordenador es el monista (Spinoza, La Mettrie): solo hay una sustancia; un alma aparte sobra.",
  "tuLado": "Eres Descartes: la mente es una cosa que piensa, realmente distinta del cuerpo extenso.",
  "estrat": [
   {
    "t": "“Eso son cuentos de curas: el alma inmortal es superstición para asustar a la gente.”",
    "nombre": "el desprecio",
    "schop": "subsumir en una categoría aborrecible",
    "q": "El desprecio no es un argumento. ¿Qué falla en la distinción, exactamente?"
   },
   {
    "t": "“Tú, que te escondes tras el ‘pienso, luego existo’, no te atreves a mirar el cuerpo de frente.”",
    "nombre": "la pulla personal",
    "schop": "ad hominem",
    "q": "Mi carácter no decide si la mente y el cuerpo son distintos."
   },
   {
    "t": "“Deja de marear con tu ‘claro y distinto’ y habla como una persona normal.”",
    "nombre": "la burla",
    "schop": "ridiculizar en vez de refutar",
    "q": "Reírse del vocabulario no refuta la idea."
   }
  ],
  "opp": [
   {
    "t": "Si el alma no es extensa, no puede empujar ni mover el cuerpo; el contacto exige extensión. ¿Cómo interactúan, entonces?",
    "f": null
   },
   {
    "t": "Basta una sola sustancia con dos atributos, pensamiento y extensión, para explicarlo todo, sin dos mundos que no se sabe cómo se tocan.",
    "f": null
   },
   {
    "t": "Según tú el cuerpo es una cárcel sin valor y solo cuenta el alma; desprecias la carne entera.",
    "f": "deformar",
    "peso": 3
   },
   {
    "t": "O el alma es una sustancia aparte, o no eres más que una máquina sin libertad: elige.",
    "f": "dos",
    "peso": 2
   },
   {
    "t": "Un trago de vino cambia tus pensamientos; luego pensar es solo química del cuerpo, no hay alma.",
    "f": "causa",
    "peso": 2
   },
   {
    "t": "Los médicos y los sabios modernos son todos materialistas; ¿vas a tener razón tú solo?",
    "f": "todos",
    "peso": 1
   }
  ],
  "counters": [
   {
    "t": "Puedo dudar de que tengo cuerpo, pero no de que pienso; y lo que concibo claro y distinto como separado, puede existir separado.",
    "str": 3
   },
   {
    "t": "Que el cuerpo influya en la mente no prueba que sean lo mismo: el músico no es su instrumento, aunque lo toque.",
    "str": 3
   },
   {
    "t": "No desprecio el cuerpo: digo que formo con él una unión muy estrecha, no que sea una cárcel.",
    "str": 2
   },
   {
    "t": "Que una sustancia sola sea más simple no la hace verdadera: aún hay que explicar por qué pienso en primera persona.",
    "str": 2
   },
   {
    "t": "O admites un alma inmortal, o eres un animal sin dignidad: no hay término medio.",
    "f": "dos"
   },
   {
    "t": "A Spinoza lo expulsaron de su comunidad; ¿cómo vas a creer a un hombre así?",
    "f": "persona"
   }
  ]
 },
 {
  "id": "hegel-kant",
  "nivel": [
   "hf"
  ],
  "claim": "Hegel contra Kant: ¿la razón tiene límites infranqueables o puede pensarlo todo?",
  "cpuLado": "El ordenador defiende a Kant: solo conocemos fenómenos; de la cosa en sí hay que callar.",
  "tuLado": "Eres Hegel: esos límites son un prejuicio; la cosa en sí es un vacío y la contradicción mueve el pensamiento.",
  "estrat": [
   {
    "t": "“Tus frases son tan oscuras que no hay quien te entienda; así es fácil hacerse el profundo.”",
    "nombre": "la burla por oscuro",
    "schop": "ridiculizar en vez de refutar",
    "q": "Que te cueste leerme no refuta lo que digo. ¿Qué es falso, exactamente?"
   },
   {
    "t": "“Tú escribes para parecer importante, no para aclarar nada.”",
    "nombre": "la pulla personal",
    "schop": "ad hominem",
    "q": "Mi estilo no decide si Kant tenía razón o no."
   },
   {
    "t": "“Deja de marear con la ‘dialéctica’ y respóndeme con un sí o un no.”",
    "nombre": "la impaciencia",
    "schop": "forzar y desviar",
    "q": "Simplificar a la fuerza no responde a la pregunta."
   }
  ],
  "opp": [
   {
    "t": "Solo conocemos fenómenos, nunca la cosa en sí: el espacio, el tiempo y las categorías son nuestros, no de las cosas.",
    "f": null
   },
   {
    "t": "Cuando la razón sale de la experiencia cae en antinomias: prueba con igual fuerza una tesis y su contraria. Eso marca un límite.",
    "f": null
   },
   {
    "t": "O sea, que según tú la razón ya lo sabe todo y podemos inventarnos el mundo a voluntad.",
    "f": "deformar",
    "peso": 3
   },
   {
    "t": "O aceptas mis límites, o vuelves a la vieja metafísica delirante de almas y mundos. No hay más.",
    "f": "dos",
    "peso": 2
   },
   {
    "t": "La Crítica de la razón pura es la obra cumbre de la filosofía; ¿quién eres tú para enmendarle la plana a Kant?",
    "f": "famoso",
    "peso": 2
   },
   {
    "t": "Sin esos límites, la filosofía vuelve al fanatismo y la superstición: es peligroso.",
    "f": "miedo",
    "peso": 1
   }
  ],
  "counters": [
   {
    "t": "Examinar la facultad de conocer antes de conocer es querer aprender a nadar sin meterse en el agua.",
    "str": 3
   },
   {
    "t": "La cosa en sí, lo que queda al quitarle al objeto todo lo que pienso de él, no es un misterio: es la abstracción más vacía.",
    "str": 3
   },
   {
    "t": "La contradicción de las antinomias no es el final de la razón, sino su motor: lo verdadero es el todo que las supera.",
    "str": 2
   },
   {
    "t": "No digo que inventemos el mundo: digo que pensamiento y realidad no son dos mundos separados por un muro.",
    "str": 2
   },
   {
    "t": "O piensas la totalidad como yo, o no eres más que un escéptico cobarde: elige.",
    "f": "dos"
   },
   {
    "t": "Kant era un viejo rutinario que nunca salió de Königsberg; ¿qué iba a saber del devenir?",
    "f": "persona"
   }
  ]
 },
 {
  "id": "calicles",
  "nivel": [
   "fil",
   "hf"
  ],
  "claim": "Sócrates contra Calicles (Gorgias): ¿tiene razón la ley del más fuerte?",
  "cpuLado": "El ordenador es Calicles: por naturaleza, el fuerte debe mandar y tener más; reprimirse es de débiles.",
  "tuLado": "Eres Sócrates: es peor cometer una injusticia que sufrirla, y la vida sin medida no es feliz.",
  "estrat": [
   {
    "t": "“Deja de hacer preguntitas de esclavo y habla como un hombre.”",
    "nombre": "el desprecio viril",
    "schop": "subsumir en una categoría aborrecible",
    "q": "El tono de hombría no es un argumento. ¿Qué es falso en lo que digo?"
   },
   {
    "t": "“¿No te da vergüenza, a tu edad, perder el tiempo jugando con las palabras?”",
    "nombre": "la pulla por la edad",
    "schop": "ad hominem",
    "q": "Mi edad no decide si llevo razón."
   },
   {
    "t": "“Esto es ridículo, me aburres; responde tú, que tanto sabes.”",
    "nombre": "la impaciencia",
    "schop": "desviar y forzar",
    "q": "Aburrirse no refuta nada. Volvamos a la pregunta."
   }
  ],
  "opp": [
   {
    "t": "La justicia de la igualdad la inventan los muchos débiles para atar al fuerte por miedo; por naturaleza, el mejor debe tener más.",
    "f": null
   },
   {
    "t": "Mira la naturaleza: el león no respeta leyes y el Estado fuerte se impone al débil. Así son las cosas, y así deben ser.",
    "f": "pocos",
    "peso": 1
   },
   {
    "t": "La filosofía está bien para niños; un hombre hecho y derecho que sigue filosofando es ridículo y merece unos azotes.",
    "f": "persona",
    "peso": 3
   },
   {
    "t": "O mandas y disfrutas, o te mandan y aguantas: no hay vida buena a medio camino.",
    "f": "dos",
    "peso": 2
   },
   {
    "t": "Si no aprendes retórica y sigues con tus preguntas, cualquiera te llevará a juicio y te matará sin que sepas defenderte.",
    "f": "miedo",
    "peso": 2
   },
   {
    "t": "Según tú habría que dejarse pisotear y no defenderse jamás; predicas ser un cobarde.",
    "f": "deformar",
    "peso": 2
   }
  ],
  "counters": [
   {
    "t": "Si el más fuerte es el que más puede, y los muchos pueden más que uno, entonces la justicia de los muchos es la de la naturaleza: tu propia ley te contradice.",
    "str": 3
   },
   {
    "t": "El alma sin medida es un tonel agujereado: por mucho que eches, nunca se llena; esa vida no es dicha, es una carencia sin fin.",
    "str": 3
   },
   {
    "t": "Placer y dolor se sienten a la vez (el sediento bebe con placer mientras aún sufre la sed), pero el bien y el mal no; luego el placer no es el bien.",
    "str": 2
   },
   {
    "t": "No digo dejarse pisotear: digo que cometer injusticia daña el alma más que sufrirla; por eso prefiero recibir el golpe a darlo.",
    "str": 2
   },
   {
    "t": "Tú defiendes esto porque eres un ambicioso sin escrúpulos; por eso no te creo.",
    "f": "persona"
   },
   {
    "t": "O admites que la justicia vale, o reconoces que no eres más que un tirano: elige.",
    "f": "dos"
   }
  ]
 },
 {
  "id": "eutifron",
  "nivel": [
   "fil",
   "hf"
  ],
  "claim": "Sócrates contra Eutifrón: ¿qué es la piedad?",
  "cpuLado": "El ordenador es Eutifrón: un adivino que se cree experto en religión y va a denunciar a su propio padre; asegura saber qué es «lo pío».",
  "tuLado": "Eres Sócrates: no buscas ejemplos, sino la definición: el rasgo por el que toda acción pía es pía.",
  "estrat": [
   {
    "t": "“Yo sé de estas cosas mucho más que tú, Sócrates; para algo soy adivino.”",
    "nombre": "la suficiencia del experto",
    "schop": "apelar a la propia autoridad",
    "q": "Que seas adivino no responde a la pregunta: dime qué es lo pío."
   },
   {
    "t": "“Me cansas con tanta preguntita; esto lo entiende cualquiera menos tú.”",
    "nombre": "la impaciencia",
    "schop": "desdén / ad hominem",
    "q": "Cansarte no refuta nada. Volvamos a la pregunta."
   },
   {
    "t": "“Tengo prisa, Sócrates, me esperan; lo dejamos para otro día.”",
    "nombre": "la huida",
    "schop": "esquivar la pregunta",
    "q": "Irte no es responder: huir deja la pregunta en pie."
   }
  ],
  "opp": [
   {
    "t": "¿Qué es lo pío? Pío es lo que hago ahora mismo: perseguir al que comete un crimen. Ahí lo tienes.",
    "f": null
   },
   {
    "t": "El propio Zeus encadenó a su padre Crono; si los dioses hacen estas cosas, ¿quién soy yo para no imitarlos?",
    "f": "famoso",
    "peso": 2
   },
   {
    "t": "Está clarísimo: lo pío es lo que resulta querido por los dioses, y lo impío lo que les resulta odioso.",
    "f": null
   },
   {
    "t": "Pues lo pío será lo que aman TODOS los dioses sin excepción; ninguno que de verdad sea dios amaría un crimen.",
    "f": "notrue",
    "peso": 2
   },
   {
    "t": "Es pío porque los dioses lo aman, y punto; con eso te basta para saber qué es.",
    "f": null
   },
   {
    "t": "Todo Atenas sabe de sobra lo que es la piedad; solo tú finges no entenderlo.",
    "f": "todos",
    "peso": 2
   }
  ],
  "counters": [
   {
    "t": "Te pregunté QUÉ es la piedad, no un ejemplo de algo piadoso. Dame el rasgo por el que toda acción pía es pía, para medir con él cualquier acto.",
    "str": 3
   },
   {
    "t": "Si los dioses riñen entre sí, como cuentan los poetas, lo mismo será amado por unos y odiado por otros: pío e impío a la vez. Tu definición se contradice.",
    "str": 3
   },
   {
    "t": "¿Lo pío es amado por los dioses PORQUE es pío, o es pío PORQUE lo aman? Si lo aman porque ya es pío, ser amado no es lo que lo hace pío: me dices lo que le ocurre, no lo que es.",
    "str": 3
   },
   {
    "t": "Tu «comercio» con los dioses vuelve al principio: agradarles no es sino ser amado por ellos, y eso ya lo refutamos. Giras en círculo.",
    "str": 2
   },
   {
    "t": "Un hombre capaz de llevar a su propio padre a juicio no tiene corazón; no me fío de nada que diga.",
    "f": "persona"
   },
   {
    "t": "O defines la piedad aquí y ahora, o reconoce que eres un impío: elige.",
    "f": "dos"
   }
  ]
 },
 {
  "id": "eutidemo",
  "nivel": [
   "fil",
   "hf"
  ],
  "claim": "Sócrates contra Eutidemo y Dionisodoro: el arte de vencer con palabras",
  "cpuLado": "El ordenador son los hermanos eristas Eutidemo y Dionisodoro: presumen de refutar cualquier cosa, diga lo que diga el otro, jugando con el doble sentido de las palabras.",
  "tuLado": "Eres Sócrates: distingue los sentidos de cada palabra y muestra que refutan el término, no la cosa.",
  "estrat": [
   {
    "t": "Se ríen a dúo: “¿Lo veis? El gran Sócrates no sabe ni responder una pregunta de niños.”",
    "nombre": "la risa a dúo",
    "schop": "ridiculizar en vez de refutar",
    "q": "Reírse no refuta nada. ¿Dónde está el fallo de lo que digo?"
   },
   {
    "t": "Te acosan por turnos sin dejarte pensar: “¡Responde ya! ¡Sí o no! ¡Rápido!”",
    "nombre": "el acoso por turnos",
    "schop": "atropellar para que no distingas",
    "q": "Atropellar no es argumentar. Dame tiempo de distinguir los sentidos."
   },
   {
    "t": "“Da igual lo que respondas, caerás igual; mejor ríndete ya.”",
    "nombre": "el farol de invencibles",
    "schop": "intimidar con falsa invencibilidad",
    "q": "Que presumáis de ganar no prueba que tengáis razón."
   }
  ],
  "opp": [
   {
    "t": "Los que aprenden, ¿son los sabios o los ignorantes? Si son los sabios, aprenden lo que ya saben; si los ignorantes, aprenden sin entender nada. Luego aprender es imposible.",
    "f": "equivoco",
    "peso": 2
   },
   {
    "t": "¿Sabes algo? Entonces eres un sabio. Y el que sabe, sabe. Luego lo sabes TODO, y siempre lo has sabido.",
    "f": "equivoco",
    "peso": 2,
    "interes": "Los dos hermanos cobran por enseñar este arte: cuanto más deslumbre la trampa, más alumnos de pago."
   },
   {
    "t": "¿Tienes un perro y es padre de cachorros? Entonces es padre y es tuyo: es tu padre. Y tú eres hermano de los cachorros.",
    "f": "equivoco",
    "peso": 2
   },
   {
    "t": "Quieres que el joven se vuelva sabio, es decir, que deje de ser lo que es; quieres que deje de ser: ¡quieres que muera!",
    "f": "equivoco",
    "peso": 2
   },
   {
    "t": "Toda pregunta se responde sí o no. Responde solo sí o no y verás cómo caes; matizar es de tramposos.",
    "f": "dos",
    "peso": 2
   },
   {
    "t": "Antes dijiste una cosa y ahora otra; luego te contradices y has perdido, digas lo que digas.",
    "f": "deformar",
    "peso": 1
   }
  ],
  "counters": [
   {
    "t": "Distingo: «aprender» significa dos cosas, adquirir un saber nuevo y entender lo que ya se tiene. El ignorante aprende en el primer sentido. Deshecho el equívoco, no hay paradoja.",
    "str": 3
   },
   {
    "t": "«Saber algo» no es «saberlo todo»: de que sepa una cosa no se sigue que las sepa todas. Juegas con la palabra «saber».",
    "str": 3
   },
   {
    "t": "«Es padre» y «es mío» son verdad por separado, pero no se suman: el perro es padre de sus cachorros y mío como animal, no mi padre. Confundes dos sentidos de «ser».",
    "str": 3
   },
   {
    "t": "Querer que alguien llegue a ser sabio no es querer que «deje de ser»: es querer que siga siendo él y además sepa. Refutas una palabra, no mi deseo.",
    "str": 2
   },
   {
    "t": "Solo un par de embaucadores de feria diría algo así; no voy a haceros el menor caso.",
    "f": "persona"
   },
   {
    "t": "O admitís que vuestro juego es pura palabrería, o sois unos farsantes: elegid.",
    "f": "dos"
   }
  ]
 },
 {
  "id": "criton",
  "nivel": [
   "fil",
   "hf"
  ],
  "claim": "Sócrates contra Critón: ¿hay que escapar de una condena injusta?",
  "cpuLado": "El ordenador es Critón: un amigo que entra de madrugada en la cárcel para convencer a Sócrates de que huya; tiene dinero, contactos y un plan.",
  "tuLado": "Eres Sócrates: la cuestión no es qué dirán ni qué conviene, sino si huir es justo; y jamás se debe cometer injusticia.",
  "estrat": [
   {
    "t": "“Me romperás el corazón; si mueres pierdo a un amigo irreemplazable y nadie creerá que hice lo posible.”",
    "nombre": "el chantaje del amigo",
    "schop": "dar pena / culpabilizar",
    "q": "Tu dolor me importa, pero no decide qué es justo."
   },
   {
    "t": "“¡Date prisa, el barco está al llegar, es esta noche o nunca; no hay tiempo de filosofar!”",
    "nombre": "la prisa",
    "schop": "atropellar para que no pienses",
    "q": "La prisa no es un argumento; justamente por grave hay que pensarlo bien."
   },
   {
    "t": "“¿Vas a quedarte ahí tan tranquilo mientras tus hijos quedan huérfanos? ¿Qué clase de padre eres?”",
    "nombre": "el reproche del padre",
    "schop": "culpar en vez de argumentar",
    "q": "Insinuar que soy mal padre no responde a si escapar es justo."
   }
  ],
  "opp": [
   {
    "t": "Si no escapas, la gente dirá que tus amigos fuimos unos tacaños y unos cobardes por no gastar en salvarte. Piensa en nuestra fama.",
    "f": "todos",
    "peso": 2,
    "interes": "A Critón le preocupa su propia fama: teme que digan que él no quiso pagar la fuga."
   },
   {
    "t": "Piensa en tus hijos: los dejas huérfanos, sin crianza ni educación. Abandonarlos así es de egoístas.",
    "f": "pena",
    "peso": 2
   },
   {
    "t": "O escapas y vives, o te quedas y les das la victoria a los que te condenaron injustamente: no hay otra.",
    "f": "dos",
    "peso": 2
   },
   {
    "t": "Quedarte es elegir el camino cómodo; cualquiera con agallas ya habría huido.",
    "f": "persona",
    "fAlt": [
     "todos"
    ],
    "peso": 1
   },
   {
    "t": "Tenemos los medios y amigos dispuestos a sacarte; el riesgo para nosotros lo asumimos de buena gana.",
    "f": null
   },
   {
    "t": "Tu muerte beneficia a quienes te condenaron injustamente y hiere a quienes te queremos.",
    "f": null
   }
  ],
  "counters": [
   {
    "t": "No hay que atender a lo que opina la mayoría, sino a quien sabe: en salud seguimos al médico, no a la multitud; en lo justo, igual. La masa puede matar, pero no decide qué es justo.",
    "str": 3
   },
   {
    "t": "La pregunta no es qué dirán, sino si escapar es justo; y jamás se debe cometer injusticia, ni siquiera para devolver un daño recibido.",
    "str": 3
   },
   {
    "t": "Si cada particular anula las sentencias que no le gustan, ninguna ciudad se sostiene. Viviendo aquí acepté obedecer las leyes y pude irme si no estaba de acuerdo: romper ese pacto ahora sería injusto.",
    "str": 3
   },
   {
    "t": "A mis hijos los cría mejor un padre que no rompe sus pactos: huir les enseñaría lo contrario. Mejor les dejo buenos amigos y un buen ejemplo que un padre fugitivo.",
    "str": 2
   },
   {
    "t": "Solo un cobarde como tú, que teme el qué dirán, me pide que huya.",
    "f": "persona"
   },
   {
    "t": "O huimos ya esta noche, o me abandonas a la muerte: elige.",
    "f": "dos"
   }
  ]
 },
 {
  "id": "pol-erasmo-lutero",
  "nivel": [
   "fil",
   "hf"
  ],
  "claim": "Erasmo contra Lutero (1524-1525): ¿tenemos libre albedrío?",
  "cpuLado": "El ordenador es Lutero: sin la gracia, la voluntad es esclava del pecado y la salvación viene solo de Dios.",
  "tuLado": "Eres Erasmo: el ser humano tiene una fuerza propia, pequeña, que coopera con la gracia; y en lo oscuro, prudencia.",
  "estrat": [
   {
    "t": "“El Espíritu Santo no es escéptico: tú no te atreves a afirmar nada.”",
    "nombre": "la burla del escéptico",
    "schop": "ridiculizar en vez de refutar",
    "q": "Ser prudente donde la Escritura es oscura no es ser escéptico. Responde a lo que he dicho."
   },
   {
    "t": "“Escribes como un retórico elegante que nunca se juega nada.”",
    "nombre": "la pulla al humanista",
    "schop": "ad hominem",
    "q": "Mi estilo no decide si tenemos libre albedrío."
   },
   {
    "t": "“Quien dude de esto ya no es buen cristiano.”",
    "nombre": "la excomunión de bolsillo",
    "schop": "subsumir en una categoría aborrecible",
    "q": "Discrepar en este punto no me saca de la fe. Dime qué falla en mi razonamiento."
   }
  ],
  "opp": [
   {
    "t": "Sin la gracia, la voluntad humana está sometida al pecado: no puede elegir el bien por sí misma.",
    "f": null
   },
   {
    "t": "Si la salvación dependiera en parte de nuestro esfuerzo, nadie podría estar seguro de ella y cada uno acabaría presumiendo de sus méritos ante Dios.",
    "f": null
   },
   {
    "t": "O la salvación es toda obra de Dios, o es toda obra nuestra: no hay término medio.",
    "f": "dos",
    "peso": 2
   },
   {
    "t": "Según tú, el hombre se salva él solito, con sus fuerzas, y la gracia de Dios sobra.",
    "f": "deformar",
    "peso": 3
   },
   {
    "t": "Si concedes un poco de libre albedrío, mañana todos querrán comprar el cielo con obras y limosnas, como con las indulgencias.",
    "f": "miedo",
    "peso": 2
   },
   {
    "t": "Agustín ya lo dejó resuelto contra Pelagio: ¿quién eres tú para enmendar a un Padre de la Iglesia?",
    "f": "famoso",
    "peso": 1
   }
  ],
  "counters": [
   {
    "t": "Si no pudiéramos elegir nada, los mandatos, los premios y los castigos de la Escritura no tendrían sentido, y Dios castigaría por lo que no podemos evitar.",
    "str": 3
   },
   {
    "t": "No digo que nos salvemos solos: digo que la voluntad coopera con la gracia, como el niño al que su padre ayuda a dar los pasos hacia la fruta que le enseña.",
    "str": 3
   },
   {
    "t": "Que la salvación no sea solo obra nuestra no obliga a decir que no hacemos nada: entre el todo y la nada hay sitio para cooperar.",
    "str": 2
   },
   {
    "t": "En lo que la Escritura deja oscuro es mejor no hacer afirmaciones tajantes que dividan a los cristianos.",
    "str": 2
   },
   {
    "t": "O aceptas el libre albedrío, o tendrás que reconocer que Dios es un tirano cruel: elige.",
    "f": "dos"
   },
   {
    "t": "Hablas así porque eres un fraile rebelde que solo quiere romper la Iglesia.",
    "f": "persona"
   }
  ]
 },
 {
  "id": "pol-leibniz-newton-clarke",
  "nivel": [
   "fil",
   "hf"
  ],
  "claim": "Leibniz contra Newton y Clarke (1715-1716): ¿qué es el espacio?",
  "cpuLado": "El ordenador es Clarke, portavoz de Newton: el espacio es absoluto y real, y Dios gobierna el mundo sin cesar.",
  "tuLado": "Eres Leibniz: el espacio es solo el orden de las cosas que coexisten, y un Dios perfecto no necesita retocar su obra.",
  "estrat": [
   {
    "t": "“La Royal Society ya ha dictaminado que el cálculo es de Newton; ¿por qué habría que creerte ahora?”",
    "nombre": "el tribunal que es parte",
    "schop": "apelar a una autoridad interesada",
    "q": "Ese informe lo redactó en buena parte el propio Newton, y además no trata del espacio. Volvamos al tema."
   },
   {
    "t": "“Tu Dios relojero huele a materialismo: así se empieza y se acaba sin Dios.”",
    "nombre": "la etiqueta peligrosa",
    "schop": "subsumir en una categoría aborrecible",
    "q": "Llamarlo materialismo no lo refuta. ¿Qué falla en mi argumento?"
   },
   {
    "t": "“Un filósofo de las cortes alemanas no va a enseñar física a Inglaterra.”",
    "nombre": "el desprecio nacional",
    "schop": "ad hominem",
    "q": "De dónde vengo no decide qué es el espacio."
   }
  ],
  "opp": [
   {
    "t": "El espacio es real e independiente de los cuerpos: aunque no hubiera nada, seguiría ahí.",
    "f": null
   },
   {
    "t": "En la física de Newton hay efectos, como las fuerzas que aparecen al hacer girar un cubo de agua, que parecen exigir un espacio absoluto.",
    "f": null
   },
   {
    "t": "O sea, que según tú Dios fabricó el mundo y se desentendió de él: no lo necesitamos para nada.",
    "f": "deformar",
    "peso": 3
   },
   {
    "t": "Si el mundo funciona solo, como un reloj, mañana nadie creerá en Dios: tu filosofía lleva al ateísmo.",
    "f": "miedo",
    "peso": 2
   },
   {
    "t": "Newton es el mayor sabio de nuestro tiempo y piensa como yo; ¿vas a llevarle la contraria tú?",
    "f": "famoso",
    "peso": 2
   },
   {
    "t": "En toda Inglaterra se acepta ya la física de Newton.",
    "f": "todos",
    "peso": 1
   }
  ],
  "counters": [
   {
    "t": "Si el espacio fuera absoluto, Dios habría podido poner el universo entero unos metros más allá sin que cambiara nada, y no tendría razón para elegir. Pero nada ocurre sin razón suficiente.",
    "str": 3
   },
   {
    "t": "El espacio es un orden de cosas que coexisten, como el tiempo es un orden de sucesiones: sin cosas, no queda nada que ordenar.",
    "str": 3
   },
   {
    "t": "Si Dios tuviera que dar cuerda a su máquina y arreglarla de vez en cuando, sería un relojero torpe. Un Dios perfecto hace una obra que no necesita arreglos.",
    "str": 2
   },
   {
    "t": "No digo que Dios se retire: conserva el mundo en todo momento. Lo que niego es que tenga que corregirlo como un mal artesano.",
    "str": 2
   },
   {
    "t": "Tu Newton es un plagiario de mi cálculo; con eso está todo dicho.",
    "f": "persona"
   },
   {
    "t": "O el espacio es solo una relación, o tendrás que decir que Dios es un ser extenso, como un cuerpo: elige.",
    "f": "dos"
   }
  ]
 },
 {
  "id": "pol-voltaire-rousseau-lisboa",
  "nivel": [
   "fil",
   "hf"
  ],
  "claim": "Voltaire contra Rousseau tras el terremoto de Lisboa (1755): ¿«todo está bien»?",
  "cpuLado": "El ordenador es Voltaire: decir «todo está bien» ante miles de muertos inocentes es un insulto a las víctimas.",
  "tuLado": "Eres Rousseau: la Providencia no es la culpable; muchos de nuestros males los causamos nosotros.",
  "estrat": [
   {
    "t": "“¡Ah, el optimista! Como un doctor Pangloss: todo va de maravilla en el mejor de los mundos.”",
    "nombre": "la caricatura",
    "schop": "ridiculizar en vez de refutar",
    "q": "Una caricatura no responde a lo que he dicho sobre cómo estaba construida Lisboa."
   },
   {
    "t": "“Usted, que escribió contra las ciencias y las artes, ¿pretende darme lecciones?”",
    "nombre": "la pulla personal",
    "schop": "ad hominem",
    "q": "Lo que yo escribiera antes no decide quién tiene razón sobre Lisboa."
   },
   {
    "t": "“Hasta en los salones de París se ríen ya del optimismo.”",
    "nombre": "la risa del público",
    "schop": "apelar al público en vez de a las razones",
    "q": "Que la gente se ría no es un argumento."
   }
  ],
  "opp": [
   {
    "t": "Un niño aplastado en brazos de su madre no ha hecho nada malo: ninguna teoría sobre el orden del universo convencerá a quien sufre de que su dolor era necesario.",
    "f": null
   },
   {
    "t": "El mal es real y la razón no sabe explicarlo: lo honrado es reconocerlo, en vez de disfrazarlo.",
    "f": null
   },
   {
    "t": "Según usted, los lisboetas se lo buscaron y merecían morir.",
    "f": "deformar",
    "peso": 3
   },
   {
    "t": "Imagínese bajo los escombros, oyendo gritar a sus hijos: ¿todavía cree en la Providencia?",
    "f": "pena",
    "peso": 2
   },
   {
    "t": "O acepta usted que todo está bien, o reconoce que el mundo es un caos sin ningún orden: elija.",
    "f": "dos",
    "peso": 2
   },
   {
    "t": "Mire Lisboa: con eso basta para saber que en la naturaleza no hay ningún orden.",
    "f": "pocos",
    "peso": 1
   }
  ],
  "counters": [
   {
    "t": "El terremoto es natural, pero el desastre no del todo: la naturaleza no había reunido allí veinte mil casas de seis y siete pisos.",
    "str": 3
   },
   {
    "t": "Si los habitantes hubieran vivido más repartidos y en casas más bajas, habrían muerto muchos menos: las víctimas dependen también de cómo construimos y vivimos.",
    "str": 3
   },
   {
    "t": "Muchos murieron por volver a por su ropa, sus papeles o su dinero: también eso es obra nuestra, no de la naturaleza.",
    "str": 2
   },
   {
    "t": "Su poema le quita al que sufre la única esperanza que le queda. Prefiero un consuelo razonable a una desesperación que no ayuda a nadie.",
    "str": 2
   },
   {
    "t": "Usted vive rico y cómodo en su castillo: ¿qué sabe del sufrimiento?",
    "f": "persona"
   },
   {
    "t": "O cree usted en la Providencia, o es un ateo: no hay más.",
    "f": "dos"
   }
  ]
 },
 {
  "id": "pol-sartre-camus",
  "nivel": [
   "fil",
   "hf"
  ],
  "claim": "Sartre contra Camus (1952): ¿se puede justificar la violencia en nombre de la historia?",
  "cpuLado": "El ordenador es Sartre: nadie está fuera de la historia, y criticar a la URSS sin matices hace el juego a la derecha.",
  "tuLado": "Eres Camus: la rebelión contra la injusticia tiene límites; ningún fin futuro justifica los campos.",
  "estrat": [
   {
    "t": "“Usted llega a todas partes con un pedestal portátil.”",
    "nombre": "la burla del pedestal",
    "schop": "ridiculizar a la persona",
    "q": "Mi carácter no responde a lo que he dicho sobre los campos."
   },
   {
    "t": "“Usted no sabe filosofía: no ha leído a Hegel ni a Marx como es debido.”",
    "nombre": "la acusación de incompetencia",
    "schop": "ad hominem",
    "q": "Si los leo mal, dime en qué. Si no, responde al argumento."
   },
   {
    "t": "“Siga así y acabará en el bando de los burgueses.”",
    "nombre": "la etiqueta del enemigo",
    "schop": "subsumir en una categoría aborrecible",
    "q": "Ponerme en un bando no refuta lo que digo."
   }
  ],
  "opp": [
   {
    "t": "Nadie está fuera de la historia: callar o mantenerse puro también tiene consecuencias, y suele favorecer a quienes ya mandan.",
    "f": null
   },
   {
    "t": "No se puede juzgar la historia desde fuera, con principios puros: hay que comprometerse en ella, aunque uno se manche las manos.",
    "f": null
   },
   {
    "t": "Según usted, como la revolución puede salir mal, lo mejor es no hacer nada y dejar a los obreros como están.",
    "f": "deformar",
    "peso": 3
   },
   {
    "t": "O está con los obreros y con el Partido, o está con la burguesía: no hay sitio en medio.",
    "f": "dos",
    "peso": 2
   },
   {
    "t": "Cada palabra suya contra los campos la usará la derecha para atacar a los trabajadores.",
    "f": "miedo",
    "peso": 2
   },
   {
    "t": "Usted habla de moral desde su éxito de escritor; los obreros no tienen tiempo para esos lujos.",
    "f": "persona",
    "peso": 1
   }
  ],
  "counters": [
   {
    "t": "Si un fin futuro justifica matar hoy, cualquier crimen puede justificarse. Por eso hay que nombrar los campos, los mantenga quien los mantenga.",
    "str": 3
   },
   {
    "t": "«Me rebelo, luego somos»: la rebelión nace defendiendo algo común a todos, y por eso no puede volverse contra los demás sin traicionarse.",
    "str": 3
   },
   {
    "t": "No digo que no haya que comprometerse: digo que el compromiso tiene límites, y el primero es no aceptar el asesinato planificado.",
    "str": 2
   },
   {
    "t": "Callar una injusticia porque la comete tu propio bando no es comprometerse con la historia: es renunciar a juzgarla.",
    "str": 2
   },
   {
    "t": "Usted defiende la URSS porque le conviene para su revista.",
    "f": "persona"
   },
   {
    "t": "O condena usted todos los campos, o es cómplice de asesinos: elija.",
    "f": "dos"
   }
  ]
 }
];
