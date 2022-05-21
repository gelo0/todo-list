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
        let div = document.createElement('button')
        div.setAttribute('id', projectName)
        div.className = 'project-btn'
        div.innerText = projectName
        projectList.appendChild(div)
    }
    const projectBtn = document.querySelectorAll('.project-btn')
    for (let project of projectBtn){
        project.addEventListener('click', projectBtnHandler)
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
        let div = document.createElement('button')
        div.setAttribute('id', taskName)
        div.className = 'task-btn'
        div.innerText = taskName
        taskList.appendChild(div)
    }

}

drawProjectList()
addProjectBtn.addEventListener('click', addProjectButtonHandler)
addTaskBtn.addEventListener('click', addTaskButtonHandler)







