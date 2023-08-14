document.addEventListener("DOMContentLoaded", function() {
    const cardNumberInput = document.getElementById("card-number");
    const expirationInput = document.getElementById("expiration");
    const cvvInput = document.getElementById("cvv");
    const paymentForm = document.getElementById("payment-form");
    const paymentTableBody = document.getElementById("payment-table-body");

    document.getElementById("submit-payment").addEventListener("click", function() {
        const cardNumber = cardNumberInput.value;
        const expiration = expirationInput.value;
        const cvv = cvvInput.value;

        // Clear previous error messages
        clearError(cardNumberInput);
        clearError(expirationInput);
        clearError(cvvInput);

        if (!cardNumber) {
            displayError(cardNumberInput, "Please fill in the card number.");
        }
        if (!expiration) {
            displayError(expirationInput, "Please fill in the expiration date.");
        }
        if (!cvv) {
            displayError(cvvInput, "Please fill in the CVV.");
        }

        if (cardNumber && expiration && cvv) {
            // Save payment data to local storage
            savePaymentData(cardNumber, expiration, cvv);

            // Clear form inputs
            cardNumberInput.value = "";
            expirationInput.value = "";
            cvvInput.value = "";

            // Update the payment table
            updatePaymentTable();
        }
    });

    function displayError(inputElement, errorMessage) {
        const errorDiv = inputElement.nextElementSibling;
        errorDiv.textContent = errorMessage;
    }

    function clearError(inputElement) {
        const errorDiv = inputElement.nextElementSibling;
        errorDiv.textContent = "";
    }

    function savePaymentData(cardNumber, expiration, cvv) {
        const paymentData = JSON.parse(localStorage.getItem("paymentData")) || [];
        paymentData.push({ cardNumber, expiration, cvv });
        localStorage.setItem("paymentData", JSON.stringify(paymentData));
    }

    function updatePaymentTable() {
        paymentTableBody.innerHTML = "";
        const paymentData = JSON.parse(localStorage.getItem("paymentData")) || [];

        for (const payment of paymentData) {
            const row = document.createElement("tr");
            const cardNumberCell = document.createElement("td");
            const expirationCell = document.createElement("td");
            const cvvCell = document.createElement("td");

            cardNumberCell.textContent = payment.cardNumber;
            expirationCell.textContent = payment.expiration;
            cvvCell.textContent = payment.cvv;

            row.appendChild(cardNumberCell);
            row.appendChild(expirationCell);
            row.appendChild(cvvCell);
            paymentTableBody.appendChild(row);
        }
    }

    // Initial table population
    updatePaymentTable();
});

