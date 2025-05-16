import axios from "axios";
import { API_PATHS, BASE_URL } from "../Utils/apiPaths";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../Store/userSlice";

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return async () => {
    try {
      const { LOGOUT } = API_PATHS.AUTH;
      await axios.post(
        BASE_URL + LOGOUT,
        {},
        { withCredentials: true }
      );
      navigate("/home");
      localStorage.removeItem("auth_token");
      dispatch(removeUser());
    } catch (err) {
      console.log(err.message);
    }
  };
};
