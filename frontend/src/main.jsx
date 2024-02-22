import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ActivitySummary from './components/ActivitySummary.jsx'
import './index.css'

import dayjs from 'dayjs';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/home",
    element: <App />
  },
  {
    path: "/temp",
    element: <ActivitySummary location="here" time={dayjs('1990-01-01')} />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
