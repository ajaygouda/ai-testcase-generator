"use client"

import React, { useEffect, useRef, useState } from 'react';
import { priorityConfig } from '@/constants/priorityConfig';
import { statusConfig } from '@/constants/statusConfig';
import { typeConfig } from '@/constants/typeConfig';
import { ITestCase } from '@/models/ITestCase';

interface VirtualScrollProps {
    data: ITestCase[];
    setShowDetailsModal: (val: boolean) => void;
    setSelTestcase: (tc: ITestCase) => void;
    rowHeight?: number;
    height?: number | string;   // ✅ allow string for calc()
}


const VirtualScroll = ({ data, setShowDetailsModal, setSelTestcase, rowHeight = 40, height = 500 }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollTop, setScrollTop] = useState(0);
    const totalHeight = data.length * rowHeight;
    const visibleCount = Math.ceil(height / rowHeight) + 2;
    const startIndex = Math.floor(scrollTop / rowHeight);
    const endIndex = Math.min(startIndex + visibleCount, data.length);

    const visibleData = data.slice(startIndex, endIndex);

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                setScrollTop(containerRef.current.scrollTop);
            }
        };
        const node = containerRef.current;
        node?.addEventListener("scroll", handleScroll);
        return () => node?.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="rounded-lg border border-border">
            {/* Fixed header */}
            <div style={{ paddingRight: "16px" }}>
                <table className="w-full text-foreground text-sm border-collapse table-fixed">
                    <thead className="sticky top-0 z-10 text-left bg-background">
                        <tr className="border-b border-border">
                            <th className="w-[100px] px-3 py-2 text-xs uppercase">ID</th>
                            <th className="w-[80px] px-3 py-2 text-xs uppercase">Platform</th>
                            <th className="w-[120px] px-3 py-2 text-xs uppercase">Source</th>
                            <th className="w-[320px] px-3 py-2 text-xs uppercase">Title</th>
                            <th className="w-[100px] px-3 py-2 text-xs uppercase">Type</th>
                            <th className="w-[80px] px-3 py-2 text-xs uppercase">Priority</th>
                            <th className="w-[100px] px-3 py-2 text-xs uppercase">Status</th>
                            <th className="w-[150px] px-3 py-2 text-xs uppercase">Date/Time</th>
                        </tr>
                    </thead>
                </table>
            </div>
            {/* Scrollable virtualized body */}
            <div
                ref={containerRef}
                style={{ height, overflowY: "auto", position: "relative" }}
            >
                <div style={{ height: totalHeight, position: "relative" }}>
                    <table className="w-full text-foreground text-xs border-collapse table-fixed absolute top-0 left-0">
                        <tbody>
                            {visibleData.map((tc: ITestCase, i: number) => {
                                const sc = statusConfig[tc.status];
                                const pc = priorityConfig[tc.priority];
                                const index = startIndex + i;
                                const type = tc.type.split(" ").join("")

                                return (
                                    <tr
                                        key={tc.id}
                                        style={{
                                            position: "absolute",
                                            top: index * rowHeight,
                                            height: rowHeight,
                                            display: "table",
                                            tableLayout: "fixed",
                                            width: "100%"
                                        }}
                                        className="border-b border-border cursor-pointer transition-colors"
                                        onClick={() => { setShowDetailsModal(true); setSelTestcase(tc) }}
                                    >
                                        <td className="w-[100px] px-3 py-2">{tc.id}</td>
                                        <td className="w-[80px] px-3 py-2">{tc.platform}</td>
                                        <td className="w-[120px] px-3 py-2">{tc.storyid} | {tc.storytitle}</td>
                                        <td className="w-[320px] px-3 py-2 truncate">{tc.title}</td>
                                        <td className="px-3 py-2 font-medium text-xs w-[100px]">
                                            <span className={`text-xs font-medium ${typeConfig[type] || "text-foreground"}`}>
                                                {tc.type}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2 font-medium text-xs w-[80px]">
                                            <span className={`badge inline-flex items-center px-2 py-0.5 rounded border font-medium uppercase tracking-wider ${pc.text} ${pc.bg} ${pc.border}`}>
                                                {tc.priority}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2 font-medium text-xs w-[100px]">
                                            <span className={`badge inline-flex items-center gap-1.5 px-2 py-0.5 rounded border ${sc.bg} ${sc.text} ${sc.border}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}></span>
                                                {tc.status}
                                            </span>
                                        </td>
                                        <td className="w-[150px] px-3 py-2">{tc.generatedat}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


    )
}

export default VirtualScroll