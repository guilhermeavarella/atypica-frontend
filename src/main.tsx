import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '/src/index.css'; 
import App from './App'
import Login from './pages/Login'
import Home from './pages/Home'
import Upload from './pages/Upload'
import Analysis from './pages/Analysis'
import Settings from './pages/Settings'
import Forum from './pages/Forum'
import Help from './pages/Help'
import Blamed from './pages/Blamed'
import Adapted from './pages/Adapted'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Login /> },
      { path: 'login', element: <Login /> },
      { path: 'home', element: <Home /> },
      { path: 'upload', element: <Upload /> },
      { path: 'analysis/:jobId?', element: <Analysis /> },
      { path: 'settings', element: <Settings /> },
      { path: 'forum', element: <Forum /> },
      { path: 'help', element: <Help /> },
      { path: 'blamed/:jobId?', element: <Blamed /> },
      { path: 'adapted/:jobId?', element: <Adapted /> }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
