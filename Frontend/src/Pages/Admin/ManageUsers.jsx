import React, { useEffect, useState } from "react";
import DashboardLayout from "../../Components/Layouts/DashboardLayout";
import { LuFileSpreadsheet } from "react-icons/lu";
import { useAllUsers } from "../../Hook/useAllUsers";
import UserCard from "../../Components/Cards/UserCard";
import { API_PATHS } from "../../Utils/apiPaths";
import { useDownloadReport } from "../../Hook/useDownloadReport";

function ManageUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const users = useAllUsers();
  const downloadReport = useDownloadReport();

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
          <button
            className="flex download-btn"
            onClick={() => downloadReport(API_PATHS.REPORTS.EXPORT_USERS, "User_information.xlsx")}
          >
            <LuFileSpreadsheet className="text-lg" /> Download Report
          </button>
        </div>

        {/* Users body */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {allUsers?.map((user) => (
            <UserCard key={user._id} userInfo={user} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ManageUsers;
