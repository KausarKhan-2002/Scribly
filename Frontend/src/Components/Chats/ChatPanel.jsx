import { IoMdSend } from "react-icons/io";
import { motion } from "framer-motion";
import { DEFAULT_AVATAR } from "../../Utils/constants";

const chating = [
  {
    senderId: "68260d373cfc9dd9b064ddc1",
    recieverId: "683404ba94754d8ab8702e5e",
    message: "hii",
  },
  {
    senderId: "68260d373cfc9dd9b064ddc1",
    recieverId: "683404ba94754d8ab8702e5e",
    message: "kaise ho bro",
  },
  {
    senderId: "683404ba94754d8ab8702e5e",
    recieverId: "68260d373cfc9dd9b064ddc1",
    message: "Mai thik hu bhai apna sunao",
  },
];

function ChatPanel({ selectedUser }) {
  if (!selectedUser) return null;
  console.log(selectedUser);

  const { name, avatar } = selectedUser;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.3 }}
      className="h-full bg-[#f9fafb] shadow-sm rounded-lg overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-3 bg-white shadow-sm">
        <img
          src={avatar?.cloudinaryUrl || DEFAULT_AVATAR}
          alt={name}
          className="w-10 h-10 object-cover rounded-full"
        />
        <h3 className="text-base font-semibold text-gray-800 truncate capitalize">
          {name}
        </h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 bg-gradient-to-br from-[#f5f7fa] via-[#f0f4f8] to-[#f9fafb] custom-scrollbar">
        {/* Message bubbles would go here */}

        <div className="px-4 py-2 space-y-3">
          {chating.map((msg, ind) => {
            const isSender = msg.recieverId === selectedUser.userId;

            return (
              <div
                key={ind}
                className={`flex ${isSender ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`min-w-[25%] max-w-[50%] px-4 py-2 rounded-lg shadow-sm text-sm whitespace-pre-wrap break-words ${
                    isSender
                      ? "bg-indigo-100 text-gray-800 rounded-br-none"
                      : "bg-white text-gray-900 rounded-bl-none"
                  }`}
                >
                  <p>{msg.message}</p>
                  <p className="text-[10px] text-gray-500 mt-1 text-right">
                    11:02 am
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Input */}
      <div className="p-3 bg-white flex items-center gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
        />
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-full transition">
          <IoMdSend className="text-lg" />
        </button>
      </div>
    </motion.div>
  );
}

export default ChatPanel;
