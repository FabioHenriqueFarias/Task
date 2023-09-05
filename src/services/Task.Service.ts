import { TaskModel } from "../model/Task.Model";

export class TaskService {
    public tasks: TaskModel[];
    public tasksLocalStorage: TaskModel[];

    constructor() {
        this.tasks = [];
        this.tasksLocalStorage = [];
    }

    addTaks(task: TaskModel, id: string): void {
        this.tasks.push(task);
        const jsonTask = JSON.stringify(task);
        localStorage.setItem(id, jsonTask);
    }

    removeTask(currentTask: number): void {

        localStorage.removeItem(this.tasks[currentTask].id);
        this.tasks.splice(currentTask, 1); 
    }

    loadTasksFromLocalStorage() {

        for (const key of Object.keys(localStorage)){
            const taskJson = localStorage.getItem(key);
            if(taskJson){
                const task = JSON.parse(taskJson) as TaskModel;
                this.tasks.push(task);
            }
        }

        this.tasksLocalStorage = this.tasks;

    };

    completedTask(currentTask: number): void {

        this.tasks[currentTask].completed = !this.tasks[currentTask].completed;
        localStorage.setItem(this.tasks[currentTask].id, JSON.stringify(this.tasks[currentTask]));
    }
}