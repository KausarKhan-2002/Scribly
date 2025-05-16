import toast from "react-hot-toast";
import { API_PATHS, BASE_URL } from "../Utils/apiPaths";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useDeleteTask = () => {
  const navigate = useNavigate();
  return async (setLoading, setOpenDeleteAlert, currTask) => {
    try {
      setLoading(true);
      const { DELETE_TASK } = API_PATHS.TASK;
      // console.log(currTask)
      await axios.delete(BASE_URL + DELETE_TASK(currTask._id), {
        withCredentials: true,
      });
      // console.log(response);
      navigate("/admin/tasks");
      toast.success("Task deleted successfully");
    } catch (err) {
      console.log(err.message);
    } finally {
      setOpenDeleteAlert(false);
      setLoading(false);
    }
  };
};
