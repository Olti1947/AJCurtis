// Product data (should match the data in ProductsPage.html)
const products = [
  {
    id: 1,
    title: "SHAINGHAT TENNIS",
    subtitle: "Urban Landscape Series",
    price: "111.00",
    photographer: "Photographer: A. J. Curtis",
    description: "A stunning urban landscape capturing the essence of city life.",
    image: "../assets/img1.jpg",
    details: "High quality Giclée print on 265 gsm fine art photo paper..."
  },
  {
    id: 2,
    title: "HOTEL COSTES",
    subtitle: "Luxury Interior Series",
    price: "111.00",
    photographer: "Photographer: A. J. Curtis",
    description: "Elegant interior photography showcasing luxury spaces.",
    image: "../assets/img2.jpg",
    details: "High quality Giclée print on 265 gsm fine art photo paper..."
  },
  {
    id: 3,
    title: "BAK KOBA",
    subtitle: "Street Photography Series",
    price: "111.00",
    photographer: "Photographer: A. J. Curtis",
    description: "Vibrant street photography capturing urban culture.",
    image: "../assets/img3.jpg",
    details: "High quality Giclée print on 265 gsm fine art photo paper..."
  },
  {
    id: 4,
    title: "VENDING MACHINE",
    subtitle: "Urban Minimalism Series",
    price: "111.00",
    photographer: "Photographer: A. J. Curtis",
    description: "Minimalist urban photography with bold colors.",
    image: "../assets/img4.jpg",
    details: "High quality Giclée print on 265 gsm fine art photo paper..."
  },
  {
    id: 5,
    title: "COFENHAGEN HARBOUR",
    subtitle: "Seascape Series",
    price: "111.00",
    photographer: "Photographer: A. J. Curtis",
    description: "Beautiful harbor scenery with dramatic lighting.",
    image: "../assets/img5.jpg",
    details: "High quality Giclée print on 265 gsm fine art photo paper..."
  },
  {
    id: 6,
    title: "LOVE OVER RULES",
    subtitle: "Emotional Portrait Series",
    price: "111.00",
    photographer: "Photographer: A. J. Curtis",
    description: "Intimate portrait capturing deep human emotions.",
    image: "../assets/img6.jpg",
    details: "High quality Giclée print on 265 gsm fine art photo paper..."
  },
  {
    id: 7,
    title: "LAWES COFFEE VENDING 01",
    subtitle: "Urban Detail Series",
    price: "111.00",
    photographer: "Photographer: A. J. Curtis",
    description: "Detailed urban photography focusing on textures.",
    image: "../assets/img7.jpg",
    details: "High quality Giclée print on 265 gsm fine art photo paper..."
  },
  {
    id: 8,
    title: "MAN WITH DOGS",
    subtitle: "Street Portrait Series",
    price: "111.00",
    photographer: "Photographer: A. J. Curtis",
    description: "Candid street portrait capturing a unique moment.",
    image: "../assets/img8.jpg",
    details: "High quality Giclée print on 265 gsm fine art photo paper..."
  }
];

// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Find the product with matching ID
const product = products.find(p => p.id == productId) || products[0];

// Populate the product page
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
    productInfo.innerHTML = `<p>${product.details}</p>`;
  }
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

// Quantity selector functionality
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

// Related products add to cart functionality
document.querySelectorAll('.related-products .add-to-cart-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const productName = this.closest('.product-card').querySelector('h3').textContent;
    const productPrice = this.closest('.product-card').querySelector('.price').textContent;
    alert(`Added ${productName} (${productPrice}) to cart`);
  });
});
