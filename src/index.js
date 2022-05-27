import Project from './Project'
import Task from './Task'
import Todo from './Todo'

const toDoList = new Todo()

const projectList = document.getElementById('projects')
const taskList = document.querySelector('#tasks')




const title = document.getElementById('task-title')
const taskInfoContainer = document.querySelector('#task-info')

const addProjectBtn = document.getElementById('add-project-btn')
const addProjectInput = document.getElementById('add-project-text')

const addTaskBtn = document.getElementById('add-task-btn')
const addTaskInput = document.getElementById('add-task-text')
const addDescriptionInput = document.getElementById('description-task-text')
document.getElementById('due-date').valueAsDate = new Date();
const dueDateInput = document.getElementById('due-date')
const addPriorityInput = document.getElementById('priority')

const projectListContainer = document.createElement('span')
projectList.appendChild(projectListContainer)





const cleanChildNodes = (list) =>{
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
      }
}

const drawProjectList = () => {
    cleanChildNodes(projectList)
    for (let i in toDoList.projects){
        let projectName = toDoList.projects[i].getName()
        let divContainer = document.createElement('div')
        let div = document.createElement('button')
        let delProjectButton = document.createElement('button')
        div.setAttribute('id', projectName)
        delProjectButton.setAttribute('id', projectName)
        divContainer.className = 'project-list-container'
        div.className = 'project-btn'
        delProjectButton.className = 'delete-project-btn'
        div.innerText = projectName
        delProjectButton.innerText = 'x'
        divContainer.appendChild(div)
        const UNREMOVABLEPROJECTS = ['Inbox', 'This week', 'Today'] 
        if (!UNREMOVABLEPROJECTS.includes(projectName)) divContainer.appendChild(delProjectButton)
        
        projectList.appendChild(divContainer)
    }
    const projectBtn = document.querySelectorAll('.project-btn')
    for (let project of projectBtn){
        project.addEventListener('click', projectBtnHandler)
    }

    const delProjectBtn = document.querySelectorAll('.delete-project-btn')
    for (let project of delProjectBtn){
        project.addEventListener('click', delProjectBtnHandler)
    }
}

const projectBtnHandler = (e) => {
    let name = e.target.id
    title.innerText = name

    drawTaskList(name)
}

const addProjectButtonHandler = () => {
    toDoList.addProject(addProjectInput.value)
    projectListContainer.remove()
    drawProjectList()
}

const delProjectBtnHandler = (e) => {
    let projectName = e.target.id
    toDoList.deleteProject(projectName)
    projectListContainer.remove()
    drawProjectList()
}

const addTaskButtonHandler = () => {
    let newTask = new Task()

    newTask.setName(addTaskInput.value) 
    newTask.setDiscription(addDescriptionInput.value)
    let dueDate = new Date(dueDateInput.value)
    newTask.setDate(dueDate)
    //console.log(newTask.getDate().toDateString())
    newTask.setPriority(addPriorityInput.value)
    //console.log(newTask.getPriority())

    

    console.log(title.innerText)
    let project = toDoList.getProject(title.innerText)
    project.addTask(newTask)
    drawTaskList(project.getName())
}

const drawTaskList = (projectName) => {
    cleanChildNodes(taskList)
    cleanChildNodes(taskInfoContainer)
    let project = toDoList.getProject(projectName)
    for (let i in project.getTasks()){
        let taskName = project.getTasks()[i].getName()
        let divContainer = document.createElement('div')
        divContainer.className = 'task-list-container'
        let div = document.createElement('button')
        let delTaskButton = document.createElement('button')
        delTaskButton.setAttribute('id', taskName)
        div.setAttribute('id', taskName)
        delTaskButton.className = 'delete-task-button'
        div.className = 'task-btn'
        delTaskButton.innerText = 'x'
        div.innerText = taskName
        divContainer.appendChild(div)
        divContainer.appendChild(delTaskButton)
        taskList.appendChild(divContainer)
    }
    const delTaskBtn = document.querySelectorAll('.delete-task-button')
    for (let task of delTaskBtn){
        task.addEventListener('click', delTaskBtnHandler)
    } 
    
    const taskBtn = document.querySelectorAll('.task-btn')
    for (let task of taskBtn){
        task.addEventListener('click', taskBtnHandler)
    }
}

const delTaskBtnHandler = (e) => {
    let taskName = e.target.id
    console.log(taskName)
    let project = toDoList.getProject(title.innerText)
    project.deleteTask(taskName)
    drawTaskList(project.getName())
}

const taskBtnHandler = (e) => {

    cleanChildNodes(taskInfoContainer)

    let taskName = e.target.id
    let projectName = title.innerText
    let task = toDoList.getProject(projectName).getTask(taskName)
    let description = task.getDescription()
    let date = task.getDate().toDateString()
    let priority = task.getPriority()

    let taskTitle = document.createElement('p')
    let taskDescription = document.createElement('p')
    let taskDate = document.createElement('p')
    let taskPriority = document.createElement('p')

    taskTitle.innerText = taskName
    taskDescription.innerText = `Description: ${description}`
    taskDate.innerText = `Due date: ${date}`
    taskPriority.innerText = `Priority ${priority}`

    taskInfoContainer.appendChild(taskTitle)
    taskInfoContainer.appendChild(taskDescription)
    taskInfoContainer.appendChild(taskDate)
    taskInfoContainer.appendChild(taskPriority)


    console.log(priority)

}





drawProjectList()
addProjectBtn.addEventListener('click', addProjectButtonHandler)
addTaskBtn.addEventListener('click', addTaskButtonHandler)