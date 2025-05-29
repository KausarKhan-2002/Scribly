import { useEffect, useState } from "react";
import ChatPanel from "../../Components/Chats/ChatPanel";
import UserPanel from "../../Components/Chats/UserPanel";
import { useConnections } from "../../Hook/useConnections";
import axios from "axios";
import { API_PATHS, BASE_URL } from "../../Utils/apiPaths";
import { motion } from "framer-motion";
import { Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const PanelContainer = () => {
  const [connections, setConnections] = useState([]);
  const [isData, setIsData] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const profile = useSelector((store) => store.user);
  const navigate = useNavigate();
  const inProgress = true;
  // console.log(profile);

  const role = profile.user?.role === "admin" ? "admin" : "user";

  const showUserPanel = selectedUser ? "hidden" : "block";
  const MotionLink = motion(Link);

  const fetchConnections = async () => {
    try {
      const { CONNECTIONS } = API_PATHS.CONNECTIONS;

      const response = await axios.get(BASE_URL + CONNECTIONS, {
        withCredentials: true,
      });
      //   console.log(response);
      setConnections(response.data?.data || []);
      setIsData(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  //   console.log(connections);

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!isData) return;

  // Conversation section under process
  if (inProgress)
    return (
      <motion.div
        className="flex flex-col items-center justify-center h-[80vh] text-center p-6 rounded-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="p-6 bg-yellow-100 text-yellow-700 rounded-full shadow-lg mb-6"
          animate={{ rotate: [0, 10, -10, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Wrench className="w-10 h-10" />
        </motion.div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Conversation in Progress 🚧
        </h1>

        <p className="text-gray-600 max-w-md">
          This section is currently under development. We're working hard to
          bring you real-time conversations and chat support. Stay tuned!
        </p>

        <MotionLink
          to={`/${role}/dashboard`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 bg-gray-800 text-white px-6 py-2 rounded-full shadow hover:bg-gray-700 transition"
        >
          Back to Dashboard
        </MotionLink>
      </motion.div>
    );

  return (
    <div className="h-[91vh] overflow-y-auto md:flex">
      <div className={`${showUserPanel} md:block md:w-[35%] md:p-2`}>
        <UserPanel
          connections={connections}
          setSelectedUser={setSelectedUser}
        />
      </div>
      <div className={`md:w-[65%] h-full ${selectedUser ? "block" : "hidden"}`}>
        <ChatPanel selectedUser={selectedUser} />
      </div>

      {!selectedUser && (
        <div className={`hidden md:block md:w-[65%] h-full`}>Let's chats</div>
      )}
    </div>
  );
};

export default PanelContainer;
