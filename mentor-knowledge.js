// ============================================
// MENTOR ANATÓMICO v6.0 - CONVERSACIÓN NATURAL COMPLETA
// 70+ respuestas detalladas sin botones
// Todas las preguntas del PDF cubiertas
// ============================================

(function() {
    'use strict';

    // ============================================
    // KNOWLEDGE BASE COMPLETA
    // ============================================
    
    const knowledgeBase = {
        // ===== CONVERSACIÓN BÁSICA (15 temas) =====
        basic: {
            saludos: {
                keywords: ['hola', 'hi', 'hey', 'ola', 'holi', 'buenos dias', 'buenos días', 'buenas tardes', 'buenas noches', 'wenas', 'buenas'],
                text: "¡Hola! 👋 Soy tu Mentor Anatómico y estoy aquí para ayudarte en tu proceso de aprendizaje.\n\nPuedo apoyarte con:\n💙 **Apoyo emocional** cuando sientas frustración, ansiedad o bloqueo\n🎨 **Dudas técnicas** sobre línea de acción, proporciones, anatomía, sombreado\n📚 **Uso del sistema** para subir ejercicios, ver progreso, materiales\n\n¿En qué te puedo ayudar hoy?"
            },
            comoEstas: {
                keywords: ['como estas', 'cómo estas', 'como estás', 'cómo estás', 'que tal', 'qué tal', 'como te va', 'cómo te va'],
                text: "¡Gracias por preguntar! 💙 Estoy aquí, disponible para ti siempre que me necesites.\n\n¿Y tú cómo estás? ¿Cómo va tu proceso de aprendizaje? Cuéntame, estoy aquí para escucharte."
            },
            gracias: {
                keywords: ['gracias', 'muchas gracias', 'thank you', 'thanks', 'grax'],
                text: "¡De nada! 💙 Para eso estoy aquí. Puedes volver cuando quieras si tienes más dudas o necesitas hablar."
            },
            adios: {
                keywords: ['adios', 'adiós', 'chao', 'bye', 'hasta luego', 'nos vemos'],
                text: "¡Hasta pronto! 👋 Recuerda practicar un poco cada día. El progreso es acumulativo. ¡Sigue dibujando! Estaré aquí cuando vuelvas."
            },
            ayuda: {
                keywords: ['ayuda', 'help', 'que puedes hacer', 'qué puedes hacer', 'menu', 'menú'],
                text: "Puedo ayudarte con:\n\n💙 **EMOCIONAL (25 temas):**\nFrustración, ansiedad, bloqueo, comparación, síndrome impostor, perfeccionismo, procrastinación, vergüenza, burnout, culpa, miedo, inseguridad, overwhelm, parálisis por análisis, redes sociales, presión por rapidez, duelo artístico, desmotivación, cansancio, llanto.\n\n🎨 **TÉCNICO (35 temas):**\nMódulo 1: Línea de acción, proporciones, contrapposto, croquis, formas básicas, perspectiva, ejes anatómicos.\nMódulo 2: 3 masas, anatomía, manos, pies, torso, pelvis, hombros, brazos, piernas, cuello, músculos, esqueleto.\nMódulo 3: Valores tonales, iluminación, sombreado, composición, profundidad, texturas, pliegues, punto focal.\n\n📚 **SISTEMA (5 temas):**\nSubir ejercicios, ver progreso, materiales, feedback, tiempo práctica.\n\nEscribe tu duda en lenguaje natural."
            },
            clarificacion: {
                keywords: ['no entiendo', 'explica mejor', 'mas claro', 'más claro', 'confuso', 'repite'],
                text: "Claro, voy a explicarlo de otra forma 💡\n\n¿Qué parte específicamente no quedó clara? ¿Es sobre técnica o emociones?\n\nPuedo usar ejemplos, analogías o un paso a paso más detallado."
            },
            afirmacion: {
                keywords: ['ok', 'okay', 'vale', 'entendido', 'claro', 'si', 'sí', 'bien', 'perfecto'],
                text: "Perfecto 👍 ¿Hay algo más en lo que pueda ayudarte?"
            }
        },
        
        // ===== EMOCIONAL (25+ temas) =====
        emotional: {
            frustracion: {
                keywords: ['frustrado', 'frustrada', 'frustrante', 'frustracion', 'frustración', 'no puedo', 'no me sale', 'horrible', 'terrible', 'todo me sale mal', 'no me gusta como dibujo'],
                text: "Respira 💙 La frustración es señal de que estás aprendiendo algo nuevo.\n\n**¿Qué está pasando?** Tu ojo ya aprendió a ver mejor, pero tu mano todavía no ha alcanzado esa habilidad. Esa brecha entre lo que ves y lo que logras dibujar genera frustración.\n\n**La buena noticia:** Esa brecha se cierra con práctica constante. Cada línea que dibujas te acerca más.\n\n**Técnica rápida:** Respira 4 segundos (inhala) - 4 segundos (sostén) - 6 segundos (exhala). Hazlo 3 veces.\n\n¿Quieres que hablemos sobre qué específicamente te frustra?"
            },
            ansiedadGeneral: {
                keywords: ['tengo mucha ansiedad', 'tengo ansiedad', 'ansioso', 'ansiosa', 'nervioso', 'nerviosa', 'estresado', 'estresada', 'me siento estresada al dibujar', 'tengo angustia'],
                text: "La ansiedad al dibujar es muy común 💙 El 60% de los estudiantes de arte la experimentan.\n\n**¿Por qué pasa?** Cuando aprendemos algo nuevo, nuestro cerebro percibe \"amenaza\" porque no tenemos control total.\n\n**Técnica de 5-4-3-2-1 (ahora mismo):**\n- Nombra 5 cosas que VES\n- 4 que TOCAS\n- 3 que ESCUCHAS\n- 2 que HUELES\n- 1 que SABOREAS\n\nEsto te trae al presente.\n\n**Para dibujar con menos ansiedad:**\n- Sesiones cortas (15-20 min)\n- Sin expectativas de perfección\n- Recordar: es PRÁCTICA, no examen\n\n¿Te ayuda esto o quieres que hablemos más?"
            },
            ansiedadEvaluacion: {
                keywords: ['me da miedo la evaluacion', 'me da miedo la evaluación', 'me asusta el feedback', 'ansiedad por la revision', 'ansiedad por la revisión', 'van a calificar', 'estoy nerviosa', 'nervioso por evaluacion'],
                text: "La ansiedad por evaluación es súper común 💙\n\n**El feedback NO es:**\n- Un juicio de tu valor como persona\n- Una medida de tu \"talento\"\n- Definitivo o permanente\n\n**El feedback ES:**\n- Una herramienta para crecer\n- Observaciones sobre tu trabajo actual\n- Una guía para mejorar\n\n**Reframe potente:** Cada evaluación es una conversación, no un veredicto.\n\n**Profesionales exitosos** reciben críticas constantemente. La diferencia es que aprendieron a verlas como información útil.\n\nRespira antes de leer feedback. Lee con mente abierta. Pregunta si no entiendes."
            },
            ansiedadSocial: {
                keywords: ['me da miedo mostrar mis dibujos', 'vergüenza de publicar', 'verguenza de publicar', 'no quiero compartir mi arte', 'me da cosa que vean', 'instagram', 'publicar'],
                text: "El miedo a mostrar tu arte es real 💙 Estás mostrando una parte de ti.\n\n**Verdad importante:** Compartir arte da miedo porque es personal.\n\n**Pero considera:**\n- 90% de personas solo verán algo bonito\n- 9% que son artistas entienden el proceso\n- 1% que critica destructivamente dice más sobre ellos\n\n**Estrategia gradual:**\n1. Comparte con 1-2 personas de confianza\n2. Luego grupo pequeño privado\n3. Cuando estés listo/a, público general\n\n**Recuerda:** No necesitas compartir si no quieres. Tu arte puede ser solo para ti."
            },
            sindromeImpostor: {
                keywords: ['siento que soy un fraude', 'no merezco estar', 'fue pura suerte', 'no soy realmente artista', 'sindrome del impostor', 'síndrome del impostor', 'impostor', 'fraude'],
                text: "El síndrome del impostor afecta al 70% de las personas 💙\n\n**Paradoja importante:** Quien lo siente es justamente quien SÍ merece estar ahí. Los verdaderos impostores no dudan.\n\n**Ejercicio de realidad:**\n- ¿Hiciste el trabajo para estar aquí? SÍ\n- ¿Inviertes tiempo practicando? SÍ\n- ¿Te importa mejorar? SÍ\n- ¿Estás aprendiendo? SÍ\n\n**Entonces eres artista.** Punto.\n\nNo necesitas ser \"el mejor\", tener talento innato, o reconocimiento externo. Solo necesitas seguir dibujando."
            },
            comparacion: {
                keywords: ['todos dibujan mejor que yo', 'por que yo no tengo talento', 'por qué yo no tengo talento', 'otros avanzan mas rapido', 'otros avanzan más rápido', 'siempre hay alguien mejor', 'comparacion', 'comparación'],
                text: "La comparación es uno de los mayores ladrones de alegría 💙\n\n**Verdad dura:** SIEMPRE habrá alguien \"mejor\". Siempre. Incluso los artistas top se comparan.\n\n**¿Por qué otros \"avanzan más rápido\"?**\n- No ves sus horas de práctica privada\n- No ves sus 20 intentos antes del \"bueno\"\n- Tal vez empezaron antes\n- Tal vez practican más horas\n\n**Tu única comparación válida:** Tú hoy vs tú hace 1 mes. ¿Hay progreso? Entonces vas bien.\n\n**Analogía:** Compararte con otros es como comparar capítulo 3 de tu libro con capítulo 50 del suyo.\n\nGuarda tus dibujos. En 3 meses compáralos. Ahí verás TU progreso real."
            },
            bloqueoCreativo: {
                keywords: ['estoy bloqueado', 'estoy bloqueada', 'bloqueo creativo', 'no se que dibujar', 'no sé qué dibujar', 'pagina en blanco', 'página en blanco', 'estancado', 'estancada'],
                text: "El bloqueo creativo es como músculo agarrotado 💙 Necesita movimiento, no fuerza.\n\n**¿Qué causa bloqueo?**\n- Perfeccionismo\n- Sobreplanificación\n- Miedo al error\n- Agotamiento mental\n\n**Rompe el bloqueo (ahora mismo):**\n1. **Regla de 1 minuto:** Dibuja CUALQUIER cosa por 1 minuto\n2. **Copia sin pensar:** Abre referencia y copia\n3. **Dibuja lo peor:** Proponte dibujar el PEOR dibujo posible\n\n**Prompts anti-bloqueo:**\n- Dibuja tu mano izquierda\n- Dibuja lo que ves por la ventana\n- Garabatea 3 minutos\n\nRecuerda: No tienes que \"crear\" siempre. Practicar técnica también vale."
            },
            perfeccionismo: {
                keywords: ['siempre borro todo', 'nunca termino nada', 'tiene que quedar perfecto', 'soy muy perfeccionista', 'perfeccionista', 'perfeccionismo'],
                text: "El perfeccionismo es miedo disfrazado de estándar alto 💙\n\n**Verdad incómoda:** El perfeccionismo NO te hace mejor artista. Te paraliza.\n\n**¿Qué está pasando?** Cada vez que borras, le dices a tu cerebro: \"Esto no es suficiente\". Tu cerebro aprende a temer el error.\n\n**Regla profesional:** Los artistas profesionales terminan trabajos \"imperfectos\" todo el tiempo.\n\n**Ejercicio anti-perfeccionismo:**\n- Dibuja con marcador (no se puede borrar)\n- Límite de tiempo: 15 minutos y terminas\n- Proponte hacer 10 dibujos \"malos\" esta semana\n\n**Mantra:** \"Hecho es mejor que perfecto. Terminado es mejor que perfecto.\""
            },
            procrastinacion: {
                keywords: ['siempre dejo todo para despues', 'siempre dejo todo para después', 'no puedo empezar a dibujar', 'procrastino mucho', 'mañana empiezo', 'procrastinacion', 'procrastinación'],
                text: "La procrastinación en arte casi siempre es miedo, no pereza 💙\n\n**¿Miedo a qué?**\n- A que no salga bien\n- A perder tiempo\n- A decepcionar\n- A confirmar que \"no sirvo\"\n\n**Truco mental:** No te propongas \"dibujar\". Proponte \"practicar 5 minutos\".\n\n5 minutos no da miedo. Y generalmente, una vez empiezas, sigues.\n\n**Técnica Pomodoro:**\n- 15 min de dibujo\n- 5 min de descanso\n- Repite\n\n**Elimina barreras:**\n- Deja materiales listos\n- Ten referencias guardadas\n\nEl mejor momento para dibujar fue hace 1 hora. El segundo mejor es ahora mismo."
            },
            autodepreciacion: {
                keywords: ['soy muy malo dibujando', 'no sirvo para esto', 'soy un desastre', 'no tengo talento', 'malo', 'mala', 'pesimo', 'pésimo'],
                text: "Las palabras que usas contigo importan 💙\n\n**Reframe necesario:**\n- NO eres \"malo/a dibujando\". Eres NUEVO/A\n- NO \"no sirves\". Estás APRENDIENDO\n- NO \"no tienes talento\". Talento es 10%, práctica es 90%\n\n**Pregunta honesta:** ¿Le hablarías así a un amigo que está aprendiendo? Probablemente no.\n\n**Verdad:** NADIE nace sabiendo dibujar. Incluso \"prodigios\" practicaron miles de horas.\n\n**Ejercicio:** Cada vez que pienses \"soy malo\", cámbialo por \"todavía estoy aprendiendo\".\n\nLenguaje amable contigo = progreso más rápido.\n\nEstás aquí, practicando. Eso ya te hace valioso/a."
            },
            culpa: {
                keywords: ['me siento culpable', 'deberia haber dibujado', 'debería haber dibujado', 'perdi mucho tiempo', 'perdí mucho tiempo', 'he fallado', 'culpa', 'culpable'],
                text: "La culpa es difícil 💙 pero déjame darte perspectiva:\n\n**La realidad:**\n- Hiciste lo que pudiste con la energía y tiempo que tenías\n- La vida pasa. Trabajo, familia, salud demandan atención\n- El curso no se va. Puedes retomarlo cuando quieras\n\n**Pregunta útil:** ¿La culpa te ayuda a dibujar más? No. Solo roba energía.\n\n**Acción productiva:**\n- Suelta la culpa\n- Dibuja 10 minutos HOY\n- Avanza desde donde estás, no desde donde \"deberías\"\n\n**Verdad:** No hay ritmo \"correcto\". Tu ritmo es el correcto para ti."
            },
            miedo: {
                keywords: ['tengo miedo de equivocarme', 'me da panico empezar', 'me da pánico empezar', 'miedo al error', 'me aterroriza fallar', 'miedo', 'panico', 'pánico'],
                text: "El miedo al error es el asesino del aprendizaje 💙\n\n**Verdad fundamental:** No existe aprender sin error. Es imposible.\n\n**Cada error es:**\n- Información sobre qué NO hacer\n- Un paso hacia la solución\n- Prueba de que estás intentando\n\n**Los mejores artistas del mundo** han hecho MÁS errores que tú. Miles más. No pararon.\n\n**Ejercicio liberador:** Haz 5 dibujos esta semana PROPONIÉNDOTE equivocarte.\n\n**Mantra:** \"No son errores, son experimentos.\"\n\n**Pregunta de oro:** ¿Qué es lo peor que puede pasar si te equivocas? ¿Tirar una hoja? Hay más hojas."
            },
            verguenza: {
                keywords: ['me da vergüenza mi trabajo', 'me da verguenza mi trabajo', 'es muy penoso', 'me da pena mostrar', 'que humillante', 'qué humillante', 'vergüenza', 'verguenza'],
                text: "La vergüenza sobre tu trabajo es común en artistas 💙\n\n**Tu trabajo es:**\n- Un snapshot de tu habilidad actual\n- Resultado de práctica acumulada hasta hoy\n- Un paso en tu proceso\n\n**Tu trabajo NO es:**\n- Tu identidad\n- Tu valor\n- Permanente\n\n**Todos los artistas que admiras** hicieron trabajo \"vergonzoso\" al inicio. Siguieron.\n\n**Reframe:** Si tu trabajo te da vergüenza, significa que tu ojo ya mejoró. Eso es progreso.\n\nEn vez de vergüenza, siente curiosidad: \"¿Qué puedo mejorar?\""
            },
            inseguridad: {
                keywords: ['no estoy segura de nada', 'no estoy seguro de nada', 'tengo muchas dudas', 'no confio en mi', 'no confío en mí', 'incertidumbre', 'inseguridad', 'inseguro', 'insegura'],
                text: "La inseguridad es parte de aprender 💙\n\n**¿Por qué aparece?** Cuando aprendes algo nuevo, tu cerebro no tiene referencias claras.\n\n**La inseguridad significa:**\n- Estás consciente de lo que no sabes (bueno)\n- Estás en territorio nuevo (crecimiento)\n- Eres humilde (valioso)\n\n**Con tiempo y práctica:**\n- Algunas cosas se vuelven automáticas\n- Desarrollas criterio propio\n- La inseguridad se reduce\n\n**Estrategia:**\n- Empieza con ejercicios donde SÍ te sientes seguro/a\n- Gradualmente aumenta dificultad\n- Celebra cada logro\n\nIncluso profesionales sienten inseguridad. Es normal y saludable."
            },
            miedoJuicio: {
                keywords: ['me van a criticar', 'se van a reir', 'se van a reír', 'que pensaran', 'qué pensarán', 'van a hablar mal', 'juicio', 'critica', 'crítica'],
                text: "El miedo al juicio es profundamente humano 💙\n\n**Verdad liberadora:** La mayoría está demasiado ocupada con sus propias inseguridades para juzgarte.\n\n**Y si juzgan:**\n- Dice más sobre ellos que sobre ti\n- No pueden quitarte tu progreso\n- No pueden detener tu aprendizaje\n- Su opinión no define tu realidad\n\n**Pregunta poderosa:** ¿Preferirías vivir libre siendo juzgado/a, o preso/a de la aprobación ajena?\n\n**Los que juzgan negativamente** generalmente no están creando nada.\n\n**Los que apoyan** son los que importan. Busca tu tribu.\n\nEstás aprendiendo. No necesitas la aprobación de nadie para continuar."
            },
            overwhelm: {
                keywords: ['estoy abrumado', 'estoy abrumada', 'es demasiado', 'no doy abasto', 'colapsado', 'colapsada', 'overwhelm', 'abrumado'],
                text: "El overwhelm es señal de que necesitas parar y reorganizar 💙\n\n**¿Por qué pasa?** Estás viendo TODO el camino de una vez. Eso paraliza.\n\n**Solución:** Ve solo el siguiente paso. Literalmente uno.\n\n**Ahora mismo:**\n1. Respira profundo 3 veces\n2. Cierra todas las pestañas mentales excepto UNA\n3. ¿Cuál es la tarea MÁS PEQUEÑA que puedes hacer en 5 minutos?\n4. Haz solo esa\n5. Luego decide la siguiente\n\n**Analogía:** Comer un elefante se hace de un bocado a la vez.\n\n**Técnica práctica:**\n- Un módulo a la vez\n- Un ejercicio a la vez\n- Una línea a la vez\n\nNo tienes que hacer todo hoy. Solo algo hoy."
            },
            burnout: {
                keywords: ['estoy quemado creativamente', 'estoy quemada creativamente', 'ya no siento nada al dibujar', 'vacio creativo', 'vacío creativo', 'sin chispa', 'burnout', 'quemado', 'agotado'],
                text: "El burnout creativo es serio 💙\n\n**Señales:**\n- Dibujar se siente como obligación\n- Nada te inspira\n- Cansancio profundo\n- Cinismo sobre tu arte\n\n**Causa:** Forzarte demasiado, sin descanso.\n\n**Necesitas (ahora):**\n1. **Descanso real:** 1-2 semanas SIN dibujar\n2. **Consumir arte:** Ve, escucha, lee. No produzcas\n3. **Actividades distintas:** Haz cosas que no sean arte\n4. **Sueño:** Duerme más\n\n**Cuando vuelvas:**\n- Sesiones cortas (15 min)\n- Solo por placer, sin metas\n- Dibuja lo que QUIERAS\n\nDescansar NO es retroceder. Es recargar."
            },
            paralisisAnalisis: {
                keywords: ['pienso demasiado', 'no puedo decidir', 'doy muchas vueltas', 'overthinking', 'paralisis', 'parálisis', 'analisis', 'análisis'],
                text: "La parálisis por análisis es cuando pensar demasiado te impide actuar 💙\n\n**¿Qué pasa?** Estás buscando la decisión \"perfecta\". Pero no existe.\n\n**Verdad:** Cualquier decisión + acción > decisión perfecta + inacción.\n\n**Técnica 1: Regla de 2 minutos**\nSi una decisión se puede revertir en menos de 2 minutos, no pienses más. Hazla.\n\n**Técnica 2: Timer**\n- Ponte 5 minutos para decidir\n- Cuando suena, eliges lo primero que sientas\n- No más análisis\n\n**En dibujo:**\n- ¿No sabes qué pose? Lanza dado\n- ¿No sabes qué técnica? Primera de la lista\n\nAcción imperfecta enseña más que planificación perfecta."
            },
            redesSociales: {
                keywords: ['me obsesiono con los likes', 'instagram me estresa', 'el algoritmo me frustra', 'comparacion en redes', 'comparación en redes', 'redes sociales', 'likes', 'algoritmo'],
                text: "Las redes pueden ser tóxicas para artistas 💙\n\n**Verdad dura:** Likes ≠ calidad. Algoritmo ≠ validación.\n\n**Redes muestran:**\n- Lo que el algoritmo quiere\n- Momentos curados\n- Éxitos, no fracasos\n\n**Redes NO muestran:**\n- Las 100 horas de práctica\n- Los 20 intentos fallidos\n- La lucha mental\n\n**Estrategia sana:**\n1. **Límites:** 15 min al día máximo\n2. **Cuida tu feed:** Sigue solo lo que inspira\n3. **Comparte por ti:** No por likes\n4. **Desintoxica:** 1 semana sin redes cada mes\n\n**Pregunta clave:** ¿Dibujarías si nadie viera tu trabajo? Si sí, entonces hazlo por ti."
            },
            presionRapidez: {
                keywords: ['quiero mejorar rapido', 'quiero mejorar rápido', 'cuando sere bueno', 'cuándo seré bueno', 'impaciencia', 'necesito avanzar ya', 'rapidez'],
                text: "La impaciencia es normal pero puede sabotear 💙\n\n**Verdad incómoda:** No hay atajos reales. El tiempo y práctica son necesarios.\n\n**Expectativa vs Realidad:**\n- Expectativa: Mejorar en semanas\n- Realidad: Progreso notable en 3-6 meses de práctica constante\n\n**¿Por qué toma tiempo?** No solo aprendes técnica. También entrenas ojo, mano, cerebro.\n\n**Analogía:** Es como gym. No ves músculos en 1 semana. Pero después de 3 meses constantes, sí.\n\n**Estrategia:**\n- Guarda dibujos fechados\n- Compara cada mes\n- Celebra pequeños avances\n\n**Mantra:** \"Cada línea cuenta. Cada sesión suma. El tiempo va a pasar de todos modos.\""
            },
            miedoPublico: {
                keywords: ['miedo a equivocarme en clase', 'me da panico en vivo', 'me da pánico en vivo', 'hacer el ridiculo', 'hacer el ridículo', 'que me vean fallar', 'en clase'],
                text: "El miedo a equivocarte frente a otros es muy común 💙\n\n**Verdad reconfortante:** TODOS en la clase están aprendiendo. Todos se equivocan.\n\n**Los que juzgan negativamente** están proyectando sus inseguridades.\n\n**Los que apoyan** empatizan porque han estado ahí.\n\n**Reframe potente:** Equivocarte en clase es evidencia de que estás intentando. Los que nunca se equivocan es porque nunca intentan.\n\n**Estrategia:**\n- Respira antes de participar\n- Recuerda: es práctica, no performance\n- Un error en clase = aprendizaje para todos\n\n**Pregunta liberadora:** ¿Recordarás esto en 5 años? Probablemente no. ¿Entonces por qué darle tanto poder ahora?"
            },
            dueloArtistico: {
                keywords: ['arruine mi dibujo', 'arruiné mi dibujo', 'perdi horas de trabajo', 'perdí horas de trabajo', 'destrui mi arte', 'destruí mi arte', 'tiempo desperdiciado', 'duelo'],
                text: "El dolor de \"arruinar\" horas de trabajo es real 💙\n\n**Primero, valida:** Está bien sentir frustración, tristeza, enojo. Invirtiste tiempo.\n\n**Pero, reframe:** NO arruinaste nada. Aprendiste algo.\n\n**Ese dibujo te enseñó:**\n- Qué técnicas NO funcionaron\n- Límites de tu habilidad actual\n- Importancia de guardar progresos\n- Paciencia y resiliencia\n\n**Regla profesional:** Todos los artistas \"arruinan\" trabajos. Es parte del proceso.\n\n**Acción constructiva:**\n1. Toma foto del \"arruinado\"\n2. Identifica QUÉ salió mal\n3. En el siguiente, evita ese error\n\nNingún dibujo se desperdicia si aprendiste algo. Y siempre aprendes algo."
            },
            desmotivacion: {
                keywords: ['ya no tengo ganas', 'para que sigo', 'para qué sigo', 'perdi la motivacion', 'perdí la motivación', 'no vale la pena', 'desmotivado', 'desmotivada'],
                text: "La desmotivación pasa a todos 💙\n\n**¿Por qué?**\n- Cansancio acumulado\n- No ver progreso (aunque existe)\n- Comparación\n- Expectativas muy altas\n\n**Preguntas importantes:**\n¿Por qué empezaste a dibujar originalmente?\n¿Qué te atraía del arte?\n¿Hay algo que todavía te emociona?\n\n**Estrategias:**\n1. **Descanso:** 3-5 días sin dibujar\n2. **Inspiración:** Mira arte que te gusta\n3. **Variedad:** Dibuja algo diferente\n4. **Social:** Dibuja con alguien\n5. **Micro-metas:** Solo 5 minutos hoy\n\nLa motivación es intermitente. La disciplina es consistente. Los días sin motivación es cuando más importante es practicar."
            },
            cansancio: {
                keywords: ['estoy muy cansado', 'estoy muy cansada', 'sin energia', 'sin energía', 'agotada', 'agotado', 'muerta de sueño', 'cansancio', 'fatiga'],
                text: "El cansancio es señal de que necesitas descanso 💙\n\n**Verdad:** No puedes crear bien cuando estás agotado/a. El arte requiere energía.\n\n**Estrategia HOY:**\n1. **No dibujes ahora:** Descansa primero\n2. **Duerme 8 horas:** El cerebro consolida aprendizaje durmiendo\n3. **Come bien:** El cerebro necesita glucosa\n4. **Hidrátate:** Deshidratación = fatiga\n\n**Mañana:** Dibuja cuando tengas energía. Usualmente por la mañana.\n\n**Tip profesional:** Sesiones cortas con energía > sesiones largas exhausto/a.\n\n**Prioridades:** 1. Salud 2. Descanso 3. Entonces arte. No al revés."
            },
            llanto: {
                keywords: ['tengo ganas de llorar', 'llore dibujando', 'lloré dibujando', 'lagrimas', 'lágrimas', 'quiero llorar', 'llanto', 'lloro'],
                text: "Está bien llorar 💙 Las lágrimas son válidas y necesarias.\n\n**¿Por qué lloramos?**\n- Frustración acumulada\n- Agotamiento emocional\n- Sentir que no avanzas\n- Presión interna/externa\n- Vulnerabilidad del proceso creativo\n\n**El llanto SÍ significa:**\n- Que algo importa para ti (bueno)\n- Que necesitas soltar emoción (sano)\n- Que estás siendo humano/a\n\n**El llanto NO significa:**\n- Que no puedes hacerlo\n- Que debes rendirte\n- Que eres \"débil\"\n\n**Ahora mismo:**\n1. Llora si necesitas. Sin juicio\n2. Aléjate del dibujo por hoy\n3. Haz algo que te reconforte\n4. Duerme\n5. Mañana será diferente\n\nEste sentimiento es temporal. Pasará."
            }
        },
        
        // ===== TÉCNICO (35 temas) =====
        technical: {
            // MÓDULO 1
            lineaAccion: {
                keywords: ['linea de accion', 'línea de acción', 'como hago la linea de accion', 'cómo hago la línea de acción', 'que es la linea de accion', 'qué es la línea de acción', 'gesto', 'movimiento', 'dinamica'],
                text: "La **línea de acción** es la columna vertebral de cualquier dibujo de figura 💪\n\n**¿Qué es?** Una línea curva imaginaria que atraviesa el cuerpo mostrando su movimiento principal.\n\n**Cómo encontrarla:**\n1. Ignora todos los detalles (ropa, rostro, manos)\n2. Busca la curva dominante desde la cabeza hasta los pies\n3. Dibújala en 1 segundo con un trazo fluido\n\n**Formas básicas:**\n- Línea 'S': Cuerpo relajado, contrapposto\n- Línea 'C': Acción direccional fuerte\n- Línea recta: Tensión, rigidez\n\n**Regla de oro:** TODO croquis empieza con la línea de acción. Siempre. Sin excepción.\n\n**Práctica:** Mira poses y dibuja solo la línea de acción. 20 poses en 5 minutos. Solo la línea, nada más."
            },
            proporciones: {
                keywords: ['como medir proporciones', 'cómo medir proporciones', 'medir', 'proporcion', 'proporciones', 'proporción', 'lapiz', 'lápiz', 'medicion', 'medición'],
                text: "Medir proporciones es esencial para dibujo realista 📏\n\n**Técnica básica (lápiz como regla):**\n1. **Estira tu brazo COMPLETAMENTE** (no dobles el codo)\n2. Cierra un ojo\n3. Usa el lápiz como regla: el pulgar marca medidas\n4. La cabeza es tu unidad base de medida\n\n**Proporción estándar:** Cuerpo humano = 7 a 8 cabezas de altura\n- Cabeza a mentón: 1 cabeza\n- Mentón a pezones: 1 cabeza\n- Pezones a ombligo: 1 cabeza\n- Ombligo a entrepierna: 1 cabeza\n- Entrepierna a rodilla: 2 cabezas\n- Rodilla a pie: 2 cabezas\n\n**ERROR COMÚN:** Doblar el codo. Esto cambia la distancia y arruina la medida.\n\n**Práctica:** Empieza midiendo objetos simples (taza, libro) antes de personas. Desarrolla tu ojo."
            },
            contrapposto: {
                keywords: ['contrapposto', 'contraposto', 'que es contrapposto', 'qué es contrapposto', 'equilibrio', 'peso', 'pierna apoyo', 'distribucion peso', 'distribución peso'],
                text: "El **contrapposto** es la técnica que hace poses lucir naturales 🎭\n\n**¿Qué es?** Distribución asimétrica del peso corporal donde una parte del cuerpo contrasta con otra.\n\n**Regla de oro:** Hombros y caderas NUNCA están paralelos.\n\n**Cómo funciona:**\n- **Pierna de apoyo** (sostiene peso) → cadera ALTA de ese lado\n- **Pierna relajada** (sin peso) → cadera BAJA de ese lado\n- **Hombros** se inclinan en dirección OPUESTA a las caderas\n- **Cabeza** generalmente se inclina hacia el hombro más bajo\n\n**Por qué es importante:** Crea naturalidad y dinamismo. Sin contrapposto, la figura se ve rígida como robot.\n\n**Observación clave:** Cuando alguien está parado naturalmente, SIEMPRE está en contrapposto. Nadie distribuye peso 50/50.\n\n**Ejercicio:** Párate frente a un espejo. Pon tu peso en una pierna. Observa cómo se mueve tu cadera y hombros. Eso es contrapposto."
            },
            croquis: {
                keywords: ['croquis', 'boceto', 'sketch', 'como hacer croquis', 'cómo hacer croquis', 'rapido', 'rápido', 'gesture drawing', 'dibujo rápido', 'gestos'],
                text: "El croquis es captura de ESENCIA, no de detalle 🎨\n\n**Tiempo:** 30 segundos a 5 minutos MÁXIMO. No más.\n\n**Proceso:**\n1. **Línea de acción** (1 línea curva, 2 segundos)\n2. **Masas principales** (cabeza, torso, pelvis como óvalos simples)\n3. **Articulaciones** (hombros, codos, rodillas como puntos)\n4. **Conectar** con líneas simples\n\n**PROHIBIDO:**\n- Borrar\n- Detallar\n- Perfeccionar\n- Sombrear\n\n**Mentalidad:** Volumen > Precisión. Movimiento > Exactitud. Esencia > Detalle.\n\n**¿Por qué es importante?** Entrena tu ojo a ver formas grandes y relaciones espaciales. Es la base de todo dibujo de figura.\n\n**Práctica recomendada:**\n- Quickposes.com\n- Line-of-action.com\n- Croquis Cafe (YouTube)\n\n20-30 croquis diarios de 30 segundos cada uno. En 1 mes verás progreso enorme."
            },
            formasBasicas: {
                keywords: ['formas basicas', 'formas básicas', 'que son las formas basicas', 'qué son las formas básicas', 'circulo', 'círculo', 'cuadrado', 'triangulo', 'triángulo', 'cilindro', 'esfera'],
                text: "Las formas básicas son los bloques de construcción de TODO dibujo 🧱\n\n**Las 3 formas fundamentales:**\n1. **Círculo/Esfera** → Cabeza, articulaciones\n2. **Cuadrado/Cubo** → Torso, pelvis\n3. **Triángulo/Cono** → Músculos, dirección\n\n**¿Por qué importan?** El cuerpo humano es complejo. Formas básicas lo simplifican para que puedas:\n- Construir estructura sólida\n- Entender volumen 3D\n- Trabajar perspectiva\n- Mantener proporciones\n\n**Proceso de dibujo:**\n1. **Siempre empieza con formas básicas**\n2. Refina gradualmente\n3. Agrega detalles al final\n\n**ERROR COMÚN:** Saltar directo a detalles. Eso colapsa la estructura.\n\n**Analogía:** Es como construir casa. Primero estructura (formas básicas), luego paredes, luego pintura (detalles).\n\n**Ejercicio:** Dibuja 10 figuras SOLO con círculos, cuadrados y triángulos. Cero líneas curvas complejas. Solo formas simples."
            },
            perspectiva: {
                keywords: ['perspectiva', 'no entiendo la perspectiva', 'escorzo', 'foreshortening', 'punto de fuga', 'linea de horizonte', 'línea de horizonte'],
                text: "La perspectiva hace que dibujos planos se vean 3D 🎯\n\n**Concepto básico:**\nObjetos más CERCA = más grandes\nObjetos más LEJOS = más pequeños\n\n**Elementos clave:**\n1. **Línea de horizonte:** Nivel de tus ojos\n2. **Punto de fuga:** Donde las líneas paralelas convergen\n3. **Escorzo:** Cuando parte del cuerpo apunta hacia/lejos de ti\n\n**En figura humana:**\n- Brazo extendido hacia ti: Mano ENORME, antebrazo corto\n- Pierna alejándose: Muslo grande, pie pequeño\n- Torso girado: Un hombro más grande que otro\n\n**Tip de oro:** Dibuja a través de las formas. Imagina la parte que no ves. Esto ayuda a entender volumen.\n\n**Práctica:** Dibuja cilindros y cajas en diferentes ángulos antes de figuras. La perspectiva es más fácil con formas simples."
            },
            ejesAnatomicos: {
                keywords: ['ejes anatomicos', 'ejes anatómicos', 'que son los ejes anatomicos', 'qué son los ejes anatómicos', 'linea de hombros', 'línea de hombros', 'linea de caderas'],
                text: "Los ejes anatómicos son líneas guía que estructuran el cuerpo 📐\n\n**Los 3 ejes principales:**\n1. **Eje de hombros:** Línea que conecta ambos hombros\n2. **Eje de caderas:** Línea que conecta ambas caderas\n3. **Eje central:** Línea vertical del cuerpo (columna)\n\n**¿Para qué sirven?**\n- Establecer ángulo y dirección del torso\n- Verificar contrapposto (hombros opuestos a caderas)\n- Construir pose con solidez estructural\n- Mantener simetría o asimetría intencional\n\n**En práctica:** Después de línea de acción, dibuja:\n1. Línea de hombros (ángulo)\n2. Línea de caderas (ángulo opuesto)\n3. Conecta con eje central\n\nEsto te da estructura base antes de agregar volumen.\n\n**Ejercicio:** En 20 poses de referencia, dibuja SOLO los 3 ejes. Sin cuerpo. Solo líneas. Verás que ya \"se lee\" la pose."
            },
            lineasRitmo: {
                keywords: ['lineas de ritmo', 'líneas de ritmo', 'explica lineas de ritmo', 'explícame líneas de ritmo', 'ritmo', 'flujo', 'flow'],
                text: "Las líneas de ritmo guían el ojo a través del dibujo 🎶\n\n**¿Qué son?** Líneas curvas que siguen el flujo natural del cuerpo, creando sensación de movimiento y armonía.\n\n**Tipos:**\n1. **Líneas estructurales:** Siguen la forma del músculo o hueso\n2. **Líneas direccionales:** Indican hacia dónde va el movimiento\n3. **Líneas de contorno:** Definen el borde pero con variación\n\n**Principio clave:** Todo en el cuerpo fluye. Nada es recto o rígido. Incluso brazos \"rectos\" tienen curva sutil.\n\n**Aplicación:**\n- Contornos: Varía grosor de línea según profundidad\n- Músculos: Líneas siguen dirección de fibras musculares\n- Composición: Líneas guían ojo del espectador\n\n**ERROR COMÚN:** Líneas todas del mismo grosor y rigidez. Resultado: dibujo plano y sin vida.\n\n**Ejercicio:** Dibuja figura solo con líneas curvas fluidas. Cero líneas rectas. Exagera las curvas."
            },
            espacioNegativo: {
                keywords: ['espacio negativo', 'que es el espacio negativo', 'qué es el espacio negativo', 'como usar espacio negativo', 'espacio entre'],
                text: "El espacio negativo es el área ALREDEDOR y ENTRE los objetos 🔲\n\n**Cambio de mentalidad:** No dibujes lo que ES. Dibuja lo que NO ES.\n\n**¿Por qué importa?** Porque el espacio negativo es tan importante como el positivo. Nuestro cerebro a veces \"miente\" sobre las formas, pero el espacio negativo no.\n\n**Técnica:**\n1. Mira la pose/objeto\n2. Enfócate en los espacios ENTRE brazos, piernas, torso\n3. Dibuja esas formas negativas\n4. Mágicamente, la figura aparece correcta\n\n**Ejemplo:** En una pose con mano en cadera:\n- No dibujes brazo y torso\n- Dibuja el triángulo de espacio entre ellos\n- El brazo se forma solo\n\n**Utilidad:**\n- Verificar proporciones\n- Corregir errores de forma\n- Componer mejor\n\n**Ejercicio:** Dibuja una silla, pero solo los espacios vacíos entre las patas y respaldo. No la silla misma."
            },
            construccionCuerpo: {
                keywords: ['como construir un cuerpo', 'cómo construir un cuerpo', 'como dibujar el cuerpo', 'cómo dibujar el cuerpo', 'construir figura', 'estructura del cuerpo'],
                text: "Construir un cuerpo es un proceso paso a paso 🏗️\n\n**Orden correcto (SIEMPRE):**\n\n**1. Línea de acción** (1 línea, movimiento general)\n**2. Formas básicas grandes:**\n   - Cabeza (óvalo)\n   - Torso (cuadrado/óvalo)\n   - Pelvis (triángulo/trapecio)\n**3. Ejes:**\n   - Línea de hombros\n   - Línea de caderas\n**4. Articulaciones** (puntos en codos, rodillas, muñecas, tobillos)\n**5. Conectar** con líneas simples (brazos, piernas)\n**6. Refinar** formas\n**7. Agregar** volumen y músculos\n**8. Detalles finales**\n\n**ERROR FATAL:** Empezar con detalles. Colapsa todo.\n\n**Regla de oro:** Estructura primero, detalles último.\n\n**Analogía:** Es como escribir un ensayo. Primero esqueleto (intro, cuerpo, conclusión), luego párrafos, luego oraciones perfectas.\n\n**Práctica:** 10 figuras siguiendo este orden exacto. No saltes pasos."
            },
            
            // MÓDULO 2
            tresMasas: {
                keywords: ['tres masas', '3 masas', 'que son las 3 masas', 'qué son las 3 masas', 'masas del cuerpo', 'cabeza torso pelvis'],
                text: "Las 3 masas son la simplificación fundamental del cuerpo humano 💪\n\n**Las 3 masas:**\n1. **CABEZA** (óvalo o esfera)\n2. **TORSO** (caja de costillas, forma de huevo)\n3. **PELVIS** (cubo o cuenco)\n\n**¿Por qué 3 masas?** El cuerpo es complejo. Las 3 masas lo reducen a formas manejables que:\n- Se mueven independientemente\n- Tienen volumen 3D\n- Se conectan en articulaciones claras\n\n**Relaciones:**\n- Cabeza se conecta al torso via CUELLO\n- Torso se conecta a pelvis via CINTURA (columna flexible)\n- De pelvis salen PIERNAS\n- De torso salen BRAZOS\n\n**Movimiento:** Cada masa puede rotar, inclinarse, girar independiente. Por eso el cuerpo es tan expresivo.\n\n**Práctica esencial:** Antes de dibujar figura completa, dibuja las 3 masas como formas 3D simples. Verifica ángulos, perspectiva, proporciones.\n\n**Esto es la base de TODO dibujo anatómico.**"
            },
            anatomiaBasica: {
                keywords: ['anatomia basica del cuerpo', 'anatomía básica del cuerpo', 'anatomia del cuerpo', 'anatomía del cuerpo', 'cuerpo humano'],
                text: "La anatomía básica que necesitas para dibujar 📚\n\n**MÚSCULOS CLAVE (los que se ven):**\n\n**Torso:**\n- Pectorales (pecho)\n- Abdominales (6-pack)\n- Oblicuos (costados)\n- Dorsales (espalda)\n- Trapecios (cuello-hombros)\n\n**Brazos:**\n- Deltoides (hombros)\n- Bíceps (frente brazo)\n- Tríceps (atrás brazo)\n- Antebrazos (complejos, dibuja como forma)\n\n**Piernas:**\n- Cuádriceps (frente muslo)\n- Isquiotibiales (atrás muslo)\n- Pantorrillas (gemelos)\n\n**VERDAD IMPORTANTE:** NO necesitas memorizar TODO. Solo las formas grandes que se VEN.\n\n**Enfoque práctico:** Dibuja del natural primero. Luego aprende nombres. No al revés."
            },
            manos: {
                keywords: ['no me salen las manos', 'manos', 'dedos', 'dibujar manos', 'como dibujar manos', 'cómo dibujar manos', 'ayuda con manos'],
                text: "Las manos son difíciles para TODOS. Incluso profesionales practican constantemente 🖐️\n\n**¿Por qué son difíciles?**\n- Muchas articulaciones móviles\n- Perspectiva compleja\n- Extremadamente expresivas\n- Tú las ves todos los días (tu ojo es crítico)\n\n**SIMPLIFICACIÓN:**\n1. **Palma** = rectángulo o trapecio\n2. **Dedos** = 3 cilindros cada uno\n3. **Pulgar** = aparte, desde el costado\n\n**Proporciones:**\n- Mano = cara (desde barbilla a frente)\n- Dedos = mitad de la palma aproximadamente\n- Pulgar llega hasta nudillo del índice\n\n**Técnica:**\n1. Dibuja forma de palma como caja 3D\n2. Agrega dedos como cilindros desde nudillos\n3. Curva líneas, agrega articulaciones\n4. Refina\n\n**SECRETO PROFESIONAL:** Todos usamos referencia para manos. Toma fotos de TU mano en diferentes poses. Cero vergüenza.\n\n**Práctica:** 100 manos en 1 mes. Suena mucho pero son 3-4 al día."
            },
            pies: {
                keywords: ['pies', 'ayuda con los pies', 'como dibujar pies', 'cómo dibujar pies', 'no me salen los pies'],
                text: "Los pies son la base de toda figura. Literalmente 🦶\n\n**¿Por qué importan?** Pies mal dibujados hacen que figura \"flote\" o se vea inestable.\n\n**SIMPLIFICACIÓN:**\n1. **Pie = cuña/prisma triangular**\n2. Vista lateral: forma de \"L\" aplanada\n3. Vista superior: forma de gota\n\n**Proporciones:**\n- Pie = largo de antebrazo (desde codo a muñeca)\n- Pie = altura de cabeza (aprox)\n- Dedos = 1/3 del pie\n\n**PARTES:**\n1. **Talón** (redondo, soporta peso)\n2. **Arco** (curva, no toca suelo)\n3. **Bola del pie** (donde se flexiona)\n4. **Dedos** (5 cilindros pequeños, pulgar más grande)\n\n**SECRETO:** Pies casi siempre están en escorzo (perspectiva). Practica cajas en perspectiva primero.\n\n**Ejercicio:** Dibuja TUS pies en 10 ángulos diferentes. Usa espejo si es necesario."
            },
            torso: {
                keywords: ['torso', 'como dibujar el torso', 'cómo dibujar el torso', 'pecho', 'abdomen', 'espalda'],
                text: "El torso es la masa más grande y define la pose 💪\n\n**ESTRUCTURA ÓSEA:**\n- **Caja torácica:** Huevo/óvalo, NO se mueve\n- **Pelvis:** Cubo/cuenco, conectado por columna flexible\n\n**FORMAS BÁSICAS:**\n- Vista frontal: Óvalo o rectángulo con hombros anchos\n- Vista lateral: Curva sutil (pecho sale, espalda curva)\n- Vista posterior: Trapecio invertido\n\n**MÚSCULOS VISIBLES (frente):**\n1. **Pectorales:** Formas de abanico desde esternón\n2. **Abdominales:** 6 bloques (recuerda: abdomen tiene forma de cilindro, no plano)\n3. **Oblicuos:** A los lados, conectan costillas con pelvis\n\n**MÚSCULOS VISIBLES (espalda):**\n1. **Trapecios:** Desde cuello a hombros (forma de diamante)\n2. **Dorsales:** Grandes, forman \"V\" de la espalda\n\n**MOVIMIENTO:** Torso se tuerce, inclina, rota. La caja torácica y pelvis se mueven independiente conectadas por la columna.\n\n**Práctica:** Dibuja torso como caja 3D en 20 ángulos diferentes. Sin músculos primero. Solo estructura."
            },
            pelvis: {
                keywords: ['pelvis', 'anatomia de la pelvis', 'anatomía de la pelvis', 'caderas', 'como dibujar la pelvis'],
                text: "La pelvis es la base del movimiento del cuerpo 🎯\n\n**FORMA BÁSICA:**\n- **Cubo o cuenco** inclinado\n- Vista frontal: Trapecio o forma de shorts\n- Vista lateral: Forma de bota\n\n**PROPORCIONES:**\n- Ancho de pelvis (hombre): ~2 cabezas\n- Ancho de pelvis (mujer): ~2.5 cabezas (más ancha)\n- Altura pelvis: ~1 cabeza\n\n**DIFERENCIAS HOMBRE VS MUJER:**\n**Mujer:** Pelvis MÁS ANCHA, MÁS REDONDEADA\n**Hombre:** Pelvis más estrecha, más angular\n\n**MOVIMIENTO:** Pelvis se inclina, rota, se eleva de un lado. En contrapposto, un lado sube cuando la pierna soporta peso.\n\n**Conexiones:**\n- Arriba: columna/torso\n- Lados: piernas desde articulaciones de cadera\n\n**Ejercicio:** Dibuja pelvis como cubo simple en 15 ángulos. Luego agrega piernas."
            },
            hombros: {
                keywords: ['hombros', 'como dibujar hombros', 'cómo dibujar hombros', 'deltoides', 'ayuda con hombros'],
                text: "Los hombros son cruciales para el lenguaje corporal 💪\n\n**FORMA:**\n- **Deltoides:** Músculo principal, forma de \"capucha\" redonda sobre hombro\n- Tiene 3 partes: frontal, lateral, posterior\n- Vista frontal: Forma de media luna o gorra\n\n**MOVIMIENTO:** Hombros son la articulación MÁS móvil del cuerpo:\n- Rotan 360°\n- Se elevan/bajan\n- Se adelantan/atrasan\n- Se encogen\n\n**ANCHO:**\n- Hombres: ~3 cabezas de ancho\n- Mujeres: ~2.5 cabezas de ancho\n\n**CONEXIÓN:** Hombros conectan brazo a torso. Cuando brazo se mueve, hombro se mueve.\n\n**ERROR COMÚN:** Dibujar hombros como círculos simples. Son formas 3D con volumen.\n\n**Ejercicio:** Dibuja hombros en estas poses: relajados, encogidos (tensión), uno arriba/otro abajo (alcanzando), ambos adelante (abrazo)."
            },
            brazos: {
                keywords: ['brazos', 'ayuda con los brazos', 'como dibujar brazos', 'cómo dibujar brazos', 'biceps', 'bíceps', 'triceps', 'tríceps'],
                text: "Los brazos son tubos con músculos específicos 💪\n\n**ESTRUCTURA:**\n1. **Brazo superior** (hombro a codo):\n   - Bíceps (frente): 2 masas musculares\n   - Tríceps (atrás): 3 masas (más largo que bíceps)\n   \n2. **Antebrazo** (codo a muñeca):\n   - Forma cónica (más grueso arriba, más delgado en muñeca)\n\n**PROPORCIONES:**\n- Brazo superior: ~1.5 cabezas\n- Antebrazo: ~1.3 cabezas\n- Brazo completo extendido: ~3 cabezas (hasta dedos)\n\n**FORMAS BÁSICAS:**\n- Brazo superior: Cilindro que se estrecha hacia codo\n- Antebrazo: Cono que se estrecha hacia muñeca\n\n**OBSERVACIÓN CLAVE:** Cuando brazo está doblado, bíceps se \"hincha\". Cuando está extendido, se alarga y aplana.\n\n**ERROR COMÚN:** Dibujar brazos como tubos uniformes. Tienen tapering (se estrechan) y músculos crean bultos.\n\n**Ejercicio:** Dibuja tu propio brazo en 5 posiciones: extendido, doblado 90°, alcanzando arriba, cruzado, colgando."
            },
            piernas: {
                keywords: ['piernas', 'no entiendo las piernas', 'ayuda con piernas', 'como dibujar piernas', 'muslo', 'pantorrilla'],
                text: "Las piernas soportan TODO el cuerpo 🦵\n\n**ESTRUCTURA:**\n1. **Muslo** (cadera a rodilla):\n   - Cuádriceps (frente): 4 músculos grandes\n   - Isquiotibiales (atrás): 3 músculos\n   - Forma: Cilindro que se estrecha hacia rodilla\n\n2. **Pantorrilla** (rodilla a tobillo):\n   - Gemelos (atrás): 2 músculos prominentes\n   - Tibia (frente): Hueso visible\n   - Forma: Cono invertido\n\n**PROPORCIONES:**\n- Muslo: ~2 cabezas\n- Pantorrilla: ~2 cabezas\n- Pierna completa (con pie): ~4 cabezas\n\n**DIFERENCIAS HOMBRE VS MUJER:**\n**Mujer:** Muslo relativo más largo, pantorrilla más alta, rodillas más juntas\n**Hombre:** Pantorrilla más baja y desarrollada, muslo más muscular\n\n**Ejercicio:** Dibuja piernas en: posición neutra, caminando, corriendo, sentada, cruzada."
            },
            cuello: {
                keywords: ['cuello', 'como dibujar el cuello', 'cómo dibujar el cuello', 'nuca', 'garganta'],
                text: "El cuello conecta cabeza con cuerpo y es muy expresivo 🎭\n\n**ESTRUCTURA:**\n- **Músculos principales:**\n  1. Esternocleidomastoideo (ECM): Desde clavícula a oreja (diagonal)\n  2. Trapecios: Desde nuca a hombros (diamante)\n\n**FORMA BÁSICA:**\n- **Cilindro** que sale del torso\n- NO sale directo hacia arriba\n- Sale con ángulo HACIA ADELANTE\n\n**VISTAS:**\n- **Frontal:** Forma de \"V\" (ECM visibles a los lados)\n- **Lateral:** Forma de \"C\" o \"S\" (cuello se arquea adelante)\n- **Posterior:** Nuca, trapecios visibles\n\n**PROPORCIONES:**\n- Grosor cuello (hombre): ~2/3 ancho de cabeza\n- Grosor cuello (mujer): ~1/2 ancho de cabeza\n- Largo: ~2/3 altura de cabeza\n\n**DIFERENCIAS HOMBRE VS MUJER:**\n**Hombre:** Manzana de Adán visible, trapecios más desarrollados\n**Mujer:** Cuello más largo, más delgado, más suave\n\n**Ejercicio:** Dibuja cuello en diferentes poses: mirando arriba, abajo, lado, girando."
            },
            musculos: {
                keywords: ['musculos', 'músculos', 'que musculos debo memorizar', 'qué músculos debo memorizar', 'musculatura'],
                text: "NO necesitas memorizar TODOS los músculos 💪\n\n**Los músculos QUE SE VEN (prioriza):**\n\n**TORSO:** Pectorales, abdominales, oblicuos, trapecios, dorsales\n**BRAZOS:** Deltoides, bíceps, tríceps\n**PIERNAS:** Cuádriceps, isquiotibiales, gemelos\n\n**ESO ES TODO. 11 formas musculares.**\n\n**Estrategia:**\n1. Dibuja la forma general primero\n2. No te preocupes por nombres todavía\n3. Observa dónde se ABULTA el cuerpo\n4. Gradualmente aprende nombres\n\n**Verdad liberadora:** Grandes artistas no son anatomistas. Son observadores entrenados.\n\n**Enfoque práctico:** 80% de tu tiempo dibujando del natural, 20% estudiando anatomía."
            },
            esqueleto: {
                keywords: ['esqueleto', 'estructura del esqueleto', 'huesos', 'estructura osea', 'estructura ósea', 'skeleton'],
                text: "El esqueleto es la estructura que NO se mueve 🦴\n\n**Huesos CLAVE que se ven/sienten:**\n\n**CABEZA:** Cráneo (óvalo/huevo)\n\n**TORSO:**\n- Clavículas (huesos en S, muy visibles)\n- Esternón (centro del pecho)\n- Caja torácica (NO se mueve)\n- Pelvis (base, estructura sólida)\n- Columna vertebral (flexible, curva en S)\n\n**¿Por qué importa el esqueleto?**\n- Define proporciones\n- Limita movimiento (no puedes doblar donde no hay articulación)\n- Crea landmarks: clavículas, rodillas, codos, caderas\n\n**Landmarks importantes:**\n- **Clavícula:** Siempre visible\n- **Codos:** Punto óseo atrás\n- **Rodillas:** Rótula al frente\n- **Caderas:** Crestas ilíacas a los lados\n\n**Estrategia:** Dibuja skeleton stick figure antes de agregar músculos. Asegura proporciones correctas."
            },
            articulaciones: {
                keywords: ['articulaciones', 'que son las articulaciones', 'qué son las articulaciones', 'joints', 'como se mueve el cuerpo'],
                text: "Las articulaciones son donde los huesos se encuentran y permiten movimiento 🔄\n\n**TIPOS:**\n\n**1. Bisagra** (movimiento en 1 plano):\n- Codo: Solo dobla/extiende\n- Rodilla: Solo dobla/extiende\n\n**2. Bola y cavidad** (movimiento en todas direcciones):\n- Hombro: Rota 360°, más móvil\n- Cadera: Rota 360°, más estable\n\n**3. Pivote** (rotación):\n- Cuello: Gira cabeza\n- Antebrazo: Rota mano\n\n**¿Por qué importa?** No puedes dibujar movimiento imposible. Codo no dobla hacia adelante. Rodilla no dobla hacia adelante.\n\n**Landmarks de articulaciones:**\n- Hombros, codos, muñecas, caderas, rodillas, tobillos\n\n**En dibujo:**\n- Articulaciones = puntos/círculos en construcción\n- Conectan las formas grandes\n- Definen dónde se dobla la figura\n\n**Ejercicio:** Dibuja figura stick con círculos en cada articulación. Muévela en diferentes poses verificando qué articulación permite qué movimiento."
            },
            diferenciasGenero: {
                keywords: ['diferencias entre hombre y mujer', 'diferencias hombre mujer', 'anatomia masculina', 'anatomía masculina', 'anatomia femenina', 'anatomía femenina'],
                text: "Hay diferencias anatómicas clave 👥\n\n**HOMBRES:**\n- Hombros MÁS ANCHOS (3 cabezas)\n- Caderas más estrechas (2 cabezas)\n- Forma de \"V\"\n- Cintura menos definida\n- Músculos más definidos, angulares\n- Cuello más grueso\n\n**MUJERES:**\n- Hombros más estrechos (2.5 cabezas)\n- Caderas MÁS ANCHAS (2.5 cabezas)\n- Forma de reloj de arena\n- Cintura muy definida\n- Músculos más suaves, curvas\n- Cuello más delgado, largo\n- Piernas relativamente más largas\n\n**IMPORTANTE:** Estos son promedios. Existe MUCHA variación individual. Usa estas guías, no reglas absolutas."
            },
            movimientoDinamico: {
                keywords: ['como crear movimiento dinamico', 'cómo crear movimiento dinámico', 'movimiento dinamico', 'dinamismo', 'accion', 'acción', 'energia'],
                text: "El movimiento dinámico hace que dibujos cobren vida ⚡\n\n**ELEMENTOS CLAVE:**\n\n**1. Línea de acción fuerte:**\n- Curvas dramáticas (S, C)\n- NO líneas rectas rígidas\n\n**2. Contrapposto exagerado:**\n- Hombros y caderas en ángulos opuestos MÁS pronunciados\n- Peso claramente de un lado\n- Asimetría\n\n**3. Escorzo:**\n- Perspectiva dramática\n- Partes del cuerpo hacia/lejos del espectador\n- Crea impacto\n\n**4. Tensión vs relajación:**\n- Músculos tensos en lado de esfuerzo\n- Músculos relajados en lado opuesto\n- Contraste visual\n\n**Ejercicio:** Dibuja la misma pose: primero estática, luego exagera ángulos, curvas y escorzo para crear dinamismo. Compara."
            },
            
            // MÓDULO 3
            valoresTonales: {
                keywords: ['valores tonales', 'que son los valores tonales', 'qué son los valores tonales', 'valor', 'tono', 'escala tonal'],
                text: "Los valores tonales son la clave para crear volumen 🎨\n\n**¿Qué son?** La escala de claro a oscuro, independiente del color.\n\n**Escala básica:**\n1. Blanco (luz directa)\n2. Gris claro (luz indirecta)\n3. Gris medio (tono medio)\n4. Gris oscuro (sombra)\n5. Negro (sombra profunda)\n\n**¿Por qué importan?**\n- Crean ilusión de 3D en superficie plana\n- Definen forma y volumen\n- Establecen atmósfera\n- Más importante que líneas para realismo\n\n**REGLA DE 5 VALORES:** Con solo 5 valores puedes crear cualquier forma:\n1. Highlight (luz más brillante)\n2. Light (lado iluminado)\n3. Mid-tone (transición)\n4. Shadow (lado oscuro)\n5. Core shadow (sombra más oscura)\n\n**Ejercicio fundamental:** Dibuja esfera con 5 valores. Si logras esto, puedes dibujar cualquier forma.\n\n**Tip profesional:** Entrecierra los ojos al mirar referencia. Verás valores, no detalles."
            },
            iluminacion: {
                keywords: ['iluminacion', 'iluminación', 'como usar la iluminacion', 'cómo usar la iluminación', 'luz', 'sombra', 'lighting'],
                text: "La iluminación transforma dibujos planos en figuras con volumen 💡\n\n**TIPOS DE LUZ:**\n\n**1. Luz directa (hard light):**\n- Sombras duras, definidas\n- Alto contraste\n- Dramática\n- Ej: Sol directo, foco\n\n**2. Luz difusa (soft light):**\n- Sombras suaves, gradientes\n- Bajo contraste\n- Sutil\n- Ej: Día nublado, luz de ventana\n\n**DIRECCIÓN DE LUZ:**\n**Luz frontal:** Aplana forma\n**Luz lateral:** Define volumen, contraste alto\n**Luz posterior:** Silueta con borde iluminado\n**Luz superior:** Natural, sombras bajo rasgos\n**Luz inferior:** Dramática, antinatural\n\n**ELEMENTOS:**\n1. **Highlight:** Punto más brillante\n2. **Luz:** Lado iluminado\n3. **Sombra propia:** Lado alejado de luz\n4. **Core shadow:** Línea oscura entre luz y sombra\n5. **Luz reflejada:** Luz rebotada\n6. **Sombra proyectada:** Sombra en suelo\n\n**Regla de oro:** DECIDE la fuente de luz ANTES de empezar. Mantén consistencia.\n\n**Ejercicio:** Dibuja misma pose con luz desde 4 ángulos diferentes."
            },
            sombreado: {
                keywords: ['sombreado', 'tecnicas de sombreado', 'técnicas de sombreado', 'como sombrear', 'cómo sombrear', 'shading', 'sombras'],
                text: "El sombreado da vida a tus dibujos 🖤\n\n**TÉCNICAS PRINCIPALES:**\n\n**1. Hatching (líneas paralelas):**\n- Líneas en una dirección\n- Más cerca = más oscuro\n\n**2. Cross-hatching (líneas cruzadas):**\n- Capas de líneas en diferentes ángulos\n- Más capas = más oscuro\n- Gran control\n\n**3. Circulismo:**\n- Movimiento circular pequeño\n- Crea textura suave\n- Bueno para piel\n\n**4. Blending (difuminado):**\n- Gradiente suave\n- Usa difumino o dedo\n- Realista\n\n**REGLAS:**\n1. **Dirección importa:** Sigue la forma del objeto\n2. **Consistencia:** Usa una técnica por dibujo\n3. **Gradientes:** Transiciones suaves\n4. **Presión variable:** No presiones igual siempre\n\n**ERROR COMÚN:** Sombreado plano sin seguir la forma. Las líneas deben ENVOLVER la forma.\n\n**Ejercicio:** Dibuja 5 esferas, cada una con técnica diferente. Compara resultados."
            },
            composicion: {
                keywords: ['composicion', 'composición', 'como hacer buena composicion', 'cómo hacer buena composición', 'encuadre', 'como componer'],
                text: "La composición guía el ojo del espectador 🎯\n\n**REGLAS BÁSICAS:**\n\n**1. Regla de tercios:**\n- Divide imagen en 9 partes (3x3)\n- Coloca elementos importantes en intersecciones\n- NO centres todo\n\n**2. Líneas guía:**\n- Líneas diagonales: Dinámica, energía\n- Líneas horizontales: Calma, estabilidad\n- Líneas verticales: Fuerza, altura\n- Líneas en S/C: Flujo, elegancia\n\n**3. Balance:**\n- **Simétrico:** Formal, estático\n- **Asimétrico:** Dinámico, interesante\n\n**4. Espacio negativo:**\n- El espacio vacío también \"habla\"\n- Da respiro visual\n\n**5. Jerarquía:**\n- ¿Qué es lo más importante?\n- Debe destacar (tamaño, contraste, posición)\n\n**TIPS:**\n- No cortes en articulaciones\n- Deja espacio hacia donde mira el personaje\n- Usa profundidad (foreground, middle, background)\n\n**Ejercicio:** Toma una foto. Dibuja 3 composiciones diferentes: centrada, regla de tercios, close-up dramático."
            },
            profundidad: {
                keywords: ['profundidad', 'como crear profundidad', 'cómo crear profundidad', 'depth', '3d', 'volumen', 'dimension'],
                text: "Crear profundidad hace que dibujos se vean tridimensionales 📐\n\n**TÉCNICAS:**\n\n**1. Overlapping (superposición):**\n- Objetos adelante cubren objetos atrás\n- Más efectivo y simple\n\n**2. Tamaño relativo:**\n- Objetos cerca = grandes\n- Objetos lejos = pequeños\n\n**3. Perspectiva:**\n- Líneas paralelas convergen en punto de fuga\n\n**4. Detalle:**\n- Cerca: Mucho detalle\n- Lejos: Menos detalle\n\n**5. Contraste:**\n- Cerca: Alto contraste\n- Lejos: Bajo contraste\n\n**6. Peso de línea:**\n- Cerca: Líneas gruesas, oscuras\n- Lejos: Líneas delgadas, claras\n\n**7. Valores:**\n- Cerca: Valores completos (blancos brillantes, negros profundos)\n- Lejos: Valores comprimidos (más grises)\n\n**Ejercicio:** Dibuja 3 figuras: una cerca, una media distancia, una lejos. Aplica todas las técnicas."
            },
            pesoLinea: {
                keywords: ['peso de linea', 'peso de línea', 'que es el peso de linea', 'qué es el peso de línea', 'line weight', 'grosor de linea'],
                text: "El peso de línea añade profundidad y jerarquía 🖊️\n\n**¿Qué es?** El grosor/oscuridad de las líneas en tu dibujo.\n\n**REGLAS:**\n\n**1. Profundidad:**\n- Adelante: Líneas GRUESAS, oscuras\n- Atrás: Líneas DELGADAS, claras\n\n**2. Contorno vs interior:**\n- Contorno externo: Más grueso\n- Líneas internas: Más delgado\n\n**3. Sombra:**\n- Áreas en sombra: Líneas más gruesas\n- Áreas iluminadas: Líneas más delgadas\n\n**4. Importancia:**\n- Elemento principal: Líneas más definidas\n- Detalles secundarios: Líneas más sutiles\n\n**TÉCNICA:**\n- Varía presión del lápiz\n- Usa lápices de diferentes durezas (HB, 2B, 4B)\n- Pasa sobre líneas importantes múltiples veces\n\n**ERROR COMÚN:** Todas las líneas del mismo grosor = dibujo plano, sin vida.\n\n**Ejercicio:** Dibuja mano. Líneas externas gruesas, líneas de pliegues delgadas. Compara con versión de líneas uniformes."
            },
            texturas: {
                keywords: ['texturas', 'como dibujar texturas', 'cómo dibujar texturas', 'textura', 'texture', 'material'],
                text: "Las texturas dan realismo y variedad visual 🎨\n\n**TEXTURAS COMUNES:**\n\n**1. PIEL:**\n- Suave, gradientes sutiles\n- Sin líneas duras (excepto pliegues)\n- Técnica: Blending o circulismo\n\n**2. CABELLO:**\n- Flujo direccional\n- Mechas agrupadas (no hebra por hebra)\n- Valores variados\n- Técnica: Líneas largas fluidas\n\n**3. TELA:**\n- Varía según material\n\n**TÉCNICAS POR TEXTURA:**\n\n**Suave (piel):**\n- Blending\n- Transiciones graduales\n\n**Áspero (denim):**\n- Cross-hatching\n- Puntos/stippling\n\n**Reflectante (metal):**\n- Alto contraste\n- Highlights brillantes\n\n**Mate (algodón):**\n- Bajo contraste\n- Valores medios\n\n**PRINCIPIO:** Sugerir textura, no dibujar cada detalle. El ojo completa información.\n\n**Ejercicio:** Dibuja 4 cuadrados, cada uno con textura diferente: piel, cabello, denim, metal."
            },
            plieguesRopa: {
                keywords: ['pliegues de ropa', 'pliegues', 'ropa', 'ayuda con pliegues', 'como dibujar ropa', 'cómo dibujar ropa', 'tela'],
                text: "Los pliegues de ropa siguen reglas de física 👕\n\n**5 TIPOS BÁSICOS:**\n\n**1. Pipe folds (tubulares):**\n- Brazos, piernas colgantes\n- Líneas verticales paralelas\n\n**2. Zigzag folds:**\n- Codo doblado, rodilla\n- Forma de acordeón\n- Compresión de tela\n\n**3. Half-lock folds:**\n- Pliegues colgantes por gravedad\n- Forma de U\n\n**4. Diaper folds:**\n- Donde tela se estira entre dos puntos\n- Pantalones entre piernas\n\n**5. Drop folds:**\n- Tela cayendo desde punto único\n- Capas, sábanas\n\n**REGLAS UNIVERSALES:**\n1. **Tensión crea pliegues:** Donde se estira, hay pliegues\n2. **Gravedad:** Tela cae hacia abajo\n3. **Puntos de anclaje:** Hombros, caderas, codos crean pliegues\n4. **Material importa:**\n   - Tela gruesa = pliegues grandes\n   - Tela delgada = pliegues pequeños, muchos\n\n**ERROR COMÚN:** Dibujar líneas random sin entender física. Pliegues tienen razón de existir.\n\n**Ejercicio:** Dibuja tu propia manga: relajada, doblada en codo, estirada. Observa qué pliegues aparecen."
            },
            puntoFocal: {
                keywords: ['punto focal', 'que es el punto focal', 'qué es el punto focal', 'focal point', 'centro de interes'],
                text: "El punto focal es donde quieres que el espectador mire PRIMERO 🎯\n\n**¿Qué es?** El elemento más importante de tu composición. Todo lo demás lo apoya.\n\n**CÓMO CREAR PUNTO FOCAL:**\n\n**1. Contraste:**\n- Área más oscura vs más clara\n- Mayor diferencia de valores\n\n**2. Detalle:**\n- Punto focal = MÁS detallado\n- Resto = simplificado\n\n**3. Líneas guía:**\n- Líneas de composición apuntan al punto focal\n- Mirada del personaje\n- Dirección de movimiento\n\n**4. Tamaño:**\n- Elemento más grande a menudo es focal\n\n**5. Color/valor único:**\n- Un elemento diferente al resto\n\n**EN FIGURA HUMANA:**\nGeneralmente el punto focal es:\n- Rostro (especialmente ojos)\n- Manos (si hacen acción importante)\n- Área de mayor contraste\n\n**REGLA DE UNO:** UN punto focal por imagen. Más de uno = confusión.\n\n**ERROR COMÚN:** Todo con igual detalle/contraste = nada destaca = aburrido.\n\n**Ejercicio:** Dibuja figura. Haz rostro con máximo detalle y contraste. Simplifica resto. Observa cómo el ojo va directo al rostro."
            },
            narrativaVisual: {
                keywords: ['como contar historias con dibujos', 'cómo contar historias con dibujos', 'narrativa visual', 'storytelling', 'historia', 'como transmitir emocion'],
                text: "Los dibujos pueden contar historias sin palabras 📖\n\n**ELEMENTOS NARRATIVOS:**\n\n**1. Lenguaje corporal:**\n- **Postura:** Abierta (confianza) vs cerrada (inseguridad)\n- **Dirección:** Hacia adelante (agresión) vs atrás (miedo)\n- **Tensión:** Músculos tensos vs relajados\n\n**2. Expresión facial:**\n- Ojos: Dirección de mirada cuenta historia\n- Cejas: Arriba (sorpresa) vs abajo (enojo)\n- Boca: Sonrisa vs ceño\n\n**3. Gesto:**\n- Manos comunican emoción\n- Puños cerrados vs manos abiertas\n- Señalar, alcanzar, rechazar\n\n**4. Contexto:**\n- Ambiente cuenta parte de historia\n- Elementos en escena dan pistas\n- Iluminación crea mood\n\n**5. Acción implícita:**\n- ¿Qué pasó antes?\n- ¿Qué va a pasar después?\n- El momento capturado sugiere narrativa\n\n**PREGUNTA CLAVE:** \"¿Qué siente/piensa este personaje?\"\n\nSi puedes responder eso en tu dibujo, tienes narrativa.\n\n**EJERCICIO:** Dibuja misma figura en 3 poses: triste, enojada, alegre. Solo cambia lenguaje corporal, sin rostro. ¿Se lee la emoción?\n\n**RECUERDA:** Emoción > Técnica perfecta."
            }
        },
        
        // ===== SISTEMA Y CURSO (5 temas) =====
        system: {
            subirEjercicios: {
                keywords: ['subir', 'enviar', 'ejercicio', 'tarea', 'entregar', 'como subo', 'cómo subo', 'cargar ejercicio', 'como subo mis ejercicios', 'cómo subo mis ejercicios'],
                text: "Para subir tus ejercicios al curso:\n\n**PASO A PASO:**\n1. Ve a la sección del módulo correspondiente en tu dashboard\n2. Click en el botón \"Subir ejercicio\" o \"Upload\"\n3. Selecciona tu archivo (JPG, PNG o PDF)\n4. Puedes agregar una nota opcional describiendo tu proceso o dudas\n5. Click en \"Enviar\"\n\n**FORMATO RECOMENDADO:**\n- Tipo: JPG o PNG\n- Tamaño máximo: 10MB\n- Resolución: Suficiente para ver detalles (mínimo 1000px de ancho)\n\n**TIPS:**\n- Toma foto con buena iluminación natural\n- Asegúrate que el dibujo esté completo en el encuadre\n- Si es digital, exporta en alta calidad\n\n**¿Problemas técnicos?** Contacta al soporte técnico del curso o a tu instructor."
            },
            progreso: {
                keywords: ['progreso', 'avance', 'donde voy', 'dónde voy', 'porcentaje', 'completado', 'como voy', 'cómo voy', 'donde veo mi progreso', 'dónde veo mi progreso'],
                text: "Para ver tu progreso en el curso:\n\n**UBICACIÓN:**\n1. Ingresa a tu Dashboard principal\n2. Busca la sección \"Mi Progreso\" o \"Progress\"\n3. Ahí verás:\n   - % completado por módulo\n   - Ejercicios pendientes\n   - Feedback recibido\n   - Tu trayectoria de aprendizaje\n\n**QUÉ ENCONTRARÁS:**\n- Módulos completados vs pendientes\n- Ejercicios evaluados con comentarios\n- Tu evolución temporal\n- Próximas tareas sugeridas\n\n**IMPORTANTE:** El progreso en arte NO es lineal. Algunos días avanzarás mucho, otros poco. Es completamente normal.\n\n**TIP:** No te obsesiones con el porcentaje. Enfócate en aprender y disfrutar el proceso. El progreso vendrá naturalmente.\n\n**Celebra cada pequeño logro:**\n- Terminaste un ejercicio → ¡Celebra!\n- Entendiste un concepto → ¡Celebra!\n- Practicaste hoy → ¡Celebra!"
            },
            materiales: {
                keywords: ['materiales', 'que necesito', 'qué necesito', 'herramientas', 'lapices', 'lápices', 'papel', 'lista de materiales', 'que materiales necesito', 'qué materiales necesito'],
                text: "Materiales básicos para el curso de dibujo anatómico:\n\n**LÁPICES:**\n- **HB:** Para líneas iniciales, construcción\n- **2B:** Para sombreado medio, líneas finales\n- **4B o 6B:** Para sombras oscuras, contraste\n\n(Con estos 3 puedes hacer TODO)\n\n**PAPEL:**\n- **Bond A4 o Carta:** Para práctica diaria, croquis (económico)\n- **Canson 180gr o similar:** Para trabajos finales (mejor calidad)\n\n**OTROS:**\n- **Goma de borrar:** Preferible blanda (no dañe papel)\n- **Sacapuntas:** Básico\n- **Difumino (opcional):** Para gradientes suaves\n- **Regla (opcional):** Para verificar proporciones\n\n**VERDAD IMPORTANTE:** La herramienta NO hace al artista. Con un lápiz HB y papel puedes crear arte increíble.\n\n**RECOMENDACIÓN:** Empieza con lo básico. No gastes en materiales caros hasta que estés seguro/a de que disfrutas dibujar.\n\n**¿Dónde comprar?** Cualquier librería tiene estos básicos. No necesitas marcas fancy para empezar.\n\n**Enfoque:** 90% práctica, 10% materiales."
            },
            feedback: {
                keywords: ['feedback', 'retroalimentacion', 'retroalimentación', 'revision', 'revisión', 'comentario', 'corrección', 'critica', 'crítica', 'review', 'cuando recibo feedback', 'cuándo recibo feedback'],
                text: "Sistema de feedback del curso:\n\n**PROCESO:**\n1. Subes tu ejercicio a través del sistema\n2. Tu instructor lo revisa (24-48 horas hábiles generalmente)\n3. Recibes notificación por correo cuando está listo\n4. Accedes al feedback desde tu Dashboard\n\n**EL FEEDBACK INCLUYE:**\n- **¿Qué está bien?** (fortalezas a mantener)\n- **¿Qué mejorar?** (áreas de crecimiento)\n- **Próximos pasos** (cómo continuar)\n- Comentarios específicos sobre técnica, proporción, anatomía, etc.\n\n**CÓMO LEER FEEDBACK:**\n- Con mente abierta y curiosidad\n- No como crítica personal, sino como guía\n- Toma notas de los puntos principales\n- Implementa gradualmente (uno o dos puntos a la vez)\n\n**TIP IMPORTANTE:** El feedback es para AYUDARTE a crecer, no para juzgarte. Incluso críticas constructivas son señal de que tu instructor se preocupa por tu progreso.\n\n**¿No recibiste feedback?** Verifica tu carpeta de spam o contacta a soporte."
            },
            tiempoDedicacion: {
                keywords: ['cuanto tiempo', 'cuánto tiempo', 'horas', 'dedicacion', 'dedicación', 'practicar', 'tiempo de práctica', 'cuantas horas', 'cuántas horas', 'cuanto tiempo debo practicar', 'cuánto tiempo debo practicar'],
                text: "Tiempo recomendado de práctica:\n\n**IDEAL:**\n⏰ 30-60 minutos diarios\n\n**MÍNIMO EFECTIVO:**\n⏰ 15 minutos diarios\n\n**VERDAD DURA:** Constancia > Intensidad.\n\n**COMPARACIÓN:**\n- 15 min x 7 días = 105 min/semana (constante)\n- 2 horas x 1 día = 120 min/semana (irregular)\n\nParecen similares, pero la práctica diaria crea hábito y tu cerebro aprende mejor con repetición espaciada.\n\n**DISTRIBUCIÓN SUGERIDA:**\n- **10 min:** Croquis rápidos (calentamiento)\n- **20 min:** Ejercicio del día\n- **10 min:** Estudio anatómico\n\n**SI TIENES POCO TIEMPO:**\n15 minutos de práctica enfocada > 2 horas de práctica distraída.\n\nCalidad > Cantidad.\n\n**DESCANSOS:**\nToma al menos 1 día off por semana. El cerebro necesita tiempo para consolidar aprendizaje.\n\n**REALIDAD:**\nLa vida pasa. Algunos días practicarás 5 minutos, otros 2 horas. Está bien. Lo importante es no romper la cadena completamente.\n\n**¿Cuándo verás resultados?**\n- Primeros cambios: 2-4 semanas\n- Progreso notable: 3 meses de práctica constante\n- Habilidad sólida: 6-12 meses\n\n¡La constancia es tu superpoder! 💪"
            }
        }
    };

    // ============================================
    // SISTEMA DE DETECCIÓN Y GENERACIÓN
    // ============================================
    
    function detectCategory(message) {
        const msg = message.toLowerCase();
        
        // Buscar en conversación básica
        for (const [key, data] of Object.entries(knowledgeBase.basic)) {
            if (data.keywords.some(k => msg.includes(k))) {
                return { category: 'basic', key, data };
            }
        }
        
        // Buscar en emocional
        for (const [key, data] of Object.entries(knowledgeBase.emotional)) {
            if (data.keywords.some(k => msg.includes(k))) {
                return { category: 'emotional', key, data };
            }
        }
        
        // Buscar en sistema
        for (const [key, data] of Object.entries(knowledgeBase.system)) {
            if (data.keywords.some(k => msg.includes(k))) {
                return { category: 'system', key, data };
            }
        }
        
        // Buscar en técnico
        for (const [key, data] of Object.entries(knowledgeBase.technical)) {
            if (data.keywords.some(k => msg.includes(k))) {
                return { category: 'technical', key, data };
            }
        }
        
        return null;
    }

    function generateResponse(message) {
        const detected = detectCategory(message);
        
        if (detected) {
            return {
                text: detected.data.text,
                category: detected.category,
                topic: detected.key
            };
        }
        
        // Respuesta por defecto
        return {
            text: "¿Podrías darme más detalles para ayudarte mejor? 🤔\n\nPuedo apoyarte con:\n\n💙 **Apoyo emocional** cuando te sientas frustrado/a, ansioso/a, bloqueado/a, o cualquier emoción relacionada con aprender a dibujar.\n\n🎨 **Dudas técnicas** sobre:\n- Módulo 1: Línea de acción, proporciones, croquis, perspectiva\n- Módulo 2: Anatomía del cuerpo, manos, pies, músculos\n- Módulo 3: Valores tonales, iluminación, composición, texturas\n\n📚 **Uso del sistema** para subir ejercicios, ver tu progreso, saber qué materiales necesitas, o cuánto tiempo practicar.\n\n¿Qué te gustaría explorar?",
            category: 'default'
        };
    }

    // ============================================
    // MEMORIA CONVERSACIONAL
    // ============================================
    
    class ConversationMemory {
        constructor() {
            this.history = [];
            this.emotionalState = [];
        }
        
        add(userMsg, botResponse, emotion) {
            this.history.push({
                user: userMsg,
                bot: botResponse,
                timestamp: new Date(),
                emotion
            });
            
            if (emotion) {
                this.emotionalState.push({ 
                    emotion, 
                    timestamp: new Date() 
                });
            }
        }
        
        shouldOfferBreak() {
            const recent = this.emotionalState.slice(-3);
            const negative = [
                'frustracion', 'ansiedad', 'ansiedadGeneral', 'ansiedadEvaluacion', 
                'ansiedadSocial', 'bloqueoCreativo', 'llanto', 'burnout', 
                'overwhelm', 'culpa', 'miedoPublico', 'dueloArtistico'
            ];
            
            return recent.length >= 3 && recent.every(e => negative.includes(e.emotion));
        }
        
        getContextualGreeting() {
            if (this.history.length === 0) return null;
            
            const lastEmotion = this.emotionalState[this.emotionalState.length - 1];
            if (!lastEmotion) return null;
            
            const timeSince = Date.now() - lastEmotion.timestamp.getTime();
            const hoursSince = timeSince / (1000 * 60 * 60);
            
            if (hoursSince < 24) {
                return "Hola de nuevo 👋 ¿Cómo te fue con lo que hablamos?\n\n¿Mejoraron las cosas o sigues con dudas? Estoy aquí para apoyarte.";
            }
            
            return null;
        }
    }

    // ============================================
    // EXPORTAR AL SCOPE GLOBAL
    // ============================================
    
    window.mentorKnowledge = {
        generateResponse,
        ConversationMemory,
        
        // Utilidades para testing
        getStats: function() {
            return {
                basic: Object.keys(knowledgeBase.basic).length,
                emotional: Object.keys(knowledgeBase.emotional).length,
                technical: Object.keys(knowledgeBase.technical).length,
                system: Object.keys(knowledgeBase.system).length,
                total: Object.keys(knowledgeBase.basic).length + 
                       Object.keys(knowledgeBase.emotional).length + 
                       Object.keys(knowledgeBase.technical).length +
                       Object.keys(knowledgeBase.system).length
            };
        },
        
        testResponse: function(message) {
            console.log('🧪 Testing:', message);
            const response = generateResponse(message);
            console.log('📤 Response:', response);
            return response;
        },
        
        getExamples: function() {
            return {
                basic: ['hola', 'gracias', 'ayuda', 'adiós'],
                emotional: [
                    'me siento frustrado',
                    'tengo ansiedad por la evaluación',
                    'síndrome del impostor',
                    'todos dibujan mejor que yo',
                    'estoy bloqueado'
                ],
                technical: [
                    '¿cómo hago la línea de acción?',
                    'no me salen las manos',
                    '¿qué son los valores tonales?',
                    'cómo medir proporciones'
                ],
                system: [
                    '¿cómo subo ejercicios?',
                    '¿qué materiales necesito?',
                    '¿dónde veo mi progreso?'
                ]
            };
        }
    };

    // ============================================
    // INICIALIZACIÓN Y LOGS
    // ============================================
    
    console.log('✅ MENTOR ANATÓMICO v6.0 COMPLETO CARGADO');
    console.log('┌────────────────────────────────────────────┐');
    console.log('│  🎨 MENTOR ANATÓMICO v6.0 - COMPLETO      │');
    console.log('├────────────────────────────────────────────┤');
    const stats = window.mentorKnowledge.getStats();
    console.log('│  💬 Conversación básica: ' + stats.basic + '                │');
    console.log('│  💙 Apoyo emocional: ' + stats.emotional + '                  │');
    console.log('│  🎨 Dudas técnicas: ' + stats.technical + '                   │');
    console.log('│  📚 Sistema y curso: ' + stats.system + '                    │');
    console.log('│  📝 TOTAL respuestas: ' + stats.total + '                  │');
    console.log('└────────────────────────────────────────────┘');
    console.log('');
    console.log('💙 CARACTERÍSTICAS v6.0:');
    console.log('  ✅ Conversación 100% natural sin botones');
    console.log('  ✅ Respuestas completas y detalladas');
    console.log('  ✅ Cobertura total del PDF de preguntas');
    console.log('  ✅ 70+ temas disponibles');
    console.log('  ✅ Sistema de memoria conversacional');
    console.log('  ✅ Compatible con index.html, module1.html, module3.html');
    console.log('');
    console.log('🧪 TESTING:');
    console.log('  window.mentorKnowledge.testResponse("como hago la linea de accion")');
    console.log('  window.mentorKnowledge.testResponse("tengo ansiedad")');
    console.log('  window.mentorKnowledge.getStats()');
    console.log('  window.mentorKnowledge.getExamples()');
    console.log('');
    console.log('🚀 Sistema listo para conversación natural!');

})();
