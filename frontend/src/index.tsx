import React from 'react';
import Routes from './routes';
import ReactDOM from 'react-dom/client';
import * as  ReactRouter from "react-router-dom";
import './interfaces/error';
import './assets/index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ReactRouter.BrowserRouter>
      <ReactRouter.Routes>
        {
          Routes.map((props, key) => (
            <ReactRouter.Route {...props} key={key} />
          ))
        }
      </ReactRouter.Routes>
    </ReactRouter.BrowserRouter>
  </React.StrictMode>
);
