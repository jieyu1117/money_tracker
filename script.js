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


            console.log("Transactions loaded from Firestore:");
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
        // Calculate Income & Expense
        // =========================

        let totalIncome = 0;

        let totalExpense = 0;


        all_transaction.forEach(function(transaction) {

            if (transaction.type === "income") {

                totalIncome += transaction.amount;

            }


            if (transaction.type === "expense") {

                totalExpense += transaction.amount;

            }

        });


        // Calculate balance
        const totalBalance =
            totalIncome - totalExpense;


        // =========================
        // Update Dashboard
        // =========================

        const balanceElement =
            document.getElementById("balance");

        const incomeElement =
            document.getElementById("income");

        const expenseElement =
            document.getElementById("expense");


        if (balanceElement) {

            balanceElement.textContent =
                "RM " + totalBalance.toFixed(2);

        }


        if (incomeElement) {

            incomeElement.textContent =
                "RM " + totalIncome.toFixed(2);

        }


        if (expenseElement) {

            expenseElement.textContent =
                "RM " + totalExpense.toFixed(2);

        }


        // =========================
        // Update Income & Expense Chart
        // =========================

        const chart =
            document.querySelector(".chart");

        const chartIncome =
            document.getElementById("chartIncome");

        const chartExpense =
            document.getElementById("chartExpense");

        const chartBalance =
            document.getElementById("chartBalance");


        const totalMoney =
            totalIncome + totalExpense;


        if (
            chart &&
            chartIncome &&
            chartExpense &&
            chartBalance
        ) {

            // Show income
            chartIncome.textContent =
                "RM " + totalIncome.toFixed(2);


            // Show expense
            chartExpense.textContent =
                "RM " + totalExpense.toFixed(2);


            // Show balance
            chartBalance.textContent =
                "RM " + totalBalance.toFixed(2);


            // Update chart
            if (totalMoney > 0) {

                const incomePercentage =
                    (totalIncome / totalMoney) * 100;


                chart.style.background =
                    `conic-gradient(
                        #4ade80 0% ${incomePercentage}%,
                        #f87171 ${incomePercentage}% 100%
                    )`;

            }

        }

    }

    else {

        console.log("No user is logged in.");

    }

});