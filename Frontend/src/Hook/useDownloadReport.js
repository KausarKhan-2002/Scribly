import axios from "axios";
import React from "react";
import { BASE_URL } from "../Utils/apiPaths";
import toast from "react-hot-toast";

export const useDownloadReport = () => {
  return async (REPORT_ENDPOINT, filename) => {
    try {
      // withCredentials allows cookies to be sent, and responseType: "blob" expects a binary file
      const response = await axios.get(BASE_URL + REPORT_ENDPOINT, {
        withCredentials: true,
        responseType: "blob",
      });

      // console.log(response);

      // Create a Blob URL (a temporary file URL) from the downloaded data
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary <a> element to trigger the file download
      const link = document.createElement("a");
      link.href = url; // Set the link's href to the Blob URL
      link.setAttribute("download", filename); // Set the file name for download

      // visualization -> <a href="blob" download="user_details.xlsx"></a> ?

      // Append the link to the document body and trigger a click
      document.body.appendChild(link);
      link.click(); // This initiates the download

      // Clean up by removing the link from the DOM
      link.parentNode.removeChild(link);

      // Revoke the Blob URL to free up memory
      window.URL.revokeObjectURL(url);
    } catch (err) {
      // Log any error to the console
      console.log(err.message);

      // Show a user-friendly error message using toast notification
      toast.error("Failed to download expense details. Please try again.");
    }
  };
};
