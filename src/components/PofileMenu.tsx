import React from 'react';
import { LogOut } from "lucide-react";
import { IAzureAuth } from '@/models/IAzure';

interface IProfileMenuProps {
    session: IAzureAuth;
    signOut: (options?: { callbackUrl?: string }) => void;
}


const PofileMenu = ({ session, signOut }: IProfileMenuProps) => {
    return (
        <div className="absolute right-0 mt-4 w-56 rounded-md border border-border bg-card shadow-lg z-50 overflow-hidden">
            {/* User info */}
            <div className="p-4 border-b border-border">
                <div className="flex items-center gap-3">
                    <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1 text-sm font-medium">
                            <span className="truncate">{session?.user?.name ?? "Unknown"}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <span className="truncate">{session?.user?.email ?? "No email"}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Logout */}
            <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
            >
                <LogOut className="h-4 w-4" />
                Sign out
            </button>
        </div>
    )
}

export default PofileMenu