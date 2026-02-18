import { Layout } from "@/components/Layout";
import { MetricCard } from "@/components/MetricCard";
import { ExecutionLogs } from "@/components/ExecutionLogs";
import { NeeTimeWidget } from "@/components/NeeTimeWidget";
import { ChatWidget } from "@/components/ChatWidget";
import { Chart } from "@/components/Chart";
import { Bell, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const executionLogs = [
    {
      id: "1",
      name: "Plugin File Not...",
      description: "Found a document in latest messages",
      duration: "52 mins",
      status: "success" as const,
    },
    {
      id: "2",
      name: "Asset Strategy...",
      description: "Data is within last updated to Jira",
      duration: "25 mins",
      status: "success" as const,
    },
    {
      id: "3",
      name: "PLCDi Agent",
      description: "Exported a large dataset to...",
      duration: "231 mins",
      status: "success" as const,
    },
    {
      id: "4",
      name: "Scenario Tagt",
      description: "Imported a list created to Jira",
      duration: "99 mins",
      status: "success" as const,
    },
  ];

  const neeTimeItems = [
    { id: "1", name: "Ceranauri 0253", time: "18:30", enabled: true },
    { id: "2", name: "Zaranan 0756", time: "18:31", enabled: true },
    { id: "3", name: "Ceranauri 0938", time: "18:32", enabled: true },
    { id: "4", name: "Ceranauri 0950", time: "18:51", enabled: true },
  ];

  return (
    <Layout>
      <div className="flex flex-col">
        {/* Header */}
        <header className="border-b border-border bg-background px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <nav className="flex gap-8">
                <button className="text-sm font-medium text-foreground border-b-2 border-primary pb-2">
                  Dashboard
                </button>
                <button className="text-sm font-medium text-muted-foreground hover:text-foreground pb-2">
                  Workflows
                </button>
                <button className="text-sm font-medium text-muted-foreground hover:text-foreground pb-2">
                  AI Agent
                </button>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-3 py-1 rounded-full bg-card text-xs text-foreground border border-border">
                🔔 Test 5st Rences: $1,000.0
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
                  SU
                </div>
                <button className="text-muted-foreground hover:text-foreground">
                  ⏷
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-8">
          {/* Metrics Grid */}
          <div className="mb-8 grid grid-cols-4 gap-4">
            <MetricCard value="8" label="Total Workflows" />
            <MetricCard
              value="61.5K"
              label="Total Executions"
              trend={{ value: 2, direction: "up" }}
            />
            <MetricCard
              value="15.2K"
              label="Test Cases Generated"
            />
            <MetricCard
              value="99.7%"
              label="Success Rate"
              trend={{ value: 0.5, direction: "up" }}
            />
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - Chart and Chat */}
            <div className="col-span-2 space-y-6">
              <Chart />
              <ChatWidget />
            </div>

            {/* Right Column - Logs and Nee Time */}
            <div className="space-y-6">
              <ExecutionLogs logs={executionLogs} />
              <NeeTimeWidget items={neeTimeItems} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
