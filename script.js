////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    /* VARIABLES */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let textInput = document.querySelector('#input-task');
const addButton = document.querySelector('#add-task-button');
let task = document.querySelector('task');
const myList = document.querySelector('#task-list');
let tasks = document.getElementsByTagName("LI");
let taskList = [];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    /* LOAD LIST  */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
getFromStorage();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    /* FUNCTIONS  */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// -1- Function to add a task to the task list
function addTask(item){

    //Check if empty
    if(item !==''){

        //Convert input into object
        const task = {
            id: Date.now(),
            name: item,
            complete: false
        };

        //Add item to list and local storage
        taskList.push(task);
        addToStorage(taskList);

        //Empty input
        textInput.value='';

    }}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// -2- Function loop through taskList, create HTML for new task and get a list from tasks
function renderToDoList(taskList) {
    //Empty <ul>
    myList.innerHTML = '';

    //loop through list
    taskList.forEach(function(item) {
        const complete = item.complete ? 'checked': null;

        let listItem = document.createElement("li");
        //listItem.setAttribute('class', 'item');
        listItem.setAttribute('data-key', item.id);

        //Check if task is completed
        if (item.complete === true){
            listItem.classList.add('complete');
        }

        //Add Item to HTML
        listItem.innerHTML = `<input type="checkbox" ${complete}><span class="task">${item.name}</span><button class="delete-btn">x</button>`;

        //Add Item to List
        myList.append(listItem);

    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// -3- Function to add to list of tasks to storage
function addToStorage(taskList){
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderToDoList(taskList);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// -4- Function to load tasks from storage and add to list
function getFromStorage(){
    const reference = localStorage.getItem("tasks") || [];
    if (reference){
        taskList = JSON.parse(reference);
        renderToDoList(taskList);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// -4- Function to complete a task and add property to storage
function completeTask(id) {
    taskList.forEach(function(item){
        if(item.id == id) {
            item.complete = !item.complete;
            //item.classList.toggle('complete');
        }
    })
    addToStorage(taskList);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// -5- Function to delete a task and add property to storage
function deleteTask(id) {
    taskList = taskList.filter(function(item){
        return item.id != id;
    });
    addToStorage(taskList);
}

// https://love2dev.com/blog/javascript-remove-from-array/
// https://thecodingpie.medium.com/how-to-build-a-todo-list-app-with-javascript-and-local-storage-a884f4ea3ec
// https://codepen.io/thecodingpie/pen/ExPQdqb

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    /* EVENT LISTENERS */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Event - Add Task
addButton.addEventListener('click', function(){
    addTask(textInput.value);
});

//Event - Complete & Delete Task
myList.addEventListener('click', function(event) {
    // check if the event is on checkbox
    if (event.target.type === 'checkbox') {
        // toggle the state
        completeTask(event.target.parentElement.getAttribute('data-key'));
    }

    if (event.target.classList.contains('delete-btn')) {
        // get id from data-key attribute's value of parent <li> where the delete-button is present
        deleteTask(event.target.parentElement.getAttribute('data-key'));
    }
});