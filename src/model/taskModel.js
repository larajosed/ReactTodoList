export default class Task {
  constructor(
    id,
    task,
    completed,
    assigned,
    priority,
    descriptiom,
    note,
    creationDate,
    dueDate,
    completionDate
  ) {
    this.id = id;
    this.task = task;
    this.completed = completed;
    this.assigned = assigned;
    this.priority = priority;
    this.descriptiom = descriptiom;
    this.note = note;
    this.creationDate = creationDate;
    this.dueDate = dueDate;
    this.completionDate = completionDate;
  }
}
