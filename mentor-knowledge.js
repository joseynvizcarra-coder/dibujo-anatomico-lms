// ============================================
// MENTOR ANATÓMICO v5.1 - KEYWORDS FLEXIBLES
// 70 respuestas + Keywords ULTRA FLEXIBLES
// Conversación fluida y natural
// Compatible con integración index.html y module1.html
// ============================================

(function() {
    'use strict';

    // ============================================
    // 1. CONVERSACIÓN BÁSICA Y NATURAL (15 respuestas)
    // ============================================
    const basicConversation = {
        saludos: {
            keywords: [
                'hola', 'hi', 'hey', 'ola', 'holi', 'holaaa', 'holaa', 'holiwis',
                'buenos dias', 'buenos días', 'buenas tardes', 'buenas noches', 'buen dia', 'buen día',
                'que tal', 'qué tal', 'que onda', 'qué onda', 'wenas', 'buenas', 'saludos',
                'alo', 'aló', 'holis', 'holiwi', 'buenass'
            ],
            text: "¡Hola! 👋 Soy tu Mentor Anatómico.\n\n**¿En qué puedo ayudarte hoy?**\n\n💙 **Emocional:** Frustración, ansiedad, bloqueo creativo, síndrome del impostor\n🎨 **Técnico:** Línea de acción, proporciones, anatomía, sombreado\n📚 **Sistema:** Cómo subir ejercicios, ver progreso, materiales\n\n**Escribe tu duda o pregunta** 💬",
            actions: ['Duda técnica', 'Apoyo emocional', 'Info del curso']
        },

        comoEstas: {
            keywords: [
                'como estas', 'cómo estas', 'como estás', 'cómo estás',
                'que tal estas', 'qué tal estás', 'como te va', 'cómo te va',
                'como andas', 'cómo andas', 'como va', 'cómo va',
                'todo bien', 'how are you', 'estas bien', 'estás bien'
            ],
            text: "¡Gracias por preguntar! 💙 Estoy aquí, listo para ayudarte.\n\n**¿Y tú cómo estás?** ¿Cómo va tu proceso de aprendizaje?\n\nEstoy para apoyarte en lo que necesites: dudas técnicas, apoyo emocional, o info del curso.",
            actions: ['Tengo una duda', 'Me siento frustrado/a', 'Solo charlando']
        },

        puedoPreguntar: {
            keywords: [
                'puedo preguntar', 'tengo una pregunta', 'quiero preguntar',
                'me puedes ayudar', 'puedes ayudarme', 'necesito ayuda',
                'tengo una duda', 'tengo duda', 'duda', 'pregunta',
                'consulta', 'quiero saber', 'me gustaria saber', 'me gustaría saber',
                'quisiera saber', 'puedo consultar', 'una consulta'
            ],
            text: "¡Claro que sí! 😊 Estoy aquí justamente para eso.\n\n**Adelante, pregunta lo que necesites:**\n\n💙 **Emocional** (frustración, ansiedad, bloqueo...)\n🎨 **Técnico** (anatomía, proporciones, sombreado...)\n📚 **Sistema** (cómo usar el curso, materiales...)\n\n¿Qué te gustaría saber?",
            actions: []
        },

        gracias: {
            keywords: [
                'gracias', 'thanks', 'thank you', 'muchas gracias', 'mil gracias',
                'te lo agradezco', 'muy util', 'muy útil', 'me ayudo', 'me ayudó',
                'me sirvio', 'me sirvió', 'grax', 'grcs', 'tkm', 'eres genial',
                'excelente', 'perfecto', 'justo lo que necesitaba', 'eso necesitaba'
            ],
            text: "¡De nada! 💙 Me alegra mucho haberte ayudado.\n\n**¿Necesitas algo más?**\n\nSigue practicando, cada trazo cuenta. Estoy aquí cuando me necesites ✨",
            actions: ['Tengo otra duda', 'Estoy bien, gracias']
        },

        despedida: {
            keywords: [
                'chao', 'adios', 'adiós', 'nos vemos', 'hasta luego',
                'bye', 'me voy', 'cierro', 'chau', 'hasta pronto',
                'me despido', 'goodbye', 'bay', 'see you', 'hasta mañana',
                'me tengo que ir', 'debo irme'
            ],
            text: "¡Hasta pronto! 👋✨\n\n**Recuerda:**\n- Practica un poco cada día\n- El progreso es acumulativo\n- Cada línea cuenta\n\n**¡Sigue dibujando!** 🎨 Estaré aquí cuando vuelvas.",
            actions: []
        },

        ayuda: {
            keywords: [
                'ayuda', 'help', 'que puedes hacer', 'qué puedes hacer',
                'que sabes', 'qué sabes', 'como funciona', 'cómo funciona',
                'comandos', 'opciones', 'ayudame', 'ayúdame', 'auxilio',
                'no se que hacer', 'no sé qué hacer', 'menu', 'menú'
            ],
            text: "**Puedo ayudarte con:**\n\n💙 **EMOCIONAL (25 temas):**\nFrustración, ansiedad (general/evaluación/social), bloqueo, comparación, síndrome del impostor, procrastinación, vergüenza, burnout, culpa, y más\n\n🎨 **TÉCNICO (35 temas):**\n• Módulo 1: Línea de acción, proporciones, croquis\n• Módulo 2: 3 masas, anatomía, manos/pies\n• Módulo 3: Valores tonales, proyecto final\n\n📚 **SISTEMA (5 temas):**\nSubir ejercicios, progreso, materiales\n\n**Escribe tu duda en lenguaje natural** 💬",
            actions: ['Ver todo emocional', 'Ver todo técnico', 'Ver sistema']
        },

        clarificacion: {
            keywords: [
                'no entiendo', 'explica mejor', 'otra vez', 'más claro', 'mas claro',
                'confuso', 'no comprendo', 'que', 'qué', 'como', 'cómo',
                'no capto', 'repite', 'explica de nuevo', 'no entendí', 'no entendi',
                'dificil', 'difícil', 'complicado'
            ],
            text: "Claro, voy a explicarlo de otra forma 💡\n\n**Dime específicamente:**\n¿Qué parte no quedó clara?\n¿Es un concepto técnico o emocional?\n\nPuedo usar ejemplos, analogías o un paso a paso más detallado.",
            actions: ['Es algo técnico', 'Es algo emocional', 'Repite más simple']
        },

        casualConversation1: {
            keywords: [
                'estoy dibujando', 'estoy practicando', 'voy a dibujar',
                'voy a practicar', 'empecé', 'empece', 'comencé', 'comence',
                'terminé', 'termine', 'hice un dibujo'
            ],
            text: "¡Qué bien! 🎨✨ Me alegra que estés practicando.\n\n**¿Cómo te está yendo?**\n¿Hay algo específico en lo que te pueda ayudar mientras dibujas?\n\nEstoy aquí para ti.",
            actions: ['Tengo una duda', 'Todo bien', 'Me frustré']
        },

        casualConversation2: {
            keywords: [
                'solo charlando', 'nada en particular', 'solo hablaba',
                'por hablar', 'curiosidad', 'explorando', 'probando'
            ],
            text: "¡Perfecto! 😊 No hay problema.\n\nSi más adelante necesitas ayuda con:\n- Dudas técnicas de dibujo\n- Apoyo emocional\n- Info del curso\n\n**Aquí estaré** 💙",
            actions: []
        },

        motivacion: {
            keywords: [
                'dame animo', 'dame ánimo', 'motivame', 'motívame',
                'necesito motivacion', 'necesito motivación', 'desmotivado', 'desmotivada',
                'sin ganas', 'aburrido', 'aburrida'
            ],
            text: "¡Escucha esto! 💪✨\n\n**Cada trazo que haces te acerca a tu objetivo.**\n\nNo importa si hoy dibujaste \"mal\". Lo importante es que DIBUJASTE.\n\n**Verdad:** Los profesionales también tienen días malos. La diferencia es que NO PARAN.\n\n**Tú tampoco pares.** El talento es 1%, la constancia es 99%.\n\n¿Seguimos? 🎨",
            actions: ['Sí, sigamos', 'Necesito más apoyo']
        },

        presentacion: {
            keywords: [
                'quien eres', 'quién eres', 'que eres', 'qué eres',
                'presentate', 'preséntate', 'dime sobre ti', 'cuentame de ti',
                'cuéntame de ti', 'que haces', 'qué haces'
            ],
            text: "¡Encantado de conocerte! 🎨✨\n\nSoy tu **Mentor Anatómico v5.1**, tu compañero de aprendizaje 24/7.\n\n**Lo que hago:**\n💙 Te apoyo emocionalmente (frustración, ansiedad, bloqueos)\n🎨 Resuelvo dudas técnicas (anatomía, proporciones, sombreado)\n📚 Te guío en el sistema del curso\n\n**Mi misión:** Que aprendas sin frustración y disfrutes el proceso.\n\n¿Empezamos?",
            actions: ['Tengo una duda', 'Solo curiosidad']
        },

        check: {
            keywords: [
                'estas ahi', 'estás ahí', 'estas', 'estás',
                'me escuchas', 'me lees', 'funcionas',
                'sigues ahi', 'sigues ahí', 'hola?', 'hola??'
            ],
            text: "¡Sí! Aquí estoy 👋\n\nEstoy escuchando y listo para ayudarte.\n\n¿Qué necesitas?",
            actions: ['Tengo una pregunta', 'Solo verificaba']
        },

        disculpa: {
            keywords: [
                'disculpa', 'perdón', 'perdon', 'sorry',
                'lo siento', 'perdona', 'disculpame', 'discúlpame'
            ],
            text: "No hay problema 😊 No necesitas disculparte.\n\nEstoy aquí para ayudarte en lo que necesites, sin juicios.\n\n¿En qué puedo apoyarte?",
            actions: []
        },

        broma: {
            keywords: [
                'jaja', 'jeje', 'jiji', 'jojo', 'juju',
                'jajaja', 'jejeje', 'jijiji',
                'lol', 'xd', 'XD', 'xD', 'Xd',
                'hahaha', 'hehe', 'hihi'
            ],
            text: "😄 Me alegra que estés de buen humor.\n\nEl aprendizaje es mejor con una sonrisa. ¿Continuamos?",
            actions: ['Sí, sigamos', 'Tengo una duda']
        },

        afirmacion: {
            keywords: [
                'ok', 'okay', 'vale', 'entendido', 'claro',
                'si', 'sí', 'okey', 'de acuerdo', 'perfecto',
                'bien', 'genial', 'excelente', 'listo'
            ],
            text: "¡Perfecto! 👍\n\n¿Hay algo más en lo que pueda ayudarte?",
            actions: ['Tengo otra duda', 'No, gracias']
        }
    };

    // ============================================
    // 2. BASE DE CONOCIMIENTO EMOCIONAL (25 respuestas)
    // ============================================
    const emotionalKnowledge = {
        frustracion: {
            keywords: [
                'frustrado', 'frustrada', 'frustrante', 'frustra', 'frustracion', 'frustración',
                'no puedo', 'no me sale', 'no logro', 'no consigo',
                'horrible', 'mal', 'feo', 'terrible', 'pesimo', 'pésimo', 'desastre',
                'que rabia', 'qué rabia', 'molesto', 'molesta', 'enojado', 'enojada', 'me enoja',
                'todo me sale mal', 'nada funciona', 'no funciona', 'no sirve',
                'odio dibujar', 'odio esto', 'detesto', 'asco',
                'desesperado', 'desesperada', 'desesperacion', 'desesperación',
                'me siento muy frustrado', 'esto es horrible', 'estoy frustrada'
            ],
            responses: {
                leve: {
                    text: "Hey, respira 💙. La frustración es señal de que estás aprendiendo algo nuevo.\n\n**Técnica rápida:** Respira 4 segundos (inhala) - 4 segundos (sostén) - 6 segundos (exhala). Hazlo 3 veces.\n\nLuego vuelve con curiosidad, no con juicio.",
                    actions: ['Estoy mejor', 'Necesito más ayuda']
                },
                media: {
                    text: "Entiendo tu frustración 💙. El 78% del curso pasa por esto. **Eres normal**.\n\n**Lo que pasa:** Tu ojo ve MÁS rápido de lo que tu mano hace. Esa brecha genera frustración.\n\n**Solución:** Práctica constante. La brecha se cierra con tiempo.",
                    actions: ['¿Cuánto tiempo?', 'Dame un ejercicio']
                },
                alta: {
                    text: "**PARA**. No dibujes ahora. En serio.\n\n**Haz esto:**\n1. Cierra tu cuaderno\n2. Camina 10 minutos\n3. Toma agua\n4. Vuelve tranquilo/a\n\nDibujar muy frustrado = malos hábitos.",
                    actions: ['Sí, hablemos', 'Solo necesitaba oír eso']
                }
            }
        },
        
        comparacion: {
            keywords: [
                'mejor que yo', 'peor que', 'otros dibujan', 'comparar', 'comparación', 'comparacion',
                'talento', 'nunca voy a', 'no tengo', 'no poseo',
                'envidia', 'envidiosa', 'envidioso', 'celos', 'celoso', 'celosa',
                'todos menos yo', 'por qué yo no', 'porque yo no', 'solo a mi', 'sólo a mí',
                'todos pueden', 'todos logran', 'yo soy el único', 'yo soy la única',
                'todos son mejores', 'soy el peor', 'soy la peor', 'el más malo', 'la más mala',
                'todos dibujan mejor que yo', 'por que yo no tengo talento',
                'otros avanzan más rápido', 'siempre hay alguien mejor'
            ],
            responses: {
                text: "🛑 **Alto ahí**. Compararse mata el progreso creativo.\n\n**Verdad dura:** Siempre habrá alguien \"mejor\". Siempre.\n\n**Pregunta real:** ¿Dibujas mejor que AYER? Esa es la única comparación válida.\n\nCompárate con tu yo de hace 1 semana.",
                actions: ['Tienes razón', '¿Y si no veo progreso?']
            }
        },
        
        impostor: {
            keywords: [
                'no merezco', 'soy un fraude', 'suerte', 'engaño', 'impostor', 'impostora',
                'no soy artista', 'farsante', 'mentira', 'fake', 'falso', 'falsa',
                'no valgo', 'no soy bueno', 'no soy buena', 'casualidad', 'fluke',
                'fue suerte', 'pura suerte', 'no sé cómo', 'no se como',
                'alguien se dará cuenta', 'me van a descubrir', 'van a descubrir',
                'no debería estar aquí', 'no deberia estar aqui',
                'siento que soy un fraude', 'no merezco estar aquí',
                'fue pura suerte', 'no soy realmente artista',
                'sindrome del impostor', 'síndrome del impostor'
            ],
            responses: {
                text: "Síndrome del impostor detectado 🎭. El 70% de artistas lo experimenta.\n\n**Realidad:** Si HACES arte, ERES artista. Punto.\n\n**Tip:** Reemplaza \"no soy artista\" por: \"Soy un artista en desarrollo\".\n\nTu práctica te hace artista.",
                actions: ['Me ayuda oír eso', 'Pero mis dibujos son malos']
            }
        },
        
        bloqueo: {
            keywords: [
                'bloqueado', 'bloqueada', 'bloqueo', 'bloqueada',
                'no se que dibujar', 'no sé qué dibujar', 'blanco', 'sin ideas',
                'vacío', 'vacio', 'estancado', 'estancada', 'atrapado', 'atrapada',
                'stuck', 'no avanzo', 'página en blanco', 'pagina en blanco',
                'mente en blanco', 'sin inspiración', 'sin inspiracion',
                'no se me ocurre nada', 'no se me ocurre', 'creatividad bloqueada',
                'estoy bloqueado', 'no sé qué dibujar', 'página en blanco', 'estoy estancada',
                'bloqueo creativo'
            ],
            responses: {
                text: "Bloqueo = falta de INPUT, no falta de talento.\n\n**Ejercicio (15 min):**\n1. Ve 20 fotos de poses en Pinterest/Line of Action\n2. Elige la que MÁS te llame\n3. Dibújala EN 5 MINUTOS (sí, mal hecho)\n4. Repite\n\nEl bloqueo se rompe con VOLUMEN.",
                actions: ['Voy a intentarlo', '¿Dónde busco referencias?']
            }
        },
        
        ansiedad: {
            keywords: [
                'ansioso', 'ansiosa', 'ansiedad', 'ansiedades',
                'nervios', 'nervioso', 'nerviosa', 'nerviosismo',
                'estresado', 'estresada', 'presión', 'presion', 'estrés', 'estres',
                'inquieto', 'inquieta', 'intranquilo', 'intranquila',
                'angustia', 'agobio', 'agobiado', 'agobiada',
                'pánico', 'panico', 'ataque de ansiedad', 'crisis',
                'tengo mucha ansiedad', 'estoy muy nervioso',
                'me siento estresada al dibujar', 'tengo angustia',
                'ansiedad general'
            ],
            responses: {
                text: "La ansiedad es energía mal dirigida. Vamos a redirigirla.\n\n**Técnica 5-4-3-2-1:**\n- 5 cosas que VES\n- 4 que TOCAS\n- 3 que ESCUCHAS\n- 2 que HUELES\n- 1 que SABOREAS\n\nEsto te ancla al presente. La ansiedad vive en el futuro.",
                actions: ['Lo haré', 'Mi ansiedad es por evaluación']
            }
        },
        
        perfeccionismo: {
            keywords: [
                'perfecto', 'perfecta', 'perfeccionista', 'perfeccion', 'perfección',
                'tiene que quedar bien', 'debe quedar perfecto', 'no está bien', 'no esta bien',
                'borrar todo', 'nunca termino', 'siempre borro', 'borro mucho',
                'obsesionado', 'obsesionada', 'detalle', 'imperfecto',
                'no queda como quiero', 'no me convence', 'falta algo',
                'siempre borro todo', 'nunca termino nada',
                'tiene que quedar perfecto', 'soy muy perfeccionista'
            ],
            responses: {
                text: "Perfeccionismo NO es excelencia. Es miedo disfrazado.\n\n**Regla 80/20:** Un dibujo al 80% te enseña MÁS que uno al 100%.\n\n¿Por qué? Porque TERMINAS más.\n\n**Ejercicio:** Próximo dibujo en la MITAD del tiempo. Prohibido borrar.\n\nAbraza lo \"feo\".",
                actions: ['Me cuesta no borrar', 'Voy a intentar']
            }
        },
        
        cansancio: {
            keywords: [
                'cansado', 'cansada', 'agotado', 'agotada', 'cansancio', 'agotamiento',
                'no tengo energía', 'no tengo energia', 'energía', 'energia',
                'sueño', 'sueno', 'somnoliento', 'somnolenta',
                'exhaust', 'fatiga', 'sin fuerzas', 'rendido', 'rendida',
                'muerto', 'muerta', 'reventado', 'reventada',
                'estoy muy cansado', 'sin energía', 'agotada', 'muerta de sueño'
            ],
            responses: {
                text: "Dibujar cansado/a = entrenar enfermo. Contraproducente.\n\n**Prioriza:**\n1. Dormir 7-8 horas\n2. Comer bien\n3. Moverte\n4. DESPUÉS dibujar\n\nTu creatividad necesita energía física.\n\nDescansa hoy, dibuja mañana.",
                actions: ['Necesitaba oír esto', 'Pero tengo deadline']
            }
        },
        
        miedo: {
            keywords: [
                'miedo', 'temor', 'asusta', 'da pánico', 'da panico', 'terror',
                'miedoso', 'miedosa', 'temeroso', 'temerosa', 'aterrado', 'aterrada',
                'pavor', 'fobia', 'me da miedo', 'tengo miedo',
                'miedo a equivocarme', 'miedo al error', 'miedo a fallar',
                'tengo miedo de equivocarme', 'me da pánico empezar',
                'miedo al error', 'me aterroriza fallar'
            ],
            responses: {
                text: "El miedo al error es enemigo #1 del aprendizaje.\n\n**Verdad:** Los dibujos \"malos\" enseñan MÁS que los \"buenos\".\n\nCada error es data. Data = aprendizaje.\n\n**Mantra:** \"Este dibujo no define mi valor como artista\".\n\nEl miedo se disuelve con repetición.",
                actions: ['¿Y si sigo teniendo miedo?', 'Voy a intentarlo']
            }
        },
        
        desmotivacion: {
            keywords: [
                'desmotivado', 'desmotivada', 'sin ganas', 'desmotivacion', 'desmotivación',
                'para qué', 'para que', 'no vale la pena', 'no quiero',
                'aburrido', 'aburrida', 'perdí interés', 'perdi interes',
                'ya no me gusta', 'desanimado', 'desanimada',
                'no tiene sentido', 'para nada', 'sin propósito', 'sin proposito',
                'ya no tengo ganas', 'para qué sigo', 'perdí la motivación',
                'no vale la pena'
            ],
            responses: {
                text: "Desmotivación = expectativas vs. realidad desalineadas.\n\n**Pregunta:** ¿Por qué empezaste este curso?\n\nReconecta con ESO.\n\n**Micro-motivación:** Dibuja solo 5 minutos hoy. SOLO 5.\n\nLa motivación sigue a la acción, no al revés.",
                actions: ['Voy a intentar 5 min', 'Ya no recuerdo por qué empecé']
            }
        },
        
        llanto: {
            keywords: [
                'llorar', 'lloro', 'lágrimas', 'lagrimas', 'ganas de llorar',
                'lloré', 'llore', 'llorando', 'lloros',
                'triste', 'tristeza', 'quiero llorar', 'me dan ganas de llorar',
                'lloros', 'lloroso', 'llorosa', 'sollozar', 'sollozo',
                'tengo ganas de llorar', 'lloré dibujando', 'lágrimas', 'quiero llorar'
            ],
            responses: {
                text: "Llorar está bien. En serio. No es debilidad.\n\nEstás procesando frustración, expectativa, esfuerzo. Eso es HUMANO.\n\n**Permiso oficial:** Llora si necesitas. Luego lávate la cara, toma agua.\n\nTu bienestar > cualquier dibujo. Siempre. 💙",
                actions: ['Gracias, necesitaba esto', 'Estoy mejor ahora']
            }
        },

        ansiedadEvaluacion: {
            keywords: [
                'evaluación', 'evaluacion', 'me van a evaluar', 'calificación', 'calificacion',
                'nota', 'examen', 'test', 'revisión', 'revision',
                'me juzgan', 'van a criticar', 'feedback me asusta', 'miedo al feedback',
                'miedo a la evaluación', 'miedo a la evaluacion',
                'me van a revisar', 'me van a corregir', 'corrección', 'correccion',
                'me da miedo la evaluación', 'me asusta el feedback',
                'tengo ansiedad por la revisión', 'van a calificar mi trabajo',
                'ansiedad por evaluación'
            ],
            responses: {
                text: "**Ansiedad por evaluación es súper común.**\n\n**Reframe mental:**\nFeedback NO es juicio personal. Es información.\n\n**Verdad:** Nadie evalúa TU VALOR como persona. Solo observan una habilidad en desarrollo.\n\n**Tip:** Lee feedback 24h después, no inmediatamente.\n\nTu cerebro necesita tiempo para procesar.",
                actions: ['Me ayuda', '¿Cómo manejarlo mejor?']
            }
        },

        ansiedadSocial: {
            keywords: [
                'mostrar mi arte', 'enseñar dibujos', 'compartir', 'publicar',
                'subir a redes', 'instagram', 'vergüenza social', 'verguenza social',
                'que dirán', 'qué dirán', 'me van a criticar', 'miedo a opiniones',
                'exponerme', 'exponer mi arte',
                'mostrar en público', 'mostrar en publico', 'redes sociales me asustan',
                'me da miedo mostrar mis dibujos', 'tengo vergüenza de publicar en Instagram',
                'no quiero compartir mi arte', 'me da cosa que vean mis dibujos'
            ],
            responses: {
                text: "**Miedo a mostrar arte = miedo al rechazo (natural).**\n\n**Verdad liberadora:** El 99% de la gente NO opina. Ni positivo ni negativo.\n\n**Los que opinan negativo:** Proyectan SUS inseguridades.\n\n**Ejercicio:** Comparte 1 dibujo \"malo\" intencionalmente. Observa: nada explota.\n\nTu valor ≠ likes.",
                actions: ['Voy a intentar', 'Sigo con miedo']
            }
        },

        procrastinacion: {
            keywords: [
                'procrastinar', 'procrastinación', 'procrastinacion', 'postergar',
                'dejar para después', 'dejar para despues', 'mañana empiezo', 'manana empiezo',
                'luego lo hago', 'no empiezo', 'posponer', 'evito dibujar',
                'excusas', 'flojera', 'pereza', 'perezoso', 'perezosa',
                'después lo hago', 'despues lo hago', 'ya lo haré', 'ya lo hare',
                'siempre dejo todo para después', 'no puedo empezar a dibujar',
                'procrastino mucho', 'mañana empiezo'
            ],
            responses: {
                text: "**Procrastinación = evasión de incomodidad.**\n\n**No es pereza. Es miedo disfrazado.**\n\n**Técnica 2 minutos:**\n\"Solo voy a abrir mi cuaderno.\"\n\nEso es TODO. Nada más.\n\n**Ciencia:** Empezar es lo más difícil. Después, momentum te lleva.\n\nLa acción genera motivación, no al revés.",
                actions: ['Voy a abrir mi cuaderno', '¿Más técnicas?']
            }
        },

        autodepreciacion: {
            keywords: [
                'soy malo', 'soy mala', 'no sirvo', 'inútil', 'inutilidad',
                'patético', 'patética', 'desastre', 'pésimo', 'pésima', 'pesimo', 'pesima',
                'no tengo talento', 'nunca aprenderé', 'nunca aprendere', 'soy horrible',
                'soy un fracaso', 'soy una fracasada', 'no valgo nada', 'basura',
                'soy muy malo dibujando', 'no sirvo para esto',
                'soy un desastre', 'no tengo talento'
            ],
            responses: {
                text: "**ALTO. Eso que dices no es verdad.**\n\n**Habilidad ≠ Identidad.**\n\nHoy dibujas a nivel X. Eso no te define.\n\n**Cambia el lenguaje:**\n❌ \"Soy malo/a\"\n✅ \"Aún estoy aprendiendo esto\"\n\n**Pregunta:** ¿Le dirías eso a un amigo?\n\nNo te mereces ese trato tampoco.",
                actions: ['Tienes razón', 'Me cuesta no criticarme']
            }
        },

        culpa: {
            keywords: [
                'culpa', 'culpable', 'me siento culpable',
                'debería practicar', 'debería haber', 'deberia', 'debi',
                'no practiqué', 'no practique', 'me siento mal por no',
                'tiempo perdido', 'he fallado', 'me rendí', 'me rendi',
                'culpabilidad', 'remordimiento', 'arrepentido', 'arrepentida',
                'me siento culpable por no practicar', 'debería haber dibujado más',
                'perdí mucho tiempo', 'he fallado'
            ],
            responses: {
                text: "**La culpa NO te hace dibujar mejor.**\n\n**Dato:** Nadie practica perfecto. Ni Picasso.\n\n**Realidad:** Tomaste un descanso. Necesario y válido.\n\n**Ahora:** Vuelve sin drama. Sin autoflagelación.\n\nDibuja 5 min hoy. Ya. Eso borra la culpa.\n\nAcción > culpa.",
                actions: ['Voy a dibujar ahora', 'Pero perdí mucho tiempo']
            }
        },

        overwhelm: {
            keywords: [
                'abrumado', 'abrumada', 'demasiado', 'mucho', 'muchísimo', 'muchisimo',
                'sobrepasado', 'sobrepasada', 'no doy abasto', 'agobiado', 'agobiada',
                'colapsado', 'colapsada', 'overwhelmed', 'es mucho',
                'demasiadas cosas', 'no puedo con todo', 'me supera',
                'estoy abrumado', 'es demasiado', 'no doy abasto', 'estoy colapsado'
            ],
            responses: {
                text: "**Overwhelm = intentar todo a la vez.**\n\n**Principio:** Puedes hacerlo TODO. Solo que no AHORA.\n\n**Ejercicio emergencia:**\n1. Escribe TODAS las tareas\n2. Elige solo UNA\n3. Ignora el resto HOY\n\n**Mantra:** \"Solo esto. Nada más por ahora.\"\n\nMultitasking es mito.",
                actions: ['Me ayuda', '¿Cómo priorizar?']
            }
        },

        verguenza: {
            keywords: [
                'vergüenza', 'verguenza', 'me da pena', 'da vergüenza', 'da verguenza',
                'penoso', 'penosa', 'humillante', 'avergonzado', 'avergonzada',
                'bochorno', 'me da cosa', 'ridículo', 'ridiculo', 'pasar vergüenza', 'pasar verguenza',
                'me da vergüenza mi trabajo', 'es muy penoso',
                'me da pena mostrar esto', 'qué humillante'
            ],
            responses: {
                text: "**Vergüenza artística = temer ser visto como \"malo/a\".**\n\n**Secreto:** Nadie nace sabiendo. TODOS empezamos \"mal\".\n\n**Ejercicio mental:**\nImagina a alguien mostrándote su primer dibujo torpe. ¿Lo juzgas?\n\nNo. Admiras su valentía.\n\n**Aplica eso a ti.**\n\nVergüenza disminuye con exposición repetida.",
                actions: ['Lo intentaré', 'Pero mi trabajo ES vergonzoso']
            }
        },

        inseguridad: {
            keywords: [
                'inseguro', 'insegura', 'no estoy seguro', 'no estoy segura',
                'dudas', 'dudo', 'no confío', 'no confio', 'incertidumbre',
                'no sé si', 'no se si', 'será que', 'sera que',
                'inseguridad', 'duda constante', 'siempre dudo',
                'no estoy segura de nada', 'tengo muchas dudas',
                'no confío en mí', 'incertidumbre total'
            ],
            responses: {
                text: "**Inseguridad = espacio entre donde estás y donde quieres estar.**\n\n**Es normal. Es UNIVERSAL.**\n\n**Truco mental:**\nLa inseguridad nunca desaparece. Los profesionales también la sienten.\n\n**Diferencia:** Ellos actúan A PESAR de la inseguridad.\n\n**Tu turno:** Dibuja inseguro/a. Pero DIBUJA.",
                actions: ['Voy a intentar', '¿Cómo ganan confianza los pros?']
            }
        },

        miedoJuicio: {
            keywords: [
                'me van a juzgar', 'van a criticar', 'qué pensarán', 'que pensaran',
                'opinarán mal', 'opinaran mal', 'se reirán', 'se reiran',
                'se burlarán', 'se burlaran', 'hablarán mal', 'hablaran mal',
                'miedo a la crítica', 'miedo a la critica', 'críticas', 'criticas',
                'me van a criticar', 'se van a reír de mí',
                '¿qué pensarán?', 'van a hablar mal'
            ],
            responses: {
                text: "**Miedo al juicio = asumir lo peor.**\n\n**Dato real:** La mayoría de la gente está ocupada con SU vida.\n\n**Los que juzgan duro:** Proyectan inseguridades propias.\n\n**Tu trabajo:** Hacer arte para TI primero.\n\nOpiniones ajenas = ruido.\n\n**Filtro útil:** ¿Esta persona ha hecho lo que yo intento? Si no, su opinión es irrelevante.",
                actions: ['Tiene sentido', 'Pero me importa qué piensen']
            }
        },

        paralisisAnalisis: {
            keywords: [
                'analizar demasiado', 'pensar mucho', 'overthinking', 'doy vueltas',
                'no decido', 'paralizado', 'paralizada', 'no puedo decidir',
                'muchas opciones', 'parálisis', 'paralisis',
                'demasiado análisis', 'demasiado analisis', 'pienso en exceso',
                'pienso demasiado', 'no puedo decidir', 'doy muchas vueltas', 'overthinking'
            ],
            responses: {
                text: "**Parálisis por análisis = cerebro en loop infinito.**\n\n**Problema:** Quieres la decisión \"perfecta\". No existe.\n\n**Solución:** Regla de 70%.\nCon 70% de info, DECIDE. El resto lo aprendes haciendo.\n\n**Ejercicio:** Timer 2 minutos. Al finalizar, decides SÍ o NO.\n\nAcción imperfecta > reflexión perfecta.",
                actions: ['Lo haré', '¿Qué si me equivoco?']
            }
        },

        burnout: {
            keywords: [
                'burnout', 'quemado', 'quemada', 'harto', 'harta',
                'exhausto emocional', 'exhausta emocional', 'no siento nada',
                'vacío creativo', 'vacio creativo', 'sin chispa',
                'agotamiento emocional', 'desgaste', 'desgastado', 'desgastada',
                'estoy quemado creativamente', 'ya no siento nada al dibujar',
                'vacío creativo', 'sin chispa'
            ],
            responses: {
                text: "**Burnout creativo = señal de STOP obligatorio.**\n\n**Síntomas reconocibles:**\n- Dibujar se siente como obligación\n- Cero disfrute\n- Todo te irrita\n\n**Prescripción:**\nDESCANSO TOTAL. 1-2 semanas SIN dibujar.\n\n**Prohibido sentir culpa.**\n\nTu cerebro necesita reset. Vuelve cuando QUIERAS, no cuando \"debas\".",
                actions: ['Voy a descansar', 'Pero no puedo parar']
            }
        },

        redesSociales: {
            keywords: [
                'instagram', 'artstation', 'twitter', 'tiktok', 'redes sociales', 'redes',
                'likes', 'followers', 'seguidores', 'algoritmo', 'views', 'viral',
                'engagement', 'social media',
                'comparación en redes', 'comparacion en redes', 'números en redes', 'numeros en redes',
                'me obsesiono con los likes', 'instagram me estresa',
                'el algoritmo me frustra', 'comparación en redes'
            ],
            responses: {
                text: "**Redes sociales ≠ medidor de talento.**\n\n**Algoritmo favorece:** Consistencia, tendencias, suerte.\nNO necesariamente calidad.\n\n**Artistas increíbles con 200 seguidores:** Existen.\n**Arte mediocre con 50K seguidores:** También existe.\n\n**Tu enfoque:** Mejorar habilidad, no números.\n\nLikes son validación externa. Progreso es validación interna.",
                actions: ['Necesitaba oír esto', '¿Cómo no obsesionarme?']
            }
        },

        presionRapida: {
            keywords: [
                'mejorar rápido', 'mejorar rapido', 'quiero ser bueno ya', 'cuanto tiempo tarda',
                'cuánto tiempo tarda', 'cuando seré bueno', 'cuándo seré bueno',
                'impaciencia', 'apurado', 'apurada', 'prisa',
                'quiero resultados ya', 'atajos', 'método rápido', 'metodo rapido',
                'quiero mejorar rápido', '¿cuándo seré bueno?',
                'impaciencia', 'necesito avanzar YA'
            ],
            responses: {
                text: "**Querer resultados rápidos = receta para frustración.**\n\n**Tiempo real:** 1,000-2,000 horas para dominio básico.\nTraducido: 1-2 años con práctica diaria.\n\n**No hay atajos. Lo siento.**\n\n**Buena noticia:** Cada sesión suma. CADA UNA.\n\n**Cambia enfoque:**\nNo busques \"ser bueno/a\".\nBusca \"disfrutar el proceso\".\n\nEl dominio llega sin que lo notes.",
                actions: ['Entiendo', 'Pero necesito mejorar YA']
            }
        },

        miedoPublico: {
            keywords: [
                'equivocarme en público', 'equivocarme en publico', 'error en vivo',
                'en clase', 'frente a otros', 'me vean', 'me miren',
                'hacer el ridículo', 'hacer el ridiculo', 'exponerme',
                'presentar en público', 'presentar en publico', 'miedo escénico', 'miedo escenico',
                'miedo a equivocarme en clase', 'me da pánico en vivo',
                'hacer el ridículo', 'que me vean fallar'
            ],
            responses: {
                text: "**Miedo escénico artístico es real.**\n\n**Verdad:** TODOS se equivocan en público. Hasta maestros.\n\n**Reframe:** Equivocarte públicamente = mostrar humanidad.\n\nLa gente se identifica más contigo.\n\n**Practica:** Comparte 1 dibujo \"feo\" cada semana.\n\nLa repetición desensibiliza el miedo.",
                actions: ['Lo intentaré', 'Pero me paralizo']
            }
        },

        dueloArtistico: {
            keywords: [
                'arruiné mi dibujo', 'arruine mi dibujo', 'lo eché a perder', 'lo eche a perder',
                'destruí mi arte', 'destrui mi arte', 'perdí horas', 'perdi horas',
                'tiempo desperdiciado',
                'arruinado', 'arruinada', 'dibujo perdido', 'trabajo perdido',
                'arruiné mi dibujo', 'perdí horas de trabajo',
                'destruí mi arte', 'tiempo desperdiciado'
            ],
            responses: {
                text: "**Duelo artístico = lamentar trabajo \"perdido\".**\n\n**Reframe potente:**\nNO perdiste tiempo. Ganaste INFORMACIÓN.\n\n**Cada \"dibujo arruinado\" te enseñó:**\n- Qué NO hacer\n- Límites de tu técnica actual\n- Paciencia\n\n**Regla profesional:** Por cada 10 dibujos, 3 son \"buenos\".\n\nLos otros 7 = escalones hacia esos 3.\n\nNada se desperdicia.",
                actions: ['No lo había pensado así', 'Sigo dolido/a']
            }
        }
    };

    // ============================================
    // 3. BASE DE CONOCIMIENTO TÉCNICO (35 respuestas)
    // CON KEYWORDS ULTRA FLEXIBLES
    // ============================================
    const technicalKnowledge = {
        // ===== MÓDULO 1: FUNDAMENTOS (10) =====
        lineaAccion: {
            keywords: [
                // Directo
                'linea de accion', 'linea accion', 'línea de acción', 'línea acción',
                // Preguntas flexibles
                'como hago la linea de accion', 'cómo hago la línea de acción',
                'como hacer linea de accion', 'cómo hacer línea de acción',
                'que es la linea de accion', 'qué es la línea de acción',
                'explica linea de accion', 'explícame línea de acción',
                'ayuda con linea de accion', 'ayuda línea de acción',
                'no entiendo linea de accion', 'no entiendo línea de acción',
                'enseñame linea de accion', 'enséñame línea de acción',
                // Gesto
                'gesto', 'movimiento', 'dinamica', 'dinámica', 'gesto rápido', 'gesto rapido',
                'curva del cuerpo', 'eje del movimiento', 'línea principal', 'linea principal',
                // Variantes de ayuda
                'como se hace linea de accion', 'cómo se hace línea de acción',
                'linea de accion tutorial', 'línea de acción tutorial'
            ],
            responses: {
                text: "**Línea de acción** = Curva imaginaria que atraviesa el cuerpo mostrando su movimiento.\n\n**Cómo encontrarla:**\n1. Ignora detalles\n2. Busca la curva desde cabeza a pies\n3. Dibújala en 1 segundo\n\n**Formas base:** 'S', 'C' o línea recta.\n\nCroquis empieza SIEMPRE con esto.",
                actions: ['Dame ejemplo', 'Entendido']
            }
        },
        
        medirProporcion: {
            keywords: [
                // Directo
                'medir', 'proporcion', 'proporciones', 'proporción',
                // Preguntas flexibles
                'como medir proporciones', 'cómo medir proporciones',
                'como mido proporciones', 'cómo mido proporciones',
                'que son las proporciones', 'qué son las proporciones',
                'explica proporciones', 'explícame proporciones',
                'ayuda con proporciones', 'no entiendo proporciones',
                'enseñame a medir', 'enséñame a medir',
                // Lápiz
                'lapiz', 'lápiz', 'medicion', 'medición',
                'como medir con lapiz', 'cómo medir con lápiz',
                'medir con el lapiz', 'medir con el lápiz',
                // Reglas
                'regla de la cabeza', 'unidad de medida', 'sight-size',
                'proporciones del cuerpo', 'proporción humana', 'proporcion humana',
                // Variantes de ayuda
                'como se mide', 'cómo se mide', 'tecnica de medicion', 'técnica de medición'
            ],
            responses: {
                text: "**Medir con lápiz:**\n1. Estira brazo COMPLETO\n2. Cierra un ojo\n3. Usa lápiz como regla\n4. Cabeza = unidad base\n\n**Proporción:** Cuerpo = 7-8 cabezas.\n\n**Error común:** Doblar codo.\n\nPractica con objetos simples primero.",
                actions: ['¿Cómo practico?', 'Claro']
            }
        },
        
        contrapposto: {
            keywords: [
                // Directo
                'contrapposto', 'contraposto',
                // Preguntas flexibles
                'que es contrapposto', 'qué es contrapposto',
                'como hacer contrapposto', 'cómo hacer contrapposto',
                'como hago contrapposto', 'cómo hago contrapposto',
                'explica contrapposto', 'explícame contrapposto',
                'ayuda con contrapposto', 'no entiendo contrapposto',
                'enseñame contrapposto', 'enséñame contrapposto',
                // Equilibrio
                'equilibrio', 'peso', 'pierna apoyo', 'pierna de apoyo',
                'distribucion peso', 'distribución peso', 'postura asimetrica', 'postura asimétrica',
                'balance del cuerpo', 'como balancear', 'cómo balancear',
                // Variantes
                'peso del cuerpo', 'apoyo del cuerpo', 'pierna que sostiene'
            ],
            responses: {
                text: "**Contrapposto** = Distribución asimétrica del peso corporal.\n\n**Regla:** Hombros y caderas NUNCA paralelos.\n\n**Observa:**\n- Pierna de apoyo → cadera alta\n- Pierna relajada → cadera baja\n- Hombros inclinados opuesto\n\nEsto crea naturalidad.",
                actions: ['Muéstrame ejemplo', 'Entendido']
            }
        },

        croquis: {
            keywords: [
                // Directo
                'croquis', 'boceto', 'sketch', 'esbozo',
                // Preguntas flexibles
                'como hacer croquis', 'cómo hacer croquis',
                'como hago un croquis', 'cómo hago un croquis',
                'que es un croquis', 'qué es un croquis',
                'explica croquis', 'explícame croquis',
                'ayuda con croquis', 'no entiendo croquis',
                'enseñame croquis', 'enséñame croquis',
                // Rápido
                'rapido', 'rápido', 'gesture drawing', 'dibujo rápido', 'dibujo rapido',
                'gestos', 'figura rápida', 'figura rapida',
                'como hacer boceto rapido', 'cómo hacer boceto rápido',
                // Variantes
                'dibujo gestual', 'bocetos rapidos', 'bocetos rápidos',
                'como dibujar rapido', 'cómo dibujar rápido'
            ],
            responses: {
                text: "**Croquis = captura de esencia, NO detalle.**\n\n**Tiempo:** 30 segundos - 5 minutos MAX.\n\n**Orden:**\n1. Línea de acción (1 línea)\n2. Masas principales (óvalos)\n3. Articulaciones (puntos)\n4. Conectar con líneas simples\n\n**Prohibido:** Borrar, detallar, perfeccionar.\n\nVolumen > Precisión.",
                actions: ['¿Dónde practico?', 'Dame tips']
            }
        },

        formasBasicas: {
            keywords: [
                // Directo
                'formas básicas', 'formas basicas', 'cilindros', 'esferas', 'cubos',
                // Preguntas flexibles
                'que son las formas basicas', 'qué son las formas básicas',
                'como usar formas basicas', 'cómo usar formas básicas',
                'como simplificar el cuerpo', 'cómo simplificar el cuerpo',
                'explica formas basicas', 'explícame formas básicas',
                'ayuda con formas', 'no entiendo las formas',
                'enseñame formas basicas', 'enséñame formas básicas',
                // Simplificar
                'simplificar', 'formas geométricas', 'formas geometricas',
                'primitivos', 'volúmenes básicos', 'volumenes basicos',
                'formas geometricas en el cuerpo', 'formas geométricas en el cuerpo',
                // Variantes
                'como descomponer el cuerpo', 'cómo descomponer el cuerpo',
                'geometria basica', 'geometría básica'
            ],
            responses: {
                text: "**Todo cuerpo = formas geométricas simples.**\n\n**Piensa así:**\n- Cabeza = esfera\n- Torso = cilindro/caja\n- Brazos/piernas = cilindros\n- Manos/pies = cajas pequeñas\n\n**Beneficio:** Más fácil rotar mentalmente.\n\nDibuja el \"maniquí\" antes del detalle.",
                actions: ['Dame ejercicio', 'Claro']
            }
        },

        perspectiva: {
            keywords: [
                // Directo
                'perspectiva', 'escorzo', 'angulo', 'ángulo', 'vista',
                // Preguntas flexibles
                'que es perspectiva', 'qué es perspectiva',
                'como hacer perspectiva', 'cómo hacer perspectiva',
                'como uso perspectiva', 'cómo uso perspectiva',
                'explica perspectiva', 'explícame perspectiva',
                'ayuda con perspectiva', 'no entiendo perspectiva',
                'no me sale la perspectiva', 'enseñame perspectiva', 'enséñame perspectiva',
                // Punto de fuga
                'punto fuga', 'foreshortening', 'acortamiento', 'profundidad',
                'punto de vista', 'escorzo ayuda',
                // Variantes
                'como dibujar en perspectiva', 'cómo dibujar en perspectiva',
                'perspectiva del cuerpo', 'angulos dificiles', 'ángulos difíciles'
            ],
            responses: {
                text: "**Perspectiva en figura humana:**\n\n**Principio:** Lo que está más cerca se ve MÁS GRANDE.\n\n**Escorzo:** Cuando una parte \"viene hacia ti\".\n\n**Truco:** Dibuja formas cilíndricas con elipses.\n\nLas elipses más abiertas = más perpendiculares a tu vista.\n\nPractica con cilindros primero.",
                actions: ['No lo entiendo', 'Dame ejemplo']
            }
        },

        ejesAnatomicos: {
            keywords: [
                // Directo
                'eje', 'ejes', 'centro', 'simetria', 'simetría',
                // Preguntas flexibles
                'que son los ejes', 'qué son los ejes',
                'como usar ejes', 'cómo usar ejes',
                'como hacer ejes', 'cómo hacer ejes',
                'explica ejes', 'explícame los ejes',
                'ayuda con ejes', 'no entiendo los ejes',
                'enseñame ejes', 'enséñame los ejes',
                // Variantes
                'linea central', 'línea central', 'eje central', 'eje vertical',
                'línea media', 'linea media', 'ejes anatomicos', 'ejes anatómicos',
                'linea del centro', 'línea del centro',
                'como encontrar el eje', 'cómo encontrar el eje'
            ],
            responses: {
                text: "**Ejes anatómicos = guías invisibles.**\n\n**3 ejes principales:**\n1. **Central:** Divide cuerpo en izquierda/derecha\n2. **Hombros:** Línea de clavículas\n3. **Caderas:** Línea pélvica\n\n**Uso:** Define postura y rotación.\n\nDibújalos ANTES de detalles.",
                actions: ['Ejemplo visual', 'Entendido']
            }
        },

        lineasRitmo: {
            keywords: [
                // Directo
                'ritmo', 'flujo', 'lineas ritmicas', 'líneas rítmicas',
                // Preguntas flexibles
                'que son lineas de ritmo', 'qué son líneas de ritmo',
                'como usar ritmo', 'cómo usar ritmo',
                'como hacer lineas de ritmo', 'cómo hacer líneas de ritmo',
                'explica ritmo', 'explícame las líneas de ritmo',
                'ayuda con ritmo', 'no entiendo ritmo',
                // Variantes
                'curvas', 'fluidez', 'flow', 'líneas de flujo', 'lineas de flujo',
                'continuidad visual', 'flujo visual'
            ],
            responses: {
                text: "**Líneas de ritmo = guías que unifican el dibujo.**\n\n**Busca:**\n- Curvas que conectan partes del cuerpo\n- Repeticiones de formas\n- Flujo visual continuo\n\n**Tip:** El ojo sigue estas líneas automáticamente.\n\n¡Crea caminos visuales!",
                actions: ['Dame ejemplo', 'Claro']
            }
        },

        negativoEspacio: {
            keywords: [
                // Directo
                'espacio negativo', 'negativo', 'formas negativas',
                // Preguntas flexibles
                'que es el espacio negativo', 'qué es el espacio negativo',
                'como usar espacio negativo', 'cómo usar espacio negativo',
                'como dibujar espacio negativo', 'cómo dibujar espacio negativo',
                'explica espacio negativo', 'explícame espacio negativo',
                'ayuda con espacio negativo', 'no entiendo espacio negativo',
                // Variantes
                'alrededor', 'entre', 'negative space', 'espacio entre figuras',
                'vacíos', 'vacios', 'espacios vacios', 'espacios vacíos'
            ],
            responses: {
                text: "**Espacio negativo = forma ENTRE y ALREDEDOR del cuerpo.**\n\n**Técnica:**\nNo dibujes el cuerpo. Dibuja los espacios vacíos.\n\n**Beneficio:** Tu cerebro no sabotea con \"cómo debería verse\".\n\n¡Súper efectivo para proporciones!",
                actions: ['Ejercicio práctico', 'Entendido']
            }
        },

        construccionFormas: {
            keywords: [
                // Directo
                'construccion', 'construcción', 'construir', 'estructura',
                // Preguntas flexibles
                'como construir un cuerpo', 'cómo construir un cuerpo',
                'como construir figura', 'cómo construir figura',
                'que es construccion', 'qué es construcción',
                'explica construccion', 'explícame construcción',
                'ayuda con construccion', 'no entiendo construccion',
                'enseñame a construir', 'enséñame a construir',
                // Variantes
                'armazon', 'armazón', 'build up', 'estructura interna',
                'construcción del cuerpo', 'como armar el cuerpo', 'cómo armar el cuerpo',
                'estructura del dibujo'
            ],
            responses: {
                text: "**Construcción = dibujar de adentro hacia afuera.**\n\n**Proceso:**\n1. Esqueleto (palitos)\n2. Volúmenes (cilindros/esferas)\n3. Contornos (línea exterior)\n4. Detalles\n\n**Error común:** Empezar con contornos.\n\nEstructura primero, belleza después.",
                actions: ['Muéstrame paso a paso', 'Ok']
            }
        },

        // ===== MÓDULO 2: ANATOMÍA (15) =====
        tresMasas: {
            keywords: [
                // Directo
                'tres masas', '3 masas', 'cabeza torso cadera',
                // Preguntas flexibles
                'que son las 3 masas', 'qué son las 3 masas',
                'como usar las 3 masas', 'cómo usar las 3 masas',
                'como hacer las 3 masas', 'cómo hacer las 3 masas',
                'explica 3 masas', 'explícame las 3 masas',
                'ayuda con 3 masas', 'no entiendo 3 masas',
                'enseñame las 3 masas', 'enséñame las 3 masas',
                // Variantes
                'masas principales', 'head thorax pelvis',
                'tres bloques', 'tres volumenes', 'tres volúmenes',
                'que son las tres masas', 'masas del cuerpo'
            ],
            responses: {
                text: "**Las 3 masas = simplificación del cuerpo.**\n\n**1. Cabeza** (esfera)\n**2. Torso** (caja de costillas)\n**3. Cadera** (pelvis)\n**Conectadas:** Cuello y columna.\n\nEstas rotan INDEPENDIENTEMENTE.\n\nDomina esto = dominas poses complejas.",
                actions: ['¿Cómo practico?', 'Entendido']
            }
        },

        anatomiaBasica: {
            keywords: [
                // Directo
                'anatomia', 'anatomía', 'musculos', 'músculos', 'huesos',
                // Preguntas flexibles
                'como aprender anatomia', 'cómo aprender anatomía',
                'que es anatomia', 'qué es anatomía',
                'explica anatomia', 'explícame anatomía',
                'ayuda con anatomia', 'no entiendo anatomia',
                'enseñame anatomia', 'enséñame anatomía',
                'como dibujar anatomia', 'cómo dibujar anatomía',
                // Variantes
                'estructura', 'anatomy', 'musculatura', 'sistema muscular',
                'anatomia basica', 'anatomía básica', 'anatomia del cuerpo',
                'anatomía básica del cuerpo', 'que musculos estudiar', 'qué músculos estudiar'
            ],
            responses: {
                text: "**No memorices TODO. Enfócate en lo visible.**\n\n**Prioridades:**\n1. Trapecio (cuello-hombro)\n2. Deltoides (hombros)\n3. Pectorales\n4. Abdominales\n5. Oblicuos\n\n**Tip:** Dibuja músculo sobre esqueleto simple.\n\nAnatomía sirve al gesto, no al revés.",
                actions: ['¿Qué sigue?', 'Dame recursos']
            }
        },

        manos: {
            keywords: [
                // Directo
                'manos', 'mano', 'dedos', 'pulgar', 'palma', 'hands',
                // Preguntas flexibles
                'como dibujar manos', 'cómo dibujar manos',
                'como hacer manos', 'cómo hacer manos',
                'que son las manos', 'explica manos', 'explícame las manos',
                'ayuda con manos', 'no me salen las manos',
                'no entiendo manos', 'enseñame manos', 'enséñame manos',
                'como dibujar dedos', 'cómo dibujar dedos',
                'tengo miedo de dibujar manos',
                // Variantes
                'muñeca', 'muñecas', 'puño', 'puños', 'hand drawing',
                'manos ayuda', 'dibujar dedos', 'anatomia de manos', 'anatomía de manos'
            ],
            responses: {
                text: "**Manos = todos las odiamos. Normal.**\n\n**Simplificación:**\n- Palma = caja\n- Dedos = 3 cilindros cada uno\n- Pulgar = aparte, 45°\n\n**Proporción:** Palma = largo de dedos.\n\n**Practica:** 10 manos diarias en 2 minutos cada una.\n\n¡Volumen es la clave!",
                actions: ['Dame ejercicio', 'Sigo sin entender']
            }
        },

        pies: {
            keywords: [
                // Directo
                'pies', 'pie', 'tobillo', 'dedos pie', 'planta', 'feet', 'foot',
                // Preguntas flexibles
                'como dibujar pies', 'cómo dibujar pies',
                'como hacer pies', 'cómo hacer pies',
                'explica pies', 'explícame los pies',
                'ayuda con pies', 'no me salen los pies',
                'no entiendo pies', 'enseñame pies', 'enséñame pies',
                // Variantes
                'talón', 'talon', 'arco del pie', 'anatomia de pies', 'anatomía de pies',
                'como dibujar tobillos', 'cómo dibujar tobillos'
            ],
            responses: {
                text: "**Pies = triángulos + arco.**\n\n**Estructura:**\n- Talón = círculo\n- Puente = triángulo\n- Dedos = 5 pequeños cilindros\n\n**Ángulos importantes:**\n- Interno: arco pronunciado\n- Externo: más recto\n\n**Largo:** ~1 cabeza.\n\nMás fáciles que las manos, te lo prometo.",
                actions: ['Ejercicio práctico', 'Ok']
            }
        },

        torso: {
            keywords: [
                // Directo
                'torso', 'tronco', 'pecho', 'espalda', 'costillas',
                // Preguntas flexibles
                'como dibujar torso', 'cómo dibujar torso',
                'como hacer el torso', 'cómo hacer el torso',
                'que es el torso', 'explica torso', 'explícame el torso',
                'ayuda con torso', 'no entiendo torso',
                'enseñame torso', 'enséñame el torso',
                // Variantes
                'ribcage', 'caja torácica', 'caja toracica', 'abdomen',
                'como dibujar el pecho', 'cómo dibujar el pecho',
                'anatomia del torso', 'anatomía del torso'
            ],
            responses: {
                text: "**Torso = caja de huevos (flexible, no rígida).**\n\n**2 masas:**\n1. **Caja torácica:** Costillas (ovalada)\n2. **Abdomen:** Flexible, se comprime\n\n**Movimiento:** Se tuerce, dobla, estira.\n\n**Punto clave:** Línea blanca (centro abdominal).\n\nTorso conecta TODO.",
                actions: ['Anatomía del torso', 'Entendido']
            }
        },

        pelvis: {
            keywords: [
                // Directo
                'pelvis', 'cadera', 'caderas', 'cintura', 'hueso cadera',
                // Preguntas flexibles
                'como dibujar pelvis', 'cómo dibujar pelvis',
                'como hacer la pelvis', 'cómo hacer la pelvis',
                'que es la pelvis', 'explica pelvis', 'explícame la pelvis',
                'ayuda con pelvis', 'no entiendo pelvis',
                'enseñame pelvis', 'enséñame la pelvis',
                // Variantes
                'pelvis bone', 'hueso pélvico', 'hueso pelvico', 'ilion', 'ílion',
                'anatomia de la pelvis', 'anatomía de la pelvis',
                'como dibujar caderas', 'cómo dibujar caderas'
            ],
            responses: {
                text: "**Pelvis = cuenco inclinado.**\n\n**Forma:** Mariposa o cuenco.\n\n**Diferencias:**\n- Mujer: más ancha, menos profunda\n- Hombre: más estrecha, más profunda\n\n**Punto de articulación:** Donde piernas conectan.\n\nPelvis define postura completa.",
                actions: ['Ejercicio', 'Claro']
            }
        },

        hombros: {
            keywords: [
                // Directo
                'hombros', 'hombro', 'clavicula', 'clavícula', 'deltoides',
                // Preguntas flexibles
                'como dibujar hombros', 'cómo dibujar hombros',
                'como hacer hombros', 'cómo hacer hombros',
                'que son los hombros', 'explica hombros', 'explícame los hombros',
                'ayuda con hombros', 'no entiendo hombros',
                'enseñame hombros', 'enséñame los hombros',
                // Variantes
                'escapula', 'escápula', 'shoulders', 'omóplato', 'omoplato',
                'anatomia de hombros', 'anatomía de hombros'
            ],
            responses: {
                text: "**Hombros = articulación + músculo deltoides.**\n\n**Anatomía:**\n- Clavícula (horizontal)\n- Escápula (omóplato, atrás)\n- Deltoides (músculo redondeado)\n\n**Movimiento:** MÁXIMA movilidad del cuerpo.\n\n**Tip:** Hombros caídos = relajado. Alzados = tensión.\n\nDefinen personalidad de pose.",
                actions: ['Ejercicio', 'Entendido']
            }
        },

        brazos: {
            keywords: [
                // Directo
                'brazos', 'brazo', 'biceps', 'bíceps', 'triceps', 'tríceps',
                // Preguntas flexibles
                'como dibujar brazos', 'cómo dibujar brazos',
                'como hacer brazos', 'cómo hacer brazos',
                'que son los brazos', 'explica brazos', 'explícame los brazos',
                'ayuda con brazos', 'no entiendo los brazos',
                'enseñame brazos', 'enséñame los brazos',
                // Variantes
                'antebrazo', 'arms', 'húmero', 'humero', 'codo',
                'anatomia de brazos', 'anatomía de brazos',
                'como dibujar codos', 'cómo dibujar codos'
            ],
            responses: {
                text: "**Brazos = 2 cilindros + articulación.**\n\n**Estructura:**\n1. **Brazo:** Húmero (bíceps/tríceps)\n2. **Antebrazo:** Radio + cúbito (2 huesos)\n\n**Longitud:** Codo a mitad del torso.\n\n**Rotación:** Antebrazo gira, brazo NO.\n\nPractica rotación del antebrazo (pronación/supinación).",
                actions: ['Ejercicio', 'Claro']
            }
        },

        piernas: {
            keywords: [
                // Directo
                'piernas', 'pierna', 'muslo', 'pantorrilla', 'rodilla',
                // Preguntas flexibles
                'como dibujar piernas', 'cómo dibujar piernas',
                'como hacer piernas', 'cómo hacer piernas',
                'que son las piernas', 'explica piernas', 'explícame las piernas',
                'ayuda con piernas', 'no entiendo las piernas',
                'enseñame piernas', 'enséñame las piernas',
                // Variantes
                'femur', 'fémur', 'legs', 'cuádriceps', 'cuadriceps', 'gemelos',
                'anatomia de piernas', 'anatomía de piernas',
                'como dibujar rodillas', 'cómo dibujar rodillas'
            ],
            responses: {
                text: "**Piernas = 2 cilindros conectados.**\n\n**Estructura:**\n1. **Muslo:** Fémur (grueso, potente)\n2. **Pantorrilla:** Tibia + peroné\n\n**Rodilla:** NO está centrada (rótula al frente).\n\n**Curvas:**\n- Exterior: más recto\n- Interior: más curvo\n\nLongitud = 2 cabezas (muslo + pantorrilla).",
                actions: ['Ejercicio', 'Ok']
            }
        },

        cuello: {
            keywords: [
                // Directo
                'cuello', 'trapecio', 'nuca', 'garganta', 'esternocleidomastoideo',
                // Preguntas flexibles
                'como dibujar cuello', 'cómo dibujar cuello',
                'como hacer el cuello', 'cómo hacer el cuello',
                'que es el cuello', 'explica cuello', 'explícame el cuello',
                'ayuda con cuello', 'no entiendo cuello',
                'enseñame cuello', 'enséñame el cuello',
                // Variantes
                'neck', 'cervical', 'columna cervical',
                'anatomia del cuello', 'anatomía del cuello'
            ],
            responses: {
                text: "**Cuello = cilindro + músculos visibles.**\n\n**Anatomía visible:**\n- Esternocleidomastoideo (V desde oreja a clavículas)\n- Trapecio (de nuca a hombros)\n\n**No es:** Un palito. Tiene volumen.\n\n**Ángulo:** Ligeramente inclinado hacia adelante.\n\n¡El cuello comunica emoción!",
                actions: ['Ejercicio', 'Entendido']
            }
        },

        musculos: {
            keywords: [
                // Directo
                'musculo', 'músculo', 'masa muscular', 'definicion', 'definición',
                // Preguntas flexibles
                'que musculos memorizar', 'qué músculos memorizar',
                'que musculos estudiar', 'qué músculos estudiar',
                'como dibujar musculos', 'cómo dibujar músculos',
                'explica musculos', 'explícame los músculos',
                'ayuda con musculos', 'no entiendo musculos',
                'enseñame musculos', 'enséñame músculos',
                // Variantes
                'tono muscular', 'muscles', 'musculatura', 'fibras musculares',
                'que musculos debo memorizar', 'qué músculos debo memorizar',
                'anatomia muscular', 'anatomía muscular'
            ],
            responses: {
                text: "**Músculos = NO memorices todos. Aprende los 10 principales.**\n\n**Top 10 visibles:**\n1. Trapecio\n2. Deltoides\n3. Pectorales\n4. Bíceps\n5. Tríceps\n6. Abdominales\n7. Oblicuos\n8. Cuádriceps\n9. Gemelos\n10. Glúteos\n\nDibuja la forma general primero, anatomía después.",
                actions: ['Lista de recursos', 'Ok']
            }
        },

        esqueleto: {
            keywords: [
                // Directo
                'esqueleto', 'huesos', 'estructura osea', 'estructura ósea',
                // Preguntas flexibles
                'como dibujar esqueleto', 'cómo dibujar esqueleto',
                'que es el esqueleto', 'explica esqueleto', 'explícame el esqueleto',
                'ayuda con esqueleto', 'no entiendo esqueleto',
                'enseñame esqueleto', 'enséñame el esqueleto',
                // Variantes
                'hueso', 'skeleton', 'bones', 'sistema óseo', 'sistema oseo',
                'estructura del esqueleto', 'anatomia del esqueleto', 'anatomía del esqueleto'
            ],
            responses: {
                text: "**Esqueleto = armazón interno.**\n\n**Puntos clave visibles:**\n- Clavículas\n- Esternón\n- Costillas (parcial)\n- Codos\n- Muñecas\n- Rodillas\n- Tobillos\n\n**Tip:** Puntos óseos NO se mueven con músculo.\n\nUsa estos como referencias fijas.",
                actions: ['Ejercicio', 'Entendido']
            }
        },

        articulaciones: {
            keywords: [
                // Directo
                'articulaciones', 'articulacion', 'articulación', 'coyuntura',
                // Preguntas flexibles
                'que son las articulaciones', 'qué son las articulaciones',
                'como dibujar articulaciones', 'cómo dibujar articulaciones',
                'explica articulaciones', 'explícame las articulaciones',
                'ayuda con articulaciones', 'no entiendo articulaciones',
                'enseñame articulaciones', 'enséñame las articulaciones',
                // Variantes
                'union', 'unión', 'joints', 'puntos de flexión', 'puntos de flexion',
                'donde se dobla', 'dónde se dobla', 'puntos de doblez'
            ],
            responses: {
                text: "**Articulaciones = donde se DOBLA el cuerpo.**\n\n**Principales:**\n- Cuello\n- Hombros (más móvil)\n- Codos\n- Muñecas\n- Caderas\n- Rodillas\n- Tobillos\n\n**Regla:** Dibuja círculos en estas zonas primero.\n\nArticulaciones definen poses dinámicas.",
                actions: ['Ejercicio gestual', 'Ok']
            }
        },

        diferenciasGenero: {
            keywords: [
                // Directo
                'genero', 'género', 'hombre mujer', 'diferencias',
                // Preguntas flexibles
                'diferencias entre hombre y mujer',
                'como dibujar hombre', 'cómo dibujar hombre',
                'como dibujar mujer', 'cómo dibujar mujer',
                'explica diferencias de genero', 'explícame diferencias de género',
                'ayuda con genero', 'no entiendo las diferencias',
                // Variantes
                'masculino femenino', 'gender differences', 'dimorfismo',
                'anatomía femenina', 'anatomia femenina',
                'anatomía masculina', 'anatomia masculina'
            ],
            responses: {
                text: "**Diferencias anatómicas generales:**\n\n**Mujer típicamente:**\n- Hombros más estrechos\n- Caderas más anchas\n- Cintura más marcada\n- Centro de gravedad más bajo\n\n**Hombre típicamente:**\n- Hombros más anchos\n- Caderas más estrechas\n- Torso más rectangular\n- Masa muscular más visible\n\n**Recuerda:** Son espectros, no reglas absolutas.",
                actions: ['Ejercicio', 'Entendido']
            }
        },

        movimiento: {
            keywords: [
                // Directo
                'movimiento', 'dinamismo', 'accion', 'acción',
                // Preguntas flexibles
                'como crear movimiento', 'cómo crear movimiento',
                'como hacer movimiento dinamico', 'cómo hacer movimiento dinámico',
                'que es dinamismo', 'qué es dinamismo',
                'explica movimiento', 'explícame el movimiento',
                'ayuda con movimiento', 'no entiendo movimiento',
                'enseñame movimiento', 'enséñame movimiento',
                // Variantes
                'dinamico', 'dinámico', 'poses dinamicas', 'poses dinámicas',
                'movement', 'dynamic pose', 'como dar dinamismo', 'cómo dar dinamismo'
            ],
            responses: {
                text: "**Movimiento = contraste + anticipación.**\n\n**Principios:**\n1. **Línea de acción clara** (curva fuerte)\n2. **Contraste** (partes abiertas vs. cerradas)\n3. **Anticipación** (cuerpo prepara movimiento)\n\n**Tip:** Poses estáticas → borradas.\nPoses con tensión → memorables.\n\n¡Exagera el gesto!",
                actions: ['Dame ejemplo', 'Claro']
            }
        },

        // ===== MÓDULO 3: RENDERIZADO Y COMPOSICIÓN (10) =====
        valoresTonales: {
            keywords: [
                // Directo
                'valores', 'tonos', 'sombras', 'luces', 'valor tonal',
                // Preguntas flexibles
                'que son los valores', 'qué son los valores',
                'como usar valores', 'cómo usar valores',
                'como hacer valores', 'cómo hacer valores tonales',
                'explica valores', 'explícame los valores',
                'ayuda con valores', 'no entiendo valores',
                'enseñame valores', 'enséñame valores tonales',
                'como sombrear', 'cómo sombrear',
                // Variantes
                'escala tonal', 'values', 'tonal values', 'claroscuro',
                'escala de grises', 'que son los valores tonales', 'qué son los valores tonales'
            ],
            responses: {
                text: "**Valores = escala de claros y oscuros.**\n\n**Escala básica:**\n1. Blanco (luz directa)\n2. Gris claro (luz indirecta)\n3. Gris medio (tono local)\n4. Gris oscuro (sombra)\n5. Negro (sombra profunda)\n\n**Regla 80/20:** Usa 3 valores, no 10.\n\nContraste > Cantidad de tonos.",
                actions: ['Ejercicio práctico', 'Entendido']
            }
        },

        iluminacion: {
            keywords: [
                // Directo
                'iluminacion', 'iluminación', 'luz', 'fuente luz', 'fuente de luz',
                // Preguntas flexibles
                'como usar la luz', 'cómo usar la luz',
                'como hacer iluminacion', 'cómo hacer iluminación',
                'que es iluminacion', 'qué es iluminación',
                'explica iluminacion', 'explícame la iluminación',
                'ayuda con luz', 'no entiendo iluminacion',
                'enseñame iluminacion', 'enséñame iluminación',
                // Variantes
                'light', 'lighting', 'dirección de luz', 'direccion de luz',
                'source light', 'tipos de luz', 'luces y sombras'
            ],
            responses: {
                text: "**Iluminación define volumen.**\n\n**3 tipos básicos:**\n1. **Frontal:** Plano, poco volumen\n2. **Lateral:** Máximo volumen y drama\n3. **Contraluz:** Silueta con borde luminoso\n\n**Tip:** Define fuente de luz ANTES de sombrear.\n\n1 luz fuerte > varias luces débiles.",
                actions: ['Ejercicio', 'Dame ejemplos']
            }
        },

        sombreado: {
            keywords: [
                // Directo
                'sombreado', 'sombrear', 'sombra', 'shading', 'degradado',
                // Preguntas flexibles
                'como sombrear', 'cómo sombrear',
                'como hacer sombreado', 'cómo hacer sombreado',
                'que es sombreado', 'qué es sombreado',
                'explica sombreado', 'explícame el sombreado',
                'ayuda con sombreado', 'no entiendo sombreado',
                'enseñame a sombrear', 'enséñame a sombrear',
                // Variantes
                'hatching', 'difuminado', 'cross-hatching',
                'técnicas de sombreado', 'tecnicas de sombreado',
                'como dar sombra', 'cómo dar sombra'
            ],
            responses: {
                text: "**Sombreado = transición de luz a sombra.**\n\n**Técnicas:**\n1. **Hatching:** Líneas paralelas\n2. **Cross-hatching:** Líneas cruzadas\n3. **Difuminado:** Suave con dedo/difumino\n4. **Puntillismo:** Puntos (lento)\n\n**Principio:** Formas cilíndricas = gradiente suave.\n\n¡Practica cada técnica 10 minutos!",
                actions: ['¿Cuál uso?', 'Ok']
            }
        },

        composicion: {
            keywords: [
                // Directo
                'composicion', 'composición', 'encuadre', 'diseño', 'layout',
                // Preguntas flexibles
                'como hacer buena composicion', 'cómo hacer buena composición',
                'que es composicion', 'qué es composición',
                'explica composicion', 'explícame la composición',
                'ayuda con composicion', 'no entiendo composicion',
                'enseñame composicion', 'enséñame composición',
                // Variantes
                'composition', 'regla de tercios', 'golden ratio', 'diseño visual',
                'como componer', 'cómo componer', 'encuadrar dibujo'
            ],
            responses: {
                text: "**Composición = dónde colocas elementos.**\n\n**Reglas básicas:**\n1. **Regla de tercios:** Divide en 9, pon importante en cruces\n2. **Espacio negativo:** Respira\n3. **Dirección:** Hacia dónde mira/mueve la figura\n\n**Tip:** Deja espacio hacia donde mira el personaje.\n\nComposición guía el ojo.",
                actions: ['Ejercicio', 'Entendido']
            }
        },

        profundidad: {
            keywords: [
                'profundidad', 'espacio', 'fondo', 'planos', 'capas', 'depth',
                'foreground', 'background', 'primer plano', 'atmospheric perspective',
                'como crear profundidad', 'cómo crear profundidad',
                // Del PDF
                'cómo crear profundidad', 'como crear profundidad'
            ],
            responses: {
                text: "**Profundidad = sensación de 3D en 2D.**\n\n**Técnicas:**\n1. **Superposición:** Elementos que se tapan\n2. **Escala:** Más grande = más cerca\n3. **Detalle:** Lejos = menos nítido\n4. **Contraste:** Cerca = más contraste\n\n**Truco:** 3 planos (primer, medio, fondo).\n\nSepara con contraste diferente.",
                actions: ['Ejemplo', 'Claro']
            }
        },

        lineWeight: {
            keywords: [
                'peso linea', 'peso línea', 'grosor', 'linea gruesa', 'línea gruesa',
                'line weight', 'variación de línea', 'variacion de linea', 'thickness',
                'que es peso de linea', 'qué es peso de línea',
                // Del PDF
                'qué es el peso de línea', 'que es el peso de linea'
            ],
            responses: {
                text: "**Peso de línea = grosor variable.**\n\n**Regla:**\n- **Gruesa:** Contornos externos, sombras\n- **Media:** Detalles importantes\n- **Delgada:** Detalles secundarios, luces\n\n**Beneficio:** Añade jerarquía visual.\n\nVariación de línea = interés visual.",
                actions: ['Ejercicio', 'Entendido']
            }
        },

        textura: {
            keywords: [
                'textura', 'superficie', 'material', 'tela', 'piel', 'pelo',
                'texture', 'cabello', 'hair', 'skin texture', 'fabric',
                'como dibujar texturas', 'cómo dibujar texturas',
                // Del PDF
                'cómo dibujar texturas', 'como dibujar texturas'
            ],
            responses: {
                text: "**Textura = sensación de superficie.**\n\n**Técnicas por material:**\n- **Piel:** Suave, pocos trazos\n- **Tela:** Pliegues, líneas direccionales\n- **Pelo:** Mechones, NO pelos individuales\n- **Metal:** Alto contraste, reflejos\n\n**Principio:** Sugiere, NO copies cada detalle.\n\nMenos es más.",
                actions: ['Ejercicio', 'Dame ejemplos']
            }
        },

        pliegues: {
            keywords: [
                'pliegues', 'tela', 'ropa', 'arrugas', 'cloth', 'fabric',
                'folds', 'drapery', 'clothing folds', 'wrinkles',
                'como dibujar pliegues', 'cómo dibujar pliegues',
                'ayuda con pliegues', 'pliegues de ropa',
                // Del PDF
                'ayuda con pliegues de ropa'
            ],
            responses: {
                text: "**Pliegues = respuesta de tela a gravedad y movimiento.**\n\n**5 tipos básicos:**\n1. **Pipe:** Cilindros verticales (faldas)\n2. **Zigzag:** Apretada (codos)\n3. **Espiral:** Torsión\n4. **Half-lock:** Media caída\n5. **Diaper:** Punto de tensión\n\n**Regla:** Sigue forma del cuerpo debajo.\n\nTela abraza volumen.",
                actions: ['Ejercicio', 'No entendí']
            }
        },

        focal: {
            keywords: [
                'punto focal', 'foco', 'atencion', 'atención', 'enfoque',
                'centro interes', 'centro de interés', 'focal point', 'emphasis',
                'area de interés', 'area de interes', 'que es punto focal',
                'qué es punto focal',
                // Del PDF
                'qué es el punto focal', 'que es el punto focal'
            ],
            responses: {
                text: "**Punto focal = donde quieres que mire el espectador.**\n\n**Cómo crearlo:**\n1. **Contraste máximo** (valor/color)\n2. **Más detalle**\n3. **Líneas convergen** hacia ahí\n4. **Figura mira** hacia ahí\n\n**Regla:** 1 punto focal por dibujo.\n\nNo compitas con ti mismo.",
                actions: ['Ejemplo', 'Entendido']
            }
        },

        storytelling: {
            keywords: [
                'historia', 'narrativa', 'contar', 'story', 'expresion', 'expresión',
                'emocion', 'emoción', 'narrative art', 'character design', 'personalidad',
                'como contar historias', 'cómo contar historias con dibujos',
                // Del PDF
                'cómo contar historias con dibujos', 'como contar historias con dibujos'
            ],
            responses: {
                text: "**Dibujo cuenta historia sin palabras.**\n\n**Elementos narrativos:**\n1. **Lenguaje corporal** (postura)\n2. **Expresión facial**\n3. **Contexto** (ambiente)\n4. **Acción implícita** (qué pasó/pasará)\n\n**Pregunta clave:** ¿Qué siente/piensa este personaje?\n\n¡Emoción > técnica perfecta!",
                actions: ['Dame ejercicio', 'Claro']
            }
        }
    };


    // ============================================
    // 4. SISTEMA Y CURSO (5 respuestas)
    // ============================================
    const systemKnowledge = {
        subirEjercicios: {
            keywords: [
                'subir', 'enviar', 'ejercicio', 'tarea', 'entregar', 'upload',
                'cómo subo', 'como subo', 'cargar ejercicio', 'mandar ejercicio',
                // Del PDF
                'cómo subo mis ejercicios', 'como subo mis ejercicios'
            ],
            responses: {
                text: "**Para subir ejercicios:**\n\n1. Ve a la sección del módulo correspondiente\n2. Click en \"Subir ejercicio\"\n3. Selecciona archivo (JPG, PNG, PDF)\n4. Agrega nota opcional\n5. Click \"Enviar\"\n\n**Formato recomendado:** JPG o PNG, max 10MB.\n\n¿Problemas técnicos? Contacta soporte.",
                actions: ['Problemas al subir', 'Entendido']
            }
        },

        progreso: {
            keywords: [
                'progreso', 'avance', 'donde voy', 'dónde voy', 'porcentaje', 'completado',
                'progress', 'mi avance', '¿cómo voy?', 'como voy',
                // Del PDF
                'dónde veo mi progreso', 'donde veo mi progreso'
            ],
            responses: {
                text: "**Para ver tu progreso:**\n\n1. Dashboard principal\n2. Sección \"Mi Progreso\"\n3. Verás: % completado, ejercicios pendientes, feedback\n\n**Tip:** Progreso NO es lineal. Algunos días avanzan más.\n\n¡Celebra cada ejercicio completado!",
                actions: ['Ver mi progreso', 'Ok']
            }
        },

        materiales: {
            keywords: [
                'materiales', 'que necesito', 'qué necesito', 'herramientas',
                'lapices', 'lápices', 'papel', 'supplies', 'materials', 'comprar',
                'lista de materiales',
                // Del PDF
                'qué materiales necesito', 'que materiales necesito'
            ],
            responses: {
                text: "**Materiales básicos:**\n\n✏️ **Lápices:**\n- HB (líneas)\n- 2B (sombreado)\n- 4B/6B (oscuros)\n\n📄 **Papel:**\n- Bond A4 (práctica diaria)\n- Canson 180gr (proyectos)\n\n🧹 **Otros:**\n- Goma, sacapuntas, difumino (opcional)\n\n**Verdad:** Herramienta no hace al artista. ¡Practica con lo que tengas!",
                actions: ['¿Dónde compro?', 'Entendido']
            }
        },

        feedback: {
            keywords: [
                'feedback', 'retroalimentacion', 'retroalimentación', 'revision', 'revisión',
                'comentario', 'corrección', 'correccion', 'crítica', 'critica', 'review',
                // Del PDF
                'cuándo recibo feedback', 'cuando recibo feedback'
            ],
            responses: {
                text: "**Sistema de feedback:**\n\n1. Sube ejercicio\n2. Espera 24-48h (días hábiles)\n3. Recibirás correo con revisión\n4. Accede desde tu Dashboard\n\n**Incluye:**\n- ¿Qué está bien?\n- ¿Qué mejorar?\n- Próximos pasos\n\n**Tip:** Lee feedback con mente abierta. Es para crecer.",
                actions: ['No recibí feedback', 'Entendido']
            }
        },

        tiempoDedicacion: {
            keywords: [
                'cuanto tiempo', 'cuánto tiempo', 'horas', 'dedicacion', 'dedicación',
                'practicar', 'tiempo de práctica', 'tiempo de practica',
                'cuantas horas', 'cuántas horas', 'schedule',
                // Del PDF
                'cuánto tiempo debo practicar', 'cuanto tiempo debo practicar'
            ],
            responses: {
                text: "**Tiempo recomendado:**\n\n⏰ **Ideal:** 30-60 min diarios\n⏰ **Mínimo:** 15 min diarios\n\n**Verdad dura:** Constancia > intensidad.\n\n15 min x 7 días = 105 min/semana\n2 horas x 1 día = 120 min/semana\n\nPero la práctica diaria crea hábito.\n\n¡Consistencia es la clave!",
                actions: ['Tengo poco tiempo', 'Entendido']
            }
        }
    };

    // ============================================
    // 5. DETECCIÓN Y GENERACIÓN DE RESPUESTAS
    // ============================================
    function detectEmotion(message) {
        const msg = message.toLowerCase();
        
        // Detectar intensidad de frustración
        if (emotionalKnowledge.frustracion.keywords.some(k => msg.includes(k))) {
            const highIntensity = ['horrible', 'odio', 'nunca', 'imposible', 'no puedo más', 'no puedo mas'];
            const mediumIntensity = ['muy', 'mucho', 'siempre'];
            
            if (highIntensity.some(k => msg.includes(k))) {
                return { emotion: 'frustracion', intensity: 'alta', data: emotionalKnowledge.frustracion };
            } else if (mediumIntensity.some(k => msg.includes(k))) {
                return { emotion: 'frustracion', intensity: 'media', data: emotionalKnowledge.frustracion };
            } else {
                return { emotion: 'frustracion', intensity: 'leve', data: emotionalKnowledge.frustracion };
            }
        }
        
        // Otras emociones
        for (const [emotion, data] of Object.entries(emotionalKnowledge)) {
            if (emotion === 'frustracion') continue;
            
            if (data.keywords.some(keyword => msg.includes(keyword))) {
                return { emotion, data };
            }
        }
        
        return null;
    }

    function detectTechnical(message) {
        const msg = message.toLowerCase();
        
        for (const [topic, data] of Object.entries(technicalKnowledge)) {
            if (data.keywords.some(keyword => msg.includes(keyword))) {
                return { topic, data };
            }
        }
        
        return null;
    }

    function detectBasic(message) {
        const msg = message.toLowerCase();
        
        for (const [type, data] of Object.entries(basicConversation)) {
            if (data.keywords.some(keyword => msg.includes(keyword))) {
                return { type, data };
            }
        }
        
        return null;
    }

    function detectSystem(message) {
        const msg = message.toLowerCase();
        
        for (const [type, data] of Object.entries(systemKnowledge)) {
            if (data.keywords.some(keyword => msg.includes(keyword))) {
                return { type, data };
            }
        }
        
        return null;
    }

    function generateResponse(message) {
        // Orden de prioridad: básico > emocional > sistema > técnico
        const basic = detectBasic(message);
        if (basic) {
            return basic.data;
        }
        
        const emotional = detectEmotion(message);
        if (emotional) {
            if (emotional.emotion === 'frustracion') {
                return emotional.data.responses[emotional.intensity];
            }
            return emotional.data.responses;
        }
        
        const system = detectSystem(message);
        if (system) {
            return system.data.responses;
        }
        
        const technical = detectTechnical(message);
        if (technical) {
            return technical.data.responses;
        }
        
        // Respuesta por defecto
        return {
            text: "Interesante pregunta 🤔. ¿Podrías darme más detalles?\n\nPuedo ayudarte con:\n- 💙 **Emociones** (25 temas: frustración, ansiedad, síndrome del impostor, procrastinación...)\n- 🎨 **Técnica** (35 temas: gesto, anatomía, proporciones, renderizado...)\n- 📚 **Sistema** (5 temas: cómo usar el curso)\n\n¿Qué te gustaría explorar?",
            actions: ['Tengo una duda técnica', 'Me siento frustrado/a', 'Pregunta sobre el curso']
        };
    }

    // ============================================
    // 6. MEMORIA CONVERSACIONAL
    // ============================================
    class ConversationMemory {
        constructor() {
            this.history = [];
            this.emotionalState = [];
        }
        
        add(userMsg, botResponse, emotion, intensity) {
            this.history.push({
                user: userMsg,
                bot: botResponse,
                timestamp: new Date(),
                emotion,
                intensity
            });
            
            if (emotion) {
                this.emotionalState.push({ emotion, intensity, timestamp: new Date() });
            }
        }
        
        shouldOfferBreak() {
            const recent = this.emotionalState.slice(-3);
            const negative = ['frustracion', 'ansiedad', 'bloqueo', 'llanto', 'burnout', 'overwhelm', 'culpa'];
            
            return recent.length >= 3 && recent.every(e => negative.includes(e.emotion));
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
    }

    // ============================================
    // 7. EXPORTAR AL SCOPE GLOBAL
    // ============================================
    window.mentorKnowledge = {
        generateResponse,
        ConversationMemory,
        
        // Utilidades para testing
        _emotional: emotionalKnowledge,
        _technical: technicalKnowledge,
        _basic: basicConversation,
        _system: systemKnowledge,
        
        // Estadísticas
        getStats: function() {
            return {
                emotional: Object.keys(emotionalKnowledge).length,
                technical: Object.keys(technicalKnowledge).length,
                basic: Object.keys(basicConversation).length,
                system: Object.keys(systemKnowledge).length,
                total: Object.keys(emotionalKnowledge).length + 
                       Object.keys(technicalKnowledge).length + 
                       Object.keys(basicConversation).length +
                       Object.keys(systemKnowledge).length
            };
        },
        
        // Test de respuestas
        testResponse: function(message) {
            console.log('🧪 Testing:', message);
            const response = generateResponse(message);
            console.log('📤 Response:', response);
            return response;
        },
        
        // Ejemplos de consultas
        getExamples: function() {
            return {
                basic: ['hola', 'gracias', 'ayuda', 'adiós', 'no entiendo'],
                emocional: [
                    'me siento frustrado',
                    'tengo ansiedad por la evaluación',
                    'síndrome del impostor',
                    'estoy procrastinando',
                    'me da vergüenza mostrar mi arte',
                    'comparación en redes sociales',
                    'tengo miedo al juicio',
                    'burnout creativo',
                    'me siento culpable por no practicar'
                ],
                tecnico: [
                    '¿cómo dibujar línea de acción?',
                    'no me salen las manos',
                    '¿qué son los valores tonales?',
                    'proporciones del cuerpo',
                    'cómo dibujar pliegues de ropa',
                    'perspectiva y escorzo'
                ],
                sistema: [
                    '¿cómo subo ejercicios?',
                    '¿qué materiales necesito?',
                    '¿dónde veo mi progreso?',
                    '¿cuánto tiempo debo practicar?'
                ]
            };
        }
    };

    // ============================================
    // 8. INICIALIZACIÓN Y LOGS
    // ============================================
    console.log('✅ mentor-knowledge.js v5.0 (70 RESPUESTAS + ENCODING CORREGIDO): Cargado exitosamente');
    console.log('┌────────────────────────────────────────────┐');
    console.log('│  📊 ESTADÍSTICAS DEL MENTOR ANATÓMICO v5.0 │');
    console.log('├────────────────────────────────────────────┤');
    console.log('│  💙 Respuestas emocionales: ' + Object.keys(emotionalKnowledge).length + '          │');
    console.log('│  🎨 Respuestas técnicas: ' + Object.keys(technicalKnowledge).length + '             │');
    console.log('│  💬 Conversación básica: ' + Object.keys(basicConversation).length + '               │');
    console.log('│  📚 Sistema y curso: ' + Object.keys(systemKnowledge).length + '                   │');
    console.log('│  📝 Total respuestas: ' + (Object.keys(emotionalKnowledge).length + Object.keys(technicalKnowledge).length + Object.keys(basicConversation).length + Object.keys(systemKnowledge).length) + '                  │');
    console.log('└────────────────────────────────────────────┘');
    console.log('');
    console.log('💙 FUNCIONALIDADES v5.0:');
    console.log('  ✅ 15 respuestas de conversación básica');
    console.log('  ✅ 25 respuestas emocionales completas');
    console.log('  ✅ 35 respuestas técnicas completas');
    console.log('  ✅ 5 respuestas de sistema/curso');
    console.log('  ✅ Keywords CON Y SIN ACENTOS (encoding corregido)');
    console.log('  ✅ Detección mejorada para "como hago la linea de accion"');
    console.log('  ✅ Sistema de memoria conversacional');
    console.log('  ✅ Compatible con integración index.html');
    console.log('');
    console.log('🔧 CORRECCIONES v5.0:');
    console.log('  ✅ Todos los keywords duplicados (con y sin acentos)');
    console.log('  ✅ Versiones SIN acentos tienen prioridad');
    console.log('  ✅ Texto de respuestas con encoding UTF-8 correcto');
    console.log('  ✅ Emojis funcionando correctamente');
    console.log('');
    console.log('🧪 TESTING:');
    console.log('  window.mentorKnowledge.testResponse("como hago la linea de accion")');
    console.log('  window.mentorKnowledge.testResponse("tengo ansiedad")');
    console.log('  window.mentorKnowledge.testResponse("sindrome del impostor")');
    console.log('  window.mentorKnowledge.getExamples()');
    console.log('  window.mentorKnowledge.getStats()');
    console.log('');
    console.log('🚀 Sistema con 70 respuestas listo para usar!');
    console.log('💙 Enfoque especial en apoyo emocional y salud mental');

})();
