// Services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA71scOD0OX49XpyDGKqu3FDNSESg93r6c",
  authDomain: "eeep-irma-ana-zelia.firebaseapp.com",
  projectId: "eeep-irma-ana-zelia",
  storageBucket: "eeep-irma-ana-zelia.appspot.com",
  messagingSenderId: "237082368637",
  appId: "1:237082368637:web:2ae71b7fbead04a8c4ef14",
  measurementId: "G-M62Q4H0XM5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
