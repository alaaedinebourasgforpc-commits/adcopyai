export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { prompt } = req.body;

        if (!process.env.GROQ_API_KEY) {
            return res.status(500).json({ error: "Missing API key" });
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
                    { role: "system", content: "You generate high-quality ad copy." },
                    { role: "user", content: prompt }
                ]
            })
        });

        const data = await response.json();

        // إذا Groq رجعت خطأ
        if (data.error) {
            return res.status(500).json({ error: data.error.message });
        }

        return res.status(200).json({
            text: data.choices[0].message.content
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
}
