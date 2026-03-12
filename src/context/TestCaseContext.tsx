"use client";
import { ITestCase } from "@/models/ITestCase";
import { createContext, useContext, useState } from "react";

type TestCaseContextType = {
    testCases: ITestCase[];
    setTestCases: React.Dispatch<React.SetStateAction<ITestCase[]>>;
};

const TestCaseContext = createContext<TestCaseContextType | undefined>(undefined);

export function TestCaseProvider({ initialData, children }: { initialData: ITestCase[], children: React.ReactNode }) {
    const [testCases, setTestCases] = useState(initialData);
    return (
        <TestCaseContext.Provider value={{ testCases, setTestCases }}>
            {children}
        </TestCaseContext.Provider>
    );
}

export function useTestCases() {
    const ctx = useContext(TestCaseContext);
    if (!ctx) throw new Error("useTestCases must be used within TestCaseProvider");
    return ctx;
}
