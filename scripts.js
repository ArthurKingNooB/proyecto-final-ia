
document.addEventListener('DOMContentLoaded', () => {
 
    const GEMINI_API_KEY = "AIzaSyAJSqzAjAD2d6hG4qiMaNMHJWNi9tjcMN0"; // 

    // === Referencias a elementos del DOM ===
    const ideaTypeSelect = document.getElementById('ideaType');
    const generateIdeaBtn = document.getElementById('generateIdeaBtn');
    const textIdeaDiv = document.getElementById('textIdea');
    const imageResultDiv = document.getElementById('imageResult');
    const scrollToGeneratorBtn = document.getElementById('scrollToGenerator');
    const generatorSection = document.getElementById('generator-section');
    const errorMessageDiv = document.getElementById('errorMessage');

   
    const simulatedGeminiResponses = {
        personaje: [
            {
                text: "Un elfo silvestre, de piel teñida de musgo y cabellos de hojas otoñales. Sus ojos, dos esmeraldas líquidas, observan el bosque con una sabiduría milenaria. Viste una armadura ligera de corteza endurecida y porta un arco de vid flexible. Es un protector silencioso de los secretos del bosque, con un toque melancólico y noble.",
                image_prompt: "Ilustración digital fotorrealista de un elfo silvestre, piel verdosa cubierta de musgo, cabello largo y enredado como hojas otoñales. Ojos esmeralda profundos con una mirada triste. Viste armadura de corteza y cuero con grabados rúnicos sutiles. Porta un arco largo y elegante hecho de vid. Ambiente de bosque antiguo y brumoso al atardecer. Estilo fantástico, alta resolución, detallado.",
                imageUrl: "assets/personaje-magico-1.jpg" 
            },
            {
                text: "Una hechicera gélida, con piel pálida como la nieve y cabellos largos de hielo que tintinean al moverse. Sus ojos son dos zafiros que emiten un frío resplandor. Porta un báculo retorcido con una gema azul brillante. Es solitaria, pero su poder sobre el invierno es inigualable y a menudo ayuda a aquellos que se pierden en las tormentas.",
                image_prompt: "Retrato fotorrealista de una hechicera de hielo, piel muy pálida, cabello de hielo brillante, ojos zafiro. Vestimenta invernal mágica, báculo con gema azul. Fondo de paisaje nevado y tormentoso, cristales de hielo flotando. Detalle, alta fantasía.",
                imageUrl: "https://source.unsplash.com/400x300/?ice-sorceress,fantasy"
            },
            {
                text: "Un caballero dragonborn, con escamas de color bronce pulido y cuernos imponentes. Su armadura forjada con escamas de dragón caídas refleja el sol. Es honorable y valiente, pero a veces su temperamento dracónico lo traiciona. Su misión es proteger a los inocentes del antiguo mal.",
                image_prompt: "Ilustración digital de un caballero dragonborn, escamas de bronce, cuernos grandes, armadura de escamas. Postura heroica, fondo de castillo medieval y montañas. Estilo épico de fantasía, colores vibrantes.",
                imageUrl: "https://source.unsplash.com/400x300/?dragonborn-knight,fantasy"
            }
        ],
        lugar: [
            {
                text: "El Bosque Susurrante, un antiguo y mágico bosque donde los árboles son tan altos que sus copas apenas dejan pasar la luz. Antiguas runas brillan débilmente en los troncos, y un río de agua cristalina atraviesa el corazón del bosque, cuyas aguas curan cualquier herida. Una atmósfera etérea y misteriosa lo envuelve.",
                image_prompt: "Paisaje fotorrealista de un antiguo bosque mágico, llamado 'El Bosque Susurrante'. Árboles gigantescos con copas que forman un dosel casi impenetrable. Rayos de luz dorada filtrándose entre las hojas. Un río de aguas cristalinas serpentea a través de musgo brillante y flores bioluminiscentes. Antiguas runas talladas en los troncos de los árboles, emitiendo un resplandor suave. Atmósfera etérea y misteriosa, niebla ligera.",
                imageUrl: "assets/lugar-fantastico-1.jpg"
            },
            {
                text: "La Ciudad Flotante de Aethelgard, una metrópolis de mármol blanco y oro que desafía la gravedad, sostenida por cristales mágicos. Calles de aire puro y puentes de luz conectan sus distritos. Hogar de magos y eruditos, es un bastión de conocimiento y poder arcano, siempre bañada por una luz celestial.",
                image_prompt: "Concept art digital de una ciudad flotante futurista-fantástica, arquitectura de mármol y oro, cristales mágicos sosteniéndola en el cielo. Nubes y cielo azul claro. Estilo épico, alta resolución.",
                imageUrl: "https://source.unsplash.com/400x300/?floating-city,fantasy"
            },
            {
                text: "Las Catacumbas Olvidadas, un laberinto subterráneo bajo una antigua capital, repleto de tumbas de reyes olvidados y pasajes secretos. Telarañas gigantes y hongos bioluminiscentes iluminan el camino. Se dice que hay tesoros incalculables y peligros ancestrales esperando a ser descubiertos en sus profundidades silenciosas.",
                image_prompt: "Fotografía atmosférica de catacumbas subterráneas, pasajes oscuros, tumbas antiguas, telarañas, hongos bioluminiscentes. Ambiente misterioso y un poco tenebroso, luces bajas.",
                imageUrl: "https://source.unsplash.com/400x300/?fantasy-catacombs,dungeon"
            }
        ],
        objeto: [
            {
                text: "El Amuleto del Tiempo Detenido, un medallón de obsidiana con incrustaciones de polvo de estrellas. Al activarlo, el tiempo en una pequeña esfera alrededor del portador se ralentiza drásticamente, dándole una ventaja fugaz en combate o permitiéndole observar eventos con gran detalle. Su origen es un misterio ancestral.",
                image_prompt: "Representación fotorrealista de un medallón de obsidiana pulida, con incrustaciones de diminutas partículas que brillan como polvo de estrellas. Tiene una cadena de plata envejecida y un sutil aura de energía púrpura. El diseño es antiguo y místico. Enfoque cercano, fondo oscuro y difuminado.",
                imageUrl: "assets/objeto-fantastico-1.jpg"
            },
            {
                text: "La Espada Luminiscente de Eldoria, una hoja larga y delgada forjada con metal estelar, que brilla con una luz azul suave. Al desenvainarla, emite un canto etéreo que desorienta a los enemigos. Se dice que fue empuñada por la primera reina de los elfos para repeler la oscuridad.",
                image_prompt: "Espada larga luminiscente, hoja de metal estelar con brillo azul, empuñadura élfica detallada. Flotando sobre un fondo oscuro, con un leve aura mágica.",
                imageUrl: "https://source.unsplash.com/400x300/?glowing-sword,fantasy"
            },
            {
                text: "Los Grilletes del Vínculo Arcana, un par de brazaletes de hierro rústico que, cuando se usan, crean una conexión empática inquebrantable entre dos individuos, permitiéndoles compartir pensamientos y emociones a distancia. Forjados para unir a los magos en tiempos de guerra, son difíciles de romper sin un gran coste.",
                image_prompt: "Un par de brazaletes rústicos de hierro antiguo, conectados por una tenue energía mágica azul. Detalles arcanos grabados. Fondo oscuro y etéreo.",
                imageUrl: "https://source.unsplash.com/400x300/?magic-bracelets,fantasy"
            }
        ]
    };

    // Almacena el índice de la última idea mostrada para cada tipo, para evitar repeticiones inmediatas
    const lastIndexes = {
        personaje: -1,
        lugar: -1,
        objeto: -1
    };

    /** 
     * @param {string} type - El tipo de idea (personaje, lugar, objeto).
     * @returns {number} - El índice de la idea seleccionada.
     */
    function getRandomIdeaIndex(type) {
        const availableIdeas = simulatedGeminiResponses[type];
        if (!availableIdeas || availableIdeas.length === 0) return -1; 

        let randomIndex = Math.floor(Math.random() * availableIdeas.length);

    
        if (availableIdeas.length > 1) {
            while (randomIndex === lastIndexes[type]) {
                randomIndex = Math.floor(Math.random() * availableIdeas.length);
            }
        }
        lastIndexes[type] = randomIndex; 
        return randomIndex;
    }

    /**
     * SIMULACIÓN de la interacción con la API de Gemini.
         * @param {string} type - El tipo de idea a generar (personaje, lugar, objeto).
     * @returns {Promise<object>} - Una promesa que resuelve a un objeto { text, imageUrl } o rechaza con un error.
     */
    async function callGeminiApiSimulated(type) {
       
        const delay = Math.random() * 1500 + 800; // Entre 800ms y 2300ms
        await new Promise(resolve => setTimeout(resolve, delay));

        // Simular un posible error de API
        if (Math.random() < 0.15) { // 15% de probabilidad de error simulado
            throw new Error("Error simulado de la API de Gemini: No se pudo generar la idea.");
        }

        const index = getRandomIdeaIndex(type);
        if (index === -1) {
            throw new Error("No hay ideas disponibles para este tipo.");
        }
        return simulatedGeminiResponses[type][index];
        
    }

    /**
   
     * @param {object} idea 
     */
    function updateResults(idea) {
        // Ocultar mensaje de error si estaba visible
        errorMessageDiv.style.display = 'none';

        // Animación para el texto
        textIdeaDiv.style.opacity = '0';
        textIdeaDiv.style.transform = 'translateY(10px)';
        setTimeout(() => {
            textIdeaDiv.innerHTML = `<p>${idea.text}</p>`;
            textIdeaDiv.style.opacity = '1';
            textIdeaDiv.style.transform = 'translateY(0)';
        }, 300); // Coincide con la duración de la transición CSS

        // Animación para la imagen
        const existingImage = imageResultDiv.querySelector('img');
        if (existingImage) {
            existingImage.style.opacity = '0';
            setTimeout(() => {
                existingImage.remove(); // Elimina la imagen antigua después de la transición
                loadImage(idea.imageUrl);
            }, 300);
        } else {
            loadImage(idea.imageUrl);
        }
    }

    /**
     * Carga y muestra una nueva imagen.
     * @param {string} imageUrl - La URL de la imagen a cargar.
     */
    function loadImage(imageUrl) {
        const newImage = new Image();
        newImage.src = imageUrl;
        newImage.alt = "Imagen generada por IA"; // Alt text para accesibilidad
        newImage.style.display = 'block'; // Asegura que la imagen sea visible
        newImage.style.opacity = '0'; // Inicialmente oculta para la transición

        newImage.onload = () => {
            imageResultDiv.innerHTML = ''; // Limpia el contenedor antes de añadir
            imageResultDiv.appendChild(newImage);
                  setTimeout(() => {
                newImage.style.opacity = '1';
            }, 50);
        };
        newImage.onerror = () => {
            console.error("Error al cargar la imagen:", imageUrl);
            imageResultDiv.innerHTML = '<p class="error-message">Error al cargar la imagen. Intenta de nuevo o verifica la URL.</p>';
        };
    }


    generateIdeaBtn.addEventListener('click', async () => {
        const selectedType = ideaTypeSelect.value;

    
        generateIdeaBtn.textContent = 'Cargando...';
        generateIdeaBtn.disabled = true;
        textIdeaDiv.innerHTML = '<p>Generando tu idea...</p>';
        imageResultDiv.innerHTML = '<img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTlwMXA1ZzN3NWQ2NmQ1N2NqMDF3NzFhM2d3d3FzN2ZmbWpsNmwwaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/l0EtXp5k2w26P6xQk/giphy.gif" alt="Cargando..." style="max-width: 100px; height: auto; display: block; margin: 0 auto; opacity: 1;">'; // GIF de carga

        try {
          
            const result = await callGeminiApiSimulated(selectedType);
            updateResults(result); 
        } catch (error) {
            console.error("Fallo al generar la idea:", error);
            errorMessageDiv.querySelector('p').textContent = error.message || "Ocurrió un error al generar la idea. Por favor, inténtalo de nuevo más tarde.";
            errorMessageDiv.style.display = 'block';
            textIdeaDiv.innerHTML = '<p>No se pudo generar la idea. Por favor, intenta de nuevo.</p>';
            imageResultDiv.innerHTML = ''; 
        } finally {
            // Restaurar el botón
            generateIdeaBtn.textContent = 'Generar Idea';
            generateIdeaBtn.disabled = false;
        }
    });

    
    scrollToGeneratorBtn.addEventListener('click', () => {
        generatorSection.scrollIntoView({ behavior: 'smooth' });
    });


    textIdeaDiv.innerHTML = '<p>Haz clic en "Generar Idea" para ver tu primera creación.</p>';
    imageResultDiv.innerHTML = '';
});