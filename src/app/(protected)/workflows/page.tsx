"use client";
import { PLATFORMS } from "@/constants/common";
import React, { useState } from "react";

export default function Workflows() {
  const [active, setActive] = useState(PLATFORMS[0].id);

  const activePlatform = PLATFORMS.find(p => p.id === active);

  return (
    <div className="flex bg-card p-6 rounded-lg overflow-hidden">
      {/* Left side menu */}
      <div className="w-24 flex flex-col gap-2">
        {PLATFORMS.map(p => {
          const isActive = active === p.id;
          const isDisabled = p.id !== "jira" && p.id !== "word";
          return (<button
            key={p.id}
            onClick={() => !isDisabled && setActive(p.id)}
            className={`flex flex-col items-center gap-2 px-3 py-3 rounded-lg text-xs font-medium border transition-colors
          ${isActive ? "border-primary text-primary" : "text-muted-foreground"}
          ${isDisabled ? "opacity-50 cursor-not-allowed" : "hover:border-primary hover:text-primary"}
        `}
          >
            {/* Colored box */}
            <span
              className="w-6 h-6 flex items-center justify-center rounded-md font-bold"
              style={{
                backgroundColor: p.bg,
                border: `1px solid ${p.border}`,
                color: p.color,
              }}
            >
              {p.icon}
            </span>
            {p.label}
          </button>)
        })}
      </div>


      {/* Right side content */}
      <div className="flex-1 flex items-center">
        {activePlatform && (
          <div className="flex justify-between w-full">
            <img
              src={`/workflow/${activePlatform.id}.svg`}
              alt={activePlatform.label}
              className="max-w-full max-h-[500px] rounded-lg transition duration-300 dark:filter dark:brightness-200"
            />
            <div className="w-72 bg-background rounded-lg p-4 space-y-3">
              <h3 className="text-sm font-semibold text-foreground border-b pb-2">
                {activePlatform.label} Workflow
              </h3>
              {PLATFORMS.find(item => item.id === activePlatform.id)?.steps.map(
                (step: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >
                    {/* Number circle with fixed width */}
                    <span
                      className="w-6 h-6 flex items-center justify-center rounded-md bg-card text-foreground text-xs font-bold shrink-0"
                    >
                      {index + 1}
                    </span>
                    {/* Step text */}
                    <p className="text-sm text-muted-foreground">{step}</p>
                  </div>

                )
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
