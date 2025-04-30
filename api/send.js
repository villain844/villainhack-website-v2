export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metode tidak diizinkan' });
  }

  const { username, message } = req.body;

  if (!username || !message) {
    return res.status(400).json({ error: 'Username dan pesan diperlukan' });
  }

  try {
    const response = await fetch(`https://ngl.link/api/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        username,
        question: message,
        deviceId: 'aaaaaaaaaaaaaaaa', // ID statis agar tetap bisa kirim
        gameSlug: '',
        referrer: ''
      })
    });

    const data = await response.json();

    if (data && data.success) {
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ success: false, error: 'Gagal mengirim pesan' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Terjadi kesalahan' });
  }
}
