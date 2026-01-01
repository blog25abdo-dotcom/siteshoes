import { initializeApp } from 'firebase/app';
import { getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDHHDMDCXhjZme4ZwdVi-zyEM52TN8Z9vU",
  authDomain: "shoes-paradise-f46ce.firebaseapp.com",
  projectId: "shoes-paradise-f46ce",
  storageBucket: "shoes-paradise-f46ce.firebasestorage.app",
  messagingSenderId: "1090560335015",
  appId: "1:1090560335015:web:0a2fa7a0c2a8bb1fcd4f82",
  measurementId: "G-SBMQX8XE0Z"
};


// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

// Test Firebase connection
console.log('Firebase initialisé avec succès');
console.log('Project ID:', firebaseConfig.projectId);
export default app;