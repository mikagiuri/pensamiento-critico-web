// Datos del juego «El camino de la eudaimonía» (Aristóteles) — adaptado del material de
// gamificación del Gabriel Aresti BHI (BATX 2), traducido al castellano. Solo datos.
const JUEGO_ARIS = {
  meta: {
    title: "El camino de la eudaimonía",
    subtitle: "Juego de la ética de Aristóteles",
    rounds: 8,
    intro: "Encarna a un pensador de la Antigua Grecia y afronta dilemas morales. No se trata solo de «ganar», sino de examinar qué es la buena vida (eudaimonía) según Aristóteles. Tus decisiones mueven el Alma, el Cuerpo y los Bienes externos; la phronesis (prudencia) te ayuda en las decisiones arriesgadas."
  },
  // Personajes: alma, cuerpo, bienes (externos), phronesis + rasgos
  chars: [
    { id:"hipatia", name:"Hipatia", alma:9, cuerpo:4, bienes:5, phronesis:7, virtud:"Sabiduría", debilidad:"Desconfianza social", orient:"Contemplativa", frase:"El conocimiento es mi fuerza.", emoji:"🦉" },
    { id:"aspasia", name:"Aspasia", alma:8, cuerpo:4, bienes:7, phronesis:4, virtud:"Elocuencia", debilidad:"Dependencia", orient:"Discursiva", frase:"Las palabras también tienen poder.", emoji:"🗣️" },
    { id:"alcibiades", name:"Alcibíades", alma:6, cuerpo:8, bienes:9, phronesis:3, virtud:"Carisma y audacia", debilidad:"Hedonismo", orient:"Política", frase:"Mi brillo guiará a los demás.", emoji:"✨" },
    { id:"trasimaco", name:"Trasímaco", alma:6, cuerpo:5, bienes:7, phronesis:2, virtud:"Astucia", debilidad:"Cinismo moral", orient:"Política", frase:"La justicia está al servicio de los poderosos.", emoji:"⚖️" }
  ],
  // Dilemas por virtud. Cada opción: t (texto), eud/phr (efectos), risk (resuelto por el dado, ayuda la phronesis).
  dilemmas: [
    { virtue:"Valor (andreía)", sit:"En una guerra, los enemigos están a las puertas.", opts:[
      { t:"Retirarse", eud:-2 }, { t:"Ataque imprudente", eud:-1, risk:true }, { t:"Defensa racional", eud:3, risk:true } ] },
    { virtue:"Valor (andreía)", sit:"Están haciendo daño a un amigo.", opts:[
      { t:"No reaccionar", phr:-1 }, { t:"Actuar con agresividad", eud:-2 }, { t:"Reaccionar con valentía", eud:2 } ] },
    { virtue:"Valor (andreía)", sit:"Ante un gobierno corrupto: decir la verdad o callar.", opts:[
      { t:"Callar", phr:-2 }, { t:"Denuncia inoportuna", risk:true, eud:-1 }, { t:"Decir la verdad con valentía", eud:3 } ] },
    { virtue:"Templanza (sophrosýne)", sit:"En una fiesta hay comida y bebida en abundancia.", opts:[
      { t:"Excederse", eud:-2 }, { t:"Negarse por completo", eud:-1 }, { t:"Actuar con templanza", eud:2 } ] },
    { virtue:"Templanza (sophrosýne)", sit:"Alguien te ha insultado.", opts:[
      { t:"Silencio pasivo", phr:-1 }, { t:"Estallido emocional", eud:-2 }, { t:"Respuesta mesurada", eud:2 } ] },
    { virtue:"Templanza (sophrosýne)", sit:"Tienes la oportunidad de alcanzar el poder.", opts:[
      { t:"Deseo ciego, desmesurado", eud:-1, risk:true }, { t:"Renunciar sin más", phr:-1 }, { t:"Elección mesurada", phr:2 } ] },
    { virtue:"Generosidad (eleuthería)", sit:"Puedes ayudar o no a un ciudadano necesitado.", opts:[
      { t:"No ayudar", eud:-2 }, { t:"Dar demasiado", eud:0 }, { t:"Dar con mesura", eud:2 } ] },
    { virtue:"Generosidad (eleuthería)", sit:"Ganas la lotería.", opts:[
      { t:"Guardarlo todo", eud:-2 }, { t:"Derrocharlo todo", eud:-1 }, { t:"Compartir", eud:3 } ] },
    { virtue:"Generosidad (eleuthería)", sit:"Participar en un proyecto común.", opts:[
      { t:"No participar", phr:-1 }, { t:"Participar de forma caótica", risk:true }, { t:"Participar con responsabilidad", eud:2 } ] },
    { virtue:"Justicia (dikaiosýne)", sit:"Un amigo ha quebrantado la ley.", opts:[
      { t:"Callar", phr:-2 }, { t:"Denuncia cruel", eud:-1 }, { t:"Justicia proporcionada", eud:3 } ] },
    { virtue:"Justicia (dikaiosýne)", sit:"Perjudicar a otro grupo en tu propio beneficio.", opts:[
      { t:"Aceptar", eud:-2 }, { t:"Oponerte", eud:2 }, { t:"Buscar un pacto justo", phr:1, eud:1 } ] },
    { virtue:"Justicia (dikaiosýne)", sit:"Como juez, debes tomar una resolución difícil.", opts:[
      { t:"Seguir tu interés personal", eud:-2 }, { t:"Inhibirte", phr:-1 }, { t:"Sentencia mesurada", eud:3 } ] },
    { virtue:"Mansedumbre (praótes)", sit:"Alguien te insulta públicamente.", opts:[
      { t:"No reaccionar", eud:-1 }, { t:"Ira violenta", eud:-2 }, { t:"Respuesta mesurada", phr:2 } ] },
    { virtue:"Mansedumbre (praótes)", sit:"Disputa con un compañero de grupo.", opts:[
      { t:"Silencio", phr:-1 }, { t:"Arrebato", eud:-2 }, { t:"Diálogo pausado", eud:2 } ] },
    { virtue:"Mansedumbre (praótes)", sit:"Conflicto moral con un líder.", opts:[
      { t:"Someterte", eud:-2 }, { t:"Ataque directo", risk:true, eud:-1 }, { t:"Respuesta prudente", eud:2 } ] },
    { virtue:"Veracidad (alétheia)", sit:"Mentir o no sobre una acción tuya.", opts:[
      { t:"Mentir", phr:-2 }, { t:"Verdad demasiado dura", eud:-1 }, { t:"Verdad prudente", eud:2 } ] },
    { virtue:"Veracidad (alétheia)", sit:"Quieres dar buena imagen a los demás.", opts:[
      { t:"Autoimagen falsa", eud:-2 }, { t:"Verdad cruda", phr:-1 }, { t:"Sinceridad mesurada", eud:3 } ] },
    { virtue:"Veracidad (alétheia)", sit:"Contar o no un hecho doloroso.", opts:[
      { t:"Callarlo", eud:-1 }, { t:"Decirlo cruelmente", eud:-1 }, { t:"Contarlo con mesura", eud:2 } ] }
  ],
  // Cartas de azar (se roba una tras cada decisión). eud/phr: efecto neto.
  chance: [
    { t:"Apoyo del pueblo", d:"El pueblo está de tu lado.", eud:3 },
    { t:"Discurso asombroso", d:"Tus palabras cautivan a la gente.", eud:2 },
    { t:"Ayudante inesperado", d:"Alguien te echa una mano en el momento justo.", eud:2 },
    { t:"Momento de sabiduría", d:"Una idea clara te ordena el juicio.", phr:1, eud:1 },
    { t:"Reforma exitosa", d:"Una medida tuya sale bien.", eud:2 },
    { t:"Inspiración", d:"Encuentras claridad para decidir.", phr:1 },
    { t:"Alianza peligrosa", d:"Ganas poder, pero tus principios se resienten.", eud:1, phr:-1 },
    { t:"Resistencia de las élites", d:"Los poderosos bloquean tu iniciativa.", eud:-2 },
    { t:"Reacción de los fanáticos", d:"Recibes una respuesta violenta.", eud:-2 },
    { t:"Duda colectiva", d:"La indecisión se contagia en la deliberación.", phr:-1 },
    { t:"Enfermedad", d:"Tu cuerpo flaquea.", eud:-2 },
    { t:"Noticias falsas", d:"Se difunden bulos contra ti.", eud:-2 },
    { t:"Desconfianza ciudadana", d:"La gente recela de tus intenciones.", eud:-2 },
    { t:"Traición", d:"Alguien de confianza te falla.", eud:-3 }
  ],
  bands: [
    { min:25, emoji:"🌿", label:"Vida feliz y excelente" },
    { min:15, emoji:"⚖️", label:"Vida equilibrada" },
    { min:5,  emoji:"⚠️", label:"Vida conflictiva" },
    { min:-999, emoji:"💀", label:"Fracaso existencial" }
  ],
  reflect: [
    "¿Quién ha alcanzado la mayor eudaimonía?",
    "¿Qué ha pesado más: los bienes externos, las virtudes o el azar?",
    "Según Aristóteles, ¿por qué es tan importante la phronesis (prudencia)?",
    "¿Qué distingue la vida política, la discursiva y la contemplativa?"
  ]
};
