import axios from "axios";
import { API_PATHS, BASE_URL } from "../Utils/apiPaths";

export const useAllUsers = () => {
  const { GET_USERS } = API_PATHS.USER;
  return async (setAllUsers) => {
    try {
      const response = await axios.get(BASE_URL + GET_USERS, {
        withCredentials: true,
      });
      //   console.log(response);
      setAllUsers(response.data.users);
    } catch (err) { 
      console.log(err.message);
    }
  };
};
