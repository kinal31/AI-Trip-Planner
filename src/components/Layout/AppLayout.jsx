import React, { lazy } from 'react'
// import Header from '../Custom/Header'
const Header = lazy(() => import('../Custom/Header'));
// import Footer from '../Custom/Footer'
const Footer = lazy(() => import('../Custom/Footer'));
import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const AppLayout = () => {
  return (
    <>
      <Helmet>
        <title>AI Trip Planner</title>
        <meta name="description" content="Plan and organize your trips effortlessly with AI Trip Planner." />
        <meta name='keyword' content=' AI Trip Planner, trip planning, travel planning, trip organizer, travel organizer' />
        <link rel="icon" href="/logo.png" />

        <meta name="author" content="Kinal Kotheeya" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/logo.png" />

        {/* Open Graph Meta Tags for Social Media */}
        <meta property="og:title" content="AI Trip Planner - Personalized Travel Itineraries" />
        <meta
          property="og:description"
          content="Plan and organize your trips effortlessly with AI Trip Planner. Get personalized recommendations and explore top destinations worldwide."
        />
        <meta property="og:image" content="/default-social-thumbnail.png" />
        <meta property="og:url" content="https://aitrip-planner-kk.netlify.app/" />
        <meta property="og:type" content="website" />

        {/* Twitter Meta Tags for Social Media */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Trip Planner - Personalized Travel Itineraries" />
        <meta
          name="twitter:description"
          content="Plan and organize your trips effortlessly with AI Trip Planner. Explore personalized travel recommendations and top destinations."
        />
        {/* <meta name="twitter:image" content="/default-social-thumbnail.png" />
        <meta name="twitter:site" content="@yourtwitterhandle" /> */}

        {/* Structured Data for Rich Snippets */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Website",
            "name": "AI Trip Planner",
            "url": "https://aitrip-planner-kk.netlify.app/",
            "description": "AI Trip Planner helps you create personalized travel itineraries and plan trips effortlessly. Discover top destinations, organize trips, and explore with ease.",
            // "image": "https://yourwebsite.com/default-social-thumbnail.png",
            "publisher": {
              "@type": "Organization",
              "name": "Kinal Kotheeya",
            }
          })}
        </script>
      </Helmet>
      <div className='flex flex-col min-h-screen'>
        <Header />
        <Outlet />
        <Footer />
      </div>

    </>
  )
}

export default AppLayout
