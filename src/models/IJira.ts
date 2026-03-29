import { ITestCase } from "./ITestCase";

export interface IJiraDashboard {
    id: string;
    isFavourite: boolean;
    isWritable: boolean;
    name: string;
    popularity: number;
    self: string;
    sharePermissions: { id: number; type: string; }[];
    systemDashboard: boolean;
    editPermissions: any[];
    view: string;
}


export interface IJiraDashboardResponse {
    dashboards: IJiraDashboard[];
    maxResults: number;
    startAt: number;
    total: number;
}

export interface IJiraStoryDescriptionNode {
    type: string;
    content?: IJiraStoryDescriptionNode[];
    text?: string;
}

export interface IJiraStory {
    id: string;
    key: string;
    title?: string;
    acceptanceCriteria?: string;
    testCases?: ITestCase[];
    fields: {
        summary: string;
        created: string;
        issuetype: {
            id: string;
            name: string;
            description: string;
            iconUrl: string;
            subtask: boolean;
        };
        description?: {
            type: string;
            version: number;
            content: IJiraStoryDescriptionNode[];
        };
        status?: {
            name: string
        }
    }
}


export interface IJiraStoryResponse {
    issues: IJiraStory[];
    isLast: boolean;
}