import React, { useEffect, useState } from "react";
import DashboardLayout from "../../Components/Layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_PATHS, BASE_URL } from "../../Utils/apiPaths";
import { LuFileSpreadsheet } from "react-icons/lu";
import TaskStatusTabs from "../../Components/TaskStatusTabs";
import TaskCard from "../../Components/Cards/TaskCard";
import { useDispatch } from "react-redux";
import { replaceTask } from "../../Store/tasksSlice";
import { useDownloadReport } from "../../Hook/useDownloadReport";
import { DEFAULT_AVATAR } from "../../Utils/constants";

function ManageTasks() {
  const [allTasks, setAllTasks] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterTasks, setFilterTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const downloadReport = useDownloadReport();

  const totalTasks = filterTasks.length ? filterTasks : allTasks;

  const getAllTasks = async () => {
    try {
      const { GET_TASKS } = API_PATHS.TASK;
      // console.log(BASE_URL + GET_TASKS);

      const response = await axios.get(BASE_URL + GET_TASKS, {
        withCredentials: true,
      });
      // console.log(response);
      setAllTasks(response.data?.tasks || []);
      dispatch(replaceTask(response.data?.tasks || []));

      const statusSummary = response.data?.statusSummary || {};

      // Map statusSummary data woth fixed label and order
      const statusArr = [
        { label: "All", count: statusSummary?.allTasks || 0 },
        { label: "Pending", count: statusSummary?.pendingTasks || 0 },
        { label: "In Progress", count: statusSummary?.inProgressTasks || 0 },
        { label: "Completed", count: statusSummary?.completedTasks || 0 },
      ];
      setTabs(statusArr);
    } catch (err) {
      console.log(err.message);
    }
  };

  // console.log(allTasks);

  // Set useLocation state with current taskId when user click on card
  const handleClick = (taskData) => {
    navigate(`/admin/create-task`, { state: { taskId: taskData._id } });
    // console.log(taskData);
  };

  useEffect(() => {
    getAllTasks(setFilterTasks);
  }, [setFilterTasks]);

  // console.log(allTasks);

  return (
    <DashboardLayout activeMenu="Manage Tasks">
      <div className="my-5">
        {/* Task status buttons with active */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          {/* Manage Task header */}
          <section className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-medium">My Tasks</h2>
            {/* For small screen */}
            <button
              className="flex lg:hidden download-btn"
              onClick={() =>
                downloadReport(
                  API_PATHS.REPORTS.EXPORT_TASKS,
                  "Task_information.xlsx"
                )
              }
            >
              <LuFileSpreadsheet className="text-lg" /> Download Report
            </button>
          </section>

          {/* Task status */}
          {tabs?.[0]?.count > 0 && (
            <div className="flex items-center gap-3">
              <TaskStatusTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                allTasks={allTasks}
                setFilterTasks={setFilterTasks}
              />

              {/* For large screen */}
              <button
                className="hidden lg:flex download-btn"
                onClick={() =>
                  downloadReport(
                    API_PATHS.REPORTS.EXPORT_TASKS,
                    "Task_information.xlsx"
                  )
                }
              >
                <LuFileSpreadsheet className="text-lg" /> Download Report
              </button>
            </div>
          )}
        </div>

        {/* Task card */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
          {totalTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              assignedTo={task.assignTo?.map(
                (item) => item.avatar?.cloudinaryUrl || DEFAULT_AVATAR
              )}
              onClick={() => handleClick(task)}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ManageTasks;
