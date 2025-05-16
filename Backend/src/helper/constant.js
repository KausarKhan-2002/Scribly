const allowedStatuses = ["Pending", "In Progress", "Completed"];
const allowedConnections = ["accepted", "rejected", "pending"];
const allowedRoles = ["member", "admin"];
const allowedPriorities = ["Low", "Medium", "High"];

module.exports = {
  allowedPriorities,
  allowedStatuses,
  allowedRoles,
  allowedConnections,
};
