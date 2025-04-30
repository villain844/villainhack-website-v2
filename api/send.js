export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST method only' });
  }

  const { username, message } = req.body;
  if (!username || !message) {
    return res.status(400).json({ error: 'Username dan pesan wajib diisi' });
  }

  try {
    const response = await fetch("https://ngl.link/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        username,
        question: message,
        deviceId: crypto.randomUUID()
      })
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ success: false, error: 'Gagal kirim ke NGL' });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Terjadi kesalahan server' });
  }
}
