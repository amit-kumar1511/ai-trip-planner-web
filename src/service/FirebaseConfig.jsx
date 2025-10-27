import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyALBPhJM52k_1idAVFti6hDeYKdoUhySHQ",
  authDomain: "ai-trip-94a45.firebaseapp.com",
  projectId: "ai-trip-94a45",
  storageBucket: "ai-trip-94a45.firebasestorage.app",
  messagingSenderId: "928090588625",
  appId: "1:928090588625:web:425296f4e1e36dcf4eccf0",
  measurementId: "G-Z250JGEFBK"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
