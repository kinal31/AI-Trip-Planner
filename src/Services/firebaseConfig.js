// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByn3jH0Aa3f54OytPVmhRhql6680CpwvU",
  authDomain: "ai-trip-planner-fe837.firebaseapp.com",
  projectId: "ai-trip-planner-fe837",
  storageBucket: "ai-trip-planner-fe837.firebasestorage.app",
  messagingSenderId: "1079217890125",
  appId: "1:1079217890125:web:6f8d84a105b7b2bc1c4d04"
};  


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);