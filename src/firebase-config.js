import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {

  apiKey: "AIzaSyAymddFdti6fJXG0qqvAAxHGVXxhxpK57c",

  authDomain: "inventory-d6a89.firebaseapp.com",

  projectId: "inventory-d6a89",

  storageBucket: "inventory-d6a89.appspot.com",

  messagingSenderId: "148248871422",

  appId: "1:148248871422:web:f48ff9ed335b7aada500af"

};



const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);
