import Task from "../model/taskModel";

const LOCAL_STORAGE_KEY = "myTodoAppTasks";

const loadTasksFromLocalStorage = () => {
  const serializedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
  return serializedTasks ? JSON.parse(serializedTasks) : [];
};

const saveTasksToLocalStorage = (tasks) => {
  try {
    const serializedTasks = JSON.stringify(tasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, serializedTasks);
  } catch (error) {
    console.error("Error al guardar tareas en localStorage:", error);
  }
};

let mockTasks = loadTasksFromLocalStorage();

const todoService = {
  getTasks: () => {
    return new Promise((resolve) => {
      resolve(mockTasks);
    });
  },
  deleteTask: (id) => {
    return new Promise((resolve) => {
      mockTasks = mockTasks.filter((task) => task.id !== id);
      saveTasksToLocalStorage(mockTasks);
      resolve([...mockTasks]);
    });
  },
  addTask: (taskData) => {
    return new Promise((resolve, reject) => {
      if (taskData.id) {
        const index = mockTasks.findIndex((task) => task.id === taskData.id);
        if (index !== -1) {
          const isTaskNowCompleted =
            taskData.completed && !mockTasks[index].completed;

          const isTaskNowIncomplete =
            !taskData.completed && mockTasks[index].completed;

          mockTasks[index] = { ...mockTasks[index], ...taskData };

          if (isTaskNowCompleted) {
            mockTasks[index].completionDate = new Date().toISOString();
          } else if (isTaskNowIncomplete) {
            delete mockTasks[index].completionDate;
          }

          saveTasksToLocalStorage(mockTasks);
          resolve(mockTasks[index]);
        } else {
          reject(new Error("Tarea no encontrada para editar."));
        }
      } else {
        const maxId =
          mockTasks.length > 0
            ? Math.max(...mockTasks.map((task) => task.id))
            : 0;
        const newId = maxId + 1;
        const newTask = {
          id: newId,
          ...taskData,
          completed: false,
          completionDate: null,
        };
        mockTasks.push(newTask);
        saveTasksToLocalStorage(mockTasks);
        resolve(newTask);
      }
    });
  },
  initMockTasks: () => {
    const task1 = new Task(
      1,
      "Visitar larajosed.github.io",
      false,
      "Todos",
      "Alta",
      "Visitar en casa",
      "Nada aun",
      new Date("2025-09-01T10:00:00Z"),
      new Date("2025-09-01T10:00:00Z"),
      null,
      "Doing"
    );
    const task2 = new Task(
      2,
      "Llamar a José Lara para entrevistarle",
      false,
      "Recursos Humanos",
      "Alta",
      "Oficina Principal",
      "Preparar preguntas clave para la entrevista",
      new Date("2025-09-02T14:30:00Z"),
      new Date("2025-09-02T14:30:00Z"),
      null,
      "Doing"
    );
    const task3 = new Task(
      3,
      "Buscar memes de gatitos",
      true,
      "José",
      "Baja",
      "Cualquier lugar",
      "Coleccionar los 10 mejores memes de gatos para el chat del equipo",
      new Date("2025-08-30T09:00:00Z"),
      new Date("2025-08-30T10:15:00Z"),
      new Date("2025-08-30T10:15:00Z"),
      "Done"
    );
    const task4 = new Task(
      4,
      "Configurar el entorno de desarrollo para el proyecto 'Agile Board'",
      false,
      "Equipo de Desarrollo",
      "Baja",
      "Oficina Principal",
      "Instalar Node.js, npm, y clonar el repositorio del proyecto",
      new Date("2025-09-03T09:30:00Z"),
      new Date("2025-09-03T09:30:00Z"),
      null,
      "To Do"
    );
    const task5 = new Task(
      5,
      "Revisar el informe de métricas del trimestre",
      false,
      "Dirección",
      "Media",
      "Sala de Reuniones B",
      "Analizar el crecimiento interanual y los KPIs principales",
      new Date("2025-09-04T11:00:00Z"),
      new Date("2025-09-04T11:00:00Z"),
      null,
      "To Do"
    );
    const task6 = new Task(
      6,
      "Escribir la documentación técnica del API",
      false,
      "José",
      "Alta",
      "Oficina Principal",
      "Detallar los endpoints, parámetros, y respuestas del API RESTful",
      new Date("2025-09-05T15:00:00Z"),
      new Date("2025-09-05T15:00:00Z"),
      null,
      "Doing"
    );
    const task7 = new Task(
      7,
      "Planificar la fiesta de fin de año",
      false,
      "Comité de Eventos",
      "Baja",
      "Evento Externo",
      "Contactar proveedores de catering y salones de eventos",
      new Date("2025-09-01T11:30:00Z"),
      new Date("2025-09-01T11:30:00Z"),
      null,
      "Pending"
    );
    const task8 = new Task(
      8,
      "Crear un nuevo logo para la empresa",
      false,
      "Diseño",
      "Baja",
      "Estudio de Diseño",
      "Generar 3 propuestas de diseño basadas en la nueva identidad de marca",
      new Date("2025-09-06T10:00:00Z"),
      new Date("2025-09-06T10:00:00Z"),
      null,
      "Doing"
    );
    const task9 = new Task(
      9,
      "Actualizar la página web con las nuevas promociones",
      true,
      "Marketing",
      "Media",
      "Remoto",
      "Subir los banners y textos publicitarios para la campaña de otoño",
      new Date("2025-08-28T09:00:00Z"),
      new Date("2025-08-28T14:00:00Z"),
      new Date("2025-08-28T14:00:00Z"),
      "Done"
    );
    const task10 = new Task(
      10,
      "Realizar la auditoría de seguridad del servidor",
      false,
      "IT",
      "Alta",
      "Sala de Servidores",
      "Verificar las vulnerabilidades y aplicar los parches de seguridad más recientes",
      new Date("2025-09-07T09:00:00Z"),
      new Date("2025-09-07T09:00:00Z"),
      null,
      "Pending"
    );

    task3.completionDate = new Date().toISOString();

    const tasksArray = [
      task1,
      task2,
      task3,
      task4,
      task5,
      task6,
      task7,
      task8,
      task9,
      task10,
    ];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasksArray));
    mockTasks = loadTasksFromLocalStorage();
  },
};

export default todoService;
