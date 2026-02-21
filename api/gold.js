export default async function handler(req, res) {
  try {
    const apiKey = process.env.GOLDAPI_KEY;

    const upstream = await fetch("https://www.goldapi.io/api/XAU/EUR", {
      headers: {
        "x-access-token": apiKey,
        "Content-Type": "application/json"
      }
    });

    if (!upstream.ok) {
      return res.status(upstream.status).json({
        error: "Upstream API error",
        status: upstream.status
      });
    }

    const data = await upstream.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      error: "Proxy error",
      details: err.message
    });
  }
}
