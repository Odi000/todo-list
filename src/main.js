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

//tests
const allTodos = new AllTodos();

const first = new CreateTodo('sot', 'todoja duhet ba sot', new Date())
const second = new CreateTodo('neser', 'todoja duhet ba neser', new Date('2023-08-11'))

allTodos.todoLibrary.push(first);
allTodos.todoLibrary.push(second);

const neser = new Calendar()

neser.getTodos('2023-08-11')

//*--- Application User Interface ---*/


// event listenerin e opsioneve ne menu lidhe me menun edhe meqenese
// ne siperfaqe jane opsionet duke perdor e.target === obj.name hap 
// opsionin e caktum