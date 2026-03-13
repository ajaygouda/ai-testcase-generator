import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import Header from "@/components/Header";
import { TestCaseProvider } from "@/context/TestCaseContext";
import { normalizeSheetData } from "@/utils/normalizeSheetData";
import { authOptions } from "@/lib/auth";
import { headers } from "next/headers";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/login");

    const headersList = await headers();
    const host = headersList.get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

    const res = await fetch(`${protocol}://${host}/api/testcases`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch testcases");
    }

    const resData = await res.json();
    const testCases: any = normalizeSheetData(resData);

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 overflow-auto">
                <div className="flex flex-col">
                    <Header />
                    <div className="flex-1 overflow-auto p-4">
                        <TestCaseProvider initialData={testCases}>
                            {children}
                        </TestCaseProvider>
                    </div>
                </div>
            </main>
        </div>
    );
}