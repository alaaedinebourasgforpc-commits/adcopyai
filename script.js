async function generateCopy() {
    const input = document.getElementById("userInput").value;
    const outputBox = document.getElementById("outputBox");

    outputBox.innerHTML = "⏳ Generating...";

    const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input })
    });

    const data = await response.json();
    outputBox.innerHTML = data.choices[0].message.content;
}
