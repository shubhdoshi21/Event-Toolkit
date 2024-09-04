import React from "react";
import GallerySlider from "../components/GallerySlider";
import i1 from "../assets/images/download.jpeg";
import i2 from "../assets/images/download (1).jpeg";
import i3 from "../assets/images/download (2).jpeg";
import i4 from "../assets/images/download (3).jpeg";
import RegForm from "../components/RegForm";
import ReviewSlider from "../components/ReviewSlider";
import { loadStripe } from '@stripe/stripe-js';

const Registration = () => {
  const makePayment = async (amount) => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_API_KEY);

    const response = await fetch('http://localhost:8080/api/v1/registration/pay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }) // Send the amount to the backend
    });

    const session = await response.json();

    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      console.error("Stripe checkout error:", error);
    }
  };

  // Updated halls array with name, price, and image
  const halls = [
    { name: 'Hall 1', price: 10000, image: i1 },
    { name: 'Hall 2', price: 10000, image: i2 },
    { name: 'Hall 3', price: 10000, image: i3 },
    { name: 'Hall 4', price: 10000, image: i4 },
  ];

  // Similarly for Caterer and Decorator
  const caterer = [
    { name: 'Caterer 1', price: 5000, image: i1 },
    { name: 'Caterer 2', price: 5000, image: i2 },
    { name: 'Caterer 3', price: 5000, image: i3 },
    { name: 'Caterer 4', price: 5000, image: i4 },
  ];

  const decorator = [
    { name: 'Decorator 1', price: 7000, image: i1 },
    { name: 'Decorator 2', price: 7000, image: i2 },
    { name: 'Decorator 3', price: 7000, image: i3 },
    { name: 'Decorator 4', price: 7000, image: i4 },
  ];

  return (
    <div className="bg-black min-h-screen w-full pt-20">
      <GallerySlider slides={2} height={500} halls={halls} btn={"Add to cart"} />
      <p className="text-offwhite text-6xl pb-2 px-10 font-bold">XYZ VENUE</p>
      <div className="bg-mauve w-[40%] h-[5px] mx-10 mb-10 rounded-full"></div>
      <div className="flex flex-col md:flex-row">
        <p className="text-grey px-10 my-10 w-[100%] text-xl">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima perferendis placeat obcaecati consectetur iusto soluta? Esse repellat consequuntur similique temporibus quis. Sit ullam voluptatem et expedita aspernatur sed temporibus, magnam at commodi! Aperiam numquam obcaecati, odio incidunt, at consequatur accusamus vitae culpa distinctio quod officiis pariatur sunt nihil dignissimos veritatis ratione reprehenderit tempora deserunt error a deleniti veniam iste animi? Cumque ratione in iste officia eveniet dolore accusamus porro maiores molestias facilis, vero voluptatibus dolorem tenetur adipisci. Hic voluptatum saepe reprehenderit ea vero repellendus velit provident, alias, molestiae enim quos quae est harum assumenda dolores aut. Doloremque omnis voluptates pariatur.
        </p>
      </div>

      {/* <button onClick={() => makePayment(2000)} className="text-white">Buy Now for $20</button> */}
      
      <p className="text-offwhite text-6xl text-center mt-20 font-semibold">Reviews from users conducting events here!</p>
      <ReviewSlider />
      
      <p className="text-offwhite text-6xl text-center mt-20 font-semibold">CATERER</p>
      <GallerySlider slides={4} height={200} halls={caterer} btn={"Explore Now"} />

      <p className="text-offwhite text-6xl text-center mt-20 font-semibold">DECORATOR</p>
      <GallerySlider slides={4} height={200} halls={decorator} btn={"Explore Now"}/>
    </div>
  );
};

export default Registration;
