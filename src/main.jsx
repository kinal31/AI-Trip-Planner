import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Toaster } from './components/ui/sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import AppLayout from './components/Layout/AppLayout'
// import App from './App.jsx'
const App = lazy(() => import('./App.jsx'));
// import MyTrips from './My-Trips/MyTrips'
const MyTrips = lazy(() => import('./My-Trips/MyTrips'));
// import CreateTrip from './Pages/CreateTrip'
const CreateTrip = lazy(() => import('./Pages/CreateTrip'));
// import ViewTrip from './Pages/ViewTrip'
const ViewTrip = lazy(() => import('./Pages/ViewTrip'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
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
    ]
  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      {/* <Header /> */}
      <Toaster />
      <RouterProvider router={router} />
      {/* <Footer /> */}
    </GoogleOAuthProvider>
  </StrictMode>,
)
