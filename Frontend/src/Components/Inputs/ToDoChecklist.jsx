import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { HiMiniPlus } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";

function ToDoChecklist({ todoList, setTodoList }) {
  const [option, setOption] = useState("");

  // Add new todo at top
  const handleAddOption = () => {
    if (option.trim()) {
      setTodoList([option.trim(), ...todoList]);
      setOption("");
    }
  };

  const handleDeleteOption = (ind) => {
    const updatedUser = todoList.filter((_, idx) => idx !== ind);
    setTodoList(updatedUser);
  };

  return (
    <div className="flex flex-col">
      {/* To-Do List (bottom-to-top with animation) */}
      <div className="flex flex-col-reverse">
        <AnimatePresence initial={false}>
          {todoList.map((item, ind) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="flex justify-between bg-gray-50 border border-gray-50 px-3 py-2 rounded-md mb-3 mt-2"
            >
              <p className="text-xs text-black">
                <span className="text-xs text-gray-400 font-semibold mr-2">
                  {ind < 9 ? `0${ind + 1}` : ind + 1}
                </span>
                {item}
              </p>
              <button
                className="cursor-pointer"
                onClick={() => handleDeleteOption(ind)}
              >
                <HiOutlineTrash className="text-lg text-red-500" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input at the bottom */}
      <div className="flex items-center gap-5 mt-4">
        <input
          type="text"
          placeholder="Enter Task"
          value={option}
          onChange={({ target }) => setOption(target.value)}
          className="w-full text-[13px] text-black outline-none bg-white border border-gray-100 px-3 py-2 rounded-md font-medium"
        />
        <button className="card-btn text-nowrap" onClick={handleAddOption}>
          <HiMiniPlus className="text-lg" /> Add
        </button>
      </div>
    </div>
  );
}

export default ToDoChecklist;