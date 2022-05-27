export default class Task{
    constructor(name, description, dueDate, priority){
        this.name = name
        this.discription = description
        this.dueDate = dueDate
        this.priority = priority
    }

    setName(name){
        this.name = name
    }

    getName(){
        return this.name
    }

    setDiscription(discription){
        this.discription = discription
    }

    getDescription(){
        return this.discription
    }

    setDate(dueDate){
        this.dueDate = dueDate
    }

    getDate(){
        return this.dueDate
    }

    setPriority(priority){
        this.priority = priority
    }

    getPriority(){
        return this.priority
    }
}