import {initializeApp} from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
import {getFirestore, doc, setDoc, getDoc, getDocs, collection} from "https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyBNrTJHeSqL8sO6ovgQnK3ScDpAfanfP2s",
  authDomain: "cmsproject-a361d.firebaseapp.com",
  projectId: "cmsproject-a361d",
  storageBucket: "cmsproject-a361d.appspot.com",
  messagingSenderId: "49667853298",
  appId: "1:49667853298:web:b28dbba5e12aae6ae3396b",
  measurementId: "G-2V968GRRV8"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);


const querySnapshot = await getDocs(collection(db, "users"));
