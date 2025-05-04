import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Auth from "./Auth/Auth";
import Home from "./Home";
import PrivateRoute from "../Routes/PrivateRoute";
import Dashboard from "./Admin/Dashboard";
import ManageTasks from "./Admin/ManageTasks";
import CreateTask from "./Admin/CreateTask";
import ManageUsers from "./Admin/ManageUsers";
import UserDashboard from "./User/UserDashboard";
import MyTasks from "./User/MyTasks";
import ViewTaskDetails from "./User/ViewTaskDetails";
import { useSelector } from "react-redux";

function MyOutlet() {
  return (
    <Routes>
      {/* *********** Public routes ************/}
      <Route path="/auth" element={<Auth />} />

      {/************ Admin Routes ************/}
      <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/tasks" element={<ManageTasks />} />
        <Route path="/admin/create-task" element={<CreateTask />} />
        <Route path="/admin/users" element={<ManageUsers />} />
      </Route>

      {/* *********** User routes *********** */}
      <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/tasks" element={<MyTasks />} />
        <Route path="/user/task-details/:id" element={<ViewTaskDetails />} />
      </Route>

      <Route path="/" element={<Root />} />
    </Routes>
  );
}


function Root() {
  const profile = useSelector((store) => store.user);
  console.log(profile);

  if (!profile.user) return

  if (profile.loading) return <Outlet />;

  // if (!profile.user) return <Navigate to="/auth" />;

  if (profile.user) {
    return profile.user.role === "admin" ? (
      <Navigate to="/admin/dashboard" />
    ) : (
      <Navigate to="/user/dashboard" />
    );
  }

}

export default MyOutlet;
