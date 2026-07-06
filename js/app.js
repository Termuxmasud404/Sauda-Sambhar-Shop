// app.js

import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Use productList instead of .products
const productContainer = document.getElementById("productList");

// Load Products
async function loadProducts() {

  if (!productContainer) return;

  productContainer.innerHTML = "<h3>Loading products...</h3>";

  try {

    const snapshot = await getDocs(collection(db, "products"));

    productContainer.innerHTML = "";

    if (snapshot.empty) {
      productContainer.innerHTML = "<h3>No Products Found</h3>";
      return;
    }

    snapshot.forEach((doc) => {

      const product = doc.data();

      productContainer.innerHTML += `
        <div class="card">

          <img src="${product.image}" alt="${product.name}">

          <h3>${product.name}</h3>

          <p>৳${product.price}</p>

          <button>Add to Cart</button>

        </div>
      `;

    });

  } catch (error) {

    console.error(error);

    productContainer.innerHTML =
      "<h3>❌ Failed to load products.</h3>";

  }

}

// Start App
loadProducts();
