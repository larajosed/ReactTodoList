import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function TodoDashboardProductivity({ tasks }) {
  const getProductivityData = (tasks) => {
    if (!Array.isArray(tasks)) {
      return [];
    }

    const today = new Date();
    const dailyCounts = {};

    // Inicializa el conteo para los últimos 7 días en 0
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().slice(0, 10);
      dailyCounts[dateString] = 0;
    }

    tasks.forEach((task) => {
      // Asegúra de que la tarea esté completada y tenga una fecha de finalización
      if (task.completed && task.completionDate) {
        const completedDate = new Date(task.completionDate);

        // Verifica que la fecha sea válida antes de continuar
        if (!isNaN(completedDate.getTime())) {
          const completedDateString = completedDate.toISOString().slice(0, 10);

          //Comprueba si la fecha está en el rango de los 7 días
          if (dailyCounts.hasOwnProperty(completedDateString)) {
            dailyCounts[completedDateString] += 1;
          }
        }
      }
    });

    // Transforma el objeto a un array para la gráfica
    return Object.keys(dailyCounts).map((date) => ({
      name: new Date(date).toLocaleDateString(),
      tareas: dailyCounts[date],
    }));
  };

  const data = getProductivityData(tasks);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3>Productividad Semanal</h3>
      <ResponsiveContainer style={{ marginTop: "35px" }}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="tareas" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TodoDashboardProductivity;
