import { NextResponse } from "next/server";
import { getSheetsClient } from "@/lib/googleSheets";

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const RANGE = "Sheet1!A:N"; // adjust columns

// READ (GET)
export async function GET() {
    try {
        const sheets = await getSheetsClient();
        const result = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: RANGE,
        });

        return NextResponse.json(result.data.values || []);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// CREATE (POST)
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { testCases } = body;
        const sheets = await getSheetsClient();
        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: "Sheet1!A1",
            valueInputOption: "RAW",
            requestBody: {
                values: testCases.map(tc => [
                    tc.id, tc.title, tc.type, tc.priority, tc.precondition, tc.steps, tc.expected, tc.notes, tc.status, tc.platform, tc.source, tc.generatedat, tc.storyid
                ])
            }
        });

        return NextResponse.json({ message: "Saved all test cases" });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// UPDATE (PUT)
export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { rowIndex, testCase } = body; // rowIndex must be known

        const sheets = await getSheetsClient();
        await sheets.spreadsheets.values.update({
            spreadsheetId: SPREADSHEET_ID,
            range: `Sheet1!A${rowIndex}:H${rowIndex}`,
            valueInputOption: "RAW",
            requestBody: {
                values: [[
                    testCase.id, testCase.title, testCase.type, testCase.priority, testCase.precondition, testCase.steps, testCase.expected, testCase.notes, testCase.status, testCase.platform, testCase.source, testCase.generatedat, testCase.story.id
                ]]
            }
        });

        return NextResponse.json({ message: "Updated" });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// DELETE
export async function DELETE(req: Request) {
    try {
        const body = await req.json();
        const { rowIndex } = body; // row index to delete

        const sheets = await getSheetsClient();
        await sheets.spreadsheets.batchUpdate({
            spreadsheetId: SPREADSHEET_ID,
            requestBody: {
                requests: [
                    {
                        deleteDimension: {
                            range: {
                                sheetId: 0, // usually first sheet, adjust if needed
                                dimension: "ROWS",
                                startIndex: rowIndex - 1,
                                endIndex: rowIndex,
                            },
                        },
                    },
                ],
            },
        });

        return NextResponse.json({ message: "Deleted" });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
