import React, { useEffect, useState } from "react";
import GallerySlider from "../components/GallerySlider";
import i1 from "../assets/images/download.jpeg";
import i2 from "../assets/images/download (1).jpeg";
import i3 from "../assets/images/download (2).jpeg";
import i4 from "../assets/images/download (3).jpeg";
import ReviewSlider from "../components/ReviewSlider";
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import axios from 'axios'
import GallerySlider2 from "../components/GallerySlider2";

const Registration = () => {
  // const makePayment = async (amount) => {
  //   const stripe = await loadStripe(import.meta.env.VITE_STRIPE_API_KEY);

  //   const response = await fetch('http://localhost:8080/api/v1/registration/pay', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ amount }) // Send the amount to the backend
  //   });

  //   const session = await response.json();

  //   const { error } = await stripe.redirectToCheckout({
  //     sessionId: session.id,
  //   });

  //   if (error) {
  //     console.error("Stripe checkout error:", error);
  //   }
  // };
const [halls,setHalls] = useState([]);
const [venue, setvenueData] = useState({});
const [caterer, setCaterers] = useState([]);
const [decorator, setDecorators] = useState([]);
const [reviews,setReview] = useState([]);
  const {selectedVenue} = useSelector((state) => state.venue);
  useEffect( ()=>{
    const getReview= async () => {
    const response = await axios.post(`http://localhost:8080/api/v1/reviews/getReviewsByType`,{
      reviewType:"Venues"
    });
    console.log(response);
    setReview(response?.data?.data?.data);
  };getReview();
  },[])
  useEffect( ()=>{
    const getHalls = async () => {
    console.log(selectedVenue);
      
    const response = await axios.post(`http://localhost:8080/api/v1/venues/getAllSubVenuesAtVenue`,{
      venueId:selectedVenue._id,
    });
    console.log(response);

    setHalls(response?.data?.data?.data);
    console.log(halls);
  }; getHalls();
  },[])

  useEffect( ()=>{
    const getVenueById = async () => {
    console.log(selectedVenue);
      
    const response = await axios.post(`http://localhost:8080/api/v1/venues/getVenueById`,{
      venueId:selectedVenue._id,
    });
    console.log(response);
    setvenueData(response?.data?.data?.data);
    console.log(venue);

  }; getVenueById();
  },[])
  
  useEffect( ()=>{
    const getDecorators = async () => {
    console.log(selectedVenue);
      
    const response = await axios.post(`http://localhost:8080/api/v1/vendor/getAllByServiceType`,{
      venue:selectedVenue._id,
      vendorType:"decorator",
    });
    console.log(response);
    setDecorators(response?.data?.data?.data);
  };getDecorators();
  },[])



  // const halls = [
  //   { name: 'Hall 1', price: 10000, description: 'Spacious hall with modern amenities', image: i1 },
  //   { name: 'Hall 2', price: 10000, description: 'Ideal for medium-sized events', image: i2 },
  //   { name: 'Hall 3', price: 10000, description: 'Cozy hall with excellent acoustics', image: i3 },
  //   { name: 'Hall 4', price: 10000, description: 'Elegant hall for premium events', image: i4 },
  // ];

  // const caterer = [
  //   { name: 'Caterer 1', price: 5000, description: 'Delicious multi-cuisine options', image: i1 },
  //   { name: 'Caterer 2', price: 5000, description: 'Expert in local and continental dishes', image: i2 },
  //   { name: 'Caterer 3', price: 5000, description: 'High-quality ingredients and presentation', image: i3 },
  //   { name: 'Caterer 4', price: 5000, description: 'Customized menus for every occasion', image: i4 },
  // ];

  // const decorator = [
  //   { name: 'Decorator 1', price: 7000, description: 'Elegant and trendy decor styles', image: i1 },
  //   { name: 'Decorator 2', price: 7000, description: 'Creative themes and unique designs', image: i2 },
  //   { name: 'Decorator 3', price: 7000, description: 'High-quality materials and finishes', image: i3 },
  //   { name: 'Decorator 4', price: 7000, description: 'Personalized decor to match your event', image: i4 },
  // ];

  return (
    <div className="bg-black min-h-screen w-full pt-20">
      <GallerySlider slides={2} height={500} halls={halls} btn={"Add to cart"} />
      <p className="text-offwhite text-6xl pb-2 px-10 font-bold">{selectedVenue.venueName}</p>
      <div className="bg-mauve w-[40%] h-[5px] mx-10 mb-10 rounded-full"></div>
      <div className="flex flex-col md:flex-row">   
        <p className="text-grey px-10 my-10 w-[100%] text-xl">
         {selectedVenue.venueDescription}
        </p>
      </div>

      {/* <button onClick={() => makePayment(2000)} className="text-white">Buy Now for $20</button> */}
      
      <p className="text-offwhite text-6xl text-center mt-20 font-semibold">Reviews from users conducting events here!</p>
      <ReviewSlider reviews={reviews}/>
      
      <p className="text-offwhite text-6xl text-center mt-20 font-semibold">CATERER</p>
      <GallerySlider2 slides={3} height={300} halls={caterer} btn={"Explore Now"} />

      <p className="text-offwhite text-6xl text-center mt-20 font-semibold">DECORATOR</p>
      <GallerySlider2 slides={3} height={300} halls={decorator} btn={"Explore Now"}/>
    </div>
  );
};

export default Registration;
