export function normalizeSheetData(data: any) {
    const headers = data["0"]?.map(h => h.toLowerCase()); // first row = column names
    const rows = Object.keys(data)
        .filter(key => key !== "0") // skip header row
        .map(key => data[key]);

    return rows.map(row => {
        const obj: Record<string, string> = {};
        headers.forEach((header, i) => {
            obj[header.trim()] = row[i]; // trim spaces in headers
        });
        return obj;
    });
}
