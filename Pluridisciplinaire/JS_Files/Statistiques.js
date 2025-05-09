
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:8080/api/form/stats")
    .then(res => {
      if (!res.ok) throw new Error("Échec de chargement des statistiques");
      return res.json();
    })
    .then(stats => {
      const total = stats.approvedCount + stats.pendingCount;
      const hasData = total > 0 || stats.profCount > 0 || stats.moduleCount > 0;

      const profCount = document.getElementById("profCount");
      const moduleCount = document.getElementById("moduleCount");
      const approvedCount = document.getElementById("approvedCount");
      const pendingCount = document.getElementById("pendingCount");

      if (hasData) {
        document.getElementById("noData").classList.add("hidden");
        document.getElementById("statsSection").classList.remove("hidden");

        profCount.textContent = stats.profCount;
        moduleCount.textContent = stats.moduleCount;
        approvedCount.textContent = stats.approvedCount;
        pendingCount.textContent = stats.pendingCount;

        const ctxBar = document.getElementById("barChart").getContext("2d");
        new Chart(ctxBar, {
          type: "bar",
          data: {
            labels: ["Professeurs", "Modules", "Validées", "En Attente"],
            datasets: [{
              label: "Nombre",
              data: [stats.profCount, stats.moduleCount, stats.approvedCount, stats.pendingCount],
              backgroundColor: ["#8e44ad", "#5FA9DD", "#27ae60", "#e67e22"],
              borderRadius: 8,
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: { color: "#fff" },
                grid: { color: "rgba(255,255,255,0.1)" }
              },
              x: {
                ticks: { color: "#fff" },
                grid: { color: "rgba(255,255,255,0.1)" }
              }
            },
            plugins: {
              legend: {
                labels: { color: "#fff" }
              }
            }
          }
        });

        const ctxPie = document.getElementById("pieChart").getContext("2d");
        new Chart(ctxPie, {
          type: "pie",
          data: {
            labels: ["Validées", "En Attente"],
            datasets: [{
              data: [stats.approvedCount, stats.pendingCount],
              backgroundColor: ["#8e44ad", "#5FA9DD"],
              borderWidth: 1,
            }]
          },
          options: {
            plugins: {
              legend: {
                labels: { color: "#fff" }
              }
            }
          }
        });

      } else {
        document.getElementById("statsSection").classList.add("hidden");
        document.getElementById("noData").classList.remove("hidden");
      }
    })
    .catch(error => {
      console.error("Erreur de chargement des statistiques :", error);
      document.getElementById("statsSection").classList.add("hidden");
      document.getElementById("noData").classList.remove("hidden");
    });
});
