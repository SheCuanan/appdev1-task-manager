import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyByte3eShBRCAextqbdXd6IerGu0LB8_PU",
  authDomain: "appdev1-task-manager-a8be2.firebaseapp.com",
  projectId: "appdev1-task-manager-a8be2",
  storageBucket: "appdev1-task-manager-a8be2.firebasestorage.app",
  messagingSenderId: "105586470914",
  appId: "1:105586470914:web:2b2896728500f5682a371b",
  measurementId: "G-P9TLCW6L54"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

export { db, auth, googleProvider }
