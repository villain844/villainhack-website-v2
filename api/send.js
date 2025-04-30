export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { username, message } = req.body;

  if (!username || !message) {
    return res.status(400).json({ success: false, error: 'Username dan pesan wajib diisi.' });
  }

  try {
    const payload = {
      question: message,
      deviceId: "unique-device-id",
      gameSlug: "",
      referrer: ""
    };

    const response = await fetch(`https://ngl.link/api/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      },
      body: JSON.stringify({
        ...payload,
        username: username
      })
    });

    if (!response.ok) {
      return res.status(500).json({ success: false, error: 'Gagal mengirim pesan ke NGL.' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Terjadi kesalahan server.' });
  }
}
