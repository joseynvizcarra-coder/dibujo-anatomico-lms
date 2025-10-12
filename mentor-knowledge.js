// ============================================
    // 7. EXPORTAR AL SCOPE GLOBAL CON NAVEGACIÓN
    // ============================================
    window.mentorKnowledge = {
        // Función principal
        generateResponse,
        
        // Clases
        ConversationMemory,
        
        // Utilidades
        detectQuery,
        handleAction: function(actionText, context = {}) {
            // Esta función maneja clicks en botones de acción
            return generateResponse(actionText, context);
        },
        
        // Datos exportados (debugging)
        _emotional: emotionalKnowledge,
        _technical: technicalKnowledge,
        _basic: basicConversation,
        
        // Estadísticas
        getEmotionalCount: () => Object.keys(emotionalKnowledge).length,
        getTechnicalCount: () => Object.keys(technicalKnowledge).length,
        getBasicCount: () => Object.keys(basicConversation).length,
        getTotalResponses: () => {
            return Object.keys(emotionalKnowledge).length + 
                   Object.keys(technicalKnowledge).length +
                   Object.keys(basicConversation).length;
        },
        getAllKeywords: () => {
            const emotional = Object.values(emotionalKnowledge).flatMap(e => e.keywords);
            const technical = Object.values(technicalKnowledge).flatMap(t => t.keywords);
            const basic = Object.values(basicConversation).flatMap(b => b.keywords);
            return [...emotional, ...technical, ...basic];
        },
        
        // Test de respuestas
        testResponse: function(message) {
            console.log('🧪 Testing:', message);
            const response = generateResponse(message);
            console.log('📤 Response:', response);
            return response;
        },
        
        // Lista de ejemplos de consultas
        getExamples: () => ({
            emocional: [
                'me siento frustrado',
                'estoy bloqueado',
                'tengo miedo de entregar',
                'no puedo dibujar esto',
                'otros dibujan mejor que yo'
            ],
            tecnico: [
                '¿cómo dibujar línea de acción?',
                'no me salen las manos',
                '¿qué son los valores tonales?',
                'proporciones del cuerpo',
                'anatomía muscular'
            ],
            sistema: [
                '¿cómo subo ejercicios?',
                '¿qué materiales necesito?',
                '¿dónde veo mi progreso?',
                'referencias digitales',
                'libros de loomis'
            ],
            basico: [
                'hola',
                'gracias',
                'ayuda',
                'adiós'
            ]
        })
    };

    // ============================================
    // 8. INICIALIZACIÓN Y LOGS
    // ============================================
    console.log('✅ mentor-knowledge.js v2.0 MEJORADO: Cargado exitosamente');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 ESTADÍSTICAS:');
    console.log('  💙 Respuestas emocionales:', Object.keys(emotionalKnowledge).length);
    console.log('  🎨 Respuestas técnicas:', Object.keys(technicalKnowledge).length);
    console.log('  💬 Conversación básica:', Object.keys(basicConversation).length);
    console.log('  📝 Total respuestas:', window.mentorKnowledge.getTotalResponses());
    console.log('  🔑 Keywords totales:', window.mentorKnowledge.getAllKeywords().length);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('💙 MEJORAS v2.0:');
    console.log('  ✅ Saludos y conversación básica');
    console.log('  ✅ Navegación de botones funcional');
    console.log('  ✅ Handlers de acciones contextuales');
    console.log('  ✅// ============================================
// MENTOR ANATÓMICO v2.0 - BASE DE CONOCIMIENTO COMPLETA
// Integra: ChatGPT JSON emocional + mentor.html técnico + conocimiento original
// ============================================

(function() {
    'use strict';

    // ============================================
    // 1. BASE DE CONOCIMIENTO EMOCIONAL (15 situaciones - TONO TIERNO)
    // ============================================
    const emotionalKnowledge = {
        frustracionGeneral: {
            keywords: ['frustrado', 'frustrada', 'no sale', 'no puedo', 'odio esto', 'nada resulta'],
            nivelIntensidad: 'medio',
            responses: {
                text: "Respira un segundo 💙. Lo que sientes es más común de lo que crees; tu cerebro está saturado, no incapaz. A veces, el trazo no fluye porque la mente está tensa, no porque no sepas dibujar.",
                microDialogo: [
                    { tipo: 'mentor', texto: '¿Quieres que te ayude a soltar un poco la mano o prefieres descansar 5 minutos?' },
                    { tipo: 'opciones', opciones: ['Soltar la mano', 'Descansar 5 min', 'Continuar solo'] }
                ],
                accionConcreta: "Haz una pausa breve, relaja cuello y hombros, respira 4-4-6 (inhala 4 seg, sostén 4 seg, exhala 6 seg) y vuelve con ojos frescos.",
                actions: ['Dame un ejercicio para soltar', 'Voy a descansar', 'Estoy mejor']
            }
        },

        comparacion: {
            keywords: ['dibujan mejor', 'soy malo', 'soy mala', 'comparando', 'otros avanzan', 'mejor que yo', 'peor que'],
            nivelIntensidad: 'medio',
            responses: {
                text: "Ay… eso duele, lo sé 💙. Pero recuerda: aquí no hay competencia, solo ritmo personal. Casi la mitad del curso sintió lo mismo al inicio, y cada uno avanzó desde su propio trazo.\n\n**Verdad liberadora:** Compararte con otros es comparar tu Capítulo 3 con el Capítulo 20 de alguien más. No es justo ni útil.",
                microDialogo: [
                    { tipo: 'mentor', texto: '¿Viste algún dibujo de un compañero que te hizo sentir así?' },
                    { tipo: 'opciones', opciones: ['Sí, varios', 'Solo uno', 'En Instagram'] }
                ],
                accionConcreta: "Mira tu primer dibujo del curso y uno actual: nota un cambio positivo, por mínimo que sea, y anótalo. Esa es tu única comparación válida.",
                actions: ['¿Cómo dejo de compararme?', 'Tienes razón', 'Voy a intentarlo']
            }
        },

        sindromeImpostor: {
            keywords: ['no tengo talento', 'no sirvo', 'no soy bueno', 'no soy buena', 'no nací para esto', 'impostor'],
            nivelIntensidad: 'alto',
            responses: {
                text: "Esa voz interna no es objetiva, es el miedo hablando 💙. Dibujar no depende del talento, sino de la práctica sostenida. El 47% de tus compañeros lo sintió igual, y hoy dominan proporciones y gesto.\n\n**Verdad científica:** El 'talento' es solo práctica acumulada + constancia. Nada más.",
                microDialogo: [
                    { tipo: 'mentor', texto: '¿Cuántos días llevas practicando seguido?' },
                    { tipo: 'opciones', opciones: ['Pocos (1-3 días)', 'Algunos (4-7 días)', 'Bastantes (8+ días)'] }
                ],
                accionConcreta: "Escribe 'estoy aprendiendo' en tu cuaderno y haz un dibujo continuo de 2 min sin levantar el lápiz. Sin borrar, sin juzgar.",
                actions: ['Necesito más motivación', 'Lo haré', 'Gracias 💙']
            }
        },

        bloqueoCreativo: {
            keywords: ['bloqueado', 'bloqueada', 'sin ideas', 'atascado', 'atascada', 'no sé qué hacer', 'vacío'],
            nivelIntensidad: 'medio',
            responses: {
                text: "Estar bloqueado no significa estar vacío. Significa que tu mente necesita un respiro. A veces el mejor avance es dejar de empujar.\n\n**Secreto:** El bloqueo es falta de INPUT (referencias, inspiración), no falta de talento.",
                microDialogo: [
                    { tipo: 'mentor', texto: '¿Sientes el bloqueo más en la cabeza o en la mano?' },
                    { tipo: 'opciones', opciones: ['En la cabeza', 'En la mano', 'En ambos'] }
                ],
                accionConcreta: "Haz un croquis de tu taza, celular o mano durante 2 minutos. Solo observa, sin corregir. Esto resetea tu cerebro.",
                actions: ['Dame referencias', 'Voy a probar', 'Entiendo']
            }
        },

        ansiedadEvaluacion: {
            keywords: ['miedo', 'entregar', 'evaluación', 'ansioso', 'ansiosa', 'temor', 'nervios', 'evaluacion'],
            nivelIntensidad: 'alto',
            responses: {
                text: "Respira. Esta entrega no define tu talento, solo muestra tu proceso 💙. Muchos sintieron lo mismo antes del primer envío, y luego descubrieron que el miedo era más grande que el error.\n\n**Perspectiva:** Tu profesor evalúa ESFUERZO y PROGRESO, no perfección.",
                microDialogo: [
                    { tipo: 'mentor', texto: '¿Tu miedo es más a que no te salga bien o a lo que piense el profesor?' },
                    { tipo: 'opciones', opciones: ['Al profesor', 'A que salga mal', 'Ambos'] }
                ],
                accionConcreta: "Haz tres respiraciones 4-4-6 y repite: 'Mi dibujo muestra mi proceso, no mi límite'. Luego entrega.",
                actions: ['Necesito calmarme', 'Voy a entregar', 'Gracias']
            }
        },

        desanimoNocturno: {
            keywords: ['tarde', 'madrugada', 'cansado', 'cansada', 'agotado', 'agotada', '3am', '2am', 'trasnoche'],
            nivelIntensidad: 'alto',
            responses: {
                text: "Wow, sigues dibujando a esta hora 🌙. Eso dice mucho de tu compromiso, pero también de tu cansancio. El cuerpo y la mente necesitan pausa para procesar lo aprendido.\n\n**Ciencia del sueño:** Tu cerebro consolida el aprendizaje MIENTRAS duermes. Dibujar cansado = entrenar mal.",
                microDialogo: [
                    { tipo: 'mentor', texto: '¿Te gustaría que te recuerde parar dentro de 10 min y continuar mañana?' },
                    { tipo: 'opciones', opciones: ['Sí, ayúdame a parar', 'Solo 10 min más', 'Ya voy a dormir'] }
                ],
                accionConcreta: "Cierra la sesión tras 10 min, hidrátate y duerme. Tu cerebro consolidará lo practicado mientras descansas.",
                actions: ['Convénceme de dormir', 'Tienes razón', 'Una última cosa']
            }
        },

        inseguridadCorporal: {
            keywords: ['manos', 'pies', 'cabeza', 'proporciones raras', 'deforme', 'me salen raras'],
            nivelIntensidad: 'medio',
            responses: {
                text: "Sí, esas partes son las más traicioneras 😅. Pero no porque sean imposibles, sino porque concentran mucho detalle. El truco está en simplificar antes de detallar.\n\n**Verdad:** Todos dibujamos manos raras al principio. TODOS. Incluso Da Vinci.",
                microDialogo: [
                    { tipo: 'mentor', texto: '¿Quieres que repasemos juntos las masas básicas de la mano o prefieres hacer un ejercicio rápido?' },
                    { tipo: 'opciones', opciones: ['Repasar teoría', 'Ejercicio rápido', 'Ambos'] }
                ],
                accionConcreta: "Haz tres contornos ciegos de tu mano o pie en 2 min cada uno, sin levantar el lápiz. Esto entrena observación real, no memoria.",
                actions: ['Dame la teoría', 'Voy al ejercicio', 'Gracias']
            }
        },

        faltaMotivacion: {
            keywords: ['no quiero', 'sin ganas', 'aburrido', 'aburrida', 'me da lata', 'flojera'],
            nivelIntensidad: 'bajo',
            responses: {
                text: "A veces la motivación no llega antes de empezar, llega mientras lo haces 💙. Si hoy no tienes ganas, reduce la exigencia: dibuja algo mínimo, sin metas grandes.\n\n**Truco:** Comprométete a 5 minutos. SOLO 5. Usualmente continuarás.",
                microDialogo: [
                    { tipo: 'mentor', texto: '¿Qué parte te da más flojera: empezar o seguir?' },
                    { tipo: 'opciones', opciones: ['Empezar', 'Seguir', 'Todo'] }
                ],
                accionConcreta: "Dibuja solo 5 líneas gestuales sin pensar. Si fluye, continúa; si no, cuenta igual como práctica.",
                actions: ['Dame algo fácil', 'Voy a intentar', 'OK']
            }
        },

        confusionTecnica: {
            keywords: ['no entiendo', 'proporción', 'perspectiva', 'anatomía', 'anatomia', 'me confundo', 'confundido'],
            nivelIntensidad: 'medio',
            responses: {
                text: "Es normal que la teoría se mezcle al principio. Nadie logra precisión sin pasar por confusión. Eso significa que estás procesando lo aprendido 🧠.\n\n**Verdad:** La confusión es pre-aprendizaje. Estás más cerca de lo que crees.",
                microDialogo: [
                    { tipo: 'mentor', texto: '¿Qué te confunde más, las proporciones o la estructura anatómica?' },
                    { tipo: 'opciones', opciones: ['Proporciones', 'Anatomía', 'Todo'] }
                ],
                accionConcreta: "Simplifica: dibuja solo las 3 masas principales (cabeza, torso, pelvis) como óvalos conectados. Nada más por 10 min.",
                actions: ['Explícame proporciones', 'Explícame anatomía', 'Dame ejercicio']
            }
        },

        autoexigencia: {
            keywords: ['debería', 'ya debería', 'tarde', 'lento', 'lenta', 'no avanzo', 'muy lento'],
            nivelIntensidad: 'medio',
            responses: {
                text: "Esa presión interna suele venir del perfeccionismo. Pero este curso no mide velocidad, mide constancia. El ojo necesita tiempo para 're-aprender a mirar'.\n\n**Dato:** El progreso NO es lineal. Algunos días avanzas, otros consolidas.",
                microDialogo: [
                    { tipo: 'mentor', texto: '¿Has notado algún cambio mínimo desde que empezaste?' },
                    { tipo: 'opciones', opciones: ['Sí, algo', 'No lo sé', 'No veo cambios'] }
                ],
                accionConcreta: "Haz una foto de tu dibujo actual y compárala con el primero del curso. Observa avances sutiles (líneas más seguras, mejor proporción, etc.).",
                actions: ['No veo progreso', 'Sí veo algo', 'Gracias']
            }
        },

        agobioProyecto: {
            keywords: ['proyecto', 'final', 'me abruma', 'no voy a poder', 'mucho trabajo', 'proyecto final'],
            nivelIntensidad: 'alto',
            responses: {
                text: "Es normal sentir que el proyecto final pesa. Pero recuerda: no parte desde cero, parte desde todo lo que ya aprendiste 💙.\n\n**Estrategia:** No pienses en el proyecto completo. Piensa en el siguiente paso de 15 minutos.",
                microDialogo: [
                    { tipo: 'mentor', texto: '¿Qué parte te abruma más: planificar o ejecutar?' },
                    { tipo: 'opciones', opciones: ['Planificar', 'Ejecutar', 'Ambas'] }
                ],
                accionConcreta: "Divide el proyecto en tres mini-tareas de 15 min: 1) boceto rápido, 2) estructura, 3) valores. Haz solo la primera hoy.",
                actions: ['Ayúdame a planificar', 'Necesito motivación', 'Gracias']
            }
        },

        dudaExistencial: {
            keywords: ['ser bueno', 'ser buena', 'mejorar', 'nunca seré', 'vale la pena', 'algún día'],
            nivelIntensidad: 'alto',
            responses: {
                text: "Esa pregunta es la más humana 💙. Todos los artistas la hemos tenido. La respuesta es: sí, pero no en un solo dibujo. Serás bueno cuando sigas dibujando incluso con dudas.\n\n**Verdad dura:** No existe el 'momento mágico'. Solo existe la práctica acumulada.",
                microDialogo: [
                    { tipo: 'mentor', texto: '¿Quieres que te muestre una rutina diaria de mejora progresiva?' },
                    { tipo: 'opciones', opciones: ['Sí, por favor', 'No, solo necesitaba desahogarme', 'Dame ánimos'] }
                ],
                accionConcreta: "Haz 1 croquis de 2 min por día, todos los días, sin borrar. En 12 días verás la diferencia. Es ciencia del hábito, no suerte.",
                actions: ['Dame la rutina', 'Necesito motivación', 'Gracias']
            }
        },

        errorTecnico: {
            keywords: ['arruiné', 'se echó a perder', 'me salió mal', 'borré todo', 'error', 'equivocación'],
            nivelIntensidad: 'medio',
            responses: {
                text: "No lo arruinaste: acabas de generar un nuevo punto de aprendizaje 🖤. Los errores en anatomía son guías visuales, no fracasos.\n\n**Perspectiva:** Los artistas profesionales tienen MILES de dibujos 'arruinados'. Eso es normal.",
                microDialogo: [
                    { tipo: 'mentor', texto: '¿Qué parte crees que se dañó más?' },
                    { tipo: 'opciones', opciones: ['La cabeza', 'Las proporciones', 'Todo'] }
                ],
                accionConcreta: "Repite la parte con error tres veces en pequeño formato en tu hoja, sin borrar entre intentos. Al tercer intento, el cerebro corrige automáticamente.",
                actions: ['Voy a intentar', 'Necesito repasar', 'Gracias']
            }
        },

        desconexionEmocional: {
            keywords: ['no siento', 'vacío', 'vacía', 'me da igual', 'sin emoción', 'sin pasión'],
            nivelIntensidad: 'alto',
            responses: {
                text: "A veces, la rutina apaga el asombro inicial. Pero sigue ahí, solo escondido bajo el cansancio. Volverás a sentirlo cuando recuerdes por qué empezaste 💙.\n\n**Pregunta honesta:** ¿Por qué empezaste a dibujar originalmente?",
                microDialogo: [
                    { tipo: 'mentor', texto: '¿Qué fue lo primero que te hizo amar el dibujo?' },
                    { tipo: 'opciones', opciones: ['Un artista específico', 'Un dibujo que vi', 'No lo recuerdo'] }
                ],
                accionConcreta: "Busca una referencia visual que te motive (obra, artista, pose) y haz un dibujo libre sin meta académica. Solo por placer.",
                actions: ['Ayúdame a recordar', 'Necesito inspiración', 'Gracias']
            }
        },

        saturacionVisual: {
            keywords: ['no veo nada', 'saturado', 'saturada', 'mirando mucho rato', 'cansado de mirar'],
            nivelIntensidad: 'medio',
            responses: {
                text: "Cuando miras tanto tiempo tu obra, dejas de verla. El ojo necesita descansar para volver a percibir diferencias. Alejarse también es parte del proceso.\n\n**Técnica profesional:** Los artistas profesionales dejan sus obras y vuelven al día siguiente. Ven errores al instante.",
                microDialogo: [
                    { tipo: 'mentor', texto: '¿Llevas muchas horas seguidas mirando lo mismo?' },
                    { tipo: 'opciones', opciones: ['Sí, horas', 'Sí, toda la tarde', 'No tanto'] }
                ],
                accionConcreta: "Aleja tu dibujo 1 metro y míralo de reojo 10 seg. También puedes verlo en un espejo o fotografiarlo. Luego descansa mínimo 30 min.",
                actions: ['Voy a descansar', 'Dame otro truco', 'OK']
            }
        }
    };

    // ============================================
    // 2. BASE DE CONOCIMIENTO TÉCNICO AMPLIADA (40 respuestas)
    // ============================================
    const technicalKnowledge = {
        // ==================== MÓDULO 1: Observación y Gesto (12) ====================
        lineaAccion: {
            keywords: ['linea de accion', 'linea accion', 'gesto', 'movimiento', 'dinamica', 'direccion'],
            module: 'modulo1',
            responses: {
                title: "Línea de Acción",
                text: "**Línea de acción** = La curva imaginaria que atraviesa el cuerpo mostrando su movimiento principal.\n\n**Cómo encontrarla:**\n1. Ignora todos los detalles\n2. Busca la curva desde cabeza a pies\n3. Dibújala en 1 segundo\n4. Todo lo demás se construye sobre ella\n\n**Formas base:** 'S', 'C' o línea recta.\n\n**Tip:** Croquis empieza SIEMPRE con la línea de acción. Es el ALMA del dibujo.",
                actions: ['Dame un ejemplo visual', 'Entendido', 'Ejercicio para practicar']
            }
        },

        medirProporcion: {
            keywords: ['medir', 'proporcion', 'proporciones', 'lapiz', 'medicion', 'como medir'],
            module: 'modulo1',
            responses: {
                title: "Método del Lápiz",
                text: "**Medir con el lápiz (técnica profesional):**\n\n1. **Estira el brazo COMPLETO** (codo bloqueado)\n2. **Cierra un ojo** para eliminar paralaje\n3. **Alinea la punta del lápiz** con punto superior\n4. **Marca con el pulgar** el punto inferior\n5. **Usa esa 'unidad'** para comparar\n\n**Proporción básica:** Cuerpo humano = 7.5-8 cabezas de altura.\n\n**Error común:** Doblar el codo cambia TODO.\n\n**Práctica:** Mide objetos simples primero (botellas, cajas).",
                actions: ['¿Cómo practico esto?', 'Claro', 'Canon 7.5 cabezas']
            }
        },

        contrapposto: {
            keywords: ['contrapposto', 'contraposto', 'peso', 'cadera', 'hombros', 'balance peso'],
            module: 'modulo1',
            responses: {
                title: "Contrapposto y Balance",
                text: "**Contrapposto** = Cuando el cuerpo pone peso en una pierna, creando ángulos opuestos.\n\n**Regla de oro:**\n- Cadera SUBE del lado donde hay peso\n- Hombro BAJA del mismo lado\n- Columna forma 'S'\n\n**Por qué importa:** Hace poses naturales, no rígidas como soldados.\n\n**Ejercicio:** Párate frente al espejo, pon peso en una pierna. Observa cómo tu cuerpo se ajusta automáticamente.\n\n**En dibujo:** Marca primero el pie de apoyo, luego construye todo sobre ese punto.",
                actions: ['Ah, ya veo', '¿Cómo lo dibujo?', 'Punto de apoyo']
            }
        },

        croquis2min: {
            keywords: ['croquis rapido', 'croquis 2', '2 minutos', 'rapido', 'tiempo', 'croquis'],
            module: 'modulo1',
            responses: {
                title: "Croquis Rápidos (2 minutos)",
                text: "**Distribución del tiempo:**\n\n- **0-10 seg:** Línea de acción (UNA línea)\n- **10-40 seg:** Masas principales (cabeza, torso, pelvis)\n- **40-100 seg:** Brazos y piernas como cilindros\n- **100-120 seg:** Manos/pies (formas simples)\n\n**❌ PROHIBIDO:**\n- Borrar\n- Detalles (ojos, dedos, ropa)\n- Dudar o parar\n\n**✅ PERMITIDO:**\n- Líneas sucias\n- 'Fealdad'\n- Avanzar siempre\n\n**Objetivo:** CAPTURAR energía, no embellecer.\n\n**Dato:** El 80% de estudiantes mejora la fluidez haciendo 10 croquis de 2 min vs. 1 de 20 min.",
                actions: ['¿Dónde practico?', 'Entendido', 'Referencias gratis']
            }
        },

        puntoApoyo: {
            keywords: ['punto de apoyo', 'apoyo', 'equilibrio', 'balance', 'pie apoyo'],
            module: 'modulo1',
            responses: {
                title: "Punto de Apoyo",
                text: "**Punto de apoyo** = Donde el cuerpo toca el suelo y sostiene el peso.\n\n**En poses parado:**\n- 1 pierna: punto bajo ese pie\n- 2 piernas: puntos en ambos pies\n- Sentado: glúteos + pies\n\n**Truco visual:** Imagina línea vertical desde ombligo. Debe caer dentro del área de apoyo.\n\n**Si no:** La figura se ve como que va a caer.\n\n**Error común:** Dibujar pies 'flotando'. Siempre marca contacto con suelo.",
                actions: ['Claro', 'Dame un ejemplo', 'Contrapposto']
            }
        },

        balanceVisual: {
            keywords: ['balance', 'balanceado', 'estable', 'inestable', 'equilibrio visual'],
            module: 'modulo1',
            responses: {
                title: "Balance Visual",
                text: "**Balance = distribución del peso para no caer.**\n\n**Checkeo rápido:**\n1. Dibuja línea vertical desde cuello\n2. ¿Cae entre los pies? ✅ Estable\n3. ¿Cae fuera? ❌ Se va a caer\n\n**En movimiento:** El balance se rompe INTENCIONALMENTE (corriendo, saltando).\n\n**Tip profesional:** Mírate al espejo parado en una pierna. Observa cómo tu cuerpo se ajusta automáticamente.\n\n**Regla:** Centro de gravedad SIEMPRE sobre área de apoyo (excepto en acción dinámica).",
                actions: ['Entiendo', '¿Y en acción?', 'Punto de apoyo']
            }
        },

        proporcionesBasicas: {
            keywords: ['proporciones basicas', 'canon', 'medidas', 'altura', '7.5 cabezas'],
            module: 'modulo1',
            responses: {
                title: "Proporciones Básicas",
                text: "**Canon ideal del cuerpo humano:**\n\n- **Adulto:** 7.5-8 cabezas de altura\n- **Ombligo:** mitad del cuerpo (aprox)\n- **Brazos extendidos:** mismo ancho que altura\n- **Manos:** desde mentón a cejas\n- **Pies:** 1 cabeza de largo\n- **Hombros:** 2-3 cabezas de ancho\n\n**IMPORTANTE:** No memorices. Observa personas reales.\n\nLas proporciones varían (alto, bajo, delgado, robusto). Estas son GUÍA.\n\n**Tip:** Tu ojo + medición > cualquier regla matemática.",
                actions: ['OK, observaré más', 'Método del lápiz', 'Gracias']
            }
        },

        observacion: {
            keywords: ['observar', 'observacion', 'ver', 'mirar', 'como observar', 'vision'],
            module: 'modulo1',
            responses: {
                title: "Observación Efectiva",
                text: "**Técnica de observación profesional:**\n\n**1. Visión global primero**\nForma general → Masas → Detalles (en ese orden)\n\n**2. Dibuja lo que VES, no lo que SABES**\nEjemplo: No dibujes 'mano', dibuja 'estas 5 formas'.\n\n**3. Medición constante**\nCompara todo con todo. 'Este brazo es 2x la cabeza'\n\n**4. Tiempo de observación**\nMira 30 seg ANTES de dibujar. Mejora 10x tu resultado.\n\n**Ejercicio:** Dibuja un objeto sin mirarlo (contorno ciego). Luego compara. Entrena conexión ojo-mano.",
                actions: ['Voy a practicar', 'Contorno ciego', 'Interesante']
            }
        },

        croquis5min: {
            keywords: ['croquis 5', '5 minutos', 'mediano', 'croquis medio'],
            module: 'modulo1',
            responses: {
                title: "Croquis de 5 Minutos",
                text: "**Distribución del tiempo (5 min):**\n\n- **0-30 seg:** Línea de acción + composición\n- **30-120 seg:** 3 masas corporales (cabeza, torso, pelvis)\n- **120-240 seg:** Extremidades (brazos, piernas como cilindros)\n- **240-300 seg:** Refinamiento + manos/pies básicos\n\n**Diferencia vs. 2 min:** Puedes agregar indicación anatómica básica.\n\n**Permitido:**\n- Indicar grupos musculares principales\n- Manos/pies con dedos simplificados\n- Líneas más limpias\n\n**Objetivo:** Estructura sólida + gesto preservado.",
                actions: ['Entendido', 'Dame referencias', 'Croquis 2 min']
            }
        },

        ritmo: {
            keywords: ['ritmo', 'flujo', 'fluidez', 'lineas fluidas', 'movimiento fluido'],
            module: 'modulo1',
            responses: {
                title: "Ritmo y Flujo",
                text: "**Ritmo** = El 'flow' de líneas que guían el ojo a través del dibujo.\n\n**Técnica:**\n- Usa líneas curvas largas\n- Evita líneas entrecortadas\n- Conecta partes del cuerpo visualmente\n- Piensa en 'S', 'C', líneas ondulantes\n\n**Ejercicio de fluidez:**\n1. Dibuja 10 líneas curvas fluidas (30 seg)\n2. Sin levantar el lápiz, dibuja figura completa (2 min)\n3. Enfócate en FLUJO, no precisión\n\n**Secreto:** Mueve el brazo completo, no solo la muñeca. Líneas más fluidas.",
                actions: ['Voy a practicar', 'Entendido', 'Línea de acción']
            }
        },

        simplificacion: {
            keywords: ['simplificar', 'simplificacion', 'simple', 'basico', 'formas simples'],
            module: 'modulo1',
            responses: {
                title: "Simplificación de Formas",
                text: "**Principio fundamental:** Todo complejo es COMPOSICIÓN de formas simples.\n\n**Proceso de simplificación:**\n1. **Identifica la forma base:** círculo, cuadrado, triángulo\n2. **Ignora detalles:** músculos, texturas, ropa\n3. **Dibuja el volumen simple:** esfera, cubo, cilindro\n4. **Construye sobre eso:** agrega detalles gradualmente\n\n**Ejemplo:**\n- Cabeza = esfera\n- Torso = caja\n- Brazos = cilindros\n- Manos = rectángulo + 5 cilindros\n\n**Error común:** Empezar con detalles. Empieza con bloques.\n\n**Ejercicio:** Dibuja personas como figuras de palitos 3D durante 1 semana. Luego agrega forma.",
                actions: ['Dame ejemplos', 'Entendido', '3 masas corporales']
            }
        },

        velocidadTrazo: {
            keywords: ['trazo lento', 'dibujo rapido', 'velocidad', 'rapidez', 'trazos seguros'],
            module: 'modulo1',
            responses: {
                title: "Velocidad y Seguridad del Trazo",
                text: "**Trazos lentos = trazos temblorosos.**\n\n**Técnica profesional:**\n- Traza RÁPIDO para líneas fluidas\n- Mueve el brazo completo (hombro)\n- No dibujes con muñeca (líneas cortas)\n- Acepta la 'imprecisión' inicial\n\n**Ejercicio de velocidad:**\n1. Dibuja 20 líneas rectas rápidas (1 min)\n2. Dibuja 20 círculos rápidos (1 min)\n3. Dibuja figura completa con trazos seguros (3 min)\n\n**Verdad:** Precisión viene CON velocidad, no antes.\n\n**Tip:** Si borras mucho, estás yendo muy lento. Acelera.",
                actions: ['Voy a practicar', 'Ejercicios específicos', 'Entendido']
            }
        },

        // ==================== MÓDULO 2: Anatomía Funcional (13) ====================
        tresMasas: {
            keywords: ['3 masas', 'tres masas', 'masas', 'bloques', 'torso', 'masas corporales'],
            module: 'modulo2',
            responses: {
                title: "Las 3 Masas Corporales",
                text: "**Las 3 masas fundamentales:**\n\n1. **CABEZA** = Esfera/huevo (incluye cuello)\n2. **TORSO** = Caja de costillas (mayor volumen)\n3. **PELVIS** = Cubo/cuenco invertido\n\n**Por qué importa:** Son los bloques que NO se deforman mucho. Todo (brazos, piernas) se conecta A ellos.\n\n**Error común:** Dibujar torso como línea. Es VOLUMEN 3D.\n\n**Técnica:**\n- Dibuja cada masa como forma 3D\n- Define el ángulo entre ellas\n- Conecta con cuello y cintura\n- Luego agrega extremidades\n\n**Práctica:** Dibuja solo estas 3 masas en 10 poses diferentes. Ignora todo lo demás.",
                actions: ['Entendido', 'Dame un ejercicio', 'Estructura 3D']
            }
        },

        gruposMusculares: {
            keywords: ['musculos', 'musculares', '6 grupos', 'grupos musculares', 'anatomia muscular'],
            module: 'modulo2',
            responses: {
                title: "6 Grupos Musculares Esenciales",
                text: "**Los 6 grupos que DEBES conocer:**\n\n1. **Trapecio** (cuello a hombros) - forma de trapecio\n2. **Pectorales** (pecho) - abanico desde esternón\n3. **Deltoides** (hombros) - gota invertida\n4. **Abdominales** (core) - 'six-pack' + oblicuos\n5. **Glúteos** (cadera) - forma redondeada\n6. **Cuádriceps** (muslos) - 4 músculos frontales\n\n**No necesitas anatomía médica.** Solo formas básicas.\n\n**Tip:** Piensa en ellos como 'bultos' que cambian la silueta.\n\n**Proceso:**\n1. Dibuja esqueleto simple (3 masas)\n2. Agrega estos 6 grupos como formas\n3. Conecta naturalmente\n\n**Error:** Dibujar músculos sin estructura. Primero bloques, luego anatomía.",
                actions: ['OK', '¿Cómo memorizo?', '3 masas']
            }
        },

        manosPies: {
            keywords: ['manos', 'pies', 'dedos', 'mano', 'pie', 'extremidades'],
            module: 'modulo2',
            responses: {
                title: "Manos y Pies Simplificados",
                text: "**MANOS:**\n- **Palma** = rectángulo con grosor (NO plano)\n- **Dedos** = 3 cilindros cada uno (falanges)\n- **Pulgar** = LATERAL, no frontal (2 falanges)\n- **Articulaciones** = esferas pequeñas\n\n**PIES:**\n- **Pie** = cuña/triángulo 3D (NO plano)\n- **Talón** = parte más ancha\n- **Dedos** = pequeños cilindros\n- **Arco** = curva desde talón a dedos\n\n**Error #1:** Dibujar contorno sin estructura 3D.\n\n**Solución:** SIEMPRE empieza con el BLOQUE, luego agrega dedos.\n\n**Práctica:** Dibuja TUS manos primero. Están ahí, úsalas como modelo 24/7.",
                actions: ['Voy a practicar', 'Estructura mano', 'Claro']
            }
        },

        estructuraMano: {
            keywords: ['mano plana', 'mano se ve mal', 'mano estructura', 'palma', 'mano 3d'],
            module: 'modulo2',
            responses: {
                title: "Estructura 3D de la Mano",
                text: "**Por qué tu mano se ve plana:**\nDibujas CONTORNO sin VOLUMEN.\n\n**Solución 3D (paso a paso):**\n\n1. **Palma** = bloque rectangular con GROSOR\n   - Ancho > largo\n   - Tiene ALTURA (no es papel)\n\n2. **Nudillos** = 4 esferas en fila\n   - Conectan palma con dedos\n\n3. **Dedos** = cilindros desde esferas\n   - 3 segmentos cada dedo\n   - Se estrechan hacia la punta\n\n4. **Pulgar** = conecta LATERALMENTE\n   - 2 segmentos (no 3)\n   - Nace del lado de la palma\n\n**Ejercicio AHORA (15 min):**\n- Min 0-5: Solo palma como bloque 3D\n- Min 5-10: Agrega UN dedo completo\n- Min 10-15: Completa los demás\n\n**No busques perfección, busca ESTRUCTURA.**",
                actions: ['Lo haré', 'Dame más ejemplos', 'Gracias']
            }
        },

        rostroProporcion: {
            keywords: ['rostro', 'cara', 'proporciones cara', 'ojos', 'nariz', 'boca', 'faciales'],
            module: 'modulo2',
            responses: {
                title: "Proporciones Faciales",
                text: "**Regla de tercios faciales:**\n\n**Vertical (3 tercios iguales):**\n- **Superior:** Línea cabello → cejas\n- **Medio:** Cejas → base nariz\n- **Inferior:** Base nariz → mentón\n\n**Horizontal:**\n- **Ojos:** MITAD de la cabeza (vertical)\n- **Ancho ojo:** espacio entre ojos = 1 ojo\n- **Ancho total:** 5 ojos (ojo-espacio-ojo-espacio-ojo)\n- **Orejas:** desde cejas a nariz\n- **Boca:** entre nariz y mentón (más cerca de nariz)\n\n**Error más común:** Colocar ojos demasiado arriba. Van en la MITAD.\n\n**IMPORTANTE:** Estas son GUÍAS. Rostros reales varían mucho.\n\n**Observa rostros reales, no memorices números.**",
                actions: ['Entiendo', 'Construcción facial', 'OK']
            }
        },

        anatomiaFuncional: {
            keywords: ['anatomia funcional', 'como funciona', 'movimiento anatomia', 'cuerpo movimiento'],
            module: 'modulo2',
            responses: {
                title: "Anatomía Funcional",
                text: "**Anatomía funcional** = Entender cómo el cuerpo se MUEVE, no solo cómo se ve.\n\n**Ejemplo práctico:**\n- **Hombro estático:** esfera\n- **Hombro levantando:** deltoides se acorta, trapecio se activa\n- **Hombro hacia adelante:** pectorales tiran, escápula se separa\n\n**Enfoque correcto:**\n1. ¿Qué está haciendo el cuerpo?\n2. ¿Qué músculos se activan?\n3. ¿Cómo cambia la forma?\n\n**No necesitas ser médico.** Solo observar causa-efecto.\n\n**Ejercicio:** Mueve TU brazo y observa qué músculos se activan (tócalos). Luego dibuja.\n\n**Dibuja acciones (empujar, jalar, torcer), no solo poses estáticas.**",
                actions: ['Interesante', 'Dame ejemplo', '6 grupos musculares']
            }
        },

        estructura3D: {
            keywords: ['3d', 'tridimensional', 'volumen', 'profundidad', 'plano', 'dimensiones'],
            module: 'modulo2',
            responses: {
                title: "Pensamiento 3D",
                text: "**Todo es VOLUMEN, no forma plana.**\n\n**Cambio mental:**\n- Brazo NO es línea → es CILINDRO\n- Torso NO es rectángulo → es CAJA\n- Cabeza NO es círculo → es ESFERA\n- Mano NO es silueta → es BLOQUE\n\n**Técnica práctica:**\n1. Dibuja forma 3D simple (cilindro, cubo, esfera)\n2. Agrega eje central (muestra dirección)\n3. Define luz y sombra (refuerza volumen)\n4. Construye detalles SOBRE el volumen\n\n**Ejercicio fundamental:**\nPractica dibujando SOLO cilindros y cajas en diferentes ángulos durante 1 semana.\n\n**Domina el volumen, el resto fluye.**",
                actions: ['Voy a practicar formas', 'Dame ejercicio', 'Entendido']
            }
        },

        articulaciones: {
            keywords: ['articulaciones', 'articulacion', 'codos', 'rodillas', 'union', 'uniones'],
            module: 'modulo2',
            responses: {
                title: "Articulaciones Simplificadas",
                text: "**Sistema de articulaciones:**\n\n**Movimiento amplio (esfera):**\n- **Hombro** = esfera (rotación 360°)\n- **Cadera** = esfera (rotación amplia)\n- **Muñeca** = esfera pequeña\n- **Tobillo** = esfera pequeña + bisagra\n\n**Movimiento limitado (bisagra):**\n- **Codo** = bisagra (solo dobla)\n- **Rodilla** = bisagra (solo dobla)\n- **Dedos** = bisagras pequeñas\n\n**Regla de oro:** Donde dos cilindros se juntan, hay una ESFERA.\n\n**Error común:** Articulaciones que doblan donde no deben.\n\n**Solución:** Dibuja el esqueleto simple primero, luego agrega forma.",
                actions: ['Claro', 'Estructura 3D', 'OK']
            }
        },

        escorzo: {
            keywords: ['escorzo', 'perspectiva', 'angulo', 'acortamiento', 'perspectiva figura'],
            module: 'modulo2',
            responses: {
                title: "Escorzo y Acortamiento",
                text: "**Escorzo** = Cuando una parte apunta hacia ti o se aleja. Se ve MÁS CORTA.\n\n**Ejemplo clásico:** Brazo extendido hacia ti\n- En realidad: largo\n- En dibujo: círculo (hombro) + mano grande\n\n**Técnica del cilindro:**\n1. Dibuja cilindro en perspectiva\n2. Las elipses (cortes) muestran profundidad\n3. Lo cerca = más grande\n4. Lo lejos = más pequeño\n\n**Regla:** El escorzo EXAGERA las diferencias de tamaño.\n\n**Ejercicio práctico:**\n1. Toma foto de tu brazo apuntando a cámara\n2. Dibújalo\n3. Nota cómo la mano es ENORME vs. el brazo\n\n**Errores:** Dibujar el largo 'real' en vez del largo 'visual'.",
                actions: ['Voy a intentar', 'Dame más ejemplos', 'Entiendo']
            }
        },

        dedosEstructura: {
            keywords: ['dedos', 'falanges', 'estructura dedos', 'dedos mano', 'articulaciones dedos'],
            module: 'modulo2',
            responses: {
                title: "Estructura de los Dedos",
                text: "**Anatomía simplificada del dedo:**\n\n**Cada dedo = 3 cilindros (excepto pulgar):**\n1. **Falange proximal** (base) - más larga\n2. **Falange media** - mediana\n3. **Falange distal** (punta) - más corta\n\n**Proporciones aproximadas:** 3:2:1\n\n**Pulgar especial:**\n- Solo 2 falanges (no 3)\n- Más grueso que otros dedos\n- Se mueve independiente (oposición)\n\n**Articulaciones:**\n- Cada unión = esfera pequeña\n- Permiten flexión (doblar)\n- Los dedos se curvan HACIA el pulgar\n\n**Ejercicio:** Dibuja TU mano cerrándose lentamente. Observa cómo se curvan los dedos.",
                actions: ['Entendido', 'Estructura mano', 'Practicar']
            }
        },

        torsoEstructura: {
            keywords: ['torso', 'caja toracica', 'costillas', 'pecho', 'estructura torso'],
            module: 'modulo2',
            responses: {
                title: "Estructura del Torso",
                text: "**Torso = Caja torácica + abdomen**\n\n**Caja torácica:**\n- Forma de barril (NO cilindro perfecto)\n- Más ancha arriba (hombros)\n- Se estrecha hacia cintura\n- Contiene corazón/pulmones (rígida)\n\n**Abdomen:**\n- Más flexible\n- Conecta torso con pelvis\n- Permite torsión\n- Músculos: abdominales + oblicuos\n\n**Vista frontal:** Forma de huevo invertido\n**Vista lateral:** Curva hacia adelante (columna)\n\n**Error común:** Dibujar torso recto como tabla.\n\n**Solución:** Piensa en volumen orgánico, no caja perfecta.\n\n**Ejercicio:** Dibuja torso como bloque 3D en 5 ángulos diferentes.",
                actions: ['Entendido', '3 masas', 'Anatomía funcional']
            }
        },

        pelvisEstructura: {
            keywords: ['pelvis', 'cadera', 'estructura pelvis', 'cuenco', 'cadera estructura'],
            module: 'modulo2',
            responses: {
                title: "Estructura de la Pelvis",
                text: "**Pelvis = Cuenco/cubo invertido**\n\n**Características:**\n- Forma de tazón (contiene órganos)\n- Más ancha en mujeres\n- Se conecta a columna arriba\n- Se conecta a piernas abajo (articulación esfera)\n\n**Movimiento:**\n- Puede inclinarse adelante/atrás\n- Puede rotar (torsión)\n- En contrapposto: se eleva del lado de apoyo\n\n**Vista frontal:** Rectángulo\n**Vista lateral:** Triángulo inclinado\n\n**Error común:** Dibujar pelvis como línea horizontal.\n\n**Solución:** Es VOLUMEN 3D. Marca los puntos de cadera (crestas ilíacas).\n\n**Ejercicio:** Dibuja pelvis como cubo simple en diferentes ángulos.",
                actions: ['OK', '3 masas corporales', 'Contrapposto']
            }
        },

        columnaVertebral: {
            keywords: ['columna', 'vertebral', 'espina', 'espalda', 'curva columna'],
            module: 'modulo2',
            responses: {
                title: "Columna Vertebral",
                text: "**Columna = Eje central flexible del cuerpo**\n\n**Curvaturas naturales (vista lateral):**\n1. **Cervical** (cuello) - curva hacia adelante\n2. **Torácica** (espalda alta) - curva hacia atrás\n3. **Lumbar** (espalda baja) - curva hacia adelante\n4. **Sacro** (pelvis) - curva hacia atrás\n\n**Forma general:** 'S' suave\n\n**En movimiento:**\n- Permite flexión (doblar adelante)\n- Permite extensión (doblar atrás)\n- Permite torsión (girar)\n- Permite inclinación lateral\n\n**Error:** Dibujar espalda recta como palo.\n\n**Solución:** SIEMPRE dibuja la curva en 'S'.\n\n**Ejercicio:** Observa TU espalda de perfil en espejo. Nota las curvas.",
                actions: ['Interesante', 'Línea de acción', 'Entendido']
            }
        },

        // ==================== MÓDULO 3: Figura Completa (8) ====================
        procesoCapas: {
            keywords: ['proceso capas', 'capas', 'proceso dibujo', 'pasos', 'workflow', 'metodologia'],
            module: 'modulo3',
            responses: {
                title: "Proceso por Capas (Método Profesional)",
                text: "**Sistema de 4-5 capas secuenciales:**\n\n**Capa 1: GESTO (10% del tiempo)**\n- Línea de acción\n- Masas principales\n- Balance y energía\n\n**Capa 2: ESTRUCTURA (25% del tiempo)**\n- 3 masas corporales en 3D\n- Cilindros para brazos/piernas\n- Articulaciones como esferas\n\n**Capa 3: ANATOMÍA (30% del tiempo)**\n- 6 grupos musculares básicos\n- Manos y pies estructurados\n- Refinamiento de formas\n\n**Capa 4: CONTORNO (20% del tiempo)**\n- Líneas limpias\n- Corrección de proporciones\n- Detalles específicos\n\n**Capa 5: VALORES (15% del tiempo)**\n- 3-5 valores tonales\n- Luz y sombra\n- Volumen final\n\n**Regla FUNDAMENTAL:** NUNCA saltes capas. Cada una es fundamento de la siguiente.\n\n**Error crítico:** Empezar con detalles o sombreado SIN estructura = desastre.",
                actions: ['Entendido', '¿Cuánto tarda?', 'Valores tonales']
            }
        },

        valoresTonales: {
            keywords: ['valores', 'tonales', 'luz', 'sombra', 'sombreado', '5 valores', 'loomis'],
            module: 'modulo3',
            responses: {
                title: "5 Valores Tonales (Sistema Loomis)",
                text: "**Los 5 valores de claro a oscuro:**\n\n1. **Luz Directa** (blanco papel)\n   - Donde la luz golpea directamente\n   - Zonas más brillantes\n\n2. **Luz Reflejada** (gris muy claro)\n   - Luz rebotada del entorno\n   - En sombras pero no negro\n\n3. **Medio Tono** (gris neutro)\n   - Transición luz-sombra\n   - Mayor área del dibujo\n\n4. **Sombra Propia** (gris oscuro)\n   - Superficie SIN luz directa\n   - Lado opuesto a fuente de luz\n\n5. **Sombra Proyectada** (negro)\n   - Sombra en OTRA superficie\n   - Más oscura que sombra propia\n\n**Aplicación:**\n1. Define PRIMERO fuente de luz\n2. Identifica qué superficies reciben luz\n3. Aplica valores consistentemente\n4. Mantén 1 fuente = 1 sistema\n\n**Error:** Usar todos los valores uniformemente. Simplifica.",
                actions: ['Claro', 'Dame ejercicio', 'Gracias']
            }
        },

        proyectoFinal: {
            keywords: ['proyecto final', 'final', 'proyecto', 'mercurio', 'evaluacion final'],
            module: 'modulo3',
            responses: {
                title: "Proyecto Final Integrador",
                text: "**Requisitos del proyecto:**\n\n**Tema:** Figura del Mercurio (David de Miguel Ángel, vista 1/4)\n\n**Incluir obligatorio:**\n- ✅ Gesto y línea de acción clara (20 pts)\n- ✅ Anatomía funcional: 3 masas + 6 grupos (20 pts)\n- ✅ Proporciones canon ~7.5 cabezas (20 pts)\n- ✅ Valores tonales (mín 3) (20 pts)\n- ✅ Manos/pies estructurados (10 pts)\n- ✅ Composición y uso del espacio (10 pts)\n\n**Proceso sugerido (90-120 min):**\n1. Observación (5 min)\n2. Capa 1 - Gesto (15 min)\n3. Capa 2 - Anatomía (25 min)\n4. Capa 3 - Refinamiento (20 min)\n5. Capa 4 - Volumen (30 min)\n6. Revisión final (15 min)\n\n**Para aprobar:** ≥60/100 puntos\n\n**Estrategia:** Estructura sólida (40 pts) + valores consistentes (15 pts) + detalles básicos (7 pts) = 62 pts ✅",
                actions: ['¿Qué pose elijo?', 'Estrategia de aprobación', 'Entendido']
            }
        },

        integracion: {
            keywords: ['integrar', 'integracion', 'todo junto', 'aplicar todo', 'combinar'],
            module: 'modulo3',
            responses: {
                title: "Integración Gesto + Anatomía",
                text: "**El gran desafío:** Mantener el GESTO mientras agregas ANATOMÍA.\n\n**Técnica de capas transparentes:**\n\n**Capa 1: Gesto (30 seg)**\n- Captura la ENERGÍA\n- Línea de acción fluida\n- NO borres esta capa\n\n**Capa 2: Estructura encima (2 min)**\n- Cilindros y cajas SOBRE el gesto\n- Mantén la dirección original\n- Ajusta tamaños, NO dirección\n\n**Capa 3: Anatomía al final (3+ min)**\n- Músculos como 'bultos' sobre estructura\n- Sigue la dirección del gesto\n- NO destruyas la energía original\n\n**Secreto profesional:** El gesto es el ALMA. La anatomía es el TRAJE.\n\n**Regla de oro:** Nunca sacrifiques gesto por anatomía 'perfecta'. El gesto da vida.",
                actions: ['Tiene sentido', 'Dame ejercicio', 'OK']
            }
        },

        figura15min: {
            keywords: ['figura larga', '15 minutos', 'figura completa', 'tiempo largo', 'dibujo largo'],
            module: 'modulo3',
            responses: {
                title: "Figura de 15 Minutos",
                text: "**Distribución óptima del tiempo:**\n\n- **Min 0-1:** Línea de acción + composición en página\n- **Min 1-4:** Estructura (3 masas + cilindros)\n- **Min 4-8:** Anatomía básica (6 grupos musculares)\n- **Min 8-12:** Refinamiento de formas y contorno\n- **Min 12-15:** Valores/sombras básicas\n\n**Usa temporizador.** Te fuerza a avanzar y no quedarte atascado.\n\n**Error común:** Pasar 10 min en la cabeza y correr el resto.\n\n**Solución:** Cronometra CADA fase. La figura debe desarrollarse COMPLETA.\n\n**Tip:** Trabaja de general a específico. Todo el tiempo.\n\n**Meta:** Figura balanceada con anatomía básica y valores mínimos.",
                actions: ['Voy a cronometrar', 'Proceso por capas', 'Entendido']
            }
        },

        composicion: {
            keywords: ['composicion', 'encuadre', 'espacio', 'pagina', 'formato'],
            module: 'modulo3',
            responses: {
                title: "Composición y Encuadre",
                text: "**Composición = Cómo la figura ocupa el espacio.**\n\n**Reglas básicas:**\n\n1. **Regla de tercios**\n   - Divide página en 3x3\n   - Coloca puntos de interés en intersecciones\n\n2. **Espacio negativo**\n   - El espacio ALREDEDOR importa\n   - No pegues figura al borde\n   - Deja 'aire' para respirar\n\n3. **Dirección visual**\n   - La figura 'mira' o 'apunta' a algún lado\n   - Deja más espacio hacia donde apunta\n\n4. **Tamaño**\n   - Figura ocupa 60-80% de la página\n   - No muy pequeña (se pierde)\n   - No muy grande (se corta)\n\n**Ejercicio:** Dibuja mismo gesto en 3 formatos: vertical, horizontal, cuadrado. Nota diferencias.",
                actions: ['Interesante', 'Entendido', 'Proyecto final']
            }
        },

        luzSombra: {
            keywords: ['luz', 'iluminacion', 'fuente luz', 'direccion luz', 'sombras'],
            module: 'modulo3',
            responses: {
                title: "Luz y Dirección de Sombras",
                text: "**Sistema de iluminación:**\n\n**1. Define la fuente de luz PRIMERO**\n- ¿De dónde viene? (arriba, lateral, abajo)\n- Una sola fuente = más dramático\n- Múltiples fuentes = más complejo\n\n**2. Identifica superficies que reciben luz**\n- Perpendiculares a la luz = más brillantes\n- Paralelas a la luz = medio tono\n- Opuestas a la luz = sombra\n\n**3. Aplica el sistema de 5 valores**\n- Luz directa → Luz reflejada → Medio → Sombra → Proyectada\n\n**Error común:** Sombrear sin saber de dónde viene la luz.\n\n**Solución:** Dibuja una FLECHA indicando fuente antes de sombrear.\n\n**Ejercicio:** Ilumina un objeto simple (manzana, huevo) con lámpara desde 4 ángulos. Dibuja cada uno.",
                actions: ['Valores tonales', 'Entendido', 'Dame ejercicio']
            }
        },

        figuraAccion: {
            keywords: ['accion', 'movimiento', 'dinamica', 'figura dinamica', 'pose accion'],
            module: 'modulo3',
            responses: {
                title: "Figuras en Acción",
                text: "**Capturar movimiento dinámico:**\n\n**Principios clave:**\n\n1. **Línea de acción exagerada**\n   - Curva MÁS pronunciada\n   - Define la energía del movimiento\n\n2. **Balance roto intencionalmente**\n   - En acción, el cuerpo está 'cayendo controlado'\n   - Centro de gravedad FUERA del área de apoyo\n\n3. **Anticipación y seguimiento**\n   - Brazos/piernas en direcciones opuestas\n   - Crea tensión visual\n\n4. **Escorzo dramático**\n   - Partes que se acercan/alejan\n   - Aumenta sensación de profundidad\n\n**Ejercicio:** Congela un video deportivo. Dibuja 5 poses de acción en 2 min cada una.\n\n**Tip:** El movimiento está en el GESTO, no en los detalles.",
                actions: ['Dame referencias', 'Línea de acción', 'Entendido']
            }
        },

        // ==================== SISTEMA LMS (7) ====================
        subirEjercicios: {
            keywords: ['subir ejercicio', 'como subir', 'entregar', 'enviar trabajo', 'upload'],
            module: 'sistema',
            responses: {
                title: "Cómo Subir Ejercicios",
                text: "**Proceso de entrega paso a paso:**\n\n1. **Completa tu ejercicio** según especificaciones\n\n2. **Fotografía con calidad:**\n   - Luz natural uniforme (sin sombras)\n   - Fondo neutro (blanco o gris)\n   - Dibujo centrado y completo\n   - Enfocado (sin blur)\n   - Formato: JPG o PNG\n   - Tamaño: < 5MB\n\n3. **Accede al Google Form:**\n   - Ve a la lección correspondiente\n   - Botón 'Subir ejercicio' o 'Entregar'\n\n4. **Completa el formulario:**\n   - Nombre y correo\n   - Módulo y lección\n   - Adjunta imagen\n   - Comentarios opcionales\n\n5. **Envía y confirma:**\n   - Click 'Enviar'\n   - Recibirás confirmación automática\n\n**Tip:** Puedes subir varias veces. Solo cuenta la última versión.\n\n**Problema técnico:** Contacta al profesor con evidencia.",
                actions: ['Entendido', 'Problemas técnicos', 'Gracias']
            }
        },

        verProgreso: {
            keywords: ['progreso', 'avance', 'donde veo', 'estadisticas', 'porcentaje', 'dashboard'],
            module: 'sistema',
            responses: {
                title: "Ver Tu Progreso",
                text: "**Sistema de seguimiento:**\n\n**Dashboard principal:**\n- Barra de progreso general (0-100%)\n- Progreso por módulo individual\n- Lecciones completadas (X/10)\n- Ejercicios entregados\n- Evaluaciones aprobadas\n\n**Cálculo del progreso:**\n- Lecciones visitadas y completadas\n- Ejercicios subidos\n- Evaluaciones formativas aprobadas\n- Tiempo dedicado (opcional)\n\n**Actualización:**\n- Automática cada vez que completas algo\n- Usa localStorage (guardado en navegador)\n\n**Nota:** Si cambias de dispositivo o borras caché, se reinicia.\n\n**Filosofía:** No te obsesiones con el %. Obsesiónate con PRACTICAR consistentemente.\n\n**Meta real:** Progreso diario, no porcentaje.",
                actions: ['OK', 'Dashboard', 'Claro']
            }
        },

        materiales: {
            keywords: ['materiales', 'que necesito', 'lapices', 'papel', 'herramientas', 'comprar'],
            module: 'sistema',
            responses: {
                title: "Materiales Necesarios",
                text: "**Lista de materiales básicos:**\n\n**ESENCIALES:**\n- Lápiz grafito HB (para líneas claras)\n- Lápiz grafito 2B o 4B (para sombras)\n- Goma de borrar blanca\n- Sacapuntas de calidad\n- Papel bond/croquis (50-100 hojas)\n\n**OPCIONALES:**\n- Lápiz 6B (sombras oscuras)\n- Goma amasable (sombras suaves)\n- Difumino (mezclar tonos)\n- Papel de dibujo 90-120g (ejercicios finales)\n- Papel mercurio 1/4 (proyecto final)\n\n**NO NECESITAS:**\n- Set de 50 lápices profesionales\n- Papel caro para practicar\n- Tableta gráfica (es analógico)\n- Carboncillo u otros medios\n\n**Presupuesto estimado:** $6.000-11.000 CLP total\n\n**Regla de oro:** Mejor papel barato + MUCHA práctica, que papel caro + miedo a usarlo.",
                actions: ['Perfecto', '¿Dónde comprar?', 'Gracias']
            }
        },

        referenciasDigitales: {
            keywords: ['referencias digitales', 'online', 'internet', 'pinterest', 'donde buscar', 'referencias'],
            module: 'sistema',
            responses: {
                title: "Referencias Digitales",
                text: "**Dónde encontrar referencias gratuitas:**\n\n**SITIOS ESPECIALIZADOS (RECOMENDADOS):**\n\n1. **Line of Action** (line-of-action.com)\n   - Poses cronometradas\n   - Filtros: manos, pies, rostros\n   - 30 seg a 30 min\n\n2. **Quickposes** (quickposes.com)\n   - Similar a Line of Action\n   - Interfaz simple\n   - Temporizador integrado\n\n3. **Croquis Cafe** (YouTube)\n   - Videos de modelos en vivo\n   - Sesiones completas gratuitas\n   - Calidad profesional\n\n4. **Anatomy360** (anatomy360.info)\n   - Modelos 3D rotables\n   - Músculos por capas\n   - Muy útil para anatomía\n\n**BANCOS DE IMÁGENES:**\n- Pexels.com (fotos gratis)\n- Unsplash.com (alta calidad)\n- Pixabay.com\n\n**PINTEREST:** Útil pero verifica que sean fotos REALES (no dibujos de otros).\n\n**Para evaluaciones:** Usa las 26 referencias oficiales del curso.",
                actions: ['Voy a explorar', 'Guardado', 'Gracias']
            }
        },

        librosLoomis: {
            keywords: ['libros', 'loomis', 'conseguir', 'comprar', 'donde', 'bibliografia'],
            module: 'sistema',
            responses: {
                title: "Libros y Bibliografía",
                text: "**Libros principales del curso:**\n\n**Andrew Loomis (ESENCIAL):**\n\n1. **'Figure Drawing For All It's Worth' (1943)**\n   - El MÁS importante\n   - Cubre gesto, anatomía, valores\n   - Alineado 100% con este curso\n   - PDF gratis: archive.org\n   - Físico: Amazon ~$20.000 CLP\n\n2. **'Drawing the Head and Hands' (1956)**\n   - Complemento para Módulo 2\n   - Proporciones faciales detalladas\n   - Misma disponibilidad\n\n**Otros autores (COMPLEMENTARIOS):**\n- Nicolaïdes - 'The Natural Way to Draw'\n- Bridgman - 'Constructive Anatomy'\n- Hogarth - 'Dynamic Anatomy'\n- Goldfinger - 'Human Anatomy for Artists'\n\n**Dónde conseguir en Chile:**\n- Librería Nacional (Alameda)\n- Antártica (online)\n- Buscalibre.cl\n- Amazon con envío\n\n**GRATIS:** archive.org (muchos en dominio público)\n\n**Importante:** NO necesitas comprar todos. Si solo uno, que sea Loomis 'Figure Drawing'.",
                actions: ['¿Cuál comprar primero?', 'OK', 'Gracias']
            }
        },

        evaluacionesFormativas: {
            keywords: ['evaluaciones formativas', 'autoevaluacion', 'quiz', 'test', 'evaluacion'],
            module: 'sistema',
            responses: {
                title: "Evaluaciones Formativas",
                text: "**Sistema de evaluación formativa:**\n\n**Características:**\n- **Cantidad:** 10 evaluaciones (aprox 1 por lección)\n- **Formato:** 3 preguntas múltiple opción\n- **Propósito:** Verificar comprensión conceptual\n- **Calificación:** NO califican para nota final\n- **Reintentos:** ILIMITADOS\n- **Feedback:** Inmediato (sabes si acertaste)\n\n**Cómo funcionan:**\n1. Completas la lección (teoría + práctica)\n2. Click en 'Evaluación Formativa'\n3. Respondes 3 preguntas\n4. Recibes feedback inmediato\n5. Si fallas, puedes reintentar\n6. Se guarda tu mejor intento\n\n**Filosofía pedagógica:**\nEl error es parte del aprendizaje. Los reintentos ilimitados permiten:\n- Aprender de errores sin presión\n- Revisar contenido no claro\n- Alcanzar dominio real, no solo 'pasar'\n\n**Meta:** 100% en todas antes de avanzar al siguiente módulo.",
                actions: ['Entendido', '¿Cómo aprobar?', 'Gracias']
            }
        },

        proyectoRequisitos: {
            keywords: ['requisitos proyecto', 'que entregar', 'formato', 'proyecto formato', 'entrega final'],
            module: 'sistema',
            responses: {
                title: "Requisitos del Proyecto Final",
                text: "**Especificaciones técnicas:**\n\n**SOPORTE:**\n- Papel de dibujo 90-120g\n- Tamaño: mínimo Carta, máximo A3\n- Blanco o marfil\n- NO papel cuadriculado\n\n**TÉCNICA:**\n- Lápiz grafito (HB a 6B)\n- Dibujo analógico (NO digital)\n- Permitido: goma, difumino, múltiples lápices\n\n**CONTENIDO:**\n- Figura: Mercurio del David (vista 1/4)\n- Encuadre: figura completa visible\n- Márgenes adecuados\n- Formato: horizontal o vertical\n\n**PARA ENTREGA (fotografía):**\n- Alta resolución (min 1920x1080px)\n- Luz natural uniforme\n- Fondo neutro\n- Dibujo centrado\n- Formato: JPG o PNG (< 5MB)\n\n**MÉTODO:**\n- Google Form en Lección 3.3\n- Adjunta fotografía\n- Completa datos\n- Envía antes del deadline\n\n**NO ACEPTADO:**\n- Dibujos digitales\n- Fotos de baja calidad\n- Formatos .PSD, .AI\n\n**Tip:** Conserva el original físico para feedback presencial.",
                actions: ['Entendido', 'Fecha entrega', 'Criterios']
            }
        },

        // ==================== RECURSOS Y APOYO (5) ====================
        recursosGratuitos: {
            keywords: ['gratis', 'gratuitos', 'free', 'sin costo', 'economico', 'recursos'],
            module: 'general',
            responses: {
                title: "Recursos Gratuitos Disponibles",
                text: "**Recursos 100% gratuitos para complementar:**\n\n**📚 LIBROS (dominio público):**\n- Archive.org: Loomis, Bridgman, Vanderpoel\n- Gutenberg.org: Textos clásicos de anatomía\n\n**🎨 PRÁCTICA:**\n- Line of Action: poses cronometradas\n- Quickposes: referencias ilimitadas\n- Croquis Cafe (YouTube): sesiones de modelo\n\n**📹 CANALES YOUTUBE:**\n- Proko: anatomía detallada\n- Sycra: fundamentos de dibujo\n- Moderndayjames: croquis rápidos\n\n**🌐 HERRAMIENTAS WEB:**\n- Anatomy360.info: modelos 3D rotables\n- JustSketchMe: posador 3D gratuito\n- Posemaniacs: biblioteca de poses\n\n**💡 ESTE CURSO:**\nCompletamente gratuito. No necesitas pagar nada extra.\n\n**Tip:** La mejor inversión no es dinero, es TIEMPO de práctica.",
                actions: ['Guardado', 'Dame más', 'Gracias']
            }
        },

        tiempoLeccion: {
            keywords: ['tiempo', 'dedicar', 'duracion', 'horas', 'cuanto tiempo'],
            module: 'general',
            responses: {
                title: "Tiempo por Lección",
                text: "**Distribución recomendada (12 días intensivos):**\n\n**MÓDULO 1 (3-4 días):**\n- Lección 1.1: 2-3 horas\n- Lección 1.2: 2-3 horas\n- Lección 1.3: 2-3 horas\n- Evaluación M1: 30 min\n- **Total:** ~7-10 horas\n\n**MÓDULO 2 (4-5 días):**\n- Lección 2.1: 2-3 horas\n- Lección 2.2: 3-4 horas\n- Lección 2.3: 3-4 horas\n- Lección 2.4: 2-3 horas\n- Evaluación M2: 30 min\n- **Total:** ~11-15 horas\n\n**MÓDULO 3 (4-5 días):**\n- Lección 3.1: 3-4 horas\n- Lección 3.2: 3-4 horas\n- Lección 3.3 (Proyecto): 6-8 horas\n- Evaluación M3: 30 min\n- **Total:** ~13-17 horas\n\n**TOTAL CURSO:** ~31-42 horas\n\n**Desglose típico:**\n- Teoría: 20% (lectura, videos)\n- Práctica: 80% (dibujar)\n\n**Recomendación:** 2-4 horas diarias según tu disponibilidad.",
                actions: ['Planificar', 'OK', 'Mucho tiempo']
            }
        },

        ordenEjercicios: {
            keywords: ['orden', 'secuencia', 'primero', 'que hacer', 'empezar', 'como empezar'],
            module: 'general',
            responses: {
                title: "Orden de Ejercicios",
                text: "**Secuencia OBLIGATORIA:**\n\n**1. EVALUACIÓN DIAGNÓSTICA (primero)**\n- Antes de empezar cualquier módulo\n- Identifica fortalezas/debilidades\n- Personaliza tu ruta\n\n**2. MÓDULOS EN ORDEN: 1 → 2 → 3**\n- NO saltes módulos\n- Cada uno construye sobre el anterior\n- M1 = fundamentos\n- M2 = estructura anatómica\n- M3 = integración completa\n\n**3. DENTRO DE CADA MÓDULO: secuencial**\n- Lección 1.1 → 1.2 → 1.3\n- Completa teoría ANTES de práctica\n- Haz evaluación formativa al terminar\n\n**4. EVALUACIÓN FORMATIVA al final de cada módulo**\n\n**❌ NO RECOMENDADO:**\n- Saltar a Módulo 3 directamente\n- Solo teoría sin práctica\n- Omitir evaluaciones formativas\n- Ejercicios fuera de secuencia\n\n**✅ EXCEPCIÓN VÁLIDA:**\nPuedes REVISAR lecciones anteriores para repasar.\n\n**Razón pedagógica:** Usa práctica intercalada + espaciamiento. Romper orden reduce efectividad 60%.",
                actions: ['Entendido', 'Evaluación diagnóstica', 'Gracias']
            }
        },

        aprobarModulo: {
            keywords: ['aprobar', 'pasar', 'completar modulo', 'avanzar', 'cuando apruebo'],
            module: 'general',
            responses: {
                title: "Cómo Aprobar un Módulo",
                text: "**Módulo COMPLETADO cuando cumples:**\n\n**✅ 1. Todas las lecciones:**\n- Leer contenido teórico completo\n- Ver videos explicativos\n- Marcar como 'Completada'\n\n**✅ 2. Todos los ejercicios prácticos:**\n- Realizar los dibujos requeridos\n- Fotografiar con calidad\n- Subir vía Google Forms\n\n**✅ 3. Evaluación formativa:**\n- 3 preguntas correctas (100%)\n- Reintentos ilimitados\n\n**✅ 4. Sistema actualiza:**\n- Automático cuando cumples los 3 anteriores\n- Módulo marcado como ✅ COMPLETADO\n- Dashboard refleja avance\n\n**INDICADORES VISUALES:**\n- Barra progreso: 100% en ese módulo\n- Badge verde: módulo completado\n- Siguiente módulo desbloqueado\n\n**IMPORTANTE:**\n- Aprobar módulos ≠ nota final\n- Nota final = Proyecto Final (Lección 3.3)\n- Módulos 1-2: formativos (práctica)\n- Módulo 3: incluye evaluación sumativa\n\n**Para aprobar el CURSO:** ≥60/100 pts en proyecto final.",
                actions: ['Claro', 'Proyecto final', 'Entendido']
            }
        },

        motivacionProgreso: {
            keywords: ['motivacion', 'animo', 'desanimado', 'progreso lento', 'no veo mejora'],
            module: 'general',
            responses: {
                title: "Motivación y Progreso",
                text: "**Verdades sobre el progreso en dibujo:**\n\n**1. NO es lineal:**\n- Algunos días avanzas mucho\n- Otros días consolidas\n- Mesetas (estancamiento) son NORMALES\n- Después de meseta = salto de nivel\n\n**2. La mejora es invisible día a día:**\n- Se nota en semanas, no en horas\n- Compara dibujo actual vs. hace 1 semana\n- Pequeños cambios = gran progreso acumulado\n\n**3. El 47% del curso sintió lo mismo:**\n- La frustración es universal\n- Todos pasamos por dudas\n- Los que terminan = los que NO abandonan\n\n**4. Datos motivacionales:**\n- Estudiantes que completaron M1: 65% menos ansiedad\n- Práctica diaria de 15 min > 3 horas 1 vez/semana\n- 80% de estudiantes aprobaron con práctica constante\n\n**EJERCICIO DE PERSPECTIVA:**\n1. Saca tu primer dibujo del curso\n2. Dibuja la misma pose AHORA\n3. Compáralos\n4. Anota 3 mejoras (por pequeñas que sean)\n\n**Mantra:** 'El progreso es acumulativo. Cada línea cuenta.'",
                actions: ['Necesito más ánimos', 'Gracias', 'Voy a comparar']
            }
        }
    };

    // ============================================
    // 3. SISTEMA DE DETECCIÓN INTELIGENTE MEJORADO
    // ============================================

    // 3.1 Saludos y conversación básica
    const basicConversation = {
        saludos: {
            keywords: ['hola', 'hi', 'hey', 'buenos dias', 'buenas tardes', 'buenas noches', 'saludos', 'que tal'],
            responses: [
                {
                    text: "¡Hola! 👋 Soy tu Mentor Anatómico.\n\n**¿En qué puedo ayudarte hoy?**\n\n💙 **Emocional:**\n- Me siento frustrado/a\n- Estoy bloqueado/a\n- Tengo ansiedad por la evaluación\n\n🎨 **Técnico:**\n- Cómo dibujar línea de acción\n- Proporciones del cuerpo\n- Manos y pies\n- Valores tonales\n\n📚 **Sistema:**\n- Cómo subir ejercicios\n- Ver mi progreso\n- Materiales necesarios\n\n**Escribe tu duda o elige un tema de las opciones rápidas arriba** ⬆️",
                    actions: ['Duda técnica', 'Necesito apoyo emocional', 'Pregunta sobre el curso']
                }
            ]
        },
        
        gracias: {
            keywords: ['gracias', 'thanks', 'thank you', 'te lo agradezco', 'muy util', 'me ayudo'],
            responses: [
                {
                    text: "¡De nada! 💙 Me alegra haberte ayudado.\n\n**¿Necesitas algo más?**\n\n- ¿Otra duda técnica?\n- ¿Apoyo emocional?\n- ¿Información del curso?\n\nEstoy aquí para ti. Sigue practicando, vas por buen camino ✨",
                    actions: ['Tengo otra duda', 'Estoy bien, gracias', 'Ver mi progreso']
                }
            ]
        },
        
        despedida: {
            keywords: ['chao', 'adios', 'nos vemos', 'hasta luego', 'bye', 'me voy'],
            responses: [
                {
                    text: "¡Hasta pronto! 👋✨\n\n**Recuerda:**\n- Practica un poco cada día (mejor que mucho de una vez)\n- El progreso es acumulativo\n- Cada línea cuenta\n\n**Nos vemos cuando vuelvas. ¡Sigue dibujando!** 🎨",
                    actions: ['Ver estadísticas', 'Cerrar chat']
                }
            ]
        },

        ayuda: {
            keywords: ['ayuda', 'help', 'que puedes hacer', 'que sabes', 'como funciona', 'comandos'],
            responses: [
                {
                    text: "**¿Cómo puedo ayudarte?** 🤖\n\n**Puedo responder sobre:**\n\n💙 **EMOCIONAL (15 situaciones):**\n- Frustración, bloqueo, ansiedad\n- Comparación con otros\n- Síndrome del impostor\n- Desmotivación, cansancio\n- Desánimo nocturno\n\n🎨 **TÉCNICO (40 respuestas):**\n\n**Módulo 1:** Línea de acción, medición, contrapposto, croquis rápidos, observación\n\n**Módulo 2:** 3 masas, anatomía muscular, manos/pies, rostro, escorzo\n\n**Módulo 3:** Proceso por capas, valores tonales, proyecto final, composición\n\n📚 **SISTEMA (12 respuestas):**\n- Cómo usar el curso\n- Subir ejercicios\n- Materiales necesarios\n- Referencias y recursos\n\n**Escribe tu duda en lenguaje natural.** Ejemplos:\n- \"Me siento frustrado\"\n- \"¿Cómo dibujar manos?\"\n- \"¿Cómo subo mi ejercicio?\"",
                    actions: ['Ver todas las categorías', 'Tengo una duda', 'Gracias']
                }
            ]
        }
    };

    // 3.2 Función para detectar conversación básica
    function detectBasicConversation(text) {
        const lowerText = text.toLowerCase().trim();
        
        for (const [type, data] of Object.entries(basicConversation)) {
            for (const keyword of data.keywords) {
                if (lowerText.includes(keyword) || lowerText === keyword) {
                    return {
                        type: 'basic',
                        subtype: type,
                        response: data.responses[0]
                    };
                }
            }
        }
        
        return null;
    }

    // 3.3 Función principal de detección
    function detectQuery(text) {
        const lowerText = text.toLowerCase();
        
        // 0. DETECTAR CONVERSACIÓN BÁSICA (prioridad máxima)
        const basicMatch = detectBasicConversation(text);
        if (basicMatch) {
            return basicMatch;
        }

        let bestMatch = null;
        let bestScore = 0;
        let type = null;

        // 1. DETECTAR EMOCIONAL (prioridad alta)
        for (const [emotion, data] of Object.entries(emotionalKnowledge)) {
            for (const keyword of data.keywords) {
                if (lowerText.includes(keyword)) {
                    const score = keyword.length / lowerText.length;
                    if (score > bestScore) {
                        bestScore = score;
                        bestMatch = emotion;
                        type = 'emotional';
                    }
                }
            }
        }

        // Si encontró emocional con score alto, retorna
        if (bestScore > 0.15) {
            return { 
                type: 'emotional', 
                match: bestMatch, 
                data: emotionalKnowledge[bestMatch],
                score: bestScore
            };
        }

        // 2. DETECTAR TÉCNICO
        bestScore = 0;
        bestMatch = null;
        
        for (const [topic, data] of Object.entries(technicalKnowledge)) {
            for (const keyword of data.keywords) {
                if (lowerText.includes(keyword)) {
                    const score = keyword.length / lowerText.length;
                    if (score > bestScore) {
                        bestScore = score;
                        bestMatch = topic;
                        type = 'technical';
                    }
                }
            }
        }

        if (bestScore > 0.1) {
            return { 
                type: 'technical', 
                match: bestMatch, 
                data: technicalKnowledge[bestMatch],
                score: bestScore
            };
        }

        // 3. NO ENCONTRADO
        return null;
    }

    // ============================================
    // 4. GENERADOR DE RESPUESTAS MEJORADO CON NAVEGACIÓN
    // ============================================
    function generateResponse(userMessage, context = {}) {
        const detected = detectQuery(userMessage);

        // MANEJO DE CONVERSACIÓN BÁSICA
        if (detected && detected.type === 'basic') {
            return {
                type: 'basic',
                subtype: detected.subtype,
                title: getBasicTitle(detected.subtype),
                text: detected.response.text,
                actions: detected.response.actions || [],
                actionHandlers: getActionHandlers(detected.subtype)
            };
        }

        // SI NO ENCONTRÓ NADA
        if (!detected) {
            return {
                type: 'notfound',
                title: "🔍 Mmm, no entendí bien tu pregunta",
                text: `No pude entender exactamente qué necesitas, pero estoy aquí para ayudarte 💙.\n\n**Ejemplos de cosas que puedo responder:**\n\n💙 **Emocional:**\n- "Me siento frustrado"\n- "Estoy bloqueado"\n- "Tengo miedo de entregar"\n\n🎨 **Técnico:**\n- "¿Cómo dibujar línea de acción?"\n- "No me salen las manos"\n- "¿Qué son los valores tonales?"\n\n📚 **Sistema:**\n- "¿Cómo subo ejercicios?"\n- "¿Qué materiales necesito?"\n- "¿Dónde veo mi progreso?"\n\n**Intenta reformular tu pregunta o elige una opción:**`,
                actions: ['Duda técnica', 'Apoyo emocional', 'Info del curso', 'Ver ayuda completa'],
                actionHandlers: {
                    'Duda técnica': () => generateResponse('ayuda tecnica'),
                    'Apoyo emocional': () => generateResponse('ayuda emocional'),
                    'Info del curso': () => generateResponse('ayuda sistema'),
                    'Ver ayuda completa': () => generateResponse('ayuda')
                }
            };
        }

        // RESPUESTA EMOCIONAL
        if (detected.type === 'emotional') {
            const emotionData = detected.data;
            return {
                type: 'emotional',
                emotion: detected.match,
                title: `💙 ${emotionData.nivelIntensidad.charAt(0).toUpperCase() + emotionData.nivelIntensidad.slice(1)} Intensidad`,
                text: emotionData.responses.text,
                microDialogo: emotionData.responses.microDialogo || null,
                accionConcreta: emotionData.responses.accionConcreta || null,
                actions: emotionData.responses.actions || [],
                actionHandlers: getEmotionalActionHandlers(detected.match, emotionData.responses.actions)
            };
        }

        // RESPUESTA TÉCNICA
        if (detected.type === 'technical') {
            const techData = detected.data;
            return {
                type: 'technical',
                topic: detected.match,
                module: techData.module || 'general',
                title: techData.responses.title || 'Respuesta Técnica',
                text: techData.responses.text,
                actions: techData.responses.actions || [],
                actionHandlers: getTechnicalActionHandlers(detected.match, techData.responses.actions)
            };
        }
    }

    // ============================================
    // 5. MANEJADORES DE ACCIONES (navegación de botones)
    // ============================================
    
    function getBasicTitle(subtype) {
        const titles = {
            saludos: '👋 ¡Hola!',
            gracias: '💙 De nada',
            despedida: '👋 ¡Hasta pronto!',
            ayuda: '❓ Ayuda del Mentor'
        };
        return titles[subtype] || 'Mentor Anatómico';
    }

    function getActionHandlers(subtype) {
        const handlers = {
            saludos: {
                'Duda técnica': () => generateResponse('dame ayuda tecnica'),
                'Necesito apoyo emocional': () => generateResponse('necesito apoyo'),
                'Pregunta sobre el curso': () => generateResponse('como funciona el curso')
            },
            gracias: {
                'Tengo otra duda': () => generateResponse('ayuda'),
                'Estoy bien, gracias': () => generateResponse('adios'),
                'Ver mi progreso': () => ({
                    type: 'action',
                    action: 'showStats',
                    title: '📊 Ver Estadísticas',
                    text: 'Redirigiendo al dashboard de progreso...'
                })
            },
            despedida: {
                'Ver estadísticas': () => ({
                    type: 'action',
                    action: 'showStats',
                    title: '📊 Estadísticas',
                    text: 'Mostrando tu progreso...'
                }),
                'Cerrar chat': () => ({
                    type: 'action',
                    action: 'closeChat',
                    title: '👋 Chat cerrado',
                    text: 'Vuelve cuando necesites ayuda. ¡Sigue practicando!'
                })
            },
            ayuda: {
                'Ver todas las categorías': () => generateResponse('muestrame todas las categorias'),
                'Tengo una duda': () => generateResponse('ayuda'),
                'Gracias': () => generateResponse('gracias')
            }
        };
        return handlers[subtype] || {};
    }

    function getEmotionalActionHandlers(emotion, actions) {
        const handlers = {};
        
        actions.forEach(action => {
            const lowerAction = action.toLowerCase();
            
            // Patrones comunes de respuesta
            if (lowerAction.includes('dame') && lowerAction.includes('ejercicio')) {
                handlers[action] = () => generateExerciseSuggestion(emotion);
            } else if (lowerAction.includes('necesito') && lowerAction.includes('ayuda')) {
                handlers[action] = () => generateResponse('necesito mas ayuda');
            } else if (lowerAction.includes('estoy mejor') || lowerAction.includes('lo haré') || lowerAction.includes('voy a')) {
                handlers[action] = () => ({
                    type: 'emotional',
                    title: '💪 ¡Excelente actitud!',
                    text: 'Me alegra mucho que te sientas mejor 💙.\n\nRecuerda:\n- El progreso es acumulativo\n- Cada línea cuenta\n- Está bien tener días difíciles\n\n**¿Necesitas algo más o seguimos con el dibujo?**',
                    actions: ['Tengo otra duda', 'Voy a practicar', 'Gracias']
                });
            } else if (lowerAction.includes('gracias') || lowerAction.includes('ok') || lowerAction.includes('entendido')) {
                handlers[action] = () => generateResponse('gracias');
            } else {
                // Handler genérico
                handlers[action] = () => ({
                    type: 'followup',
                    title: '💙 Entendido',
                    text: `Perfecto. ${action}.\n\n¿En qué más puedo ayudarte?`,
                    actions: ['Otra duda técnica', 'Necesito más apoyo', 'Estoy bien']
                });
            }
        });
        
        return handlers;
    }

    function getTechnicalActionHandlers(topic, actions) {
        const handlers = {};
        
        actions.forEach(action => {
            const lowerAction = action.toLowerCase();
            
            // Mapeo de acciones comunes a temas relacionados
            if (lowerAction.includes('ejemplo') || lowerAction.includes('visual')) {
                handlers[action] = () => ({
                    type: 'technical',
                    title: '🎨 Ejemplo Visual',
                    text: `Para ${topic}, te recomiendo:\n\n1. Busca referencias en Line of Action (line-of-action.com)\n2. Observa videos de Proko en YouTube\n3. Revisa las referencias del curso en la carpeta correspondiente\n\n**¿Necesitas más ayuda con esto?**`,
                    actions: ['Referencias digitales', 'Otra duda', 'Gracias']
                });
            } else if (lowerAction.includes('ejercicio') || lowerAction.includes('practicar')) {
                handlers[action] = () => generatePracticeSuggestion(topic);
            } else if (lowerAction.includes('entendido') || lowerAction.includes('ok') || lowerAction.includes('claro')) {
                handlers[action] = () => generateResponse('gracias');
            } else {
                // Intentar buscar el tema relacionado
                const relatedTopic = findRelatedTopic(action);
                if (relatedTopic) {
                    handlers[action] = () => generateResponse(action);
                } else {
                    handlers[action] = () => ({
                        type: 'followup',
                        title: '🎨 Continuando',
                        text: `Sobre ${action}...\n\n¿Qué aspecto específico te interesa?`,
                        actions: ['Explicación básica', 'Ejercicio práctico', 'Otra cosa']
                    });
                }
            }
        });
        
        return handlers;
    }

    // ============================================
    // 6. FUNCIONES AUXILIARES
    // ============================================
    
    function generateExerciseSuggestion(emotion) {
        const exercises = {
            frustracionGeneral: {
                text: "**Ejercicio anti-frustración (5 min):**\n\n1. **Respira** 4-4-6 (3 veces)\n2. **Dibuja 5 círculos rápidos** sin levantar el lápiz\n3. **Dibuja 5 líneas fluidas** de un lado a otro\n4. **Croquis de 2 min** sin borrar NADA\n5. **Observa sin juzgar** qué salió\n\nEste ejercicio resetea tu cerebro. No busca perfección, busca MOVIMIENTO.\n\n**¿Te sientes mejor para continuar?**"
            },
            bloqueoCreativo: {
                text: "**Ejercicio anti-bloqueo (10 min):**\n\n1. Ve 10 fotos de poses en Pinterest/Line of Action\n2. Elige la que MÁS te llame (no pienses mucho)\n3. Dibújala EN 3 MINUTOS (sí, mal hecho)\n4. Elige otra\n5. Repite\n\nEl bloqueo se rompe con VOLUMEN, no con perfección.\n\n**Hazlo ahora y cuéntame cómo te fue.**"
            },
            default: {
                text: "**Ejercicio rápido (5 min):**\n\n1. Dibuja 10 líneas de acción (30 seg cada una)\n2. Sin levantar el lápiz\n3. Cada línea = una pose diferente\n4. No borres NADA\n\nEste ejercicio libera tensión y entrena tu ojo.\n\n**¿Listo para intentarlo?**"
            }
        };
        
        const exercise = exercises[emotion] || exercises.default;
        
        return {
            type: 'exercise',
            title: '💪 Ejercicio Práctico',
            text: exercise.text,
            actions: ['Lo hice, ¿qué sigue?', 'Necesito otra cosa', 'Gracias']
        };
    }

    function generatePracticeSuggestion(topic) {
        const practices = {
            lineaAccion: "**Práctica: Línea de Acción (15 min)**\n\n1. Ve a line-of-action.com\n2. Configura 30 segundos por pose\n3. Dibuja SOLO la línea de acción (una línea curva)\n4. Haz 20 poses\n5. NO agregues cuerpo, solo la línea\n\nEsto entrena tu ojo para capturar el gesto esencial.",
            manosPies: "**Práctica: Manos (20 min)**\n\n1. Dibuja TU MANO (está ahí, úsala)\n2. Solo la palma como bloque 3D (5 min)\n3. Agrega UN dedo con 3 cilindros (5 min)\n4. Completa los demás dedos (10 min)\n\nNo busques perfección, busca ESTRUCTURA 3D.",
            tresMasas: "**Práctica: 3 Masas (15 min)**\n\n1. Busca 5 referencias de poses diferentes\n2. Dibuja solo las 3 masas en cada una:\n   - Cabeza (óvalo)\n   - Torso (caja)\n   - Pelvis (cubo)\n3. Ignora brazos, piernas, detalles\n4. 3 minutos por pose\n\nEsto solidifica tu comprensión de estructura base.",
            default: "**Práctica General (15 min)**\n\n1. Croquis de 2 minutos\n2. Haz 5 poses diferentes\n3. Enfócate en lo que estás aprendiendo\n4. Sin borrar\n\nLa práctica constante es más importante que la perfección."
        };
        
        const practice = practices[topic] || practices.default;
        
        return {
            type: 'practice',
            title: '📝 Ejercicio Práctico',
            text: practice,
            actions: ['Entendido', 'Dame otro ejercicio', 'Otra duda']
        };
    }

    function findRelatedTopic(actionText) {
        const lowerAction = actionText.toLowerCase();
        
        // Buscar en keywords de conocimiento técnico
        for (const [topic, data] of Object.entries(technicalKnowledge)) {
            for (const keyword of data.keywords) {
                if (lowerAction.includes(keyword)) {
                    return topic;
                }
            }
        }
        
        return null;
    }

    // ============================================
    // 5. MEMORIA CONVERSACIONAL MEJORADA
    // ============================================
    class ConversationMemory {
        constructor() {
            this.history = [];
            this.emotionalState = [];
            this.topicsDiscussed = new Set();
            this.sessionStart = new Date();
        }

        add(userMsg, botResponse, emotion, topic) {
            this.history.push({
                user: userMsg,
                bot: botResponse,
                timestamp: new Date(),
                emotion,
                topic
            });

            if (emotion) {
                this.emotionalState.push({ 
                    emotion, 
                    timestamp: new Date() 
                });
            }

            if (topic) {
                this.topicsDiscussed.add(topic);
            }
        }

        shouldOfferBreak() {
            // Si últimas 3 interacciones tienen emociones negativas
            const recent = this.emotionalState.slice(-3);
            const negative = ['frustracionGeneral', 'ansiedadEvaluacion', 'bloqueoCreativo', 'llanto', 'desconexionEmocional'];
            
            return recent.length >= 3 && recent.every(e => negative.includes(e.emotion));
        }

        getSessionDuration() {
            const now = new Date();
            const diff = now - this.sessionStart;
            return Math.floor(diff / (1000 * 60)); // minutos
        }

        shouldSuggestRest() {
            return this.getSessionDuration() > 90; // más de 90 min
        }

        getContextualGreeting() {
            if (this.history.length === 0) return null;

            const lastEmotion = this.emotionalState[this.emotionalState.length - 1];
            if (!lastEmotion) return null;

            const timeSince = Date.now() - lastEmotion.timestamp.getTime();
            const hoursSince = timeSince / (1000 * 60 * 60);

            if (hoursSince < 24) {
                return `Hey, te veo de vuelta 👋. ¿Cómo te fue con lo que hablamos?\n\n¿Mejoraron las cosas o sigues con dudas?`;
            }

            return null;
        }

        getMostDiscussedTopic() {
            // Retorna el tema más discutido para sugerencias
            const topicCounts = {};
            this.history.forEach(entry => {
                if (entry.topic) {
                    topicCounts[entry.topic] = (topicCounts[entry.topic] || 0) + 1;
                }
            });

            let maxTopic = null;
            let maxCount = 0;
            for (const [topic, count] of Object.entries(topicCounts)) {
                if (count > maxCount) {
                    maxCount = count;
                    maxTopic = topic;
                }
            }

            return maxTopic;
        }
    }

    console.log('  ✅ Respuestas "no encontrado" mejoradas');
    console.log('  ✅ Sugerencias de ejercicios contextuales');
    console.log('  ✅ Sistema de memoria conversacional');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🧪 TESTING:');
    console.log('  Prueba: window.mentorKnowledge.testResponse("hola")');
    console.log('  Ejemplos: window.mentorKnowledge.getExamples()');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🚀 Sistema listo para usar!');

})();
