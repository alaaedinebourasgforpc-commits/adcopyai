export default async function handler(req, res) {
    try {
        const { prompt, platform } = req.body;

        if (!prompt || !platform) {
            return res.status(400).json({ error: "Missing prompt or platform" });
        }

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "mixtral-8x7b-32768",
                messages: [
                    {
                        role: "system",
                        content: `You generate professional high-quality ads for ${platform}.`
                    },
                    { role: "user", content: prompt }
                ]
            })
        });

        const data = await response.json();

        if (!data?.choices?.[0]?.message?.content) {
            return res.status(500).json({ error: "Groq returned no content." });
        }

        res.status(200).json({
            ad: data.choices[0].message.content
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to generate ad." });
    }
}
