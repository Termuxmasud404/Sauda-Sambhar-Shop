import { auth, db, storage } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

// শুধুমাত্র Admin Email
const ADMIN_EMAIL = "xdmr328@gmail.com";

const form = document.getElementById("productForm");
const products = document.getElementById("products");

// Admin Check
onAuthStateChanged(auth, (user) => {

    if (!user) {
        location.href = "login.html";
        return;
    }

    if (user.email !== ADMIN_EMAIL) {
        alert("Access Denied!");
        location.href = "index.html";
        return;
    }

    loadProducts();

});

// Logout
document.getElementById("logoutBtn").onclick = () => {
    signOut(auth);
};

// Add Product
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;

    const file = document.getElementById("imageFile").files[0];

    if (!file) {
        alert("Select Image");
        return;
    }

    try {

        const imageRef = ref(storage, "products/" + Date.now());

        await uploadBytes(imageRef, file);

        const image = await getDownloadURL(imageRef);

        await addDoc(collection(db, "products"), {

            name,
            price,
            description,
            image

        });

        alert("Product Added");

        form.reset();

        document.getElementById("preview").style.display = "none";

        loadProducts();

    } catch (err) {

        alert(err.message);

    }

});

// Load Products
async function loadProducts() {

    products.innerHTML = "";

    const snapshot = await getDocs(collection(db, "products"));

    snapshot.forEach((item) => {

        const p = item.data();

        products.innerHTML += `
        <div class="card">

            <img src="${p.image}" width="100%">

            <h3>${p.name}</h3>

            <p>৳${p.price}</p>

            <button onclick="deleteProduct('${item.id}')">
                Delete
            </button>

        </div>
        `;

    });

}

// Delete Product
window.deleteProduct = async (id) => {

    if (!confirm("Delete Product?")) return;

    await deleteDoc(doc(db, "products", id));

    loadProducts();

};
