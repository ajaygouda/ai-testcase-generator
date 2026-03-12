export function formatDate(ts: any) {
    let d = new Date(ts);
    let yyyy = d.getFullYear();
    let mm = String(d.getMonth() + 1).padStart(2, "0");
    let dd = String(d.getDate()).padStart(2, "0");
    let hh = String(d.getHours()).padStart(2, "0");
    let min = String(d.getMinutes()).padStart(2, "0");
    let ss = String(d.getSeconds()).padStart(2, "0");
    return `${mm}/${dd}/${yyyy}, ${hh}:${min}`;
}

