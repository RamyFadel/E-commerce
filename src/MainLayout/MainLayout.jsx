import React, { useContext, useEffect } from 'react'
import Navbar from '../component/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { userContext } from '../Context/UserContext';
import Footer from '../component/Footer/Footer';

export default function MainLayout() {
  let {setUserToken}=useContext(userContext);
  useEffect(()=>{
    if(localStorage.getItem('userToken')!==null)
    {
      setUserToken(localStorage.getItem('userToken'))
    } },[])

  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}
