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

// Mobile Menu Functionality
const menuIcon = document.querySelector('.menu-icon');
const navbar = document.querySelector('.navbar ul');
const body = document.querySelector('body');

// Toggle menu on icon click
menuIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    navbar.classList.toggle('active');
    body.classList.toggle('no-scroll');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
        navbar.classList.remove('active');
        body.classList.remove('no-scroll');
    }
});

// Close menu when resizing to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navbar.classList.remove('active');
        body.classList.remove('no-scroll');
    }
});

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

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Ensure menu is hidden on load for mobile
    if (window.innerWidth <= 768) {
        navbar.classList.remove('active');
        body.classList.remove('no-scroll');
    }

    generarReseñas();

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
});
