import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useLogout } from "../../Hook/useLogout";
import { GoPlus } from "react-icons/go";
import {
  DEFAULT_AVATAR,
  SIDE_MENU_DATA,
  SIDE_MENU_USER_DATA,
} from "../../Utils/constants";
import { motion } from "framer-motion";
import { useRef } from "react";
import CropModal from "../Profile/CropModal";
import { useCloudinary } from "../../Hook/useCloudinary";

function SideMenu() {
  const [sideMenuData, setSideMenuData] = useState([]);
  const navigate = useNavigate();
  const logout = useLogout();
  const location = useLocation();
  const [newAvatar, setnewAvatar] = useState("");
  const [blobFile, setBlobFile] = useState("");
  const [isCropper, setIsCropper] = useState(false);
  const inputRef = useRef(null);
  const cloudinary = useCloudinary();
  const { user } = useSelector((store) => store.user);

  useEffect(() => {
    if (user) {
      setSideMenuData(
        user?.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA
      );
    }
  }, [user]);

  useEffect(() => {
    if (blobFile) {
      cloudinary(blobFile, setBlobFile);
    }
  }, [blobFile]);

  const handleClick = (route) => {
    if (route === "logout") {
      logout();
      return;
    }
    navigate(route);
  };

  const handleButtonClick = () => inputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const blob = URL.createObjectURL(file);
      setnewAvatar(blob);
      setIsCropper(true);
      console.log(blob);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <motion.aside
      // initial={{ x: -100, opacity: 0 }}
      // animate={{ x: 0, opacity: 1 }}
      // transition={{ type: "spring", stiffness: 80, damping: 15 }}
      className="w-64  h-[calc(100vh-62px)] bg-white border-r border-gray-200 sticky top-[61px] z-20 shadow-sm"
    >
      {/* Profile */}
      <div className="relative flex flex-col items-center text-center py-6 px-4 border-b border-gray-100">
        <img
          src={newAvatar ? newAvatar : user?.avatar?.cloudinaryUrl || DEFAULT_AVATAR}
          alt="User Avatar"
          className="w-20 h-20 rounded-full object-cover border border-gray-300 shadow-sm"
        />

        <label className="absolute top-20 left-38">
          <input
            ref={inputRef}
            onChange={handleFileChange}
            type="file"
            className="hidden"
          />
          <button
            onClick={handleButtonClick}
            className="text-lg bg-blue-700 text-white rounded-full cursor-pointer"
          >
            <GoPlus />
          </button>
        </label>

        {isCropper && (
          <CropModal
            blobURL={newAvatar}
            setBlobURL={setnewAvatar}
            setBlobFile={setBlobFile}
            onClose={() => setIsCropper(false)}
          />
        )}

        {user?.role === "admin" && (
          <span className="text-[10px] font-semibold text-white bg-blue-600 px-2 py-0.5 rounded mt-2">
            Admin
          </span>
        )}
        <h4 className="mt-2 text-sm font-semibold text-gray-800">
          {user?.name.capitalize()}
        </h4>
        <p className="text-xs text-gray-500">{user?.email}</p>
      </div>

      {/* Menu */}
      <nav className="flex flex-col mt-6 space-y-4  px-4">
        {sideMenuData.map((item) => {
          const active = isActive(item.path);
          return (
            <motion.button
              key={item.id}
              onClick={() => handleClick(item.path)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium relative overflow-hidden ${
                active
                  ? "text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              {active && (
                <motion.div
                  layoutId="activeBg"
                  className="absolute inset-0 bg-blue-100 border-l-4 border-blue-500 z-[-1] rounded-md"
                />
              )}
              <item.icon className="text-lg" />
              <span>{item.label}</span>
            </motion.button>
          );
        })}
      </nav>
    </motion.aside>
  );
}

export default SideMenu;
