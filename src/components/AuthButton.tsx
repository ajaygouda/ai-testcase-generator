// components/AuthButton.tsx
"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export function AuthButton() {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    await signIn("azure-ad", 
      { callbackUrl: "/" },
      { prompt: "select_account" } // ← forces account picker every time
    );
  };

  return (
    <button
      onClick={handleSignIn}
      disabled={loading}
      className="w-full flex items-center justify-center gap-3 px-5 py-2.5 rounded-lg border border-border bg-background hover:bg-muted transition-all duration-200 text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4 text-foreground" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 21 21" fill="none">
          <rect x="1"  y="1"  width="9" height="9" fill="#F25022"/>
          <rect x="11" y="1"  width="9" height="9" fill="#7FBA00"/>
          <rect x="1"  y="11" width="9" height="9" fill="#00A4EF"/>
          <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
        </svg>
      )}
      {loading ? "Signing in..." : "Sign in with Microsoft"}
    </button>
  );
}