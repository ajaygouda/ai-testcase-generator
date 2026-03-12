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
      {/* <div className="mb-4 grid grid-cols-2 gap-4">
        <MetricCard
          value={testCases.length}
          label="Test Cases Generated"
        />
        <MetricCard
          value={successRate}
          label="Success Rate"
        // trend={{ value: 0.5, direction: "up" }}
        />
      </div> */}

      {/* Main Grid Layout */}
      <div className="grid  gap-6">
        <TestCasesComp />
        {/* <div className="col-span-2 space-y-6">
          <Chart />
          <ChatWidget />
        </div>

        <div className="space-y-6">
          <ExecutionLogs logs={executionLogs} />
          <NeeTimeWidget items={neeTimeItems} />
        </div> */}
      </div>
    </>
  )
}
