import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBMHpFFmvaMg2SpPg8K0Oe12x5OhnlbUdw",
  authDomain: "yum-dash.firebaseapp.com",
  projectId: "yum-dash",
  storageBucket:"yum-dash.appspot.com",
  messagingSenderId: "134345807490",
  appId: "1:134345807490:web:469c1d0d6bcb66ac69469b",
  measurementId: "G-C9ZSRE8B3S",
}



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const  db =  getFirestore(app);
export const  storage =  getStorage(app);

