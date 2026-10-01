import { app } from "./firebase.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";


const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById("googleLogin");


googleLogin.addEventListener("click", async function() {

    try {

        const result = await signInWithPopup(auth, provider);

        const user = result.user;

        console.log("Login successful!");
        console.log("Name:", user.displayName);
        console.log("Email:", user.email);
        console.log("UID:", user.uid);

        window.location.href = "index.html";

    }

    catch (error) {

        console.error(error);

        alert("Login failed. Please try again.");

    }

});