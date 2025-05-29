import axios from "axios";
import { API_PATHS, BASE_URL } from "../Utils/apiPaths";
import { useDispatch } from "react-redux";

export const useSendMsg = () => {
  const dispatch = useDispatch()

  return async (newMsg) => {
    const { SEND_MSG } = API_PATHS.CONVERSATION;

    try {
      const response = await axios.post(BASE_URL + SEND_MSG, newMsg, {
        withCredentials: true,
      });

    //   console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };
};
