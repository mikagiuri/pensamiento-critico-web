"use strict";
/* ===== Citas — frases célebres de la filosofía =====
   {c:cita, a:autor, o:obra (opcional), e:época antigua|moderna|contemporanea}.
   Recopiladas de la teoría del aula. Dominio público (textos clásicos). */
const CITAS = [
  { c: "Los seres humanos comienzan y han comenzado siempre a filosofar movidos por el asombro.", a: "Aristóteles", o: "Metafísica", e: "antigua" },
  { c: "Solo sé que no sé nada.", a: "Sócrates", o: "", e: "antigua" },
  { c: "Conócete a ti mismo.", a: "Inscripción del templo de Delfos", o: "hecha suya por Sócrates", e: "antigua" },
  { c: "El hombre es la medida de todas las cosas.", a: "Protágoras", o: "", e: "antigua" },
  { c: "Nadie hace el mal voluntariamente.", a: "Sócrates", o: "", e: "antigua" },
  { c: "Mientras tengamos el cuerpo no poseeremos suficientemente aquello que deseamos: la verdad.", a: "Platón", o: "Fedón", e: "antigua" },
  { c: "El ser humano es por naturaleza un animal político.", a: "Aristóteles", o: "Política", e: "antigua" },
  { c: "La virtud es un término medio relativo a nosotros, determinado por la razón.", a: "Aristóteles", o: "Ética a Nicómaco", e: "antigua" },
  { c: "Apártate, que me tapas el sol.", a: "Diógenes de Sínope", o: "a Alejandro Magno", e: "antigua" },
  { c: "La muerte no es nada para nosotros: mientras existimos, la muerte no está; y cuando la muerte está, nosotros ya no existimos.", a: "Epicuro", o: "Carta a Meneceo", e: "antigua" },
  { c: "Pienso, luego existo.", a: "René Descartes", o: "Discurso del método", e: "moderna" },
  { c: "El ser humano es un lobo para el ser humano.", a: "Thomas Hobbes", o: "Leviatán", e: "moderna" },
  { c: "El fin de la ley no es abolir o restringir la libertad, sino preservarla y ampliarla.", a: "John Locke", o: "Segundo tratado sobre el gobierno civil", e: "moderna" },
  { c: "La razón es, y solo debe ser, esclava de las pasiones.", a: "David Hume", o: "Tratado de la naturaleza humana", e: "moderna" },
  { c: "El alma no es más que el resultado del funcionamiento de los órganos del cuerpo.", a: "La Mettrie", o: "El hombre máquina", e: "moderna" },
  { c: "¡Sapere aude! Ten el valor de servirte de tu propia razón.", a: "Immanuel Kant", o: "¿Qué es la Ilustración?", e: "moderna" },
  { c: "Obra de tal modo que trates a la humanidad, tanto en tu persona como en la de cualquier otro, siempre como un fin y nunca solamente como un medio.", a: "Immanuel Kant", o: "Fundamentación de la metafísica de las costumbres", e: "moderna" },
  { c: "Dos cosas llenan el ánimo de admiración y respeto: el cielo estrellado sobre mí y la ley moral en mí.", a: "Immanuel Kant", o: "Crítica de la razón práctica", e: "moderna" },
  { c: "La mayor felicidad para el mayor número.", a: "John Stuart Mill", o: "El utilitarismo", e: "contemporanea" },
  { c: "Es mejor ser un ser humano insatisfecho que un cerdo satisfecho.", a: "John Stuart Mill", o: "El utilitarismo", e: "contemporanea" },
  { c: "Los filósofos no han hecho más que interpretar de diversos modos el mundo; de lo que se trata es de transformarlo.", a: "Karl Marx", o: "Tesis sobre Feuerbach", e: "contemporanea" },
  { c: "Dios ha muerto.", a: "Friedrich Nietzsche", o: "La gaya ciencia", e: "contemporanea" },
  { c: "Hay que tener caos dentro de sí para dar a luz una estrella danzarina.", a: "Friedrich Nietzsche", o: "Así habló Zaratustra", e: "contemporanea" },
  { c: "De lo que no se puede hablar, hay que callar.", a: "Ludwig Wittgenstein", o: "Tractatus logico-philosophicus", e: "contemporanea" },
  { c: "Yo soy yo y mi circunstancia, y si no la salvo a ella no me salvo yo.", a: "José Ortega y Gasset", o: "Meditaciones del Quijote", e: "contemporanea" },
  { c: "La existencia precede a la esencia.", a: "Jean-Paul Sartre", o: "El existencialismo es un humanismo", e: "contemporanea" },
  { c: "El ser humano está condenado a ser libre.", a: "Jean-Paul Sartre", o: "El ser y la nada", e: "contemporanea" },
  { c: "No se nace mujer: se llega a serlo.", a: "Simone de Beauvoir", o: "El segundo sexo", e: "contemporanea" },
  { c: "Querer ser libre es también querer libres a los demás.", a: "Simone de Beauvoir", o: "Para una moral de la ambigüedad", e: "contemporanea" },
  { c: "Líquido es lo que no conserva su forma por mucho tiempo.", a: "Zygmunt Bauman", o: "Modernidad líquida", e: "contemporanea" }
];
