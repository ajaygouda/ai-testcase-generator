import { ITestCase } from "@/models/ITestCase";

export const TC_TYPES = [
  { id: "functional", label: "Functional", icon: "⚙️", desc: "Business logic & behavior" },
  { id: "nonfunctional", label: "Non Functional", icon: "📊", desc: "Performance, reliability & scalability" },
  { id: "ui", label: "UI", icon: "🖥️", desc: "Overall interface, layout & flow" },
  { id: "gui", label: "GUI", icon: "🎨", desc: "Graphical elements like buttons, icons, menus" },
  { id: "integration", label: "Integration", icon: "🔗", desc: "API & service data flows" },
  { id: "regression", label: "Regression", icon: "🔄", desc: "Ensure old features still work" },
  { id: "smoke", label: "Smoke", icon: "💨", desc: "Basic checks for build stability" },
  { id: "sanity", label: "Sanity", icon: "🧠", desc: "Quick validation of critical flows" },
  { id: "database", label: "Database", icon: "🗄️", desc: "Data integrity & queries" },
  { id: "performance", label: "Performance", icon: "⚡", desc: "Speed & responsiveness" },
  { id: "load", label: "Load", icon: "📈", desc: "Behavior under heavy usage" },
  { id: "stress", label: "Stress", icon: "🔥", desc: "System limits & breaking points" },
  { id: "security", label: "Security", icon: "🔒", desc: "Vulnerabilities & protection" },
  { id: "compatibility", label: "Compatibility", icon: "🔀", desc: "Cross-browser & device support" },
  { id: "usability", label: "Usability", icon: "👌", desc: "User experience & accessibility" },
  { id: "uat", label: "UAT", icon: "🙋", desc: "Business validation by users" },
];



export const T = {
  bg: "#141b2d",   // page background — deep navy
  surface: "#1a2035",   // card / panel background
  surfaceAlt: "#1e2847",   // slightly lighter card
  border: "rgba(255,255,255,0.07)",
  borderHov: "rgba(255,255,255,0.14)",
  text: "#e8eaf0",   // primary text
  textMuted: "#8892a4",   // muted labels
  textDim: "#4a5568",   // very dim
  accent: "#2dd4bf",   // teal — matches screenshot arrows/success
  accentGlow: "rgba(45,212,191,0.15)",
  blue: "#3b82f6",
  blueDim: "rgba(59,130,246,0.15)",
  red: "#f87171",
  redDim: "rgba(248,113,113,0.12)",
  amber: "#fbbf24",
  amberDim: "rgba(251,191,36,0.12)",
  purple: "#a78bfa",
  purpleDim: "rgba(167,139,250,0.12)",
};

export const PLATFORMS = [
  {
    id: "jira", label: "Jira", icon: "J", color: "#4c9aff", bg: "rgba(76,154,255,0.1)", border: "rgba(76,154,255,0.3)",
    steps: [
      "Log in with Vation ID",
      "Click the 'Generate AI Test Cases' button",
      "Select dashboard (Jira API)",
      "Select story (Jira API Dashboard)",
      "Select test case type (Functional, UI, etc.)",
      "Generate using AI (Based on user story data)",
      "Store in database and sync to Jira story (Create subtask under user story & attached Excel sheet)",
    ],

  },
  { id: "figma", label: "Figma", icon: "F", color: "#ff7262", bg: "rgba(255,114,98,0.1)", border: "rgba(255,114,98,0.3)", steps: [] },
  { id: "confluence", label: "Confluence", icon: "C", color: "#3b82f6", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.3)", steps: [] },
  { id: "excel", label: "Excel", icon: "X", color: "#22c55e", bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.3)", steps: [] },
  { id: "word", label: "Word", icon: "W", color: "#60a5fa", bg: "rgba(96,165,250,0.1)", border: "rgba(96,165,250,0.3)", steps: [] },
  { id: "zeplin", label: "Zeplin", icon: "Z", color: "#fbbf24", bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.3)", steps: [] },
];

export const TYPE_COLORS = {
  UI: "#c084fc",
  Functional: "#818cf8",
  Integration: "#2dd4bf",
  System: "#fb923c",
  Performance: "#fbbf24",
  Security: "#f87171",
  Negative: "#f97316",
  Validation: "#38bdf8",
};

export const STATUS_CFG = {
  Passed: { bg: "rgba(45,212,191,0.12)", text: "#2dd4bf", border: "rgba(45,212,191,0.25)", dot: "#2dd4bf" },
  Failed: { bg: "rgba(248,113,113,0.12)", text: "#f87171", border: "rgba(248,113,113,0.25)", dot: "#f87171" },
  New: { bg: "rgba(251,191,36,0.12)", text: "#fbbf24", border: "rgba(251,191,36,0.25)", dot: "#fbbf24" },
};

export const PRI_CFG = {
  High: { text: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.22)" },
  Medium: { text: "#60a5fa", bg: "rgba(96,165,250,0.1)", border: "rgba(96,165,250,0.22)" },
  Low: { text: "#8892a4", bg: "rgba(136,146,164,0.1)", border: "rgba(136,146,164,0.2)" },
};

export const SEED = [
  { id: "TC-001", title: "Valid login with correct credentials", type: "Functional", priority: "High", status: "Passed", platform: "Jira", source: "US-101", steps: "Enter valid email & password → Click Login", expected: "Redirect to dashboard", precondition: "User exists", notes: "Test admin & regular user", generatedat: "09:12 AM" },
  { id: "TC-002", title: "Login fails with wrong password", type: "Negative", priority: "High", status: "Passed", platform: "Jira", source: "US-101", steps: "Enter valid email + wrong password → Submit", expected: "Show 'Invalid credentials'", precondition: "User exists", notes: "Don't reveal field error", generatedat: "09:12 AM" },
  { id: "TC-003", title: "Account locks after 5 failed attempts", type: "Security", priority: "High", status: "Failed", platform: "Jira", source: "US-101", steps: "Enter wrong password 5 times", expected: "Account locked for 15 min", precondition: "Account not locked", notes: "Not yet implemented", generatedat: "09:12 AM" },
  { id: "TC-004", title: "Search returns relevant results", type: "Functional", priority: "High", status: "Passed", platform: "Jira", source: "US-102", steps: "Type 'laptop' → Press Enter", expected: "List of laptops displayed", precondition: "Products exist in DB", notes: "", generatedat: "09:45 AM" },
  { id: "TC-005", title: "Search autocomplete suggestions appear", type: "UI", priority: "Medium", status: "Failed", platform: "Figma", source: "FIG-03", steps: "Type 3+ characters in search bar", expected: "Dropdown suggestions appear", precondition: "Search loaded", notes: "Feature not built yet", generatedat: "10:01 AM" },
  { id: "TC-006", title: "Add single item to cart", type: "Functional", priority: "High", status: "Passed", platform: "Jira", source: "US-103", steps: "Open product → Click 'Add to Cart'", expected: "Cart count increments by 1", precondition: "User logged in", notes: "", generatedat: "10:20 AM" },
  { id: "TC-007", title: "Cart persists after page refresh", type: "Integration", priority: "Medium", status: "Pending", platform: "Confluence", source: "CONF-01", steps: "Add items → Refresh page", expected: "Cart items still present", precondition: "Items in cart", notes: "Needs session storage", generatedat: "10:20 AM" },
  { id: "TC-008", title: "Checkout with valid payment", type: "Functional", priority: "High", status: "Passed", platform: "Jira", source: "US-104", steps: "Fill all fields → Click 'Place Order'", expected: "Order confirmation + ID shown", precondition: "Cart not empty", notes: "", generatedat: "11:05 AM" },
  { id: "TC-009", title: "Login page layout on mobile 375px", type: "UI", priority: "Medium", status: "Pending", platform: "Figma", source: "FIG-01", steps: "Open login on 375px viewport", expected: "Layout matches Figma design", precondition: "Mobile emulator", notes: "Check Figma spec v3.2", generatedat: "11:30 AM" },
  { id: "TC-010", title: "API returns 401 on invalid token", type: "Integration", priority: "High", status: "Passed", platform: "Confluence", source: "CONF-01", steps: "Send request with expired JWT", expected: "HTTP 401 Unauthorized", precondition: "Auth service running", notes: "", generatedat: "11:30 AM" },
  { id: "TC-011", title: "Form validation shows inline errors", type: "Validation", priority: "Medium", status: "Pending", platform: "Zeplin", source: "ZEP-02", steps: "Submit form with empty required fields", expected: "Red inline error messages", precondition: "Form visible", notes: "Per Zeplin spec v2.4", generatedat: "12:00 PM" },
  { id: "TC-012", title: "End-to-end purchase flow", type: "System", priority: "High", status: "Pending", platform: "Jira", source: "US-104", steps: "Login → Search → Cart → Checkout → Confirm", expected: "Order confirmed, email sent", precondition: "All services running", notes: "Full E2E regression", generatedat: "12:15 PM" },
];


export const PATHS = {
  home: { path: "/", title: "Home" },
  dashboard: { path: "/dashboard", title: "Dashboard" },
  workflow: { path: "/workflows", title: "Workflows" },
  testcases: { path: "/testcases", title: "Test Cases" },
  aiagents: { path: "/aiagents", title: "AI Agents" },
};
