// main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const repo = "min-zed-fusion"; // exact repo name

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={`/${repo}`}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
