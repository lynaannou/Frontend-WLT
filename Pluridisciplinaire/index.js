console.log("hi");

document.addEventListener("DOMContentLoaded", () => {
  // LOGIN
  const loginButton = document.querySelector(".LoginButton");
  const usernameInput = document.querySelector(".Username");
  const passwordInput = document.querySelector(".Password");

  if (loginButton && usernameInput && passwordInput) {
    loginButton.addEventListener("click", (e) => {
      e.preventDefault();

      const username = usernameInput.value;
      const password = passwordInput.value;

      fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: username, password: password })
      })
        .then(res => {
          if (!res.ok) throw new Error("Login failed");
          return res.json();
        })
        .then(data => {
          alert("Login successful!");
          localStorage.setItem("token", data.token); // optional
          window.location.href = "../Pluridisciplinaire/index.html";
        })
        .catch(err => {
          alert("Login error: " + err.message);
        });
    });
  }

  // PANEL TOGGLES
  const registerBtn = document.getElementById("register");
  const alreadyLoginBtn = document.getElementById("aleady_login");

  if (registerBtn) {
    registerBtn.addEventListener("click", () => {
      document.getElementById("already").classList.remove("hidden");
      document.getElementById("already").classList.add("move-right");
      document.getElementById("login").classList.add("hidden");
      document.getElementById("registerr").classList.remove("hidden");
      document.getElementById("registerr").classList.add("move-left");
      document.getElementById("welcome").classList.add("hidden");
    });
  }

  if (alreadyLoginBtn) {
    alreadyLoginBtn.addEventListener("click", () => {
      document.getElementById("already").classList.add("hidden");
      document.getElementById("login").classList.remove("move-right");
      document.getElementById("login").classList.remove("hidden");
      document.getElementById("registerr").classList.add("hidden");
      document.getElementById("registerr").classList.remove("move-left");
      document.getElementById("welcome").classList.remove("hidden");
    });
  }

  // PRELOADER
  setTimeout(() => {
    document.getElementById("preload").classList.add("hidden");
    document.getElementById("container").classList.remove("hidden");
  }, 2000);

  // TOGGLE PASSWORD VISIBILITY
  const passwordIcon = document.getElementById("password");
  const passwordField = document.getElementById("passwordInput");
  if (passwordIcon && passwordField) {
    passwordIcon.addEventListener("click", () => {
      const type = passwordField.getAttribute("type");
      passwordField.setAttribute("type", type === "password" ? "text" : "password");
    });
  }
});
