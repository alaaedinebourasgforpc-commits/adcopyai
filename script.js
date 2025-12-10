const API_KEY = "YOUR_KEY_HERE"; // ← بدليها بمفتاحك الحقيقي

async function generateCopy() {
    const input = document.getElementById("userInput").value;
    const outputBox = document.getElementById("outputBox");

    outputBox.innerHTML = "⏳ Generating...";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You generate high-quality advertising copy." },
                { role: "user", content: input }
            ]
        })
    });

    const data = await response.json();
    outputBox.innerHTML = data.choices[0].message.content;
}
