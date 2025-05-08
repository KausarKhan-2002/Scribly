import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_PATHS, BASE_URL } from "../../Utils/apiPaths";
import axios from "axios";
import DashboardLayout from "../../Components/Layouts/DashboardLayout";
import moment from "moment";
import AvatarGroup from "../../Components/AvatarGroup";
import { LuSquareArrowOutUpRight } from "react-icons/lu";

function ViewTaskDetails() {
  const { id } = useParams();

  const [task, setTask] = useState([]);
  // console.log(task);

  const getStatusTagColor = (status) => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-cyan-50 border border-cyan-500/10";
      case "Completed":
        return "text-lime-500 bg-lime-50 border border-lime-500/10";
      default:
        return "text-violet-500 bg-violet-50 border border-violet-500/10";
    }
  };

  // Get task details
  const getTaskDetailsByID = async () => {
    try {
      const { GET_TASK } = API_PATHS.TASK;

      const response = await axios.get(BASE_URL + GET_TASK(id), {
        withCredentials: true,
      });
      // console.log(response);
      setTask(response.data?.task || []);
    } catch (err) {
      console.log(err.message);
    }
  };

  // Update todo checklist
  const updateToDoChecklist = async (index) => {
    const toDoChecklist = [...task.toDoChecklist];
    const taskId = id;

    if (toDoChecklist && toDoChecklist[index]) {
      toDoChecklist[index].completed = !toDoChecklist[index].completed;
      setTask((prev) => ({ ...prev, toDoChecklist: toDoChecklist }));
      // console.log("toDoChecklist:", toDoChecklist);

      try {
        const { UPDATE_CHECKLIST } = API_PATHS.TASK;

        const response = await axios.put(
          BASE_URL + UPDATE_CHECKLIST(taskId),
          { toDoChecklist },
          {
            withCredentials: true,
          }
        );

        // console.log(response);

        if (response.status === 200) {
          setTask(response?.data?.task || task);
        } else {
          toDoChecklist[index].completed = !toDoChecklist[index].completed;
        }
      } catch (err) {
        console.log(err.message);
        toDoChecklist[index].completed = !toDoChecklist[index].completed;
      }
    }
  };

  // Handle attchment link
  const handleLinkClick = (link) => {
    // Add https If not
    if (!/^https?:\/\//i.test(link)) {
      link = "https://" + link; // default to HTTPS
      window.open(link, "_blank");
    }
  };

  useEffect(() => {
    if (id) {
      getTaskDetailsByID();
    }
  }, [id]);

  if (task.length === 0) return;

  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3">
            {/* Task Header */}
            <section className="flex items-center justify-between">
              <h2 className="text-sm md:text-base lg:text-lg font-medium">
                {task.title}
              </h2>

              <div
                className={`text-[11px] md:text-[13px] font-medium px-4 py-0.5 rounded ${getStatusTagColor(
                  task.status
                )}`}
              >
                {task.status}
              </div>
            </section>

            {/* Task Description */}
            <div className="mt-4">
              <InfoBox label="Description" value={task?.description} />
            </div>

            {/* Task Information */}
            <section className="grid grid-cols-12 gap-4 mt-4">
              {/* Priority */}
              <div className="col-span-6 md:col-span-4">
                <InfoBox label="Priority" value={task?.priority} />
              </div>

              {/* Due Date */}
              <div className="col-span-6 md:col-span-4">
                <InfoBox
                  label="Due Date"
                  value={
                    task?.dueDate
                      ? moment(task.dueDate).format("Do MMM YYYY")
                      : "N/A"
                  }
                />
              </div>

              {/* Assined to with Avatar */}
              <div className="col-span-6 md:col-span-4 text-slate-500">
                <label className="text-xs font-medium">Assigned To </label>

                <AvatarGroup
                  avatars={task?.assignTo?.map((item) => item.avatar) || []}
                  maxVisible={5}
                />
              </div>
            </section>

            <section className="mt-4">
              <label className="text-xs font-medium text-slate-500">
                ToDo Checklist
              </label>

              {task?.toDoChecklist?.map((item, ind) => (
                <ToDoCheckList
                  key={ind}
                  text={item?.text}
                  isChecked={item?.completed}
                  onChange={() => updateToDoChecklist(ind)}
                />
              ))}
            </section>

            {task?.attachments.length > 0 && (
              <section className="mt-4">
                <label className="text-xs font-medium text-slate-500">
                  Attachments
                </label>

                {task?.attachments?.map((link, ind) => (
                  <Attchment
                    key={ind}
                    link={link}
                    index={ind}
                    onClick={() => handleLinkClick(link)}
                  />
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ViewTaskDetails;

function InfoBox({ label, value }) {
  return (
    <>
      <label className="text-xs font-medium text-slate-500">{label}</label>
      <p className="text-[12px] md:text-[13px] font-medium">{value}</p>
    </>
  );
}

function ToDoCheckList({ text, isChecked, onChange }) {
  // console.log(isChecked);

  return (
    <div className="flex items-center gap-3 p-3">
      <input
        id={text}
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="w-4 h-4 text-blue-700 bg-gray-100 border-gray-300 rounded-sm outline-none cursor-pointer"
      />
      <label
        htmlFor={text}
        className="text-[13px] text-gray-900 cursor-pointer"
      >
        {text.capitalize()}
      </label>
    </div>
  );
}

function Attchment({ link, index, onClick }) {
  return (
    <div
      className="flex justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3 mt-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex-1 flex items-center gap-3 border border-gray-100 ">
        <span className="text-xs text-gray-400 font-semibold mr-2">
          {index < 9 ? `0${index + 1}` : index + 1}
        </span>

        <p className="text-xs text-black">{link}</p>
      </div>

      <LuSquareArrowOutUpRight className="text-gray-400" />
    </div>
  );
}
