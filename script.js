// Configuración del menú móvil
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    const abierto = menu.classList.toggle("abierto");
    menuToggle.setAttribute("aria-expanded", String(abierto));
    menuToggle.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
    menuToggle.innerHTML = abierto
      ? '<span class="icono-menu">✕</span> Cerrar'
      : '<span class="icono-menu">☰</span> Menú';
  });

  menu.querySelectorAll("a").forEach((enlace) => {
    enlace.addEventListener("click", () => {
      menu.classList.remove("abierto");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
      menuToggle.innerHTML = '<span class="icono-menu">☰</span> Menú';
    });
  });
}

// Buscador de información
const formularioBusqueda = document.getElementById("formBusqueda");
const entradaBusqueda = document.getElementById("buscar");
const mensajeBusqueda = document.getElementById("mensajeBusqueda");
const elementosBuscables = document.querySelectorAll(".buscable");

function realizarBusqueda() {
  const consulta = entradaBusqueda.value.trim().toLocaleLowerCase("es");
  let resultados = 0;

  if (!consulta) {
    elementosBuscables.forEach((elemento) => {
      elemento.classList.remove("oculto");
      if (elemento.classList.contains("faq-item")) elemento.classList.remove("activo");
    });
    mensajeBusqueda.textContent = "";
    return;
  }

  elementosBuscables.forEach((elemento) => {
    const texto = (elemento.innerText + " " + (elemento.dataset.palabras || "")).toLocaleLowerCase("es");
    const coincide = texto.includes(consulta);
    elemento.classList.toggle("oculto", !coincide);
    if (elemento.classList.contains("faq-item")) elemento.classList.toggle("activo", coincide);
    if (coincide) resultados++;
  });

  mensajeBusqueda.textContent = resultados
    ? `Se encontraron ${resultados} resultado(s).`
    : "No hay coincidencias. Prueba con trámites, documentos, servicios u horarios.";
}

if (formularioBusqueda && entradaBusqueda && mensajeBusqueda) {
  formularioBusqueda.addEventListener("submit", (evento) => {
    evento.preventDefault();
    realizarBusqueda();
  });
  entradaBusqueda.addEventListener("input", realizarBusqueda);
}

// Acordeón de preguntas frecuentes
document.querySelectorAll(".faq-pregunta").forEach((pregunta) => {
  pregunta.addEventListener("click", function () {
    const item = this.parentElement;
    const estabaActivo = item.classList.contains("activo");
    document.querySelectorAll(".faq-item").forEach((otro) => otro.classList.remove("activo"));
    if (!estabaActivo) item.classList.add("activo");
  });
});

// FORMULARIO DE CONTACTO: envío real usando EmailJS.
// 1) Crea una cuenta en https://www.emailjs.com/
// 2) Conecta tu servicio de correo y crea una plantilla.
// 3) Sustituye los tres valores de abajo por los de tu cuenta.
const EMAILJS_SERVICE_ID = "TU_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "TU_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "TU_PUBLIC_KEY";

const formContacto = document.getElementById("formContacto");
const mensajeExito = document.getElementById("mensajeExito");

if (formContacto && mensajeExito) {
  formContacto.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const boton = formContacto.querySelector('button[type="submit"]');
    const textoOriginal = boton.textContent;

    mensajeExito.textContent = "";
    mensajeExito.className = "mensaje-exito oculto";

    if (
      EMAILJS_SERVICE_ID === "hasielmartinez9@gmail.com" ||
      EMAILJS_TEMPLATE_ID === "hasielmartinez9@gmail.com" ||
      EMAILJS_PUBLIC_KEY === "hasielmartinez9@gmail.com"
    ) {
      mensajeExito.textContent = "Falta configurar EmailJS. Agrega tu Service ID, Template ID y Public Key en script.js.";
      mensajeExito.className = "mensaje-exito error";
      return;
    }

    if (!window.emailjs) {
      mensajeExito.textContent = "No se pudo cargar el servicio de correo. Revisa tu conexión e inténtalo de nuevo.";
      mensajeExito.className = "mensaje-exito error";
      return;
    }

    boton.disabled = true;
    boton.textContent = "Enviando...";

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formContacto,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      mensajeExito.textContent = "¡Mensaje enviado correctamente! Gracias por contactarnos.";
      mensajeExito.className = "mensaje-exito exito";
      formContacto.reset();
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      mensajeExito.textContent = "No se pudo enviar el mensaje. Revisa la configuración de EmailJS e inténtalo nuevamente.";
      mensajeExito.className = "mensaje-exito error";
    } finally {
      boton.disabled = false;
      boton.textContent = textoOriginal;
    }
  });
}
