"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  icon?: React.ReactNode;
  value: string | number;
  label: string;
  trend?: {
    value: number;
    direction: "up" | "down";
  };
}

export const MetricCard = ({ icon, value, label, trend }: MetricCardProps) => {
  return (
    <div className="rounded-lg bg-card p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-semibold text-foreground">
            {value}
          </p>
          {trend && (
            <div className="mt-3 flex items-center gap-1">
              {trend.direction === "up" ? (
                <TrendingUp className="h-4 w-4 text-primary" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span
                className={`text-xs font-medium ${
                  trend.direction === "up"
                    ? "text-primary"
                    : "text-red-500"
                }`}
              >
                {trend.direction === "up" ? "+" : "-"}
                {trend.value}%
              </span>
            </div>
          )}
        </div>
        {icon && <div className="ml-4 flex-shrink-0">{icon}</div>}
      </div>
    </div>
  );
};
