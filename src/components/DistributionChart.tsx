"use client";
import React, { useEffect } from "react";
import ApexCharts from "apexcharts";
import { TC_TYPES } from "@/constants/common";
import { ITestCase } from "@/models/ITestCase";

interface PriorityPieChartProps {
    testCases: ITestCase[];
}

export default function TestCaseTypesChart({ testCases }: PriorityPieChartProps) {
    useEffect(() => {
        const axisColor = getComputedStyle(document.documentElement)
            .getPropertyValue("--axis-color")
            .trim();

        const seriesData = TC_TYPES.map(t =>
            testCases.filter(tc => tc.type === t.label).length
        );

        const options: any = {
            chart: {
                type: "bar",
                height: 400,
                toolbar: { show: false }
            },
            plotOptions: {
                bar: {
                    distributed: true,
                    borderRadius: 4,
                },
            },
            colors: [
                "#3b82f6", "#ef4444", "#22c55e", "#f59e0b", "#8b5cf6",
                "#06b6d4", "#f97316", "#64748b", "#84cc16", "#e11d48",
                "#0ea5e9", "#9333ea", "#14b8a6", "#facc15", "#2563eb", "#dc2626"
            ],
            dataLabels: {
                enabled: true,
            },
            series: [
                {
                    data: seriesData,
                },
            ],
            xaxis: {
                categories: TC_TYPES.map((t) => `${t.icon} ${t.label}`),
                labels: {
                    style: {
                        colors: Array(TC_TYPES.length).fill(axisColor),
                        fontSize: "12px",
                    },
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [axisColor],
                        fontSize: "12px",
                    },
                },
            },

            legend: {
                show: false,
            },
            tooltip: {
                enabled: false, // disables hover tooltip
            },
            states: {
                hover: {
                    filter: {
                        type: "none", // removes hover highlight
                    },
                },
                active: {
                    filter: {
                        type: "none", // removes active highlight
                    },
                },
            },
        };


        const chart = new ApexCharts(document.querySelector("#tcTypesChart"), options);
        chart.render();

        return () => {
            chart.destroy();
        };
    }, []);

    return (
        <div className="bg-card rounded-lg p-6 flex-1">
            <h2 className="text-sm text-muted-foreground mb-4">
                Test Case Types Distribution
            </h2>
            <div id="tcTypesChart" className="w-full h-96"></div>
        </div>
    );
}
