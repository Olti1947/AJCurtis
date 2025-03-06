document.addEventListener('DOMContentLoaded', function () {
    const searchBtn = document.getElementById('search-btn');
    const searchBar = document.getElementById('search-bar');

    // Mostrar/ocultar barra de búsqueda
    searchBtn.addEventListener('click', function () {
        searchBar.classList.toggle('visible');
    });

    // Cerrar la barra de búsqueda si se hace clic fuera de ella
    document.addEventListener('click', function (event) {
        if (!searchBtn.contains(event.target) && !searchBar.contains(event.target)) {
            searchBar.classList.remove('visible');
        }
    });

    // Funcionalidad para el carrito
    const cartBtn = document.getElementById('cart-btn');
    cartBtn.addEventListener('click', function () {
        alert('Carrito de compras: Aquí puedes mostrar los productos agregados.');
    });

    // Funcionalidad para el usuario
    const userBtn = document.getElementById('user-btn');
    userBtn.addEventListener('click', function () {
        alert('Usuario: Aquí puedes redirigir al inicio de sesión o registro.');
    });

    // Carrusel de imágenes
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    function showNextImage() {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    setInterval(showNextImage, 6000); // Cambia la imagen cada 6 segundos

    // Toggle navbar visibility on small screens
    const menuToggle = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar");

    menuToggle.addEventListener("click", function () {
        if (navbar.style.display === "none" || navbar.style.display === "") {
            navbar.style.display = "flex";
        } else {
            navbar.style.display = "none";
        }
    });

    // Ensure the navbar is correctly shown/hidden on load and resize
    function checkScreenSize() {
        if (window.innerWidth > 900) {
            navbar.style.display = "flex"; // Show navbar normally on larger screens
        } else {
            navbar.style.display = "none"; // Hide by default on small screens
        }
    }

    window.addEventListener("resize", checkScreenSize);
    checkScreenSize(); // Ensure the navbar is correctly shown/hidden on load
});