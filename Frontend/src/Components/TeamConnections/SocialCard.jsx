import { useState } from "react";
import { motion } from "framer-motion";
import { BsChatSquare } from "react-icons/bs";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { DEFAULT_AVATAR } from "../../Utils/constants";
import { useAcceptReject } from "../../Hook/useAcceptReject";
import { useToggleConnection } from "../../Hook/useToggleConnection";
import toast from "react-hot-toast";

function SocialCard({ user, activeTab, setConnections }) {
  // console.log(user);

  const [isConnected, setIsConnected] = useState(
    activeTab === "Suggestions" ? false : true
  );
  const acceptReject = useAcceptReject();
  const toggleConnection = useToggleConnection();

  const handleSuggestions = () => {
    // console.log(user);

    toggleConnection(isConnected, setIsConnected, user.toUserId);
  };

  const handleAcceptReject = (type) => {
    setConnections(user.userId);
    acceptReject(type, user.userId);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-sm rounded-2xl p-4 flex justify-between items-center"
    >
      <div className="flex items-center gap-4">
        <img
          src={user?.avatar?.cloudinaryUrl || DEFAULT_AVATAR}
          alt={user?.name}
          className="w-14 h-14 rounded-full object-cover border border-gray-300"
        />
        <div>
          <h2 className="md:text-lg font-semibold text-gray-800 dark:text-white">
            {user?.name.capitalize()}
          </h2>
          {/* Suggestions paragraph */}
          {activeTab === "Suggestions" && (
            <p
              className={`text-sm ${
                isConnected ? "text-emerald-500" : "text-gray-500"
              }`}
            >
              {isConnected ? "Sent request" : "Not connected"}
            </p>
          )}

          {/* Connections paragraph */}
          {activeTab === "Connections" && (
            <p className="text-sm text-emerald-500">Connected</p>
          )}

          {/* Requests paragraph */}
          {activeTab === "Requests" && (
            <p className="text-sm text-teal-500">Request</p>
          )}

          {/* Sent requests paragraph Based on (accepted, toggle betwwen cancel and sent) */}
          {activeTab === "Sent requests" &&
            (user?.connection === "accepted" ? (
              <p className="text-emerald-500 text-sm">Accepted</p>
            ) : (
              <p
                className={`text-sm ${
                  isConnected ? "text-emerald-500" : "text-gray-700"
                }`}
              >
                {isConnected ? "Invitation sent" : "Undo Request"}
              </p>
            ))}

          {/* Pending requests paragraph */}
          {activeTab === "Pending requests" && (
            <p
              className={`text-sm ${
                isConnected ? "text-cyan-500" : "text-gray-500"
              }`}
            >
              {isConnected ? "Pending request" : "Cancel request"}
            </p>
          )}
        </div>
      </div>

      {/* ******* Buttons on connection card ******** */}

      {/* Suggestions button */}
      {activeTab === "Suggestions" && (
        <SuggestionsBtn
          onToggleConnection={handleSuggestions}
          isConnected={isConnected}
        />
      )}

      {/* Connections button */}
      {activeTab === "Connections" && <ConnectionsBtn />}

      {/* Requests button */}
      {activeTab === "Requests" && (
        <RequestsBtn onAcceptReject={(type) => handleAcceptReject(type)} />
      )}

      {/* Sent requests button */}
      {activeTab === "Sent requests" && (
        <SentRequestsBtn
          onToggleConnection={handleSuggestions}
          isConnected={isConnected}
          connection={user?.connection}
        />
      )}

      {/* Pending requests button */}
      {activeTab === "Pending requests" && (
        <PendingRequestsBtn
          onToggleConnection={handleSuggestions}
          isConnected={isConnected}
        />
      )}
    </motion.div>
  );
}

export default SocialCard;

// ----- Subcomponents below -----
const SuggestionsBtn = ({ onToggleConnection, isConnected }) => {
  return (
    <motion.button
      onClick={onToggleConnection}
      className={`px-4 py-1.5 rounded-full font-medium text-sm transition duration-200 ${
        isConnected
          ? "border border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200"
          : "border border-blue-100 bg-blue-50 text-blue-600 hover:border-blue-200"
      }`}
      whileTap={{ scale: 0.95 }}
    >
      {isConnected ? "Disconnect" : "Connect"}
    </motion.button>
  );
};

const ConnectionsBtn = () => {
  const handleConnectionChats = () => {
    toast.error("Chats is under proccessing");
  };
  return (
    <motion.button whileTap={{ scale: 0.95 }}>
      <BsChatSquare
        onClick={handleConnectionChats}
        className="text-xl lg:text-2xl text-emerald-600 cursor-pointer"
      />
    </motion.button>
  );
};

const RequestsBtn = ({ onAcceptReject }) => {
  return (
    <div className="flex gap-2">
      <motion.button
        onClick={() => onAcceptReject("accept")}
        whileTap={{ scale: 0.95 }}
      >
        <AiOutlineCheck className="text-[1.7rem] border border-emerald-100 text-emerald-600 bg-emerald-50 p-1 rounded-full cursor-pointer" />
      </motion.button>
      <motion.button
        onClick={() => onAcceptReject("reject")}
        whileTap={{ scale: 0.95 }}
      >
        <AiOutlineClose className="text-[1.7rem] border border-red-100 text-red-700 bg-red-50 p-1 rounded-full cursor-pointer" />
      </motion.button>
    </div>
  );
};

const SentRequestsBtn = ({ onToggleConnection, isConnected, connection }) => {
  const handleChat = () => {
    toast.error("Chats under processing");
  };
  return (
    <motion.button
      onClick={connection !== "accepted" ? onToggleConnection : handleChat}
      className={`px-4 py-1.5 rounded-full font-medium text-sm transition duration-200 border ${
        connection === "accepted"
          ? "border-green-100 bg-green-50 text-green-600 hover:border-green-200"
          : isConnected
          ? "border-orange-100 bg-orange-50 text-orange-600 hover:border-orange-200"
          : "border-lime-100 bg-lime-50 text-lime-600"
      }`}
      whileTap={{ scale: 0.95 }}
    >
      {connection === "accepted"
        ? "Let's Chat"
        : isConnected
        ? "Not Initiated"
        : "Dispatched"}
    </motion.button>
  );
};

const PendingRequestsBtn = ({ onToggleConnection, isConnected }) => {
  return (
    <motion.button
      onClick={onToggleConnection}
      className={`px-4 py-1.5 rounded-full font-medium text-sm transition duration-200 ${
        isConnected
          ? "border border-amber-100 bg-amber-50 text-amber-600 hover:border-amber-200"
          : "border border-cyan-100 bg-cyan-100 text-cyan-600  hover:border-cyan-200"
      }`}
      whileTap={{ scale: 0.95 }}
    >
      {isConnected ? "Cancel" : "Revert"}
    </motion.button>
  );
};