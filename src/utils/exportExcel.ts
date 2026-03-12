import * as XLSX from "xlsx";

export function exportToExcel(data: any[], fileName = "testcases.xlsx") {
    // Convert JSON to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Append worksheet
    XLSX.utils.book_append_sheet(workbook, worksheet, "FilteredData");

    // Trigger download
    XLSX.writeFile(workbook, fileName);
}
