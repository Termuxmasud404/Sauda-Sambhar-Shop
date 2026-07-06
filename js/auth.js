// auth.js

import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const loginForm = document.getElementById("loginForm");

// Login
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);

      alert("✅ Login Successful!");

      // Redirect to Admin Panel
      window.location.href = "admin.html";

    } catch (error) {
      alert("❌ " + error.message);
    }
  });
}

// Check Login Status
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Logged in:", user.email);
  } else {
    console.log("Not logged in");
  }
});

// Logout Function
window.logout = async function () {
  try {
    await signOut(auth);
    alert("✅ Logged Out Successfully!");
    window.location.href = "login.html";
  } catch (error) {
    alert(error.message);
  }
};
