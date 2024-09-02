import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Panel/Sidebar';

const Panel = () => {
  return (
    <div className='relative w-[100vw]  bg-primaryBlack flex h-[100vh]'>
        <Sidebar/>
        <div className='h-[calc[100vh-3.5rem]] w-[5%]'>
            <div className=' w-[100%] h-[100%]  '>
            <Outlet/>
            </div> 
        </div>
    </div>
  )
}

export default Panel