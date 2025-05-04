import React from "react";

function CustomLegend({ payload }) {

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4 space-x-6">
      {payload &&
        payload.map((item, ind) => (
          <div key={ind} className="flex items-center space-x-2">
            <p
              className={`w-2.5 h-2.5 rounded-full`}
              style={{ background: `${item.color}` }}
            />
            <p className="text-xs lg:text-sm text-gray-700 font-medium ">{item.value}</p>
          </div>
        ))}
    </div>
  );
}

export default CustomLegend;
