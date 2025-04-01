let productsData = [];

// Fetch products data from the JSON file
fetch('/products.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to load products data');
    }
    return response.json();
  })
  .then(data => {
    productsData = data;

    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category') || 'all';

    if (document.querySelector('.products-grid')) {

      document.getElementById('category-select').value = categoryParam;

      // Render products
      renderProducts(filterProducts(productsData, categoryParam));

      // Add event listeners
      document.getElementById('category-select').addEventListener('change', function () {
        const category = this.value;
        renderProducts(filterProducts(productsData, category));
      });

      document.getElementById('sort-select').addEventListener('change', function () {
        const sortBy = this.value;
        const currentCategory = document.getElementById('category-select').value;
        const filteredProducts = filterProducts(productsData, currentCategory);
        renderProducts(sortProducts(filteredProducts, sortBy));
      });
    }
  })
  .catch(error => {
    console.error('Error loading products data:', error);
  });

// Filter products by category
function filterProducts(products, category) {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
}

// Sort products
function sortProducts(products, sortBy) {
  switch (sortBy) {
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
      <a href="/product?id=${product.id}" class="product-card-link">
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
    btn.addEventListener('click', function (e) {
      e.stopPropagation(); // Prevent triggering the card link
      const productId = this.getAttribute('data-id');
      alert(`Added product ${productId} to cart`);
    });
  });
}