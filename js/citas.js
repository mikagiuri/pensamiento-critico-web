"use strict";
/* ===== Citas — frases célebres de la filosofía =====
   {c:cita, a:autor, o:obra/contexto (opcional), e:época antigua|medieval|moderna|contemporanea}.
   Recopiladas de la teoría y de las barajas de citas del aula. Dominio público (textos clásicos). */
const CITAS = [
 {
  "c": "Los seres humanos comienzan y han comenzado siempre a filosofar movidos por el asombro.",
  "a": "Aristóteles",
  "o": "Metafísica",
  "e": "antigua"
 },
 {
  "c": "El ser humano es por naturaleza un animal político.",
  "a": "Aristóteles",
  "o": "Política",
  "e": "antigua"
 },
 {
  "c": "La virtud es un término medio relativo a nosotros, determinado por la razón.",
  "a": "Aristóteles",
  "o": "Ética a Nicómaco",
  "e": "antigua"
 },
 {
  "c": "Todos los hombres desean por naturaleza saber.",
  "a": "Aristóteles",
  "o": "Universalidad del saber (Met. 980a1)",
  "e": "antigua"
 },
 {
  "c": "Apártate, que me tapas el sol.",
  "a": "Diógenes de Sínope",
  "o": "a Alejandro Magno",
  "e": "antigua"
 },
 {
  "c": "De las cosas que existen, unas dependen de nosotros y otras no dependen de nosotros.",
  "a": "Epicteto",
  "o": "En nuestro poder (Enquiridión 1)",
  "e": "antigua"
 },
 {
  "c": "La muerte no es nada para nosotros: mientras existimos, la muerte no está; y cuando la muerte está, nosotros ya no existimos.",
  "a": "Epicuro",
  "o": "Carta a Meneceo",
  "e": "antigua"
 },
 {
  "c": "La muerte nada es para nosotros: todo placer o dolor es sensación, y la muerte es privación de sensación.",
  "a": "Epicuro",
  "o": "Muerte y serenidad (Carta a Meneceo)",
  "e": "antigua"
 },
 {
  "c": "En los mismos ríos entramos y no entramos, somos y no somos.",
  "a": "Heráclito",
  "o": "Flujo y cambio (DK B12)",
  "e": "antigua"
 },
 {
  "c": "Conócete a ti mismo.",
  "a": "Inscripción del templo de Delfos",
  "o": "hecha suya por Sócrates",
  "e": "antigua"
 },
 {
  "c": "Si bueyes, caballos y leones tuvieran manos, o pudieran pintar con las manos y crear obras como los hombres, los caballos representarían a los dioses semejantes a caballos y los bueyes semejantes a bueyes, y harían sus cuerpos tal como los que ellos mismos poseen.",
  "a": "Jenófanes",
  "o": "Del mito al logos (DK B15)",
  "e": "antigua"
 },
 {
  "c": "Lo mismo es pensar y ser.",
  "a": "Parménides",
  "o": "Pensar y ser (DK B3)",
  "e": "antigua"
 },
 {
  "c": "Mientras tengamos el cuerpo no poseeremos suficientemente aquello que deseamos: la verdad.",
  "a": "Platón",
  "o": "Fedón",
  "e": "antigua"
 },
 {
  "c": "En el ámbito visible ten por gobernante al sol, y en el inteligible al vástago del Bien, aquello que rige la verdad y el entendimiento.",
  "a": "Platón",
  "o": "Idea del Bien (República 508e–509b)",
  "e": "antigua"
 },
 {
  "c": "El hombre es la medida de todas las cosas.",
  "a": "Protágoras",
  "o": "",
  "e": "antigua"
 },
 {
  "c": "El hombre es la medida de todas las cosas: de las que son, que son; de las que no son, que no son.",
  "a": "Protágoras",
  "o": "El hombre como medida (DK B1)",
  "e": "antigua"
 },
 {
  "c": "Solo sé que no sé nada.",
  "a": "Sócrates",
  "o": "",
  "e": "antigua"
 },
 {
  "c": "Nadie hace el mal voluntariamente.",
  "a": "Sócrates",
  "o": "",
  "e": "antigua"
 },
 {
  "c": "Una vida sin examen no merece ser vivida por el ser humano.",
  "a": "Sócrates",
  "o": "La vida examinada (Apología 38a)",
  "e": "antigua"
 },
 {
  "c": "La razón y la fe, ambas, conducen a la verdad; no puede haber oposición entre lo verdadero revelado y lo verdadero demostrado.",
  "a": "Averroes",
  "o": "La doble verdad (Tahafut al-Tahafut I)",
  "e": "medieval"
 },
 {
  "c": "Es inútil hacer con más lo que puede hacerse con menos.",
  "a": "Guillermo de Ockham",
  "o": "La navaja de Ockham (Summa Logicae I, 12)",
  "e": "medieval"
 },
 {
  "c": "Y vi como un espejo de la luz viviente, en el que una claridad resplandeciente fluía sobre toda criatura.",
  "a": "Hildegard von Bingen",
  "o": "La visión de la luz viviente (Scivias I)",
  "e": "medieval"
 },
 {
  "c": "La revelación debe entenderse según la capacidad humana, recurriendo a metáforas y símbolos para expresar lo inefable.",
  "a": "Maimónides",
  "o": "La dificultad de la interpretación (Guía de los perplejos I, 31)",
  "e": "medieval"
 },
 {
  "c": "¿Qué es, pues, el tiempo? Si nadie me lo pregunta, lo sé; si quiero explicarlo a quien me lo pide, no lo sé.",
  "a": "San Agustín",
  "o": "El tiempo en el alma (Confesiones XI, 26)",
  "e": "medieval"
 },
 {
  "c": "Es, por tanto, manifiesto que es necesario admitir una primera causa, a la que todos llaman Dios.",
  "a": "Tomás de Aquino",
  "o": "Las cinco vías (Suma Teológica I, q.2, a.3)",
  "e": "medieval"
 },
 {
  "c": "Al perseguir su propio interés, el individuo promueve con frecuencia el de la sociedad de manera más eficaz que cuando realmente intenta promoverlo.",
  "a": "Adam Smith",
  "o": "La mano invisible (La riqueza de las naciones IV, II)",
  "e": "moderna"
 },
 {
  "c": "El hombre no es más que una caña, la más débil de la naturaleza, pero es una caña que piensa.",
  "a": "Blaise Pascal",
  "o": "Pensamientos",
  "e": "moderna"
 },
 {
  "c": "La razón es, y solo debe ser, esclava de las pasiones.",
  "a": "David Hume",
  "o": "Tratado de la naturaleza humana",
  "e": "moderna"
 },
 {
  "c": "La belleza no es una cualidad de las cosas mismas: existe únicamente en la mente que las contempla.",
  "a": "David Hume",
  "o": "La norma del gusto",
  "e": "moderna"
 },
 {
  "c": "El fin de una enciclopedia es reunir los conocimientos dispersos sobre la superficie de la tierra.",
  "a": "Diderot",
  "o": "El proyecto enciclopédico (Encyclopédie, Prólogo)",
  "e": "moderna"
 },
 {
  "c": "El hombre más oprimido puede oprimir a un ser: su mujer. Ella es la proletaria del propio proletario.",
  "a": "Flora Tristán",
  "o": "Emancipación obrera y femenina (Unión obrera)",
  "e": "moderna"
 },
 {
  "c": "Saber es poder.",
  "a": "Francis Bacon",
  "o": "Ciencia y dominio de la naturaleza (Meditationes sacrae)",
  "e": "moderna"
 },
 {
  "c": "La filosofía está escrita en este grandísimo libro que continuamente tenemos abierto ante nuestros ojos (digo el universo), pero no puede entenderse si antes no se aprende la lengua y se conocen los caracteres en que está escrito. Está escrito en lengua matemática.",
  "a": "Galileo",
  "o": "El libro de la naturaleza (Il Saggiatore)",
  "e": "moderna"
 },
 {
  "c": "Lo verdadero es el todo.",
  "a": "Hegel",
  "o": "Espíritu absoluto (Fenomenología del espíritu, Prefacio)",
  "e": "moderna"
 },
 {
  "c": "La razón gobierna el mundo.",
  "a": "Hegel",
  "o": "La razón en la historia (Filosofía de la historia, Introducción)",
  "e": "moderna"
 },
 {
  "c": "La guerra de todos contra todos.",
  "a": "Hobbes",
  "o": "Estado de naturaleza (Leviatán XIII)",
  "e": "moderna"
 },
 {
  "c": "Todos los razonamientos acerca de cuestiones de hecho parecen fundarse en la relación de causa y efecto.",
  "a": "Hume",
  "o": "Crítica de la causalidad (Tratado de la naturaleza humana)",
  "e": "moderna"
 },
 {
  "c": "Todo el marco de la naturaleza habla de un autor inteligente; y ningún investigador racional puede, tras una reflexión seria, suspender ni por un instante su creencia respecto a los principios primarios del verdadero teísmo.",
  "a": "Hume",
  "o": "Crítica a la religión (Diálogos sobre la religión natural X)",
  "e": "moderna"
 },
 {
  "c": "¡Sapere aude! Ten el valor de servirte de tu propia razón.",
  "a": "Immanuel Kant",
  "o": "¿Qué es la Ilustración?",
  "e": "moderna"
 },
 {
  "c": "Obra de tal modo que trates a la humanidad, tanto en tu persona como en la de cualquier otro, siempre como un fin y nunca solamente como un medio.",
  "a": "Immanuel Kant",
  "o": "Fundamentación de la metafísica de las costumbres",
  "e": "moderna"
 },
 {
  "c": "Dos cosas llenan el ánimo de admiración y respeto: el cielo estrellado sobre mí y la ley moral en mí.",
  "a": "Immanuel Kant",
  "o": "Crítica de la razón práctica",
  "e": "moderna"
 },
 {
  "c": "Bello es aquello que place universalmente y sin concepto.",
  "a": "Immanuel Kant",
  "o": "Crítica del juicio",
  "e": "moderna"
 },
 {
  "c": "El fin de la ley no es abolir o restringir la libertad, sino preservarla y ampliarla.",
  "a": "John Locke",
  "o": "Segundo tratado sobre el gobierno civil",
  "e": "moderna"
 },
 {
  "c": "Obra solo según aquella máxima por la cual puedas querer al mismo tiempo que se convierta en ley universal.",
  "a": "Kant",
  "o": "Imperativo categórico (Fundamentación, BA 52)",
  "e": "moderna"
 },
 {
  "c": "El alma no es más que el resultado del funcionamiento de los órganos del cuerpo.",
  "a": "La Mettrie",
  "o": "El hombre máquina",
  "e": "moderna"
 },
 {
  "c": "El estado de naturaleza tiene una ley de naturaleza que lo gobierna y obliga a todos: la razón, que es esa ley, enseña a toda la humanidad, si se digna consultarla, que siendo todos iguales e independientes, ninguno debe dañar a otro en su vida, salud, libertad o posesiones.",
  "a": "Locke",
  "o": "Derechos naturales (Segundo tratado, cap. II)",
  "e": "moderna"
 },
 {
  "c": "Muchos se han imaginado repúblicas y principados que nunca han existido ni se han conocido realmente; porque hay tanta distancia entre cómo se vive y cómo se debería vivir, que quien deja lo que se hace por lo que se debería hacer, aprende más bien su ruina que su preservación.",
  "a": "Maquiavelo",
  "o": "Virtù y fortuna (El Príncipe XV)",
  "e": "moderna"
 },
 {
  "c": "El cristiano es señor de todas las cosas y no está sujeto a nadie. El cristiano es siervo de todas las cosas y está sujeto a todos.",
  "a": "Martín Lutero",
  "o": "La libertad del cristiano (De libertate christiana)",
  "e": "moderna"
 },
 {
  "c": "No deseo que las mujeres tengan poder sobre los hombres, sino sobre sí mismas.",
  "a": "Mary Wollstonecraft",
  "o": "Vindicación de los derechos de la mujer",
  "e": "moderna"
 },
 {
  "c": "Para que no se pueda abusar del poder, es preciso que, por la disposición de las cosas, el poder frene al poder.",
  "a": "Montesquieu",
  "o": "Separación de poderes (Espíritu de las leyes XI, 6)",
  "e": "moderna"
 },
 {
  "c": "Todos los movimientos de los cuerpos en espacios libres se realizan en líneas rectas, salvo en la medida en que son desviados por fuerzas aplicadas.",
  "a": "Newton",
  "o": "Ley de gravitación universal (Principia Mathematica)",
  "e": "moderna"
 },
 {
  "c": "La mujer nace libre y permanece igual al hombre en derechos.",
  "a": "Olympe de Gouges",
  "o": "Derechos de la mujer (Declaración, 1791)",
  "e": "moderna"
 },
 {
  "c": "No te he dado, oh Adán, un lugar fijo, ni un rostro propio, ni un don particular, para que aquel lugar, aquel rostro y aquellos dones que tú elijas, sean tuyos según tu voluntad y tu decisión.",
  "a": "Pico della Mirandola",
  "o": "La dignidad del hombre (Oratio)",
  "e": "moderna"
 },
 {
  "c": "La mente no tiene sexo.",
  "a": "Poulain de la Barre",
  "o": "La mente no tiene sexo (De l’égalité des deux sexes)",
  "e": "moderna"
 },
 {
  "c": "Pienso, luego existo.",
  "a": "René Descartes",
  "o": "Discurso del método",
  "e": "moderna"
 },
 {
  "c": "Para examinar la verdad es necesario, una vez en la vida, poner todas las cosas en duda tanto como sea posible.",
  "a": "René Descartes",
  "o": "Principios de la filosofía",
  "e": "moderna"
 },
 {
  "c": "Cada uno de nosotros pone en común su persona y todo su poder bajo la suprema dirección de la voluntad general.",
  "a": "Rousseau",
  "o": "La voluntad general (El contrato social I, 6)",
  "e": "moderna"
 },
 {
  "c": "Todo está bien al salir de las manos del Autor de las cosas; todo degenera en las manos del hombre.",
  "a": "Rousseau",
  "o": "Educación natural (Emilio I)",
  "e": "moderna"
 },
 {
  "c": "El ser humano es un lobo para el ser humano.",
  "a": "Thomas Hobbes",
  "o": "Leviatán",
  "e": "moderna"
 },
 {
  "c": "Depende de nosotros no hacer la tierra aún más desgraciada de lo que ya es.",
  "a": "Voltaire",
  "o": "La tolerancia (Tratado sobre la tolerancia I)",
  "e": "moderna"
 },
 {
  "c": "No deseo que ellas [las mujeres] tengan poder sobre los hombres, sino sobre sí mismas.",
  "a": "Wollstonecraft",
  "o": "Educación e igualdad (Vindicación de los derechos de la mujer IV)",
  "e": "moderna"
 },
 {
  "c": "La Ilustración es totalitaria.",
  "a": "Adorno & Horkheimer",
  "o": "Razón instrumental (Dialéctica de la Ilustración)",
  "e": "contemporanea"
 },
 {
  "c": "Lo eternamente incomprensible del mundo es su comprensibilidad.",
  "a": "Albert Einstein",
  "o": "Física y realidad",
  "e": "contemporanea"
 },
 {
  "c": "El feminismo es hijo no reconocido de la Ilustración.",
  "a": "Amorós",
  "o": "La igualdad ilustrada (Hacia una crítica de la razón patriarcal)",
  "e": "contemporanea"
 },
 {
  "c": "La triste verdad es que la mayor parte del mal la cometen personas que nunca deciden ser ni buenas ni malas.",
  "a": "Arendt",
  "o": "La banalidad del mal (Eichmann en Jerusalén)",
  "e": "contemporanea"
 },
 {
  "c": "La filosofía, aunque incapaz de decirnos con certeza cuál es la respuesta verdadera a las dudas que suscita, es capaz de sugerir muchas posibilidades que amplían nuestros pensamientos.",
  "a": "Bertrand Russell",
  "o": "El valor de la filosofía (Los problemas de la filosofía)",
  "e": "contemporanea"
 },
 {
  "c": "El género es la estilización repetida del cuerpo, un conjunto de actos reiterados dentro de un marco regulador muy rígido que, con el tiempo, se consolidan hasta producir la apariencia de una sustancia.",
  "a": "Butler",
  "o": "Género performativo (Gender Trouble)",
  "e": "contemporanea"
 },
 {
  "c": "El hombre lleva aún en su cuerpo el sello indeleble de su origen.",
  "a": "Charles Darwin",
  "o": "El origen del hombre",
  "e": "contemporanea"
 },
 {
  "c": "No hay nada fuera del texto.",
  "a": "Derrida",
  "o": "La différance (De la gramatología)",
  "e": "contemporanea"
 },
 {
  "c": "El criterio material universal de la ética es la producción, reproducción y desarrollo de la vida humana en comunidad.",
  "a": "Dussel",
  "o": "Ética de la liberación (1998)",
  "e": "contemporanea"
 },
 {
  "c": "El ser humano es un animal simbólico.",
  "a": "Ernst Cassirer",
  "o": "Antropología filosófica",
  "e": "contemporanea"
 },
 {
  "c": "El saber no está hecho para comprender, sino para cortar.",
  "a": "Foucault",
  "o": "Saber y poder (Vigilar y castigar)",
  "e": "contemporanea"
 },
 {
  "c": "Lo inconsciente es lo verdaderamente real en la vida psíquica.",
  "a": "Freud",
  "o": "El inconsciente (La interpretación de los sueños VII)",
  "e": "contemporanea"
 },
 {
  "c": "Dios ha muerto.",
  "a": "Friedrich Nietzsche",
  "o": "La gaya ciencia",
  "e": "contemporanea"
 },
 {
  "c": "Hay que tener caos dentro de sí para dar a luz una estrella danzarina.",
  "a": "Friedrich Nietzsche",
  "o": "Así habló Zaratustra",
  "e": "contemporanea"
 },
 {
  "c": "Tenemos el arte para no perecer a causa de la verdad.",
  "a": "Friedrich Nietzsche",
  "o": "Fragmentos póstumos",
  "e": "contemporanea"
 },
 {
  "c": "La técnica no es un simple medio. La técnica es un modo de desocultamiento.",
  "a": "Heidegger",
  "o": "El peligro de la técnica (La pregunta por la técnica)",
  "e": "contemporanea"
 },
 {
  "c": "La existencia precede a la esencia.",
  "a": "Jean-Paul Sartre",
  "o": "El existencialismo es un humanismo",
  "e": "contemporanea"
 },
 {
  "c": "El ser humano está condenado a ser libre.",
  "a": "Jean-Paul Sartre",
  "o": "El ser y la nada",
  "e": "contemporanea"
 },
 {
  "c": "La mayor felicidad para el mayor número.",
  "a": "John Stuart Mill",
  "o": "El utilitarismo",
  "e": "contemporanea"
 },
 {
  "c": "Es mejor ser un ser humano insatisfecho que un cerdo satisfecho.",
  "a": "John Stuart Mill",
  "o": "El utilitarismo",
  "e": "contemporanea"
 },
 {
  "c": "Obra de tal manera que los efectos de tus acciones sean compatibles con la permanencia de una vida humana auténtica sobre la Tierra.",
  "a": "Jonas",
  "o": "Principio de responsabilidad (1979)",
  "e": "contemporanea"
 },
 {
  "c": "Yo soy yo y mi circunstancia, y si no la salvo a ella no me salvo yo.",
  "a": "José Ortega y Gasset",
  "o": "Meditaciones del Quijote",
  "e": "contemporanea"
 },
 {
  "c": "En filosofía, ir de camino es lo esencial: sus preguntas importan más que sus respuestas.",
  "a": "Karl Jaspers",
  "o": "Introducción a la filosofía",
  "e": "contemporanea"
 },
 {
  "c": "Los filósofos no han hecho más que interpretar de diversos modos el mundo; de lo que se trata es de transformarlo.",
  "a": "Karl Marx",
  "o": "Tesis sobre Feuerbach",
  "e": "contemporanea"
 },
 {
  "c": "Una teoría que no es refutable por ningún suceso concebible no es científica.",
  "a": "Karl Popper",
  "o": "El criterio de demarcación (Conjeturas y refutaciones)",
  "e": "contemporanea"
 },
 {
  "c": "La fe es precisamente este paradoxo: que el individuo se sitúa en una relación absoluta con lo absoluto.",
  "a": "Kierkegaard",
  "o": "El salto de fe (Temor y temblor)",
  "e": "contemporanea"
 },
 {
  "c": "De lo que no se puede hablar, hay que callar.",
  "a": "Ludwig Wittgenstein",
  "o": "Tractatus logico-philosophicus",
  "e": "contemporanea"
 },
 {
  "c": "Los límites de mi lenguaje son los límites de mi mundo.",
  "a": "Ludwig Wittgenstein",
  "o": "Tractatus logico-philosophicus",
  "e": "contemporanea"
 },
 {
  "c": "La filosofía es una lucha contra el embrujo de nuestro entendimiento por medio del lenguaje.",
  "a": "Ludwig Wittgenstein",
  "o": "Investigaciones filosóficas §109",
  "e": "contemporanea"
 },
 {
  "c": "Simplifiquemos al extremo: lo “posmoderno” es la incredulidad hacia los metarrelatos.",
  "a": "Lyotard",
  "o": "Incredulidad hacia los metarrelatos (La condición posmoderna)",
  "e": "contemporanea"
 },
 {
  "c": "La riqueza de las sociedades en que domina el modo de producción capitalista se presenta como una “inmensa acumulación de mercancías”.",
  "a": "Marx",
  "o": "La mercancía y la plusvalía (El Capital I)",
  "e": "contemporanea"
 },
 {
  "c": "¡Dios ha muerto! ¡Dios permanece muerto! ¡Y nosotros lo hemos matado!",
  "a": "Nietzsche",
  "o": "La muerte de Dios (La gaya ciencia §125)",
  "e": "contemporanea"
 },
 {
  "c": "Todo arte es completamente inútil.",
  "a": "Oscar Wilde",
  "o": "El retrato de Dorian Gray (prefacio)",
  "e": "contemporanea"
 },
 {
  "c": "No se nace mujer: se llega a serlo.",
  "a": "Simone de Beauvoir",
  "o": "El segundo sexo",
  "e": "contemporanea"
 },
 {
  "c": "Querer ser libre es también querer libres a los demás.",
  "a": "Simone de Beauvoir",
  "o": "Para una moral de la ambigüedad",
  "e": "contemporanea"
 },
 {
  "c": "Cuando cambian los paradigmas, el mundo mismo cambia con ellos.",
  "a": "Thomas Kuhn",
  "o": "La estructura de las revoluciones científicas",
  "e": "contemporanea"
 },
 {
  "c": "El verdadero sujeto de la filosofía es el hombre concreto, de carne y hueso, con su angustia ante la muerte y su ansia de inmortalidad.",
  "a": "Unamuno",
  "o": "El ansia de inmortalidad (Del sentimiento trágico de la vida)",
  "e": "contemporanea"
 },
 {
  "c": "Líquido es lo que no conserva su forma por mucho tiempo.",
  "a": "Zygmunt Bauman",
  "o": "Modernidad líquida",
  "e": "contemporanea"
 }
];
