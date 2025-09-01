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
  const completedTasksWithDates = tasks.filter(
    (task) => task.completed && task.creationDate && task.completionDate
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

  const tasksWithDueDateAndCompletion = tasks.filter(
    (task) => task.dueDate && task.completionDate
  );

  const totalDueMarginDays = tasksWithDueDateAndCompletion.reduce(
    (sum, task) => {
      const due = new Date(task.dueDate);
      const completion = new Date(task.completionDate);
      const margin =
        (due.getTime() - completion.getTime()) / (1000 * 60 * 60 * 24);
      return sum + margin;
    },
    0
  );

  const averageDueMargin =
    tasksWithDueDateAndCompletion.length > 0
      ? totalDueMarginDays / tasksWithDueDateAndCompletion.length
      : 0;

  const formattedDueMargin = Math.round(averageDueMargin);

  const getDueMarginMessage = () => {
    if (tasksWithDueDateAndCompletion.length === 0) {
      return "No hay tareas completadas con fecha de vencimiento para calcular el margen.";
    }

    if (formattedDueMargin > 0) {
      return `En promedio, terminas tus tareas con ${formattedDueMargin} días de anticipación. ¡Excelente!`;
    } else if (formattedDueMargin < 0) {
      const positiveMargin = Math.abs(formattedDueMargin);
      return `En promedio, terminas tus tareas con ${positiveMargin} días de retraso.`;
    } else {
      return "En promedio, terminas tus tareas justo a tiempo.";
    }
  };

  const getTextColor = () => {
    if (tasksWithDueDateAndCompletion.length === 0) {
      return "#6c757d";
    }
    if (formattedDueMargin > 0) {
      return "#4f923b";
    }
    if (formattedDueMargin < 0) {
      return "#dc3545";
    }
    return "#6c757d";
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
        {completedTasksWithDates.length > 0 ? (
          <p style={{ textAlign: "center", fontStyle: "italic" }}>
            {`El tiempo promedio para completar una tarea es de ${formattedAverageTime} días.`}
          </p>
        ) : (
          <p style={{ textAlign: "center", fontStyle: "italic" }}>
            Aún no hay tareas completadas para calcular el promedio.
          </p>
        )}

        <p
          style={{
            textAlign: "center",
            fontStyle: "italic",
            color: getTextColor(),
          }}
        >
          {getDueMarginMessage()}
        </p>
      </div>
    </div>
  );
}

export default TodoDashboardSimple;
