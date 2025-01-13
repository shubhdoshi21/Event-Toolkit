import React, { useState, useEffect } from 'react';
import axios from 'axios';
import i1 from '../assets/images/download.jpeg';
import { useSelector } from 'react-redux';
import Payment from '../components/Payment.jsx';
import { toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const userId = useSelector(state => state.user._id);
  console.log(userId);

  // useEffect(() => {
  //   const fetchUserDetails = async () => {
  //     try {
  //       const response = await axios.get(
  //         "${import.meta.env.VITE_BACKEND_URL}/api/v1/users/current-user",
  //         { withCredentials: true }
  //       );

  //       const user = response.data.data;
  //       dispatch(setUserDetails(user));
  //       setUserId(user._id);
  //     } catch (err) {
  //       toast.error("Error fetching user details!");
  //       setError("Failed to fetch user details.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUserDetails();
  // }, [dispatch]);

  useEffect(() => {
    if (userId) {
      const fetchCart = async () => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/cart/fetchCart`,
            { userId },
          );

          if (
            response.data &&
            response.data.data &&
            Array.isArray(response.data.data.data)
          ) {
            const cartData = response.data.data.data; // Access the correct nested array
            console.log(cartData);
            setCartItems(cartData);
            calculateTotalPrice(cartData);
          } else {
            setError('No cart items found or invalid data format.');
          }
        } catch (error) {
          setError('Error fetching cart items.');
        }
      };

      fetchCart();
      cartItems.forEach((item, index) => {
        console.log(`Package ${index + 1}:`, item.package);
      });
    }
  }, [userId]);

  const calculateTotalPrice = items => {
    const total = items.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
    setTotalPrice(total);
  };

  const handleDelete = async itemId => {
    try {
      // console.log("delete");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/cart/removeFromCart`,
        { id: itemId },
      );
      console.log("delete");

      if (response.data.success) {
        toast.success('Item removed from cart!');
        const updatedCart = cartItems.filter(item => item._id !== itemId);
        setCartItems(updatedCart);
        calculateTotalPrice(updatedCart);
      } else {
        toast.error('Failed to remove item from cart.');
      }
    } catch (error) {
      toast.error('Error removing item from cart.');
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-8 text-center">
        Your Cart
      </h1>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : cartItems.length === 0 ? (
        <p className=" text-center">Your cart is empty.</p>
      ) : (
        cartItems.map(item => (
          <div
            key={item._id}
            className="bg-gray-800 shadow-2xl rounded-lg p-6 mt-6 flex hover:bg-gray-700 transition duration-300 lg:pl-20 "
          >
            <div className="w-1/3">
              <img  
                src={i1}
                alt={item.name}
                className="w-full h-auto rounded-lg object-cover transform hover:scale-105 transition duration-300"
              />
            </div>
            <div className="w-2/3 pl-10 lg-pl-20">
              <p className="text-xl font-bold ">{item.name}</p>
              <p className="text-pupll">
                Price:{' '}
                <span className="text-lg font-semibold">
                  ${item.totalPrice}
                </span>
              </p>

              <div className=" space-y-1">
                {/* Handling items field if available */}
                {item.items ? (
                  <div className='text-darkGray'>
                    <div>Item Quantity: {item.items.itemQuantity}</div>
                    <div>Item Price: {item.items.itemPrice}</div>
                  </div>
                ) : (
                  <div>nothing to show</div>
                )}

                {/* Handling package field if available */}
                {/* {item.package && Array.isArray(item.package) && item.package.length > 0 ? (
                  item.package.map((pkg, idx) => (
                    <p key={idx}>{pkg.packageName}: ${pkg.packagePrice}</p>
                  ))
                ) : (
                  <p>No package selected.</p>
                )}*/}
                {item.package ? (
                  <div className="pt-3 space-y-2 text-darkGray" >
                    <span>Package name:</span>
                    <div>
                      {item.package.packageName?.map((pkgName, index) => (
                        <div key={index} className="">
                          {pkgName}
                        </div>
                      ))}
                    </div>
                    <div>
                      <div>Package Price: {item.package.packagePrice}</div>
                      <div>
                        Package Quantity: {item.package.packageQuantity}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>No package available</div>
                )}

                <p className="font-bold text-lg ">
                  Total: ${item.totalPrice}
                  <button onClick={() => handleDelete(item._id)} className='ml-5'><MdDelete /></button>
                </p>
               
              </div>
            </div>
          </div>
        ))
      )}

      <div className="mt-6  font-bold">
        <p className="text-2xl">Total Price: ${totalPrice}</p>
        <Payment />
      </div>
    </div>
  );
};

export default Cart;
