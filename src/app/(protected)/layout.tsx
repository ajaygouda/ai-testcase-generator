import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import Header from "@/components/Header";
import { TestCaseProvider } from "@/context/TestCaseContext";
import { normalizeSheetData } from "@/utils/normalizeSheetData";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/login"); 

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/testcases`, { cache: "no-store" });
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