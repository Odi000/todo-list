/*-- App Logic --*/

//All created to-do's go here
class AllTodos {
    constructor() {
        const todoLibrary = [];

        this.addTodo = (todo) => {
            this.todoLibrary.push(todo);
        }

        this.getTodos = () => todoLibrary;
    }
}

class CreateTodo {
    constructor(name, description, date, color, parentListId) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.color = color;
        this.parentListId = parentListId;
    }
}


//Might remove this
// class Tasks {
//     constructor(upcoming, today, calendar) {
//         this.upcoming = upcoming;
//         this.today = today;
//         this.calendar = calendar;
//     }
// }

//to create Today Todos object I used function syntax 
function TodayTodos() {
    const id = "today";
    const today = new Date();

    const getTodos = () => {
        return allTodos.getTodos().filter(todo => {
            if (
                todo.date.getFullYear() === today.getFullYear() &&
                todo.date.getMonth() === today.getMonth() &&
                todo.date.getDate() === today.getDate()
            ) return true;
        });
    }

    return {
        id, getTodos
    }
}

class Calendar {
    constructor() {
        this.id = "calendar";
    }
    getTodos(selectedDate) {
        const date = new Date(selectedDate);
        return allTodos.getTodos().filter(todo => {
            if (
                todo.date.getFullYear() === date.getFullYear() &&
                todo.date.getMonth() === date.getMonth() &&
                todo.date.getDate() === date.getDate()
            ) return true;
        });
    }
}

class TodoLists {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.id = Math.floor(Math.random() * 10000);
    }
    getTodos() {
        const todos = allTodos.getTodos().filter(todo => todo.parentListId == this.id);
        return todos;
    }
}


//*--- Application User Interface ---*/
screenController()

function screenController() {
    const allTodos = new AllTodos();
    const todayTodos = TodayTodos();
    const calendar = new Calendar();
    const upcomingDiv = document.getElementById('upcoming');
    const todayDiv = document.getElementById('today');
    const calendarDiv = document.getElementById('calendar');
    const stickers = document.querySelector('.stickers');
    const newStickerBtn = document.querySelector('.new-sticker');
    const addNewListBtn = document.querySelector('#add-new-list');
    const tabs = [
        todayTodos,
        calendar
    ]
    const tabNodes = [
        upcomingDiv,
        todayDiv,
        calendarDiv
    ];

    tabNodes.forEach(node => node.onclick = populateSelectedWindow);

    function populateSelectedWindow() {
        const selectedTabNode = tabNodes.find(tabNode => {
            return tabNode.classList.contains("selected");
        })
        const todos = selectedTabNode.dataset.id === "upcoming" ?
        allTodos :
        tabs.find(tab => tab.id === selectedTabNode.dataset.id);
        
        console.log(todos);
    }

    function addNewTaskForm() {
        const newTaskDiv = document.createElement('div');
        newTaskDiv.id = "new-sticker-form";

        const h1 = document.createElement('h1');
        h1.textContent = "Create New Task";

        const formDiv = document.createElement('div');

        const titleDiv = document.createElement('div');
        const titleP = document.createElement('p');
        const titleInput = document.createElement('input');
        titleP.textContent = "Title:";
        titleInput.type = "text";
        titleDiv.appendChild(titleP);
        titleDiv.appendChild(titleInput);

        const descDiv = document.createElement('div');
        const descP = document.createElement('p');
        const descInput = document.createElement('input');
        descP.textContent = "Description:";
        descInput.type = "text";
        descDiv.appendChild(descP);
        descDiv.appendChild(descInput);

        const dateDiv = document.createElement('div');
        const dateP = document.createElement('p');
        const dateInput = document.createElement('input');
        const yearToday = new Date().getFullYear();
        const monthToday = new Date().getMonth() + 1 < 10 ? "0" + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
        const dateToday = new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate();
        dateP.textContent = "Deadline:";
        dateInput.type = "date";
        dateInput.min = `${yearToday}-${monthToday}-${dateToday}`;
        dateDiv.appendChild(dateP);
        dateDiv.appendChild(dateInput);

        const colorDiv = document.createElement('div');
        const colorP = document.createElement('p');
        const colorInput = document.createElement('input');
        colorP.textContent = "Color:";
        colorInput.type = "color";
        colorDiv.appendChild(colorP);
        colorDiv.appendChild(colorInput);

        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('buttons');
        const addBtn = document.createElement('button');
        const cancelBtn = document.createElement('button');
        addBtn.classList.add('add');
        addBtn.textContent = "Add";
        cancelBtn.classList.add('cancel');
        cancelBtn.textContent = "Cancel";
        buttonsDiv.appendChild(addBtn);
        buttonsDiv.appendChild(cancelBtn);

        formDiv.appendChild(titleDiv);
        formDiv.appendChild(descDiv);
        formDiv.appendChild(dateDiv);
        formDiv.appendChild(colorDiv);
        formDiv.appendChild(buttonsDiv);

        newTaskDiv.appendChild(h1);
        newTaskDiv.appendChild(formDiv);

        return newTaskDiv;
    }

    function createSicker(todo) {
        const todoDiv = createElement('div');
        const todoName = createElement('h2');
        const todoDescr = createElement('p');

        todoName.textContent = todo.name;
        todoDescr.textContent = todo.description;

        todoDiv.appendChild(todoName);
        todoDiv.appendChild(todoDescr);
    }

    // newStickerBtn.onclick = () => {
    //     const newTodo = new CreateTodo(prompt('Title:'), prompt('Descrition'), new Date(prompt('Enter Dead-line:')), 'red')
    //     allTodos.todoLibrary.push(newTodo);

    //     const todoDiv = document.createElement('div')
    //     const todoTitle = document.createElement('h2')
    //     const todoDescription = document.createElement('p')

    //     todoTitle.textContent = newTodo.name;
    //     todoDescription.textContent = newTodo.description;

    //     todoDiv.appendChild(todoTitle);
    //     todoDiv.appendChild(todoDescription);
    //     todoDiv.style.backgroundColor = newTodo.color;
    //     todoDiv.classList.add('sticker');
    //     stickers.appendChild(todoDiv);
    // }
}

// screenController()


// event listenerin e opsioneve ne menu lidhe me menun edhe meqenese
// ne siperfaqe jane opsionet duke perdor e.target === obj.name hap 
// opsionin e caktum
// Mos harro butonin completed edhe delete