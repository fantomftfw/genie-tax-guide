import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Find the root element
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element with ID 'root' not found in the document.");
}

// Add 'dark' class to the root html element for dark mode
document.documentElement.classList.add('dark');

// Create and render the React app
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
