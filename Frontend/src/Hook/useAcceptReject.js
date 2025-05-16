import React from "react";
import { API_PATHS, BASE_URL } from "../Utils/apiPaths";
import axios from "axios";

export const useAcceptReject = () => {
  return async (type, userId) => {
    try {
      const { ACCEPT_REQUEST, REJECT_REQUEST } = API_PATHS.CONNECTIONS;

      const ENDPOINT = type === "accept" ? ACCEPT_REQUEST : REJECT_REQUEST;

      const response = await axios.put(
        BASE_URL + ENDPOINT(userId),
        {},
        { withCredentials: true }
      );
    //   console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
};
