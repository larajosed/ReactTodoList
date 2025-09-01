import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function TodoDashboardStatus({ tasks }) {
  const statusCounts = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  const statusData = [
    { name: "To Do", count: statusCounts["To Do"] || 0, color: "#92a8d1" },
    { name: "Doing", count: statusCounts["Doing"] || 0, color: "#f7d242" },
    { name: "Done", count: statusCounts["Done"] || 0, color: "#4f923b" },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: 600,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%", height: 300, marginTop: "20px" }}>
        <h4>Tareas por estado</h4>
        <ResponsiveContainer>
          <BarChart
            data={statusData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8">
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TodoDashboardStatus;
