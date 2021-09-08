import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyCb8a53HjfHOdqyZtXlTF03AihNdq2yGxU",
    authDomain: "cmsproject-d9e36.firebaseapp.com",
    projectId: "cmsproject-d9e36",
    storageBucket: "cmsproject-d9e36.appspot.com",
    messagingSenderId: "1095786303037",
    appId: "1:1095786303037:web:96247276f95acbf716a454",
    measurementId: "G-PV12PY7R4G"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);