document.addEventListener("DOMContentLoaded", function () {
    // Untuk password pertama
    const togglePassword = document.querySelector("#togglePassword");
    const password = document.querySelector("#password");

    // Untuk konfirmasi password
    const toggleConfirmPassword = document.querySelector(
        "#toggleConfirmPassword"
    );
    const confirmPassword = document.querySelector("#confirmPassword");

    // Fungsi untuk toggle visibility
    function setupPasswordToggle(toggleElement, passwordElement) {
        if (toggleElement && passwordElement) {
            toggleElement.addEventListener("click", function () {
                // Toggle the type attribute
                const type =
                    passwordElement.getAttribute("type") === "password"
                        ? "text"
                        : "password";
                passwordElement.setAttribute("type", type);

                // Toggle the eye icon
                this.classList.toggle("fa-eye");
                this.classList.toggle("fa-eye-slash");
            });
        }
    }

    // Setup untuk kedua password fields
    setupPasswordToggle(togglePassword, password);
    setupPasswordToggle(toggleConfirmPassword, confirmPassword);
});
