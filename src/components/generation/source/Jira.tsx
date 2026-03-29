import { IJiraDashboard, IJiraStory } from '@/models/IJira';
import React from 'react'

const Jira = ({ selDashboard, setSelDashboard, dashboardsLoading, jiraDashboard, jiraStories, storiesLoading, handleStory, }) => {
    return (
        <>
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
                                onClick={() => handleStory(item)}
                                className={`flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors 
                                            ${i < arr.length - 1 ? "border-b border-border" : ""} 
                                            hover:bg-muted/10`}
                            >
                                <div className="flex-1">
                                    <div className="text-[12px] font-medium text-foreground">{item.key}</div>
                                    <div className="text-[10px] text-muted-foreground mt-0.5 truncate">
                                        {item.fields.summary}
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
    )
}

export default Jira