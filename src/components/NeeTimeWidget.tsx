"use client";

import { CheckCircle2, MoreVertical } from "lucide-react";

interface NeeTimeItem {
  id: string;
  name: string;
  time: string;
  enabled: boolean;
}

interface NeeTimeWidgetProps {
  items: NeeTimeItem[];
}

export const NeeTimeWidget = ({ items }: NeeTimeWidgetProps) => {
  return (
    <div className="rounded-lg bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-primary"></div>
          <h3 className="text-lg font-semibold text-foreground">
            Nee Time
          </h3>
        </div>
        <button className="text-muted-foreground hover:text-foreground">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b border-border pb-3 last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                {item.enabled && (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {item.name}
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{item.time}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <button className="flex-1 text-center text-xs text-muted-foreground hover:text-foreground py-2 border-b border-border">
          Factories
        </button>
        <button className="flex-1 text-center text-xs text-muted-foreground hover:text-foreground py-2 border-b border-border">
          Persona
        </button>
      </div>
    </div>
  );
};
