// Example of saving mock data for confirmation (replace with real values)
localStorage.setItem("sem1Choices", JSON.stringify(["L3 Info - Algorithmique", "M1 AI - Vision", "M2 Cloud - Sécurité"]));
localStorage.setItem("sem2Choices", JSON.stringify(["L2 Math - Analyse", "M1 Data - Python"]));
localStorage.setItem("extraQuestions", JSON.stringify([
  "Heures supplémentaires : Oui (12h)",
  "PFE Licence : 3",
  "PFE Master : 2"
]));

// Then redirect
window.location.href = "confirmation.html";
