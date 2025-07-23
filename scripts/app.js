console.log("E-Commerce Website Loaded");
// Select elements
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

// Toggle class on hamburger click
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', () => {
  const productGrid = document.getElementById('products');

  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(products => {
      products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');

        card.innerHTML = `
          <img src="${product.image}" alt="${product.title}" loading="lazy">
          <h3 class="product-title">${product.title}</h3>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <button class="add-to-cart">Add to Cart</button>
        `;

        productGrid.appendChild(card);
      });
    })
    .catch(error => {
      productGrid.innerHTML = "<p>Failed to load products.</p>";
      console.error(error);
    });
});
