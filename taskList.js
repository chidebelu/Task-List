//Define UI Variables
const form = document.querySelector("#task-form")
const tasklist = document.querySelector(".collection")
const clearBtn = document.querySelector(".clear-tasks")
const filter = document.querySelector("#filter")
const taskInput = document.querySelector("#task")

// Load all event Listeners
loadEventListeners()

function loadEventListeners(){
    document.addEventListener("DOMContentLoaded", displayTasks)
    form.addEventListener("submit", addTasks)
    tasklist.addEventListener("click", removeTask)
    filter.addEventListener("keyup", fltTasks)
}
function displayTasks(){
    let tasks
    if(localStorage.getItem("task")===null){
        tasks = []
    }
    else {
        tasks = JSON.parse(localStorage.getItem("task"))
    }
    tasks.forEach(function(task){
        const li = document.createElement("li")
        li.className = "collection-items"
        li.appendChild(document.createTextNode(task))
        const link = document.createElement("a")
        link.className = "delete-item secondary-content"
        link.innerHTML = "<i class='fa fa-remove'></i>"
        li.appendChild(link)
        tasklist.appendChild(li)
    })
}
 function saveToLocalStorage(data){
     let tasks
     if(localStorage.getItem("task")===null){
        tasks = []
     }
     else {
         tasks= JSON.parse(localStorage.getItem("task"))
     }
        tasks.push(data)
        localStorage.setItem("task", JSON.stringify(tasks))
 }

 function addTasks(e){
     if(taskInput.value===""){
         return
     }
     else{
        const li = document.createElement("li")
        li.className = "collection-items"
        li.appendChild(document.createTextNode(taskInput.value))
        const link = document.createElement("a")
        link.className = "delete-item secondary-content"
        link.innerHTML = "<i class='fa fa-remove'></i>"
        li.appendChild(link)
        tasklist.appendChild(li)
        saveToLocalStorage(taskInput.value)
        taskInput.value=""
     }

    e.preventDefault()
 }
 function removeTask(e){
     if(e.target.parentElement.classList.contains("delete-item")){
         e.target.parentElement.parentElement.remove()
     }   
     removefromLocalStorage(e.target.parentElement.parentElement)
 }
 function removefromLocalStorage(taskItem){
     let tasks
     if(localStorage.getItem("task")===null){
        tasks = []
     }
     else{
         tasks = JSON.parse(localStorage.getItem("task"))
     }
     tasks.forEach(function(task, index){
            if(taskItem.textContent===task){
                tasks.splice(index, 1)
            }
     })
     localStorage.setItem("task", JSON.stringify(tasks))
 }
 function fltTasks(e){
     const text = e.target.value.toLowerCase()
     document.querySelectorAll(".collection-items").forEach(function(task){
         const item = task.firstChild.textContent
         if(item.toLowerCase().indexOf(text)!==-1){
            task.style.display = "block"
         }

         else {
             task.style.display="none"
         }
     })
 }