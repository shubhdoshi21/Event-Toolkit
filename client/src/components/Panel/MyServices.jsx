import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdLocationOn } from 'react-icons/md'; // Location icon
import { AiOutlineShoppingCart } from 'react-icons/ai'; // Shopping cart icon for packages
import { BsInfoCircle } from 'react-icons/bs'; // Information icon
import { useSelector } from 'react-redux';
import { MdDeleteSweep } from 'react-icons/md'; // Delete icon
import { toast } from 'react-toastify';

const MyServices = () => {
  const [vendors, setVendors] = useState([]);
  const user = useSelector((state) => state.user);
  const userId = user._id;

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/vendor/getVendorByUserId`,
          { userId }
        );
        setVendors(response.data.data.data);
        console.log(vendors);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };

    fetchVendors();
  }, [userId]);

  const deleteService = async (vendorId) => {
    try {
      console.log('Deleted vendor:', vendorId);
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/vendor/deleteServiceDetails/${vendorId}`
      );
      if (response.status === 200) {
        toast.success('Service deleted successfully');
        // Update the state to reflect changes in the UI
        setVendors(vendors.filter((vendor) => vendor._id !== vendorId));
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Failed to delete service');
    }
  };

  return (
    <div className="w-[100%] min-h-[100vh] flex flex-col gap-30 items-center p-6">
      <h2 className="text-4xl pt-10 font-bold text-center text-lightpurple mb-6">
        My Services
      </h2>
      <div className="mx-auto w-full grid md:grid-cols-2 grid-cols-1 pl-[10%] gap-5 sm:pl-[10%] md:pl-[10%] lg:pl-[5%]">
        {vendors.length > 0 ? (
          vendors.map((vendor, index) => (
            <div
              key={index}
              className="bg-lgrey/80 text-gray/60 shadow-md rounded-md p-6 mb-6 min-h-[60%]"
            >
              <h3 className="text-2xl font-semibold text-primaryPeach mb-4">
                {vendor.serviceName}
              </h3>
              <div className="flex justify-between">
                <div className="flex items-center mb-2">
                  <MdLocationOn className="text-gray-600 mr-2" />
                  <p className="text-lg">{vendor.location}</p>
                </div>
                <MdDeleteSweep
                  onClick={() => deleteService(vendor._id)}
                  className="text-gray-600 cursor-pointer"
                />
              </div>
              <p className="mb-2">
                <strong>Vendor Type:</strong> {vendor.vendorType}
              </p>
              <p className="mb-2">
                <strong>Booking Offer:</strong> {vendor.booking}
              </p>
              <p className="mb-2">
                <strong>Cancellation Policy:</strong> {vendor.cancellation}
              </p>
              <p className="mb-2">
                <strong>Terms and Conditions:</strong> {vendor.terms}
              </p>

              {/* Single Items Section */}
              <div className="mt-4">
                <h4 className="text-xl font-semibold mb-2">Single Items</h4>
                <div className="flex">
                  {vendor.singleItems && vendor.singleItems.length > 0 ? (
                    vendor.singleItems.map((item, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 p-4 rounded-lg m-4"
                      >
                        <p className="mb-2">
                          <strong>Name:</strong> {item.itemName}
                        </p>
                        <p className="mb-2">
                          <strong>Quantity:</strong> {item.itemQuantity}
                        </p>
                        <p className="mb-2">
                          <strong>Price:</strong> {item.itemPrice}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>No items added</p>
                  )}
                </div>
              </div>

              {/* Packages Section */}
              <div className="mt-4">
                <h4 className="text-xl font-semibold mb-2">Packages</h4>
                <div className="flex flex-wrap">
                  {vendor.packages && vendor.packages.length > 0 ? (
                    vendor.packages.map((pkg, pkgIndex) => (
                      <div
                        key={pkgIndex}
                        className="bg-gray-100 p-4 rounded-lg m-4"
                      >
                        <h5 className="text-lg font-bold mb-2">
                          {pkg.packageName}
                        </h5>
                        <p className="mb-2">
                          <strong>Price:</strong> ${pkg.price}
                        </p>
                        <p className="mb-2">
                          <strong>Items:</strong>
                        </p>
                        <ul className="list-disc ml-6">
                          {pkg.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              {item.itemName} - {item.itemQuantity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <p>No packages available</p>
                  )}
                </div>
              </div>

              {/* Gallery Section */}
              <div className="mt-4">
                <h4 className="text-xl font-semibold mb-2">Gallery</h4>
                {vendor.gallery && vendor.gallery.length > 0 ? (
                  <div className="flex gap-4">
                    {vendor.gallery.map((image, imageIndex) => (
                      <img
                        key={imageIndex}
                        src={image}
                        alt="Gallery item"
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                ) : (
                  <p>No images in the gallery</p>
                )}
              </div>

              <p className="mt-4">
                <strong>Venue ID:</strong> {vendor.venue}
              </p>
              <p className="mt-4">
                <strong>Created At:</strong>{' '}
                {new Date(vendor.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center">No services available</p>
        )}
      </div>
    </div>
  );
};

export default MyServices;
