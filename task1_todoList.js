// Task 09 TodoList Application
// RU: Создать классы 'задача' и 'список задач' со следющим функционалом:
//     1. Добавить задачу в список
//     2. Получить и вывести в консоль список всех задач
//        в формате "[new] Task 1", "[completed] Task2"
//     3. Отметить указанную задачу как выполненную
//     4. Удалить задачу из списка
//     5. Отсортировать задачи по алфавиту по возрастанию или по убыванию
//     6. Очистить список задач

class Task {
    constructor(name) {
        this.id = Task.id++;
        this.name = name;
    }
    setCompleted() {
        this.status = true;
    }
    toString() {
        return `[${this.status ? 'completed' : 'new'}] ${this.id}: ${this.name}`;
    }
};
Task.id = 0;

class TaskList {
    constructor(tasks) {
        this._tasks = tasks;
    }
    get tasks() {
        return this._tasks.forEach(task => console.log(task.toString()));   
    }
    completeTask(id) {
        this._tasks.find(task => task.id === id).setCompleted();
        console.log(`Task with id ${id} completed!`);
    }
    removeTask(id) {
        this._tasks = this._tasks.filter(task => task.id !== id);
        console.log(`Task with id ${id} removed!`);
    }
    sortTasks(order) {
        order === 'desc'
            ? this._tasks.sort((a, b) => {
                if (a.name < b.name) {
                    return 1;
                } 
                if (a.name > b.name) {
                    return -1;
                }
                return 0;
            })        
            : this._tasks.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                } 
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            });
        console.log(`Tasks sorted with ${order} order!`);
    }
    clearTaskList() {
        this._tasks = [];
        console.log(`Task list is clear!`);
    }
};

let task1 = new Task('Buy fruits');
let task2 = new Task('Clean room');
let task3 = new Task('Go for a walk');
let task4 = new Task('Cook the dinner');
let task5 = new Task('Make homework');

let tasks = [task1, task2, task3, task4, task5];

let taskList = new TaskList(tasks);
taskList.tasks;
console.log('---------------------');
taskList.completeTask(2);
taskList.tasks;
console.log('---------------------');
taskList.removeTask(1);
taskList.tasks;
console.log('---------------------');
taskList.sortTasks('asc');
taskList.tasks;
console.log('---------------------');
taskList.sortTasks('desc');
taskList.tasks;
console.log('---------------------');
taskList.clearTaskList();
taskList.tasks;
console.log('---------------------');