document.addEventListener("DOMContentLoaded", function () {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    if (username) {
        document.getElementById("displayUsername").textContent = username;
    }
    if (email) {
        document.getElementById("displayEmail").textContent = email;
    }
});