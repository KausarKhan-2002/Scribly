import axios from "axios";
import { API_PATHS, BASE_URL } from "../Utils/apiPaths";

export const useToggleConnection = () => {
  return async (isConnected, setIsConnected, userId) => {
    try {
      const { SEND_REQUEST, UNSENT_REQUEST } = API_PATHS.CONNECTIONS;
      // console.log("userId:",userId);
      

      if (isConnected) {
        const response = await axios.delete(BASE_URL + UNSENT_REQUEST(userId), {
          withCredentials: true,
        });
        // console.log(response);
        setIsConnected(false); // <-- fixed logic too (should be false after disconnect)
      } else {
        const response = await axios.post(
          BASE_URL + SEND_REQUEST(userId),
          {},
          { withCredentials: true }
        );
        // console.log(response);
        setIsConnected(true); // <-- becomes connected after request sent
      }
    } catch (err) {
      console.log(err.message);
    }
  };
};
