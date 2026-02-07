class TaskManager {
  constructor() {
    this.tasks = [];
  }

  addTask(description) {
    const task = {
      id: Date.now(),
      description,
      completed: false,
      createdAt: new Date()
    };
    this.tasks.push(task);
    return `Task added: "${description}"`;
  }

  listTasks() {
    if (this.tasks.length === 0) {
      return "You have no tasks.";
    }

    let response = "Your tasks:\n";
    this.tasks.forEach((task, index) => {
      const status = task.completed ? '✅' : '⬜';
      response += `${index + 1}. ${status} ${task.description}\n`;
    });
    return response;
  }

  completeTask(index) {
    if (index < 1 || index > this.tasks.length) {
      return "Invalid task number.";
    }
    this.tasks[index - 1].completed = true;
    return `Task ${index} marked as complete!`;
  }

  removeTask(index) {
    if (index < 1 || index > this.tasks.length) {
      return "Invalid task number.";
    }
    const removed = this.tasks.splice(index - 1, 1)[0];
    return `Removed task: "${removed.description}"`;
  }
}

module.exports = TaskManager;