import axios from "axios";
import { API_PATHS, BASE_URL } from "../Utils/apiPaths";
import { usePreparedChat } from "./usePreparedChat";

export const useDashboardData = () => {
  const prepareChatData = usePreparedChat();

  return async (role, setDashboardData, setPieChartData, setBarChartData) => {
    if (!role) return;
    const { GET_ADMIN_DASHBOARD, GET_USER_DASHBOARD } =
      API_PATHS.DASHBOARD;

    try {
      const endPoint =
        role === "admin" ? GET_ADMIN_DASHBOARD : GET_USER_DASHBOARD;

      const response = await axios.get(BASE_URL + endPoint, {
        withCredentials: true,
      });
      setDashboardData(response.data);
      // console.log(response);
      prepareChatData(
        response.data?.charts || null,
        setPieChartData,
        setBarChartData
      );
    } catch (err) {
      console.log(err.message);
    }
  };
};
