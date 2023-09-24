import './style.css'

interface Todo {
    tittle:string,
    isCompleted:boolean,
    readonly id :string
}

const Todos:Array<Todo> = [];

const Todoscontainers = document.querySelector(".todocontainer") as HTMLDivElement;

const todoinpiut = document.getElementsByTagName('input')[0] as HTMLInputElement;

const myfrom = document.getElementById('myfrom') as HTMLFormElement;


myfrom.onsubmit=(e)=>{
    e.preventDefault();

    const todo:Todo = {
        tittle:todoinpiut.value,
        isCompleted:false,
        id : String(Math.random())
    }

    Todos.push(todo);
    console.log(Todos);

    todoinpiut.value = '';
    rendertodo(Todos);


}

const gerneratetodoitem = (tittle:string, isCompleted:boolean, id:string)=>{
    const todo = document.createElement('div');
    todo.className = 'todo'

    // creating a checkbox for completed
    const checkbox:HTMLInputElement = document.createElement('input') ;
    checkbox.setAttribute("type", 'checkbox');
    checkbox.className='isCompleted';
    checkbox.checked=isCompleted;
    checkbox.onchange =()=>{
        Todos.find(item => {
            if(item.id === id){
                item.isCompleted = checkbox.checked
            }
        })
        paragraph.className = checkbox.checked ? "textCut" : ''
    }

    //creating p for tittle
    const paragraph:HTMLParagraphElement = document.createElement('p') ;
    paragraph.innerText= tittle;
    paragraph.className = isCompleted ? "textCut" : ''

    //creating delete button
    const btn: HTMLButtonElement = document.createElement("button") ;
    btn.innerText="X"
    btn.className='deleteBtn'
    btn.onclick= ()=>{
        deleteTodo(id);
        rendertodo(Todos);
    }

    //apending all to to do item
    todo.append(checkbox, paragraph, btn);
    Todoscontainers.append(todo)

}

const rendertodo = (todos:Todo[]) =>{
    Todoscontainers.innerText ='';
    todos.forEach(item=>{
        gerneratetodoitem(item.tittle, item.isCompleted, item.id);
    })
}

const deleteTodo = (id:string)=>{
    const idx = Todos.findIndex((item)=> item.id === id)
    Todos.splice(idx,1);
}
