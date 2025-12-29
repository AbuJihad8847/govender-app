import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDomfSlCgoeLX8t1Q4CoeD3BjBDELYz5KQ",
    authDomain: "govendor-b5c38.firebaseapp.com",
    projectId: "govendor-b5c38",
    storageBucket: "govendor-b5c38.firebasestorage.app",
    messagingSenderId: "163188261154",
    appId: "1:163188261154:web:fbbfeb5ca1d4e0f8dc657b",
    measurementId: "G-3CRG49QGF1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
