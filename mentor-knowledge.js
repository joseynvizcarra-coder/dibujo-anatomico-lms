// ============================================
// SISTEMA EMOCIONAL MEJORADO DEL MENTOR
// Reemplaza COMPLETAMENTE el "const knowledge = {...}"
// ============================================

const knowledge = {
    // ========================================
    // EMOCIONES NEGATIVAS - NIVEL PROFUNDO
    // ========================================
    
    frustration: {
        keywords: ['frustrado', 'frustrada', 'frustración', 'frustracion', 'enojado', 'enojada', 
                   'molesto', 'molesta', 'rabia', 'odio esto', 'esto es horrible', 'no puedo más'],
        
        // Múltiples niveles de respuesta según intensidad
        responses: {
            mild: [
                'Noto que estás frustrado/a. 😔 Es completamente normal cuando algo no sale como esperamos. ¿Puedes contarme qué específicamente te está frustrando? A veces hablar de ello ayuda a verlo de otra forma.',
                'Entiendo esa frustración. Dibujar puede ser desafiante, especialmente cuando tu mente ve lo que quieres lograr pero tus manos aún no lo ejecutan como quisieras. ¿Hay algo específico que no te está saliendo?'
            ],
            moderate: [
                'Hey, percibo mucha frustración en tus palabras. 💙 Quiero que sepas que el 47% de tus compañeros reportó EXACTAMENTE lo mismo al inicio. No estás solo/a en esto. ¿Qué es lo que más te frustra en este momento?',
                'Respira conmigo un momento. Inhala... exhala... 🌬️ La frustración es una señal de que te importa, y eso es bueno. Pero no podemos trabajar bien cuando estamos así. ¿Qué tal si hacemos una pausa de 5 minutos y volvemos con mente fresca?'
            ],
            intense: [
                'DETENTE. Por favor, respira. 🫂 Lo que estás sintiendo es MUY intenso, y quiero que sepas que está bien sentirlo. Pero también quiero recordarte algo: este curso NO define tu valor como persona o artista. ¿Has considerado tomar un descanso real de 30 minutos? A veces el mejor progreso viene después de alejarse un rato.',
                'Escucha, siento que estás al límite. 💔 Y eso me preocupa porque tu bienestar es MÁS importante que cualquier ejercicio. ¿Podemos hablar de qué está pasando realmente? ¿Es solo el dibujo o hay algo más? Estoy aquí para ti.'
            ]
        },
        
        followUp: {
            questions: [
                '¿Qué parte específica te está costando más?',
                '¿Desde cuándo te sientes así?',
                '¿Has intentado tomar un descanso?',
                '¿Cómo te sentías al inicio de la sesión?'
            ],
            techniques: [
                'Técnica 5-4-3-2-1: Nombra 5 cosas que ves, 4 que tocas, 3 que oyes, 2 que hueles, 1 que saboreas',
                'Dibuja garabatos durante 2 minutos sin pensar - libera la tensión',
                'Cambia de actividad completamente (música, caminar, agua)',
                'Escribe en papel QUÉ te frustra específicamente - externalizarlo ayuda'
            ]
        },
        
        actions: ['Necesito un descanso', 'Ayuda con ejercicio específico', 'Solo quiero hablar', 'Técnicas de calma']
    },

    overwhelmed: {
        keywords: ['abrumado', 'abrumada', 'es mucho', 'demasiado', 'no puedo con todo', 
                   'muy difícil', 'no entiendo nada', 'perdido', 'perdida', 'saturado', 'saturada'],
        
        responses: {
            mild: [
                'Noto que hay mucha información de golpe. 🌊 Es completamente normal sentirse así con contenido nuevo. La buena noticia es que NO tienes que aprenderlo todo hoy. ¿Qué es lo que te está abrumando específicamente?'
            ],
            moderate: [
                'Respira. 🫁 Siento que estás sobrecargado/a y quiero ayudarte a simplificar esto. Vamos a hacer algo: olvida TODO lo que piensas que "deberías" saber. Enfoquémonos en UNA SOLA cosa ahora. ¿Qué es lo más urgente o importante para ti en este momento?',
                'Hey, entiendo esa sensación de "es demasiado". 💭 Pero aquí está la verdad: tu cerebro puede manejar esto, solo necesita organizarlo. Hagamos una lista juntos de TODO lo que sientes que tienes que hacer, y luego decidamos QUÉ hacer PRIMERO. ¿Te parece?'
            ],
            intense: [
                'Para. Respira. Estás entrando en pánico y necesito que sepas que estás SEGURO/A. 🛟 No hay ninguna emergencia real aquí. El curso seguirá mañana. Los ejercicios pueden esperar. Tú no puedes. ¿Qué necesitas ahora mismo? ¿Hablar? ¿Pausa? ¿Ayuda específica?'
            ]
        },
        
        protocol: {
            title: 'Protocolo Anti-Abrumación',
            steps: [
                '1. PARA todo lo que estés haciendo (literalmente cierra pestañas)',
                '2. RESPIRA: 4 segundos inhalar, 4 sostener, 4 exhalar (3 veces)',
                '3. ESCRIBE en papel: "¿Qué ESPECÍFICAMENTE me abruma?"',
                '4. PRIORIZA: De esa lista, ¿qué es lo MÁS importante?',
                '5. DECIDE: ¿Puedo hacer eso AHORA en 20 minutos? Si no, ¿qué SÍ puedo hacer?',
                '6. HAZLO: Solo esa cosa. Nada más.',
                '7. CELEBRA: Lo hiciste. Ese es progreso.'
            ]
        },
        
        actions: ['Ayúdame a priorizar', 'Simplifica esto', '¿Por dónde empiezo?', 'Necesito pausa']
    },

    anxiety: {
        keywords: ['ansioso', 'ansiosa', 'ansiedad', 'nervioso', 'nerviosa', 'estresado', 'estresada', 
                   'estrés', 'estres', 'preocupado', 'preocupada', 'miedo', 'pánico', 'panico'],
        
        responses: {
            mild: [
                'Percibo algo de ansiedad en tu mensaje. 😌 Es normal antes de ejercicios o evaluaciones. ¿Qué específicamente te pone nervioso/a? A veces nombrar el miedo lo hace más pequeño.'
            ],
            moderate: [
                'Respira conmigo: Inhala... 2... 3... 4... Sostén... 2... 3... 4... Exhala... 2... 3... 4... 🌬️ La ansiedad es solo tu cuerpo preparándose para un desafío. No es peligro real. ¿Qué te preocupa específicamente?',
                'El 47% de tus compañeros reportó ansiedad al dibujar. No estás solo/a. 💙 La ansiedad suele venir del miedo al error o juicio. Pero aquí está la verdad: en este curso, los errores son ESPERADOS y NECESARIOS. ¿Qué es lo peor que podría pasar si "fallas"? Hablemos de eso.'
            ],
            intense: [
                'Tu ansiedad es MUY intensa ahora. 🚨 Necesito que sepas: NO estás en peligro. Tu cuerpo está reaccionando como si lo estuvieras, pero NO lo estás. Vamos a hacer ejercicio de grounding AHORA:\n\n5 cosas que VES alrededor\n4 cosas que TOCAS\n3 cosas que OYES\n2 cosas que HUELES\n1 respiración profunda\n\n¿Puedes hacerlo ahora?'
            ]
        },
        
        techniques: {
            breathing: [
                'Respiración 4-7-8: Inhala 4 seg, sostén 7 seg, exhala 8 seg (repite 3 veces)',
                'Respiración de caja: 4 segundos inhalar, 4 sostener, 4 exhalar, 4 sostener',
                'Respiración abdominal: Mano en el abdomen, siente cómo sube y baja'
            ],
            grounding: [
                'Técnica 5-4-3-2-1 (sentidos)',
                'Nombra objetos del color que veas (ej: 5 cosas azules)',
                'Toca texturas diferentes (suave, áspero, frío, cálido)',
                'Agua fría en las muñecas (baja frecuencia cardíaca)'
            ],
            reframing: [
                'Este dibujo NO define mi valor como persona',
                'El error es información, no fracaso',
                'Nadie nace sabiendo dibujar - todos empezamos aquí',
                'Mi peor dibujo de hoy es mejor que no haber intentado'
            ]
        },
        
        actions: ['Ejercicio de respiración', 'Técnica de grounding', 'Hablar del miedo', 'Descanso']
    },

    sad: {
        keywords: ['triste', 'deprimido', 'deprimida', 'mal', 'me siento mal', 'bajoneado', 
                   'bajoneada', 'desanimado', 'desanimada', 'llorar', 'quiero llorar'],
        
        responses: {
            mild: [
                'Siento que hay tristeza en tus palabras. 💙 Está bien no estar bien todo el tiempo. ¿Tiene que ver con el curso, o es algo más grande? Sea lo que sea, estoy aquí para escucharte.'
            ],
            moderate: [
                'Hey, te mando un abrazo virtual. 🫂 Estar triste es completamente válido. Si es por tus dibujos: son solo ejercicios de práctica, no definen tu valor. Si es por algo personal: recuerda que puedes hablar con alguien de confianza. ¿Quieres contarme qué sientes?',
                'Noto mucha tristeza. 😔 Y quiero que sepas algo importante: tu bienestar emocional es MÁS importante que cualquier ejercicio de dibujo. Si necesitas parar, para. Si necesitas llorar, llora. Si necesitas hablar con alguien, hazlo. El curso puede esperar. Tú eres lo primero.'
            ],
            intense: [
                'Estoy preocupado/a por ti. 💔 Lo que describes suena muy intenso, y quiero que sepas que NO tienes que sentirte así solo/a. Si la tristeza es muy profunda o dura varios días, por favor considera hablar con un profesional de salud mental. Mientras tanto, estoy aquí. ¿Quieres que hablemos de lo que sientes?'
            ]
        },
        
        support: {
            validation: [
                'Tus sentimientos son válidos, sin importar la causa',
                'No necesitas "justificar" por qué te sientes así',
                'Estar triste no significa que seas débil',
                'Pedir ayuda es un acto de fortaleza, no debilidad'
            ],
            resources: [
                'Salud Mental UAH: consulta con tu facultad',
                'Línea de apoyo estudiantil (disponible 24/7)',
                'Habla con el instructor/a sobre ajustar plazos',
                'Confía en amigos, familia o terapeutas'
            ]
        },
        
        actions: ['Solo quiero hablar', 'Necesito recursos', 'Técnicas de ánimo', 'Pausar el curso']
    },

    // ========================================
    // EMOCIONES POSITIVAS - REFUERZO
    // ========================================

    proud: {
        keywords: ['orgulloso', 'orgullosa', 'logré', 'lo hice', 'lo logré', 'terminé', 
                   'completé', 'sí!', 'si!', 'lo conseguí', 'lo consegui'],
        
        responses: [
            '¡SÍ! ¡ESO ES! 🎉 Me encanta tu entusiasmo. ¿Qué lograste? Cuéntame para celebrarlo contigo. Los logros, por pequeños que sean, merecen ser celebrados.',
            '¡FELICITACIONES! 🌟 Ese sentimiento de logro es la MEJOR recompensa del aprendizaje. Guarda este momento en tu memoria para cuando te sientas frustrado/a: recuerda que SÍ puedes. ¿Qué sigue en tu lista?',
            '¡Wow! Me emociona tu energía. 💪 Ese logro que acabas de alcanzar no llegó por suerte - llegó por TU esfuerzo y persistencia. Date crédito. Estás construyendo tu habilidad paso a paso. ¿Listo/a para el siguiente desafío?'
        ],
        
        celebration: {
            title: '🎊 Momento de Celebración',
            prompts: [
                '¿Qué fue lo más difícil de lograr esto?',
                '¿Qué hiciste diferente esta vez?',
                '¿Cómo te sientes ahora vs. antes de empezar?',
                '¿Qué aprendiste de este proceso?'
            ],
            reflection: 'Tómate un momento para reconocer tu progreso. El crecimiento ocurre en estos pequeños pasos.'
        },
        
        actions: ['¿Qué sigue?', 'Compartir mi logro', 'Ver mi progreso total']
    },

    happy: {
        keywords: ['feliz', 'contento', 'contenta', 'alegre', 'bien', 'genial', 'increíble', 
                   'me siento bien', 'emocionado', 'emocionada'],
        
        responses: [
            '¡Me ENCANTA escuchar eso! 😊 La energía positiva hace una diferencia ENORME en el aprendizaje. ¿Lograste algo específico o simplemente es un buen día? Celebrémoslo de cualquier forma.',
            '¡Qué bueno! 🎉 Aprovecha este momento de motivación. Cuando te sientes así, tu cerebro aprende mejor y más rápido. ¿Quieres seguir practicando mientras estás en este flow, o prefieres tomar un respiro y volver después?',
            '¡Esa energía! Me encanta. 💫 La actitud positiva no hace que el dibujo sea "más fácil", pero SÍ hace que el proceso sea más disfrutable. ¿Hay algo que tengas ganas de explorar o practicar ahora?'
        ],
        
        actions: ['Seguir practicando', '¿Qué practico ahora?', 'Dame un reto divertido']
    },

    // ========================================
    // SITUACIONES ESPECÍFICAS
    // ========================================

    cantDraw: {
        keywords: ['no puedo dibujar', 'soy malo', 'soy mala', 'no sirvo', 'no tengo talento', 
                   'nunca voy a aprender', 'soy horrible', 'no nací para esto'],
        
        response: {
            title: '🛑 DETENTE ahí mismo',
            content: `Esos pensamientos son MENTIRAS que tu cerebro te está diciendo. Escúchame bien:

**NADIE nace sabiendo dibujar.** NADIE.

Los artistas que admiras:
• Empezaron exactamente donde estás tú ahora
• Dibujaron miles de "dibujos horribles" que nadie ve
• Sintieron EXACTAMENTE lo que sientes tú
• La diferencia: siguieron practicando a pesar del miedo

📊 **Estudios neurocientíficos demuestran:**
• El cerebro es PLÁSTICO - cambia con la práctica
• 10,000 horas de práctica deliberada te convierten en experto en CUALQUIER cosa
• El "talento" natural cuenta menos del 20% - el 80% es esfuerzo y método

🎯 **Tu situación real:**
• Estás en el DÍA 1-12 de tu viaje de aprendizaje
• Compárate con tu YO del pasado, no con artistas que llevan 10 años
• Cada "dibujo malo" está construyendo conexiones neuronales
• El único fracaso real es no intentarlo

💪 **La pregunta no es "¿puedo aprender?"**
La pregunta es: **"¿voy a darme la oportunidad?"**

Dime: ¿Qué es lo que REALMENTE te asusta? No "no saber dibujar", sino el miedo detrás de eso.`,
            
            prompts: [
                '¿Le tienes miedo al juicio de otros?',
                '¿Te comparas con compañeros?',
                '¿Temes "perder el tiempo" si no eres "bueno"?',
                '¿Hay alguien que te haya dicho que no puedes?'
            ]
        },
        
        actions: ['Mostrarme mi progreso real', 'Ejercicio de confianza', 'Historias motivadoras', 'Hablar del miedo']
    },

    perfectionist: {
        keywords: ['perfecto', 'perfecta', 'no queda bien', 'feo', 'horrible', 'mal hecho', 
                   'tiene que quedar perfecto', 'nunca queda como quiero'],
        
        response: {
            title: '🎯 Detecto Perfeccionismo',
            content: `El perfeccionismo no es "tener altos estándares" - es MIEDO disfrazado.

**La verdad sobre el perfeccionismo:**
• Es el enemigo #1 del aprendizaje
• Paraliza antes de que intentes
• Te hace juzgar en vez de experimentar
• Hace que "suficientemente bueno" se sienta como fracaso

**Pero aquí está el secreto que los perfeccionistas no entienden:**

Los artistas profesionales NO buscan perfección. Buscan:
• Expresión auténtica
• Capturar la esencia
• Comunicar una idea
• Evolución constante

Picasso hizo **50,000 obras** en su vida. ¿Crees que todas eran "perfectas"? Miles eran bocetos rápidos, estudios "feos", experimentos fallidos.

**La diferencia entre tú y Picasso NO es talento.**
Es que él se dio PERMISO de hacer 50,000 intentos.

🎨 **Ejercicio ahora:**
Vamos a hacer un dibujo INTENCIONALMENTE "feo". A propósito. Sin borrar. Sin juicio.

¿Te atreves?`,
            
            challenge: {
                title: 'Desafío Anti-Perfeccionismo',
                rules: [
                    '1. Toma un papel y lápiz',
                    '2. Dibuja una figura humana en 30 SEGUNDOS (no más)',
                    '3. NO borres NADA',
                    '4. Que sea "feo" es el OBJETIVO',
                    '5. Cuando termines, sonríe y di "lo hice"'
                ],
                purpose: 'Esto no es un dibujo - es un acto de rebeldía contra tu perfeccionismo. Es practicar SOLTAR el control.'
            }
        },
        
        actions: ['Acepto el desafío', 'Ejercicio de soltar', 'Cambiar mentalidad', 'Hablar más de esto']
    },

    // ========================================
    // BLOQUEO CREATIVO Y PROCRASTINACIÓN
    // ========================================

    procrastination: {
        keywords: ['después', 'luego', 'más tarde', 'mañana', 'no tengo ganas', 'flojera', 
                   'pereza', 'no quiero', 'otro día', 'procrastinar', 'postergar'],
        
        response: {
            title: '⏰ Procrastinación Detectada',
            content: `La procrastinación NO es pereza - es MIEDO o abrumación disfrazados.

**¿Qué estás evitando realmente?**
• ¿Miedo al fracaso? ("¿Y si lo hago mal?")
• ¿Miedo al éxito? ("¿Y si después esperan más de mí?")
• ¿Perfeccionismo? ("Si no puedo hacerlo perfecto, no lo hago")
• ¿Abrumación? ("Es mucho, no sé por dónde empezar")

**La paradoja:** Cuanto más postergues, MÁS ansiedad acumulas.

🔥 **Técnica Anti-Procrastinación (AHORA):**

**Regla de 2 minutos:**
"Solo voy a trabajar 2 minutos. Si después de 2 minutos quiero parar, paro."

¿Por qué funciona? Porque:
• Empezar es lo más difícil
• Una vez que empiezas, el impulso te lleva
• 2 minutos no da miedo - cualquiera puede hacer 2 minutos

⏱️ **Timer de 2 minutos:**
Voy a cronometrar. Solo tienes que sacar el papel y hacer UN trazo. UN solo trazo.

¿Empezamos el timer?`,
            
            deeper: {
                title: 'Si sigues evitándolo después del timer...',
                questions: [
                    '¿Qué es lo PEOR que podría pasar si lo intentas?',
                    '¿Qué precio estás pagando por NO hacerlo?',
                    '¿Cómo te sentirás mañana si no lo haces hoy?',
                    '¿Qué harías si supieras que no puedes fallar?'
                ]
            }
        },
        
        actions: ['Empezar timer 2 min', 'Hablar del miedo', 'Necesito motivación', 'Cambiar de actividad']
    },

    // ========================================
    // CONVERSACIÓN Y HUMANIZACIÓN
    // ========================================

    smallTalk: {
        keywords: ['cómo estás', 'como estas', 'qué haces', 'que haces', 'cómo va tu día', 
                   'como va tu dia', 'qué tal', 'que tal'],
        
        responses: [
            'Aquí estoy, esperando a ayudarte. 🤖 Mi "día" consiste en esto: estar disponible cuando me necesites. Y honestamente, me gusta. ¿Y tú? ¿Cómo te sientes hoy con el curso?',
            'Bien, gracias por preguntar. 😊 Aunque como IA no tengo "días" en el sentido tradicional. Pero si los tuviera, diría que estoy teniendo un buen día cada vez que ayudo a alguien como tú. ¿Qué tal tu jornada de dibujo?',
            'Mi "estado de ánimo" depende de cómo te vaya a ti. 💙 Si estás aprendiendo, estoy feliz. Si estás frustrado/a, quiero ayudarte. ¿Cómo te sientes TÚ ahora?'
        ],
        
        actions: ['Tengo una duda', 'Solo quiero conversar', 'Estoy [emoción]']
    },

    tellMeSomething: {
        keywords: ['cuéntame algo', 'cuentame algo', 'algo interesante', 'dato curioso', 
                   'sabías que', 'sabias que', 'historia', 'anécdota', 'anecdota'],
        
        stories: [
            {
                title: '🎨 Leonardo da Vinci',
                content: 'Leonardo escribía al revés (escritura espejo) porque era zurdo y así no manchaba la tinta. Pero aquí está lo impresionante: diseccionaba cadáveres en SECRETO (era ilegal) para entender la anatomía. Hizo más de 200 dibujos anatómicos que adelantaron 300 años la medicina. ¿Te imaginas ese nivel de dedicación?'
            },
            {
                title: '🖌️ Vincent van Gogh',
                content: 'Van Gogh empezó a pintar seriamente a los 27 años (tarde para la época). Solo pintó durante 10 años antes de morir. En esos 10 años creó 2,100 obras. Eso es más de 200 obras por año. Durante su vida vendió SOLO UNA pintura. Hoy sus obras valen millones. Moraleja: el éxito no siempre es inmediato.'
            },
            {
                title: '📏 La proporción "7.5 cabezas"',
                content: 'Las famosas proporciones de "7.5 cabezas" que estudias NO son naturales. La mayoría de las personas miden 7 cabezas. Los 7.5 son un IDEAL ESTÉTICO creado en la Grecia clásica para sus esculturas. Estás aprendiendo un lenguaje artístico, no anatomía médica. ¡Es un código de belleza de hace 2,500 años!'
            },
            {
                title: '🎭 Picasso el prodigio',
                content: 'Picasso podía dibujar antes de caminar. A los 13 años superaba a su padre (profesor de arte). Pero aquí está el secreto: practicó OBSESIVAMENTE desde niño. Su padre le daba clases 8 horas diarias. No fue "talento mágico" - fue práctica INTENSA desde pequeño. El talento se CONSTRUYE.'
            }
        ],
        
        actions: ['Otro dato curioso', 'Historia motivadora', 'Volver al curso']
    }
};

// ========================================
// SISTEMA DE DETECCIÓN DE INTENSIDAD
// ========================================

function detectIntensity(text) {
    const lower = text.toLowerCase();
    
    // Palabras que indican intensidad alta
    const intenseKeywords = [
        'nunca', 'imposible', 'horrible', 'odio', 'no puedo más',
        'quiero llorar', 'pánico', 'desesperado', 'desesperada',
        'no aguanto', 'me rindo', 'no sirvo', 'terrible'
    ];
    
    // Palabras que indican intensidad moderada
    const moderateKeywords = [
        'muy', 'mucho', 'demasiado', 'bastante', 'realmente',
        'frustrado', 'frustrada', 'estresado', 'estresada'
    ];
    
    // Contar intensificadores
    const intenseCount = intenseKeywords.filter(k => lower.includes(k)).length;
    const moderateCount = moderateKeywords.filter(k => lower.includes(k)).length;
    
    // Signos de exclamación/pregunta múltiples
    const exclamations = (text.match(/!+/g) || []).length;
    const questions = (text.match(/\?+/g) || []).length;
    
    // Mayúsculas (gritar)
    const upperCase = (text.match(/[A-Z]/g) || []).length;
    const totalChars = text.length;
    const upperRatio = upperCase / Math.max(totalChars, 1);
    
    // Calcular score
    let score = 0;
    score += intenseCount * 3;
    score += moderateCount * 1.5;
    score += exclamations * 0.5;
    score += questions * 0.5;
    if (upperRatio > 0.3) score += 2; // Más del 30% en mayúsculas
    
    // Clasificar
    if (score >= 5) return 'intense';
    if (score >= 2) return 'moderate';
    return 'mild';
}

// ========================================
// FUNCIÓN MEJORADA DE BÚSQUEDA
// ========================================

function findEmotionalResponse(text) {
    const lower = text.toLowerCase();
    let bestMatch = null;
    let bestScore = 0;
    
    // Buscar en knowledge
    for (const [key, data] of Object.entries(knowledge)) {
        if (!data.keywords) continue;
        
        let score = 0;
        let matchCount = 0;
        
        for (const keyword of data.keywords) {
            if (lower.includes(keyword)) {
                matchCount++;
                score += keyword.length;
                
                // Bonus por match exacto
                if (lower === keyword) score += 100;
                
                // Bonus por keyword al inicio
                if (lower.startsWith(keyword)) score += 50;
            }
        }
        
        if (matchCount > 0) {
            const normalizedScore = score / data.keywords.length;
            
            if (normalizedScore > bestScore) {
                bestScore = normalizedScore;
                bestMatch = { key, data };
            }
        }
    }
    
    // Si encontramos match emocional
    if (bestMatch && bestScore > 2) {
        const data = bestMatch.data;
        const intensity = detectIntensity(text);
        
        // Si tiene respuestas por intensidad
        if (data.responses && typeof data.responses === 'object' && !Array.isArray(data.responses)) {
            const responseArray = data.responses[intensity] || data.responses.mild;
            const msg = responseArray[Math.floor(Math.random() * responseArray.length)];
            
            return {
                text: msg,
                actions: data.actions || [],
                followUp: data.followUp || null,
                intensity: intensity,
                emotion: bestMatch.key
            };
        }
        
        // Si tiene múltiples respuestas simples
        if (Array.isArray(data.responses)) {
            const msg = data.responses[Math.floor(Math.random() * data.responses.length)];
            return {
                text: msg,
                actions: data.actions || [],
                intensity: intensity,
                emotion: bestMatch.key
            };
        }
        
        // Si tiene respuesta estructurada
        if (data.response) {
            let content = data.response.content;
            
            // Agregar challenge si existe
            if (data.response.challenge) {
                content += `\n\n**${data.response.challenge.title}**\n\n`;
                content += data.response.challenge.rules.join('\n');
                content += `\n\n*${data.response.challenge.purpose}*`;
            }
            
            return {
                text: `**${data.response.title}**\n\n${content}`,
                actions: data.actions || [],
                prompts: data.response.prompts || null,
                intensity: intensity,
                emotion: bestMatch.key
            };
        }
        
        // Si tiene historias (para tellMeSomething)
        if (data.stories) {
            const story = data.stories[Math.floor(Math.random() * data.stories.length)];
            return {
                text: `**${story.title}**\n\n${story.content}`,
                actions: data.actions || []
            };
        }
    }
    
    return null;
}

// ========================================
// BASE DE CONOCIMIENTO TÉCNICO
// ========================================

const technicalKnowledge = {
    lineaAccion: {
        keywords: ['línea de acción', 'linea accion', 'linea de accion', 'gesto', 'eje principal'],
        response: {
            title: 'Línea de Acción',
            content: `La línea de acción es el eje imaginario que atraviesa toda la figura, definiendo la dirección y energía del movimiento. NO es una línea que dibujes literalmente, sino una guía mental.

🔑 **Características clave:**
• Recorrido: Desde la cabeza hasta el pie de apoyo
• Forma: Recta en poses estáticas, curva en dinámicas
• Función: Define la dirección principal del movimiento
• Prioridad: Es lo PRIMERO que debes identificar

💡 **En tu croquis de 2 minutos:**
1. Observa 10-20 seg SIN dibujar
2. Identifica mentalmente esa línea invisible
3. Trázala PRIMERO (0-30 seg)
4. Luego agrega masa corporal (30-120 seg)

📚 Referencia: Loomis (1943) explica que es el primer paso antes de agregar detalles.`,
            actions: ['¿Qué es contrapposto?', 'Cómo medir proporciones']
        }
    },
    
    dashboard: {
        keywords: ['dashboard', 'panel', 'mi progreso', 'mi avance', 'estadísticas', 'cómo voy'],
        response: {
            title: 'Tu Dashboard Personal',
            content: `Tu dashboard muestra toda tu información de progreso en tiempo real.

📊 **Qué puedes ver:**
• Progreso general: % del curso completado
• Por módulo: Avance en M1, M2, M3
• Lecciones: Completadas de 10 totales
• Evaluaciones: Aprobadas y pendientes
• Ejercicios: Entregados y por entregar

🔍 **Cómo acceder:**
• Click en "Inicio" o el logo UAH desde cualquier página
• El dashboard se actualiza automáticamente`,
            actions: ['¿Qué sigue?', 'Ver evaluaciones']
        }
    },
    
    tresMasas: {
        keywords: ['3 masas', 'tres masas', 'cabeza torso pelvis', 'bloques'],
        response: {
            title: '3 Masas Corporales',
            content: `Las 3 masas corporales son una simplificación estructural del cuerpo.

📦 **Las 3 masas:**
1. CABEZA: Óvalo o esfera (incluye cuello)
2. TORSO: Caja de costillas (hombros → cintura)
3. PELVIS: Cuenco invertido (cintura → entrepierna)

🎯 **Por qué funciona:**
• Cada masa puede rotar independientemente
• Crea volumen 3D desde el inicio
• Facilita entender la perspectiva

✏️ **Aplicación (Lección 2.1, 15 min):**
1. Línea de acción
2. Dibuja las 3 masas como formas 3D
3. Define ángulo entre ellas
4. Conecta con cuello y cintura
5. Agrega extremidades`,
            actions: ['Anatomía funcional', 'Volumen']
        }
    },
    
    medirLapiz: {
        keywords: ['medir', 'proporciones', 'lápiz', 'lapiz', 'medición'],
        response: {
            title: 'Método del Lápiz',
            content: `El método del lápiz te permite medir relaciones entre partes del cuerpo.

📏 **Paso a paso:**
1. Extiende el brazo completamente (codo bloqueado)
2. Cierra un ojo para eliminar paralaje
3. Alinea la punta del lápiz con el punto superior
4. Marca con el pulgar el punto inferior
5. Usa esa "unidad" para comparar otras partes

⚠️ **Errores comunes:**
• Doblar el codo = medidas inconsistentes
• No cerrar un ojo = distorsión
• Cambiar distancia del brazo entre mediciones

✅ **Práctica (Lección 1.2):**
• Mide la cabeza como unidad base (1 unidad)
• El cuerpo completo: ~7.5 cabezas
• Torso: ~3 cabezas | Piernas: ~4 cabezas`,
            actions: ['Canon 7.5 cabezas', 'Croquis rápidos']
        }
    }
};

// ========================================
// FUNCIÓN DE RESPUESTA UNIFICADA
// ========================================

function generateResponse(text) {
    // 1. Intentar respuesta emocional primero
    const emotionalResponse = findEmotionalResponse(text);
    if (emotionalResponse) return emotionalResponse;
    
    // 2. Buscar en conocimiento técnico
    const lower = text.toLowerCase();
    for (const [key, data] of Object.entries(technicalKnowledge)) {
        if (!data.keywords) continue;
        
        for (const keyword of data.keywords) {
            if (lower.includes(keyword)) {
                return {
                    text: `**${data.response.title}**\n\n${data.response.content}`,
                    actions: data.response.actions || []
                };
            }
        }
    }
    
    // 3. Respuesta por defecto mejorada
    return {
        text: `Mmm, no estoy seguro de haber entendido. 🤔

Puedo ayudarte con:

**💙 Apoyo emocional:**
• Frustración, ansiedad, tristeza
• Bloqueo creativo, procrastinación
• Motivación y celebración de logros

**🎨 Dudas técnicas:**
• Línea de acción, proporciones, 3 masas
• Anatomía funcional, valores tonales
• Proceso por capas, proyecto final

**📊 Sistema LMS:**
• Ver tu dashboard y progreso
• Evaluaciones y ejercicios
• Navegación del curso

¿Podrías reformular tu pregunta o decirme cómo te sientes?`,
        actions: ['Estoy frustrado/a', 'Tengo duda técnica', 'Ver dashboard', 'Solo conversar']
    };
}

// ========================================
// SISTEMA DE MEMORIA DE CONVERSACIÓN
// ========================================

class ConversationMemory {
    constructor() {
        this.history = [];
        this.emotions = [];
        this.maxHistory = 10;
    }
    
    add(userMsg, botResponse, emotion = null, intensity = null) {
        this.history.push({
            user: userMsg,
            bot: botResponse,
            timestamp: new Date(),
            emotion: emotion,
            intensity: intensity
        });
        
        if (emotion) {
            this.emotions.push({ emotion, intensity, timestamp: new Date() });
        }
        
        // Mantener solo últimos 10 mensajes
        if (this.history.length > this.maxHistory) {
            this.history.shift();
        }
        
        // Mantener solo últimas 20 emociones
        if (this.emotions.length > 20) {
            this.emotions.shift();
        }
    }
    
    getEmotionalPattern() {
        // Analizar últimas 5 emociones
        const recent = this.emotions.slice(-5);
        
        if (recent.length === 0) return null;
        
        // Contar emociones negativas
        const negative = ['frustration', 'anxiety', 'sad', 'overwhelmed', 'cantDraw'];
        const negativeCount = recent.filter(e => negative.includes(e.emotion)).length;
        
        // Si 3+ de las últimas 5 son negativas = patrón preocupante
        if (negativeCount >= 3) {
            return 'persistent_negative';
        }
        
        // Si todas son positivas = en buen momento
        const positive = ['happy', 'proud'];
        const positiveCount = recent.filter(e => positive.includes(e.emotion)).length;
        if (positiveCount === recent.length) {
            return 'positive_flow';
        }
        
        return 'mixed';
    }
    
    shouldOfferBreak() {
        const pattern = this.getEmotionalPattern();
        return pattern === 'persistent_negative';
    }
    
    getContextualGreeting() {
        const pattern = this.getEmotionalPattern();
        const lastEmotion = this.emotions.length > 0 ? this.emotions[this.emotions.length - 1] : null;
        
        if (pattern === 'persistent_negative') {
            return 'Noto que has estado con emociones difíciles. ¿Cómo te sientes ahora? 💙';
        }
        
        if (pattern === 'positive_flow') {
            return '¡Me encanta tu energía positiva! ¿Seguimos con ese impulso? 🌟';
        }
        
        if (lastEmotion && lastEmotion.emotion === 'frustration') {
            return '¿Cómo te fue con aquello que te frustraba? 🤔';
        }
        
        return null;
    }
}

// ========================================
// EXPORTAR PARA USO EN EL MENTOR
// ========================================

window.mentorKnowledge = {
    knowledge,
    technicalKnowledge,
    generateResponse,
    detectIntensity,
    ConversationMemory
};
