import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./Auth";
import Home from "./Home";

function MyOutlet() {
  return (
    <Routes>
      {/* *********** Public routes *********** */}
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />

      {/* *********** User routes *********** */}
    </Routes>
  );
}

export default MyOutlet;
