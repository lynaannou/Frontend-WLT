console.log("hi");

document.addEventListener("DOMContentLoaded", () => {
  const registerButton = document.getElementById("register");
  const loginButton = document.getElementById("aleady_login");
  const preload = document.getElementById("preload");
  const container = document.getElementById("container");

  const alreadySection = document.getElementById("already");
  const loginSection = document.getElementById("login");
  const registerSection = document.getElementById("registerr");
  const welcomeSection = document.getElementById("welcome");

  // Preloader Fade Out (After 2s)
  setTimeout(() => {
    preload.classList.add("hidden");
    container.classList.remove("hidden");
  }, 2000);

  // Transition to Register Panel
  registerButton.addEventListener("click", () => {
    // Show register side + blue login prompt
    alreadySection.classList.remove("hidden");
    alreadySection.classList.add("move-right", "blue-panel");
    alreadySection.classList.remove("purple-panel");

    // Show register form
    registerSection.classList.remove("hidden");
    registerSection.classList.add("move-left");

    // Hide login stuff
    loginSection.classList.add("hidden");
    welcomeSection.classList.add("hidden");
    welcomeSection.classList.remove("purple-panel");
  });

  // Transition to Login Panel
  loginButton.addEventListener("click", () => {
    // Hide register-side login prompt
    alreadySection.classList.add("hidden");
    alreadySection.classList.remove("move-right", "blue-panel");

    // Hide register form
    registerSection.classList.add("hidden");
    registerSection.classList.remove("move-left");

    // Show login form
    loginSection.classList.remove("hidden");

    // Show welcome side in purple again
    welcomeSection.classList.remove("hidden");
    welcomeSection.classList.add("purple-panel");
  });

  // Toggle Password Visibility (clicking key icon)
  const passwordIcon = document.getElementById("password");
  const passwordInput = document.getElementById("password_fill");

  if (passwordIcon && passwordInput) {
    passwordIcon.addEventListener("click", () => {
      const isHidden = passwordInput.type === "password";
      passwordInput.type = isHidden ? "text" : "password";
    });
  }
});
