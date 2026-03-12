export async function POST(req: Request) {
    const body = await req.json();

    try {
        const response = await fetch(body.link, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                action: "button-clicked",
                tool: body.tool,
            }),
        });

        const data = await response.json();
        return Response.json(data);

    } catch (error) {
        return Response.json({ error: "Webhook failed" }, { status: 500 });
    }
}