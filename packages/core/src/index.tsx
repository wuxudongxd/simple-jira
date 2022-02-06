import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppProviders } from "hooks/useReactQuery";
import DevTool from "@wuxudongxd/jira-dev-tool";
import "antd/dist/antd.css";

const apiUrl = "http://localhost:3001";

DevTool(() => {
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </React.StrictMode>,
    document.getElementById("root")
  );
}, apiUrl);
