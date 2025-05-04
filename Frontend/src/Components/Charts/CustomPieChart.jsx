import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

function CustomPieChart({ data, label, colors }) {

  return (
    <ResponsiveContainer className="" width="100%" height={325}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count" // show the count, coming from data
          nameKey="status" // show the status, coming from data
          cx="50%" // center Horizontally
          cy="50%" // center Vertically
          outerRadius={130} // Outer radius size
          innerRadius={100} // Inner radius size
        >
          {data.map((entry, ind) => (
            <Cell key={`cell-${ind}`} fill={colors[ind % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} /> // Hover message over pie chart
        <Legend content={<CustomLegend />}/> // Information about chart
      </PieChart>
    </ResponsiveContainer>
  );
}

export default CustomPieChart;
