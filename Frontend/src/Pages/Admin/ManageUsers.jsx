import React, { useEffect, useState } from "react";
import DashboardLayout from "../../Components/Layouts/DashboardLayout";
import { LuFileSpreadsheet } from "react-icons/lu";
import { useAllUsers } from "../../Hook/useAllUsers";
import UserCard from "../../Components/Cards/UserCard";
import { API_PATHS, BASE_URL } from "../../Utils/apiPaths";
import axios from "axios";
import toast from "react-hot-toast";

function ManageUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const users = useAllUsers();

  // Handle downlad to report the file
  const handleDownloadReport = async () => {
    try {
      const { EXPORT_USERS } = API_PATHS.REPORTS;

      // withCredentials allows cookies to be sent, and responseType: "blob" expects a binary file
      const response = await axios.get(BASE_URL + EXPORT_USERS, {
        withCredentials: true,
        responseType: "blob",
      });

      console.log(response);

      // Create a Blob URL (a temporary file URL) from the downloaded data
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary <a> element to trigger the file download
      const link = document.createElement("a");
      link.href = url; // Set the link's href to the Blob URL
      link.setAttribute("download", "user_details.xlsx"); // Set the file name for download
      
      // visualization -> <a href="blob" download="user_details.xlsx"></a> ?

      // Append the link to the document body and trigger a click
      document.body.appendChild(link);
      link.click(); // This initiates the download

      // Clean up by removing the link from the DOM
      link.parentNode.removeChild(link);

      // Revoke the Blob URL to free up memory
      window.URL.revokeObjectURL(url);
    } catch (err) {
      // Log any error to the console
      console.log(err.message);

      // Show a user-friendly error message using toast notification
      toast.error("Failed to download expense details. Please try again.");
    }
  };

  useEffect(() => {
    users(setAllUsers);
  }, []);

  // console.log(allUsers);

  return (
    <DashboardLayout activeMenu="Team Members">
      <div className="mt-5 mb-10">
        {/* Top users header */}
        <div className="flex md:flex-row md:items-center justify-between">
          <h2 className="text-xl font-medium">Team Members</h2>
          <button className="flex download-btn" onClick={handleDownloadReport}>
            <LuFileSpreadsheet className="text-lg" /> Download Report
          </button>
        </div>

        {/* Users body */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {allUsers?.map((user) => (
            <UserCard key={user._id} userInfo={user} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ManageUsers;
