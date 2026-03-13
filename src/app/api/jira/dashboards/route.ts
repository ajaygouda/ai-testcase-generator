// app/api/jira/dashboards/route.ts

export async function GET() {
  const JIRA_DOMAIN = process.env.JIRA_DOMAIN;
  const JIRA_EMAIL  = process.env.JIRA_EMAIL;
  const JIRA_TOKEN  = process.env.JIRA_API_TOKEN;


  if (!JIRA_DOMAIN || !JIRA_EMAIL || !JIRA_TOKEN) {
    return Response.json({ error: "Missing env variables" }, { status: 500 });
  }

  const credentials = Buffer.from(`${JIRA_EMAIL}:${JIRA_TOKEN}`).toString("base64");
  const url = `https://${JIRA_DOMAIN}/rest/api/3/dashboard?maxResults=50`;


  try {
    const response = await fetch(url, {
      headers: {
        "Authorization": `Basic ${credentials}`,
        "Accept": "application/json",
      },
      cache: "no-store",
    });

    const text = await response.text(); // read raw first
    if (!response.ok) {
      return Response.json({ error: `Jira error ${response.status}`, detail: text }, { status: response.status });
    }

    const data = JSON.parse(text);
    return Response.json(data);

  } catch (error: any) {
    return Response.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
}