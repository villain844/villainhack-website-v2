export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, message } = req.body;

  try {
    const response = await fetch(`https://ngl.link/api/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        username,
        question: message,
        deviceId: 'random_id_' + Math.floor(Math.random() * 100000)
      })
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ success: false });
    }
  } catch {
    return res.status(500).json({ success: false });
  }
}
