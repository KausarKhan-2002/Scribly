import { IoMdSend } from "react-icons/io";
import { motion } from "framer-motion";
import { DEFAULT_AVATAR } from "../../Utils/constants";
import { useEffect, useRef, useState } from "react";
import { useSendMsg } from "../../Hook/useSendMsg";
import { useDispatch, useSelector } from "react-redux";
import { addMsg } from "../../Store/getMsgsSlice";

function ChatPanel({ selectedUser }) {
  const [message, setMessage] = useState("");
  const profile = useSelector((store) => store.user);
  const allMessages = useSelector((store) => store.messages);
  const sendMsg = useSendMsg();
  const dispatch = useDispatch();
  const lastMsgRef = useRef();
  //   console.log(profile);

  const handleSendMsg = (e) => {
    e.preventDefault();

    if (profile.user?._id && selectedUser?.userId) {
      const newMsg = {
        senderId: profile?.user?._id,
        receiverId: selectedUser.userId,
        message,
      };

      dispatch(addMsg(newMsg));
      sendMsg(newMsg, message);
    }
    setMessage("");
  };

  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [allMessages]);

  if (!selectedUser) return null;
  // console.log(selectedUser);
  console.log(allMessages);

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
          {allMessages &&
            allMessages.map((msg, ind) => {
              const isSender = msg.receiverId === selectedUser.userId;

              return (
                <motion.div
                  key={ind}
                  className={`flex ${
                    isSender ? "justify-end" : "justify-start"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  ref={lastMsgRef}
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
                </motion.div>
              );
            })}
        </div>
      </div>

      {/* Input */}
      <form
        onSubmit={handleSendMsg}
        className="p-3 bg-white flex items-center gap-2"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-full bg-gray-100 outline-none text-sm"
        />
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-full transition">
          <IoMdSend className="text-lg" />
        </button>
      </form>
    </motion.div>
  );
}

export default ChatPanel;