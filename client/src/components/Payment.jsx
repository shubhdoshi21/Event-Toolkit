import React from "react";
import { loadStripe } from "@stripe/stripe-js";
const Payment = () => {
  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51PWtVZDuAWgKsNtLWlTBbBMPiEHIo9hs4ChscB7WaDf8MwCaKradFm0r7TE5gfT4r1AlVEvbI13RsmeM0ECu6RBA004zi06fDH"
    );

    // Hardcoded dummy data
    const dummyProducts = [
      {
        name: "Test Product 1",
        image: "https://via.placeholder.com/150",
        price: 1000, // Price in cents
        quantity: 1,
      },
      {
        name: "Test Product 2",
        image: "https://via.placeholder.com/150",
        price: 2000, // Price in cents
        quantity: 2,
      },
      {
        name: "Test Product 3",
        image: "https://via.placeholder.com/150",
        price: 200, // Price in cents
        quantity: 3,
      },
    ];

    const body = {
      products: dummyProducts,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/registration/payment",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }
      );
      console.log(response);

      const session = await response.json();

      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(`user must be logged in to checkout`);
    }
  };
  return (
    <button className="" onClick={makePayment} type="button">
      Checkout
    </button>
  );
};

export default Payment;
