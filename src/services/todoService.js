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
      new Date(),
      new Date(),
      null,
      "Doing"
    );
    const task2 = new Task(
      2,
      "Llamar a José Lara para entrevistarle",
      false,
      "Recursos Humanos",
      "Alta",
      "Visitar en casa",
      "Nada aun",
      new Date(),
      new Date(),
      null,
      "Doing"
    );
    const task3 = new Task(
      3,
      "Buscar memes de gatitos",
      true,
      "José",
      "Alta",
      "Visitar en casa",
      "Nada aun",
      new Date(),
      new Date(),
      new Date(),
      "Doing"
    );

    task3.completionDate = new Date().toISOString();

    const tasksArray = [task1, task2, task3];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasksArray));
    mockTasks = loadTasksFromLocalStorage();
  },
};

export default todoService;
