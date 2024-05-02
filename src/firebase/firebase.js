// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth} from 'firebase/auth';
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyD1AlyfenBTfQSceXEszwYzLffml3ECKEA",
  authDomain: "oumlalprojet.firebaseapp.com",
  projectId: "oumlalprojet",
  storageBucket: "oumlalprojet.appspot.com",
  messagingSenderId: "396811263969",
  appId: "1:396811263969:web:97cd7778dd30d445fe3ca0",
  measurementId: "G-6KWYYXFQMB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
export {app,auth,firestore,storage}

