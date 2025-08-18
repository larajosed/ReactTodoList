export default class Task {
  constructor(
    id,
    taskName,
    assignedTo,
    priority,
    description,
    note,
    creationDate,
    dueDate,
    completionDate,
    status
  ) {
    this.id = id;
    this.taskName = taskName;
    this.assignedTo = assignedTo;
    this.priority = priority;
    this.description = description;
    this.note = note;
    this.creationDate = creationDate;
    this.dueDate = dueDate;
    this.completionDate = completionDate;
    this.status = status;
  }
}
