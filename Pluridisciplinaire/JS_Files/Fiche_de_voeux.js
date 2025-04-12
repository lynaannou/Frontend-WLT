const choix1 = document.getElementById("choix_1");
const choix2 = document.getElementById("choix_2");
const extraQuestions = document.getElementById("extra_questions");
const previousBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");

let step = 1;

function showStep(step) {
  choix1.classList.add("hidden");
  choix2.classList.add("hidden");
  extraQuestions.classList.add("hidden");

  if (step === 1) {
    choix1.classList.remove("hidden");
  } else if (step === 2) {
    choix2.classList.remove("hidden");
  } else if (step === 3) {
    extraQuestions.classList.remove("hidden");
  }

  // Show/hide buttons accordingly
  previousBtn.style.display = step > 1 ? "block" : "none";
  nextBtn.style.display = step < 3 ? "block" : "none";
}

// Initial
showStep(step);

nextBtn.addEventListener("click", () => {
  if (step < 3) {
    step++;
    showStep(step);
  }
});

previousBtn.addEventListener("click", () => {
  if (step > 1) {
    step--;
    showStep(step);
  }
});
document.getElementById("doneBtn").addEventListener("click", () => {
    // Optional: store final confirmation flag
    localStorage.setItem("ficheCompleted", true);
  
    // Redirect to confirmation page
    window.location.href = "confirmation.html";
  });
  