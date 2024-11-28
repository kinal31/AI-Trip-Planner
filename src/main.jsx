import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Toaster } from './components/ui/sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import MyTrips from './My-Trips/MyTrips'
import Footer from './components/Custom/Footer'
// import CreateTrip from './Pages/CreateTrip'
const CreateTrip = lazy(() => import('./Pages/CreateTrip'))
// import Header from './components/Custom/HEader'
const Header = lazy(() => import('./components/Custom/Header'))
// import ViewTrip from './Pages/ViewTrip'
const ViewTrip = lazy(() => import('./Pages/ViewTrip'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/create-trip',
    element: <CreateTrip />,
  },
  {
    path: '/view-trip/:tripId',
    element: <ViewTrip />,
  },
  {
    path: '/mytrip',
    element: <MyTrips />,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header />
      <Toaster />
      <RouterProvider router={router} />
      <Footer/>
    </GoogleOAuthProvider>
  </StrictMode>,
)
