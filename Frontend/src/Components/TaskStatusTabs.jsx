import { motion } from "framer-motion";

function TaskStatusTabs({
  tabs,
  activeTab,
  setActiveTab,
  allTasks,
  setFilterTasks,
}) {
  const handleActiveStatus = (label) => {
    setActiveTab(label);

    if (label === "All") {
      setFilterTasks(allTasks);
      return;
    }
    const filterByStatus = allTasks.filter((task) => task.status === label);
    setFilterTasks(filterByStatus);
    // console.log(filterByStatus);
    
  };
  // console.log("tabs:", tabs);

  return (
    <div className="my-2">
      <div className="flex relative">
        {tabs.map((tab) => (
          <button
            className={`relative px-3 md:px-4 py-2 text-sm font-medium cursor-pointer transition-colors ${
              activeTab === tab.label
                ? "text-blue-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
            key={tab.label}
            onClick={() => handleActiveStatus(tab.label)}
          >
            {/* Task label & count */}
            <div className="flex items-center gap-2">
              <span className="text-xs">{tab.label}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  activeTab === tab.label
                    ? "bg-blue-700 text-white"
                    : "bg-gray-200/70 text-gray-600"
                }`}
              >
                {tab.count}
              </span>
            </div>

            {/* Animated active indicator */}
            {activeTab === tab.label && (
              <motion.div
                layoutId="active-tab-indicator"
                className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-700"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TaskStatusTabs;
