vimport { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// ---------- LOGIN ----------
const loginForm = document.getElementById("loginForm");

if (loginForm) {

  loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {

      await signInWithEmailAndPassword(auth, email, password);

      alert("✅ Login Successful");

      window.location.href = "admin.html";

    } catch (error) {

      switch (error.code) {

        case "auth/invalid-credential":
          alert("❌ Wrong Email or Password");
          break;

        case "auth/user-not-found":
          alert("❌ User not found");
          break;

        case "auth/wrong-password":
          alert("❌ Wrong Password");
          break;

        case "auth/invalid-email":
          alert("❌ Invalid Email");
          break;

        default:
          alert(error.message);

      }

    }

  });

}

// ---------- REGISTER ----------
const registerForm = document.getElementById("registerForm");

if (registerForm) {

  registerForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {

      await createUserWithEmailAndPassword(auth, email, password);

      alert("✅ Registration Successful");

      window.location.href = "login.html";

    } catch (error) {

      alert(error.message);

    }

  });

}

// ---------- LOGOUT ----------

window.logout = async function () {

  await signOut(auth);

  window.location.href = "login.html";

};
