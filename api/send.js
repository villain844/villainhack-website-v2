export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metode tidak diizinkan' });
  }

  const { username, message } = req.body;

  if (!username || !message) {
    return res.status(400).json({ error: 'Username dan pesan harus diisi' });
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

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
