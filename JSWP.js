document.addEventListener("DOMContentLoaded", function () {
  // Search bar functionality
  const searchBtn = document.getElementById("search-btn");
  const searchBar = document.getElementById("search-bar");

  searchBtn.addEventListener("click", function () {
    searchBar.classList.toggle("visible");
  });

  document.addEventListener("click", function (event) {
    if (
      !searchBtn.contains(event.target) &&
      !searchBar.contains(event.target)
    ) {
      searchBar.classList.remove("visible");
    }
  });

  // Cart functionality
  const cartBtn = document.getElementById("cart-btn");
  cartBtn.addEventListener("click", function () {
    alert("Shopping Cart: Here you can display the added products.");
  });

  // User functionality
  const userBtn = document.getElementById("user-btn");
  userBtn.addEventListener("click", function () {
    alert("User: Here you can redirect to login or registration.");
  });

  // Image carousel
  const carouselInner = document.querySelector(".carousel-inner");
  const carouselItems = document.querySelectorAll(".carousel-item");
  let currentIndex = 0;

  function showNextImage() {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  setInterval(showNextImage, 6000); // Change image every 6 seconds

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

  // Hide navbar on scroll down
  let lastScrollY = window.scrollY; // Save the last scroll position

  function handleScroll() {
    if (window.scrollY > lastScrollY) {
      // Scrolling down
      navbar.classList.add("navbar-hidden"); // Hide the navigation bar
    } else {
      // Scrolling up
      navbar.classList.remove("navbar-hidden"); // Show the navigation bar
    }

    lastScrollY = window.scrollY; // Update the last scroll position
  }

  window.addEventListener("scroll", handleScroll);
});

// Quantity selector functionality
document.addEventListener("DOMContentLoaded", function() {
  const minusBtn = document.querySelector('.quantity-btn:first-child');
  const plusBtn = document.querySelector('.quantity-btn:last-child');
  const quantityDisplay = document.querySelector('.quantity');

  let quantity = 1;

  // Update quantity display
  function updateQuantity() {
    quantityDisplay.textContent = quantity;
  }

  // Minus button click handler
  minusBtn.addEventListener('click', function() {
    if (quantity > 1) {
      quantity--;
      updateQuantity();
    }
  });

  // Plus button click handler
  plusBtn.addEventListener('click', function() {
    quantity++;
    updateQuantity();
  });

  // Size selection functionality
  const sizeOptions = document.querySelectorAll('.size-option');
  sizeOptions.forEach(option => {
    option.addEventListener('click', function() {
      // Remove active class from all options
      sizeOptions.forEach(opt => opt.classList.remove('active'));
      // Add active class to clicked option
      this.classList.add('active');
    });
  });
});