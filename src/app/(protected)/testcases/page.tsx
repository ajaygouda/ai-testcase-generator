"use client"
import { MetricCard } from "@/components/MetricCard";
import { useTestCases } from "@/context/TestCaseContext";
import { calculateSuccessRate } from "@/utils/calculateSuccessRate";
import TestCasesComp from "./TestCasesComp";

export default function TestCases() {
  const { testCases } = useTestCases();
  const successRate = calculateSuccessRate(testCases)

  return (
    <>
      <div className="grid  gap-6">
        <TestCasesComp />
      </div>
    </>
  )
}
