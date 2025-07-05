import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAC8Wk51jSVIHQAeNh1pTxDstsE-XqgIyk",

  authDomain: "react-login-app-2942d.firebaseapp.com",

  projectId: "react-login-app-2942d",

  storageBucket: "react-login-app-2942d.firebasestorage.app",

  messagingSenderId: "1072329267941",

  appId: "1:1072329267941:web:59ec6b95f266e336b7920c",

  measurementId: "G-H6T2XMLGMQ"

};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
