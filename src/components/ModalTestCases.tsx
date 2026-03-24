"use client"
import React, { useEffect, useState } from "react";
import { priorityConfig } from "@/constants/priorityConfig";
import { statusConfig } from "@/constants/statusConfig";
import { typeConfig } from "@/constants/typeConfig";

interface TestCase {
    id: string;
    title: string;
    type: string;
    priority: string;
    precondition: string;
    steps: string;
    expected: string;
    notes: string;
    status: string;
    platform: string;
    source: string;
    generatedat: string;
}

interface ModalProps {
    open: boolean; // 👈 add open prop
    testCases: TestCase[];
    onClose: () => void;
    onSave: (testCases: TestCase[]) => void;
}

const ModalTestCases: React.FC<ModalProps> = ({ open, testCases, onClose, onSave }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!open) setLoading(false);
    }, [open]);
    
    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-background/90 z-50">
            <div className="bg-card rounded-lg shadow-lg w-3/4 max-w-9xl p-6">
                <h2 className="text-xl text-foreground mb-4">Generated Test Cases</h2>

                <div className="overflow-y-auto max-h-96 border">
                    <table className="table-auto text-left text-xs w-full border-collapse">
                        <thead>
                            <tr className="px-4 py-2 bg-background text-foreground uppercase">
                                <th className="px-4 py-2 w-[100px]">ID</th>
                                <th className="px-4 py-2 w-[80px]">Type</th>
                                <th className="px-4 py-2 w-[200px]">Title</th>
                                <th className="px-4 py-2 w-[100px]">Priority</th>
                                <th className="px-4 py-2 w-[300px]">Steps</th>
                                <th className="px-4 py-2 w-[180px]">Expected</th>
                                <th className="px-4 py-2 w-[80px]">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testCases.map((tc) => {
                                const sc = statusConfig[tc.status];
                                const pc = priorityConfig[tc.priority];
                                const type = tc.type.split(" ").join("")
                                return (
                                    <tr key={tc.id} className="border-b border-grey-200 text-foreground">
                                        <td className="px-4 py-2">{tc.id}</td>
                                        <td className="px-4 py-2">
                                            <span className={`${typeConfig[type]}`}>{tc.type}</span>
                                        </td>
                                        <td className="px-4 py-2">{tc.title}</td>
                                        <td className="px-4 py-2">
                                            <span className={`badge inline-flex items-center px-2 py-0.5 rounded border font-medium uppercase tracking-wider ${pc.text} ${pc.bg} ${pc.border}`}>
                                                {tc.priority}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">{tc.steps}</td>
                                        <td className="px-4 py-2">{tc.expected}</td>
                                        <td className="px-4 py-2">
                                            <span className={`badge inline-flex items-center gap-1.5 px-2 py-0.5 rounded border ${sc.bg} ${sc.text} ${sc.border}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}></span>
                                                {tc.status}
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-xs rounded border text-foreground"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => { onSave(testCases); setLoading(true) }}
                        className="px-4 py-2 text-xs bg-green-500 flex gap-1 items-center text-white rounded hover:bg-green-600"
                    >
                        {loading ?
                            <>
                                <svg
                                    className="animate-spin"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M21 12a9 9 0 11-6.219-8.56" />
                                </svg>
                                Saving...
                            </> : "Save & Sync"}

                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalTestCases;
