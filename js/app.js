// app.js

import {
  db
} from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const productContainer = document.querySelector(".products");

// Load Products
async function loadProducts() {
  if (!productContainer) return;

  productContainer.innerHTML = "<p>Loading products...</p>";

  try {
    const querySnapshot = await getDocs(collection(db, "products"));

    productContainer.innerHTML = "";

    if (querySnapshot.empty) {
      productContainer.innerHTML =
        "<h3>No products available.</h3>";
      return;
    }

    querySnapshot.forEach((doc) => {
      const product = doc.data();

      productContainer.innerHTML += `
        <div class="card">
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>৳${product.price}</p>
          <button onclick="alert('Product added to cart!')">
            Add to Cart
          </button>
        </div>
      `;
    });

  } catch (error) {
    console.error(error);
    productContainer.innerHTML =
      "<h3>Failed to load products.</h3>";
  }
}

// Start App
loadProducts();
