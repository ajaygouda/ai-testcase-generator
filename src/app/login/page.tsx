// app/login/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { AuthButton } from "@/components/AuthButton";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/"); // ← already logged in, go to app

  return (
    <main className="flex items-center justify-center h-screen bg-background">
      <div className="flex flex-col items-center gap-6 p-10 rounded-2xl border border-border bg-card shadow-lg w-full max-w-sm">

        {/* Logo / Brand */}
        <div className="flex flex-col items-center gap-2">
          <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
            AI 
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground text-center">
            Sign in to your account to continue
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-border" />

        {/* Sign in button */}
        <AuthButton />

        {/* Footer */}
        <p className="text-xs text-muted-foreground text-center">
          By signing in, you agree to our terms of service
        </p>

      </div>
    </main>
  );
}