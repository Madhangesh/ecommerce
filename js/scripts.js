document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("products.html")) {
    displayProducts();
  }
  if (window.location.pathname.includes("product.html")) {
    displayProductDetail();
  }
  if (window.location.pathname.includes("cart.html")) {
    displayCart();
  }
});

const products = [
  {
    id: 1,
    name: "FootBall",
    description: "High-quality Football and durable",
    price: 599,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvHnN9pWS0HDg2dtmWrlhXUGFuIkM_wxaFzQ&s",
  },
  {
    id: 2,
    name: "Running Shoes For men",
    description: "High-quality Running Shoes of all sizes",
    price: 1299,
    image:
      "https://rukminim2.flixcart.com/image/850/1000/xif0q/shoe/p/f/k/7-na-rng-854-grey-41-bruton-grey-original-imagzye9vqcxhegh.jpeg?q=90&crop=false",
  },
  {
    id: 3,
    name: "Tennis Racquet",
    description: "High-quality Tennis Racquet",
    price: 899,
    image:
      "https://cdn.nwscdn.com/media/catalog/product/cache/h700xw700/v/e/vermont-colt-is-a-tennis-racket-for-all-ages-to-enjoy_1.jpg",
  },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayProducts() {
  const productContainer = document.querySelector(".product-list");
  products.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");
    productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
            <p>${product.description}</p>
            <p>₹${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
    productContainer.appendChild(productItem);
  });
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} has been added to your cart.`);
}

function displayProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get("id"));
  const product = products.find((p) => p.id === productId);

  if (product) {
    const productDetailContainer = document.querySelector(".product-detail");
    productDetailContainer.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>₹${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
  } else {
    const productDetailContainer = document.querySelector(".product-detail");
    productDetailContainer.innerHTML = `<p>Product not found.</p>`;
  }
}

function displayCart() {
  const cartContainer = document.querySelector(".cart-items");
  cartContainer.innerHTML = "";
  cart.forEach((product) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
        `;
    cartContainer.appendChild(cartItem);
  });

  const cartTotal = document.getElementById("cart-total");
  const total = cart.reduce((sum, product) => sum + product.price, 0);
  cartTotal.textContent = total.toFixed(2);
}
