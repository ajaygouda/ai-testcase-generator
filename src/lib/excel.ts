import * as XLSX from "xlsx";

export function createExcelFile(testCases: any[], filePath: string) {
    // Convert JSON array to worksheet
    const worksheet = XLSX.utils.json_to_sheet(testCases);

    // Create workbook and append sheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "AITestCases");

    // Write to file
    XLSX.writeFile(workbook, filePath);
}
