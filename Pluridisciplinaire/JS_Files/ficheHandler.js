
import { submitFiche } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("submitBtn");

  submitBtn.addEventListener("click", async () => {
    const professeurId = 1; // TODO: remplacer par un vrai ID récupéré via l'authentification
    const name = localStorage.getItem("username") || "Professeur";
    const email = localStorage.getItem("email") || "—";
    const grade = localStorage.getItem("grade") || "";
    const departement = localStorage.getItem("departement") || "";

    const collectModules = (semTag) => {
      const rows = document.querySelectorAll(`#semestre${semTag === 's1' ? 1 : 2} .table tbody tr`);
      return Array.from(rows).map(row => {
        const cells = row.querySelectorAll("td");
        return {
          niveau: cells[1].querySelector("select").value,
          specialite: cells[2].querySelector("select").value,
          module: cells[3].querySelector("select").value,
          cours: cells[4].querySelector("input").checked,
          td: cells[5].querySelector("input").checked,
          tp: cells[6].querySelector("input").checked,
        };
      });
    };

    const semestre1 = collectModules("s1");
    const semestre2 = collectModules("s2");

    const questions = {
      "Heures supplémentaires S1": document.getElementById("extra1").value,
      "Heures supplémentaires S2": document.getElementById("extra2").value,
      "PFE Licence": document.getElementById("pfeL").value,
      "PFE Master": document.getElementById("pfeM").value,
      "Grade": grade,
      "Bureau": document.getElementById("numBureau").value,
      "Email Préféré": document.getElementById("emailPref").value
    };

    const fiche = {
      professeurId,
      name,
      email,
      grade,
      departement,
      semestre1,
      semestre2,
      questions
    };

    try {
      await submitFiche(fiche);
      alert("Fiche soumise avec succès !");
      localStorage.setItem("sem1Choices", JSON.stringify(semestre1.map((s, i) => `${s.module}`)));
      localStorage.setItem("sem2Choices", JSON.stringify(semestre2.map((s, i) => `${s.module}`)));
      localStorage.setItem("extraQuestions", JSON.stringify(Object.entries(questions).map(([k, v]) => `${k} : ${v}`)));
      window.location.href = "confirmation.html";
    } catch (err) {
      alert("Erreur lors de la soumission de la fiche.");
      console.error(err);
    }
  });
});
