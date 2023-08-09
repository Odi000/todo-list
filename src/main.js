//All created to-do's go here
class AllTodos {
    constructor() {
        this.todoLibrary = [];
    }
    addTodo(todo) {
        this.todoLibrary.push(todo);
    }
}

const allTodos = new AllTodos();

class CreateTodo {
    constructor(name, description, date, color, parentListId) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.color = color;
        this.parentListId = parentListId;
    }
}


class TodoLists {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.id = Math.floor(Math.random()*10000);
    }
    get todos() {
        const todos = allTodos.todoLibrary.filter(todo => todo.parentListId == this.id);
        return todos;
    }
}

class Tasks {
    constructor(upcoming, today, calendar) {
        this.upcoming = upcoming;
        this.today = today;
        this.calendar = calendar;
    }
}

function TodayTodos() {
    const name = "Today";
    const today = new Date();
    const todos = [];

    const getTodos = () => {
        return todoLibrary.filter(todo => {
            if (
                todo.date.getYear() === today.getYear() &&
                todo.date.getMonth() === today.getMonth() &&
                todo.date.getDate() === today.getMonth()
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
        this.todos = [];
    }
    parseTodos(selectedDate) {
        const date = new Date(selectedDate);
        this.todos = todoLibrary.filter(todo => {
            if (
                todo.date.getYear() === date.getYear() &&
                todo.date.getMonth() === date.getMonth() &&
                todo.date.getDate() === date.getMonth()
            ) return true;
        });
    }
}




// array ose objekt me universal todos dmth me tetana
// edhe per tkriju listat e vecanta thjest futu nje class te perbashket si i lidh me listen kurse me datat filtro datat
