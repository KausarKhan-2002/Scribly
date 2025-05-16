import { useEffect, useState } from "react";
import TaskStatusConnectionTabs from "../../Components/TeamConnections/TaskStatusConnectionTabs";
import { useConnections } from "../../Hook/useConnections";
import { AnimatePresence, motion } from "framer-motion";
import SocialCard from "../../Components/TeamConnections/SocialCard";
import ConnectionShimmer from "../../Components/Shimmers/SkeletonSocialCard";

function UserConnections() {
  const [connectionData, setConnectionData] = useState([]);
  const [filterConnections, setFilterConnections] = useState([]);
  const [isData, setIsData] = useState(false);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Suggestions");

  const connections = useConnections();

  useEffect(() => {
    connections(setConnectionData, setFilterConnections, setIsData, activeTab);
  }, [activeTab]);

  const handleChange = (e) => {
    const inputVal = e.target.value.trim();
    setSearch(inputVal);

    const filterData = connectionData.filter((conn) =>
      conn.name.toLowerCase().includes(inputVal.toLowerCase())
    );

    setFilterConnections(filterData);
  };

  if (!isData) return <ConnectionShimmer />;

  return (
    <>
      <section className="p-3 md:p-7">
        <h2 className="text-xl font-medium mb-5">Connections</h2>
        <div className="flex flex-col md:flex-row items-end gap-4 justify-between">
          <input
            type="text"
            value={search}
            onChange={handleChange}
            placeholder="Search members"
            className="border border-gray-300 w-[100%] md:w-[70%] xl:w-[65%] pl-2 py-[9px] rounded-md outline-none text-gray-700"
          />
          <TaskStatusConnectionTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            count={connectionData?.length || 0}
          />
        </div>
      </section>

      <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 px-6 pb-8">
        <AnimatePresence mode="popLayout">
          {filterConnections.map((connection) => (
            <SocialCard
              key={connection?._id || connection?.connectionId}
              user={connection}
              activeTab={activeTab}
              setConnections={(userId) => {
                setFilterConnections((prev) =>
                  prev.filter((item) => item.userId !== userId)
                );
              }}
            />
          ))}
        </AnimatePresence>
      </section>

      {isData && filterConnections.length === 0 && (
          <div className="text-center py-12 w-full">
            <h2 className="text-lg md:text-xl font-semibold text-gray-500 dark:text-gray-400">
              No connections found for&nbsp;
              <span className="text-blue-500 dark:text-blue-400">
                {activeTab}
              </span>
            </h2>
            <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
              Try changing the tab or search term to find more results.
            </p>
          </div>
        )}
    </>
  );
}

export default UserConnections;
