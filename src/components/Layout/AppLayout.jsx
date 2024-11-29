import React from 'react'
import Header from '../Custom/Header'
import Footer from '../Custom/Footer'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default AppLayout
