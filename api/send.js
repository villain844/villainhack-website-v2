// api/send.js (gunakan di Vercel sebagai serverless function)
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { username, message } = req.body;

  if (!username || !message) {
    return res.status(400).json({ success: false, error: 'Username dan pesan wajib diisi' });
  }

  try {
    const response = await fetch("https://ngl.link/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: username.replace(/^@/, ""),
        question: message,
        deviceId: "d3eb7d3e-a2d1-4fae-9f87-example" // bisa diganti bebas
      }).toString()
    });

    if (!response.ok) {
      return res.status(500).json({ success: false, error: "Gagal mengirim ke server NGL" });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
