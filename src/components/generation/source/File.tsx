import React, { useState } from "react";
import * as XLSX from "xlsx";
import JSZip from "jszip";


import { useToast } from "@/context/ToastContext";
import { useGenerate } from "@/hooks/useGenerate";
import { parseLLMResponse } from "@/utils/common";

const File = ({ type, handleStory }) => {
    const { generate, loading, error } = useGenerate();
    const { showToast } = useToast();
    const [content, setContent] = useState<any>(null);


    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        let parsedText = "";

        try {
            if (file.name.endsWith(".xlsx")) {
                const data = await file.arrayBuffer();
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                parsedText = XLSX.utils.sheet_to_csv(sheet);
            } else if (file.name.endsWith(".docx")) {
                const data = await file.arrayBuffer();
                const zip = await JSZip.loadAsync(data);
                const xml = await zip.file("word/document.xml")?.async("text");
                if (xml) {
                    const matches = [...xml.matchAll(/<w:t[^>]*>(.*?)<\/w:t>/g)];
                    parsedText = matches.map(m => m[1]).join(" ");
                }
            } else {
                parsedText = await file.text();
            }

            const prompt = `
                You are an assistant that extracts Jira story details from Word/Excel exports.
                The file content may include metadata (Status, Project, Type, Priority, Reporter, Assignee),
                Acceptance Criteria, and Comments.

                Please return a structured JSON object with these fields:
                {   "id":"...",
                    "title":"...",
                    "description":"...",
                    "status":"...",
                    "acceptanceCriteria":["...","..."]
                }

                Ignore XML markup or formatting. Only extract human-readable text.

                File content:
                <<<${parsedText}>>>
                `;

            const response = await generate(prompt);
            const jiraObject = parseLLMResponse(response.text);
            setContent(jiraObject)
        } catch (err) {
            showToast("danger", "Something went wrong.");
        }
    };


    return (
        <>
            <div className="flex gap-4 justify-between">
                <input
                    onChange={handleFile}
                    id="linkToFile"
                    type="file"
                    accept=".doc,.docx,.xls,.xlsx,.txt"
                    className="flex-1 mb-4 bg-background border border-border rounded p-2 text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
                />
            </div>

            <div className="rounded-md border border-border h-[calc(100vh-220px)] overflow-y-auto whitespace-pre-wrap text-sm">
                {loading ? (
                    <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                        Loading stories...
                    </div>
                ) :
                    content && typeof content === "object" && content.id ? (
                        <div onClick={() => handleStory(content)} className={`flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors border-b border-border hover:bg-muted/10`}>
                            <div className="flex-1">
                                <div className="text-[12px] font-medium text-foreground">{content?.id}</div>
                                <div className="text-[10px] text-muted-foreground truncate">{content?.title}</div>
                            </div>
                            <span className="text-primary text-[12px]">›</span>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                            No stories found
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default File;
