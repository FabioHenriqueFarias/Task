import { TaskController } from "./controller/Task.Controller";
import { TaskModel } from "./model/Task.Model";
import { TaskService } from "./services/Task.Service";
import { TaskView } from "./view/Task.View";

const taskService = new TaskService();
const taskView = new TaskView("task-list");
const taskController = new TaskController(taskService, taskView);

taskController.loadTask();

const clickCreatTask = document.getElementById("submit-task");
clickCreatTask?.addEventListener("click", (event: Event) => {
    event.preventDefault();

    const taskInput = document.querySelector("#task-input") as HTMLInputElement;
    const taskTitle = taskInput.value;
    if(taskTitle){
        taskController.createTask(taskTitle);
    }
    taskInput.value = "";
});

const ulElements = document.querySelector("#task-list") as HTMLUListElement;
ulElements?.addEventListener("click", (event: Event) => {
    event.preventDefault();
    let element = event.target as Element;
    let liElement = element.closest("li");
    let elementId = liElement?.getAttribute("id");    
    let taskElement = taskService.tasks.find((task) => task.id === elementId) as TaskModel | undefined;
    

    if(element.id === "delete-btn"){
        if(taskElement){ 
            taskController.removesTasks(taskService.tasks.indexOf(taskElement)); 
        }
    }
    
    if (element instanceof HTMLInputElement && element.type === "checkbox") {
        if(taskElement){  
            taskController.completedTasks(taskService.tasks.indexOf(taskElement)); 
        }
    }
});

