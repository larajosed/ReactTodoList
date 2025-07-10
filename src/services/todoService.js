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
          mockTasks[index] = { ...mockTasks[index], ...taskData };
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
        };
        mockTasks.push(newTask);
        saveTasksToLocalStorage(mockTasks);
        resolve(newTask);
      }
    });
  },
  initMockTasks: () => {
    const tasckInit = [
      {
        id: 1,
        text: "Visitar larajosd.github.io",
        completed: false,
        assignedTo: "Todos",
      },
      {
        id: 2,
        text: "Llamar a José Lara para entrevistarle",
        completed: false,
        assignedTo: "Recursos Humanos",
      },
      {
        id: 3,
        text: "Buscar memes de gatitos",
        completed: true,
        assignedTo: "José",
      },
    ];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasckInit));
    mockTasks = loadTasksFromLocalStorage();
  },
};

export default todoService;
