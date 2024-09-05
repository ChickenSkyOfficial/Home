// pages/api/player-count.js
export default async function handler(req, res) {
  const ip = "play.dawn-mc.net";
  const port = "25565";

  try {
    const response = await fetch(`https://mcapi.us/server/status?ip=${ip}&port=${port}`);

    // Logge den Antworttext für Debugging
    const text = await response.text();
    console.log("API response text:", text);

    // Überprüfe, ob der Text tatsächlich JSON ist
    try {
      const data = JSON.parse(text);

      if (data.status === "error") {
        return res.status(500).json({ error: data.error });
      }

      res.status(200).json({ count: data.players.now });
    } catch (jsonError) {
      return res.status(500).json({ error: "Response is not valid JSON" });
    }
  } catch (error) {
    console.error("Error fetching server data:", error);
    res.status(500).json({ error: error.message });
  }
}
