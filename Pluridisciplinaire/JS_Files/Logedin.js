document.addEventListener("DOMContentLoaded", function () {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    // Display stored user data
    if (username) {
        document.getElementById("displayUsername").textContent = username;
    }

    if (email) {
        document.getElementById("displayEmail").textContent = email;

        // Admin role check
        const isAdmin = email.toLowerCase() === "admin@email.com";
        const statLink = document.getElementById("statLink");

        if (!isAdmin && statLink) {
            statLink.style.display = "none";
        }
    }
});
