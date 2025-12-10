import { useState } from "react";

export default function Home() {
    const [prompt, setPrompt] = useState("");
    const [platform, setPlatform] = useState("Facebook");
    const [result, setResult] = useState("");

    const generateAd = async () => {
        const res = await fetch("/api/generate-ad", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt, platform })
        });

        const data = await res.json();
        setResult(data.ad || data.error);
    };

    return (
        <div style={{ padding: "40px" }}>
            <h1>Ad Generator</h1>

            <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
                <option>Facebook</option>
                <option>Tiktok</option>
                <option>Google</option>
            </select>

            <textarea
                placeholder="Write your product description..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />

            <button onClick={generateAd}>Generate</button>

            <pre>{result}</pre>
        </div>
    );
}
