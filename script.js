
//selector DOM và gán giá trị đó cho các hằng
const todoForm = document.querySelector('.new-todo-form');
const todoInput = document.querySelector('.taskname');
const todoItemsList = document.querySelector('.todo-items');

//tạo array chứa các todo
let todos=[];

//event listener cho nguyên cả new-todo-form (chứa cả form và nút add)
todoForm.addEventListener("submit", function(event){

    event.preventDefault();
    addTodo(todoInput.value);
});

function addTodo(item){
    if (item!==''){
        const todo = {
            id: Date.now(),
            name: item,
            completed:false,
        };

        todos.push(todo);
        addToLocalStorage(todos);
        todoInput.value='';
    }
}

function renderTodos (todos){
    todoItemsList.innerHTML = '';
    todos.forEach ( (item)=>{
        const checked = item.completed ? 'checked':null;

        const li = document.createElement('li');

        li.setAttribute('data-key',item.id);

        if (item.completed ===true){
            li.classList.add('checked');
        }

        li.innerHTML = `
        <input type ="checkbox" class="checkbox" ${checked}>
        ${item.name}
        <button class="delete-button">X</button>`

        todoItemsList.append (li);
    });
}


function addToLocalStorage(todos) {

    localStorage.setItem ('todo',JSON.stringify(todos));
    renderTodos (todos);
}

function getFromLocalStorage(){
    const reference = localStorage.getItem ('todos');

    if (reference) {

        todos = JSON.parse(reference);
        renderTodos (todos);
    }
}

function toggle(id){
    todos.forEach (function(item){
        if (item.id==id){
            item.completed = !item.completed;
        }
    });

    addToLocalStorage(todos);
}

function deleteTodo (id){

    todos =todos.filter(function(item){

        return item.id != id;
    });

    addToLocalStorage (todos);
}

getFromLocalStorage ();

todoItemsList.addEventListener ('click', function (event){
    if (event.target.type==='checkbox'){
        toggle(event.target.parentElement.getAttribute('data-key'));
    }

    if (event.target.classList.contains('delete-button')){

        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
});


/* add an eventListener on form, and listen for submit event*/
// function to add todo
// function to render given todos to screen
// function to add todos to local storage
// function helps to get everything from local storage
// function to toggle the value to completed and not completed
// function to delete a todo from todos array, then updates localstorage and renders updated list to screen
// after that addEventListener <ul> with class=todoItems. Because we need to listen for click event in all delete-button and checkbox


//addTodo(item)
//renderTodos(todos)
//addToLocalStorage(todos)
//getFromLocalStorage()
//toggle(id)
//deleteTodo(id)

//https://thecodingpie.medium.com/how-to-build-a-todo-list-app-with-javascript-and-local-storage-a884f4ea3ec