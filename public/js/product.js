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
    const productId = urlParams.get('id');


    const product = productsData.find(p => p.id == productId);


    if (product) {
      document.getElementById('product-title').textContent = product.title;
      document.getElementById('product-subtitle').textContent = product.subtitle;
      document.getElementById('current-price').textContent = product.price;
      document.getElementById('product-photographer').textContent = product.photographer;
      document.getElementById('product-description').textContent = product.description;
      document.getElementById('product-image').src = product.image;
      document.getElementById('product-image').alt = product.title;

      // Update the product-info section
      const productInfo = document.querySelector('.product-info');
      if (productInfo) {
        productInfo.innerHTML = `<p>${product.details || ''}</p>`;
      }
    } else {
      console.error('Product not found');
    }
  })
  .catch(error => {
    console.error('Error loading products data:', error);
  });

// Size selection and price update functionality
const sizeOptions = document.querySelectorAll('.size-option');
sizeOptions.forEach(option => {
  option.addEventListener('click', function () {
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

// Quantity selector functionality
const minusBtn = document.querySelector('.quantity-btn:first-child');
const plusBtn = document.querySelector('.quantity-btn:last-child');
const quantityDisplay = document.querySelector('.quantity');

let quantity = 1;

function updateQuantity() {
  quantityDisplay.textContent = quantity;
}

if (minusBtn && plusBtn && quantityDisplay) {
  minusBtn.addEventListener('click', function () {
    if (quantity > 1) {
      quantity--;
      updateQuantity();
    }
  });

  plusBtn.addEventListener('click', function () {
    quantity++;
    updateQuantity();
  });
}

// Related products add to cart functionality
document.querySelectorAll('.related-products .add-to-cart-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const productName = this.closest('.product-card').querySelector('h3').textContent;
    const productPrice = this.closest('.product-card').querySelector('.price').textContent;
    alert(`Added ${productName} (${productPrice}) to cart`);
  });
});
