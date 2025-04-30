// public/api/send.js

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method not allowed');

  const { username, message } = req.body;

  if (!username || !message) {
    return res.status(400).json({ error: 'Username and message are required' });
  }

  try {
    const response = await fetch(`https://ngl.link/api/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0'
      },
      body: new URLSearchParams({
        username: username,
        question: message,
        deviceId: 'aaaa', // Static value, can be randomized
        gameSlug: '',
        referrer: ''
      }).toString()
    });

    const data = await response.json();

    if (data.success) {
      return res.status(200).json({ success: true, message: 'Pesan berhasil dikirim!' });
    } else {
      return res.status(500).json({ error: 'Gagal mengirim pesan' });
    }

  } catch (error) {
    return res.status(500).json({ error: 'Terjadi kesalahan saat menghubungi NGL' });
  }
                                 }
