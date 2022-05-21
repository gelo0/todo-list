export default class Project{
    constructor(name){
        this.name = name
        this.tasks = []
    }
    
    setName(name){
        this.name = name
    }

    getName(){
        return this.name
    }

    addTask(newTask){
        if (this.tasks.find((task) => task.getName() === newTask.name)) return
        return this.tasks.push(newTask)
    }

    deleteTask(taskName){
        this.tasks = this.tasks.filter((task) => task.name !== taskName)
    }

    setTasks(tasks){
        this.tasks = tasks
    }

    getTasks(){
        return this.tasks
    }

    getTask(taskName){
        return this.tasks.find((task) => task.getName() === taskName)
    }
}