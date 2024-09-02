import React from "react";
import SidebarLink from "./SidebarLink";
import { sidebarlinks } from "../../data/SidebarLinks";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUserDetails, logoutUser } from "../../features/user/userSlice";
const Sidebar = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user); 
  
    const [loading, setLoading] = useState(true);
    const {userType} =useSelector((state)=>state.user)
    const handleLogout = async () => {
        try {
          await axios.post(
            "http://localhost:8080/api/v1/users/logout",
            {},
            { withCredentials: true }
          );
          dispatch(logoutUser());
          toast.success("Logged out successfully!", {
            autoClose: 1500,
            closeButton: false,
          });
          setTimeout(() => {
            window.location.href = "/auth/signin";
          }, 1500);
        } catch (err) {
          toast.success(err.response?.data?.message || "Error logging out!.", {
            autoClose: 1500,
            closeButton: false,
          });
        }
      };
    console.log(userType)
  return (
    <div>
      <div className="flex w-[105%] text-white flex-col  border-r-richblack-700 h-[100%] bg-primaryPeach/80">
        <div className="flex flex-col">
          {sidebarlinks.map((link) => {
            if (link.type && userType !== link.type) {
              return null;
            }
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            );
          })}
        </div>
        <div onClick={handleLogout} className="block p-2 cursor-pointer">
              Logout
            </div>
      </div>
    </div>
  );
};

export default Sidebar;
