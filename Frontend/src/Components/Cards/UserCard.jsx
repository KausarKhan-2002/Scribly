import React from "react";
import { DEFAULT_AVATAR } from "../../Utils/constants";

function UserCard({ userInfo }) {
  const { name, email, avatar, pendingTasks, inProgressTasks, completedTasks } = userInfo;
//   console.log(userInfo);

  return (
    <div className="user-card p-2">
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={avatar || DEFAULT_AVATAR}
            alt="Avatar"
            className="w-12 h-12 rounded-full border-white object-cover"
          />
        </div>

        <div className="">
          <p className="text-sm font-medium ">{name.capitalize()}</p>
          <p className="text-xs text-gray-500">{email}</p>
        </div>
      </section>

      <section className="flex items-end gap-3 mt-5">
        <StatCard label="Pending" count={pendingTasks || 0} status="Pending" />
        <StatCard label="In Progress" count={inProgressTasks || 0} status="In Progress" />
        <StatCard label="Completed" count={completedTasks || 0} status="Completed" />
      </section>
    </div>
  );
}

export default UserCard;

const StatCard = ({ label, count, status }) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-gray-50";
      case "Completed":
        return "text-indigo-500 bg-gray-50";
      default:
        return "text-violet-500 bg-gray-50";
    }
  };

  return (
    <div
      className={`flex-1 text-[10px] font-medium ${getStatusTagColor()} px-4 py-0.5 rounded`}
    >
      <span className="text-[12px] font-semibold">{count}</span> <br /> {label}
    </div>
  );
};
