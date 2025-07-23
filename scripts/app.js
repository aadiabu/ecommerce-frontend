console.log("E-Commerce Website Loaded");
// Select elements
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

// Toggle class on hamburger click
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

