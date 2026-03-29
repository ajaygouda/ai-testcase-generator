import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        if (!body?.prompt) {
            return NextResponse.json(
                { error: "Prompt is required" },
                { status: 400 }
            );
        }

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-4o-mini", // or "gpt-4o", "gpt-3.5-turbo"
                messages: [
                    {
                        role: "user",
                        content: body.prompt,
                    },
                ],
                max_tokens: 2000,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json(
                { error: errorText },
                { status: response.status }
            );
        }

        const data = await response.json();

        const text = data?.choices?.[0]?.message?.content || "No response";

        return NextResponse.json({ text });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Something went wrong" },
            { status: 500 }
        );
    }
}
