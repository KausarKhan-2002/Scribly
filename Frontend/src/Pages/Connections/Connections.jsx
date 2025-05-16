import DashboardLayout from "../../Components/Layouts/DashboardLayout";
import UserConnections from "./UserConnections";

const Connections = () => {
  return (
    <DashboardLayout>
      <div className="min-h-[91vh] bg-gray-50">
        <UserConnections />
      </div>
    </DashboardLayout>
  );
};

export default Connections;
