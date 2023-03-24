// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCN-AqI6pyTLHT7TurGy6RXkQl2_3AIzWk",
  authDomain: "ascension-531ca.firebaseapp.com",
  projectId: "ascension-531ca",
  storageBucket: "ascension-531ca.appspot.com",
  messagingSenderId: "893529142701",
  appId: "1:893529142701:web:ea98f8895cad38667a5d24",
  measurementId: "G-YX4WDQZNFR"
};

// Initialize Firebase
let app;
if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

const auth = getAuth(app);

export { auth };