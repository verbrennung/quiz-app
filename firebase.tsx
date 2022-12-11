import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAWtkkwzBI66Gv1c20qf3u3Az0X4zECn-c",
  authDomain: "quiz-app-57b05.firebaseapp.com",
  projectId: "quiz-app-57b05",
  storageBucket: "quiz-app-57b05.appspot.com",
  messagingSenderId: "913849416047",
  appId: "1:913849416047:web:42981c2ecd433d8c54909a",
  measurementId: "G-889K32BTFB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();
const auth = getAuth(app);

export { db, storage, auth, app };
