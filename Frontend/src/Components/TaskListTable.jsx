import React from "react";
import moment from "moment";
import { motion } from "framer-motion";

function TaskListTable({ tableData }) {
  // console.log(tableData);

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-500 border border-green-200";
      case "Pending":
        return "bg-purple-100 text-purple-500 border border-purple-200";
      case "In Progress":
        return "bg-cyan-100 text-cyan-500 border border-cyan-200";
      default:
        return "bg-gray-100 text-gray-500 border border-gray-200";
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-500 border border-red-200";
      case "Medium":
        return "bg-orange-100 text-orange-500 border border-orange-200";
      case "Low":
        return "bg-green-100 text-green-500 border border-green-200";
      default:
        return "bg-gray-100 text-gray-500 border border-gray-200";
    }
  };

  return (
    <div className="overflow-x-auto p-0 rounded-lg mt-3">
      <table className="w-full table-auto border-collapse border border-gray-100/60">
        <thead>
          <tr className="bg-gray-100/50 border-b border-gray-100 text-left">
            <th className="py-3 px-4 text-gray-800 font-semibold text-sm">
              Name
            </th>
            <th className="py-3 px-4 text-gray-800 font-semibold text-sm">
              Status
            </th>
            <th className="py-3 px-4 text-gray-800 font-semibold text-sm">
              Priority
            </th>
            <th className="py-3 px-4 text-gray-800 font-semibold text-sm">
              Created on
            </th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {tableData.map((task, index) => (
            <motion.tr
              key={task._id}
              className={`border-b border-gray-100 bg-white`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <td className="py-3 px-4 text-gray-700">{task.title}</td>
              <td className="py-3 px-4">
                <span
                  className={`px-2 py-1 text-xs rounded inline-block ${getStatusBadgeColor(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
              </td>
              <td className="py-3 px-4">
                <span
                  className={`px-2 py-1 text-xs rounded inline-block ${getPriorityBadgeColor(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>
              </td>
              <td className="py-3 px-4">
                {task.createdAt
                  ? moment(task.createdAt).format("Do MMM YYYY")
                  : "N/A"}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskListTable;
