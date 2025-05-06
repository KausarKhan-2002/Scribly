import axios from "axios";
import { API_PATHS, BASE_URL } from "../Utils/apiPaths";
import toast from "react-hot-toast";
import { useFlowerRain } from "./userFlowerRain";

export const useCreateTask = () => {
  const flowerRain = useFlowerRain();
  return async (taskData, setLoading) => {
    try {
      setLoading(true);
      const { CREATE_TASK } = API_PATHS.TASK;
      // Create new task with ISO String Date
      const newTask = {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
      };

      await axios.post(BASE_URL + CREATE_TASK, newTask, {
        withCredentials: true,
      });
      toast.success("task created successfully");
      flowerRain();
    } catch (err) {
      console.log(err.message);
      toast.error(err.response?.data?.message || "Internal server error");
    } finally {
      setLoading(false);
    }
  };
};
