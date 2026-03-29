// components/PriorityPieChart.tsx
"use client";
import React, { useEffect } from "react";
import ApexCharts from "apexcharts";
import { ITestCase } from "@/models/ITestCase";

interface PriorityPieChartProps {
  testCases: ITestCase[];
}

export default function PriorityPieChart({ testCases }: PriorityPieChartProps) {
  useEffect(() => {
    const priorities = ["High", "Medium", "Low"];
    const counts = priorities.map(
      (p) => testCases.filter((tc) => tc.priority === p).length
    );
    const total = counts.reduce((a, b) => a + b, 0);

    const axisColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--axis-color")
      .trim();

    // If no data, show grey chart
    const series = total === 0 ? [1] : counts;
    const labels = total === 0 ? ["No Data"] : priorities;
    const colors = total === 0 ? ["#d1d5db"] : ["#ef4444", "#facc15", "#22c55e"];

    const options: any = {
      chart: {
        type: "pie",
        height: 300,
      },
      labels,
      series,
      colors,
      legend: {
        position: "bottom",
        labels: {
          colors: axisColor,
        },
      },
      responsive: [
        {
          breakpoint: 640,
          options: {
            chart: {
              height: 250,
            },
          },
        },
      ],
    };

    const chart = new ApexCharts(
      document.querySelector("#priorityPieChart"),
      options
    );
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [testCases]);

  return (
    <div className="bg-card rounded-lg p-6 w-[24%]">
      <h2 className="text-sm text-muted-foreground mb-4">
        Test Case Priority
      </h2>
      <div id="priorityPieChart" className="w-full h-64"></div>
    </div>
  );
}
