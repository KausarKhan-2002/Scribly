import { motion } from "framer-motion";
import { DEFAULT_AVATAR } from "../../Utils/constants";
import { Bell } from "lucide-react"; // Optional: for notification icon
import { VscClose } from "react-icons/vsc";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import { useAllMessages } from "../../Hook/useAllMessages";
import { useSocket } from "../../Context/SocketProvider";

function UserPanel({ connections, setSelectedUser }) {
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const allMessages = useAllMessages();
  const {onlineUserIds} = useSocket()

  // console.log(onlineUserIds);
  

  const handleClick = (connection) => {
    if (!connection.userId) return;
    allMessages(connection.userId);
    setSelectedUser(connection);
  };

  return (
    <div className="space-y-3 h-full">
      <IoSearchOutline
        onClick={() => setIsSearch(true)}
        className="text-xl fixed top-5 right-5 cursor-pointer z-40"
      />

      <SearchUserModel
        isSearch={isSearch}
        setIsSearch={setIsSearch}
        search={search}
        setSearch={setSearch}
      />

      {connections?.length > 0 &&
        connections.map((connection) => (
          <motion.div
            key={connection.connectionId}
            className="relative flex items-center justify-between bg-white p-4 rounded-xl border border-slate-100 hover:shadow-sm transition duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleClick(connection)}
          >
            {/* Left - Avatar */}
            <motion.img
              src={connection.avatar?.cloudinaryUrl || DEFAULT_AVATAR}
              alt={connection.name}
              className="w-12 h-12 rounded-full object-cover cursor-pointer"
              whileHover={{ scale: 1.1 }}
            />

            {/* Online */}
            <div className="absolute bottom-4 left-13 bg-emerald-500 w-3 h-3 border border-white rounded-full" />

            {/* Center - Name & Timestamp */}
            <div className="flex-1 ml-4">
              <h3 className="font-semibold text-gray-800 dark:text-white text-base">
                {connection.name.capitalize()}
              </h3>
              <p className="text-xs text-gray-500">Last active: 5 mins ago</p>
            </div>

            {/* Right - Notification Badge */}
            <div className="relative flex items-center">
              <Bell size={18} className="text-blue-500" />
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                7
              </span>
            </div>
          </motion.div>
        ))}
    </div>
  );
}

// Search User Model
function SearchUserModel({ isSearch, setIsSearch, search, setSearch }) {
  return (
    <div
      className={`fixed top-3 ${
        isSearch ? "" : "-translate-y-12"
      } w-[92%] bg-white border border-slate-200 rounded-full px-2 flex items-center z-50 transition duration-200`}
    >
      <GoArrowLeft
        onClick={() => setIsSearch(false)}
        className="text-xl text-slate-700 cursor-pointer"
      />
      <input
        type="text"
        placeholder="Search user..."
        className="outline-none w-full p-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search.length > 1 && (
        <VscClose
          size={22}
          onClick={() => setSearch("")}
          className="text-slate-600 bg-white cursor-pointer"
        />
      )}
    </div>
  );
}

export default UserPanel;
