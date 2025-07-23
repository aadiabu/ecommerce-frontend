document.addEventListener('DOMContentLoaded', () => {
  const detailContainer = document.getElementById('product-detail');
  const cartCount = document.getElementById('cart-count');
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  // Load and display cart count
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartCount.textContent = cart.length;

  if (!productId) {
    detailContainer.innerHTML = "<p>Product not found.</p>";
    return;
  }

  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(res => res.json())
    .then(product => {
      let basePrice = product.price;

      detailContainer.innerHTML = `
        <div class="product-info">
          <img src="${product.image}" alt="${product.title}" class="product-image-large" />
          <div>
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <p class="product-price">Price: $<span id="price">${basePrice.toFixed(2)}</span></p>

            <label for="size">Size:</label>
            <select id="size">
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
            </select>

            <div class="quantity-selector">
              <button id="decrease">−</button>
              <input type="number" id="quantity" value="1" min="1">
              <button id="increase">+</button>
            </div>

            <button id="add-to-cart">Add to Cart</button>
          </div>
        </div>
      `;

      // Attach quantity listeners
      const qtyInput = document.getElementById('quantity');
      const priceDisplay = document.getElementById('price');

      const updateTotalPrice = () => {
        const qty = parseInt(qtyInput.value);
        priceDisplay.textContent = (basePrice * qty).toFixed(2);
      };

      document.getElementById('increase').addEventListener('click', () => {
        qtyInput.value = parseInt(qtyInput.value) + 1;
        updateTotalPrice();
      });

      document.getElementById('decrease').addEventListener('click', () => {
        if (qtyInput.value > 1) {
          qtyInput.value = parseInt(qtyInput.value) - 1;
          updateTotalPrice();
        }
      });

      // Add to Cart logic
      document.getElementById('add-to-cart').addEventListener('click', () => {
        const selectedSize = document.getElementById('size').value;
        const quantity = parseInt(qtyInput.value);

        cart.push({ ...product, selectedSize, quantity });
        localStorage.setItem('cart', JSON.stringify(cart));

        cartCount.textContent = cart.length;
        alert("✅ Product added to cart!");
      });
    })
    .catch(err => {
      detailContainer.innerHTML = "<p>Failed to load product details.</p>";
      console.error(err);
    });
});
