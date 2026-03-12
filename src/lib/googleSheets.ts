import { google } from "googleapis";

const CREDENTIALS_PATH = process.env.GOOGLE_CREDENTIALS_PATH!;

export async function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH, // path to your service account file
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}
