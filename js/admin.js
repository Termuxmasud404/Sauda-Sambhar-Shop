// admin.js

import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const productForm = document.getElementById("productForm");
const productsDiv = document.getElementById("products");

// Add Product
if (productForm) {
  productForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;
    const description = document.getElementById("description").value;

    try {
      await addDoc(collection(db, "products"), {
        name,
        price,
        image,
        description,
        createdAt: new Date()
      });

      alert("✅ Product Added Successfully!");
      productForm.reset();
      loadProducts();

    } catch (error) {
      alert(error.message);
    }
  });
}

// Load Products
async function loadProducts() {
  if (!productsDiv) return;

  productsDiv.innerHTML = "";

  const snapshot = await getDocs(collection(db, "products"));

  snapshot.forEach((item) => {
    const product = item.data();

    productsDiv.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" width="100">
        <h4>${product.name}</h4>
        <p>৳${product.price}</p>

        <button onclick="deleteProduct('${item.id}')">
          Delete
        </button>
      </div>
    `;
  });
}

// Delete Product
window.deleteProduct = async function (id) {
  if (!confirm("Delete this product?")) return;

  await deleteDoc(doc(db, "products", id));

  alert("🗑️ Product Deleted");
  loadProducts();
};

// Start
loadProducts();
