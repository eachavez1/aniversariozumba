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
    
    // Restablece el borde en todas las miniaturas
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
