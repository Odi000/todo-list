/*-- App Logic --*/

//All created to-do's go here
class AllTodos {
    constructor() {
        this.todoLibrary = [];
    }
    addTodo(todo) {
        this.todoLibrary.push(todo);
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



class Tasks {
    constructor(upcoming, today, calendar) {
        this.upcoming = upcoming;
        this.today = today;
        this.calendar = calendar;
    }
}

//to create Today Todos object I used function syntax 
function TodayTodos() {
    const name = "Today";
    const today = new Date();

    const getTodos = () => {
        return allTodos.todoLibrary.filter(todo => {
            if (
                todo.date.getFullYear() === today.getFullYear() &&
                todo.date.getMonth() === today.getMonth() &&
                todo.date.getDate() === today.getDate()
            ) return true;
        });
    }

    return {
        name, getTodos
    }
}

class Calendar {
    constructor() {
        this.name = "Calendar";
    }
    getTodos(selectedDate) {
        const date = new Date(selectedDate);
        return allTodos.todoLibrary.filter(todo => {
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
    get todos() {
        const todos = allTodos.todoLibrary.filter(todo => todo.parentListId == this.id);
        return todos;
    }
}


//*--- Application User Interface ---*/

function screenController() {
    const allTodos = new AllTodos();
    const todayTodos = TodayTodos();
    const calendar = new Calendar();
    const upcoming = document.getElementById('upcoming');
    const today = document.getElementById('today');
    const calendarDiv = document.getElementById('calendar');
    const stickers = document.querySelector('.stickers');
    const newStickerBtn = document.querySelector('.new-sticker');
    const addNewListBtn = document.querySelector('#add-new-list');

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
        dateP.textContent = "Deadline:";
        dateInput.type = "date";
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
    return addNewTaskForm();
}

// screenController()


// event listenerin e opsioneve ne menu lidhe me menun edhe meqenese
// ne siperfaqe jane opsionet duke perdor e.target === obj.name hap 
// opsionin e caktum
// Mos harro butonin completed edhe delete