export default async function handler(req, res) {
  try {
    const { text } = req.body;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: "You generate high-converting ad copy." },
          { role: "user", content: text }
        ]
      })
    });

    const data = await response.json();
    const ad = data.choices?.[0]?.message?.content || "Error generating ad.";

    res.status(200).json({ ad });

  } catch (error) {
    res.status(500).json({ error: "Failed to generate ad." });
  }
}
