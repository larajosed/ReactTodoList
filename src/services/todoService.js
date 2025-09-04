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
      "Explorar en detalle el portafolio online de José Lara, analizar la estructura del sitio, la calidad de su código, y la presentación de sus proyectos. Prestar especial atención a la sección de 'Proyectos' y a las tecnologías que utiliza.",
      null,
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
      "Programar y llevar a cabo una entrevista telefónica con José Lara. El objetivo es evaluar sus habilidades técnicas, experiencia previa y adecuación cultural para el puesto de desarrollador. Es crucial documentar todas las respuestas clave.",
      "Preparar preguntas clave para la entrevista",
      new Date("2025-09-01T14:30:00Z"),
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
      "Invertir un tiempo en la búsqueda de memes de gatitos humorísticos y de alta calidad en diversas plataformas como Reddit, Twitter, y sitios especializados. El objetivo es seleccionar los 10 mejores para animar el chat del equipo y fortalecer el compañerismo.",
      "Coleccionar los 10 mejores memes de gatos para el chat del equipo",
      new Date("2025-09-01T09:00:00Z"),
      new Date("2025-09-02T10:15:00Z"),
      new Date("2025-09-02T10:15:00Z"),
      "Done"
    );
    const task4 = new Task(
      4,
      "Configurar el entorno de desarrollo para el proyecto 'Agile Board'",
      false,
      "Equipo de Desarrollo",
      "Baja",
      "Asegurar que el entorno de desarrollo esté completamente configurado y listo para empezar a trabajar en el proyecto 'Agile Board'. Esto incluye la instalación de las últimas versiones de Node.js y npm, y la clonación del repositorio principal del proyecto desde GitHub. También se deben instalar todas las dependencias necesarias con `npm install`.",
      "Instalar Node.js, npm, y clonar el repositorio del proyecto",
      new Date("2025-09-03T09:30:00Z"),
      new Date("2025-09-03T09:30:00Z"),
      null,
      "To Do"
    );
    const task5 = new Task(
      5,
      "Revisar el informe de métricas del trimestre",
      true,
      "Dirección",
      "Media",
      "Analizar en profundidad el informe de métricas del último trimestre. Se deben examinar los KPIs principales como el crecimiento interanual, la tasa de retención de clientes y la rentabilidad por producto. El análisis debe incluir la identificación de áreas de mejora y la preparación de un resumen ejecutivo para la próxima reunión de dirección.",
      "Analizar el crecimiento interanual y los KPIs principales",
      new Date("2025-09-02T11:00:00Z"),
      new Date("2025-09-04T11:00:00Z"),
      new Date("2025-09-04T11:00:00Z"),
      "Done"
    );
    const task6 = new Task(
      6,
      "Escribir la documentación técnica del API",
      false,
      "José",
      "Alta",
      "Redactar una documentación técnica completa y clara para el API RESTful. Esto implica describir cada endpoint, los parámetros de entrada requeridos, los posibles códigos de respuesta HTTP y ejemplos de payloads de solicitud y respuesta. La documentación debe ser lo suficientemente detallada para que otros desarrolladores puedan integrar la API sin problemas.",
      "Detallar los endpoints, parámetros, y respuestas del API RESTful",
      new Date("2025-09-03T15:00:00Z"),
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
      "Comenzar la fase inicial de planificación para la fiesta de fin de año de la empresa. Las actividades incluyen investigar y contactar a varios proveedores de catering, explorar diferentes salones de eventos que se adapten al número de asistentes y recopilar ideas de actividades para el evento.",
      "Contactar proveedores de catering y salones de eventos",
      new Date("2025-09-04T11:30:00Z"),
      new Date("2025-09-05T11:30:00Z"),
      null,
      "To Do"
    );
    const task8 = new Task(
      8,
      "Crear un nuevo logo para la empresa",
      true,
      "Diseño",
      "Baja",
      "Diseñar un nuevo logo que capture la esencia de la marca. Esta tarea implica investigar las tendencias actuales de diseño, crear al menos tres propuestas de diseño con diferentes paletas de colores y tipografías, y preparar los archivos finales en varios formatos (vectorial, PNG, JPG).",
      "Generar 3 propuestas de diseño basadas en la nueva identidad de marca",
      new Date("2025-09-04T10:00:00Z"),
      new Date("2025-09-04T14:00:00Z"),
      new Date("2025-09-04T14:00:00Z"),
      "Done"
    );
    const task9 = new Task(
      9,
      "Actualizar la página web con las nuevas promociones",
      false,
      "Marketing",
      "Media",
      "Implementar la nueva campaña promocional de otoño en la página web principal. Esto incluye la creación y subida de banners publicitarios optimizados para web, la redacción y publicación de textos persuasivos en la sección de ofertas y la verificación de que todos los enlaces y botones de llamada a la acción funcionen correctamente.",
      "Subir los banners y textos publicitarios para la campaña de otoño",
      new Date("2025-09-05T09:00:00Z"),
      new Date("2025-09-05T14:00:00Z"),
      null,
      "Doing"
    );
    const task10 = new Task(
      10,
      "Realizar la auditoría de seguridad del servidor",
      false,
      "IT",
      "Alta",
      "Llevar a cabo una auditoría de seguridad completa en los servidores de la empresa. La tarea implica ejecutar un escaneo de vulnerabilidades, analizar los logs de acceso en busca de actividades sospechosas, y aplicar los parches de seguridad más recientes para mitigar cualquier riesgo identificado. Es crucial generar un informe detallado con los hallazgos y las acciones correctivas.",
      "Verificar las vulnerabilidades y aplicar los parches de seguridad más recientes",
      new Date("2025-09-05T15:00:00Z"),
      new Date("2025-09-05T17:00:00Z"),
      null,
      "To Do"
    );

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
