export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  try {
    const API_URL = "https://metals-api.com/api/latest?access_key=DEIN_KEY&base=EUR&symbols=XAG";

    const apiResponse = await fetch(API_URL, { cache: "no-store" });

    if (!apiResponse.ok) {
      return res.status(500).json({
        error: "Upstream API returned non-OK status",
        status: apiResponse.status,
      });
    }

    const data = await apiResponse.json();

    if (!data || typeof data !== "object") {
      return res.status(500).json({ error: "Invalid upstream API response" });
    }

    const pricePerGram = data.rates.XAG / 31.1034768;

    return res.status(200).json({
      price_gram_24k: pricePerGram,
      raw: data,
    });

  } catch (err) {
    return res.status(500).json({
      error: "Proxy Error",
      message: err.message,
      stack: String(err),
    });
  }
}
