console.log("E-Commerce Website Loaded");

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Product grid and cart count elements
const productGrid = document.getElementById('products');
const cartCount = document.getElementById('cart-count');

// Load cart from localStorage or create empty one
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartUI();

// Show loading state
productGrid.innerHTML = "<p>Loading products...</p>";

// Fetch products from API
fetch("https://fakestoreapi.com/products")
  .then(res => {
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  })
  .then(products => {
    renderProducts(products);
  })
  .catch(error => {
    productGrid.innerHTML = "<p>⚠️ Failed to load products.</p>";
    console.error("Fetch error:", error);
  });

// Render products
function renderProducts(products) {
  productGrid.innerHTML = ""; // Clear loading state

  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');

    // ✅ Wrap image and title inside a clickable <a> linking to the detail page
    card.innerHTML = `
      <a href="product.html?id=${product.id}" class="product-link">
        <img src="${product.image}" alt="${product.title}" loading="lazy">
        <h3 class="product-title">${product.title}</h3>
      </a>
      <p class="product-price">$${product.price.toFixed(2)}</p>
      <button class="add-to-cart">Add to Cart</button>
    `;

    const addToCartBtn = card.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', (e) => {
      e.preventDefault(); // prevent anchor conflict if needed
      addToCart(product);
    });

    productGrid.appendChild(card);
  });
}

// Add to cart and update UI
function addToCart(product) {
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
  console.log(`✅ Added to cart: ${product.title}`);
}

// Update cart count in UI
function updateCartUI() {
  cartCount.textContent = cart.length;
}
