import axios from "axios";
import { BASE_URL } from "../Utils/constants";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addUser } from "../Store/userSlice";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return async (form, setForm, isSignup, setIsSignup, setLoader) => {
    try {
      setLoader(true);
      const endPoint = isSignup ? "signup" : "login";
      const response = await axios.post(BASE_URL + `/auth/${endPoint}`, form, {
        withCredentials: true,
      });
      // console.log(response);

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
        !isSignup && toast.success("You have logged in successfully");
        console.log(response);

        dispatch(addUser(response.data.user));
        navigate("/");
      }
    } catch (err) {
      // console.log(err.response?.data?.message || "Internal server error");
      toast.error(err.response?.data?.message || "Internal server error");
    } finally {
      setLoader(false);
    }
  };
};
