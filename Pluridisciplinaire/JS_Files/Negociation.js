document.addEventListener("DOMContentLoaded", () => {
    const chatWindow = document.getElementById("chatWindow");
    const chatForm = document.getElementById("chatForm");
    const messageInput = document.getElementById("messageInput");
  
    const adminStats = document.getElementById("adminStats");
    const totalCount = document.getElementById("totalCount");
    const adminCount = document.getElementById("adminCount");
    const profCount = document.getElementById("profCount");
    const seenCount = document.getElementById("seenCount");
    const unseenCount = document.getElementById("unseenCount");
  
    const isAdmin = true; // Set this to `false` for professors
  
    const messages = [
      { from: "admin", text: "Bonjour professeur, avez-vous des préférences pour le module?", status: "seen" },
      { from: "prof", text: "J'aimerais enseigner le cours de base de données cette année.", status: "delivered" },
      { from: "admin", text: "Parfait, nous allons essayer d’accommoder cela.", status: "seen" }
    ];
  
    function renderMessages() {
      chatWindow.innerHTML = "";
      messages.forEach((msg, index) => {
        const div = document.createElement("div");
        div.classList.add("message", msg.from);
        div.setAttribute("data-status", msg.from === "prof" ? (msg.status === "seen" ? "👁 Vu" : "✔ Envoyé") : "");
        div.textContent = msg.text;
        chatWindow.appendChild(div);
      });
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  
    function updateStats() {
      if (!isAdmin) return;
      adminStats.classList.remove("hidden");
  
      const total = messages.length;
      const adminMsgs = messages.filter(m => m.from === "admin").length;
      const profMsgs = total - adminMsgs;
      const seen = messages.filter(m => m.status === "seen").length;
      const delivered = messages.filter(m => m.status === "delivered").length;
  
      totalCount.textContent = total;
      adminCount.textContent = adminMsgs;
      profCount.textContent = profMsgs;
      seenCount.textContent = seen;
      unseenCount.textContent = delivered;
    }
  
    chatForm.addEventListener("submit", e => {
      e.preventDefault();
      const newMessage = messageInput.value.trim();
      if (!newMessage) return;
  
      messages.push({
        from: "prof",
        text: newMessage,
        status: "delivered"
      });
  
      console.log("[Send to backend + email]:", newMessage);
      messageInput.value = "";
      renderMessages();
      updateStats();
    });
  
    // Simulate admin seeing all messages after 5 seconds
    if (isAdmin) {
      setTimeout(() => {
        messages.forEach(msg => {
          if (msg.status === "delivered") {
            msg.status = "seen";
          }
        });
        renderMessages();
        updateStats();
      }, 5000);
    }
  
    renderMessages();
    updateStats();
  });
  