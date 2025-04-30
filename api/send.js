function tampilkanNotifikasi(text) {
  const notif = document.getElementById('notifikasi');
  notif.innerText = text;
  notif.style.top = '30px';
  setTimeout(() => {
    notif.style.top = '-50px';
  }, 1600);
}

async function mulaiSpam() {
  const username = document.getElementById("username").value;
  const pesan = document.getElementById("pesan").value;
  const log = document.getElementById("log");

  if (!username || !pesan) {
    tampilkanNotifikasi("Isi semua kolom dulu!");
    return;
  }

  tampilkanNotifikasi("Spam dimulai");

  for (let i = 1; i <= 10; i++) {
    try {
      const res = await fetch(`https://ngl.link/api/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          question: pesan,
          deviceId: "xxxxxxxxxxxxxx"
        }),
      });

      const text = await res.text();

      if (text.includes("ok")) {
        log.innerHTML += `<div>Pesan ke ${i} berhasil dikirim by villain</div>`;
      } else {
        log.innerHTML += `<div style="color:red">Pesan ke ${i} gagal dikirim</div>`;
      }
    } catch (e) {
      log.innerHTML += `<div style="color:red">Error jaringan saat kirim pesan ke ${i}</div>`;
    }

    await new Promise(r => setTimeout(r, 500)); // Delay 0.5 detik
  }

  tampilkanNotifikasi("**Spam selesai**");
}
