"use client";

import { useState, useEffect } from 'react'

const btns = [
  { name: "Jira", link: "https://vation2026.app.n8n.cloud/webhook/Jira-webhook" },
  { name: "Figma", link: "https://vation2026.app.n8n.cloud/webhook/Jira-webhook" },
  { name: "Confluence", link: "https://vation2026.app.n8n.cloud/webhook/Jira-webhook" },
  { name: "Excel", link: "https://vation2026.app.n8n.cloud/webhook/Jira-webhook" },
  { name: "Word", link: "https://vation2026.app.n8n.cloud/webhook/Jira-webhook" },
  { name: "Figma", link: "https://vation2026.app.n8n.cloud/webhook/Jira-webhook" },
  { name: "Zeplin", link: "https://vation2026.app.n8n.cloud/webhook/Jira-webhook" },
]

export const Chart = () => {
  const [dashboards, setDashboards] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [firstValue, setFirstValue] = useState("");
  const [stories, setStories] = useState([]);
  const [secondValue, setSecondValue] = useState("");

  const handleModal = async (item) => {
    setSelected(item);
    setIsOpen(true);
  };

  useEffect(() => {
    const fetchDashboards = async () => {
      try {
        const res = await fetch("/api/jira/dashboards");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setDashboards(data.dashboards || []);
      } catch (err: any) {
        console.log(err)
      }
    };
    fetchDashboards()
  }, []);

  useEffect(() => {
    if (!firstValue) return; 

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/jira/stories?dashboardId=${firstValue}`);
        const data = await res.json();
        setStories(data.issues || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [firstValue]);

  const handleConfirm = async (item: any) => {
    const response = await fetch('/api/trigger', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        link: item.link,
        tool: item.name
      })
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <div className="rounded-lg bg-card p-6">
      <div className="w-full bg-muted rounded flex items-center gap-2">
        {btns.map((btn, index) => (
          <button onClick={() => handleModal(btn)} key={index} className="rounded-md bg-blue-600 py-2 px-4 text-white shadow-md transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" type="button">
            {btn.name}
          </button>
        ))}
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white w-96 rounded-xl shadow-lg p-6 animate-fadeIn">
            <h2 className="text-lg font-semibold mb-2 text-black">
              Link to Jira
            </h2>

            <div className="">

              {/* First Select (Static) */}
              <div>
                <label className=" text-black" htmlFor='linkToJira'>Dashboard</label>
                <select
                  id='linkToJira'
                  value={firstValue}
                  onChange={(e) => setFirstValue(e.target.value)}
                  className="border p-2 rounded w-full text-black"
                >
                  <option value="">Select Dashboard</option>
                  {dashboards.map((dashboard) => (
                    <option key={dashboard.id} value={dashboard.id}>{dashboard.name}</option>
                  ))}
                </select>
              </div>

              {/* Second Select (Dynamic from API) */}
              <div className='mt-6'>
                <label className=" text-black" htmlFor='linkToJira'>Story</label>
                <select
                  value={secondValue}
                  onChange={(e) => setSecondValue(e.target.value)}
                  className="border p-2 rounded w-full text-black"
                >
                  <option value="">Select Story</option>

                  {stories.map((item) => (
                    <option key={item.id} value={item.value}>
                      {item.key}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 text-black"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirm}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};
