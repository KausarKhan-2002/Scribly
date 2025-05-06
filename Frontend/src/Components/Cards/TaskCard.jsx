import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Progress from "../Layouts/Progress";
import moment from "moment";
import AvatarGroup from "../AvatarGroup";
import { LuPaperclip } from "react-icons/lu";

function TaskCard({ task, assignedTo, onClick }) {
  const {
    title,
    description,
    priority,
    status,
    progress,
    createdAt,
    dueDate,
    attachments,
    completedToDoCount,
    toDoChecklist,
  } = task;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  const getStatusTagColor = () => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-cyan-50 border border-cyan-500/10";
      case "Completed":
        return "text-lime-500 bg-lime-50 border border-lime-500/10";
      default:
        return "text-violet-500 bg-violet-50 border border-violet-500/10";
    }
  };

  const getPriorityTagColor = () => {
    switch (priority) {
      case "Low":
        return "text-emerald-500 bg-emerald-50 border border-emerald-500/10";
      case "Medium":
        return "text-amber-500 bg-amber-50 border border-amber-500/10";
      default:
        return "text-rose-500 bg-rose-50 border border-rose-500/10";
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white rounded-xl py-4 cursor-pointer border border-gray-200/50 hover:shadow-sm"
      onClick={onClick}
    >
      <section className="flex items-end gap-3 px-4">
        <div
          className={`text-[11px] font-medium px-4 py-0.5 rounded ${getStatusTagColor()}`}
        >
          {status}
        </div>
        <div
          className={`text-[11px] font-medium px-4 py-0.5 ${getPriorityTagColor()}`}
        >
          {priority}
        </div>
      </section>

      <section
        className={`px-4 border-l-[3px] ${
          status === "In Progress"
            ? "border-cyan-500"
            : status === "Completed"
            ? "border-indigo-500"
            : "border-violet-500"
        }`}
      >
        <p className="text-sm font-medium text-gray-800 mt-4 line-clamp-2">
          {title}
        </p>
        <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-[18px]">
          {description}
        </p>
        <p className="text-[13px] text-gray-700/80 font-medium my-2 leading-[18px]">
          Task Done:{" "}
          <span className="font-semibold text-gray-700">
            {completedToDoCount || 0} / {toDoChecklist?.length || 0}
          </span>
        </p>

        <Progress progress={progress} status={status} />
      </section>

      <section className="px-4">
        <div className="flex items-center justify-between my-1">
          <div>
            <label className="text-xs text-gray-500">Start Date</label>
            <p className="text-[13px] font-medium text-gray-900">
              {moment(createdAt).format("DD MMM YYYY")}
            </p>
          </div>
          <div>
            <label className="text-xs text-gray-500">Due Date</label>
            <p className="text-[13px] font-medium text-gray-900">
              {moment(dueDate).format("DD MMM YYYY")}
            </p>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-between mt-3 px-4">
        <AvatarGroup avatars={assignedTo || []} />
        {attachments?.length > 0 && (
          <div className="flex items-center gap-2 bg-blue-50 px-2.5 py-1.5 rounded-lg">
            <LuPaperclip className="text-blue-700" />
            <span className="text-xs text-gray-900">{attachments.length}</span>
          </div>
        )}
      </section>
    </motion.div>
  );
}

export default TaskCard;
