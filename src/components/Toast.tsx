import React, { useState, useEffect } from "react";

const Toast = ({ type, message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center w-[400px] max-w-lg p-4 rounded-lg shadow-lg border bg-background transition-all duration-300 ease-in-out${visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`} role="alert">
      <div className={`${type === "success" ? "bg-green-500/30 text-green-500" : type === "success" ? "bg-rose-500/30 text-rose-500" : "bg-amber-500/30 text-amber" } inline-flex items-center justify-center shrink-0 w-7 h-7 rounded`}>
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={
              type === "success"
                ? "M5 11.917 9.724 16.5 19 7.5"
                : type === "danger"
                ? "M6 18 17.94 6M18 18 6.06 6"
                : "M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            }
          />
        </svg>
        <span className="sr-only">{`${type.toUpperCase()} icon`}</span>
      </div>
      <div className="ml-3 text-sm font-normal text-foreground">{message}</div>
      <button
        onClick={() => setVisible(false)}
        className="ml-auto text-muted-foreground hover:text-foreground focus:outline-none"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
