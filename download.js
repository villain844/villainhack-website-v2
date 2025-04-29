export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Metode tidak diizinkan' });
  }

  const { url } = req.body;
  if (!url || !url.includes('tiktok.com')) {
    return res.status(400).json({ success: false, message: 'Link tidak valid' });
  }

  try {
    const fetchRes = await fetch(`https://api.tiklydown.me/api/download?url=${encodeURIComponent(url)}`);
    const data = await fetchRes.json();

    if (data.nowatermark) {
      res.status(200).json({ success: true, downloadUrl: data.nowatermark });
    } else {
      res.status(500).json({ success: false, message: 'Gagal mengambil video' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
