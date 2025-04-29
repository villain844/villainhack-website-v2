export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Metode tidak diizinkan' });
  }

  const { username, message } = req.body;

  if (!username || !message) {
    return res.status(400).json({ success: false, message: 'Username dan pesan tidak boleh kosong' });
  }

  try {
    const payload = {
      question: message,
      deviceId: generateId(),
      gameSlug: '',
      language: 'id',
    };

    const response = await fetch(`https://ngl.link/api/submit?username=${username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Gagal mengirim ke ngl.link');
    }

    return res.status(200).json({ success: true, message: 'Berhasil terkirim' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Terjadi kesalahan saat mengirim pesan' });
  }
}

function generateId() {
  let id = '';
  const chars = 'abcdef0123456789';
  for (let i = 0; i < 16; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}
