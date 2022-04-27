import { initializeApp } from "firebase/app";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBldRs-qlwOFCcBzx-tvZBcizbFEyKcgmk",
    authDomain: "trade-fc52c.firebaseapp.com",
    projectId: "trade-fc52c",
    storageBucket: "trade-fc52c.appspot.com",
    messagingSenderId: "444816406582",
    appId: "1:444816406582:web:eb700fd50304feaa8f0097",
    measurementId: "G-TBWBSKPHJ2"
  };

  const app = initializeApp(firebaseConfig);

  export default app;