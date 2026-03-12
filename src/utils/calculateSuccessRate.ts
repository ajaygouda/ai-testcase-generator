import { ITestCase } from "@/models/ITestCase";

export function calculateSuccessRate(testCases: ITestCase[]): string {
    const executed = testCases.filter(tc => tc.status).length;
    const passed = testCases.filter(tc => tc.status === "Passed").length;

    if (executed === 0) return "0%";

    const rate = (passed / executed) * 100;
    return `${rate.toFixed(1)}%`; // one decimal place
}
