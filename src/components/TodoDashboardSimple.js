import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

function TodoDashboardSimple({ tasks }) {
  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.length - completedCount;

  const data = [
    { name: "Pendientes", value: pendingCount },
    { name: "Completadas", value: completedCount },
  ];

  const COLORS = ["#FF8042", "#00C49F"];
  const isSingular = tasks.length === 1;
  const taskText = isSingular ? "tarea" : "tareas";
  const completedText = completedCount === 1 ? "completada" : "completadas";
  const completedTextTarea = completedCount === 1 ? "tarea" : "tareas";

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
      <h3>Tu progreso general</h3>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <p style={{ textAlign: "center" }}>
          {`Tienes ${completedCount} ${completedTextTarea} ${completedText} de ${tasks.length} ${taskText} en total.`}
        </p>
      </div>
    </div>
  );
}

export default TodoDashboardSimple;
