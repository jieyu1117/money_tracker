// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCZ45dl-vxOTZGMRXIeoxtEETTiZDU-cXE",
//   authDomain: "money-tracker-17abd.firebaseapp.com",
//   projectId: "money-tracker-17abd",
//   storageBucket: "money-tracker-17abd.firebasestorage.app",
//   messagingSenderId: "654327923917",
//   appId: "1:654327923917:web:7f1a3747a81ead09bed584",
//   measurementId: "G-N2X6ED72NP"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// //const analytics = getAnalytics(app);

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyCZ45dl-vxOTZGMRXIeoxtEETTiZDU-cXE",
    authDomain: "money-tracker-17abd.firebaseapp.com",
    projectId: "money-tracker-17abd",
    storageBucket: "money-tracker-17abd.firebasestorage.app",
    messagingSenderId: "654327923917",
    appId: "1:654327923917:web:7f1a3747a81ead09bed584",
    measurementId: "G-N2X6ED72NP"
};

const app = initializeApp(firebaseConfig);

export { app };