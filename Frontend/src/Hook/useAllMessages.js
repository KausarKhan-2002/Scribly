import axios from "axios";
import { API_PATHS, BASE_URL } from "../Utils/apiPaths";
import { useDispatch } from "react-redux";
import { replaceMsgs } from "../Store/getMsgsSlice";

export const useAllMessages = () => {
  const dispatch = useDispatch();

  return async (otherUserId) => {
    try {
      const { GET_MSGS } = API_PATHS.CONVERSATION;

      const response = await axios.get(BASE_URL + GET_MSGS(otherUserId), {
        withCredentials: true,
      });
      // console.log(response);
      dispatch(replaceMsgs(response.data?.conversation || null));
    } catch (err) {
      console.log(err.message);
    }
  };
};
