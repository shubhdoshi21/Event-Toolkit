import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Panel/Sidebar';

const Panel = () => {
  return (

    {/* <div className='relative border-2 w-[100vw] border-yellow-400 flex '>
        <Sidebar/>
        <div className='h-[100%] bg-primaryBlack w-[100%] border-2 border-green-600'>
            <div className=' w-[100%] h-[100%] pb-20 '>*/}

    <div className='w-[100vw] bg-primaryBlack flex h-[100vh] overflow-scroll'>
        <Sidebar/>
        <div className='w-[85vw] ml-[15vw] overflow-scroll'>

            <Outlet/>
        </div>
    </div>
  )
}

export default Panel
