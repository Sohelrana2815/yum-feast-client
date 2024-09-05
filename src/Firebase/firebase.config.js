import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.APIKEY_VITE,
  authDomain: import.meta.env.AUTHDOMAIN_VITE,
  projectId: import.meta.env.PROJECTID_VITE,
  storageBucket: import.meta.env.STORAGEBUCKET_VITE,
  messagingSenderId: import.meta.env.MESSAGINGSENDERID_VITE,
  appId: import.meta.env.APPID_VITE,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
