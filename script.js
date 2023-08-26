
window.addEventListener ("load",function (){

todos = JSON.parse (localStorage.getItem ('todo'))|| [];/*lưu biến global "todos" vào local storeage 
ở dạng Object bằng cách dùng JSON.parse để chuyển giá trị todo ở dạng string JSON nhận được từ web server chuyển 
thành Object, trong trường hợp không có giá trị todo thì gán "todos" bằng array rỗng [] */

const nameInput = document.getElementById('name');

const username = localStorage.getItem('username')||''; // '' là emmpty string

nameInput.value = username;

nameInput.addEventListener ('change',function(e) {
    localStorage.setItem ('username',e.target.value);
}); // dùng để get và setitem cho username, nếu username đã có thì có thể update giá trị mới


// dùng để get json string
newTodoForm.addEventListener ('submit',function(e){
e.preventDefault();

const todo = {
    content: e.target.elements.content.value,
    category: e.target.elements.category.value,
    done:false,
    createAt: new Date().getTime()
};

todos.push (todo);// thêm todo mới vào array todos

localStorage.setItem ('todo',JSON.stringify(todos));/*chuyển giá trị todos
từ dạng mảng array sang string (nhờ stringify )vì web server không lưu được kiểu
array, sau đó gán giá trị đó cho todo nhờ method setItem*/

//reset form
e.target.reset ();

DisplayTodos ();

});
DisplayTodos ();

});


function DisplayTodos (){
     
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = "";/* mỗi lần gọi hàm DisplayTodos thì sẽ xóa(clear)
    mọi giá trị trong các tag HTML*/

    todo.forEach ( function(todo){// duyệt qua mọi todo
        const todoItem = document.createElement ('div');
        todoItem.classList.add ('todo-item');

        const label = document.createElement ('label');
        const input = document.createElement ('input');
        const span = document.createElement ('span');
        const content = document.createElement('div');
        const actions = document.createElement ('div');
        const edit =document.createElement ('button');
        const deleteButton = document.createElement ('button');

        input.type = 'checkbox';
        input.checked = todo.done; //trạng thái checked của box , checked hay chưa
        span.classList.add ('bubble');

        if (todo.category=='personal'){
            span.classList.add ('personal');
        } else {
            span.classList.add ('business');
        };

        content.classList.add ('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add ('delete');


        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
        edit.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';


        //thêm các giá trị trong (...) vào ngay phía sau giá trị label, actions, todoItem

        label.appendChild(input);
        label.appendChild (span);
        actions.appendChild (edit);
        actions.appendChild (deleteButton);
        todoItem.appendChild (label);
        todoItem.appendChild (content);
        todoItem.appendChild (actions);

        todoList.appendChild (todoItem);

        if (todo.done){
            todoItem.classList.add ('done');
        }

        input.addEventListener('change', function (e) {
            todo.done = e.target.checked;
            localStorage.setItem ('todo',JSON.stringify(todos));

            if (todo.done) {
                todoItem.classList.add ('done');
            } else {
                todoItem.classList.remove('done');
            }

            DisplayTodos ();
        });

        

        edit.addEventListener ('click',function (e){
            const input = content.querySelector ('input');
            input.removeAttribute ('readonly');
            input.focus ();

            input.addEventListener ('blur',function (e) {
                input.setAttribute ('readonly',true);
                todo.content = e.target.value;
                localStorage.setItem('todo',JSON.stringify (todos));
                DisplayTodos ();
            });
        });

        deleleButton.addEventListener ('click',function (e){
            todos = todos.filter (t => t!=todo);
            localStorage.setItem ('todos',JSON.stringify(todos));
            DisplayTodos();
        })


    });
}