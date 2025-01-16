import React, { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules";
import TandC from "../Common/TandC";
import Recommended from "./Recommended";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
  addPackageToCart,
  removePackageFromCart,
  selectTotalItemAmount,
  selectTotalPackageAmount,
  selectGrandTotal,
} from "../../features/cartSlice";
import "../../index.css";
import { useNavigate } from "react-router-dom";
import { getPackageNames } from "../../features/cartSlice";
import axios from "axios";
import { setUserDetails } from "../../features/user/userSlice";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Service = ({
  gallery = [],
  serviceName,
  location,
  about,
  packages = [],
  booking,
  cancellation,
  terms,
  singleItems = [],
}) => {
  const navigate = useNavigate();
  const packageNames = useSelector(getPackageNames);
  const safePackageNames = Array.isArray(packageNames) ? packageNames : [];
  const { items, packagesState } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const totalItemAmount = useSelector(selectTotalItemAmount);
  const totalPackageAmount = useSelector(selectTotalPackageAmount);
  const grandTotal = useSelector(selectGrandTotal);
  const [quantities, setQuantities] = useState([]);
  const [pkgQuantity, setPkgQuantity] = useState([]);
  const [itemQuantity, setItemQuantity] = useState([]);
  const [pkgName, setPkgName] = useState([]);
  const [itmArr, setItmArr] = useState([]);
  const [pkgArr, setPkgArr] = useState([]);
  const token = Cookies.get("accessToken");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/current-user`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const obj = response.data.data;
        dispatch(
          setUserDetails({
            _id: obj._id,
            email: obj.email,
            firstName: obj.firstName,
            lastName: obj.lastName,
            userType: obj.userType,
            contactNumber: obj.contactNumber,
          })
        );
        toast.success("Fetching user details!", {
          autoClose: 1500,
          closeButton: false,
        });
      } catch {
        toast.error("Error fetching user details!", {
          autoClose: 1500,
          closeButton: false,
        });
      }
    };
    fetchUserDetails();
  }, [dispatch, token]);

  const handleAddToCart = async () => {
    try {
      const addedResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/cart/addToCart`,
        {
          userId: user._id,
          isVenue: false,
          name: serviceName,
          totalPrice: grandTotal,
          items: itmArr,
          package: pkgArr,
        }
      );
      if (addedResponse.status === 200) {
        navigate("/cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error.message);
    }
  };

  useEffect(() => {
    const totItems = quantities.reduce((acc, qty) => acc + qty, 0);
    const totPkg = pkgQuantity.reduce((acc, qty) => acc + qty, 0);

    setItmArr({
      itemPrice: totalItemAmount,
      itemQuantity: totItems,
    });

    setPkgArr({
      packageName: pkgName.map((pkg) => pkg.packageName),
      packageQuantity: totPkg,
      packagePrice: totalPackageAmount,
    });
  }, [quantities, pkgQuantity, totalItemAmount, totalPackageAmount, pkgName]);

  useEffect(() => {
    if (Array.isArray(packageNames.payload?.cart?.packagesState)) {
      setPkgName(packageNames.payload.cart.packagesState);
    }
  }, [packageNames]);

  useEffect(() => {
    if (singleItems.length > 0) {
      setQuantities(new Array(singleItems.length).fill(0));
    }
  }, [singleItems]);

  useEffect(() => {
    if (packages.length > 0) {
      setPkgQuantity(new Array(packages.length).fill(0));
    }
  }, [packages]);

  const handleAddSingleItem = (item, index) => {
    const newQuantities = [...quantities];
    newQuantities[index] = Math.max(0, newQuantities[index] + 1);

    setQuantities(newQuantities);
    const updatedItem = { ...item, quantity: newQuantities[index] };
    if (quantities[index] > 0) {
      dispatch(addItemToCart(updatedItem));
    }
  };

  const handleRemoveSingleItem = (item, index) => {
    const newQuantities = [...quantities];
    newQuantities[index] = Math.max(0, newQuantities[index] - 1);

    setQuantities(newQuantities);
    const updatedItem = { ...item, quantity: newQuantities[index] };
    if (quantities[index] > 0) {
      dispatch(removeItemFromCart(updatedItem));
    }
  };

  const handleAddPackages = (pkg, inx) => {
    const newPackages = [...pkgQuantity];
    newPackages[inx] = Math.max(0, newPackages[inx] + 50);

    setPkgQuantity(newPackages);
    const updatedItem = { ...pkg, quantity: newPackages[inx] };
    if (pkgQuantity[inx] > 0) {
      dispatch(addPackageToCart(updatedItem));
    }
  };

  const handleRemovePackages = (pkg, inx) => {
    const newPackages = [...pkgQuantity];
    newPackages[inx] = Math.max(0, newPackages[inx] - 50);

    setPkgQuantity(newPackages);
    const updatedItem = { ...pkg, quantity: newPackages[inx] };
    if (pkgQuantity[inx] > 0) {
      dispatch(removePackageFromCart(updatedItem));
    }
  };

  const formatNumber = (num) => num.toLocaleString();

  return (
    <div className="bg-darkGray/30 w-11/12 p-5 flex gap-10 flex-col">
      {/* Swiper */}
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        modules={[FreeMode, Pagination, Autoplay, Navigation]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        className="w-full h-[60vh]"
      >
        {gallery.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`${serviceName} photo ${index + 1}`}
              style={{ width: "100%", height: "auto" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Content */}
      <div className="sm:flex-row flex flex-col gap-10">
        <div className="flex flex-col gap-10 sm:w-[60%]">
          <div className="bg-lightGray/10 rounded-md p-5 flex justify-between items-center">
            <div className="flex flex-col gap-3">
              <h2 className="font-bold text-3xl text-lightpurple">
                {serviceName}
              </h2>
              <p>{location}</p>
            </div>
          </div>
          <div className="bg-lightGray/10 rounded-md p-5 flex flex-col gap-3">
            <h2 className="font-bold text-3xl text-lightpurple">
              About {serviceName}
            </h2>
            <div>{about}</div>
          </div>
        </div>
        <div className="sm:w-[40%]">
          <Recommended />
        </div>
      </div>

      {/* Other sections */}
      {/* Items */}
      {/* Packages */}
      <TandC booking={booking} cancellation={cancellation} terms={terms} />

      {(quantities.some((qty) => qty > 0) ||
        pkgQuantity.some((qty) => qty > 0)) && (
        <div className="bg-white shadow-md rounded-lg p-6 w-80 absolute top-4 right-4 z-50">
          <h2 className="text-lg font-bold mb-4 text-lightpurple">
            Order Summary
          </h2>

          <div className="flex justify-between mb-2">
            <div className="text-gray">Item Quantity</div>
            <div className="font-semibold text-gray">
              {quantities.reduce((acc, qty) => acc + qty, 0)}
            </div>
          </div>
          <div className="flex justify-between mb-4">
            <div className="text-gray">Item Price</div>
            <div className="font-semibold text-gray">
              {formatNumber(totalItemAmount)}
            </div>
          </div>

          <div className="flex justify-between mb-2">
            <div className="text-gray">Package Quantity</div>
            <div className="font-semibold text-gray">
              {" "}
              {pkgQuantity.reduce((acc, qty) => acc + qty, 0)}{" "}
            </div>
          </div>
          <div className="flex justify-between mb-4">
            <div className="text-gray">Package Price</div>
            <div className="font-semibold text-gray">
              {formatNumber(totalPackageAmount)}
            </div>
          </div>

          <div className="flex justify-between mb-4">
            <div>
              <h3 className="text-black">Selected Packages:</h3>
              <ul>
                {pkgName.map((pkg, index) => (
                  <li key={index} className="text-black">
                    {pkg.packageName}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-300 my-4"></div>
          <div className="flex justify-between text-lg font-bold text-lightpurple">
            <span>Grand Total</span>
            <span>{formatNumber(grandTotal)}</span>
          </div>

          <button
            className="mt-6 w-full bg-lightpurple text-white py-2 rounded-lg font-medium hover:bg-primaryPeach/90"
            onClick={handleAddToCart}
            navigate
          >
            Add to Cart
          </button>
        </div>
      )}

      {/*  {(quantities.some(qty => qty > 0) ||
        pkgQuantity.some(qty => qty > 0)) && (
        <div className="bg-white shadow-md rounded-lg p-6 w-80 absolute top-4 right-4 z-50">
          <h2 className="text-lg font-bold mb-4 text-primaryBlack">
            Order Summary
          </h2>

          <div className="flex justify-between mb-2">
            <div className="text-gray-600">Item Quantity</div>
            <div className="font-semibold text-gray-900">
              {quantities.reduce((acc, qty) => acc + qty, 0)}
            </div>
          </div>
          <div className="flex justify-between mb-4">
            <div className="text-gray-600">Item Price</div>
            <div className="font-semibold text-gray-900">
              {formatNumber(totalItemAmount)}
            </div>
          </div>

          <div className="flex justify-between mb-2">
            <div className="text-gray-600">Package Quantity</div>
            <div className="font-semibold text-gray-900">
              {' '}
              {pkgQuantity.reduce((acc, qty) => acc + qty, 0)}{' '}
            </div>
          </div>
          <div className="flex justify-between mb-4">
            <div className="text-gray-600">Package Price</div>
            <div className="font-semibold text-gray-900">
              {formatNumber(totalPackageAmount)}
            </div>
          </div>

          <div className="flex justify-between mb-4">
            <div>
              <h3 className="text-black">Selected Packages:</h3>
              <ul>
                {pkgName.map((pkg, index) => (
                  <li key={index} className="text-black">
                    {pkg.packageName}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-300 my-4"></div>
          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>Grand Total</span>
            <span>{formatNumber(grandTotal)}</span>
          </div>*/}

      <button
        className="mt-6 w-full bg-primaryPeach text-white py-2 rounded-lg font-medium hover:bg-primaryPeach/90"
        onClick={handleAddToCart}
        navigate
      >
        Add to Cart
      </button>
    </div>
  );
};
//     </div>
//   );
// };

{
  /*  </div>
  );
};*/
}

export default Service;
