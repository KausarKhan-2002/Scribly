import { useEffect, useState } from "react";
import ChatPanel from "../../Components/Chats/ChatPanel";
import UserPanel from "../../Components/Chats/UserPanel";
import { useConnections } from "../../Hook/useConnections";
import axios from "axios";
import { API_PATHS, BASE_URL } from "../../Utils/apiPaths";

const PanelContainer = () => {
  const [connections, setConnections] = useState([]);
  const [isData, setIsData] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const showUserPanel = selectedUser ? "hidden" : "block";

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

      <div className={`md:w-[65%] h-full ${selectedUser ? "hidden" : "block"}`}>Let's chats</div>
    </div>
  );
};

export default PanelContainer;
