function validateForm() {
    const fields = [
        { id: "fullName", label: "Full Name" },
        { id: "mobileCountry", label: "Mobile Country" },
        { id: "mobileNumber", label: "Mobile Number" },
        { id: "email", label: "Email" },
        { id: "confirmEmail", label: "Confirm Email" },
        { id: "gender", label: "Gender" }
    ];

    let formValid = true;

    for (const field of fields) {
        const input = document.getElementById(field.id);
        const value = input.value.trim();
        const errorLabel = document.getElementById(`${field.id}-error`);

        if (value === "") {
            errorLabel.textContent = `${field.label} is required`;
            formValid = false;
        } else {
            errorLabel.textContent = "";
        }
    }

    if (formValid) {
        document.getElementById("ticketForm").submit();
    }
}
