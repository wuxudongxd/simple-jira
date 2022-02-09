import './index.css';
import 'antd/dist/antd.css';

import DevTool from '@wuxudongxd/jira-dev-tool';
import { AppProviders } from 'hooks/useReactQuery';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

const apiUrl = "http://localhost:3001";

DevTool(() => {
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppProviders>
    </React.StrictMode>,
    document.getElementById("root")
  );
}, apiUrl);
