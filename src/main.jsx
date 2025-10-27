import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


import { createBrowserRouter,  RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/CreateTrip.jsx'
import Header from './components/custom/Header'
import { Toaster } from 'react-hot-toast'
import { GoogleOAuthProvider } from '@react-oauth/google';
import TripView from './view-trip/[tripId]/TripView'
import MyTrip from './myTrip/MyTrip'


const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/create-trip',
    element:<CreateTrip/>
  },
  {
    path:'/view-trip/:tripId',
    element:<TripView/>
  },
  {
    path:'/my-trip',
    element:<MyTrip/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header/>
  
<Toaster/>
    <RouterProvider  router={router}/>
    </GoogleOAuthProvider>
  </StrictMode>,
)
