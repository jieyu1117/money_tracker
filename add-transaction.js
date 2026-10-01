// =========================
// Firebase
// =========================

import { app } from "./firebase.js";

import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
    getFirestore,
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


// Firebase Authentication
const auth = getAuth(app);


// Firestore Database
const db = getFirestore(app);


// Current user
let currentUser = null;


// Check login status
onAuthStateChanged(auth, function(user) {

    if (user) {

        currentUser = user;

        console.log("Current user:");
        console.log("Name:", user.displayName);
        console.log("Email:", user.email);
        console.log("UID:", user.uid);

    }

    else {

        currentUser = null;

        console.log("No user is logged in.");

    }

});


// =========================
// Get HTML Elements
// =========================

const addButton =
    document.getElementById("addButton");


// Payment Method
const paymentType =
    document.getElementById("paymentType");

const accountSection =
    document.getElementById("accountSection");

const accountLabel =
    document.getElementById("accountLabel");

const paymentAccount =
    document.getElementById("paymentAccount");

const customAccount =
    document.getElementById("customAccount");


// Category
const typeSelect =
    document.getElementById("type");

const categorySelect =
    document.getElementById("category");

const customCategory =
    document.getElementById("customCategory");


// Date
const dateInput =
    document.getElementById("date");


// =========================
// Set Today's Date
// =========================

const today = new Date();

const year =
    today.getFullYear();

const month =
    String(today.getMonth() + 1).padStart(2, "0");

const day =
    String(today.getDate()).padStart(2, "0");


dateInput.value =
    `${year}-${month}-${day}`;


// =========================
// Payment Method
// =========================

paymentType.addEventListener("change", function() {

    // Bank
    if (paymentType.value === "bank") {

        accountSection.style.display = "block";

        accountLabel.textContent = "Bank";

        paymentAccount.innerHTML = `

            <option value="">
                Select bank
            </option>

            <option value="public-bank">
                Public Bank
            </option>

            <option value="hong-leong-bank">
                Hong Leong Bank
            </option>

            <option value="maybank">
                Maybank
            </option>

            <option value="cimb">
                CIMB
            </option>

            <option value="rhb">
                RHB
            </option>

            <option value="other">
                Other
            </option>

        `;

        customAccount.style.display = "none";

        customAccount.value = "";

    }


    // E-Wallet
    else if (paymentType.value === "e-wallet") {

        accountSection.style.display = "block";

        accountLabel.textContent = "E-Wallet";

        paymentAccount.innerHTML = `

            <option value="">
                Select e-wallet
            </option>

            <option value="tng">
                Touch 'n Go
            </option>

            <option value="grabpay">
                GrabPay
            </option>

            <option value="boost">
                Boost
            </option>

            <option value="other">
                Other
            </option>

        `;

        customAccount.style.display = "none";

        customAccount.value = "";

    }


    // Cash
    else if (paymentType.value === "cash") {

        accountSection.style.display = "none";

        paymentAccount.value = "";

        customAccount.style.display = "none";

        customAccount.value = "";

    }


    // Nothing selected
    else {

        accountSection.style.display = "none";

        paymentAccount.value = "";

        customAccount.style.display = "none";

        customAccount.value = "";

    }

});


// =========================
// Custom Account
// =========================

paymentAccount.addEventListener("change", function() {

    if (paymentAccount.value === "other") {

        customAccount.style.display = "block";

    }

    else {

        customAccount.style.display = "none";

        customAccount.value = "";

    }

});


// =========================
// Category
// =========================

typeSelect.addEventListener("change", function() {

    // Income
    if (typeSelect.value === "income") {

        categorySelect.innerHTML = `

            <option value="">
                Select category
            </option>

            <option value="salary">
                Salary
            </option>

            <option value="bonus">
                Bonus
            </option>

            <option value="other">
                Other
            </option>

        `;

    }


    // Expense
    else if (typeSelect.value === "expense") {

        categorySelect.innerHTML = `

            <option value="">
                Select category
            </option>

            <option value="food">
                Food
            </option>

            <option value="transport">
                Transport
            </option>

            <option value="shopping">
                Shopping
            </option>

            <option value="bills">
                Bills
            </option>

            <option value="entertainment">
                Entertainment
            </option>

            <option value="other">
                Other
            </option>

        `;

    }

});


// Load Income categories when page opens
typeSelect.dispatchEvent(
    new Event("change")
);


// =========================
// Custom Category
// =========================

categorySelect.addEventListener("change", function() {

    if (categorySelect.value === "other") {

        customCategory.style.display = "block";

    }

    else {

        customCategory.style.display = "none";

        customCategory.value = "";

    }

});


// =========================
// Add Transaction
// =========================

addButton.addEventListener("click", async function() {


    // Check user login
    if (!currentUser) {

        alert("Please login first.");

        return;

    }


    // Get form values
    const type =
        document.getElementById("type").value;

    const amount =
        document.getElementById("amount").value;

    const category =
        document.getElementById("category").value;

    const description =
        document.getElementById("description").value;

    const date =
        document.getElementById("date").value;


    // =========================
    // Check Required Fields
    // =========================

    if (
        type === "" ||
        category === "" ||
        amount === "" ||
        date === "" ||
        paymentType.value === ""
    ) {

        alert("Please fill in all required fields.");

        return;

    }


    // =========================
    // Check Amount
    // =========================

    if (Number(amount) <= 0) {

        alert("Amount must be greater than 0.");

        return;

    }


    // =========================
    // Check Custom Category
    // =========================

    if (
        category === "other" &&
        customCategory.value.trim() === ""
    ) {

        alert("Please enter your category.");

        return;

    }


    // =========================
    // Check Bank / E-Wallet
    // =========================

    if (
        paymentType.value !== "cash" &&
        paymentAccount.value === ""
    ) {

        alert("Please select your bank or e-wallet.");

        return;

    }


    // =========================
    // Check Custom Account
    // =========================

    if (
        paymentAccount.value === "other" &&
        customAccount.value.trim() === ""
    ) {

        alert("Please enter your account name.");

        return;

    }


    // =========================
    // Get Final Category
    // =========================

    let finalCategory =
        category;


    if (category === "other") {

        finalCategory =
            customCategory.value.trim();

    }


    // =========================
    // Get Final Account
    // =========================

    let finalAccount =
        paymentAccount.value;


    if (paymentAccount.value === "other") {

        finalAccount =
            customAccount.value.trim();

    }


    // Cash does not need an account
    if (paymentType.value === "cash") {

        finalAccount = "";

    }


    // =========================
    // Create Transaction
    // =========================

    const transaction = {

        type: type,

        amount: Number(amount),

        category: finalCategory,

        paymentType: paymentType.value,

        paymentAccount: finalAccount,

        description: description.trim(),

        date: date

    };


    console.log("Transaction:");

    console.log(transaction);


    // =========================
    // Save to Firestore
    // =========================

    try {

        const transactionCollection =
            collection(
                db,
                "users",
                currentUser.uid,
                "transactions"
            );


        const docRef =
            await addDoc(
                transactionCollection,
                transaction
            );


        console.log(
            "Transaction saved successfully!"
        );

        console.log(
            "Document ID:",
            docRef.id
        );


        alert(
            "Transaction added successfully!"
        );


        // Clear amount
        document.getElementById("amount").value = "";


        // Clear description
        document.getElementById("description").value = "";


        // Reset category
        typeSelect.value = "income";

        typeSelect.dispatchEvent(
            new Event("change")
        );


        categorySelect.value = "";

        customCategory.style.display = "none";

        customCategory.value = "";


        // Reset payment method
        paymentType.value = "";

        accountSection.style.display = "none";

        paymentAccount.value = "";

        customAccount.style.display = "none";

        customAccount.value = "";


        // Reset date to today
        dateInput.value =
            `${year}-${month}-${day}`;

    }


    catch (error) {

        console.error(
            "Error saving transaction:",
            error
        );


        alert(
            "Failed to save transaction. Please try again."
        );

    }

});