import { useEffect, useState } from "react";
import DashboardLayout from "../../Components/Layouts/DashboardLayout";
import { PRIORITY_DATA } from "../../Utils/constants";
import { API_PATHS, BASE_URL } from "../../Utils/apiPaths";
import moment from "moment";
import { LuTrash2 } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import SelectDropdown from "../../Components/Inputs/SelectDropdown";
import SelectUsers from "../../Components/Inputs/SelectUsers";
import ToDoChecklist from "../../Components/Inputs/ToDoChecklist";
import AddAttachmentsInput from "../../Components/Inputs/AddAttachmentsInput";
import { usetaskValidator } from "../../Hook/useValidator";
import { useCreateTask } from "../../Hook/useCreateTask";
import Spinner from "../../Shared/Spinner";
import axios from "axios";
import toast from "react-hot-toast";
import useThrottle from "../../Hook/useThrottle";
import Modal from "../../Components/Modal";
import DeleteAlert from "../../Components/DeleteAlert";
import { useDeleteTask } from "../../Hook/useDeleteTask";
import { useTaskByID } from "../../Hook/useTaskByID";

function CreateTask() {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
    assignTo: [],
    toDoChecklist: [],
    attachments: [],
  });
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [currTask, setCurrTask] = useState(null);
  const location = useLocation();
  const { taskId } = location.state || {};
  const taskValidator = usetaskValidator();
  const createTask = useCreateTask();
  const throttle = useThrottle();

  // Store user data when user fill the form
  const handleChange = (key, value) => {
    setTaskData((prev) => ({ ...prev, [key]: value }));
  };

  // Clear form input data
  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: null,
      assignTo: [],
      toDoChecklist: [],
      attachments: [],
    });
  };

  // Update task
  const updateTask = async (currTaskId) => {
    try {
      // console.log(currTaskId);
      setLoading(true);

      const newTask = {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        toDoChecklist: taskData.toDoChecklist.map((toDo) => ({
          text: toDo,
          completed: false,
        })),
      };

      const { UPDATE_TASK } = API_PATHS.TASK;
      const response = await axios.put(
        BASE_URL + UPDATE_TASK(currTaskId),
        newTask,
        {
          withCredentials: true,
        }
      );
      // console.log("Update:", response);
      toast.success("Task updated successfully");
    } catch (err) {
      console.log(err);
      toast.error(err.data?.response?.message || "Internal server error");
    } finally {
      setLoading(false);
    }
  };

  // Get task by ID
  const getTaskByID = useTaskByID();

  // Delete task
  const deleteTask = useDeleteTask();

  const handleSubmit = () => {
    console.log("taskData:", taskData);

    if (!taskValidator(taskData)) return;

    if (taskId) {
      throttle(() => updateTask(currTask._id), 2000);
      return;
    }

    throttle(() => createTask(taskData, setLoading), 1000);
  };

  useEffect(() => {
    // Get task by ID and set to taskData
    if (taskId) {
      getTaskByID(setCurrTask, setTaskData, taskId);
    }
  }, [taskId]);

  return (
    <div className="">
      {/* Form container */}
      <DashboardLayout activeMenu="Create Task">
        <div className="mt-5">
          {/* Form controller */}
          <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
            {/* Create Task form */}
            <div className="form-card col-span-3">
              <section className="flex items-center justify-between">
                <h2 className="text-xl font-medium">
                  {taskId ? "Update Task" : "Create Task"}
                </h2>

                {/* Button to delete task */}
                {taskId && (
                  <button
                    className="flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose-100  cursr-pointer"
                    onClick={() => setOpenDeleteAlert(true)}
                  >
                    <LuTrash2 className="text-base" /> Delete
                  </button>
                )}
              </section>

              {/* Task Title Field */}
              <section className="mt-4">
                <label className="text-xs font-medium text-slate-600">
                  Task Title
                </label>
                <input
                  type="text"
                  placeholder="Create app UI"
                  value={taskData.title}
                  onChange={({ target }) => handleChange("title", target.value)}
                  className="form-input"
                />
              </section>

              {/* Task Description Field */}
              <section className="mt-3">
                <label className="text-xs font-medium text-slate-600">
                  Description
                </label>
                <textarea
                  placeholder="Task Description"
                  value={taskData.description}
                  rows={4}
                  onChange={({ target }) =>
                    handleChange("description", target.value)
                  }
                  className="form-input resize-none"
                />
              </section>

              {/* Task Priority Field with Custom Dropdowm */}
              <section className="mt-2 grid grid-cols-12 gap-4">
                <div className="col-span-6 md:col-span-4">
                  <label className="text-xs font-medium text-slate-600">
                    Priority
                  </label>
                  <SelectDropdown
                    options={PRIORITY_DATA}
                    value={taskData.priority}
                    onChange={(value) => handleChange("priority", value)}
                    placeholder="Select Priority"
                  />
                </div>

                {/* Task DueDate Field */}
                <div className="col-span-6 md:col-span-4">
                  <label className="text-xs font-medium text-slate-600">
                    Due Date
                  </label>
                  <input
                    type="date"
                    placeholder="Create App UI"
                    value={taskData.dueDate}
                    onChange={({ target }) =>
                      handleChange("dueDate", target.value)
                    }
                    className="form-input"
                  />
                </div>

                {/* Task Assign to Field with custom Dropdown */}
                <div className="col-span-12 md:col-span-3">
                  <label className="text-xs font-medium text-slate-600">
                    Assign To
                  </label>
                  <SelectUsers
                    selectedUsers={taskData.assignTo}
                    setSelectedUsers={(value) =>
                      handleChange("assignTo", value)
                    }
                    value={taskData.dueDate}
                  />
                </div>
              </section>

              {/* To DO checklist */}
              <section className="mt-3">
                <label className="text-xs font-medium text-slate-600">
                  TODO Checklist
                </label>
                <ToDoChecklist
                  todoList={taskData?.toDoChecklist}
                  setTodoList={(value) => handleChange("toDoChecklist", value)}
                />
              </section>

              {/* Add attachments */}
              <section className="mt-3">
                <label className="text-xs font-medium text-slate-600">
                  Add Attachments
                </label>
                <AddAttachmentsInput
                  attachments={taskData?.attachments}
                  setAttachments={(value) => handleChange("attachments", value)}
                />
              </section>

              {/* Button to either create or update task */}
              <section className="flex justify-end mt-7">
                <button
                  className="add-btn"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner />
                  ) : taskId ? (
                    "UPDATE TASK"
                  ) : (
                    "CREATE TASK"
                  )}
                </button>
              </section>
            </div>
          </div>
        </div>

        {/* Delete alert Modal */}

        <Modal
          isOpen={openDeleteAlert}
          onClose={() => setOpenDeleteAlert(false)}
          title="Delete Task"
        >
          <DeleteAlert
            content="Are you sure you want to delete this task ?"
            onDelete={() =>
              deleteTask(setLoading, setOpenDeleteAlert, currTask)
            }
            onClose={() => setOpenDeleteAlert(false)}
            onLoading={loading}
          />
        </Modal>
      </DashboardLayout>
    </div>
  );
}

export default CreateTask;
