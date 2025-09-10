import Task from "../model/taskModel";
import moment from "moment";

const LOCAL_STORAGE_KEY = "myTodoAppTasks";

const loadTasksFromLocalStorage = () => {
  const serializedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
  return serializedTasks
    ? JSON.parse(serializedTasks).map((item) => {
        const taskInstance = new Task();
        Object.assign(taskInstance, item);
        return taskInstance;
      })
    : [];
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
            taskData.isCompleted() && !mockTasks[index].isCompleted();
          const isTaskNowIncomplete =
            !taskData.isCompleted() && mockTasks[index].isCompleted();

          mockTasks[index] = Object.assign(mockTasks[index], taskData);

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
        taskData.id = newId;
        mockTasks.push(taskData);
        saveTasksToLocalStorage(mockTasks);
        resolve(taskData);
      }
    });
  },
  initMockTasks: () => {
    const task1 = new Task(
      1,
      "Visitar larajosed.github.io",
      "Todos",
      "Alta",
      "Explorar en detalle el portafolio online de José Lara, analizar la estructura del sitio, la calidad de su código, y la presentación de sus proyectos. Prestar especial atención a la sección de 'Proyectos' y a las tecnologías que utiliza.",
      null,
      moment().subtract(5, "days"),
      moment(),
      null,
      "Doing"
    );
    const task2 = new Task(
      2,
      "Llamar a José Lara para entrevistarle",
      "Recursos Humanos",
      "Alta",
      "Programar y llevar a cabo una entrevista telefónica con José Lara. El objetivo es evaluar sus habilidades técnicas, experiencia previa y adecuación cultural para el puesto de desarrollador. Es crucial documentar todas las respuestas clave.",
      "Preparar preguntas clave para la entrevista",
      moment().subtract(9, "days"),
      moment().subtract(7, "days"),
      moment(),
      "Doing"
    );
    const task3 = new Task(
      3,
      "Buscar memes de gatitos",
      "José",
      "Baja",
      "Invertir un tiempo en la búsqueda de memes de gatitos humorísticos y de alta calidad en diversas plataformas como Reddit, Twitter, y sitios especializados. El objetivo es seleccionar los 10 mejores para animar el chat del equipo y fortalecer el compañerismo.",
      "Coleccionar los 10 mejores memes de gatos para el chat del equipo",
      moment().subtract(10, "days"),
      moment().subtract(9, "days"),
      moment().subtract(8, "days"),
      "Done"
    );
    const task4 = new Task(
      4,
      "Configurar el entorno de desarrollo para el proyecto 'Agile Board'",
      "Equipo de Desarrollo",
      "Baja",
      "Asegurar que el entorno de desarrollo esté completamente configurado y listo para empezar a trabajar en el proyecto 'Agile Board'. Esto incluye la instalación de las últimas versiones de Node.js y npm, y la clonación del repositorio principal del proyecto desde GitHub. También se deben instalar todas las dependencias necesarias con `npm install`.",
      "Instalar Node.js, npm, y clonar el repositorio del proyecto",
      moment().subtract(7, "days"),
      moment().subtract(7, "days"),
      null,
      "To Do"
    );
    const task5 = new Task(
      5,
      "Revisar el informe de métricas del trimestre",
      "Dirección",
      "Media",
      "Analizar en profundidad el informe de métricas del último trimestre. Se deben examinar los KPIs principales como el crecimiento interanual, la tasa de retención de clientes y la rentabilidad por producto. El análisis debe incluir la identificación de áreas de mejora y la preparación de un resumen ejecutivo para la próxima reunión de dirección.",
      "Analizar el crecimiento interanual y los KPIs principales",
      moment().subtract(5, "days"),
      moment().subtract(5, "days"),
      moment().subtract(5, "days"),
      "Done"
    );
    const task6 = new Task(
      6,
      "Escribir la documentación técnica del API",
      "José",
      "Alta",
      "Redactar una documentación técnica completa y clara para el API RESTful. Esto implica describir cada endpoint, los parámetros de entrada requeridos, los posibles códigos de respuesta HTTP y ejemplos de payloads de solicitud y respuesta. La documentación debe ser lo suficientemente detallada para que otros desarrolladores puedan integrar la API sin problemas.",
      "Detallar los endpoints, parámetros, y respuestas del API RESTful",
      moment().subtract(7, "days"),
      moment().subtract(6, "days"),
      moment().subtract(6, "days"),
      "Done"
    );
    const task7 = new Task(
      7,
      "Planificar la fiesta de fin de año",
      "Comité de Eventos",
      "Baja",
      "Comenzar la fase inicial de planificación para la fiesta de fin de año de la empresa. Las actividades incluyen investigar y contactar a varios proveedores de catering, explorar diferentes salones de eventos que se adapten al número de asistentes y recopilar ideas de actividades para el evento.",
      "Contactar proveedores de catering y salones de eventos",
      moment().subtract(9, "days"),
      moment().subtract(8, "days"),
      moment().subtract(7, "days"),
      "Done"
    );
    const task8 = new Task(
      8,
      "Crear un nuevo logo para la empresa",
      "Diseño",
      "Baja",
      "Diseñar un nuevo logo que capture la esencia de la marca. Esta tarea implica investigar las tendencias actuales de diseño, crear al menos tres propuestas de diseño con diferentes paletas de colores y tipografías, y preparar los archivos finales en varios formatos (vectorial, PNG, JPG).",
      "Generar 3 propuestas de diseño basadas en la nueva identidad de marca",
      moment().subtract(8, "days"),
      moment().subtract(7, "days"),
      moment().subtract(8, "days"),
      "Done"
    );
    const task9 = new Task(
      9,
      "Actualizar la página web con las nuevas promociones",
      "Marketing",
      "Media",
      "Implementar la nueva campaña promocional de otoño en la página web principal. Esto incluye la creación y subida de banners publicitarios optimizados para web, la redacción y publicación de textos persuasivos en la sección de ofertas y la verificación de que todos los enlaces y botones de llamada a la acción funcionen correctamente.",
      "Subir los banners y textos publicitarios para la campaña de otoño",
      moment().subtract(8, "days"),
      moment().subtract(7, "days"),
      null,
      "Doing"
    );
    const task10 = new Task(
      10,
      "Realizar la auditoría de seguridad del servidor",
      "IT",
      "Alta",
      "Llevar a cabo una auditoría de seguridad completa en los servidores de la empresa. La tarea implica ejecutar un escaneo de vulnerabilidades, analizar los logs de acceso en busca de actividades sospechosas, y aplicar los parches de seguridad más recientes para mitigar cualquier riesgo identificado. Es crucial generar un informe detallado con los hallazgos y las acciones correctivas.",
      "Verificar las vulnerabilidades y aplicar los parches de seguridad más recientes",
      moment().subtract(9, "days"),
      moment().subtract(7, "days"),
      moment().subtract(4, "days"),
      "Done"
    );
    const task11 = new Task(
      11,
      "Preparar informe de gastos del departamento de ventas",
      "Finanzas",
      "Media",
      "Recopilar y analizar todos los gastos incurridos por el departamento de ventas en el último mes. Es necesario categorizar los gastos, compararlos con el presupuesto asignado y preparar un informe detallado con gráficos y recomendaciones.",
      "Analizar gastos y crear informe detallado",
      moment().subtract(3, "days"),
      moment().subtract(2, "days"),
      moment(),
      "Doing"
    );
    const task12 = new Task(
      12,
      "Actualizar la base de datos de clientes",
      "Ventas",
      "Baja",
      "Revisar y actualizar la información de contacto de los clientes en la base de datos CRM. Se debe verificar que todos los datos estén correctos y completos, y eliminar cualquier registro duplicado o obsoleto.",
      "Verificar y limpiar la base de datos de clientes",
      moment().subtract(3, "days"),
      moment().subtract(2, "days"),
      moment(),
      "To Do"
    );
    const task13 = new Task(
      13,
      "Revisar la usabilidad de la landing page",
      "Diseño UX/UI",
      "Alta",
      "Realizar una revisión exhaustiva de la usabilidad de la nueva landing page. Esto incluye pruebas de navegación, feedback de usuarios internos y la identificación de puntos de fricción. El objetivo es mejorar la experiencia del usuario y la tasa de conversión.",
      "Recoger feedback y analizar puntos de fricción",
      moment().subtract(5, "days"),
      moment().subtract(3, "days"),
      moment().subtract(2, "days"),
      "Done"
    );
    const task14 = new Task(
      14,
      "Coordinar la reunión semanal del equipo de Marketing",
      "Marketing",
      "Baja",
      "Planificar la agenda para la reunión semanal del equipo. Se deben incluir los temas clave a discutir, asignar tiempo para cada punto y enviar la invitación y los materiales necesarios a todos los miembros del equipo.",
      "Preparar agenda y enviar invitación",
      moment().subtract(4, "days"),
      moment().subtract(3, "days"),
      moment().subtract(2, "days"),
      "Done"
    );
    const task15 = new Task(
      15,
      "Desarrollar una nueva funcionalidad en el dashboard",
      "Equipo de Desarrollo",
      "Alta",
      "Diseñar y desarrollar una nueva funcionalidad que permita a los usuarios exportar datos del dashboard en formato CSV. La tarea incluye el diseño de la interfaz de usuario, la implementación del backend y las pruebas unitarias.",
      "Implementar la función de exportación de datos",
      moment().subtract(5, "days"),
      moment().subtract(4, "days"),
      moment().subtract(3, "days"),
      "Done"
    );
    const task16 = new Task(
      16,
      "Revisar contratos con nuevos proveedores",
      "Legal",
      "Media",
      "Analizar los términos y condiciones de los contratos propuestos por los nuevos proveedores. Es esencial identificar cualquier cláusula de riesgo, negociar los puntos críticos y asegurar que los contratos cumplen con la normativa vigente de la empresa.",
      "Analizar cláusulas y negociar términos",
      moment().subtract(5, "days"),
      moment().subtract(4, "days"),
      moment().subtract(1, "days"),
      "Done"
    );
    const task17 = new Task(
      17,
      "Preparar presentación para el CEO",
      "Dirección",
      "Alta",
      "Crear una presentación ejecutiva para el CEO sobre el estado actual del proyecto 'Innovación 2026'. La presentación debe ser concisa, visual y destacar los hitos alcanzados, los desafíos y los próximos pasos clave.",
      "Diseñar y redactar presentación ejecutiva",
      moment().subtract(3, "days"),
      moment().subtract(2, "days"),
      moment().subtract(1, "days"),
      "Done"
    );
    const task18 = new Task(
      18,
      "Crear contenido para el blog sobre las novedades del producto",
      "Marketing",
      "Media",
      "Investigar y redactar un artículo de blog sobre las últimas actualizaciones y características del producto. El contenido debe ser informativo, atractivo y optimizado para SEO, con un enfoque en los beneficios para el cliente.",
      "Redactar artículo y optimizar para SEO",
      moment().subtract(3, "days"),
      moment().subtract(2, "days"),
      moment().subtract(1, "days"),
      "Done"
    );
    const task19 = new Task(
      19,
      "Optimizar el rendimiento de la base de datos",
      "IT",
      "Alta",
      "Realizar un análisis de rendimiento de la base de datos principal de la empresa. La tarea incluye la identificación de consultas lentas, la creación de nuevos índices y la optimización de las tablas para mejorar los tiempos de respuesta del sistema.",
      "Identificar consultas lentas y optimizar índices",
      moment().subtract(3, "days"),
      moment().subtract(2, "days"),
      moment().subtract(1, "days"),
      "Done"
    );
    const task20 = new Task(
      20,
      "Gestionar la atención al cliente en redes sociales",
      "Comunicaciones",
      "Baja",
      "Monitorear las redes sociales de la empresa para responder a preguntas y comentarios de los clientes de manera oportuna y profesional. Es crucial mantener un tono de marca coherente y escalar los problemas complejos al equipo de soporte adecuado.",
      "Responder a comentarios y preguntas en redes sociales",
      moment().subtract(2, "days"),
      moment().subtract(1, "days"),
      moment(),
      "Done"
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
      task11,
      task12,
      task13,
      task14,
      task15,
      task16,
      task17,
      task18,
      task19,
      task20,
    ];

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasksArray));
    mockTasks = loadTasksFromLocalStorage();
  },
};

export default todoService;
