import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePasswordError, setChangePasswordError] = useState(null);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [passwordValid, setPasswordValid] = useState("initial"); // Initial state for new password
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/users/current-user",
          { withCredentials: true }
        );
        setUser(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/v1/users/logout",
        {},
        { withCredentials: true }
      );
      window.location.href = "/auth/signin";
    } catch (err) {
      setError(err);
    }
  };

  const validateNewPassword = (password) => {
    const errors = [];
    if (!/[A-Z]/.test(password))
      errors.push("Must contain an uppercase letter.");
    if (!/[a-z]/.test(password))
      errors.push("Must contain a lowercase letter.");
    if (!/[0-9]/.test(password)) errors.push("Must contain a number.");
    if (!/[!@#$%^&*]/.test(password))
      errors.push("Must contain a special character.");
    if (password.length < 8) errors.push("Must be at least 8 characters long.");

    setPasswordErrors(errors);
    setPasswordValid(errors.length === 0 ? true : false);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setChangePasswordError("New password and confirm password do not match.");
      return;
    }
    if (newPassword === currentPassword) {
      setChangePasswordError(
        "New password and Old password must be different."
      );
      return;
    }
    if (!passwordValid) {
      setChangePasswordError("New password does not meet the requirements.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/api/v1/users/change-password",
        {
          oldPassword: currentPassword,
          newPassword,
        },
        { withCredentials: true }
      );
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setChangePasswordError(null);
      toast.success("Password changed successfully!", {
        autoClose: 1500,
        closeButton: false,
      });
    } catch (err) {
      setChangePasswordError(
        err.response?.data?.message || "Error changing password."
      );
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching user details: {error.message}</div>;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-11/12 flex p-6 shadow-md border-gray-300 border-2 rounded-md flex-row max-[990px]:flex-col">
        {/* Sidebar */}
        <div className="w-1/4 max-[990px]:w-full p-4 border-r-2 border-gray-400 max-[990px]:border-r-0 max-[990px]:border-b-2">
          <nav className="flex flex-col max-[990px]:flex-row max-[990px]:justify-evenly max-[990px]:items-center flex-wrap gap-2">
            <div className="block p-2">My Profile</div>
            <div className="block p-2">History</div>
            <div className="block p-2">My Cart</div>
            <div onClick={handleLogout} className="block p-2 cursor-pointer">
              Logout
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="w-3/4 max-[990px]:w-full pl-6">
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
              <div>
                <label className="block">First Name:</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border rounded-md bg-transparent"
                  value={user?.firstName || ""}
                  readOnly
                />
              </div>
              <div>
                <label className="block">Last Name:</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border rounded-md bg-transparent"
                  value={user?.lastName || ""}
                  readOnly
                />
              </div>
            </div>

            <div>
              <label className="block">Communication Email address:</label>
              <input
                type="email"
                className="w-full mt-1 p-2 border rounded-md bg-transparent"
                value={user?.email || ""}
                readOnly
              />
            </div>

            <div>
              <label className="block">Phone Number:</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-md bg-transparent"
                value={user?.phone || ""}
                readOnly
              />
            </div>

            {/* Change Password Form */}
            <div>
              <h2 className="text-lg font-semibold">Change Password</h2>
              {changePasswordError && (
                <div className="text-red my-4">{changePasswordError}</div>
              )}
              <form onSubmit={handleChangePassword}>
                <div className="mb-4">
                  <label className="block">Current Password:</label>
                  <input
                    type="password"
                    className="w-full mt-1 p-2 border rounded-md bg-transparent"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block">New Password:</label>
                  <input
                    type="password"
                    className={`w-full mt-1 p-2 border rounded-md bg-transparent ${
                      passwordValid === "initial"
                        ? ""
                        : passwordValid
                        ? "border-green-500"
                        : "border-red"
                    }`}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      validateNewPassword(e.target.value);
                    }}
                    required
                  />
                  {passwordValid !== "initial" && !passwordValid && (
                    <div className="text-left text-red text-sm m-2">
                      <ul>
                        {passwordErrors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block">Confirm New Password:</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full mt-1 p-2 border rounded-md bg-transparent"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center justify-end mb-4 px-2 text-sm">
                  <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={() => setShowPassword((prev) => !prev)}
                  />
                  <label htmlFor="showPassword" className="ml-2">
                    Show Password
                  </label>
                </div>
                <button
                  type="submit"
                  className="p-2 bg-[#FF5364] hover:bg-[#FF5364]/80 text-white rounded-md"
                >
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
