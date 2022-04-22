/*  
    Author:     Prasad A. Pathak
    NEU ID:     002925486
    Email:      pathak.pra@northeastern.edu
    Subject:    INFO6150 - Web Design and UX
    Purpose:    Javascript file to store all the functions required for the implementation
*/

// Wrapper method to add array of todo items from the .json file 
const addContent = (todo = []) => {
    const div = document.createElement('div');
    todo.forEach(item => addToDo(item,div));
    
    const para = document.getElementById('content');
    clearContent();
    para.appendChild(div);
}

// Method to clear the todo items from the UI
const clearContent = () => {
    const para = document.getElementById('content');
    para.innerHTML = '';
}

const deleteTodo = (event) => {
    console.log(`Clicked Delete`);
    const todoId = event.target.parentNode.querySelector('div').textContent.split(": ")[1];
    console.log(todoId);

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if( xhr.readyState === 4){
            console.log(`Succesfully Deleted : ${todoId}`);
            fetchData();
        }
        
    }

    xhr.open('DELETE', 'http://127.0.0.1:9000/todo/'+todoId, true);
    xhr.send('');
}

const enableUpdateTodo = (event) => {
    console.log('Clicked Update for a Todo Item');
    const todo = document.getElementById("update-todo");
    todo.classList.toggle("not-visible");

    const todoId = event.target.parentNode.querySelector('div').textContent.split(": ")[1];
    todo.querySelector('h4').textContent = `ID : ${todoId}`;

}

const updateTodo = (event) => {
    const todoId = event.target.parentNode.parentNode.querySelector('h4').textContent.split(": ")[1];
    console.log(`Updating a todo - ${todoId }`);

    const isNull = (utitle.value === "" || udesc.value === "" || udate.value === "" || utime.value === "" );
    // Raise an alert if the values are null
    if (isNull) {
        alert("Required fields to add a ToDo item are empty!");
    }
    else {
        const item = {
            title : utitle.value,
            description : udesc.value,
            due_date : udate.value,
            time : utime.value
        }
        console.log(item);

        const xhr = new XMLHttpRequest();
        xhr.open('PUT', 'http://127.0.0.1:9000/todo/'+todoId, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        
        xhr.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                // Request finished. Do processing here.
                const todo = document.getElementById("update-todo");
                todo.classList.toggle("not-visible");
                fetchData();
            }
        }

        xhr.send(JSON.stringify(item));
    }



}

// Method to add todo item to the list
const addToDo = (item,parent) => {

    const div = document.createElement('div');
    div.classList.add('todo-item');

    const checkBox = document.createElement('input');
    checkBox.setAttribute('type','checkbox');
    checkBox.setAttribute('onclick','isCompleted(this)');

    // Add item details
    const item_details = document.createElement('div');
    item_details.classList.add('todo-details');
    item_details.classList.add('not-visible');
    const item_id = document.createElement('div');
    item_id.textContent = `Id: ${item._id}`;
    const item_descrition = document.createElement('div');
    item_descrition.textContent = `Description: ${item.description}`;
    const item_duedate = document.createElement('div');
    item_duedate.textContent = `Due Date: ${item.due_date}`;
    const item_time = document.createElement('div');
    item_time.textContent = `Time: ${item.time}`;
    const update_button = document.createElement('button');
    update_button.textContent = `Update`;
    update_button.addEventListener('click', enableUpdateTodo);
    const delete_button = document.createElement('button');
    delete_button.textContent = `Delete`;
    delete_button.addEventListener('click', deleteTodo);
    item_details.appendChild(item_id);
    item_details.appendChild(item_descrition);
    item_details.appendChild(item_duedate);
    item_details.appendChild(item_time);
    item_details.appendChild(update_button);
    item_details.appendChild(delete_button);

    const todoContent = document.createElement('span');
    todoContent.textContent = `${item.title}`;
    todoContent.classList.add('todo-item-title');

    div.appendChild(checkBox);
    div.appendChild(todoContent);
    div.appendChild(item_details);

    parent.appendChild(div);

}

// XHR request to fetch data from the todo.json file
const fetchData = () => {
    const xhr = new XMLHttpRequest(); 
    xhr.onreadystatechange =  function(response) {
        if( xhr.readyState === 4){
            console.log(xhr.responseText);
            const data = xhr.responseText;
            const todo = JSON.parse(data);
            addContent(todo);
        }
        
    }
    xhr.open('GET','http://127.0.0.1:9000/todo',true);
    xhr.send('');
}

// Method to add a new ToDo item from UI to the existing list of ToDo items
const addToDoFromUI = () => {
    console.log("Pressed Add button");
    const isNull = (title.value === "" ||desc.value === "" ||date.value === "" ||time.value === "" );
    // Raise an alert if the values are null
    if (isNull) {
        alert("Required fields to add a ToDo item are empty!");
    }
    else {
        const item = {
            title : title.value,
            description : desc.value,
            due_date : date.value,
            time : time.value
        }
        console.log(item);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://127.0.0.1:9000/todo', true);
        xhr.setRequestHeader("Content-Type", "application/json");
        
        xhr.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                // Request finished. Do processing here.
                const todo = document.getElementById("add-todo");
                todo.classList.toggle("not-visible");
                fetchData();
            }
        }

        xhr.send(JSON.stringify(item));
    }
}

// Method to toggle the completion of the ToDo
const isCompleted = (checkBox) => {
    const parent = checkBox.parentNode;
    parent.classList.toggle("strikethrough");
}

const enableTodoUI = () => {
    console.log('Clicked enable add!');
    const todo = document.getElementById("add-todo");
    todo.classList.toggle("not-visible");
}


// Click event listener to fetch data from the todo.json file
const showButton = document.getElementById('showButton');
showButton.addEventListener('click', fetchData);

// Click event listener to clear to the ToDo items from the screen
const clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', clearContent);

// Click event listener to add a new ToDo item from the UI
const addButton = document.getElementById('addButton');
addButton.addEventListener('click', addToDoFromUI);

// Click event listener to add a new ToDo item from the UI
const showAddButton = document.getElementById('showAddButton');
showAddButton.addEventListener('click', enableTodoUI);

// Click event listener to add a new ToDo item from the UI
const updateButton = document.getElementById('updateButton');
updateButton.addEventListener('click', updateTodo);

// Function to toggle completion of the ToDo Item on checkbox click event
document.onclick = (item) => {
    // If clicked on todo div container toggle details
    if (item.target.classList.contains("todo-item")) {
        const details = item.target.querySelector('div');
        details.classList.toggle("not-visible");
        console.log('You have clicked a todo item!');
    }
    // If clicked on todo item title toggle details
    else if (item.target.classList.contains("todo-item-title")) {
        const parent = item.target.parentNode;
        const details = parent.querySelector('div');
        details.classList.toggle("not-visible");
        console.log('You have clicked a todo item!');
    }
}