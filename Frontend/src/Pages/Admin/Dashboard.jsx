import React, { useEffect, useState } from "react";
import DashboardLayout from "../../Components/Layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { useDashboardData } from "../../Hook/useDashboardData";
import { useSelector } from "react-redux";
import moment from "moment";
import InfoCard from "../../Components/Cards/InfoCard";
import { IoMdCard } from "react-icons/io";
import { addThousandsSeprator } from "../../Utils/helper";
import { GoArrowRight } from "react-icons/go";
import TaskListTable from "../../Components/TaskListTable";
import CustomPieChart from "../../Components/Charts/CustomPieChart";
import CustomBarChart from "../../Components/Charts/CustomBarChart";

const COLORS = ["#8D51FF", "#00B8DB", "#7BCE00"];

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const navigate = useNavigate();
  const dashboard = useDashboardData();
  const { user } = useSelector((store) => store.user);

  // console.log(dashboardData)

  const onSeeMore = () => navigate("/admin/tasks");

  useEffect(() => {
    if (user) {
      dashboard(user.role, setDashboardData, setPieChartData, setBarChartData);
    }
  }, [user]);

  return (
    <div className="bg-slate-100/30">
      <DashboardLayout activeMenu="Dashboard">
        <section className="card my-5">
          {/* Wishes with current date*/}
          <div>
            <div className="col-span-3">
              <h2 className="text-xl md:text-2xl">
                Good Morning! {user?.name?.capitalize()}
              </h2>
              <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">
                {moment().format("dddd Do MMM YYYY")}
              </p>
            </div>
          </div>

          {/* Information about all taks like (all, pending, progress, completed) */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5">
            <InfoCard
              icon={<IoMdCard />}
              label="Total Tasks"
              value={addThousandsSeprator(
                dashboardData?.charts?.taskDistribution?.all || 0
              )}
              color="bg-blue-500"
            />
            <InfoCard
              label="Pending Tasks"
              value={addThousandsSeprator(
                dashboardData?.charts?.taskDistribution?.Pending || 0
              )}
              color="bg-violet-500"
            />
            <InfoCard
              label="In Progress Tasks"
              value={addThousandsSeprator(
                dashboardData?.charts?.taskDistribution?.InProgress || 0
              )}
              color="bg-cyan-500"
            />
            <InfoCard
              icon={<IoMdCard />}
              label="Completed"
              value={addThousandsSeprator(
                dashboardData?.charts?.taskDistribution?.Completed || 0
              )}
              color="bg-lime-500"
            />
          </div>
        </section>

        {/* Display task with advance Pie Chart */}
        <div className="space-y-4">
          <section className="grid md:grid-cols-2 gap-5">
            {/* Task Distribution */}
            <div className="card">
              <div className="flex items-center justify-between">
                <h5 className="font-medium text-lg">Task Distribution</h5>
              </div>

              {/* Pie Chart */}
              <CustomPieChart
                data={pieChartData}
                label="Total Balance"
                colors={COLORS}
              />
            </div>

            {/* Task priority level */}
            <div className="card">
              <div className="flex items-center justify-between">
                <h5 className="font-medium text-lg">Task Priority Level</h5>
              </div>

              {/* Bar Chart */}
              <CustomBarChart data={barChartData} />
            </div>
          </section>

          {/* Information about recent tasks like (pending, medium completed) with (low, medium, high) */}
          <section className="md-colspan-2">
            <div className="card">
              <div className="flex items-center justify-between">
                <h5 className="text-lg">Recent Tasks</h5>

                <button className="card-btn" onClick={onSeeMore}>
                  See All <GoArrowRight className="text-base" />
                </button>
              </div>
              <TaskListTable tableData={dashboardData?.recentTasks || []} />
            </div>
          </section>
        </div>
      </DashboardLayout>
    </div>
  );
}

export default Dashboard;
