export async function GET(req: Request) {
  const JIRA_DOMAIN = process.env.JIRA_DOMAIN;
  const JIRA_EMAIL  = process.env.JIRA_EMAIL;
  const JIRA_TOKEN  = process.env.JIRA_API_TOKEN;

  const { searchParams } = new URL(req.url);
  const dashboardId = searchParams.get("dashboardId");

  if (!dashboardId) {
    return Response.json({ error: "dashboardId is required" }, { status: 400 });
  }

  const credentials = Buffer.from(`${JIRA_EMAIL}:${JIRA_TOKEN}`).toString("base64");

  try {
    // Step 1: Get gadgets from dashboard to find the project/filter
    const dashRes = await fetch(
      `https://${JIRA_DOMAIN}/rest/api/3/dashboard/${dashboardId}/gadget`,
      {
        headers: {
          "Authorization": `Basic ${credentials}`,
          "Accept": "application/json",
        },
        cache: "no-store",
      }
    );

    const dashData = await dashRes.json();

    // Step 2: Fetch stories using new /search/jql API ✅
    const project = process.env.JIRA_PROJECT_KEY || "VA";

    const issuesRes = await fetch(
      `https://${JIRA_DOMAIN}/rest/api/3/search/jql?jql=project=${project} ORDER BY created DESC&maxResults=50&fields=summary,status,assignee,priority,issuetype,created,updated,description`,
      //                                    ↑ fixed: /search/jql
      {
        headers: {
          "Authorization": `Basic ${credentials}`,
          "Accept": "application/json",
        },
        cache: "no-store",
      }
    );

    const issuesText = await issuesRes.text();
    if (!issuesRes.ok) {
      return Response.json({ error: `Jira error ${issuesRes.status}`, detail: issuesText }, { status: issuesRes.status });
    }

    const data = JSON.parse(issuesText);
    return Response.json(data);

  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}