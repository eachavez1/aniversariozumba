

///////////////////////////////////////// CAROUSEL DE FOTOS /////////////////////////////////////
let currentSlide = 0;


const imagePaths = [
  "../multimedia/imagenes/galeria/FOTO1.jpg",
  "../multimedia/imagenes/galeria/FOTO2.jpg",
  "../multimedia/imagenes/galeria/FOTO3.jpg",
  "../multimedia/imagenes/galeria/FOTO4.jpg",
  "../multimedia/imagenes/galeria/FOTO5.jpg",
  "../multimedia/imagenes/galeria/FOTO6.jpg",
  "../multimedia/imagenes/galeria/FOTO7.jpg",
  "../multimedia/imagenes/galeria/FOTO8.jpg",
  "../multimedia/imagenes/galeria/FOTO9.jpg",
  "../multimedia/imagenes/galeria/FOTO10.jpg",
  "../multimedia/imagenes/galeria/FOTO11.jpg",
  "../multimedia/imagenes/galeria/FOTO12.jpg",
  "../multimedia/imagenes/galeria/FOTO13.jpg",
  "../multimedia/imagenes/galeria/FOTO14.jpg",
  "../multimedia/imagenes/galeria/FOTO15.jpg",
];

const thumbnailPaths = [
  "../multimedia/imagenes/galeria/FOTO1.jpg",
  "../multimedia/imagenes/galeria/FOTO2.jpg",
  "../multimedia/imagenes/galeria/FOTO3.jpg",
  "../multimedia/imagenes/galeria/FOTO4.jpg",
  "../multimedia/imagenes/galeria/FOTO5.jpg",
  "../multimedia/imagenes/galeria/FOTO6.jpg",
  "../multimedia/imagenes/galeria/FOTO7.jpg",
  "../multimedia/imagenes/galeria/FOTO8.jpg",
  "../multimedia/imagenes/galeria/FOTO9.jpg",
  "../multimedia/imagenes/galeria/FOTO10.jpg",
  "../multimedia/imagenes/galeria/FOTO11.jpg",
  "../multimedia/imagenes/galeria/FOTO12.jpg",
  "../multimedia/imagenes/galeria/FOTO13.jpg",
  "../multimedia/imagenes/galeria/FOTO14.jpg",
  "../multimedia/imagenes/galeria/FOTO15.jpg",
  ];


  function showSlide(index) {
    const mainImage = document.getElementById('mainImage');
    mainImage.src = imagePaths[index];
    currentSlide = index;

    updateThumbnails();
    highlightThumbnail(index);

  }
  
  function updateThumbnails() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumbnail, index) => {
      thumbnail.style.backgroundImage = `url(${thumbnailPaths[index]})`;
    });
  }

  function highlightThumbnail(index) {
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    
    thumbnails.forEach(thumbnail => {
      thumbnail.style.border = '';
    });
  
    // Añade el borde a la miniatura actual
    thumbnails[index].style.border = '3px solid white'; 
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Muestra automáticamente la primera imagen al cargar la página
    showSlide(0);

    updateThumbnails();
  });
  

function nextSlide() {
  if (currentSlide < imagePaths.length - 1) {
    currentSlide++;
    showSlide(currentSlide);
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    showSlide(currentSlide);
  }
}

function changeSlide(index) {
  showSlide(index);
}

function toggleFullscreen() {
  const mainImage = document.getElementById('mainImage');
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    mainImage.requestFullscreen().catch(err => {
      console.error(`Error attempting to enable fullscreen mode: ${err.message}`);
    });
  }
}

document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowRight') {
    nextSlide();
  } else if (event.key === 'ArrowLeft') {
    prevSlide();
  }
});


///////////////////////////////////// CARRITO DE COMPRAS ///////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
  const botonesAgregar = document.querySelectorAll('.agregar-al-carrito');
  const selectoresCantidad = document.querySelectorAll('.selector-cantidad');
  const carritoCantidad = document.getElementById('carrito-cantidad');
  const carritoTotal = document.getElementById('carrito-total');
  const botonComprar = document.getElementById('boton-comprar');
  const carritoDetalles = document.getElementById('carrito-detalles');

  const precios = {
    boleta_vip: 120000,
    boleta_general: 90000,
    boleta_palco: 100000
  };

  const cantidadPorTipo = {};

  selectoresCantidad.forEach(selector => {
    selector.value = 0;
  });

  botonesAgregar.forEach((boton, index) => {
    boton.addEventListener('click', () => {
      const cantidad = parseInt(selectoresCantidad[index].value);
      const tipoBoleta = obtenerTipoBoleta(boton);
      actualizarCarrito(tipoBoleta, cantidad);
    });
  });

  function obtenerTipoBoleta(boton) {
    const tipoBoletaContainer = boton.closest('.producto');
    if (tipoBoletaContainer) {
      return tipoBoletaContainer.classList[1];
    } else {
      return 'boleta_vip';
    }
  }

  function actualizarCarrito(tipoBoleta, cantidad) {
    const cantidadExistente = cantidadPorTipo[tipoBoleta] || 0;
    const cantidadTotal = cantidadExistente + cantidad;
    cantidadPorTipo[tipoBoleta] = cantidadTotal;

    const totalGeneral = Object.values(cantidadPorTipo).reduce((total, cantidad) => total + cantidad, 0);
    carritoCantidad.innerText = totalGeneral;

    const totalDinero = Object.entries(cantidadPorTipo).reduce((total, [tipo, cantidad]) => {
      return total + cantidad * precios[tipo];
    }, 0);

    carritoTotal.innerText = `${totalDinero.toFixed(2)} COP`;

    actualizarDetalleCarrito();

    localStorage.setItem('carritoCantidad', carritoCantidad.innerText);
    localStorage.setItem('carritoTotal', carritoTotal.innerText);
  }

  function actualizarDetalleCarrito() {
    carritoDetalles.innerHTML = '';

    for (const tipoBoleta in cantidadPorTipo) {
      const cantidad = cantidadPorTipo[tipoBoleta];

      if (cantidad > 0) {
        const boletaDetalle = document.createElement('div');
        boletaDetalle.id = `detalle-${tipoBoleta}`;
        boletaDetalle.innerHTML = `Boleta(s) ${tipoBoleta.charAt(7).toUpperCase() + tipoBoleta.slice(8)} Cantidad: ${cantidad} <button class="eliminar-boleta" data-tipo="${tipoBoleta}">Eliminar</button>`;
        carritoDetalles.appendChild(boletaDetalle);

        // Agregar evento para el botón de eliminar
        const botonEliminar = boletaDetalle.querySelector('.eliminar-boleta');
        botonEliminar.addEventListener('click', () => {
          eliminarBoleta(tipoBoleta);
        });
      }
    }

    // Actualizar el total sin decimales
    const totalSinDecimales = Math.floor(parseFloat(carritoTotal.innerText));
    carritoTotal.innerText = `${totalSinDecimales} COP`;
  }

  function eliminarBoleta(tipoBoleta) {
    const elementoEliminar = document.getElementById(`detalle-${tipoBoleta}`);
    elementoEliminar.remove();

    const cantidadEliminada = cantidadPorTipo[tipoBoleta] || 0;
    const totalGeneral = parseInt(carritoCantidad.innerText) - cantidadEliminada;
    carritoCantidad.innerText = totalGeneral;

    const totalDinero = parseFloat(carritoTotal.innerText) - cantidadEliminada * precios[tipoBoleta];
    carritoTotal.innerText = `${totalDinero.toFixed(2)} COP`;

    cantidadPorTipo[tipoBoleta] = 0;

    localStorage.setItem('carritoCantidad', carritoCantidad.innerText);
    localStorage.setItem('carritoTotal', carritoTotal.innerText);
  }

  if (localStorage.getItem('carritoCantidad')) {
    carritoCantidad.innerText = localStorage.getItem('carritoCantidad');
  }

  if (localStorage.getItem('carritoTotal')) {
    carritoTotal.innerText = localStorage.getItem('carritoTotal');
  }

  botonComprar.addEventListener('click', () => {

    localStorage.setItem('carritoDetalles', JSON.stringify(cantidadPorTipo));
    const nuevaPagina = 'prepasarela.html';
    window.location.href = nuevaPagina;

  });

});

////////////////////////////////////// PRE PASARELA ////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
  const carritoDetalles = document.getElementById('carrito-detalles');

  // Obtener la información del carrito del almacenamiento local
  const carritoInfo = localStorage.getItem('carritoDetalles');
  const cantidadPorTipo = carritoInfo ? JSON.parse(carritoInfo) : {};

  // Mostrar la información del carrito en la nueva página
  actualizarDetalleCarrito();

  function actualizarDetalleCarrito() {
      carritoDetalles.innerHTML = '';

      for (const tipoBoleta in cantidadPorTipo) {
          const cantidad = cantidadPorTipo[tipoBoleta];

          if (cantidad > 0) {
              const boletaDetalle = document.createElement('div');
              boletaDetalle.innerHTML = `Boleta(s) ${tipoBoleta.charAt(7).toUpperCase() + tipoBoleta.slice(8)} Cantidad: ${cantidad}`;
              carritoDetalles.appendChild(boletaDetalle);
          }
      }
  }
});


////////////////////////////////////////  LISTA DESPLEGABLE INSTRUCTORES ////////////////////////////////////////

function mostrarOpciones() {
  var fuenteEvento = document.getElementById("fuenteEvento").value;
  var opcionesInstructor = document.getElementById("opcionesInstructor");
  var opcionesRedesSociales = document.getElementById("opcionesRedesSociales");

  opcionesInstructor.classList.add("hidden");
  opcionesRedesSociales.classList.add("hidden");

  if (fuenteEvento === "instructor") {
      opcionesInstructor.classList.remove("hidden");
      // Hacer la lista desplegable obligatoria
      document.getElementById("instructor").setAttribute("required", "required");
      // Remover la obligatoriedad de la otra lista desplegable
      document.getElementById("redSocial").removeAttribute("required");
  } else if (fuenteEvento === "redesSociales") {
      opcionesRedesSociales.classList.remove("hidden");
      // Hacer la lista desplegable obligatoria
      document.getElementById("redSocial").setAttribute("required", "required");
      // Remover la obligatoriedad de la otra lista desplegable
      document.getElementById("instructor").removeAttribute("required");
  } else {
      // Si está oculta, remover la obligatoriedad de ambas listas desplegables
      document.getElementById("instructor").removeAttribute("required");
      document.getElementById("redSocial").removeAttribute("required");
  }
}


// Función para filtrar la lista desplegable según la búsqueda
function filterDropdown() {
  var input, filter, options, option, i, txtValue;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  options = document.querySelectorAll("#filterOptions li");

  options.forEach(function(option) {
    txtValue = option.textContent || option.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      option.style.display = "";
    } else {
      option.style.display = "none";
    }
  });

  // Mostrar la lista desplegable
  document.querySelector('.custom-dropdown').style.display = "block";
}

// Mostrar todas las opciones al hacer clic en el input
document.getElementById("searchInput").addEventListener("focus", function() {
  var options = document.querySelectorAll("#filterOptions li");
  options.forEach(function(option) {
    option.style.display = "";
  });

  // Mostrar la lista desplegable
  document.querySelector('.custom-dropdown').style.display = "block";
});

// Seleccionar opción al hacer clic en un elemento de la lista
document.getElementById("filterOptions").addEventListener("click", function(event) {
  var selectedValue = event.target.dataset.value;
  if (selectedValue) {
    // Ocultar la opción seleccionada
    event.target.style.display = "none";

    // Agregar la opción al campo de entrada
    var input = document.getElementById("searchInput");
    input.value = selectedValue;

    // Ocultar la lista desplegable
    document.querySelector('.custom-dropdown').style.display = "none";
  }
});

// Controlador de clics en el documento para cerrar la lista desplegable
document.addEventListener('click', function(event) {
  var dropdownContainer = document.querySelector('.custom-dropdown');
  var searchInput = document.getElementById('searchInput');

  // Si el clic no está dentro del contenedor de la lista desplegable o del input
  if (!dropdownContainer.contains(event.target) && event.target !== searchInput) {
    // Ocultar la lista desplegable
    dropdownContainer.style.display = 'none';
  }
});

// Asociar la función de filtrado al evento de entrada de búsqueda
document.getElementById("searchInput").addEventListener("input", filterDropdown);



////////////////////////////////////// PAGINA DEL QR //////////////////////////////////////////


document.getElementById('ir_a_pagar').addEventListener('click', function() {
 
  window.location.href = 'qr.html';
});