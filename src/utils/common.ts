export function nameAvatar(name?: string) {
    if (!name) return "";
    const parts = name.split(" ");
    const initials = parts.map((p) => p[0]).join("");
    return initials
}