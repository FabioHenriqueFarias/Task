import { TaskService } from "../services/Task.Service";
import { TaskView } from "../view/Task.View";
import { TaskModel } from "../model/Task.Model";
import { randomBytes } from 'crypto' // built-in module

export class TaskController {
    service: TaskService;
    view: TaskView;

    constructor(service: TaskService, view: TaskView){
        this.service = service;
        this.view = view;
    }

    createTask(title: string): void{        
        const id = randomBytes(15).toString('hex');
        const task = new TaskModel(id, title);
        this.service.addTaks(task, id);
        this.view.render(this.service.tasks);
    }

    removesTasks(currentTask: number): void {
        this.service.removeTask(currentTask);
        this.view.render(this.service.tasks);
    }

    completedTasks(currentTask: number): void {
        this.service.completedTask(currentTask);
        this.view.render(this.service.tasks);
    }

    loadTask(): void {
        this.service.loadTasksFromLocalStorage();
        this.view.render(this.service.tasks);
    }
}