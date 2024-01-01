// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDS70Dyl8FkXR4YIBcmoNVlF98P0cv7UdY",
  authDomain: "ticketmanager-62a5e.firebaseapp.com",
  projectId: "ticketmanager-62a5e",
  storageBucket: "ticketmanager-62a5e.appspot.com",
  messagingSenderId: "305811655018",
  appId: "1:305811655018:web:9c938d6594493e1556fd13",
  measurementId: "G-60QRZC2HQ7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


