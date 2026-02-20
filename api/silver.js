export default async function handler(req, res) {
  try {
    const response = await fetch("https://www.goldapi.io/api/XAG/EUR", {
      headers: {
        "x-access-token": process.env.GOLDAPI_KEY,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error: "API Fehler", details: error.toString() });
  }
}
