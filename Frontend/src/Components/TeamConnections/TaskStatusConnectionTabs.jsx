import React, { useEffect, useRef, useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";

function TaskStatusConnectionTabs({ activeTab, setActiveTab, count }) {
  const tabs = ["Suggestions", "Connections", "Requests", "Sent requests", "Pending requests"];
  return (
    <div className="flex gap-2 items-center w-[40%] lg:w-[35%] xl:w-[30%]">
      <SelectDropdown
        options={tabs}
        value={activeTab}
        onChange={(option) => setActiveTab(option)}
        placeholder="Select Connections"
      />
      <p className="bg-gray-200/70 rounded-full text-xs md:text-sm font-medium text-gray-700 p-1 min-w-8 min-h-8 flex items-center justify-center">
        {count}
      </p>
    </div>
  );
}


function SelectDropdown({ options, value, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
//   console.log(options);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Dropdown button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full text-sm text-black outline-none bg-white border  border-slate-100 px-2.5 py-3 rounded-md mt-2 flex justify-between items-center gap-2"
      >
        {value ? options.find((opt) => opt === value) : placeholder}
        <LuChevronDown
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown menu with animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute w-[130%] bg-white border border-slate-100 rounded-md mt-1 shadow-md z-10"
          >
            {options.map((option, ind) => (
              <div
                key={ind}
                onClick={() => handleSelect(option)}
                className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
              >
                {option}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TaskStatusConnectionTabs;
