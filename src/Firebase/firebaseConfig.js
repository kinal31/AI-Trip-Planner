// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBh81cSy1pkkVKTN44c9iVjGiXB66xOd5k",
  authDomain: "chat-application-5569d.firebaseapp.com",
  projectId: "chat-application-5569d",
  storageBucket: "chat-application-5569d.firebasestorage.app",
  messagingSenderId: "249647223907",
  appId: "1:249647223907:web:675a86242d0c6fc4e2d456",
  measurementId: "G-QHHBG5S866"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);