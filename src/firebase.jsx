import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCAlJ1b-aNYwP-Y3Xt15UqBaSWPGg1v5FU",
  authDomain: "doglist-b239a.firebaseapp.com",
  projectId: "doglist-b239a",
  storageBucket: "doglist-b239a.appspot.com",
  messagingSenderId: "312457653400",
  appId: "1:312457653400:web:8e5c5c926dc1619aa4f4ed",
  measurementId: "G-XQYLRW709B"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);