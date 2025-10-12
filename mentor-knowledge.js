// ============================================
// MENTOR ANATÓMICO v2.1 - BASE DE CONOCIMIENTO COMPLETA
// Compatible con la integración del index.html
// ============================================

(function() {
    'use strict';

    // ============================================
    // 1. CONVERSACIÓN BÁSICA (saludos, gracias, etc.)
    // ============================================
    const basicConversation = {
        saludos: {
            keywords: ['hola', 'hi', 'hey', 'buenos dias', 'buenas tardes', 'buenas noches', 'saludos', 'que tal', 'alo'],
            text: "¡Hola! 👋 Soy tu Mentor Anatómico 2.0.\n\n**¿En qué puedo ayudarte hoy?**\n\n💙 **Emocional:** Me siento frustrado/a, estoy bloqueado/a\n🎨 **Técnico:** Línea de acción, proporciones, manos\n📚 **Sistema:** Cómo subir ejercicios, ver progreso\n\n**Escribe tu duda o pregunta** 💬",
            actions: ['Duda técnica', 'Apoyo emocional', 'Info del curso']
        },
        
        gracias: {
            keywords: ['gracias', 'thanks', 'thank you', 'te lo agradezco', 'muy util', 'me ayudo', 'muchas gracias'],
            text: "¡De nada! 💙 Me alegra haberte ayudado.\n\n**¿Necesitas algo más?**\n\nEstoy aquí para ti. Sigue practicando, vas por buen camino ✨",
            actions: ['Tengo otra duda', 'Estoy bien, gracias']
        },
        
        despedida: {
            keywords: ['chao', 'adios', 'adiós', 'nos vemos', 'hasta luego', 'bye', 'me voy', 'cierro'],
            text: "¡Hasta pronto! 👋✨\n\n**Recuerda:**\n- Practica un poco cada día\n- El progreso es acumulativo\n- Cada línea cuenta\n\n**¡Sigue dibujando!** 🎨",
            actions: []
        },

        ayuda: {
            keywords: ['ayuda', 'help', 'que puedes hacer', 'que sabes', 'como funciona', 'comandos', 'opciones'],
            text: "**Puedo ayudarte con:**\n\n💙 **EMOCIONAL:**\nFrustración, bloqueo, ansiedad, comparación, miedo\n\n🎨 **TÉCNICO:**\n• Módulo 1: Línea de acción, proporciones, croquis\n• Módulo 2: 3 masas, anatomía, manos/pies\n• Módulo 3: Valores tonales, proyecto final\n\n📚 **SISTEMA:**\nSubir ejercicios, progreso, materiales\n\n**Escribe tu duda en lenguaje natural** 💬",
            actions: ['Ver todo emocional', 'Ver todo técnico', 'Ver sistema']
        }
    };

    // ============================================
    // 2. BASE DE CONOCIMIENTO EMOCIONAL (10)
    // ============================================
    const emotionalKnowledge = {
        frustracion: {
            keywords: ['frustrado', 'frustrada', 'frustrante', 'no puedo', 'no me sale', 'horrible', 'mal', 'no me gusta', 'feo'],
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
            keywords: ['mejor que yo', 'peor que', 'otros dibujan', 'talento', 'nunca voy a', 'no tengo'],
            responses: {
                text: "🛑 **Alto ahí**. Compararse mata el progreso creativo.\n\n**Verdad dura:** Siempre habrá alguien \"mejor\". Siempre.\n\n**Pregunta real:** ¿Dibujas mejor que AYER? Esa es la única comparación válida.\n\nCompárate con tu yo de hace 1 semana.",
                actions: ['Tienes razón', '¿Y si no veo progreso?']
            }
        },
        
        impostor: {
            keywords: ['no merezco', 'soy un fraude', 'suerte', 'engaño', 'no soy artista'],
            responses: {
                text: "Síndrome del impostor detectado 🎭. El 70% de artistas lo experimenta.\n\n**Realidad:** Si HACES arte, ERES artista. Punto.\n\n**Tip:** Reemplaza \"no soy artista\" por: \"Soy un artista en desarrollo\".\n\nTu práctica te hace artista.",
                actions: ['Me ayuda oír eso', 'Pero mis dibujos son malos']
            }
        },
        
        bloqueo: {
            keywords: ['bloqueado', 'bloqueada', 'no se que dibujar', 'blanco', 'sin ideas', 'vacío', 'vacio'],
            responses: {
                text: "Bloqueo = falta de INPUT, no falta de talento.\n\n**Ejercicio (15 min):**\n1. Ve 20 fotos de poses en Pinterest/Line of Action\n2. Elige la que MÁS te llame\n3. Dibújala EN 5 MINUTOS (sí, mal hecho)\n4. Repite\n\nEl bloqueo se rompe con VOLUMEN.",
                actions: ['Voy a intentarlo', '¿Dónde busco referencias?']
            }
        },
        
        ansiedad: {
            keywords: ['ansioso', 'ansiosa', 'nervios', 'estresado', 'estresada', 'presión', 'presion'],
            responses: {
                text: "La ansiedad es energía mal dirigida. Vamos a redirigirla.\n\n**Técnica 5-4-3-2-1:**\n- 5 cosas que VES\n- 4 que TOCAS\n- 3 que ESCUCHAS\n- 2 que HUELES\n- 1 que SABOREAS\n\nEsto te ancla al presente. La ansiedad vive en el futuro.",
                actions: ['Lo haré', 'Mi ansiedad es por evaluación']
            }
        },
        
        perfeccionismo: {
            keywords: ['perfecto', 'perfecta', 'tiene que quedar bien', 'no está bien', 'borrar todo'],
            responses: {
                text: "Perfeccionismo NO es excelencia. Es miedo disfrazado.\n\n**Regla 80/20:** Un dibujo al 80% te enseña MÁS que uno al 100%.\n\n¿Por qué? Porque TERMINAS más.\n\n**Ejercicio:** Próximo dibujo en la MITAD del tiempo. Prohibido borrar.\n\nAbraza lo \"feo\".",
                actions: ['Me cuesta no borrar', 'Voy a intentar']
            }
        },
        
        cansancio: {
            keywords: ['cansado', 'cansada', 'agotado', 'agotada', 'no tengo energía', 'energía', 'sueño', 'sueno'],
            responses: {
                text: "Dibujar cansado/a = entrenar enfermo. Contraproducente.\n\n**Prioriza:**\n1. Dormir 7-8 horas\n2. Comer bien\n3. Moverte\n4. DESPUÉS dibujar\n\nTu creatividad necesita energía física.\n\nDescansa hoy, dibuja mañana.",
                actions: ['Necesitaba oír esto', 'Pero tengo deadline']
            }
        },
        
        miedo: {
            keywords: ['miedo', 'temor', 'asusta', 'da pánico', 'panico', 'terror'],
            responses: {
                text: "El miedo al error es enemigo #1 del aprendizaje.\n\n**Verdad:** Los dibujos \"malos\" enseñan MÁS que los \"buenos\".\n\nCada error es data. Data = aprendizaje.\n\n**Mantra:** \"Este dibujo no define mi valor como artista\".\n\nEl miedo se disuelve con repetición.",
                actions: ['¿Y si sigo teniendo miedo?', 'Voy a intentarlo']
            }
        },
        
        desmotivacion: {
            keywords: ['desmotivado', 'desmotivada', 'sin ganas', 'para qué', 'para que', 'no vale la pena'],
            responses: {
                text: "Desmotivación = expectativas vs. realidad desalineadas.\n\n**Pregunta:** ¿Por qué empezaste este curso?\n\nReconecta con ESO.\n\n**Micro-motivación:** Dibuja solo 5 minutos hoy. SOLO 5.\n\nLa motivación sigue a la acción, no al revés.",
                actions: ['Voy a intentar 5 min', 'Ya no recuerdo por qué empecé']
            }
        },
        
        llanto: {
            keywords: ['llorar', 'lloro', 'lágrimas', 'lagrimas', 'ganas de llorar', 'lloré', 'llore'],
            responses: {
                text: "Llorar está bien. En serio. No es debilidad.\n\nEstás procesando frustración, expectativa, esfuerzo. Eso es HUMANO.\n\n**Permiso oficial:** Llora si necesitas. Luego lávate la cara, toma agua.\n\nTu bienestar > cualquier dibujo. Siempre. 💙",
                actions: ['Gracias, necesitaba esto', 'Estoy mejor ahora']
            }
        }
    };

    // ============================================
    // 3. BASE DE CONOCIMIENTO TÉCNICO (25)
    // ============================================
    const technicalKnowledge = {
        // MÓDULO 1 (8)
        lineaAccion: {
            keywords: ['linea de accion', 'linea accion', 'línea de acción', 'línea acción', 'gesto', 'movimiento', 'dinamica', 'dinámica'],
            responses: {
                text: "**Línea de acción** = Curva imaginaria que atraviesa el cuerpo mostrando su movimiento.\n\n**Cómo encontrarla:**\n1. Ignora detalles\n2. Busca la curva desde cabeza a pies\n3. Dibújala en 1 segundo\n\n**Formas base:** 'S', 'C' o línea recta.\n\nCroquis empieza SIEMPRE con esto.",
                actions: ['Dame ejemplo', 'Entendido']
            }
        },
        
        medirProporcion: {
            keywords: ['medir', 'proporcion', 'proporciones', 'proporción', 'lapiz', 'lápiz', 'medicion', 'medición'],
            responses: {
                text: "**Medir con lápiz:**\n1. Estira brazo COMPLETO\n2. Cierra un ojo\n3. Usa lápiz como regla\n4. Cabeza = unidad base\n\n**Proporción:** Cuerpo = 7-8 cabezas.\n\n**Error:** Doblar codo.\n\nPractica con objetos simples.",
                actions: ['¿Cómo practico?', 'Claro']
            }
        },
        
        contrapposto: {
            keywords: ['contrapposto', 'contraposto', 'peso', 'cadera', 'hombros', 'balance'],
            responses: {
                text: "**Contrapposto** = Peso en una pierna, ángulos opuestos en cadera y hombros.\n\n**Regla:**\n- Cadera sube donde HAY peso\n- Hombro BAJA mismo lado\n\n**Ejercicio:** Párate frente espejo, pon peso en una pierna. Observa.",
                actions: ['Ya veo', '¿Cómo lo dibujo?']
            }
        },
        
        croquis2min: {
            keywords: ['croquis rapido', 'croquis rápido', 'croquis 2', '2 minutos', 'rapido', 'rápido', 'tiempo'],
            responses: {
                text: "**Croquis 2 minutos:**\n1. 10 seg: Línea acción\n2. 30 seg: Masas (cabeza, torso, pelvis)\n3. 60 seg: Brazos/piernas (cilindros)\n4. 20 seg: Manos/pies simples\n\n**Prohibido:** Borrar, detalles, dudar.\n**Permitido:** Líneas sucias, \"fealdad\".\n\nObjetivo: CAPTURAR.",
                actions: ['¿Dónde practico?', 'Entendido']
            }
        },
        
        puntoApoyo: {
            keywords: ['punto de apoyo', 'apoyo', 'equilibrio', 'estabilidad'],
            responses: {
                text: "**Punto de apoyo** = Donde cuerpo toca suelo.\n\n**Regla:** Línea vertical desde ombligo debe caer dentro área de apoyo.\n\n**Si no:** Figura se ve inestable.\n\nPractica dibujando línea de gravedad primero.",
                actions: ['Claro', 'Dame ejemplo']
            }
        },
        
        balanceVisual: {
            keywords: ['balance', 'balanceado', 'estable', 'inestable'],
            responses: {
                text: "**Balance visual:**\nCuerpo organizado alrededor eje central.\n\n**Checkeo:**\n1. Línea vertical desde cuello\n2. ¿Cae entre pies? ✓ Estable\n3. ¿Cae fuera? ✗ Inestable\n\n**En movimiento:** Balance se rompe intencionalmente.",
                actions: ['Entiendo', '¿Y en acción?']
            }
        },
        
        proporcionesBasicas: {
            keywords: ['proporciones basicas', 'proporciones básicas', 'canon', 'medidas', 'altura'],
            responses: {
                text: "**Proporciones:**\n- Adulto: 7.5-8 cabezas\n- Ombligo: mitad del cuerpo\n- Brazos extendidos = altura\n- Manos: mentón a cejas\n- Pies: 1 cabeza\n\n**No memorices.** Observa personas reales.\n\nTu ojo > cualquier regla.",
                actions: ['OK, observaré más', 'Gracias']
            }
        },
        
        observacion: {
            keywords: ['observar', 'observacion', 'observación', 'ver', 'mirar', 'como observar', 'cómo observar'],
            responses: {
                text: "**Observación efectiva:**\n\n1. **Visión global primero:** Forma general → Masas → Detalles\n2. **Dibuja lo que VES, no lo que SABES**\n3. **Medición constante:** Compara todo\n\n**Ejercicio:** Mira objeto 30 seg sin dibujar. LUEGO dibuja.",
                actions: ['Voy a practicar', 'Interesante']
            }
        },

        // MÓDULO 2 (9)
        tresMasas: {
            keywords: ['3 masas', 'tres masas', 'masas', 'bloques', 'torso'],
            responses: {
                text: "**3 masas corporales:**\n\n1. **Cabeza** = Esfera/huevo\n2. **Torso** = Caja costillas\n3. **Pelvis** = Cubo/cuenco\n\n**Por qué:** Son bloques que NO se deforman. Todo se conecta a ellos.\n\n**Error:** Dibujar torso como línea.\n\nPráctica: Solo estas 3 masas en poses.",
                actions: ['Entendido', 'Dame ejercicio']
            }
        },
        
        gruposMusculares: {
            keywords: ['musculos', 'músculos', 'musculares', '6 grupos', 'grupos musculares', 'anatomía', 'anatomia'],
            responses: {
                text: "**6 grupos musculares:**\n\n1. Trapecio (cuello-hombros)\n2. Pectorales (pecho)\n3. Deltoides (hombros)\n4. Abdominales (core)\n5. Glúteos (cadera)\n6. Cuádriceps (muslos)\n\n**No necesitas** anatomía médica. Solo formas básicas.\n\nPiensa: \"bultos\" que cambian silueta.",
                actions: ['OK', '¿Cómo memorizo?']
            }
        },
        
        manosPies: {
            keywords: ['manos', 'pies', 'dedos', 'mano', 'pie'],
            responses: {
                text: "**Manos y pies:**\n\n**MANOS:**\n- Palma = rectángulo con grosor\n- Dedos = 3 cilindros c/u\n- Pulgar = LATERAL\n\n**PIES:**\n- Pie = cuña 3D\n- Dedos = cilindros pequeños\n- Talón = más ancho\n\n**Error #1:** Contorno sin estructura 3D.\n\nPractica dibujando TUS manos.",
                actions: ['Voy a practicar', 'Claro']
            }
        },
        
        estructuraMano: {
            keywords: ['mano plana', 'mano se ve mal', 'mano estructura', 'palma'],
            responses: {
                text: "**Por qué plana:** Dibujas CONTORNO sin VOLUMEN.\n\n**Solución 3D:**\n1. Palma = bloque rectangular con GROSOR\n2. Nudillos = 4 esferas\n3. Dedos = cilindros\n4. Pulgar lateral\n\n**Ejercicio (10 min):**\n1. Solo palma como bloque (3 min)\n2. Un dedo (3 min)\n3. Completa demás (4 min)\n\nNo perfección, ESTRUCTURA.",
                actions: ['Lo haré', 'Gracias']
            }
        },
        
        rostroProporcion: {
            keywords: ['rostro', 'cara', 'proporciones cara', 'ojos', 'nariz', 'faciales'],
            responses: {
                text: "**Proporciones faciales:**\n\n- Ojos: mitad cabeza\n- Nariz: mitad ojos-mentón\n- Boca: mitad nariz-mentón\n- Ancho ojo = espacio entre ojos\n- Orejas: cejas a nariz\n\n**Regla tercios:** Frente, nariz, mentón.\n\n**Importante:** Son GUÍAS. Caras varían.\n\nObserva rostros reales.",
                actions: ['Entiendo', 'OK']
            }
        },
        
        anatomiaFuncional: {
            keywords: ['anatomia funcional', 'anatomía funcional', 'como funciona', 'cómo funciona', 'movimiento anatomia', 'movimiento anatomía'],
            responses: {
                text: "**Anatomía funcional** = Entender cómo cuerpo se MUEVE, no solo cómo se ve.\n\n**Ejemplo:** Hombro se mueve adelante, atrás, arriba, abajo. Dibújalo según ACCIÓN.\n\n**Enfoque:**\n1. ¿Qué hace el cuerpo?\n2. ¿Qué músculos activan?\n3. ¿Cómo cambia forma?\n\nDibuja acciones, no solo poses estáticas.",
                actions: ['Interesante', 'Dame ejemplo']
            }
        },
        
        estructura3D: {
            keywords: ['3d', 'tridimensional', 'volumen', 'profundidad', 'plano'],
            responses: {
                text: "**Pensar 3D:** Todo es VOLUMEN, no forma plana.\n\n**Mental:**\n- Brazo = CILINDRO\n- Torso = CAJA\n- Cabeza = ESFERA\n\n**Técnica:**\n1. Forma 3D simple\n2. Eje central\n3. Construye detalles\n\n**Tip:** Practica solo cilindros y cajas en ángulos.\n\nDomina volumen, resto fluye.",
                actions: ['Voy a practicar', 'Entendido']
            }
        },
        
        articulaciones: {
            keywords: ['articulaciones', 'articulacion', 'articulación', 'codos', 'rodillas', 'union', 'unión'],
            responses: {
                text: "**Articulaciones:**\n\n- Hombro = esfera (amplio)\n- Codo = bisagra (solo dobla)\n- Muñeca = esfera pequeña\n- Cadera = esfera (amplio)\n- Rodilla = bisagra\n- Tobillo = bisagra + rotación\n\n**Regla:** Donde 2 cilindros juntan = ESFERA.\n\nDibuja esqueleto simple primero.",
                actions: ['Claro', 'OK']
            }
        },
        
        escorzo: {
            keywords: ['escorzo', 'perspectiva', 'angulo', 'ángulo', 'acortamiento'],
            responses: {
                text: "**Escorzo** = Parte apunta hacia ti o se aleja. Se ve MÁS CORTA.\n\n**Ejemplo:** Brazo hacia ti\n- Real: largo\n- Dibujo: círculo + mano grande\n\n**Técnica:**\n1. Cilindro en perspectiva\n2. Elipses muestran profundidad\n3. Cerca = grande, lejos = pequeño\n\n**Práctica:** Foto tu brazo hacia cámara.",
                actions: ['Voy a intentar', 'Entiendo']
            }
        },

        // MÓDULO 3 (5)
        procesoCapas: {
            keywords: ['proceso capas', 'capas', 'proceso dibujo', 'pasos', 'workflow'],
            responses: {
                text: "**Proceso capas:**\n\n1. **Gesto (30 seg):** Línea acción + masas\n2. **Estructura (2 min):** Cilindros/cubos\n3. **Anatomía (3 min):** Formas musculares\n4. **Refinamiento (4+ min):** Contorno, detalles\n5. **Valores (opcional):** Luz/sombra\n\n**Regla:** NUNCA saltes capas.",
                actions: ['Entendido', '¿Cuánto tarda?']
            }
        },
        
        valoresTonales: {
            keywords: ['valores', 'tonales', 'luz', 'sombra', 'sombreado', 'sombrear'],
            responses: {
                text: "**Valores tonales:**\n\n**3 básicos:**\n1. **Luz** (blanco papel)\n2. **Medio tono** (gris)\n3. **Sombra** (oscuro)\n\n**Regla bola:** Imagina cuerpo como esferas/cilindros.\n- Luz: donde golpea\n- Medio: transición\n- Sombra: opuesto luz\n\n**Error:** Sombrear sin estructura.\n\nEstructura PRIMERO, sombra DESPUÉS.",
                actions: ['Claro', 'Gracias']
            }
        },
        
        proyectoFinal: {
            keywords: ['proyecto final', 'final', 'proyecto', '1/4 mercurio', 'mercurio'],
            responses: {
                text: "**Proyecto final:**\n\n- **Formato:** 1/4 mercurio\n- **Tema:** Figura completa\n- **Incluir:** Gesto, anatomía, proporciones, valores\n\n**Proceso:**\n1. Sketch preliminar\n2. Elige mejor\n3. Pasa a formato final\n4. Refina\n\n**Tiempo:** 4-6 horas\n\nNo perfección, aplica TODO aprendido.",
                actions: ['¿Qué pose elijo?', 'Entendido']
            }
        },
        
        integracion: {
            keywords: ['integrar', 'integracion', 'integración', 'todo junto', 'aplicar todo'],
            responses: {
                text: "**Integrar gesto + anatomía:**\n\nPiensa CAPAS, no \"todo a la vez\".\n\n1. **Gesto (30 seg):** Captura energía\n2. **Estructura (2 min):** Mantén gesto\n3. **Anatomía (3+ min):** Bultos sobre estructura\n\n**Secreto:** Gesto = ALMA. Anatomía = TRAJE.\n\nNunca sacrifiques gesto por anatomía perfecta.",
                actions: ['Tiene sentido', 'OK']
            }
        },
        
        figura15min: {
            keywords: ['figura larga', '15 minutos', 'figura completa', 'tiempo largo'],
            responses: {
                text: "**Figura 15 min:**\n\n- 1 min: Línea acción + composición\n- 3 min: Estructura\n- 4 min: Anatomía básica\n- 4 min: Refinamiento\n- 3 min: Valores/sombras\n\n**Tip:** Usa temporizador.\n\n**Error:** 10 min en cabeza, correr resto.\n\nCronometra CADA fase.",
                actions: ['Voy a cronometrar', 'Entendido']
            }
        },

        // SISTEMA LMS (3)
        subirEjercicios: {
            keywords: ['subir ejercicio', 'como subir', 'cómo subir', 'entregar', 'enviar trabajo', 'cargar ejercicio'],
            responses: {
                text: "**Subir ejercicios:**\n\n1. Ve a lección\n2. Botón \"Subir ejercicio\"\n3. Foto CLARA:\n   - Buena luz\n   - Sin sombras\n   - Enfocado\n4. Sube imagen\n5. ✓ Confirmación\n\n**Tip:** Puedes subir varias veces. Cuenta última.\n\nProblemas: contacta profesor.",
                actions: ['Entendido', 'Gracias']
            }
        },
        
        verProgreso: {
            keywords: ['progreso', 'avance', 'donde veo', 'dónde veo', 'estadisticas', 'estadísticas', 'mi progreso'],
            responses: {
                text: "**Ver progreso:**\n\n1. Dashboard principal: Barra general\n2. Cada módulo: % completado\n3. Dentro lecciones: Checkmarks ✓\n\n**Calcula:**\n- Lecciones completadas\n- Ejercicios subidos\n- Evaluaciones aprobadas\n\n**Actualiza** automáticamente.\n\nNo obsesiones con %, obsesiónate con PRACTICAR.",
                actions: ['OK', 'Claro']
            }
        },
        
        materiales: {
            keywords: ['materiales', 'que necesito', 'qué necesito', 'lapices', 'lápices', 'papel', 'herramientas'],
            responses: {
                text: "**Materiales:**\n\n**Esenciales:**\n- Lápiz grafito (HB y 2B)\n- Borrador\n- Papel (block croquis)\n- Sacapuntas\n\n**Opcionales:**\n- Carboncillo\n- Lápices color\n- Papel mercurio (proyecto final)\n\n**No necesitas:**\n- Materiales caros\n- 20 tipos de lápices\n- Papel fancy para practicar\n\n**Regla:** Mejor papel barato y MUCHA práctica, que papel caro y miedo a usarlo.",
                actions: ['Perfecto', 'Gracias']
            }
        }
    };

    // ============================================
    // 4. SISTEMA DE DETECCIÓN INTELIGENTE
    // ============================================
    function detectEmotion(text) {
        const lowerText = text.toLowerCase();
        
        // Primero: detectar conversación básica
        for (const [type, data] of Object.entries(basicConversation)) {
            for (const keyword of data.keywords) {
                if (lowerText.includes(keyword)) {
                    return { type: 'basic', subtype: type, data: data };
                }
            }
        }
        
        // Detectar emocional
        for (const [emotion, data] of Object.entries(emotionalKnowledge)) {
            for (const keyword of data.keywords) {
                if (lowerText.includes(keyword)) {
                    // Detectar intensidad si es frustración
                    if (emotion === 'frustracion') {
                        const highIntensity = ['horrible', 'nunca', 'imposible', 'no puedo mas'].some(w => lowerText.includes(w));
                        const mediumIntensity = ['muy', 'mucho', 'demasiado'].some(w => lowerText.includes(w));
                        
                        if (highIntensity) return { type: 'emotional', emotion, intensity: 'alta', data };
                        if (mediumIntensity) return { type: 'emotional', emotion, intensity: 'media', data };
                        return { type: 'emotional', emotion, intensity: 'leve', data };
                    }
                    return { type: 'emotional', emotion, intensity: null, data };
                }
            }
        }
        
        // Detectar técnico
        for (const [topic, data] of Object.entries(technicalKnowledge)) {
            for (const keyword of data.keywords) {
                if (lowerText.includes(keyword)) {
                    return { type: 'technical', topic, data };
                }
            }
        }
        
        return null;
    }

    // ============================================
    // 5. GENERADOR DE RESPUESTAS
    // ============================================
    function generateResponse(userMessage) {
        const detected = detectEmotion(userMessage);
        
        // Respuesta básica (hola, gracias, etc.)
        if (detected && detected.type === 'basic') {
            return {
                type: 'basic',
                subtype: detected.subtype,
                text: detected.data.text,
                actions: detected.data.actions || []
            };
        }
        
        // Respuesta emocional
        if (detected && detected.type === 'emotional') {
            const emotionData = detected.data;
            
            if (detected.emotion === 'frustracion') {
                return emotionData.responses[detected.intensity];
            }
            
            return emotionData.responses;
        }
        
        // Respuesta técnica
        if (detected && detected.type === 'technical') {
            return detected.data.responses;
        }
        
        // Respuesta por defecto (no encontrado)
        return {
            text: "Interesante pregunta 🤔. ¿Podrías darme más detalles?\n\nPuedo ayudarte con:\n- 💙 **Emociones** (frustración, bloqueo, ansiedad)\n- 🎨 **Técnica** (gesto, anatomía, proporciones)\n- 📚 **Sistema** (cómo usar el curso)\n\n¿Qué te gustaría explorar?",
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
            // Si las últimas 3 interacciones tienen emociones negativas
            const recent = this.emotionalState.slice(-3);
            const negative = ['frustracion', 'ansiedad', 'bloqueo', 'llanto'];
            
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
        
        // Estadísticas
        getStats: function() {
            return {
                emotional: Object.keys(emotionalKnowledge).length,
                technical: Object.keys(technicalKnowledge).length,
                basic: Object.keys(basicConversation).length,
                total: Object.keys(emotionalKnowledge).length + 
                       Object.keys(technicalKnowledge).length + 
                       Object.keys(basicConversation).length
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
                basic: ['hola', 'gracias', 'ayuda', 'adiós'],
                emocional: [
                    'me siento frustrado',
                    'estoy bloqueado',
                    'tengo miedo',
                    'otros dibujan mejor que yo'
                ],
                tecnico: [
                    '¿cómo dibujar línea de acción?',
                    'no me salen las manos',
                    '¿qué son los valores tonales?',
                    'proporciones del cuerpo'
                ],
                sistema: [
                    '¿cómo subo ejercicios?',
                    '¿qué materiales necesito?',
                    '¿dónde veo mi progreso?'
                ]
            };
        }
    };

    // ============================================
    // 8. INICIALIZACIÓN Y LOGS
    // ============================================
    console.log('✅ mentor-knowledge.js v2.1 COMPLETO: Cargado exitosamente');
    console.log('┌────────────────────────────────────────────┐');
    console.log('│  📊 ESTADÍSTICAS DEL MENTOR ANATÓMICO      │');
    console.log('├────────────────────────────────────────────┤');
    console.log('│  💙 Respuestas emocionales: ' + Object.keys(emotionalKnowledge).length + '           │');
    console.log('│  🎨 Respuestas técnicas: ' + Object.keys(technicalKnowledge).length + '              │');
    console.log('│  💬 Conversación básica: ' + Object.keys(basicConversation).length + '               │');
    console.log('│  📝 Total respuestas: ' + (Object.keys(emotionalKnowledge).length + Object.keys(technicalKnowledge).length + Object.keys(basicConversation).length) + '                  │');
    console.log('└────────────────────────────────────────────┘');
    console.log('');
    console.log('💙 FUNCIONALIDADES v2.1:');
    console.log('  ✅ Saludos y conversación básica');
    console.log('  ✅ Detección emocional con intensidad');
    console.log('  ✅ 25 respuestas técnicas completas');
    console.log('  ✅ Sistema de memoria conversacional');
    console.log('  ✅ Compatible con integración index.html');
    console.log('');
    console.log('🧪 TESTING:');
    console.log('  window.mentorKnowledge.testResponse("hola")');
    console.log('  window.mentorKnowledge.getExamples()');
    console.log('  window.mentorKnowledge.getStats()');
    console.log('');
    console.log('🚀 Sistema listo para usar!');

})();
