import React from "react";

const Footer = () => {
  return (
    <footer className="py-8 mt-8  shadow-[0_-7px_10px_rgba(166,103,221,0.3)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0 md:w-[60%]">
            <h3 className="text-2xl font-bold ">Event toolkit</h3>
            <p className=" mt-2"> Our event booking platform simplifies planning for any occasion, from weddings to corporate events. With access to top vendors for catering, decoration, and venues, you can compare prices, check real-time availability, and book seamlessly.  

Features like a dynamic cart, personalized recommendations, and secure payments make event planning stress-free. Vendors benefit from a dedicated dashboard to manage bookings and showcase their services.  

Join us to create unforgettable experiences effortlessly—because every detail counts, and your event deserves the best.   </p>
          </div>
          <div className="mb-6 px-10 md:mb-0">
            <h4 className="text-xl font-bold ">Contact Us</h4>
            <p className=" mt-2">Email: event-toolkit@gmail.com</p>
            <p className="">Phone: +91 123-456-7890</p>
            <p className=" mt-2">
              Address: The M. S. University of Baroda, Pratapgunj,
              Vadodara, Gujarat-390002
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-white pt-4 text-center">
          <p className="">
            © 2025 Event Tolkit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
