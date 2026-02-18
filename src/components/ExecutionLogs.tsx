"use client";

import { CheckCircle2, MoreVertical } from "lucide-react";

interface ExecutionLog {
  id: string;
  name: string;
  description: string;
  duration: string;
  status: "success" | "failed" | "running";
}

interface ExecutionLogsProps {
  logs: ExecutionLog[];
}

const getStatusIcon = (status: ExecutionLog["status"]) => {
  switch (status) {
    case "success":
      return <CheckCircle2 className="h-5 w-5 text-primary" />;
    case "failed":
      return <div className="h-5 w-5 rounded-full bg-red-500" />;
    case "running":
      return <div className="h-5 w-5 rounded-full bg-yellow-500 animate-pulse" />;
  }
};

export const ExecutionLogs = ({ logs }: ExecutionLogsProps) => {
  return (
    <div className="rounded-lg bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Execution Logs
        </h3>
        <button className="text-muted-foreground hover:text-foreground">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-3">
        {logs.map((log) => (
          <div
            key={log.id}
            className="flex items-start gap-3 border-b border-border pb-3 last:border-0"
          >
            <div className="mt-0.5">{getStatusIcon(log.status)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{log.name}</p>
              <p className="text-xs text-muted-foreground">{log.description}</p>
            </div>
            <p className="text-xs text-muted-foreground flex-shrink-0">
              {log.duration}
            </p>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full text-center text-xs text-primary hover:text-primary/80 font-medium py-2">
        More in Metrics
      </button>
    </div>
  );
};
