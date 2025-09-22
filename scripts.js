// ⚠️ Usa tu API Key real de Gemini aquí
const API_KEY = "AIzaSyAJSqzAjAD2d6hG4qiMaNMHJWNi9tjcMN0";

const url =
  "https://cors-anywhere.herokuapp.com/https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent?key=" +
  API_KEY;

const response = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-requested-with": "XMLHttpRequest" // a veces ayuda
  },
  body: JSON.stringify({
    contents: [{ parts: [{ text: promptUsuario }] }],
  }),
});



const form = document.getElementById("promptForm");
const boton = form.querySelector("button");
const output = document.getElementById("output");
const loading = document.getElementById("loading");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Tomar datos del formulario
  const producto = document.getElementById("producto").value;
  const descripcion = document.getElementById("descripcion").value;

  // Prompt para Gemini
  const promptUsuario = `Genera un prompt optimizado para crear una imagen de ${producto}. 
La descripción es: ${descripcion}. 
Incluye detalles de estilo, paleta de colores, iluminación y composición, en inglés, listo para un generador de imágenes IA.`;

  try {
    // Mostrar feedback al usuario
    boton.disabled = true;
    boton.textContent = "Generando...";
    loading.style.display = "block";
    output.textContent = "";

    // Llamada a la API de Gemini
 const response = await fetch("http://localhost:3000/api/gemini", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    contents: [{ parts: [{ text: promptUsuario }] }],
  }),
});


    const data = await response.json();
    console.log("Respuesta de Gemini:", data);

    if (data.candidates && data.candidates.length > 0) {
      const textoGenerado = data.candidates[0].content.parts[0].text;

      // Mostrar resultado
      output.textContent = textoGenerado;

      // Efecto visual
      output.classList.add("updated");
      setTimeout(() => output.classList.remove("updated"), 1000);
    } else {
      output.textContent = "No se recibió respuesta de Gemini.";
    }
  } catch (error) {
    console.error("Error con Gemini:", error);
    output.textContent = "❌ Error al conectar con Gemini.";
  } finally {
    // Resetear interfaz
    boton.disabled = false;
    boton.textContent = "Generar con Gemini";
    loading.style.display = "none";
  }
});
