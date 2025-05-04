import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addUser, setLoading } from "../Store/userSlice";
import { API_PATHS, BASE_URL } from "../Utils/apiPaths";
import axios from "axios";

export const useProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const protectRoute = ["/admin/dashboard", "/user/dashboard"];
  const { GET_PROFILE } = API_PATHS.PROFILE;

  return async () => {
    const accessToken = localStorage.getItem("auth_token") || undefined;

    if (!accessToken) {
      console.log("chl");
      if (protectRoute.includes(pathname)) {
        navigate("/");
      }
      return;
    }
    try {
      dispatch(setLoading(true));
      const response = await axios.get(BASE_URL + GET_PROFILE, {
        withCredentials: true,
      });
      //   console.log(response);
      const user = response.data.user;
      dispatch(addUser(user));

      // if (user.role === "admin") {
      //   navigate("/admin/dashboard");
      // } else navigate("/user/dashboard");

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
