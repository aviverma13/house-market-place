import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0O5q4ez6zTWDgipoHy0pYrTQZ1_5pnhs",
  authDomain: "house-marketplace-app-18e82.firebaseapp.com",
  projectId: "house-marketplace-app-18e82",
  storageBucket: "house-marketplace-app-18e82.appspot.com",
  messagingSenderId: "1057486903511",
  appId: "1:1057486903511:web:e98007c510b46f4426b892",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
