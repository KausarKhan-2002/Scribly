import React, { useEffect, useState } from "react";
import { LuUsers } from "react-icons/lu";
import Modal from "../Modal";
import { DEFAULT_AVATAR } from "../../Utils/constants";
import AvatarGroup from "../AvatarGroup";
import { API_PATHS, BASE_URL } from "../../Utils/apiPaths";
import axios from "axios";
import { Link } from "react-router-dom";

function SelectUsers({ selectedUsers, setSelectedUsers, value }) {
  const [allUsers, setAllUsers] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [tempSelectedUser, setTempSelectedUser] = useState([]);

  // console.log("All Users: ", allUsers);

  // Handle select and remove user
  const toggleUserSelection = (userId) => {
    setSelectedUsers(
      selectedUsers.includes(userId)
        ? selectedUsers.filter((id) => id != userId)
        : [...selectedUsers, userId]
    );
  };

  // Handle final assignments for members
  const handleAssign = () => {
    setSelectedUsers(tempSelectedUser);
    setIsModelOpen(false);
  };

  // Get all users which has avatar
  const selecteUserAvatars = allUsers
    .filter((user) => selectedUsers.includes(user._id))
    .map((user) => user.avatar?.cloudinaryUrl || DEFAULT_AVATAR);

  // Get connections to assign task
  const getConnections = async () => {
    try {
      const { CONNECTIONS } = API_PATHS.CONNECTIONS;

      const response = await axios.get(BASE_URL + CONNECTIONS, {
        withCredentials: true,
      });
      // console.log(response);
      setAllUsers(response.data?.data || []);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  // Temporary selected users
  useEffect(() => {
    if (selectedUsers.length === 0) {
      setTempSelectedUser([]);
      return;
    }

    setTempSelectedUser(selectedUsers);
  }, [selectedUsers]);

  return (
    <div className="space-y-4 mt-2">
      {/* Show button to open model If no selected users */}
      {selecteUserAvatars.length === 0 && (
        <button className="card-btn" onClick={() => setIsModelOpen(true)}>
          <LuUsers className="text-sm" /> Add Members
        </button>
      )}

      {/* Show avtar groups with more addition funcionality */}
      {selecteUserAvatars.length > 0 && (
        <div className="cursor-pointer" onClick={() => setIsModelOpen(true)}>
          <AvatarGroup avatars={selecteUserAvatars} maxVisible={3} />
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModelOpen}
        onClose={() => setIsModelOpen(false)}
        title="Select Users"
      >
        {/* Modal body */}
        <div className="space-y-4 h-[60vh] overflow-y-auto custom-scrollbar">
          {allUsers.length > 0 &&
            allUsers.map((user) => (
              <div
                key={user.connectionId}
                className="flex items-center gap-4 border-b border-gray-200 py-2"
              >
                <img
                  src={user.avatar?.cloudinaryUrl || DEFAULT_AVATAR}
                  alt={user.name}
                  className="bg-gray-200 w-10 h-10 rounded-full object-cover"
                />

                <div className="flex-1">
                  <p className="font-medium text-gray-800 dark:text-white">
                    {user.name.capitalize()}
                  </p>
                  <p className="text-[13px] text-gray-500">{user.email}</p>
                </div>

                <input
                  type="checkbox"
                  checked={tempSelectedUser.includes(user._id)}
                  onChange={() => toggleUserSelection(user._id)}
                  className="w-4 h-4 text-blue-700 bg-gray-100 border-gray-300 rounded-sm outline-none "
                />
              </div>
            ))}

          {allUsers?.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <div className="max-w-md bg-whiteshadow-md rounded-2xl p-6 dark:border-gray-800">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  No Connections Yet
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  You haven’t added any connections. Start growing your
                  productivity network.
                </p>
                <Link
                  to="/connection"
                  className="inline-block bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium py-2 px-4 rounded-md transition"
                >
                  Create Connection
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Cancel and ADD Body */}
        <div className="flex justify-end gap-5 pt-4">
          <button className="card-btn" onClick={() => setIsModelOpen(false)}>
            CANCEL
          </button>
          <button className="card-btn-fill" onClick={handleAssign}>
            DONE
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default SelectUsers;
