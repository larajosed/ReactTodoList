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

function TodoDashboardStatus({ tasks, isDarkMode }) {
  const statusCounts = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  const statusData = [
    { name: "To Do", Tareas: statusCounts["To Do"] || 0, color: "#6589e6d2" },
    { name: "Doing", Tareas: statusCounts["Doing"] || 0, color: "#e46b33ff" },
    { name: "Done", Tareas: statusCounts["Done"] || 0, color: "#84c071ff" },
  ];

  const CustomTooltipStatus = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const containerStyle = {
        backgroundColor: isDarkMode ? "#333" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
        border: `1px solid ${isDarkMode ? "#555" : "#ccc"}`,
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        fontSize: "14px",
      };
      return (
        <div className="custom-tooltip" style={containerStyle}>
          <p className="label">{`Estado: ${label}`}</p>
          <p className="intro" style={{ color: payload[0].color }}>
            {`Tareas: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

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
      <div style={{ width: "100%", height: 300 }}>
        <h3 className="tittle">Tareas por estado</h3>
        <ResponsiveContainer>
          <BarChart
            data={statusData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              content={<CustomTooltipStatus isDarkMode={isDarkMode} />}
            />
            <Bar dataKey="Tareas">
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
