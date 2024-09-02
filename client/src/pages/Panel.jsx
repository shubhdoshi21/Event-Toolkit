import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Panel/Sidebar';

const Panel = () => {
  return (
    <div className='w-[100vw] bg-primaryBlack flex h-[100vh] overflow-scroll'>
        <Sidebar/>
        <div className='w-[85vw] ml-[15vw] overflow-scroll'>
            <Outlet/>
        </div>
    </div>
  )
}

export default Panel
