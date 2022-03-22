document.getElementById("invalid-message").style.display = "none";
document.getElementById("income-message").style.display = "none";
document.getElementById("earning-message").style.display = "none";
document.getElementById("error-pos-msg").style.display = "none";
document.getElementById("error-msg").style.display = "none";
document.getElementById("error-msg2").style.display = "none";

// get input value
function getValue(id) {
    const inputField = document.querySelector(id);
    const inputValue = parseFloat(inputField.value);
    return inputValue;
}

// total spent amount
function getTotalSpend() {
    const forFood = getValue("#foodExpensesInput");
    const forRent = getValue("#rentExpensesInput");
    const forClothes = getValue("#clothesExpensesInput");
    const totalSpendField = getValue("#totalExpenses");
    const totalSpending = forFood + forRent + forClothes;
    if (
        isNaN(forFood) ||
        isNaN(forRent) ||
        isNaN(forClothes) ||
        forFood < 0 ||
        forRent < 0 ||
        forClothes < 0
    ) {
        document.getElementById("invalid-message").style.display = "block";
        totalSpendField.innerText = "";
    } else {
        return totalSpending;
    }
}

window.addEventListener("load", () => {
    document.getElementById("calculate-btn").addEventListener("click", () => {
        const totalIncome = getValue("#incomeInput");
        const totalSpending = getTotalSpend();
        //Error Handling for Negative Value and Earning < Spend
        if (totalIncome <= 0) {
            document.getElementById("invalid-message").style.display = "block";
        } else if (isNaN(totalIncome)) {
            document.getElementById("income-message").style.display = "block";
            alert("Please enter your Total Income");
        } else if (totalIncome < totalSpending) {
            document.getElementById("earning-message").style.display = "block";
        } else {
            if (typeof totalSpending !== "number") {} else {
                // Updating total spending to the Total Spending Field
                const totalExpenses = document.getElementById("totalExpenses");
                totalExpenses.innerText = totalSpending;

                // Updating New balance to the New Balance Field
                const newBalance = totalIncome - totalSpending;
                const newBalanceField = document.getElementById("balance");
                newBalanceField.innerText = newBalance;
            }
        }
    });

    document.getElementById("save").addEventListener("click", () => {
        //Gets The New Balance
        const newBalanceField = document.getElementById("balance");
        const newBalance = parseFloat(newBalanceField.innerText);
        const totalIncome = getValue("#incomeInput");
        const totalExpenses = document.getElementById("totalExpenses");
        const totalSpending = parseFloat(totalExpenses.innerText);

        //Updates the saving amount
        const percentage = getValue("#percentage");
        const savingAmount = totalIncome * (percentage / 100);

        // Updates Remaining Balance
        const remainingBalance = newBalance - savingAmount;

        //Error handling for Saving Button and Saving Amount
        if (percentage < 0) {
            document.getElementById("error-pos-msg").style.display = "block";
        } else if (totalIncome < savingAmount) {
            document.getElementById("error-msg2").style.display = "block";
        } else if (remainingBalance < 0) {
            document.getElementById("error-msg").style.display = "block";
        } else {
            const savingField = document.getElementById("saving-amount");
            savingField.innerText = savingAmount;
            const remainingBalanceField =
                document.getElementById("remaining-balance");
            remainingBalanceField.innerText = remainingBalance;
        }

        // Clears out Input Field
        const input = Array.from(document.querySelectorAll("input"));
        input.forEach((e) => {
            e.value = "";
        });
    });
});