// 1. Menú móvil
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

if (menuToggle && menu) {
  menuToggle.addEventListener("click", function () {
    const abierto = menu.classList.toggle("abierto");
    menuToggle.setAttribute("aria-expanded", String(abierto));
    menuToggle.innerHTML = abierto ? '<span class="icono-menu">✕</span> Cerrar' : '<span class="icono-menu">☰</span> Menú';
  });

  menu.querySelectorAll("a").forEach(function (enlace) {
    enlace.addEventListener("click", function () {
      menu.classList.remove("abierto");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.innerHTML = '<span class="icono-menu">☰</span> Menú';
    });
  });
}

// 2. Buscador en tiempo real
const formulario = document.getElementById("formBusqueda");
const entrada = document.getElementById("buscar");
const mensaje = document.getElementById("mensajeBusqueda");
const elementos = document.querySelectorAll(".buscable");

if (formulario && entrada && mensaje) {
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    realizarBusqueda();
  });

  entrada.addEventListener("input", function () {
    if (!entrada.value.trim()) {
      elementos.forEach(function (elemento) {
        elemento.classList.remove("oculto");
        // Si es un item de FAQ, también quitar la clase activo
        if(elemento.classList.contains('faq-item')) {
            elemento.classList.remove("activo");
        }
      });
      mensaje.textContent = "";
    } else {
      realizarBusqueda();
    }
  });

  function realizarBusqueda() {
    const consulta = entrada.value.trim().toLocaleLowerCase("es");
    let resultados = 0;

    if (!consulta) {
      mensaje.textContent = "Escribe una palabra para buscar.";
      return;
    }

    elementos.forEach(function (elemento) {
      const texto = (
        elemento.innerText + " " +
        (elemento.dataset.palabras || "")
      ).toLocaleLowerCase("es");

      const coincide = texto.includes(consulta);
      elemento.classList.toggle("oculto", !coincide);

      if (coincide) {
        resultados++;
        // Si es un item de FAQ y coincide, abrirlo automáticamente
        if (elemento.classList.contains('faq-item')) {
            elemento.classList.add("activo");
        }
      } else {
        if (elemento.classList.contains('faq-item')) {
            elemento.classList.remove("activo");
        }
      }
    });

    if (resultados > 0) {
      mensaje.textContent = "Se encontraron " + resultados + " resultado(s).";
    } else {
      mensaje.textContent = "No hay coincidencias. Prueba con trámites, documentos, servicios u horarios.";
    }
  }
}

// 3. Acordeón de Preguntas Frecuentes (FAQ)
const faqPreguntas = document.querySelectorAll(".faq-pregunta");

faqPreguntas.forEach(function (pregunta) {
  pregunta.addEventListener("click", function () {
    const item = this.parentElement;
    const estaActivo = item.classList.contains("activo");

    // Cerrar todos los demás
    document.querySelectorAll(".faq-item").forEach(function (otroItem) {
      otroItem.classList.remove("activo");
    });

    // Si no estaba activo, abrirlo
    if (!estaActivo) {
      item.classList.add("activo");
    }
  });
});

// 4. Validación y envío simulado del formulario de contacto
const formContacto = document.getElementById("formContacto");
const mensajeExito = document.getElementById("mensajeExito");

if (formContacto) {
  formContacto.addEventListener("submit", function (evento) {
    evento.preventDefault();
    
    // Simular envío
    const boton = formContacto.querySelector("button");
    const textoOriginal = boton.textContent;
    
    boton.textContent = "Enviando...";
    boton.disabled = true;

    setTimeout(function () {
      formContacto.reset();
      boton.textContent = textoOriginal;
      boton.disabled = false;
      mensajeExito.classList.remove("oculto");
      
      // Ocultar el mensaje después de 5 segundos
      setTimeout(function () {
        mensajeExito.classList.add("oculto");
      }, 5000);
    }, 1500);
  });
}