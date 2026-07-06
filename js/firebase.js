// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

// Firebase Config

const firebaseConfig = {

  apiKey: "AIzaSyBUAR6JQU1bZzj2eCkzwvtIbPuRhpwf4Ds",

  authDomain: "global-voice-chat-app.firebaseapp.com",

  projectId: "global-voice-chat-app",

  storageBucket: "global-voice-chat-app.firebasestorage.app",

  messagingSenderId: "876616774880",

  appId: "1:876616774880:web:b0f7b1a9140df57307cc85",

  measurementId: "G-YTVC8Q7T28"

};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Export Firebase Services

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

console.log("✅ Firebase Connected");
