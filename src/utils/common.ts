export function nameAvatar(name?: string) {
    if (!name) return "";
    const parts = name.split(" ");
    const initials = parts.map((p) => p[0]).join("");
    return initials
}

export function parseLLMResponse(raw?: string) {
    if (!raw || typeof raw !== "string") return null;

    try {
        // Remove markdown fences and leading explanation
        let cleaned = raw
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        // Strip any leading text before the first {
        const firstBrace = cleaned.indexOf("{");
        if (firstBrace > 0) {
            cleaned = cleaned.substring(firstBrace);
        }

        // Find JSON object boundaries
        const start = cleaned.indexOf("{");
        const end = cleaned.lastIndexOf("}");
        if (start !== -1 && end !== -1) {
            const jsonString = cleaned.substring(start, end + 1);
            return JSON.parse(jsonString);
        }

        throw new Error("No JSON object found in response");
    } catch (err) {
        console.error("Failed to parse LLM response:", err);
        return null;
    }
}






