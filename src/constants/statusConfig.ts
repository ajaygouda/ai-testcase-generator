export const statusConfig = {
    Passed: {
        bg: "bg-emerald-500/15",
        text: "text-emerald-400",
        dot: "bg-emerald-400",
        border: "border-emerald-500/30",
    },
    Failed: {
        bg: "bg-red-500/15",
        text: "text-red-400",
        dot: "bg-red-400",
        border: "border-red-500/30",
    },
    New: {
        bg: "bg-amber-500/15",
        text: "text-amber-400",
        dot: "bg-amber-400",
        border: "border-amber-500/30",
    },
} as const;
