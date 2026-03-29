export interface IStory {
    id: string;
    title: string
}
export interface ITestCase {
    id: string;
    title: string;
    type: string;
    priority: "High" | "Medium" | "Low";
    precondition: string;
    steps: string;
    expected: string;
    notes?: string;
    status: "Passed" | "Failed" | "New" | "To Do" | "In Progress" | "Done" | string;
    platform: string;
    source: string;
    generatedat: string;
    storyid?:string;
    storytitle?:string;
    story?: IStory
}


