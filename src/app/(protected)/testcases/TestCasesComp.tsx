"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { FileDown, Plus, Search } from "lucide-react"

import ModalTestCases from "@/components/ModalTestCases";
import ModalTestCaseDetails from "@/components/ModalTestCaseDetails";
import GeneratePanel from "@/components/GeneratePanel";
import { useTestCases } from "@/context/TestCaseContext";
import { exportToExcel } from "@/utils/exportExcel";
import VirtualScroll from "./VirtualScroll";

import { ITestCase } from "@/models/ITestCase";

const mockData = [
  {
    id: "TC-004",
    title: "Verify PDF back cover template loads within 2 seconds under normal network conditions",
    type: "Non Functional",
    priority: "High",
    precondition: "User has stable internet connection (50Mbps)",
    steps: "Open PDF → Navigate to back cover",
    expected: "Back cover template loads within ≤2000ms",
    notes: "Measure using browser dev tools",
    status: "New",
    platform: "Web",
    source: "AI Generator",
    generatedat: new Date().toISOString(),
    storyid: "10038",
    storytitle: "VA-2",
    story: {
      id: "10038",
      title: "VA-2"
    }
  },
  {
    id: "TC-005",
    title: "Validate back cover renders correctly at 400% zoom level",
    type: "Non Functional",
    priority: "Medium",
    precondition: "PDF viewer supports zoom functionality",
    steps: "Open PDF → Zoom to 400% → Navigate to back cover",
    expected: "All template elements remain visible and properly aligned",
    notes: "Check for overlapping elements or cropped content",
    status: "New",
    platform: "Web",
    source: "AI Generator",
    generatedat: new Date().toISOString(),
    storyid: "10038",
    storytitle: "VA-2",
    story: {
      id: "10038",
      title: "VA-2"
    }
  },
  {
    id: "TC-006",
    title: "Test back cover template accessibility for screen readers",
    type: "Non Functional",
    priority: "High",
    precondition: "Screen reader software installed",
    steps: "Enable screen reader → Open PDF → Navigate to back cover",
    expected: "All critical elements have proper alt text/readable order",
    notes: "Verify with NVDA/JAWS",
    status: "New",
    platform: "Web",
    source: "AI Generator",
    generatedat: new Date().toISOString(),
    storyid: "10038",
    storytitle: "VA-2",
    story: {
      id: "10038",
      title: "VA-2"
    }
  }
];


export default function TestCasesComp() {
  const { data: session, status } = useSession();
  const { testCases, setTestCases } = useTestCases();

  const [panelOpen, setPanelOpen] = useState(false);
  const [storyFilter, setStoryFilter] = useState("All");
  const [platformFilter, setPlatformFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  const [allTcs, setAllTcs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selTestcase, setSelTestcase] = useState(null);

  const filtered = testCases?.filter((tc: ITestCase) => {
    const matchStory = storyFilter === "All" || tc.storyid === storyFilter;
    const matchPlatform = platformFilter === "All" || tc.platform === platformFilter;
    const matchType = typeFilter === "All" || tc.type === typeFilter;
    const matchPriority = priorityFilter === "All" || tc.priority === priorityFilter;
    const matchStatus = statusFilter === "All" || tc.status === statusFilter;
    const matchSearch =
      search === "" ||
      tc.title.toLowerCase().includes(search.toLowerCase()) ||
      tc.id.toLowerCase().includes(search.toLowerCase());

    return matchStory && matchPlatform && matchType && matchPriority && matchStatus && matchSearch;
  });

  const handleDone = (parsed: ITestCase, platformLabel: string, source: any) => {
    if (!Array.isArray(parsed) || parsed.length === 0) return;

    const allIds = [...new Set(testCases.map(tc => parseInt(tc.id.replace("TC-", ""), 10)))];
    const maxNum = allIds.length > 0 ? Math.max(...allIds) : 0;

    const nowDate: any = new Date().toLocaleDateString([], { year: "numeric", month: "2-digit", day: "2-digit", });
    const nowTime: any = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", });
    const now = `${nowDate}, ${nowTime}`;

    const created = parsed.map((tc: ITestCase, index: number) => ({
      ...tc,
      id: `TC-${String(maxNum + index + 1).padStart(6, "0")}`,
      status: "New",
      platform: platformLabel,
      source: source?.fields?.summary,
      generatedat: now,
      storyid: tc.story.id,
      storytitle: tc.story.title
    }));

    setAllTcs(created);
    setShowModal(true);
  };

  const handleSave = async (cases: any[]) => {

    try {
      const res = await fetch("api/testcases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ testCases: cases }),
      });

      if (res.status === 200) {
        setTestCases((prev) => [...prev, ...cases]);
        setShowModal(false)
      }

      const jiraRes = await fetch("/api/jira/subtask", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
          parentKey: cases && cases[0].storytitle,
          projectKey: cases && cases[0].storytitle?.split("-")?.[0],
          summary: "AI Generated Test Cases",
          testCases: cases
        })
      })
      const jiraData = await jiraRes.json();
    }
    catch (err: any) {
      console.error("Error saving cases:", err);
    }
  }

  const stories = [
    ...new Map(
      testCases.map(tc => [tc.storyid, { id: tc.storyid, title: tc.storytitle }])
    ).values()
  ];

  const platforms: any = [...new Set(testCases?.map(tc => tc.platform))];
  const types: any = [...new Set(testCases?.map(tc => tc.type))];
  const priorities: any = [...new Set(testCases?.map(tc => tc.priority))];
  const statuses: any = [...new Set(testCases?.map(tc => tc.status))];

  const handleSync = async () => {
    const jiraRes = await fetch("/api/jira/subtask", {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify({
        parentKey: mockData && mockData[0].storytitle,
        projectKey: mockData && mockData[0].storytitle?.split("-")?.[0],
        summary: "AI Generated Subtask",
        testCases: mockData
      })
    })
    const jiraData = await jiraRes.json();
  }

  return (
    <div className="rounded-lg bg-card text-slate-200">
      <div className="grid-bg">
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <div className="flex flex-wrap gap-3 mb-3">

            {/* Platform Filter */}
            <div className="relative inline-block">
              <select
                value={storyFilter}
                onChange={(e) => setStoryFilter(e.target.value)}
                className="bg-background border border-border rounded-lg px-3 py-3 text-xs text-foreground focus:outline-none appearance-none pr-10"
              >
                <option value="All">All Story</option>
                {stories?.map((story, i) => (
                  <option key={i} value={story.id}>
                    {story.id} | {story.title}
                  </option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                ⏷
              </span>
            </div>


            {/* Platform Filter */}
            <div className="relative inline-block">
              <select
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value)}
                className="bg-background border border-border rounded-lg px-3 py-3 text-xs text-foreground focus:outline-none appearance-none pr-10"
              >
                <option value="All">All Platform</option>
                {platforms?.map((platform, i) => (
                  <option key={i} value={platform}>{platform}</option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">⏷</span>
            </div>

            {/* Platform Types */}
            <div className="relative inline-block">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-background border border-border rounded-lg px-3 py-3 text-xs text-foreground focus:outline-none appearance-none pr-10"
              >
                <option value="All">All Types</option>
                {types?.map((type, i) => (
                  <option key={i} value={type}>{type}</option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">⏷</span>
            </div>

            {/* Testcase Type */}
            <div className="relative inline-block">
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="bg-background border border-border rounded-lg px-3 py-3 text-xs text-foreground focus:outline-none appearance-none pr-10"
              >
                <option value="All">All Priority</option>
                {priorities?.map((priority, i) => (
                  <option key={i} value={priority}>{priority}</option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">⏷</span>
            </div>

            {/* Priority Filter */}
            <div className="relative inline-block">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-background border border-border rounded-lg px-3 py-3 text-xs text-foreground focus:outline-none appearance-none pr-10"
              >
                <option value="All">All Status</option>
                {statuses?.map((status, i) => (
                  <option key={i} value={status}>{status}</option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">⏷</span>
            </div>

            <div className="ml-auto flex items-center text-xs text-slate-500 gap-1">
              {/* <button onClick={handleSync} type="button">Sync</button> */}
              {/* Export button */}
              <button
                onClick={() => exportToExcel(filtered, "testcases.xlsx")}
                className="flex items-center gap-2 px-2 py-2 rounded-md 
                bg-green-500/10 border border-green-500 text-green-500 
                text-[12px] font-semibold font-sans cursor-pointer 
                transition-transform duration-150 hover:bg-green-500/20 hover:-translate-y-0.5"
              >
                <div className="w-5 h-5 rounded bg-green-500/10 border border-green-500 flex items-center justify-center">
                  <FileDown className="h-3 w-3 text-green-500" strokeWidth={2} />
                </div>
                Export
                <span className="text-[10px] text-green-500 bg-green-500/10 border border-green-500 rounded px-1.5 font-mono">
                  X
                </span>
              </button>

              {/* Generate button */}
              <button
                onClick={() => setPanelOpen(true)}
                className="flex items-center gap-2 px-2 py-2 rounded-md 
                bg-primary/10 border border-primary/40 text-primary 
                text-[12px] font-semibold font-sans cursor-pointer 
                transition-transform duration-150 hover:bg-primary/20 hover:-translate-y-0.5"
              >
                <div className="w-5 h-5 rounded bg-primary/20 border border-primary/40 flex items-center justify-center">
                  <Plus className="h-3 w-3 text-primary" strokeWidth={2.5} />
                </div>
                Generate New Test Cases
                <span className="text-[10px] text-primary bg-primary/10 border border-primary/20 rounded px-1.5 font-mono">
                  AI
                </span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-5">
            {/* Search */}
            <div className="relative flex-1 min-w-[220px]">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4"
                strokeWidth={2}
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by ID or title..."
                className="form-input-theme"
              />
            </div>
          </div>


          {/* Table */}
          <VirtualScroll data={filtered} setShowDetailsModal={setShowDetailsModal} setSelTestcase={setSelTestcase} rowHeight={48} height={430} />
        </div>
      </div>
      <GeneratePanel testCases={testCases} open={panelOpen} onClose={() => setPanelOpen(false)} onDone={handleDone} />
      <ModalTestCases open={showModal} testCases={allTcs} onClose={() => setShowModal(false)} onSave={handleSave} />
      <ModalTestCaseDetails open={showDetailsModal} testCase={selTestcase} onClose={() => { setShowDetailsModal(false); setSelTestcase(null) }} />
    </div>
  );
}