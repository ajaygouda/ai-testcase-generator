import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function POST(req: NextRequest) {
  const JIRA_DOMAIN = process.env.JIRA_DOMAIN;
  const JIRA_EMAIL = process.env.JIRA_EMAIL;
  const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;

  const authHeaders = {
    Authorization: `Basic ${Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString("base64")}`,
    Accept: "application/json",
  };

  try {
    const { parentKey, projectKey, summary, testCases } = await req.json();

    // Step 1: Get subtasks of parent
    const parentResponse = await fetch(
      `https://${JIRA_DOMAIN}/rest/api/3/issue/${parentKey}?fields=subtasks`,
      { headers: authHeaders }
    );
    const parentData = await parentResponse?.json();
    let subtask = parentData?.fields?.subtasks?.find(
      (s: any) => s?.fields?.summary === (summary || "AI Generated Subtask")
    );

    // Step 2: If no subtask, create one
    if (!subtask) {
      // Fetch issue types to find subtask type
      const typeResponse = await fetch(`https://${JIRA_DOMAIN}/rest/api/3/issuetype`, {
        headers: authHeaders,
      });
      const issueTypes = await typeResponse.json();
      const subtaskType = issueTypes.find((t: any) => t.subtask === true);

      if (!subtaskType) {
        return NextResponse.json(
          { success: false, error: "No Sub-task issue type found" },
          { status: 400 }
        );
      }

      const payload = {
        fields: {
          project: { key: projectKey },
          parent: { key: parentKey },
          summary: summary || "AI Generated Test Cases",
          issuetype: { id: String(subtaskType.id) },
        },
      };

      const createResponse = await fetch(`https://${JIRA_DOMAIN}/rest/api/3/issue`, {
        method: "POST",
        headers: {
          ...authHeaders,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const createData = await createResponse?.json();

      if (!createResponse.ok) {
        return NextResponse.json(
          { success: false, error: createData.errorMessages || "Subtask creation failed" },
          { status: createResponse.status }
        );
      }
      subtask = { key: createData.key };
    }

    // Step 3: Check attachments of subtask
    const subtaskResponse = await fetch(
      `https://${JIRA_DOMAIN}/rest/api/3/issue/${subtask.key}?fields=attachment`,
      { headers: authHeaders }
    );
    const subtaskData = await subtaskResponse.json();
    const attachments = subtaskData.fields.attachment || [];
    const excelAttachment = attachments.find((att: any) => att.filename === "aitestcases.xlsx");

    let workbook;

    if (excelAttachment) {
      // Download existing Excel
      const fileResponse = await fetch(excelAttachment.content, { headers: authHeaders });
      const arrayBuffer = await fileResponse.arrayBuffer();

      // Parse existing Excel
      workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheet = workbook.Sheets["TestCases"];
      const existingData = XLSX.utils.sheet_to_json(sheet);

      // Merge new test cases
      const mergedData = [...existingData, ...testCases];
      workbook.Sheets["TestCases"] = XLSX.utils.json_to_sheet(mergedData);

      // Delete old Excel attachment
      await fetch(`https://${JIRA_DOMAIN}/rest/api/3/attachment/${excelAttachment.id}`, {
        method: "DELETE",
        headers: authHeaders,
      });
    } else {
      // No Excel yet → create new one
      const worksheet = XLSX.utils.json_to_sheet(testCases);
      workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "TestCases");
    }

    // Write to buffer
    const nodeBuffer: Buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
    const uint8Array = new Uint8Array(nodeBuffer);
    const blob = new Blob([uint8Array], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Upload new Excel to subtask
    const form = new FormData();
    form.append("file", blob, "aitestcases.xlsx");

    await fetch(`https://${JIRA_DOMAIN}/rest/api/3/issue/${subtask.key}/attachments`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString("base64")}`,
        "X-Atlassian-Token": "no-check",
      },
      body: form,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
