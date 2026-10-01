//Store all the transaction
let all_transaction = []

// Get the Add Transaction button
const addButton = document.getElementById("addButton");

// Payment Method
const paymentType = document.getElementById("paymentType");
const accountSection = document.getElementById("accountSection");
const accountLabel = document.getElementById("accountLabel");
const paymentAccount = document.getElementById("paymentAccount");

// Category
const typeSelect = document.getElementById("type");
const categorySelect = document.getElementById("category");
const customCategory = document.getElementById("customCategory");

// Set today's date
const dateInput = document.getElementById("date");
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");

dateInput.value = `${year}-${month}-${day}`;

// Store the total amounts
let balance = 0;
let income = 0;
let expense = 0;

// Run when the button is clicked
addButton.addEventListener("click", function() {
    // Get the values from the form
    const type = document.getElementById("type").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("date").value;

    // convert amount from text to number
    const money = Number(amount);
    // check whether it is income or expense
    if(type === "income") {
        income += money;
        balance += money;
    } else if(type === "expense") {
        expense += money;
        balance -= money;
    }

    // Create a transaction object
    const transaction = {
        type: type,
        amount: Number(amount),
        category: category,
        paymentType: paymentType.value,
        paymentAccount: paymentAccount.value,
        description: description,
        date: date
    };

    // Add the transaction into the list
    all_transaction.push(transaction);

    //save transactions
    localStorage.setItem("transactions", JSON.stringify(all_transaction));
    
    // Show the values in the Console
    console.log(type);
    console.log(amount);
    console.log(category);
    console.log(description);
    console.log(date);
    console.log(transaction);
    console.log(all_transaction);

    // Update dashboard if the elements exist
    const balanceElement = document.getElementById("balance");
    const incomeElement = document.getElementById("income");
    const expenseElement = document.getElementById("expense");

    if (balanceElement) {
        balanceElement.textContent = "RM " + balance.toFixed(2);
    }

    if (incomeElement) {
        incomeElement.textContent = "RM " + income.toFixed(2);
    }

    if (expenseElement) {
        expenseElement.textContent = "RM " + expense.toFixed(2);
    }
})

// Change account options based on payment method
paymentType.addEventListener("change", function() {

    // Bank
    if (paymentType.value === "bank") {

        accountSection.style.display = "block";
        accountLabel.textContent = "Bank";

        paymentAccount.innerHTML = `
            <option value="">Select bank</option>
            <option value="public-bank">Public Bank</option>
            <option value="hong-leong-bank">Hong Leong Bank</option>
            <option value="maybank">Maybank</option>
            <option value="cimb">CIMB</option>
            <option value="rhb">RHB</option>
            <option value="other">Other</option>
        `;

    }

    // E-Wallet
    else if (paymentType.value === "e-wallet") {

        accountSection.style.display = "block";
        accountLabel.textContent = "E-Wallet";

        paymentAccount.innerHTML = `
            <option value="">Select e-wallet</option>
            <option value="tng">Touch 'n Go</option>
            <option value="grabpay">GrabPay</option>
            <option value="boost">Boost</option>
            <option value="other">Other</option>
        `;

    }

    // Cash
    else if (paymentType.value === "cash") {

        accountSection.style.display = "none";
        paymentAccount.value = "";

    }

    // Nothing selected
    else {

        accountSection.style.display = "none";
        paymentAccount.value = "";

    }

});

// Change category options based on type
typeSelect.addEventListener("change", function() {

    // Income categories
    if (typeSelect.value === "income") {

        categorySelect.innerHTML = `
            <option value="">Select category</option>
            <option value="salary">Salary</option>
            <option value="bonus">Bonus</option>
            <option value="other">Other</option>
        `;

    }

    // Expense categories
    else if (typeSelect.value === "expense") {

        categorySelect.innerHTML = `
            <option value="">Select category</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="shopping">Shopping</option>
            <option value="bills">Bills</option>
            <option value="entertainment">Entertainment</option>
            <option value="other">Other</option>
        `;

    }

    // Nothing selected
    else {

        categorySelect.innerHTML = `
            <option value="">Select category</option>
        `;

    }

});

typeSelect.dispatchEvent(new Event("change"));

// Show custom category when Other is selected
categorySelect.addEventListener("change", function() {

    if (categorySelect.value === "other") {

        customCategory.style.display = "block";

    } else {

        customCategory.style.display = "none";
        customCategory.value = "";

    }

});