import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import Alert from "react-bootstrap/Alert";
import "../css/TodoDashboardSimple.css";

function TodoDashboardSimple({ tasks, isDarkMode }) {
  const completedCount = tasks.filter((task) => task.isCompleted()).length;
  const pendingCount = tasks.length - completedCount;

  const pendingByStatus = [
    {
      name: "En progreso",
      value: tasks.filter((task) => task.status === "Doing").length,
    },
    {
      name: "Por hacer",
      value: tasks.filter((task) => task.status === "To Do").length,
    },
  ];

  const taskNotCompleted = [
    {
      name: "No completadas",
      value: tasks.filter((task) => !task.isCompleted()).length,
    },
  ];

  const data = [
    { name: "Pendientes", value: pendingCount },
    { name: "Completadas", value: completedCount },
  ];

  const COLORS = ["#FF8042", "#00C49F"];
  const isSingular = tasks.length === 1;
  const taskText = isSingular ? "tarea" : "tareas";
  const completedText = completedCount === 1 ? "completada" : "completadas";
  const completedTextTarea = completedCount === 1 ? "tarea" : "tareas";
  const completedTasksWithDates = tasks.filter(
    (task) => task.isCompleted() && task.creationDate && task.completionDate
  );

  const totalCompletionDays = completedTasksWithDates.reduce((sum, task) => {
    const creation = new Date(task.creationDate);
    const completion = new Date(task.completionDate);
    const timeDiff = completion.getTime() - creation.getTime();
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
    return sum + daysDiff;
  }, 0);

  const averageCompletionTime =
    completedTasksWithDates.length > 0
      ? totalCompletionDays / completedTasksWithDates.length
      : 0;

  const formattedAverageTime = Math.round(averageCompletionTime);

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
    const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${((percent ?? 1) * 100).toFixed(0)}%`}
      </text>
    );
  };
  const CustomTooltipGeneral = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      return (
        <div className="custom-tooltip">
          <p>{`Estado: ${name}`}</p>
          <p>{`Cantidad: ${value}`}</p>
        </div>
      );
    }
    return null;
  };

  const CustomTooltip = ({ active, payload }) => {
    const totalNumberOfTasks = taskNotCompleted[0].value;
    return (
      <div className="custom-tooltip">
        <p>Tienes un total de {totalNumberOfTasks} tareas sin realizar:</p>
        <ul>
          {pendingByStatus.map((item, index) => (
            <li key={index}>
              {item.name}: {item.value} (
              {((item.value / totalNumberOfTasks) * 100).toFixed(0)}%)
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div
      className={isDarkMode ? "dark-mode" : ""}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: "45%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h4 style={{ textAlign: "center" }}>Estado General</h4>
          <div style={{ width: "100%", height: "300px" }}>
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
                <Tooltip content={<CustomTooltipGeneral />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div
            style={{
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            <Alert variant="info">
              {`Tienes ${completedCount} ${completedTextTarea} ${completedText} de ${tasks.length} ${taskText} en total.`}
            </Alert>

            {completedTasksWithDates.length > 0 ? (
              <p style={{ fontStyle: "italic" }}>
                {`El tiempo promedio para completar una tarea es de ${formattedAverageTime} días.`}
              </p>
            ) : (
              <p style={{ fontStyle: "italic" }}>
                Aún no hay tareas completadas para calcular el promedio.
              </p>
            )}
          </div>
        </div>
        <div
          style={{
            width: "45%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h4 style={{ textAlign: "center" }}>Tareas No Realizadas</h4>
          <div style={{ width: "100%", height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={400} height={400}>
                <Pie
                  data={pendingByStatus}
                  dataKey="value"
                  cx="50%"
                  cy="75%"
                  outerRadius={120}
                  startAngle={180}
                  endAngle={0}
                  fill="#8884d8"
                  label={renderCustomizedLabel}
                  labelLine={false}
                />
                <Pie
                  data={taskNotCompleted}
                  dataKey="value"
                  cx="50%"
                  cy="75%"
                  innerRadius={140}
                  outerRadius={180}
                  startAngle={180}
                  endAngle={0}
                  fill="#82ca9d"
                  labelLine={false}
                />
                <Tooltip content={CustomTooltip} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div
            style={{
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            <Alert variant="info">
              El estado de tus tareas pendientes se divide en "Por hacer" y "En
              progreso".
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoDashboardSimple;
