const sendSpam = async () => {
  const username = document.getElementById("username").value.trim();
  const message = document.getElementById("message").value.trim();
  const amount = parseInt(document.getElementById("amount").value.trim());
  const logBox = document.getElementById("log");

  if (!username || !message || isNaN(amount) || amount <= 0) {
    showNotification("Isi semua kolom dengan benar!", "error");
    return;
  }

  logBox.innerHTML = "";
  showNotification("Spam dimulai", "start");

  let successCount = 0;

  for (let i = 1; i <= amount; i++) {
    try {
      const res = await fetch("https://ngl.link/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `username=${username}&question=${encodeURIComponent(message)}&deviceId=${generateId()}`
      });

      if (res.ok) {
        successCount++;
        logBox.innerHTML += `<p>Pesan ke ${i} berhasil terkirim by 𓆩villain host𓆪</p>`;
      } else {
        logBox.innerHTML += `<p style="color:red;">Pesan ke ${i} gagal dikirim</p>`;
      }
    } catch (error) {
      logBox.innerHTML += `<p style="color:red;">Pesan ke ${i} gagal dikirim</p>`;
    }

    await new Promise(resolve => setTimeout(resolve, 500));
  }

  showNotification(`**Spam selesai** (${successCount}/${amount})`, "done");
};

const generateId = () => {
  const chars = "abcdef1234567890";
  let id = "";
  for (let i = 0; i < 32; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
};

const showNotification = (message, type) => {
  const notif = document.createElement("div");
  notif.className = `notif ${type}`;
  notif.innerHTML = message;
  document.body.appendChild(notif);

  setTimeout(() => {
    notif.style.top = "30px";
  }, 50);

  setTimeout(() => {
    notif.style.top = "-100px";
    setTimeout(() => notif.remove(), 400);
  }, 1600);
};
