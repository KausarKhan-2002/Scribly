// Base URL of your backend server
const isLocal = true;
export const BASE_URL = isLocal
  ? "http://localhost:7000"
  : "https://scribly-backend.onrender.com";

export const API_PATHS = {
  AUTH: {
    SIGNUP: "/auth/signup", // Register a new user
    LOGIN: "/auth/login", // Login user and receive JWT token
    LOGOUT: "/auth/logout", // Logout user and clear session
  },
  PROFILE: {
    GET_PROFILE: "/profile", // Get current user's profile (requires JWT)
    UPDATE_PROFILE: "/profile/update", // Update current user's profile details (requires JWT)
    UPLOAD_IMAGE: "/profile/upload-image", // Upload a profile image (requires JWT)
  },
  USER: {
    GET_USERS: "/user/get-all", // Admin: Get list of all users (requires JWT + admin role)
    GET_USER: (userId) => `/user/${userId}`, // Admin: Get specific user by ID (requires JWT + admin role)
    UPDATE_USER: (userId) => `/user/update/${userId}`, // Admin: Update a user's info (requires JWT + admin role)
    DELETE_USER: (userId) => `/user/delete/${userId}`, // Admin: Delete a user (requires JWT + admin role)
  },
  TASK: {
    GET_TASKS: "/task/all", // Get all tasks (admin sees all, user sees their own tasks) (requires JWT)
    GET_ASSIGNED_TASKS: "/task/all/assigned",
    GET_TASK: (taskId) => `/task/${taskId}`,
    CREATE_TASK: "/task/create", // Create a new task (admin only) (requires JWT)
    UPDATE_TASK: (taskId) => `/task/update/${taskId}`, // Update a task's details (admin or assignee) (requires JWT)
    DELETE_TASK: (taskId) => `/task/delete/${taskId}`, // Delete a task (admin only) (requires JWT)

    UPDATE_STATUS: (taskId) => `/task/update-status/${taskId}`, // Update task status (e.g., Pending → In Progress) (requires JWT)
    UPDATE_CHECKLIST: (taskId) => `/task/update-checklist/${taskId}`, // Update task checklist (requires JWT)
  },
  DASHBOARD: {
    GET_ADMIN_DASHBOARD: "/dashboard/admin", // Admin dashboard data summary (requires JWT + admin role)
    GET_USER_ASSIGN_DASHBOARD: "/dashboard/user/assign", // Logged-in user's dashboard summary (requires JWT)
    GET_USER_DASHBOARD: "/dashboard/user",
  },
  REPORTS: {
    EXPORT_TASKS: "/reports/export/tasks", // Admin: Export all tasks to Excel (requires JWT + admin role)
    EXPORT_USERS: "/reports/export/users", // Admin: Export task summary per user to Excel (requires JWT + admin role)
  },
  CONNECTIONS: {
    SUGGEST_MEMBERS: "/connection/suggestions",
    CONNECTIONS: "/connection/all-connections",
    REQUESTS: "/connection/connection-requests",
    SENT_REQUESTS: "/connection/outgoing-requests",
    SENT_PENDING_REQUESTS: "/connection/outgoing-pending-requests",
    SEND_REQUEST: (userId) => `/connection/send/${userId}`,
    UNSENT_REQUEST: (userId) => `/connection/unsent/${userId}`,
    ACCEPT_REQUEST: (userId) => `/connection/accept/${userId}`,
    REJECT_REQUEST: (userId) => `/connection/reject/${userId}`,
  },
};
