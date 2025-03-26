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

  function updateQuantity() {
    quantityDisplay.textContent = quantity;
  }

  if (minusBtn && plusBtn && quantityDisplay) {
    minusBtn.addEventListener('click', function() {
      if (quantity > 1) {
        quantity--;
        updateQuantity();
      }
    });

    plusBtn.addEventListener('click', function() {
      quantity++;
      updateQuantity();
    });
  }

  // Size selection and price update functionality
  const sizeOptions = document.querySelectorAll('.size-option');
  sizeOptions.forEach(option => {
    option.addEventListener('click', function() {
      // Remove active class from all options
      sizeOptions.forEach(opt => opt.classList.remove('active'));
      // Add active class to clicked option
      this.classList.add('active');
      
      // Update price
      const newPrice = this.getAttribute('data-price');
      document.getElementById('current-price').textContent = newPrice;
    });
  });

  // Set default selected size (50x70 cm)
  const defaultSize = document.querySelector('.size-option[data-price="111.00"]');
  if (defaultSize) {
    defaultSize.classList.add('active');
  }

  // Related products add to cart functionality
  document.querySelectorAll('.product-card .add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const productName = this.closest('.product-card').querySelector('h3').textContent;
      const productPrice = this.closest('.product-card').querySelector('.price').textContent;
      alert(`Added ${productName} (${productPrice}) to cart`);
    });
  });
});

// Products page functionality
document.addEventListener("DOMContentLoaded", function() {

  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category') || 'all';
  
  // Initialize page
  if (document.querySelector('.products-grid')) {
    // Set initial category filter
    document.getElementById('category-select').value = categoryParam;
    
    // Render products
    renderProducts(filterProducts(products, categoryParam));
    
    // Add event listeners
    document.getElementById('category-select').addEventListener('change', function() {
      const category = this.value;
      renderProducts(filterProducts(products, category));
    });
    
    document.getElementById('sort-select').addEventListener('change', function() {
      const sortBy = this.value;
      const currentCategory = document.getElementById('category-select').value;
      const filteredProducts = filterProducts(products, currentCategory);
      renderProducts(sortProducts(filteredProducts, sortBy));
    });
  }
  
  // Filter products by category
  function filterProducts(products, category) {
    if (category === 'all') return products;
    return products.filter(product => product.category === category);
  }
  
  // Sort products
  function sortProducts(products, sortBy) {
    switch(sortBy) {
      case 'featured':
        return products.sort((a, b) => a.id - b.id);
      case 'best-selling':
        // In a real app, you'd sort by sales data
        return products.sort((a, b) => b.id - a.id);
      case 'a-z':
        return products.sort((a, b) => a.title.localeCompare(b.title));
      case 'z-a':
        return products.sort((a, b) => b.title.localeCompare(a.title));
      case 'low-high':
        return products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      case 'high-low':
        return products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      case 'old-new':
        return products.sort((a, b) => a.id - b.id);
      case 'new-old':
        return products.sort((a, b) => b.id - a.id);
      default:
        return products;
    }
  }
  
  // Render products to the grid
  function renderProducts(products) {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = '';
    
    if (products.length === 0) {
      productsGrid.innerHTML = '<p class="no-products">No products found in this category.</p>';
      return;
    }
    
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <div class="product-info">
          <h3 class="product-title">${product.title}</h3>
          <p class="product-price">$${product.price}</p>
          <button class="add-to-cart-btn">Add to Cart</button>
        </div>
      `;
      productsGrid.appendChild(productCard);
    });
    
    // Add event listeners to add-to-cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const productTitle = this.closest('.product-card').querySelector('.product-title').textContent;
        alert(`Added ${productTitle} to cart`);
      });
    });
  }
});