"use client";

import { statusConfig } from "@/constants/statusConfig";
import { TrendingUp, TrendingDown } from "lucide-react";

export interface MetricData {
  key: string;
  value: string | number; // restrict to meaningful types
}
interface MetricCardProps {
  icon?: React.ReactNode;
  data: MetricData[];
  label: string;
  trend?: {
    value: number;
    direction: "up" | "down";
  };
}

export const MetricCard = ({ icon, data, label, trend }: MetricCardProps) => {
  return (
    <div className="rounded-lg bg-card p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <div className="mt-2 grid grid-cols-3">
            {data.map((item, index) => {
              const sc = statusConfig[item?.key];
              return (
                <div className="flex gap-2 items-center" key={index}>
                  <span className="text-3xl font-semibold text-foreground ">{item.value}</span>
                  {item.key &&
                    <span className={`badge inline-flex h-6 text-xs items-center gap-1.5 px-2 py-0.5 rounded border ${sc?.bg} ${sc?.text} ${sc?.border}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${sc?.dot}`}></span>
                      {item?.key}
                    </span>}
                </div>
              )
            })}
          </div>
          {trend && (
            <div className="mt-3 flex items-center gap-1">
              {trend.direction === "up" ? (
                <TrendingUp className="h-4 w-4 text-primary" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span
                className={`text-xs font-medium ${trend.direction === "up"
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
