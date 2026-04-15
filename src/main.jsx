import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HarvestingProvider } from "./context/HarvestingContext";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HarvestingProvider>
      <App />
    </HarvestingProvider>
  </StrictMode>
);
