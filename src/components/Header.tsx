"use client";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Moon, Sun } from "lucide-react";
import { nameAvatar } from "@/utils/common";
import PofileMenu from "./PofileMenu";
import { useTheme } from "@/context/ThemeContext";
import { PATHS } from "@/constants/common";


export default function Header() {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { theme, setTheme } = useTheme();
    const pathname = usePathname();
    const currentTitle = Object.values(PATHS).find(p => p.path === pathname)?.title || "Unknown";

    // Cycle between light and dark
    const handleToggle = () => {
        const next = theme === "light" ? "dark" : "light";
        setTheme(next);
    };

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <header className="border-b border-border bg-card px-4 py-4">
            <div className="flex items-center justify-between">
                <div className="text-lg uppercase tracking-widest">
                    {currentTitle}
                </div>
                <div className="flex items-center gap-4">

                    {/* Theme toggle */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleToggle}
                            className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-semibold"
                            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
                        >
                            {theme === "light" ? (
                                <Moon className="h-5 w-5 text-foreground" />
                            ) : (
                                <Sun className="h-5 w-5 text-foreground" />
                            )}
                        </button>
                    </div>

                    {/* User avatar + dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setOpen((prev) => !prev)}>
                            {nameAvatar(session?.user?.name)}
                        </div>
                        {open && (
                            <PofileMenu session={session} signOut={signOut} />
                        )}
                    </div>

                </div>
            </div>
        </header>
    );
}