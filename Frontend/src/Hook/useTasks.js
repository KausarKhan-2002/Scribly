import axios from "axios";
import { API_PATHS, BASE_URL } from "../Utils/apiPaths";

export const useTasks = () => {
  return async (
    setAllTasks,
    setIsData,
    setFilterTasks,
    setTabs,
    isAllTasks
  ) => {
    try {
      const { GET_TASKS, GET_ASSIGNED_TASKS } = API_PATHS.TASK;

      const endPoint = isAllTasks ? GET_TASKS : GET_ASSIGNED_TASKS;

      const response = await axios.get(BASE_URL + endPoint, {
        withCredentials: true,
      });
      // console.log("response:", response);
      setAllTasks(response.data?.tasks || []);
      setIsData(response.data?.tasks ? true : false);
      setFilterTasks(response.data?.tasks || []);

      const statusSummary = response.data?.statusSummary || {};

      // Map statusSummary data woth fixed label and order
      const statusArr = [
        { label: "All", count: statusSummary?.allTasks || 0 },
        { label: "Pending", count: statusSummary?.pendingTasks || 0 },
        { label: "In Progress", count: statusSummary?.inProgressTasks || 0 },
        { label: "Completed", count: statusSummary?.completedTasks || 0 },
      ];
      setTabs(statusArr);
    } catch (err) {
      console.log(err.message);
    }
  };
};
