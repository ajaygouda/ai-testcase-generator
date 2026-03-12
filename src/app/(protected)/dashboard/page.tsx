"use client"
import TestCaseTypesChart from '@/components/DistributionChart'
import { MetricCard } from '@/components/MetricCard'
import PriorityPieChart from '@/components/PriorityPieChart'
import { useTestCases } from '@/context/TestCaseContext'
import { ITestCase } from '@/models/ITestCase'
import React from 'react'

const Dashboard = () => {
  const { testCases} = useTestCases();

  console.log("ff",testCases.filter((item)=>item.priority === "High").map((i:any)=>
     ({"name":i.storyid})
))
  let covered = [...new Set(testCases.map((item)=>item.storyid))];
  


  return (
    <>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div className='grid grid-cols-2 gap-4'>
          <MetricCard
            data={[{ key: "", value: testCases.length }]}
            label="Test Cases Generated"
          />
          <MetricCard
            data={[{ key: "", value: covered.length }]}
            label="Stories Covered"
          />
        </div>
        <MetricCard
          data={[{ key: "New", value: testCases?.filter((item) => item.status === "New")?.length }, { key: "Passed", value: testCases?.filter((item) => item.status === "Passed")?.length }, { key: "Failed", value: testCases?.filter((item) => item.status === "Failed")?.length }]}
          label="Execution Status"
        />

      </div>
      <div className="flex gap-4">
        <PriorityPieChart testCases={testCases} />
        <TestCaseTypesChart testCases={testCases} />
      </div>
    </>
  )
}

export default Dashboard