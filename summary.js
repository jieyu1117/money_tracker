// =========================
// Firebase Authentication
// =========================

import { app } from "./firebase.js";

import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";


// =========================
// Firebase Firestore
// =========================

import {
    getFirestore,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


// Firebase Authentication
const auth = getAuth(app);


// Firestore Database
const db = getFirestore(app);


// =========================
// Default Accounts
// =========================

const defaultAccounts = [

    {
        value: "public-bank",
        name: "Public Bank"
    },

    {
        value: "hong-leong-bank",
        name: "Hong Leong Bank"
    },

    {
        value: "maybank",
        name: "Maybank"
    },

    {
        value: "cimb",
        name: "CIMB"
    },

    {
        value: "rhb",
        name: "RHB"
    },

    {
        value: "tng",
        name: "Touch 'n Go"
    },

    {
        value: "grabpay",
        name: "GrabPay"
    },

    {
        value: "boost",
        name: "Boost"
    },

    {
        value: "cash",
        name: "Cash"
    }

];


// =========================
// Check Current User
// =========================

onAuthStateChanged(auth, async function(user) {

    if (user) {

        console.log("Current user:");
        console.log("Name:", user.displayName);
        console.log("Email:", user.email);
        console.log("UID:", user.uid);


        // =========================
        // Load Transactions
        // =========================

        let all_transaction = [];


        try {

            // Get user's transactions
            const transactionCollection =
                collection(
                    db,
                    "users",
                    user.uid,
                    "transactions"
                );


            // Read transactions from Firestore
            const querySnapshot =
                await getDocs(transactionCollection);


            querySnapshot.forEach(function(doc) {

                const transaction =
                    doc.data();


                all_transaction.push(transaction);

            });


            console.log(
                "Transactions loaded from Firestore:"
            );

            console.log(all_transaction);


        }

        catch (error) {

            console.error(
                "Error loading transactions:",
                error
            );

            return;

        }


        // =========================
        // Store Account Totals
        // =========================

        let accountTotals = {};


        // Create default accounts first
        defaultAccounts.forEach(function(account) {

            accountTotals[account.value] = {

                income: 0,
                expense: 0

            };

        });


        // =========================
        // Calculate Transactions
        // =========================

        all_transaction.forEach(function(transaction) {

            let account =
                transaction.paymentAccount;


            // Cash
            if (transaction.paymentType === "cash") {

                account = "cash";

            }


            // Skip if there is no account
            if (!account) {

                return;

            }


            // If this is a custom account
            if (!accountTotals[account]) {

                accountTotals[account] = {

                    income: 0,
                    expense: 0

                };

            }


            // Add income
            if (transaction.type === "income") {

                accountTotals[account].income +=
                    transaction.amount;

            }


            // Add expense
            if (transaction.type === "expense") {

                accountTotals[account].expense +=
                    transaction.amount;

            }

        });


        // =========================
        // Get Payment Summary Area
        // =========================

        const paymentSummary =
            document.getElementById("paymentSummary");


        // Clear existing cards
        paymentSummary.innerHTML = "";


        // =========================
        // Display All Accounts
        // =========================

        for (let account in accountTotals) {

            const accountData =
                accountTotals[account];


            const accountCard =
                document.createElement("div");


            accountCard.className =
                "summary-account";


            // Find default account name
            let displayName =
                account;


            defaultAccounts.forEach(function(defaultAccount) {

                if (defaultAccount.value === account) {

                    displayName =
                        defaultAccount.name;

                }

            });


            // Create account card
            accountCard.innerHTML = `

                <h3>${displayName}</h3>

                <p>
                    Income:
                    <span>
                        RM ${accountData.income.toFixed(2)}
                    </span>
                </p>

                <p>
                    Expense:
                    <span>
                        RM ${accountData.expense.toFixed(2)}
                    </span>
                </p>

            `;


            // Add card to Summary
            paymentSummary.appendChild(accountCard);

        }

    }

    else {

        console.log("No user is logged in.");

    }

});