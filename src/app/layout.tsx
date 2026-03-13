import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AuthProvider from "@/components/SessionProvider";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";


export const metadata: Metadata = {
  title: "Vation.ai - Dashboard",
  description: "AI-powered test automation dashboard",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground">
        <AuthProvider session={session}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}