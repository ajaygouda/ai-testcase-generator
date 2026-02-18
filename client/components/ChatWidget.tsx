import { Send, MoreVertical } from "lucide-react";

export const ChatWidget = () => {
  return (
    <div className="rounded-lg bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-primary"></div>
          <h3 className="text-lg font-semibold text-foreground">
            Chat with AI Agent
          </h3>
        </div>
        <button className="text-muted-foreground hover:text-foreground">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-4 space-y-3">
        <div>
          <p className="text-sm font-semibold text-foreground mb-2">
            Generate test cases
          </p>
          <div className="rounded-lg bg-muted p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>⏳</span>
              <span>Fetching...</span>
            </div>
          </div>
        </div>

        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="px-2 py-2 text-left font-semibold text-foreground">
                Scenario ID
              </th>
              <th className="px-2 py-2 text-left font-semibold text-foreground">
                Test Case
              </th>
              <th className="px-2 py-2 text-left font-semibold text-foreground">
                Test Steps
              </th>
              <th className="px-2 py-2 text-left font-semibold text-foreground">
                Expected Result
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td colSpan={4} className="px-2 py-4 text-center text-muted-foreground">
                Fetching...
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 rounded bg-muted px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button className="rounded bg-primary p-2 text-white hover:bg-primary/90">
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
