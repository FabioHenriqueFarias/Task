export class TaskModel {
    
    public id: string;
    public title: string;
    public completed: boolean;

    constructor(id: string, title: string){
        this.id = id;
        this.title = title;
        this.completed = false;
    }
}