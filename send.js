async function kirim() {
  const username = document.getElementById("username").value;
  const message = document.getElementById("message").value;
  const jumlah = parseInt(document.getElementById("jumlah").value) || 1;
  const log = document.getElementById("log");

  showNotif("Spam dimulai");

  for (let i = 1; i <= jumlah; i++) {
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username, message })
      });

      if (res.ok) {
        log.innerHTML += `<div>Pesan ke ${i} berhasil terkirim by villain</div>`;
      } else {
        log.innerHTML += `<div>Pesan ke ${i} gagal terkirim</div>`;
      }
    } catch {
      log.innerHTML += `<div>Pesan ke ${i} error terkirim</div>`;
    }

    await new Promise(r => setTimeout(r, 500)); // delay 0.5 detik
  }

  showNotif("SPAM SELESAI");
}

function showNotif(text) {
  const notif = document.getElementById("notif");
  notif.textContent = text;
  notif.classList.add("show");
  setTimeout(() => notif.classList.remove("show"), 1600);
}
