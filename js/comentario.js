"use strict";
/* ===== Comentario de texto guiado =====
   Método paso a paso para comentar un texto de Historia de la Filosofía,
   con rúbrica y ejemplos resueltos. Complementa la vista PAU (Ejercicio 1)
   y se enlaza desde cada Lectura ("Comentar este texto").

   Añadir un ejemplo resuelto: clave -> { subject, tema, title, html }.

   Fuente del método: departamento de Filosofía
   (carpetas_drive_PAU\PAU_2026\metodologia\met_PAU-comprensionTexto.pdf) y
   adaptación de guías abiertas de comentario de texto (El taller de Filosofía,
   La lechuza de Minerva, Suma-T) y ejemplos de selectividadfilosofia.com. */

const COMENTARIO = {

  "metodo":{ subject:"hf", tema:"Historia de la Filosofía · Método", title:"Cómo se comenta un texto (guía paso a paso)", html:`
<blockquote class="src">
<p>El comentario de texto de Historia de la Filosofía es el <strong>Ejercicio 1 de la PAU</strong> (4 puntos): un <strong>resumen</strong> (1.1, 1 punto) y una <strong>opción A o B</strong> comparación/explicación (1.2, 3 puntos, máx. 250 palabras). Esta guía es el método completo, paso a paso, con rúbrica y un ejercicio resuelto. No es un ejercicio de memoria: es <strong>comprender</strong> un texto y <strong>relacionarlo</strong> con la Historia de la Filosofía.</p> </blockquote>

<h2>Paso 1 · Primera lectura: «de qué va»</h2>
<p>Antes de subrayar nada, lee el texto dos veces con calma. En la primera, solo busca responder:<br><strong>¿de qué me está hablando este texto?</strong> ¿De la realidad, del conocimiento, de la política, de la moral, del ser humano, de Dios?</p>
<ul>
<li>Pregúntate: <strong>¿critica o defiende?</strong> ¿Afirma o duda?</li>
<li>Marca las <strong>palabras clave filosóficas</strong> (idea, esencia, razón, libertad, justicia…): suelen estar repetidas.</li>
<li>Localiza los <strong>conectores de oposición</strong> («pero», «sin embargo», «en cambio») y de <strong>consecuencia</strong> («por tanto», «luego»): marcan el argumento.</li>
</ul>

<h2>Paso 2 · Detectar el problema filosófico</h2>
<p>Todo texto de filosofía responde a una <strong>gran pregunta</strong>. Clasifícalo:</p>
<table>
<thead><tr><th>Si el texto pregunta…</th><th>Rama</th><th>Gran pregunta</th></tr></thead>
<tbody>
<tr><td>¿Qué es la verdad? ¿Cómo conocemos? ¿Sentidos o razón?</td><td>Epistemología</td><td rowspan="2">¿Qué puedo saber? <em>(Fª teórica)</em></td></tr>
<tr><td>¿Qué es la realidad? ¿Es material o inmaterial?</td><td>Metafísica</td></tr>
<tr><td>¿Qué es el bien? ¿Las normas son relativas? ¿Qué es la felicidad?</td><td>Ética / Moral</td><td rowspan="2">¿Qué debo hacer? <em>(Fª práctica)</em></td></tr>
<tr><td>¿Qué es la justicia? ¿Debo obedecer la ley? ¿Quién debe gobernar?</td><td>Política</td></tr>
<tr><td>¿Qué es el ser humano? ¿Somos libres? ¿Existe Dios?</td><td>Antropología</td><td>Síntesis</td></tr>
</tbody>
</table>

<h2>Paso 3 · Localizar la tesis</h2>
<p>La <strong>tesis</strong> es lo que el autor sostiene: la idea principal, resumible en una frase. Sueles encontrarla:</p>
<ul>
<li>al <strong>inicio</strong> del texto, o</li>
<li>al <strong>final</strong>, a menudo <strong>repetida con otras palabras</strong>.</li>
</ul>
<p>Escríbela en una línea con tus propias palabras. Si no puedes, vuelve al paso 1.</p>

<h2>Paso 4 · Ideas secundarias: cómo se defiende la tesis</h2>
<p>Identifica los <strong>2-3 argumentos</strong> con los que el autor sostiene su tesis. Pueden ser:</p>
<ul>
<li>una <strong>definición</strong> o distinción («hay que distinguir entre…»),</li>
<li>una <strong>consecuencia</strong> («de ahí se sigue que…»),</li>
<li>una <strong>crítica</strong> a una postura contraria («no es cierto que…»).</li>
</ul>
<p>El resumen ordenado sería: <strong>problema → tesis → argumentos</strong>.</p>

<h2>Paso 5 · Redactar el resumen (1.1)</h2>
<p><strong>Modelo de respuesta</strong>:<br><em>«El texto plantea el problema de… La tesis principal del autor es que… Para sostenerla, en primer lugar afirma que… Además, señala que… En conjunto, defiende una concepción según la cual…»</em></p>
<p><strong>Reglas de oro</strong>:</p>
<ul>
<li><strong>Nunca</strong> más largo que el texto (si lo es, 0 puntos).</li>
<li>Un párrafo claro (o dos cortos).</li>
<li>Pocas ideas bien explicadas.</li>
<li><strong>Evita</strong>: copiar frases literales, añadir la vida del autor, meter tu opinión, poner «títulos» o escribir por escribir.</li>
</ul>

<h2>Paso 6 · Opción A o B (1.2, 3 puntos)</h2>
<ul>
<li><strong>Opción A · Comparación crítica</strong>: compara un aspecto del texto con una cuestión de la Historia de la Filosofía. <em>«Este aspecto del texto puede relacionarse con… Ambas posturas coinciden en… pero se diferencian en…»</em></li>
<li><strong>Opción B · Explicación</strong>: explica por qué el/la autor/a afirma algo concreto del texto. <em>«El autor afirma esto porque, para él, … En su contexto histórico… Por eso sostiene que…»</em></li>
</ul>
<p>Pase lo que pase, <strong>cierra con una valoración personal breve</strong> y concreta, y usa vocabulario filosófico.</p>

<h2>Rúbrica del comentario (PAU 2026)</h2>
<p><strong>1.1 Resumen (1 punto)</strong>:</p>
<table>
<thead><tr><th>Puntos</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td>0</td><td>Más largo que el texto: no se acepta.</td></tr>
<tr><td>0–0,25</td><td>Ideas importantes ausentes o solo secundarias; estructura inadecuada; redacción muy deficiente.</td></tr>
<tr><td>0,25–0,5</td><td>Algunas ideas importantes, poco claras; estructura básica; gramática escasa.</td></tr>
<tr><td>0,5–0,75</td><td>Mayoría de las ideas claras; comprensión adecuada; frases sencillas.</td></tr>
<tr><td>0,75–1</td><td>Todas las ideas claras; comprensión exacta; excelente escritura.</td></tr>
</tbody>
</table>
<p><strong>1.2 (3 puntos)</strong> — comprensión del texto, calidad de la comparación (A) o de la explicación (B), vocabulario filosófico, estructura y gramática (escala continua 0–3).</p>

<h2>Plantilla imprimible</h2>
<p>Copia esta plantilla para practicar en papel antes de cada comentario:</p>
<pre>
<strong>Comentario de texto — plantilla</strong>

1. Primera lectura: el texto trata de ______________________
2. Problema filosófico (rama): ______________________
3. Tesis del autor: ______________________
4. Argumentos (2-3): a) _______  b) _______  c) _______
5. Resumen (1.1): 6-8 líneas, problema → tesis → argumentos.
6. 1.2 (A o B): compara/explica y valora brevemente.
</pre>

<blockquote class="src">
<p><strong>Fuente</strong>: departamento de Filosofía — <code>carpetas_drive_PAU\PAU_2026\metodologia\met_PAU-comprensionTexto.pdf</code>; adaptación de <em>El taller de Filosofía</em>, <em>La lechuza de Minerva</em> y <em>Suma-T</em> (método) y <em>selectividadfilosofia.com</em> (ejemplos resueltos).</p> </blockquote>
`},

  "platon":{ subject:"hf", tema:"Historia de la Filosofía · Tema 6", title:"Ejemplo resuelto: Platón, República VII", html:`
<blockquote class="src">
<p><strong>Texto</strong>: Platón, <em>La República</em>, libro VII (el mito de la caverna), fragmento orientativo de la PAU. Lee primero la lectura <strong>«Platón: República VII»</strong> en la pestaña Lecturas.</p> </blockquote>
<p><em>«[Los prisioneros] no habrían considerado reales otra cosa que las sombras de los objetos fabricados… Si se les obligara a volver los ojos hacia la luz, les dolería y, cegados por el resplandor, no podrían distinguir los objetos cuyas sombras veían antes.»</em></p>
<h2>1. Primera lectura</h2>
<p>Trata del <strong>conocimiento y la realidad</strong>: distingue entre las apariencias (las sombras) y la verdadera realidad (las cosas iluminadas por el sol).</p>
<h2>2. Problema</h2>
<p><strong>Metafísica y epistemología</strong>: gran pregunta «¿Qué puedo saber?». ¿Existe una realidad verdadera, o solo lo que vemos?</p>
<h2>3. Tesis</h2>
<p>Existe una realidad inteligible (el mundo de las Ideas) que el alma puede llegar a conocer, pero el camino desde las apariencias es doloroso y requiere esfuerzo (la dialéctica).</p>
<h2>4. Argumentos</h2>
<ul>
<li><strong>Analogía sombras/caverna</strong>: lo que percibimos por los sentidos es una copia degradada, no la realidad.</li>
<li><strong>La luz/al sol</strong>: el Bien es lo que hace inteligible el mundo, como el sol hace visible lo visible.</li>
<li><strong>El dolor de la ascensión</strong>: conocer la verdad cuesta y desorienta; por eso se rechaza al filósofo.</li>
</ul>
<h2>5. Resumen modelo (1.1)</h2>
<p>«El texto plantea el problema de la contraposición entre mundo sensible y mundo inteligible. La tesis de Platón es que la verdadera realidad no es la que percibimos con los sentidos (las sombras), sino la de las Ideas, que la razón conoce tras un proceso de ascendencia (la educación). Para sostenerla, compara la condición humana con la de prisioneros que solo ven sombras; señala que salir a la luz produce dolor, y concluye que quien conozca el Bien no querrá volver a la apariencia.»</p>
<h2>6. Modelo 1.2 (Opción A, comparación)</h2>
<p>«Este aspecto puede compararse con la distinción de <strong>Descartes</strong> entre el conocimiento sensible, engañoso, y el conocimiento claro y distinto de la razón (los sentidos pueden inducirnos a error; solo la razón alcanza la verdad). Coinciden en desconfiar de los sentidos y en buscar un fundamento racional; se diferencian en que Platón sitúa ese fundamento en un mundo de Ideas separado, mientras que Descartes lo sitúa en el yo pensante y, desde ahí, en Dios.» — Cierra con una valoración personal breve.</p>
<blockquote class="src"><p>Ejemplo de desarrollo didáctico, elaborado a partir de la guía de lectura del departamento y del modelo de respuesta (soluciones) de Platón.</p> </blockquote>
`},

  "descartes":{ subject:"hf", tema:"Historia de la Filosofía · Tema 14", title:"Ejemplo resuelto: Descartes, Discurso del método", html:`
<blockquote class="src">
<p><strong>Texto</strong>: Descartes, <em>Discurso del método</em> (partes II-IV), fragmento orientativo de la PAU. Léelo en la pestaña Lecturas.</p> </blockquote>
<p><em>«Y como la razón es la única cosa que nos hace hombres y nos distingue de los animales… he tomado la determinación de no admitir como verdadera cosa alguna que no supiese con evidencia que lo es… Pero advertí que, mientras quería pensar que todo era falso, era preciso que yo, que lo pensaba, fuese alguna cosa…»</em></p>
<h2>1. Primera lectura</h2>
<p>Trata del <strong>conocimiento</strong> y el <strong>método</strong>: la razón como base de la verdad y la duda como instrumento para encontrarla.</p>
<h2>2. Problema</h2>
<p><strong>Epistemología</strong>: «¿Qué puedo saber?» ¿Cómo alcanzar un conocimiento seguro frente al error?</p>
<h2>3. Tesis</h2>
<p>La razón es única e igual en todos; para usarla bien hace falta un <strong>método</strong> que parta de la duda hasta encontrar una certeza indudable: el <strong>cogito</strong> («pienso, luego soy»).</p>
<h2>4. Argumentos</h2>
<ul>
<li><strong>Unicidad de la razón</strong>: la razón nos distingue de los animales y es la llave de la verdad.</li>
<li><strong>Duda metódica</strong>: suspender el juicio sobre todo lo dudoso (sentidos, razonamientos) para hallar un fundamento.</li>
<li><strong>Cogito</strong>: dudar de todo pero no poder dudar de que dudo/pienso → yo existo.</li>
</ul>
<h2>5. Resumen modelo (1.1)</h2>
<p>«El texto plantea el problema del fundamento del conocimiento. La tesis de Descartes es que la razón, bien dirigida por un método, puede alcanzar certezas indudables. Para sostenerla, afirma primero que la razón nos distingue de los animales; propone después no admitir nada que no sea evidente; y concluye que, al dudar de todo, descubre que quien duda piensa y, por tanto, existe (el cogito).»</p>
<h2>6. Modelo 1.2 (Opción A, comparación)</h2>
<p>«Puede compararse con <strong>Hume</strong>: frente a la confianza racionalista de Descartes, Hume sostiene que todo conocimiento procede de la experiencia y que la razón no puede fundar conexiones necesarias (causalidad). Coinciden en partir de la duda sobre lo que damos por sabido, pero difieren: Descartes encuentra en la razón del sujeto una certeza absoluta, mientras que Hume limita el saber a las impresiones y muestra las limitaciones de la razón. Valoración personal: ambos muestran que el conocimiento empieza preguntándose por sí mismo.»</p>
<blockquote class="src"><p>Elaborado a partir de la guía PAU del departamento y de esquemas de selectividadfilosofia.com.</p> </blockquote>
`},

  "kant":{ subject:"hf", tema:"Historia de la Filosofía · Tema 19", title:"Ejemplo resuelto: Kant, ¿Qué es la Ilustración?", html:`
<blockquote class="src">
<p><strong>Texto</strong>: Kant, <em>Respuesta a la pregunta: ¿Qué es la Ilustración?</em>, fragmento orientativo de la PAU.</p> </blockquote>
<p><em>«La Ilustración es la salida del hombre de su autoculpable minoría de edad. (...) ¡Sapere aude! ¡Ten valor de servirte de tu propio entendimiento! (...) Es difícil que cada uno de por sí logre salir de esa minoría de edad… es más fácil que un público se ilustre a sí mismo, siempre que se le conceda libertad.»</em></p>
<h2>1. Primera lectura</h2>
<p>Trata de la <strong>filosofía práctica y política</strong>: la autonomía, el uso público de la razón y la libertad.</p>
<h2>2. Problema</h2>
<p><strong>Filosofía práctica</strong>: «¿Qué debo hacer?» ¿Qué es ser mayor de edad intelectual y qué se necesita para lograrlo?</p>
<h2>3. Tesis</h2>
<p>Ilustrarse es atreverse a usar la propia razón; es un proceso personal difícil pero facilitado por el <strong>uso público de la razón</strong>, que exige <strong>libertad</strong>.</p>
<h2>4. Argumentos</h2>
<ul>
<li><strong>«Sapere aude»</strong>: tener valor de pensar por uno mismo (lema de la Ilustración).</li>
<li><strong>Minoría de edad autoculpable</strong>: no es falta de inteligencia, sino de decisión y valor.</li>
<li><strong>Público y libertad</strong>: ilustrarse es más fácil colectivamente, con libertad de expresión y prensa.</li>
</ul>
<h2>5. Resumen modelo (1.1)</h2>
<p>«El texto plantea el problema de qué es la Ilustración. La tesis de Kant es que consiste en la salida de la minoría de edad, es decir, en atreverse a usar el propio entendimiento. Para sostenerla, define la minoría de edad como autoculpable, propone el lema “Sapere aude” y afirma que ese proceso exige la libertad para hacer un uso público de la razón.»</p>
<h2>6. Modelo 1.2 (Opción A, comparación)</h2>
<p>«Puede compararse con la crítica de <strong>Foucault</strong> a la Ilustración: ambos piensan que es una actitud de crítica de los propios límites. Coinciden en que el sujeto debe poner en cuestión lo dado; difieren en que Kant confía en que la razón, bien usada, alcanza la universalidad y el progreso, mientras Foucault desconfía de la razón como dispositivo de poder y piensa que la autonomía es siempre local y situada. Valoración personal.»</p>
<blockquote class="src"><p>Elaborado a partir de la guía PAU del departamento.</p> </blockquote>
`},

  "nietzsche":{ subject:"hf", tema:"Historia de la Filosofía · Tema 21", title:"Ejemplo resuelto: Nietzsche, Ecce Homo", html:`
<blockquote class="src">
<p><strong>Texto</strong>: Nietzsche, <em>Ecce Homo</em>, «¿Por qué soy un destino?», fragmento orientativo de la PAU.</p> </blockquote>
<p><em>«El hecho de que yo conozco el destino, la fatalidad de que la verdad tiene que decirse por vez primera… La disgregación de la moral es quizá el hecho decisivo… Yo no soy un hombre, soy dinamita.»</em></p>
<h2>1. Primera lectura</h2>
<p>Trata de la <strong>crítica a la moral</strong> y de los valores: la destrucción de los valores absolutos y el papel del filósofo.</p>
<h2>2. Problema</h2>
<p><strong>Ética y filosofía de la cultura</strong>: «¿Qué debo hacer?» ¿Qué ocurre cuando caen los valores que sostenían a Occidente?</p>
<h2>3. Tesis</h2>
<p>La moral tradicional (cristiana) se ha disgregado; el filósofo que anuncia esa crisis («Dios ha muerto») es un destino que invita a crear valores nuevos.</p>
<h2>4. Argumentos</h2>
<ul>
<li><strong>La moral se disgrega</strong>: sus fundamentos absolutos han caído.</li>
<li><strong>El filósofo como «dinamita»</strong>: su verdad rompe con el orden de valores establecido.</li>
<li><strong>El destino</strong>: anunciar la crisis es ineludible y transformador.</li>
</ul>
<h2>5. Resumen modelo (1.1)</h2>
<p>«El texto plantea el problema de la crisis de los valores en Occidente. La tesis de Nietzsche es que la moral tradicional se ha disgregado y que el filósofo que lo anuncia cumple un papel destructivo y necesario. Para sostenerla, señala que la verdad debe decirse aunque sea dolorosa, describe la caída de la moral como un hecho decisivo y se presenta a sí mismo, simbólicamente, como “dinamita” que rompe los viejos ídolos.»</p>
<h2>6. Modelo 1.2 (Opción A, comparación)</h2>
<p>«Puede compararse con <strong>Kant</strong>: frente a la moral universal del deber, Nietzsche niega que exista un fundamento moral absoluto y sostiene que los valores deben ser creados por el ser humano. Coinciden en que la moral es central en el ser humano; difieren radicalmente en que Kant la funda en la razón universal y en la buena voluntad, mientras Nietzsche la entiende como una construcción histórica, afectiva y de poder que hay que superar (transmutación de valores).»</p>
<blockquote class="src"><p>Elaborado a partir de la guía PAU del departamento.</p> </blockquote>
`},

  "beauvoir":{ subject:"hf", tema:"Historia de la Filosofía · Tema 26", title:"Ejemplo resuelto: Beauvoir, El segundo sexo", html:`
<blockquote class="src">
<p><strong>Texto</strong>: Beauvoir, <em>El segundo sexo</em> (Conclusión), fragmento orientativo de la PAU.</p> </blockquote>
<p><em>«No se ha nacido nunca mujer: se llega a serlo. No hay destino biológico, psíquico o económico que defina la figura que reviste en sociedad la hembra humana… la civilización elabora este producto intermedio que se llama mujer.»</em></p>
<h2>1. Primera lectura</h2>
<p>Trata de la <strong>construcción social de la identidad</strong> y de la situación de la mujer. Es un texto con tesis clara al inicio.</p>
<h2>2. Problema</h2>
<p><strong>Antropología y ética</strong>: «¿Qué es el ser humano?» ¿Cómo se forma la identidad de género?</p>
<h2>3. Tesis</h2>
<p>La feminidad no es un destino biológico, sino una construcción social/cultural: se llega a ser mujer en función de la sociedad.</p>
<h2>4. Argumentos</h2>
<ul>
<li><strong>Negación del determinismo biológico</strong>: no hay un destino biológico que la explique.</li>
<li><strong>Papel de la civilización</strong>: la sociedad «elabora» lo que llamamos mujer.</li>
<li><strong>La distinción sexo/género</strong>: el sexo (biológico) no determina el género (social).</li>
</ul>
<h2>5. Resumen modelo (1.1)</h2>
<p>«El texto plantea el problema del origen de la identidad femenina. La tesis de Beauvoir es que la condición de mujer no está fijada por la biología, sino construida por la civilización. Para sostenerla, niega que exista un destino biológico o psicológico definitorio y concluye que es la sociedad la que elabora ese “producto intermedio” que se llama mujer.»</p>
<h2>6. Modelo 1.2 (Opción A, comparación)</h2>
<p>«Puede compararse con <strong>Sartre</strong> (existencialismo): para ambos la existencia precede a la esencia, es decir, el ser humano se hace, no es algo dado. Coinciden en rechazar un “destino” prefijado; pero Beauvoir lo lleva a la cuestión del género y muestra que la mujer ha sido definida como “la Otra” por un sujeto masculino, de modo que su libertad debe ejercerse en una situación de opresión estructural. Valoración personal.»</p>
<blockquote class="src"><p>Elaborado a partir de la guía PAU del departamento.</p> </blockquote>
`},
};
