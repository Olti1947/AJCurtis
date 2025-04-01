const productsData = [
    {
      id: 1,
      title: "SHAINGHAT TENNIS",
      price: "111.00",
      category: "popular",
      image: "../assets/img1.jpg",
      subtitle: "Urban Landscape Series",
      photographer: "Photographer: A. J. Curtis",
      description: "A stunning urban landscape capturing the essence of city life."
    },
    {
      id: 2,
      title: "HOTEL COSTES",
      price: "111.00",
      category: "season",
      image: "../assets/img2.jpg",
      subtitle: "Luxury Interior Series",
      photographer: "Photographer: A. J. Curtis",
      description: "Elegant interior photography showcasing luxury spaces."
    },
    {
      id: 3,
      title: "BAK KOBA",
      price: "111.00",
      category: "urban",
      image: "../assets/img3.jpg",
      subtitle: "Street Photography Series",
      photographer: "Photographer: A. J. Curtis",
      description: "Vibrant street photography capturing urban culture."
    },
    {
      id: 4,
      title: "VENDING MACHINE",
      price: "111.00",
      category: "urban",
      image: "../assets/img4.jpg",
      subtitle: "Urban Minimalism Series",
      photographer: "Photographer: A. J. Curtis",
      description: "Minimalist urban photography with bold colors."
    },
    {
      id: 5,
      title: "COFENHAGEN HARBOUR",
      price: "111.00",
      category: "nature",
      image: "../assets/img5.jpg",
      subtitle: "Seascape Series",
      photographer: "Photographer: A. J. Curtis",
      description: "Beautiful harbor scenery with dramatic lighting."
    },
    {
      id: 6,
      title: "LOVE OVER RULES",
      price: "111.00",
      category: "portrait",
      image: "../assets/img6.jpg",
      subtitle: "Emotional Portrait Series",
      photographer: "Photographer: A. J. Curtis",
      description: "Intimate portrait capturing deep human emotions."
    },
    {
      id: 7,
      title: "LAWES COFFEE VENDING 01",
      price: "111.00",
      category: "urban",
      image: "../assets/img7.jpg",
      subtitle: "Urban Detail Series",
      photographer: "Photographer: A. J. Curtis",
      description: "Detailed urban photography focusing on textures."
    },
    {
      id: 8,
      title: "MAN WITH DOGS",
      price: "111.00",
      category: "portrait",
      image: "../assets/img8.jpg",
      subtitle: "Street Portrait Series",
      photographer: "Photographer: A. J. Curtis",
      description: "Candid street portrait capturing a unique moment."
    }
  ];
  
  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category') || 'all';
  
  // Initialize page
  if (document.querySelector('.products-grid')) {
    // Set initial category filter
    document.getElementById('category-select').value = categoryParam;
    
    // Render products
    renderProducts(filterProducts(productsData, categoryParam));
    
    // Add event listeners
    document.getElementById('category-select').addEventListener('change', function() {
      const category = this.value;
      renderProducts(filterProducts(productsData, category));
    });
    
    document.getElementById('sort-select').addEventListener('change', function() {
      const sortBy = this.value;
      const currentCategory = document.getElementById('category-select').value;
      const filteredProducts = filterProducts(productsData, currentCategory);
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
    
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
        <a href="ProductPage.html?id=${product.id}" class="product-card-link">
          <img src="${product.image}" alt="${product.title}" class="product-image">
          <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-price">$${product.price}</p>
          </div>
        </a>
        <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
      `;
      productsGrid.appendChild(productCard);
    });
  
    // Handle add to cart clicks
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent triggering the card link
        const productId = this.getAttribute('data-id');
        alert(`Added product ${productId} to cart`);
      });
    });
  }