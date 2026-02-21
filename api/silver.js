export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  try {
    const apiRes = await fetch("https://api.metals.live/v1/spot/silver");
    const json = await apiRes.json();

    res.status(200).json(json[0]);
  } catch (err) {
    res.status(500).json({ error: "API error", details: String(err) });
  }
}
