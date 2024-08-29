import React from 'react'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import {Swiper,SwiperSlide} from "swiper/react"
import { FreeMode, Pagination, Autoplay, Navigation } from 'swiper/modules';
import TandC from "../Common/TandC"
const service = ({
    imageArray, 
    serviceName, 
    location, 
    contact, 
    rating, 
    about, 
    packages,
    booking,cancellation,terms 
}) => {
  return (
    <div className='bg-darkGray/30 w-11/12 p-5 flex gap-10 flex-col'>
         <Swiper   
                slidesPerView={1}
                spaceBetween={0}
                loop={true}
                modules={[FreeMode, Pagination, Autoplay, Navigation]}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                navigation
                pagination={{ clickable: true }}
                freeMode={true}
                breakpoints={{
                  1024: {
                    slidesPerView: 1,
                  },
                }} className='w-full h-[60vh]'>
                    {
                        imageArray.map((img,index)=>(
                          <SwiperSlide key={index}>
                            <img src={img} alt={`${serviceName} photo ${index + 1}`}   style={{ width: '100%', height: 'auto'}}/>
                          </SwiperSlide>
                        ))
                    }
                </Swiper>

                {/* header section */}
                <div className=' bg-lightGray/10 w-[70%] rounded-md p-10 flex justify-between items-center'>
                    <div className='flex flex-col gap-3 '>
                    <h2 className='font-bold text-3xl text-primaryPeach '>{serviceName}</h2>
                    <p>{location}</p>
                    <span>Contact Details: {contact}</span>
                    </div>
                    <span className='w-16 h-16 bg-lightGray/80 text-primaryPeach flex justify-center items-center text-3xl font-bold'>{rating}</span>
                </div>
                {/* about section */}
                <div className=' bg-lightGray/10 w-[70%] rounded-md p-10 flex flex-col gap-3'>
                    <h2 className='font-bold text-3xl text-primaryPeach'>About {serviceName}</h2>
                    <div>{about}</div>
                </div>


                {/* all packages */}
                <div className=' bg-lightGray/10 w-[70%] rounded-md p-10 flex flex-col gap-6'>
                <h2 className='font-bold text-3xl text-primaryPeach '>Our Packages</h2>
                {packages.map((pkg, index) => (
                     <details key={index} className=''>
                         <summary className='flex gap-10 justify-between px-10 h-24 items-center bg-lightGray/40 rounded-t-xl'>

                           <div className='font-semibold text-2xl '>  {pkg.title} - ${pkg.price}</div>
                             <button>BUY NOW</button>
                         </summary>
                 <div className='bg-lightGray text-darkGray rounded-b-xl flex flex-col p-3 gap-4 text-lg'>
                    <ul>
                     {pkg.details.map((detail, index) => (
                        <>
                         <li key={index}>{detail}</li>
                         <span className='bg-mediumGray h-[1px] w-[100%] my-1 block'></span>
                         </>
                      ))}
                     </ul>
                 </div>
                     </details>
        ))}
                </div>
                {/* booking,terms,anddcancellation */}
           <TandC booking={booking} cancellation={cancellation} terms={terms}/>
                {/* review and rating component */}
                {/* <ReviewRating/> */}

              
    </div>
  )
}

export default service