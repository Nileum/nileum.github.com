console.log("Archivo script.js cargado correctamente");


// Datos de reseñas
const reseñas = [
    {
        id: 1,
        autor: "María G.",
        calificacion: 5,
        producto: "Camiseta Gótica",
        texto: "¡Me encanta esta camiseta! El diseño es increíble y la calidad es excelente."
    },
    // Más reseñas...
];


function generarReseñas() {
    const reseñasContainer = document.querySelector('.reseñas-container');
    reseñasContainer.innerHTML = reseñas.map(reseña => `
        <div class="reseña">
            <div class="reseña-header">
                <div class="reseña-autor">${reseña.autor}</div>
                <div class="reseña-calificacion">${'★'.repeat(reseña.calificacion)}${'☆'.repeat(5 - reseña.calificacion)}</div>
            </div>
            <div class="reseña-producto">${reseña.producto}</div>
            <div class="reseña-texto">${reseña.texto}</div>
        </div>
    `).join('');
}


// Funcionalidad del carrusel
let currentSlide = 0;
let autoSlideInterval;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    const slides = document.querySelectorAll('.carousel-item');
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    const slides = document.querySelectorAll('.carousel-item');
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000); // Cambia de slide cada 5 segundos
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

function generarReseñas() {
    const reseñasContainer = document.querySelector('.reseñas-container');
    reseñasContainer.innerHTML = reseñas.map(reseña => `
        <div class="reseña">
            <div class="reseña-header">
                <div class="reseña-autor">${reseña.autor}</div>
                <div class="reseña-calificacion">${'★'.repeat(reseña.calificacion)}${'☆'.repeat(5 - reseña.calificacion)}</div>
            </div>
            <div class="reseña-producto">${reseña.producto}</div>
            <div class="reseña-texto">${reseña.texto}</div>
        </div>
    `).join('');
}

// Filtrado de productos
function filtrarProductos(categoria) {
    const productos = document.querySelectorAll('.producto');
    productos.forEach(producto => {
        if (categoria === 'todos' || producto.dataset.categoria === categoria) {
            producto.style.display = 'block';
        } else {
            producto.style.display = 'none';
        }
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    generarReseñas();

    // Configurar menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.navbar ul');
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Configurar carrusel
    const nextButton = document.querySelector('.carousel-control.next');
    const prevButton = document.querySelector('.carousel-control.prev');

    nextButton.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });
    prevButton.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });
    
    // Configurar filtros
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    filtroBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filtroBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filtrarProductos(btn.dataset.categoria);
        });
    });

    // Iniciar carrusel automático
    startAutoSlide();
    // Mostrar primer slide
    showSlide(0);

    // Cerrar menú al hacer clic fuera en móviles
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !e.target.closest('.navbar') && 
            !e.target.closest('.menu-toggle')) {
            navMenu.classList.remove('active');
        }
    });

    // Ajustar menú al cambiar tamaño de ventana
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
        }
    });
   
});

document.addEventListener('DOMContentLoaded', () => {
    console.log("JavaScript cargado y DOM listo");

    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeBtn = document.querySelector('.close-btn');

    // Abrir modal al hacer clic en la imagen de un producto
    document.querySelectorAll('.producto img').forEach(productoImg => {
        productoImg.addEventListener('click', function() {
            console.log("Producto clicado:", this); // Esto mostrará en consola cuando se haga clic en una imagen
            const producto = this.closest('.producto');
            const title = producto.querySelector('h3').textContent;
            const description = producto.querySelector('p').textContent;
            const imageSrc = this.src;

            modalImg.src = imageSrc;
            modalTitle.textContent = title;
            modalDescription.textContent = description;

            modal.style.display = 'flex'; // Mostrar el modal
        });
    });

    // Cerrar modal al hacer clic en el botón "Cerrar"
    closeBtn.addEventListener('click', () => {
        console.log("Cerrar modal"); // Mensaje para ver si se dispara el evento de cerrar
        modal.style.display = 'none';
    });

    // Cerrar modal al hacer clic fuera del contenido
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            console.log("Cerrar modal desde fuera del contenido"); // Mensaje para ver si detecta clic fuera del contenido
            modal.style.display = 'none';
        }
    });
});
