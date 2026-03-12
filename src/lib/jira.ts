import fs from "fs";

export async function attachFileToIssue(issueKey: string, filePath: string) {
    // Read file into a Buffer
    const buffer = fs.readFileSync(filePath);

    // Convert Buffer into a Blob
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    // Use native FormData
    const form = new FormData();
    form.append("file", blob, "aitestcases.xlsx"); // filename is important

    const response = await fetch(
        `https://${process.env.JIRA_DOMAIN}/rest/api/3/issue/${issueKey}/attachments`,
        {
            method: "POST",
            headers: {
                Authorization: `Basic ${Buffer.from(
                    `${process.env.JIRA_EMAIL}:${process.env.JIRA_API_TOKEN}`
                ).toString("base64")}`,
                "X-Atlassian-Token": "no-check",
            },
            body: form,
        }
    );

    return response.json();
}
