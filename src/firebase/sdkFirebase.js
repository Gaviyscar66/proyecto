// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_2uOyq3VTW6Qvi4UrWVROutniizYfcl0",
  authDomain: "liverpool-432a1.firebaseapp.com",
  projectId: "liverpool-432a1",
  storageBucket: "liverpool-432a1.firebasestorage.app",
  messagingSenderId: "713380622314",
  appId: "1:713380622314:web:93bef5389352e349cccc93",
  measurementId: "G-7LJQW9DY7N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);