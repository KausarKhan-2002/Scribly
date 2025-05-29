import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { BASE_URL } from "../Utils/apiPaths";

const socketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUserIds, setOnlineUserIds] = useState(null)
  const profile = useSelector((store) => store?.user);

  useEffect(() => {
    if (profile?.user) {
      const socketObj = io(BASE_URL, {
        transports: ["websocket"],
        query: {
          userId: profile?.user?._id,
        },
      });

      socket && socket.on("onlineStatus", (onlineUsers) => onlineUsers && setOnlineUserIds(onlineUsers))

      setSocket(socketObj);
    }
  }, [profile]);

  console.log(onlineUserIds);
  

  return (
    <socketContext.Provider value={{ socket, onlineUserIds }}>
      {children}
    </socketContext.Provider>
  );
};

export const useSocket = () => useContext(socketContext);

export default SocketProvider;
