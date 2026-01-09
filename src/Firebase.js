// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCrIV1A0-OEv5W92QrtynYdiWhkXDeo_D0",
    authDomain: "be-week-3-test-8b830.firebaseapp.com",
    projectId: "be-week-3-test-8b830",
    storageBucket: "be-week-3-test-8b830.firebasestorage.app",
    messagingSenderId: "800933979334",
    appId: "1:800933979334:web:f3885c54d57fd8d3afe3c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);