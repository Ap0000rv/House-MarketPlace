

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4n7-pYVQ4lJ7negyatpw8InrZ0MW77us",
  authDomain: "house-marketplace-app-7b17d.firebaseapp.com",
  projectId: "house-marketplace-app-7b17d",
  storageBucket: "house-marketplace-app-7b17d.appspot.com",
  messagingSenderId: "405599281855",
  appId: "1:405599281855:web:83ef7fa0dd6ab81aecdc0a"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();

