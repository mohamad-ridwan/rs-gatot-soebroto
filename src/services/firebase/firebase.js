// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEVwP80f-B6fZxEhJ1EDo_jjQzQL4xTgI",
  authDomain: "rs-gatot-soebroto.firebaseapp.com",
  projectId: "rs-gatot-soebroto",
  storageBucket: "rs-gatot-soebroto.appspot.com",
  messagingSenderId: "829410156755",
  appId: "1:829410156755:web:f2fdb4eda80c1f69b7f426"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)