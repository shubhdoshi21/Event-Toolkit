import React from 'react';
import Service from "./Services/service";

export const catererDetails = {
    imageArray: [
      'https://mindyweiss.com/wp-content/uploads/2019/02/nicholaswray.com-20170930-8159-scaled.jpg',
      'https://www.theknot.com/tk-media/images/69c73118-de4e-4a67-ab33-c83e900eed4d~rs_768.h',
      'https://i.pinimg.com/originals/dd/72/a0/dd72a08748096a1217e29f3ff39c68a0.jpg',
    ],
    serviceName: "Delicious Catering",
    location: "New York, NY",
    contact: "(123) 456-7890",
    rating: "4.4",
    about: "Delicious Catering offers a wide range of food services to meet your every need. From intimate gatherings to large-scale events, we bring culinary excellence to the table.Delicious Catering offers a wide range of food services to meet your every need. From intimate gatherings to large-scale events, we bring culinary excellence to the table.Delicious Catering offers a wide range of food services to meet your every need. From intimate gatherings to large-scale events, we bring culinary excellence to the table.Delicious Catering offers a wide range of food services to meet your every need. From intimate gatherings to large-scale events, we bring culinary excellence to the table.Delicious Catering offers a wide range of food services to meet your every need. From intimate gatherings to large-scale events, we bring culinary excellence to the table.",
    packages: [
      {
        title: "Standard Package",
        price: 500,
        details: ["Appetizer", "Main Course", "Dessert"],
      },
      {
        title: "Premium Package",
        price: 1000,
        details: ["Appetizer", "Main Course", "Dessert", "Drinks"],
      },
      {
        title: "Luxury Package",
        price: 1500,
        details: ["Appetizer", "Main Course", "Dessert", "Drinks", "Live Cooking Station"],
      },
    ],
    booking:"40% of the package price to be paid at the time of booking. Remaining amount to be paid directly to the vendor on the day of the event.",
    cancellation:"This booking cannot be canceled. Changes in date allowed at no extra charge.",
    terms:"No additional charges applicable for transportation within the city. Travel and stay charges to be borne by the client if the event is outside the city.Services taken over and above the provided package will be charged additionally. We guarantee on time arrival of the artistvendor at the location on the day of the event. We do not take responsibility for the quality of services delivered.General marketplace rules "

  };

const Decorator = () => {
  return (
    <div className='w-full bg-primaryBlack text-lightGray h-full flex justify-center items-center pt-10'>
        <Service 
          imageArray={catererDetails.imageArray}
          serviceName={catererDetails.serviceName}
          location={catererDetails.location}
          contact={catererDetails.contact}
          rating={catererDetails.rating}
          about={catererDetails.about}
          packages={catererDetails.packages}
          booking={catererDetails.booking}
  cancellation={catererDetails.cancellation}
  terms={catererDetails.terms}
        />
    </div>
  );
}

export default Decorator;