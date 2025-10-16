import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Upload from './pages/Upload'
import Analysis from './pages/Analysis'
import Suggestions from './pages/Suggestions'
import Preview from './pages/Preview'
import Settings from './pages/Settings'
import Forum from './pages/Forum'
import Help from './pages/Help'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Login /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'upload', element: <Upload /> },
      { path: 'analysis/:jobId?', element: <Analysis /> },
      { path: 'suggestions/:jobId', element: <Suggestions /> },
      { path: 'preview/:jobId', element: <Preview /> },
      { path: 'settings', element: <Settings /> },
      { path: 'forum', element: <Forum /> },
      { path: 'help', element: <Help /> }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
