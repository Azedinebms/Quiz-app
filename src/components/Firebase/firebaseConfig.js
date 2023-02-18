import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc } from 'firebase/firestore';


const Config = {
  apiKey: "AIzaSyB4LxHVjZsMbIVBsJCoYaDRw1WKAfLIvig",
  authDomain: "mon-app-quiz.firebaseapp.com",
  projectId: "mon-app-quiz",
  storageBucket: "mon-app-quiz.appspot.com",
  messagingSenderId: "786125465770",
  appId: "1:786125465770:web:30ecb2df281a5bf5f208d3"
};


const app = initializeApp(Config);

export const auth = getAuth(app);

export const firestore = getFirestore();

export const user = uid => doc(firestore, `users/${uid}`);

