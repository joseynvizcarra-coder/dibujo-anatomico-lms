// ============================================
// MENTOR ANATÓMICO 2.0 - BASE DE CONOCIMIENTO
// ============================================

(function() {
    'use strict';

    // ============================================
    // 1. BASE DE CONOCIMIENTO EMOCIONAL (25)
    // ============================================
    const emotionalKnowledge = {
        frustracion: {
            keywords: ['frustrado', 'frustrada', 'frustrante', 'no puedo', 'no me sale', 'horrible', 'mal'],
            responses: {
                leve: {
                    text: "Hey, respira 💙. La frustración es señal de que estás aprendiendo algo nuevo. Tu cerebro está expandiéndose.\n\n**Técnica rápida:** Respira 4 segundos (inhala) - 4 segundos (sostén) - 6 segundos (exhala). Hazlo 3 veces.\n\nLuego vuelve al dibujo con curiosidad, no con juicio.",
                    actions: ['Estoy mejor, gracias', 'Necesito más ayuda']
                },
                media: {
                    text: "Entiendo que estés frustrado/a. El 78% del curso pasa por esto en algún punto. **Eres normal**.\n\n**Lo que pasa:** Tu ojo ve MÁS rápido de lo que tu mano puede hacer. Esa brecha genera frustración.\n\n**La solución:** No es dibujar mejor HOY. Es dibujar CONSISTENTE. La brecha se cierra con tiempo, no con fuerza.",
                    actions: ['¿Cuánto tiempo?', 'Dame un ejercicio']
                },
                alta: {
                    text: "Primero: **PARA**. No dibujes ahora. En serio.\n\n**Haz esto:**\n1. Cierra tu cuaderno\n2. Sal a caminar 10 minutos\n3. Toma agua\n4. Vuelve cuando estés más tranquilo/a\n\nDibujar con mucha frustración entrena **malos hábitos**. Es contraproducente.\n\n¿Necesitas que hablemos de por qué te frustras tanto?",
                    actions: ['Sí, hablemos', 'Solo necesitaba escuchar eso']
                }
            }
        },
        
        comparacion: {
            keywords: ['mejor que yo', 'peor que', 'otros dibujan', 'talento', 'nunca voy a', 'no tengo'],
            responses: {
                text: "🛑 **Alto ahí**. Compararse es el asesino silencioso del progreso creativo.\n\n**Verdad dura:** Siempre habrá alguien \"mejor\". Siempre. Incluso los profesionales se comparan entre ellos.\n\n**La pregunta real:** ¿Dibujas mejor que AYER? Esa es la única comparación válida.\n\nCompárate con tu yo de hace 1 semana. Ese es tu único oponente.",
                actions: ['Tienes razón', '¿Y si no veo progreso?']
            }
        },
        
        impostor: {
            keywords: ['no merezco', 'soy un fraude', 'suerte', 'engaño', 'no soy artista'],
            responses: {
                text: "Síndrome del impostor detectado 🔍. El 70% de artistas lo experimenta.\n\n**Realidad:** Si HACES arte, ERES artista. Punto. No necesitas permiso, diploma o validación externa.\n\n**Tip:** Cada vez que pienses \"no soy artista\", reemplázalo por: \"Soy un artista en desarrollo\". Pequeño cambio, gran impacto.\n\nTu práctica te hace artista, no tu inseguridad.",
                actions: ['Me ayuda oír eso', 'Pero mis dibujos son malos']
            }
        },
        
        bloqueo: {
            keywords: ['bloqueado', 'bloqueada', 'no se que dibujar', 'blanco', 'sin ideas', 'vacío'],
            responses: {
                text: "Bloqueo creativo es falta de INPUT, no falta de OUTPUT.\n\n**Ejercicio anti-bloqueo (15 min):**\n1. Ve 20 fotos de Pinterest (poses humanas)\n2. Elige la que más te llame\n3. Dibújala EN 5 MINUTOS (sí, mal hecho)\n4. Elige otra\n5. Repite\n\nEl bloqueo se rompe con VOLUMEN, no con perfección.\n\nNo pienses. Solo dibuja.",
                actions: ['Voy a intentarlo', '¿Dónde encuentro referencias?']
            }
        },
        
        ansiedad: {
            keywords: ['ansioso', 'ansiosa', 'nervios', 'estresado', 'estresada', 'presión'],
            responses: {
                text: "La ansiedad es energía mal dirigida. Vamos a redirigirla.\n\n**Técnica 5-4-3-2-1:**\n- 5 cosas que VES\n- 4 que TOCAS\n- 3 que ESCUCHAS\n- 2 que HUELES\n- 1 que SABOREAS\n\nEsto te ancla al presente. La ansiedad vive en el futuro (\"¿y si...?\").\n\nDibuja por dibujar, no por el resultado.",
                actions: ['Lo haré', 'Mi ansiedad es por la evaluación']
            }
        },
        
        perfeccionismo: {
            keywords: ['perfecto', 'perfecta', 'tiene que quedar bien', 'no está bien', 'borrar todo'],
            responses: {
                text: "El perfeccionismo NO es excelencia. Es miedo disfrazado.\n\n**Regla del 80/20:** Un dibujo al 80% de \"perfección\" te enseña más que uno al 100%.\n\n¿Por qué? Porque TERMINAS más. Y terminar > perfeccionar.\n\n**Ejercicio:** Haz tu siguiente dibujo en la MITAD del tiempo que normalmente usarías. Prohibido borrar. Solo avanzar.\n\nÁbraza lo \"feo\". Ahí está el aprendizaje real.",
                actions: ['Me cuesta no borrar', 'Voy a intentar']
            }
        },
        
        cansancio: {
            keywords: ['cansado', 'cansada', 'agotado', 'agotada', 'no tengo energía', 'sueño'],
            responses: {
                text: "Dibujar cansado/a = entrenar con gripe. Contraproducente.\n\n**Prioriza:**\n1. Dormir 7-8 horas\n2. Comer bien\n3. Moverte un poco\n4. DESPUÉS dibujar\n\nTu creatividad necesita energía física. No eres flojo/a, estás sin combustible.\n\nDescansa hoy, dibuja mañana. El curso no se va a ningún lado.",
                actions: ['Necesitaba escuchar esto', 'Pero tengo deadline']
            }
        },
        
        miedo: {
            keywords: ['miedo', 'temor', 'asusta', 'da pánico', 'terror'],
            responses: {
                text: "El miedo al error es el enemigo #1 del aprendizaje.\n\n**Verdad liberadora:** Los dibujos \"malos\" te enseñan MÁS que los \"buenos\".\n\nCada error es data. Data = aprendizaje.\n\n**Mantra:** \"Este dibujo no define mi valor como artista\".\n\nRepítelo antes de cada práctica. El miedo se disuelve con repetición.",
                actions: ['¿Y si sigo teniendo miedo?', 'Voy a intentarlo']
            }
        },
        
        desmotivacion: {
            keywords: ['desmotivado', 'desmotivada', 'sin ganas', 'para qué', 'no vale la pena'],
            responses: {
                text: "Desmotivación = expectativas vs. realidad desalineadas.\n\n**Pregunta honesta:** ¿Por qué empezaste este curso?\n\nReconecta con ESO. No con lo que Instagram dice que deberías lograr.\n\n**Micro-motivación:** Proponte dibujar solo 5 minutos hoy. SOLO 5. Usualmente continuarás, pero si no, 5 minutos > 0 minutos.\n\nLa motivación sigue a la acción, no al revés.",
                actions: ['Voy a intentar 5 minutos', 'Ya no me acuerdo por qué empecé']
            }
        },
        
        llanto: {
            keywords: ['llorar', 'lloro', 'lágrimas', 'ganas de llorar', 'lloré'],
            responses: {
                text: "Llorar está bien. En serio. No es debilidad.\n\nEstás procesando frustración, expectativa, esfuerzo. Eso es HUMANO.\n\n**Permiso oficial:** Llora si necesitas. Luego lávate la cara, toma agua, respira.\n\nCuando estés listo/a, vuelve. O no. Puedes descansar hoy.\n\nTu bienestar > cualquier dibujo. Siempre. 💙",
                actions: ['Gracias, necesitaba esto', 'Estoy mejor ahora']
            }
        }
    };

    // ============================================
    // 2. BASE DE CONOCIMIENTO TÉCNICO (25)
    // ============================================
    const technicalKnowledge = {
        // MÓDULO 1: Observación y Gesto (8 respuestas)
        lineaAccion: {
            keywords: ['linea de accion', 'linea accion', 'gesto', 'movimiento', 'dinamica'],
            responses: {
                text: "**Línea de acción** = La curva imaginaria que atraviesa el cuerpo mostrando su movimiento principal.\n\n**Cómo encontrarla:**\n1. Ignora detalles\n2. Busca la curva desde cabeza a pies\n3. Dibújala en 1 segundo\n\n**Tip:** Piensa en una 'S', 'C' o línea recta. Esas son las 3 formas base.\n\nCroquis empieza SIEMPRE con la línea de acción. Todo lo demás se construye sobre ella.",
                actions: ['Dame un ejemplo', 'Entendido']
            }
        },
        
        medirProporcion: {
            keywords: ['medir', 'proporcion', 'proporciones', 'lapiz', 'medicion'],
            responses: {
                text: "**Medir con el lápiz:**\n1. Estira el brazo COMPLETO (importante)\n2. Cierra un ojo\n3. Usa el lápiz como regla\n4. La cabeza suele ser tu \"unidad\"\n\n**Proporción básica:** Cuerpo humano = 7-8 cabezas de altura.\n\n**Error común:** Doblar el codo. Eso cambia la medición. Brazo siempre extendido.\n\nPractica midiendo objetos simples primero (botellas, cajas).",
                actions: ['¿Cómo practico?', 'Claro, gracias']
            }
        },
        
        contrapposto: {
            keywords: ['contrapposto', 'contraposto', 'peso', 'cadera', 'hombros'],
            responses: {
                text: "**Contrapposto** = Cuando el cuerpo pone peso en una pierna, creando ángulos opuestos en cadera y hombros.\n\n**Regla simple:**\n- Cadera sube del lado donde HAY peso\n- Hombro BAJA del mismo lado\n\n**Por qué importa:** Hace poses naturales, no rígidas.\n\n**Ejercicio:** Párate frente al espejo, pon peso en una pierna. Observa cómo tu cuerpo se ajusta automáticamente.",
                actions: ['Ah, ya veo', '¿Cómo lo dibujo?']
            }
        },
        
        croquis2min: {
            keywords: ['croquis rapido', 'croquis 2', '2 minutos', 'rapido', 'tiempo'],
            responses: {
                text: "**Croquis de 2 minutos:**\n1. 10 segundos: Línea de acción\n2. 30 segundos: Masas principales (cabeza, torso, pelvis)\n3. 60 segundos: Brazos y piernas (cilindros)\n4. 20 segundos: Manos/pies (formas simples)\n\n**Prohibido:**\n- Borrar\n- Detalles (ojos, dedos, ropa)\n- Dudar\n\n**Permitido:**\n- Líneas sucias\n- \"Fealdad\"\n- Avanzar siempre\n\nObjetivo: CAPTURAR, no embellecer.",
                actions: ['¿Dónde practico?', 'Entendido']
            }
        },
        
        puntoApoyo: {
            keywords: ['punto de apoyo', 'apoyo', 'equilibrio', 'balance'],
            responses: {
                text: "**Punto de apoyo** = Donde el cuerpo toca el suelo y sostiene el peso.\n\n**En una pose parado:**\n- 1 pierna: punto de apoyo bajo ese pie\n- 2 piernas: puntos de apoyo en ambos pies\n\n**Truco visual:** Imagina una línea vertical desde el centro de gravedad (ombligo aprox). Debe caer dentro del área de apoyo.\n\n**Si no:** La figura se ve como que va a caer.\n\nPractica dibujando la línea de gravedad primero.",
                actions: ['Claro', 'Dame un ejemplo']
            }
        },
        
        balanceVisual: {
            keywords: ['balance', 'balanceado', 'estable', 'inestable'],
            responses: {
                text: "**Balance visual:**\n- El cuerpo se organiza alrededor de su eje central\n- Peso distribuido para no caer\n\n**Checkeo rápido:**\n1. Dibuja línea vertical desde cuello\n2. ¿Cae entre los pies? ✓ Estable\n3. ¿Cae fuera? ✗ Se va a caer\n\n**En movimiento:** El balance se rompe INTENCIONALMENTE (corriendo, saltando).\n\n**Tip:** Mírate al espejo parado en una pierna. Observa cómo tu cuerpo se ajusta.",
                actions: ['Entiendo', '¿Y en acción?']
            }
        },
        
        proporcionesBasicas: {
            keywords: ['proporciones basicas', 'canon', 'medidas', 'altura'],
            responses: {
                text: "**Proporciones básicas del cuerpo:**\n- Adulto: 7.5-8 cabezas de altura\n- Ombligo: mitad del cuerpo (aprox)\n- Brazos extendidos: mismo ancho que altura\n- Manos: desde mentón a cejas\n- Pies: 1 cabeza de largo\n\n**No memorices.** Observa personas reales.\n\nLas proporciones varían (alto, bajo, delgado, robusto). Estas son solo GUÍA.\n\nTu ojo es mejor que cualquier regla.",
                actions: ['OK, observaré más', 'Gracias']
            }
        },
        
        observacion: {
            keywords: ['observar', 'observacion', 'ver', 'mirar', 'como observar'],
            responses: {
                text: "**Observación efectiva:**\n\n**1. Visión global primero**\nForma general → Masas → Detalles (en ese orden)\n\n**2. Dibuja lo que VES, no lo que SABES**\nEjemplo: No dibujes \"mano\", dibuja \"estas 5 formas\".\n\n**3. Medición constante**\nCompara todo con todo. \"Este brazo es 2x la cabeza\"\n\n**Ejercicio:** Mira un objeto 30 segundos sin dibujar. LUEGO dibuja. Tu observación mejorará 10x.",
                actions: ['Voy a practicar', 'Interesante']
            }
        },

        // MÓDULO 2: Anatomía Funcional (9 respuestas)
        tresMasas: {
            keywords: ['3 masas', 'tres masas', 'masas', 'bloques', 'torso'],
            responses: {
                text: "**Las 3 masas corporales:**\n\n1. **Cabeza** = Esfera/huevo\n2. **Torso** = Caja de costillas (mayor volumen)\n3. **Pelvis** = Cubo/cuenco\n\n**Por qué importa:** Son los bloques que NO se deforman mucho. Todo lo demás (brazos, piernas) se conecta A ellos.\n\n**Error común:** Dibujar el torso como una línea. Es un VOLUMEN 3D.\n\n**Práctica:** Dibuja solo estas 3 masas en diferentes poses. Ignora todo lo demás.",
                actions: ['Entendido', 'Dame un ejercicio']
            }
        },
        
        gruposMusculares: {
            keywords: ['musculos', 'musculares', '6 grupos', 'grupos musculares'],
            responses: {
                text: "**6 grupos musculares esenciales:**\n\n1. **Trapecio** (cuello a hombros)\n2. **Pectorales** (pecho)\n3. **Deltoides** (hombros)\n4. **Abdominales** (core)\n5. **Glúteos** (cadera)\n6. **Cuádriceps** (muslos)\n\n**No necesitas anatomía médica.** Solo formas básicas.\n\n**Tip:** Piensa en ellos como \"bultos\" que cambian la silueta.\n\nDibuja primero el esqueleto simple, luego agrega estos bultos.",
                actions: ['OK', '¿Cómo memorizo?']
            }
        },
        
        manosPies: {
            keywords: ['manos', 'pies', 'dedos', 'mano', 'pie'],
            responses: {
                text: "**Manos y pies simplificados:**\n\n**MANOS:**\n- Palma = rectángulo con grosor\n- Dedos = 3 cilindros cada uno\n- Pulgar = LATERAL, no frontal\n\n**PIES:**\n- Pie = cuña/triángulo 3D\n- Dedos = pequeños cilindros\n- Talón = parte más ancha\n\n**Error #1:** Dibujar contorno sin estructura 3D.\n\n**Solución:** Siempre empieza con el BLOQUE, luego agrega dedos.\n\nPractica dibujando TUS manos primero.",
                actions: ['Voy a practicar', 'Claro']
            }
        },
        
        estructuraMano: {
            keywords: ['mano plana', 'mano se ve mal', 'mano estructura', 'palma'],
            responses: {
                text: "**Por qué tu mano se ve plana:**\n\nDibujas CONTORNO sin VOLUMEN.\n\n**Solución 3D:**\n1. Palma = bloque rectangular con GROSOR\n2. Nudillos = 4 esferas en fila\n3. Dedos = cilindros que salen de esas esferas\n4. Pulgar conecta LATERALMENTE\n\n**Ejercicio ahora (10 min):**\nDibuja TU mano:\n1. Solo la palma como bloque (3 min)\n2. Agrega un dedo con sus 3 cilindros (3 min)\n3. Completa los demás (4 min)\n\nNo busques perfección, busca ESTRUCTURA.",
                actions: ['Lo haré', 'Gracias']
            }
        },
        
        rostroProporcion: {
            keywords: ['rostro', 'cara', 'proporciones cara', 'ojos', 'nariz'],
            responses: {
                text: "**Proporciones faciales básicas:**\n\n- Ojos: mitad de la cabeza (vertical)\n- Nariz: mitad entre ojos y mentón\n- Boca: mitad entre nariz y mentón\n- Ancho de ojo = espacio entre ojos\n- Orejas: desde cejas a nariz\n\n**Regla de tercios:**\nCabeza = 3 partes: frente, nariz, mentón.\n\n**Importante:** Estas son GUÍAS, no leyes. Las caras varían mucho.\n\nObserva rostros reales, no memorices números.",
                actions: ['Entiendo', 'OK']
            }
        },
        
        anatomiaFuncional: {
            keywords: ['anatomia funcional', 'como funciona', 'movimiento anatomia'],
            responses: {
                text: "**Anatomía funcional** = Entender cómo el cuerpo se MUEVE, no solo cómo se ve.\n\n**Ejemplo:**\n- Hombro NO es una esfera fija\n- Se mueve adelante, atrás, arriba, abajo\n- Dibújalo según la ACCIÓN, no según la foto\n\n**Enfoque correcto:**\n1. ¿Qué está haciendo el cuerpo?\n2. ¿Qué músculos se activan?\n3. ¿Cómo cambia la forma?\n\n**No necesitas ser médico.** Solo observar y entender causa-efecto.\n\nDibuja acciones (empujar, jalar, torcer), no solo poses estáticas.",
                actions: ['Interesante', 'Dame ejemplo']
            }
        },
        
        estructura3D: {
            keywords: ['3d', 'tridimensional', 'volumen', 'profundidad', 'plano'],
            responses: {
                text: "**Pensar en 3D:**\n\nTodo es un VOLUMEN, no una forma plana.\n\n**Ejercicio mental:**\n- Brazo NO es línea → es CILINDRO\n- Torso NO es rectángulo → es CAJA\n- Cabeza NO es círculo → es ESFERA\n\n**Técnica práctica:**\n1. Dibuja la forma 3D simple (cilindro, cubo, esfera)\n2. Agrega el eje central\n3. Construye detalles sobre eso\n\n**Tip:** Practica dibujando solo cilindros y cajas en diferentes ángulos.\n\nDomina el volumen, el resto fluye.",
                actions: ['Voy a practicar formas', 'Entendido']
            }
        },
        
        articulaciones: {
            keywords: ['articulaciones', 'articulacion', 'codos', 'rodillas', 'union'],
            responses: {
                text: "**Articulaciones simplificadas:**\n\n- Hombro = esfera (movimiento amplio)\n- Codo = bisagra (solo dobla)\n- Muñeca = esfera pequeña\n- Cadera = esfera (movimiento amplio)\n- Rodilla = bisagra (solo dobla)\n- Tobillo = bisagra + rotación ligera\n\n**Regla de oro:** Donde dos cilindros se juntan, hay una ESFERA.\n\n**Error común:** Articulaciones que se doblan donde no deben.\n\nDibuja el esqueleto simple primero, luego agrega forma.",
                actions: ['Claro', 'OK']
            }
        },
        
        escorzo: {
            keywords: ['escorzo', 'perspectiva', 'angulo', 'acortamiento'],
            responses: {
                text: "**Escorzo** = Cuando una parte del cuerpo apunta hacia ti o se aleja.\n\n**Efecto:** Se ve MÁS CORTA de lo que es.\n\n**Ejemplo:** Brazo extendido hacia ti\n- En realidad: largo\n- En dibujo: círculo (hombro) + mano grande\n\n**Técnica:**\n1. Dibuja el cilindro en perspectiva\n2. Las elipses (cortes) muestran la profundidad\n3. Lo que está cerca = más grande\n4. Lo que está lejos = más pequeño\n\n**Practica:** Toma foto de tu brazo apuntando a la cámara. Dibújalo.",
                actions: ['Voy a intentar', 'Entiendo']
            }
        },

        // MÓDULO 3: Figura Completa (5 respuestas)
        procesoCapas: {
            keywords: ['proceso capas', 'capas', 'proceso dibujo', 'pasos'],
            responses: {
                text: "**Proceso por capas:**\n\n**Capa 1: Gesto (30 seg)**\nLínea de acción + masas principales\n\n**Capa 2: Estructura (2 min)**\nCilindros para brazos/piernas, cubos para torso/pelvis\n\n**Capa 3: Anatomía (3 min)**\nFormas musculares básicas\n\n**Capa 4: Refinamiento (4+ min)**\nContorno limpio, detalles\n\n**Capa 5: Valores (opcional)**\nLuz y sombra\n\n**Regla:** NUNCA saltes capas. Cada una es fundamento de la siguiente.",
                actions: ['Entendido', '¿Cuánto tarda?']
            }
        },
        
        valoresTonales: {
            keywords: ['valores', 'tonales', 'luz', 'sombra', 'sombreado'],
            responses: {
                text: "**Valores tonales simplificados:**\n\n**3 valores básicos:**\n1. **Luz** (blanco del papel)\n2. **Medio tono** (gris)\n3. **Sombra** (oscuro)\n\n**Regla de la bola:**\nImagina el cuerpo como esferas y cilindros.\n- Luz: donde golpea la fuente de luz\n- Medio: transición\n- Sombra: lado opuesto a la luz\n\n**Error común:** Sombrear sin estructura.\n\n**Solución:** Define la estructura PRIMERO, sombrea DESPUÉS.\n\nPractica con objetos simples (huevos, botellas).",
                actions: ['Claro', 'Gracias']
            }
        },
        
        proyectoFinal: {
            keywords: ['proyecto final', 'final', 'proyecto', '1/4 mercurio'],
            responses: {
                text: "**Proyecto final - Requisitos:**\n\n- **Formato:** 1/4 pliego mercurio\n- **Tema:** Figura humana completa\n- **Incluir:**\n  * Gesto claro\n  * Estructura anatómica\n  * Proporciones correctas\n  * Valores tonales básicos\n\n**Proceso:**\n1. Sketch preliminar (varios intentos)\n2. Elige el mejor\n3. Pásalo al formato final\n4. Refina\n\n**Tiempo estimado:** 4-6 horas\n\nNo busques perfección, busca aplicar TODO lo aprendido.",
                actions: ['¿Qué pose elijo?', 'Entendido']
            }
        },
        
        integracion: {
            keywords: ['integrar', 'integracion', 'todo junto', 'aplicar todo'],
            responses: {
                text: "**Integrar gesto + anatomía:**\n\n**El truco:** Piensa en CAPAS, no en \"todo a la vez\".\n\n1. **Gesto primero** (30 seg)\n   - Captura la energía\n   - Línea de acción\n\n2. **Estructura encima** (2 min)\n   - Cilindros y cajas\n   - Mantén el gesto\n\n3. **Anatomía al final** (3+ min)\n   - Músculos como \"bultos\" sobre estructura\n   - NO pierdas el gesto original\n\n**Secreto:** El gesto es el ALMA. La anatomía es el TRAJE.\n\nNunca sacrifiques el gesto por anatomía perfecta.",
                actions: ['Tiene sentido', 'OK']
            }
        },
        
        figura15min: {
            keywords: ['figura larga', '15 minutos', 'figura completa', 'tiempo largo'],
            responses: {
                text: "**Figura de 15 minutos - Distribución:**\n\n- 1 min: Línea de acción + composición\n- 3 min: Estructura (cilindros, masas)\n- 4 min: Anatomía básica\n- 4 min: Refinamiento de formas\n- 3 min: Valores/sombras básicas\n\n**Tip:** Usa temporizador. Te fuerza a avanzar.\n\n**Error común:** Pasar 10 min en la cabeza y correr el resto.\n\n**Solución:** Cronometra CADA fase.\n\nLa figura completa debe desarrollarse COMPLETA, no una parte perfecta.",
                actions: ['Voy a cronometrar', 'Entendido']
            }
        },

        // SISTEMA LMS (3 respuestas)
        subirEjercicios: {
            keywords: ['subir ejercicio', 'como subir', 'entregar', 'enviar trabajo'],
            responses: {
                text: "**Cómo subir ejercicios:**\n\n1. Ve a la lección correspondiente\n2. Busca botón \"Subir ejercicio\"\n3. Saca foto CLARA de tu dibujo\n   - Buena luz\n   - Sin sombras\n   - Enfocado\n4. Sube la imagen\n5. ✓ Confirmación automática\n\n**Tip:** Puedes subir varias veces. Solo cuenta la última versión.\n\nSi tienes problemas técnicos, contacta al profesor.",
                actions: ['Entendido', 'Gracias']
            }
        },
        
        verProgreso: {
            keywords: ['progreso', 'avance', 'donde veo', 'estadisticas'],
            responses: {
                text: "**Ver tu progreso:**\n\n1. **Dashboard principal:** Barra de progreso general\n2. **Cada módulo:** Porcentaje completado\n3. **Dentro de lecciones:** Checkmarks ✓\n\n**Progreso se calcula por:**\n- Lecciones completadas\n- Ejercicios subidos\n- Evaluaciones aprobadas\n\n**Actualiza automáticamente** cada vez que completas algo.\n\nNo te obsesiones con el %, obsesiónate con PRACTICAR.",
                actions: ['OK', 'Claro']
            }
        },
        
        materiales: {
            keywords: ['materiales', 'que necesito', 'lapices', 'papel', 'herramientas'],
            responses: {
                text: "**Materiales básicos:**\n\n**Esenciales:**\n- Lápiz grafito (HB y 2B)\n- Borrador\n- Papel (block de croquis)\n- Sacapuntas\n\n**Opcionales:**\n- Carboncillo\n- Lápices de colores\n- Papel mercurio (proyecto final)\n\n**No necesitas:**\n- Materiales caros\n- 20 tipos de lápices\n- Papel fancy para practicar\n\n**Regla:** Mejor papel barato y MUCHA práctica, que papel caro y miedo a usarlo.",
                actions: ['Perfecto', 'Gracias']
            }
        }
    };

    // ============================================
    // 3. SISTEMA DE DETECCIÓN INTELIGENTE
    // ============================================
    function detectEmotion(text) {
        const lowerText = text.toLowerCase();
        
        // Detectar emocional
        for (const [emotion, data] of Object.entries(emotionalKnowledge)) {
            for (const keyword of data.keywords) {
                if (lowerText.includes(keyword)) {
                    // Detectar intensidad si es frustración
                    if (emotion === 'frustracion') {
                        const highIntensity = ['horrible', 'nunca', 'imposible', 'no puedo mas'].some(w => lowerText.includes(w));
                        const mediumIntensity = ['muy', 'mucho', 'demasiado'].some(w => lowerText.includes(w));
                        
                        if (highIntensity) return { emotion, intensity: 'alta' };
                        if (mediumIntensity) return { emotion, intensity: 'media' };
                        return { emotion, intensity: 'leve' };
                    }
                    return { emotion, intensity: null };
                }
            }
        }
        
        // Detectar técnico
        for (const [topic, data] of Object.entries(technicalKnowledge)) {
            for (const keyword of data.keywords) {
                if (lowerText.includes(keyword)) {
                    return { topic, isTechnical: true };
                }
            }
        }
        
        return null;
    }

    // ============================================
    // 4. GENERADOR DE RESPUESTAS
    // ============================================
    function generateResponse(userMessage) {
        const detected = detectEmotion(userMessage);
        
        // Respuesta emocional
        if (detected && detected.emotion) {
            const emotionData = emotionalKnowledge[detected.emotion];
            
            if (detected.emotion === 'frustracion') {
                return emotionData.responses[detected.intensity];
            }
            
            return emotionData.responses;
        }
        
        // Respuesta técnica
        if (detected && detected.isTechnical) {
            return technicalKnowledge[detected.topic].responses;
        }
        
        // Respuesta por defecto
        return {
            text: "Interesante pregunta 🤔. ¿Podrías darme más detalles?\n\nPuedo ayudarte con:\n- 💙 **Emociones** (frustración, bloqueo, ansiedad)\n- 🎨 **Técnica** (gesto, anatomía, proporciones)\n- 📚 **Sistema** (cómo usar el curso)\n\n¿Qué te gustaría explorar?",
            actions: ['Tengo una duda técnica', 'Me siento frustrado/a', 'Pregunta sobre el curso']
        };
    }

    // ============================================
    // 5. MEMORIA CONVERSACIONAL
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
    // 6. EXPORTAR AL SCOPE GLOBAL
    // ============================================
    window.mentorKnowledge = {
        generateResponse,
        ConversationMemory,
        // Exportar knowledge para debugging (opcional)
        _emotional: emotionalKnowledge,
        _technical: technicalKnowledge
    };
    
    console.log('✅ mentor-knowledge.js: Base de conocimiento cargada');
    console.log('📊 Respuestas emocionales:', Object.keys(emotionalKnowledge).length);
    console.log('🎨 Respuestas técnicas:', Object.keys(technicalKnowledge).length);

})();