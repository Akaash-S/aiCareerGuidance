
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBo9digc9kjAowcTLyag75EkFjFC7ppnA4",
  authDomain: "campus-foodorder.firebaseapp.com",
  projectId: "campus-foodorder",
  storageBucket: "campus-foodorder.firebasestorage.app",
  messagingSenderId: "169647404106",
  appId: "1:169647404106:web:6fb24dbd91553d53f862b3"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export default app;
