import {
  LuClipboardCheck,
  LuLayoutDashboard,
  LuLogOut,
  LuSquarePlus,
  LuUsers,
} from "react-icons/lu";
import { MdOutlineAssignment } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";

export const SIDE_MENU_DATA = [
  {
    id: 1,
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    id: 2,
    label: "Manage Tasks",
    icon: LuClipboardCheck,
    path: "/admin/tasks",
  },
  {
    id: 3,
    label: "Create Task",
    icon: LuSquarePlus,
    path: "/admin/create-task",
  },
  {
    id: 4,
    label: "Team Members",
    icon: LuUsers,
    path: "/admin/users",
  },
  {
    id: 5,
    label: "Logout",
    icon: LuLogOut,
    path: "logout",
  },
];

export const SIDE_MENU_USER_DATA = [
  {
    id: 1,
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/user/dashboard",
  },
  {
    id: 2,
    label: "Create Task",
    icon: LuSquarePlus,
    path: "/admin/create-task",
  },
  {
    id: 3,
    label: "My Tasks",
    icon: LuClipboardCheck,
    path: "/user/tasks",
  },
  {
    id: 4,
    label: "Assigned Tasks",
    icon: MdOutlineAssignment,
    path: "/user/tasks/assign",
  },
  {
    id: 5,
    label: "Add Members",
    icon: IoPersonAddOutline,
    path: "/connection",
  },
  {
    id: 6,
    label: "Logout",
    icon: LuLogOut,
    path: "logout",
  },
];

export const PRIORITY_DATA = [
  { label: "Low", value: "Low" },
  { label: "Medium", value: "Medium" },
  { label: "High", value: "High" },
];

export const STATUS_DATA = [
  { label: "Pending", value: "Pending" },
  { label: "In Progress", value: "In Progress" },
  { label: "Completed", value: "Completed" },
];

export const DEFAULT_AVATAR =
  "https://i.pinimg.com/736x/15/0f/a8/150fa8800b0a0d5633abc1d1c4db3d87.jpg";
