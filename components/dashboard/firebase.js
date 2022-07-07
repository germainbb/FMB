// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsgaLnTmx8JcMOiudjZKI0ibOrEnyXaqc",
  authDomain: "f-m-b-1.firebaseapp.com",
  projectId: "f-m-b-1",
  storageBucket: "f-m-b-1.appspot.com",
  messagingSenderId: "442584868681",
  appId: "1:442584868681:web:8155b028130d5ac0931c98",
  measurementId: "G-Q906P87BDC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
 const auth = getAuth(app);
 const db = getFirestore(app);
 const storage = getStorage(app);

 export {app, db, storage, auth}