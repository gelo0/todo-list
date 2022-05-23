import Project from './Project'
import Task from './Task'
import Todo from './Todo'

const toDoList = new Todo()

const projectList = document.getElementById('projects')
const taskList = document.querySelector('#tasks')




const title = document.getElementById('task-title')

const addProjectBtn = document.getElementById('add-project-btn')
const addProjectInput = document.getElementById('add-project-text')

const addTaskBtn = document.getElementById('add-task-btn')
const addTaskInput = document.getElementById('add-task-text')

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
        div.className = 'project-btn'
        delProjectButton.className = 'delete-project-btn'
        div.innerText = projectName
        delProjectButton.innerText = 'x'
        divContainer.appendChild(div)
        divContainer.appendChild(delProjectButton)
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
    console.log(title.innerText)
    let project = toDoList.getProject(title.innerText)
    project.addTask(newTask)
    drawTaskList(project.getName())
}

const drawTaskList = (projectName) => {
    cleanChildNodes(taskList)
    let project = toDoList.getProject(projectName)
    for (let i in project.getTasks()){
        let taskName = project.getTasks()[i].getName()
        let divContainer = document.createElement('div')
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

    
    
}

const delTaskBtnHandler = (e) => {
    let taskName = e.target.id
    console.log(taskName)
    let project = toDoList.getProject(title.innerText)
    project.deleteTask(taskName)
    drawTaskList(project.getName())
}





drawProjectList()
addProjectBtn.addEventListener('click', addProjectButtonHandler)
addTaskBtn.addEventListener('click', addTaskButtonHandler)