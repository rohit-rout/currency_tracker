// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBt0zA7TCVpTQnPT63eqogsPxFxL87f6s",
  authDomain: "crypto-tracker-2eff3.firebaseapp.com",
  projectId: "crypto-tracker-2eff3",
  storageBucket: "crypto-tracker-2eff3.appspot.com",
  messagingSenderId: "137391423277",
  appId: "1:137391423277:web:40156e5d9265658b07dda4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

