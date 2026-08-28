import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function RainfallChart({ dates, rainfall }) {
  if (!dates || !rainfall) {
    return null;
  }

  const chartData = dates.map((date, index) => ({
    date: date.slice(5),
    rainfall: rainfall[index] ?? 0,
  }));

  return (
    <div
      style={{
        width: "100%",
        height: "350px",
        marginTop: "20px",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />

          <YAxis
            label={{
              value: "Rainfall (mm)",
              angle: -90,
              position: "insideLeft",
            }}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="rainfall"
            stroke="#287a43"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RainfallChart;