export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, message } = req.body;

  try {
    const response = await fetch('https://ngl.link/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        username,
        question: message,
        deviceId: 'xxx' + Math.random().toString().slice(2, 12),
      }),
    });

    res.status(200).json({ message: 'Berhasil dikirim!' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengirim!' });
  }
}
