import React, { useState } from 'react'

export function useGenerate() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const generate = async (prompt: string) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });

            if (!res.ok) throw new Error("Request failed");
            const data = await res.json();
            // Clean AI output
            // const raw = data.text?.replace(/```json|```/g, "").trim();
            // const start = raw.indexOf("[");
            // const end = raw.lastIndexOf("]");
            // const clean = raw.substring(start, end + 1);

            return data;
        } catch (err: any) {
            setError(err.message || "Generation failed");
            throw err;
        } finally {
            setLoading(false);
        }
    };
    return { generate, loading, error };
}

