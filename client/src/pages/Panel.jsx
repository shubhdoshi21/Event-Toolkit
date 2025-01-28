import React from 'react'
import { Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import Sidebar from '../components/Panel/Sidebar';

const Panel = () => {
  const userToken = Cookies.get('accessToken');
  const isAuthenticated = userToken ? true : false;
  return (

   <div className='relative w-[100vw] flex '>
        <Sidebar />
        <div className='h-[100%] bg-primaryBlack w-[100%] pl-[10%] rsm:pl-[15%] '>
            <div className=' w-[100%] h-[100%] pb-20 '>

    {/* <div className='w-[100vw] bg-primaryBlack flex h-[100vh] overflow-scroll'>
        <Sidebar/>
        <div className='w-[85vw] ml-[15vw] overflow-scroll'> */}

            <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Panel
