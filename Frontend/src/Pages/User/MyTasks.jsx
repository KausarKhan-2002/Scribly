import { useEffect, useState } from "react";
import DashboardLayout from "../../Components/Layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import TaskStatusTabs from "../../Components/TaskStatusTabs";
import TaskCard from "../../Components/Cards/TaskCard";
import { DEFAULT_AVATAR } from "../../Utils/constants";
import { useTasks } from "../../Hook/useTasks";

function MyTasks({ isAllTasks }) {
  const [allTasks, setAllTasks] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterTasks, setFilterTasks] = useState([]);
  const [isData, setIsData] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const navigate = useNavigate();
  const getAllTasks = useTasks();

  // Set useLocation state with current taskId when user click on card
  const handleClick = (taskId) => {
    isAllTasks
      ? navigate("/admin/create-task", { state: { taskId } })
      : navigate(`/user/task-details/${taskId}`);
  };

  useEffect(() => {
    getAllTasks(setAllTasks, setIsData, setFilterTasks, setTabs, isAllTasks);
  }, [isAllTasks]);

  // console.log(tabs, activeTab);

  return (
    <DashboardLayout activeMenu="Manage Tasks">
      <div className="my-5">
        {/* Task status buttons with active */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          {/* Manage Task header */}
          <section className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-medium">My Tasks</h2>
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
            </div>
          )}
        </div>

        {/* Task card */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
          {filterTasks.length > 0 &&
            filterTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                assignedTo={task.assignTo?.map(
                  (item) => item.avatar?.cloudinaryUrl || DEFAULT_AVATAR
                )}
                onClick={() => handleClick(task._id)}
              />
            ))}

          {isData && filterTasks.length === 0 && (
            <h2 className="fixed top-50 left-[25%] lg:left-[50%] font-mono font-semibold text-center mt-3 text-slate-500">
              No task found for {activeTab}
            </h2>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default MyTasks;
