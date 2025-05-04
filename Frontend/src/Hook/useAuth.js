import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addUser } from "../Store/userSlice";
import { useNavigate } from "react-router-dom";
import { API_PATHS, BASE_URL } from "../Utils/apiPaths";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return async (form, setForm, isSignup, setIsSignup, setLoader) => {
    const { SIGNUP, LOGIN } = API_PATHS.AUTH;

    try {
      setLoader(true);
      const endPoint = isSignup ? SIGNUP : LOGIN;
      const response = await axios.post(BASE_URL + `${endPoint}`, form, {
        withCredentials: true,
      });
      console.log(response);

      if (isSignup) {
        toast.success("You have signed up successfully");
        setForm({
          username: "",
          fullname: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setIsSignup(false);
      } else {
        toast.success("You have logged in successfully");

        // console.log(response);

        const user = response.data?.user;

        dispatch(addUser(user));
        localStorage.setItem("auth_token", response.data?.token);

        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }

      }
    } catch (err) {
      // console.log(err.response?.data?.message || "Internal server error");
      toast.error(err.response?.data?.message || "Internal server error");
    } finally {
      setLoader(false);
    }
  };
};
