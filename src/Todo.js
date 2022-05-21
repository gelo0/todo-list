import Project from './Project'
import Task from './Task'

export default class Todo{
    constructor(){
        this.projects = []
        this.projects.push(new Project('Inbox'))
        this.projects.push(new Project('Today'))
        this.projects.push(new Project('This week'))
    }

    addProject(name){
        if (this.projects.find((project) => project.name === name)) return
        this.projects.push(new Project(name))
    }

    getProject(projectName){
        return this.projects.find((project) => project.getName() === projectName)
    }
}