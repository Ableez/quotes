import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './Routes/App'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from './Routes/Login'
import ErrorPage from './Routes/ErrorPage'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'login',
        element: <Login />
      }
    ]

  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
