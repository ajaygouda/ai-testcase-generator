"use client"

import { useState, useEffect } from 'react';
import { PLATFORMS, T, TC_TYPES } from '@/constants/common';
import { ITestCase } from '@/models/ITestCase';
import { useFetch } from '@/hooks/useFetch';
import { IJiraDashboard, IJiraDashboardResponse, IJiraStory, IJiraStoryResponse } from '@/models/IJira';

function PIcon({ p, size = 24 }) {
    if (!p) return null;
    return (
        <div style={{ width: size, height: size, background: p.bg, border: `1px solid ${p.border}`, color: p.color, borderRadius: Math.ceil(size * 0.28), display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: size * 0.42, fontFamily: "'DM Sans',sans-serif", flexShrink: 0, letterSpacing: 0 }}>
            {p.icon}
        </div>
    );
}

interface IGeneratePanelProps {
    testCases: ITestCase[];
    open: boolean;
    onClose: () => void;
    onDone: (parsed: any, platformLabel: string, source: any) => void;
}


export default function GeneratePanel({ testCases, open, onClose, onDone }: IGeneratePanelProps) {
    const [step, setStep] = useState<number>(1);
    const [selPlatform, setSelPlatform] = useState<any>(null);
    const [selSource, setSelSource] = useState<any>(null);
    const [selTypes, setSelTypes] = useState([]);
    const [generating, setGenerating] = useState(false);
    const [error, setError] = useState(null);
    const platform = PLATFORMS.find(p => p.id === selPlatform);
    const [selDashboard, setSelDashboard] = useState("");

    const { data: jiraDashboard, loading: dashboardsLoading, error: dashboardsError } = useFetch<IJiraDashboardResponse>(selPlatform === "jira" ? "/api/jira/dashboards" : "");
    const { data: jiraStories, loading: storiesLoading, error: storiesError, refetch } = useFetch<IJiraStoryResponse>(selDashboard ? `/api/jira/stories?dashboardId=${selDashboard}` : "");

    useEffect(() => { if (!open) setTimeout(() => { setStep(1); setSelPlatform(null); setSelSource(null); setSelTypes([]); setError(null); }, 350); }, [open]);



    const toggleType = id => setSelTypes(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

    const generate = async () => {
        setGenerating(true);
        setError(null);

        const typeLabels = selTypes
            .map(t => TC_TYPES.find(x => x.id === t)?.label)
            .join(", ");

        // Build prompt using mapped Jira fields
        const prompt = `
            You are a senior QA engineer.

            Platform: ${platform?.label}
            Source: ${selSource?.fields?.summary} (${selSource?.key} | ${selSource?.fields?.issuetype})
            Details: ${selSource?.fields?.description || ""}

            Generate infinity test cases for each ${typeLabels}.

            STRICT RULES:
            1. ONLY use these test types: ${typeLabels}
            2. Do NOT generate any type outside this list.
            3. The "type" field must be EXACTLY one of: ${typeLabels}
            4. Distribute test cases across the selected types.

            Return ONLY pure JSON array.
            No markdown.
            No backticks.
            Start with [
            End with ]

            Format:
            [
            {
                "title":"...",
                "type":"${typeLabels.split(", ")[0]}",
                "priority":"High|Medium|Low",
                "precondition":"...",
                "steps":"Step 1 → Step 2",
                "expected":"...",
                "notes":"...",
                "story": {
                    "id":"${selSource?.id}",
                    "title":"${selSource?.key}"
                }
            }
            ]
            `;

        try {
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });

            if (!res.ok) throw new Error();
            const data = await res.json();

            // Clean the AI output 
            const raw = data.text?.replace(/```json|```/g, "").trim();
            // Extract only the JSON array portion 
            const start = raw.indexOf("[");
            const end = raw.lastIndexOf("]");
            const clean = raw.substring(start, end + 1);
            setTimeout(() => {
                const parsed = JSON.parse(clean);
                onDone(parsed, platform?.label, selSource);
                onClose();
            }, 1000);
        } catch {
            setError("Generation failed. Please try again.");
        } finally {
            setGenerating(false);
        }
    };

    const stepLabels = ["Platform", "Source", "Types"];

    return (
        <>
            <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(3px)", zIndex: 40, opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", transition: "opacity 0.25s" }} />
            <div className='bg-background text-foreground' style={{ position: "fixed", top: 0, right: 0, height: "100vh", width: 480, maxWidth: "95vw", zIndex: 50, transform: open ? "translateX(0)" : "translateX(100%)", transition: "transform 0.3s cubic-bezier(.16,1,.3,1)", display: "flex", flexDirection: "column" }}>

                {/* Panel header */}
                <div className="bg-background text-foreground border border-border px-6 py-4 flex items-center justify-between">
                    <div>
                        <div className="text-foreground font-bold mb-2 text-md">Generate Test Cases</div>

                        {/* Step dots */}
                        <div className="flex items-center gap-1.5">
                            {stepLabels.map((l, i) => {
                                const sn = i + 1;
                                const done = step > sn;
                                const active = step === sn;

                                return (
                                    <div key={l} className="flex items-center gap-1.5">
                                        <div className="flex items-center gap-1.5">
                                            <div
                                                className={`flex items-center justify-center w-[18px] h-[18px] rounded-full border font-bold text-[10px]
                                                ${done ? "border-accent bg-accent/20 text-accent" : ""}
                                                ${active ? "border-primary bg-primary/10 text-primary" : ""}
                                                ${!done && !active ? "border-muted text-muted-foreground" : ""}`}
                                            >
                                                {done ? "✓" : sn}
                                            </div>
                                            <span
                                                className={`text-[10px] tracking-wide
                                                ${active ? "text-primary" : ""}
                                                ${done ? "text-accent" : ""}
                                                ${!done && !active ? "text-muted-foreground" : ""}`}
                                            >
                                                {l}
                                            </span>
                                        </div>

                                        {i < stepLabels.length - 1 && (
                                            <div
                                                className={`w-5 h-px
                                                ${done ? "bg-accent" : "bg-border"}`}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="w-7 h-7 rounded-md bg-muted/10 border border-border text-muted-foreground text-sm flex items-center justify-center cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                <div className='overflow-y-auto p-5 flex-1'>

                    {/* STEP 1 */}
                    {step === 1 && (
                        <>
                            <div className='text-xs text-foreground uppercase mb-2 tracking-widest'>Select platform</div>
                            <div className="grid grid-cols-2 gap-2.5">
                                {PLATFORMS.map((p) => (
                                    <div
                                        key={p.id}
                                        onClick={() => {
                                            setSelPlatform(p.id);
                                            setStep(2);
                                            setSelSource(null);
                                            setSelTypes([]);
                                        }}
                                        className="flex gap-4 bg-background border border-border rounded-lg p-4 cursor-pointer transition-transform duration-150 hover:-translate-y-0.5 hover:border-primary"
                                    >
                                        <PIcon p={p} size={32} />
                                        <div>
                                            <div className="text-sm text-foreground">{p.label}</div>
                                            <div className="text-[10px] text-primary">Select →</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && platform && (
                        <>
                            {/* Header */}
                            <div className="flex items-center gap-2 mb-4">
                                <button
                                    onClick={() => setStep(1)}
                                    className="bg-transparent border border-border rounded px-2.5 py-1 text-muted-foreground text-[10px] cursor-pointer"
                                >
                                    ← Back
                                </button>
                                <PIcon p={platform} size={20} />
                                <span className="text-sm font-semibold text-foreground">{platform.label}</span>
                            </div>

                            {/* Dashboard select */}
                            <div className="flex gap-4 justify-between">
                                <select
                                    id="linkToJira"
                                    value={selDashboard}
                                    onChange={(e) => setSelDashboard(e.target.value)}
                                    className="flex-1 mb-4 bg-background border border-border rounded p-2 text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
                                    disabled={dashboardsLoading}
                                >
                                    {dashboardsLoading ? (
                                        <option>Loading dashboards...</option>
                                    ) : (
                                        <>
                                            <option value="">Select Dashboard</option>
                                            {jiraDashboard?.dashboards?.map((dashboard: IJiraDashboard) => (
                                                <option key={dashboard.id} value={dashboard.id}>
                                                    {dashboard.name}
                                                </option>
                                            ))}
                                        </>
                                    )}
                                </select>
                            </div>

                            {/* Stories list */}
                            <div className="rounded-md border border-border h-[calc(100vh-220px)] overflow-y-auto">
                                {storiesLoading ? (
                                    <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                                        Loading stories...
                                    </div>
                                ) : jiraStories?.issues?.length > 0 ? (
                                    jiraStories?.issues
                                        .filter((item: IJiraStory) => item.fields.issuetype.subtask === false)
                                        .map((item: IJiraStory, i, arr) =>
                                            <div
                                                key={item.id}
                                                onClick={() => {
                                                    setSelSource(item);
                                                    setStep(3);
                                                    setSelTypes([]);
                                                }}
                                                className={`flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors 
                                            ${i < arr.length - 1 ? "border-b border-border" : ""} 
                                            hover:bg-muted/10`}
                                            >
                                                <div className="flex-1">
                                                    <div className="text-[12px] font-medium text-foreground">{item.key}</div>
                                                    <div className="text-[10px] text-muted-foreground mt-0.5 truncate">
                                                        {item.id} · {item.fields.summary}
                                                    </div>
                                                </div>
                                                <span className="text-primary text-[12px]">›</span>
                                            </div>
                                        ))
                                    : (
                                        <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                                            No stories found
                                        </div>
                                    )}
                            </div>
                        </>
                    )}


                    {/* STEP 3 */}
                    {step === 3 && selSource && platform && (
                        <>
                            {/* Header */}
                            <div className="flex items-center gap-2 mb-4">
                                <button
                                    onClick={() => setStep(2)}
                                    className="bg-transparent border border-border rounded px-2.5 py-1 text-muted-foreground text-[10px] cursor-pointer"
                                >
                                    ← Back
                                </button>
                                <PIcon p={platform} size={20} />
                                <span className="text-sm font-semibold text-foreground">{platform.label}</span>
                                <div className="text-sm font-medium text-foreground">
                                    <span className="px-2">/</span>{selSource.key}
                                </div>
                            </div>

                            {/* Section label */}
                            <div className="text-[11px] text-muted-foreground uppercase tracking-wider mb-3">
                                Select test types
                            </div>

                            {/* Test type list */}
                            <div className="flex flex-col gap-2 mb-5 h-[calc(100vh-256px)] overflow-y-auto">
                                {TC_TYPES.map((t) => {
                                    const sel = selTypes.includes(t.id);
                                    const alreadyGenerated = testCases.some(
                                        (tc) =>
                                            tc.type.toUpperCase() === t.label.toUpperCase() &&
                                            tc.platform?.toUpperCase() === selPlatform?.toUpperCase() &&
                                            tc.storyid?.toUpperCase() === selSource?.id.toUpperCase()
                                    );

                                    return (
                                        <div
                                            key={t.id}
                                            onClick={() => !alreadyGenerated && toggleType(t.id)}
                                            className={`flex items-center gap-3 rounded-lg px-3 py-2 cursor-pointer transition-colors
                                            ${sel ? "bg-primary/10 border border-primary/40" : "bg-background border border-border"}
                                            ${alreadyGenerated ? "opacity-50 cursor-not-allowed" : ""}`}
                                        >
                                            <span className="text-lg">{t.icon}</span>
                                            <div className="flex-1">
                                                <div
                                                    className={`text-[12px] font-semibold font-sans 
                  ${sel ? "text-primary" : "text-foreground"}`}
                                                >
                                                    {t.label}
                                                </div>
                                                <div className="text-[10px] text-muted-foreground mt-0.5">{t.desc}</div>
                                            </div>
                                            <div
                                                className={`w-[17px] h-[17px] rounded-full border flex items-center justify-center text-[9px] text-white
                ${sel ? "border-primary bg-primary" : "border-muted-foreground bg-transparent"}`}
                                            >
                                                {sel ? "✓" : ""}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Error message */}
                            {error && (
                                <div className="text-[11px] text-destructive bg-destructive/10 border border-destructive/20 rounded-md px-3 py-2 mb-3">
                                    {error}
                                </div>
                            )}

                            {/* Generate button */}
                            <button
                                onClick={generate}
                                disabled={selTypes.length === 0 || generating}
                                className={`w-full rounded-lg px-4 py-3 text-[12px] font-bold flex items-center justify-center gap-2 transition-colors
        ${selTypes.length > 0
                                        ? "bg-primary/15 border border-primary/40 text-primary cursor-pointer"
                                        : "bg-muted/5 border border-border text-muted-foreground cursor-not-allowed"}`}
                            >
                                {generating ? (
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
                                        Generating…
                                    </>
                                ) : (
                                    <>
                                        <svg
                                            width="13"
                                            height="13"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                            <path d="M2 17l10 5 10-5" />
                                            <path d="M2 12l10 5 10-5" />
                                        </svg>
                                        Generate{" "}
                                        {selTypes.length > 0 &&
                                            `(${selTypes.length} type${selTypes.length > 1 ? "s" : ""})`}
                                    </>
                                )}
                            </button>
                        </>
                    )}


                </div>
            </div>
        </>
    );
}