class CreateTodo {
    constructor(name, description, date, color, parentList) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.color = color;
        this.parentList = parentList;
    }
}

class TodoLists {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.todos = [];
    };
    addTodo(todo) {
        this.todos.push(todo);
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
    parseTodos(date) {
        this.todos = todoLibrary.filter(todo => {
            if (
                todo.date.getYear() === today.getYear() &&
                todo.date.getMonth() === today.getMonth() &&
                todo.date.getDate() === today.getMonth()
            ) return true;
        });
    }
}

const todoLibrary = [];

// array ose objekt me universal todos dmth me tetana
// edhe per tkriju listat e vecanta thjest futu nje class te perbashket si i lidh me listen kurse me datat filtro datat
