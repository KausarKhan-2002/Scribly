import axios from "axios";
import { API_PATHS, BASE_URL } from "../Utils/apiPaths";

export const useConnections = () => {
  return async (
    setConnectionData,
    setFilterConnections,
    setIsData,
    activeTab
  ) => {
    const {
      SUGGEST_MEMBERS,
      CONNECTIONS,
      REQUESTS,
      SENT_REQUESTS,
      SENT_PENDING_REQUESTS,
    } = API_PATHS.CONNECTIONS;

    try {
      let ENDPOINT =
        activeTab === "Suggestions"
          ? SUGGEST_MEMBERS
          : activeTab === "Connections"
          ? CONNECTIONS
          : activeTab === "Requests"
          ? REQUESTS
          : activeTab === "Sent requests"
          ? SENT_REQUESTS
          : activeTab === "Pending requests"
          ? SENT_PENDING_REQUESTS
          : null;
      // console.log(ENDPOINT);

      setIsData(false)

      const response = await axios.get(BASE_URL + ENDPOINT, {
        withCredentials: true,
      })
      
      setConnectionData(response.data?.data || []);
      setFilterConnections(response.data?.data || []);
      setIsData(true);
        // console.log("response:", response);
    } catch (err) {
      console.log(err);
      setIsData(false);
    }

    // "Suggestions", "Connections", "Requests", "Sent", "PendOut"
  };
};
