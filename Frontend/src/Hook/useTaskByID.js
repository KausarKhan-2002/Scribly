import { API_PATHS, BASE_URL } from "../Utils/apiPaths";
import axios from "axios";
import moment from "moment";

export const useTaskByID = () => {
  return async (setCurrTask, setTaskData, taskId) => {
    try {
      const { GET_TASK } = API_PATHS.TASK;
      const response = await axios.get(BASE_URL + GET_TASK(taskId), {
        withCredentials: true,
      });
      // console.log(response);
      if (response.data.task) {
        const taskInfo = response.data.task;

        setCurrTask(taskInfo);

        setTaskData((prev) => ({
          title: taskInfo.title,
          description: taskInfo.description,
          priority: taskInfo.priority,
          dueDate: taskInfo.dueDate
            ? moment(taskInfo.dueDate).format("YYYY-MM-DD")
            : "",
          assignTo: taskInfo.assignTo.map((item) => item?._id) || [],
          toDoChecklist: taskInfo.toDoChecklist.map((item) => item?.text) || [],
          attachments: taskInfo.attachments || [],
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };
};
