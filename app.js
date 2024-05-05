let button = document.querySelector(".button");
let input = document.querySelector(".input");
let list = document.querySelector(".todos-container");
let localdata = JSON.parse(localStorage.getItem("todo"));
let todolist = localdata ||  [];

// At the time of adding it will add to an array todolist which contians all its add.
button.addEventListener("click", (event)=>{
    event.preventDefault();
    let text = input.value;
    if(text.length > 0){
        todolist.push({todo:text,id:Date.now(),iscompleted:false});
    }
    makeList(todolist);
    localStorage.setItem("todo",JSON.stringify(todolist));
    input.value = "";
})

// Making invidual list showing from Todolist array
function makeList(todolist){
    list.innerHTML = todolist.map(({todo,id,iscompleted})=>`<div class="todos-container"> <input data-key="${id}" id="item-${id}"  type="checkbox" ${iscompleted ? "checked" : ""} > <label class="${iscompleted ? "checked-todo" : ""}"  for="${id}" data-key="${id}">${todo}</label> <button> <span class="material-symbols-outlined" data-todokey="${id}">
    delete
    </span></button> </div>`
    ).join("");
}
// When we perfrom any event in the list it will identify that
list.addEventListener("click",(event)=>{
     let targeted = event.target.dataset.key;
     let delkey = event.target.dataset.todokey;
     todolist = todolist.map((todo)=>
        todo.id == targeted ? {...todo,iscompleted:!todo.iscompleted} : todo
     );
     todolist = todolist.filter((todo)=> todo.id != delkey);
     makeList(todolist);
     localStorage.setItem("todo",JSON.stringify(todolist));
})
