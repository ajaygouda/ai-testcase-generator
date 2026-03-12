import React from "react";

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
    open: boolean;
    testCase: TestCase;
    onClose: () => void;
}

const ModalTestCaseDetails: React.FC<ModalProps> = ({ open, testCase, onClose }) => {
    if (!open) return null;

    const sc = statusConfig[testCase.status];
    const pc = priorityConfig[testCase.priority];

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-card rounded-lg shadow-lg w-3/2 max-w-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg text-foreground">{testCase.title}</h2>
                    <button
                        onClick={onClose}
                        type="button"
                        className="px-3 py-2 w-10 h-10 bg-background text-foreground rounded-full hover:bg-background focus:outline-none"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>

                <div className="overflow-hidden">
                    <div className="grid grid-cols-2 gap-2 text-sm text-foreground pb-4 border-b border-border">
                        <div><span className="text-foreground opacity-70">Type:</span> <span className={`${typeConfig[testCase.type.split(" ").join("")] || "text-foreground"}`}>{testCase.type}</span></div>
                        <div><span className="text-foreground opacity-70">Platform:</span> {testCase.platform}</div>
                        <div className="flex items-center gap-2">
                            <span className="text-foreground opacity-70">Priority:</span>
                            <span className={`badge inline-flex items-center px-2 py-0.5 rounded border font-medium uppercase tracking-wider ${pc.text} ${pc.bg} ${pc.border}`}>
                                {testCase.priority}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-foreground opacity-70">Status:</span>
                            <span className={`badge inline-flex items-center gap-1.5 px-2 py-0.5 rounded border ${sc.bg} ${sc.text} ${sc.border}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}></span>
                                {testCase.status}
                            </span>
                        </div>
                        <div><span className="text-foreground opacity-70">Generated At:</span> {testCase.generatedat}</div>
                        <div><span className="text-foreground opacity-70">Source:</span> {testCase.source}</div>
                    </div>

                    {/* Details */}
                    <div className="space-y-4 text-sm text-slate-200 mt-5">
                        <div>
                            <h4 className="font-medium text-foreground mb-1 opacity-70">Precondition</h4>
                            <p className="text-foreground">{testCase.precondition}</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-foreground mb-1 opacity-70">Steps</h4>
                            <ol className="list-decimal text-foreground list-inside space-y-1">
                                {testCase.steps.split("→").map((step, i) => (
                                    <li key={i}>{step.trim()}</li>
                                ))}
                            </ol>
                        </div>
                        <div>
                            <h4 className="font-medium text-foreground mb-1 opacity-70">Expected Result</h4>
                            <p className="text-foreground">{testCase.expected}</p>
                        </div>
                        {testCase.notes && (
                            <div>
                                <h4 className="font-medium text-foreground mb-1 opacity-70">Notes</h4>
                                <p className="text-foreground">{testCase.notes}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalTestCaseDetails;
