import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { HiMiniPlus } from "react-icons/hi2";
import { LuPaperclip } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";

function AddAttachmentsInput({ attachments, setAttachments }) {
  const [option, setOption] = useState("");

  const handleAddOption = () => {
    if (option.trim()) {
      // Prepend new attachment to the beginning
      setAttachments([option.trim(), ...attachments]);
      setOption("");
    }
  };

  const handleDeleteOption = (ind) => {
    const updatedData = attachments.filter((_, idx) => idx !== ind);
    setAttachments(updatedData);
  };

  return (
    <div className="flex flex-col">
      {/* Attachment List (newest at top) */}
      <div className="flex flex-col-reverse">
        <AnimatePresence initial={false}>
          {attachments.map((item, ind) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="flex justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3 mt-2"
            >
              <div className="flex-1 flex items-center gap-3 border border-gray-100">
                <LuPaperclip className="text-gray-400" />
                <p className="text-xs text-black">{item}</p>
              </div>
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

      {/* Input Field at the bottom */}
      <div className="flex items-center gap-5 mt-4">
        <div className="flex-1 flex items-center gap-3 border border-gray-100 rounded-md px-3">
          <LuPaperclip className="text-gray-400" />
          <input
            type="text"
            placeholder="Add File Link"
            value={option}
            onChange={({ target }) => setOption(target.value)}
            className="w-full text-[13px] text-black outline-none bg-white py-2"
          />
        </div>
        <button className="card-btn text-nowrap" onClick={handleAddOption}>
          <HiMiniPlus className="text-lg" /> Add
        </button>
      </div>
    </div>
  );
}

export default AddAttachmentsInput;
