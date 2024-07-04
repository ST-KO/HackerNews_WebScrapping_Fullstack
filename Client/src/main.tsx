import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ArticlesContextProvider from "./context/ArticlesContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ArticlesContextProvider>
      <App />
    </ArticlesContextProvider>
  </React.StrictMode>
);
