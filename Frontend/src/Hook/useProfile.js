import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, setLoading } from "../Store/userSlice";
import { API_PATHS, BASE_URL } from "../Utils/apiPaths";
import axios from "axios";

export const useProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { GET_PROFILE } = API_PATHS.PROFILE;

  return async () => {
    const accessToken = localStorage.getItem("auth_token") || undefined;
    console.log(accessToken);

    // If no token available in local storage
    if (!accessToken) return navigate("/home");

    try {
      dispatch(setLoading(true));
      const response = await axios.get(BASE_URL + GET_PROFILE, {
        withCredentials: true,
      });
      //   console.log(response);
      const user = response.data.user;
      dispatch(addUser(user));
      console.log(user);

      if (!localStorage.getItem("auth_token")) {
        localStorage.setItem("auth_token", response.data.token);
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  };
};
