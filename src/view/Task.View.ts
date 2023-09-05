import { TaskModel } from "../model/Task.Model";

export class TaskView {
    
    private ul: HTMLUListElement;


    constructor(ulId: string) {
        this.ul = document.getElementById(ulId) as HTMLUListElement;
    }

    generateTask(task: TaskModel): void {  
        
        let li = document.createElement("li");
        li.className = "task-list-item";
        li.setAttribute("id", task.id);

        let label = document.createElement("label");
        label.className = "task-list-item-label";

        let input = document.createElement("input");
        input.type = "checkbox";
        input.checked = task.completed;

        let span = document.createElement("span");
        span.textContent = task.title;

        label.appendChild(input);
        label.appendChild(span);

        let deleteButton = document.createElement("span");
        deleteButton.id = "delete-btn";
        deleteButton.title = "Delete Task";

        li.appendChild(label);
        li.appendChild(deleteButton);

        this.ul.appendChild(li);
    }

    render(tasks: TaskModel[]){        
        this.ul.innerHTML = "";
        tasks.forEach(task => this.generateTask(task));
    }
}