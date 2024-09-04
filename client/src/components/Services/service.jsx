import React from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules";
import TandC from "../Common/TandC";
import Recommended from "./Recommended";
const service = ({
   gallery=[],
  serviceName,
  location,
  about,
  packages = [],
   booking,cancellation,terms,singleItems,addOns
}) => {
  return (
    <div className="bg-darkGray/30 w-11/12 p-5 flex gap-10 flex-col">
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
                }} className='w-full sm:h-[60vh]'>
                    {
                        gallery.map((img,index)=>(
                          <SwiperSlide key={index}>
                            <img src={img} alt={`${serviceName} photo ${index + 1}`}   style={{ width: '100%', height: 'auto'}}/>
                          </SwiperSlide>
                        ))
                    }
      </Swiper>

      {/* header section */}
      <div className="sm:flex-row flex flex-col gap-10">
        <div className="flex flex-col gap-10  sm:w-[60%]">
          <div className=" bg-lightGray/10 rounded-md p-10 flex justify-between items-center">
            <div className="flex flex-col gap-3 ">
              <h2 className="font-bold text-3xl text-primaryPeach ">
                {serviceName}
              </h2>
              <p>{location}</p>
              {/* <span>Contact Details: {contact}</span> */}
            </div>
            {/* <span className='w-16 h-16 bg-lightGray/80 text-primaryPeach flex justify-center items-center text-3xl font-bold'>{rating}</span> */}
          </div>
          {/* about section */}
          <div className=" bg-lightGray/10  rounded-md p-10 flex flex-col gap-3">
            <h2 className="font-bold text-3xl text-primaryPeach">
              About {serviceName}
            </h2>
            <div>{about}</div>
          </div>
        </div>
        <div className="sm:w-[40%]">
          <Recommended />
        </div>
      </div>
      {/* single items */}
      <div className="bg-lightGray/10  rounded-md p-10 flex flex-col gap-6">
  <h2 className="font-bold text-3xl text-primaryPeach ">Items we provide</h2>
  
  {/* Titles for Item Name, Quantity, and Price */}
  <div className="bg-lightGray/60 w-[100%] h-[100%] rounded-lg">
    <div className="p-2 flex justify-between items-center text-black">
      <div><b>Item Name</b>(u can buy in sets of 50 min. 50 provided)</div>
      <div className="flex gap-10">
        <div>Quantity</div>
        <div>Price</div>
      </div>
    </div>
    <span className="bg-mediumGray h-[1px] w-[100%] my-1 block"></span>

    {singleItems && (
      singleItems.map((item, index) => (
        <div className="flex flex-col" key={index}>
          <div className="p-2 flex justify-between items-center text-black">
            <div>{item.itemName}</div>
            <div className="flex gap-10">
              <div>{item.itemQuantity}</div>
              <div>{item.itemPrice}</div>
            </div>
          </div>
          <span className="bg-mediumGray h-[1px] w-[100%] my-1 block"></span>
        </div>
      ))
    )}
  </div>
</div>

      {/* all packages */}
      <div className=" bg-lightGray/10  rounded-md p-10 flex flex-col gap-6">
        <h2 className="font-bold text-3xl text-primaryPeach ">Our Packages</h2>
        {packages.map((pkg, index) => (
          <details key={index} className="">
            <summary className="flex gap-10 justify-between px-10 h-24 items-center bg-lightGray/40 rounded-t-xl">
              <div className="font-semibold sm:text-2xl text-md">
                {" "}
                {pkg.packageName} - {pkg.price}
              </div>
              <button>BUY NOW</button>
            </summary>
            <div className="bg-lightGray text-darkGray rounded-b-xl flex flex-col p-3 gap-4 text-lg">
              <ul>
                {pkg.items.map((detail, index) => (
                  <>
                    <li key={index} className="flex justify-between items-center px-10">
                      <span>{detail.itemName}</span>
                      <span>{detail.itemQuantity}</span>
                    </li>
                    <span className="bg-mediumGray h-[1px] w-[100%] my-1 block"></span>
                  </>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>
      {/* addons */}
      <div className="bg-lightGray/10  rounded-md p-10 flex flex-col gap-6">
      <h2 className="font-bold text-3xl text-primaryPeach ">You can add extra</h2>
   
              <textarea
                name="addOns"
                value={addOns}
                onChange={(e) => setAaddOns(e.target.value)}
                className="p-3  rounded-md bg-gray-50/20 outline-none focus:border-pink-500"
                placeholder="Enter add ons"
                rows="1"
              />
        
      </div>
      {/* booking,terms,anddcancellation */}
      <TandC booking={booking} cancellation={cancellation} terms={terms}/>
      {/* review and rating component */}
      {/* <ReviewRating/> */}
    </div>
  );
};

export default service;
