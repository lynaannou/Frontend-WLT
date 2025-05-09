// 🕒 GET DEADLINE (from localStorage, URL param, or hardcoded fallback)
let deadlineStr = localStorage.getItem("deadline"); // e.g. "2025-05-15T23:59:59"
if (!deadlineStr) {
  // fallback deadline if none is set — can also fetch from API
  deadlineStr = "2025-05-15T23:59:59";
}
const deadline = new Date(deadlineStr);

// 🔒 Locking logic and countdown
function updateDeadlineStatus() {
  const now = new Date();
  const isLocked = now > deadline;

  // ⏳ Show countdown
  const countdownDiv = document.getElementById("deadlineCountdown");
  const diff = deadline - now;

  if (isLocked) {
    countdownDiv.textContent = "⛔ La période de soumission est terminée.";
    disableForm();
  } else {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    countdownDiv.textContent = `⏳ Temps restant pour modifier votre fiche : ${days}j ${hours}h ${minutes}m ${seconds}s`;
  }
}

// 🔒 Disable form for locked users
function disableForm() {
  document.querySelectorAll("input, select").forEach(el => el.disabled = true);
  document.getElementById("next")?.setAttribute("disabled", "true");
  document.getElementById("prev")?.setAttribute("disabled", "true");
  document.getElementById("submitBtn")?.setAttribute("disabled", "true");
}

// 🕒 Update every second
setInterval(updateDeadlineStatus, 1000);


const name = localStorage.getItem("username") || "Professeur";
const email = localStorage.getItem("email") || "—";
// const grade = localStorage.getItem("grade"); // Removed static usage
const departement = localStorage.getItem("departement");

document.getElementById("displayUsername").textContent = name;
document.getElementById("displayEmail").textContent = email;

const storedGrade = localStorage.getItem("grade");
if (storedGrade) {
  document.getElementById("grade").value = storedGrade;
}


const niveaux = ["L1", "L2", "L3", "M1", "M2"];
const specialites = {
  ia: ["IA", "Data Science", "Robotique"],
  gl: ["GL", "DevOps", "Cloud"]
};
const modules = {
  ia: ["Deep Learning", "Réseaux de Neurones", "Vision Artificielle"],
  gl: ["Architecture Logicielle", "UML", "Développement Web"]
};

const sem1Rows = document.getElementById("sem1Rows");
const sem2Rows = document.getElementById("sem2Rows");

function generateRows(container, semTag) {
  for (let i = 1; i <= 3; i++) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>Choix ${i}</td>
      <td><select>${niveaux.map(n => `<option>${n}</option>`).join("")}</select></td>
      <td><select class="spec"><option>--</option></select></td>
      <td><select class="mod"><option>--</option></select></td>
      <td><input type="checkbox" class="${semTag}-cours" /></td>
      <td><input type="checkbox" class="${semTag}-td" /></td>
      <td><input type="checkbox" class="${semTag}-tp" /></td>
    `;
    container.appendChild(tr);
  }
}

generateRows(sem1Rows, "s1");
generateRows(sem2Rows, "s2");

const prev = document.getElementById("prev");
const next = document.getElementById("next");
const submitBtn = document.getElementById("submitBtn");
let step = 1;

next.addEventListener("click", () => {
  if (step === 1) {
    document.getElementById("semestre1").classList.add("hidden");
    document.getElementById("semestre2").classList.remove("hidden");
  } else if (step === 2) {
    document.getElementById("semestre2").classList.add("hidden");
    document.getElementById("questions").classList.remove("hidden");
    next.classList.add("hidden");
    submitBtn.classList.remove("hidden");
  }
  step++;
  prev.classList.remove("hidden");
});

prev.addEventListener("click", () => {
  if (step === 2) {
    document.getElementById("semestre1").classList.remove("hidden");
    document.getElementById("semestre2").classList.add("hidden");
    prev.classList.add("hidden");
  } else if (step === 3) {
    document.getElementById("semestre2").classList.remove("hidden");
    document.getElementById("questions").classList.add("hidden");
    next.classList.remove("hidden");
    submitBtn.classList.add("hidden");
  }
  step--;
});

// Filter options
function filterOptions() {
  const val = departement;
  if (!val) return;
  document.querySelectorAll(".spec").forEach(select => {
    select.innerHTML = specialites[val].map(s => `<option>${s}</option>`).join("");
  });
  document.querySelectorAll(".mod").forEach(select => {
    select.innerHTML = modules[val].map(s => `<option>${s}</option>`).join("");
  });
}

filterOptions();

// Hour restriction
function calculateAndRestrictHours() {
  const calc = prefix => {
    const cours = [...document.querySelectorAll(`.${prefix}-cours`)].filter(c => c.checked).length * 3;
    const td = [...document.querySelectorAll(`.${prefix}-td`)].filter(c => c.checked).length * 1.5;
    const tp = [...document.querySelectorAll(`.${prefix}-tp`)].filter(c => c.checked).length * 1.5;
    return cours + td + tp;
  };

  const s1 = calc("s1");
  const s2 = calc("s2");

  let s2Max = 12;
  if (s1 > 12) s2Max = Math.max(0, 24 - s1);

  document.getElementById("sem1Hours").textContent = `Total S1: ${s1}h (Max: 12h${s1 > 12 ? " [heures supp]" : ""})`;
  document.getElementById("sem2Hours").textContent = `Total S2: ${s2}h (Max: ${s2Max}h${s1 > 12 ? " ⚠ réduit car S1 dépasse" : ""})`;

  document.querySelectorAll(".s2-cours, .s2-td, .s2-tp").forEach(input => {
    if (!input.checked) {
      input.disabled = s2 >= s2Max;
    }
  });
}

document.querySelectorAll("input[type='checkbox']").forEach(cb => {
  cb.addEventListener("change", calculateAndRestrictHours);
});

// ✅ SUBMISSION LOGIC: now captures and stores dynamic grade
document.getElementById("submitBtn").addEventListener("click", () => {
  const grade = document.getElementById("grade").value;
  localStorage.setItem("grade", grade);

  alert("Fiche soumise !");
  window.location.href = "confirmation.html";
});
