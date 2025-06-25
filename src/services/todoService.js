const LOCAL_STORAGE_KEY = "myTodoAppTasks";

const loadTasksFromLocalStorage = () => {
  try {
    const serializedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    return serializedTasks ? JSON.parse(serializedTasks) : [];
  } catch (error) {
    console.error("Error al cargar tareas desde localStorage:", error);
    return []; // En caso de error, devuelve un array vacío
  }
};

// Función auxiliar para guardar tareas en localStorage
const saveTasksToLocalStorage = (tasks) => {
  try {
    const serializedTasks = JSON.stringify(tasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, serializedTasks);
  } catch (error) {
    console.error("Error al guardar tareas en localStorage:", error);
  }
};

// Inicializa mockTasks cargando desde localStorage al inicio
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
          // Fusionamos los datos existentes con los nuevos datos de taskData.
          // Esto actualiza las propiedades que vienen en taskData y mantiene las que no. Destructuracion de objetos

          mockTasks[index] = { ...mockTasks[index], ...taskData };
          saveTasksToLocalStorage(mockTasks);
          resolve(mockTasks[index]); // Resolvemos con la tarea actualizada
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
        saveTasksToLocalStorage(mockTasks); //
        resolve(newTask);
      }
    });
  },
};

export default todoService;
