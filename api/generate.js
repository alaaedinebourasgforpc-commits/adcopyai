export default async function handler(req, res) {
    const { prompt } = req.body;

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
    res.status(200).json(data);
}
