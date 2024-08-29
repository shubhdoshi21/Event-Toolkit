import React from "react";

const TandC = ({ booking, cancellation, terms }) => {
  return (
    <div  className="bg-lightGray/10 p-10 flex flex-col gap-10 rounded-xl" >
    <div className=" w-full rounded-md  flex gap-10">
      <div className="flex flex-col gap-3">
        <h2 className="font-bold text-2xl text-primaryPeach">Booking Policy</h2>
        <p>{booking}</p>
      </div>
    
      <div className="flex flex-col gap-3">
        <h2 className="font-bold text-2xl text-primaryPeach">Terms and Conditions</h2>
        <p>{terms}</p>
      </div>
    </div>
      <div className="flex flex-col gap-3">
      <h2 className="font-bold text-2xl text-primaryPeach">Cancellation Policy</h2>
      <p>{cancellation}</p>
    </div>
    </div>
  );
};

export default TandC;
