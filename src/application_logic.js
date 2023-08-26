/*-- App Logic --*/

//All created to-do's go here
class AllTodos {
    constructor() {
        const todoLibrary = [];

        this.addTodo = (todo) => {
            todoLibrary.push(todo);
        }

        this.getTodos = () => todoLibrary;
    }
}

class CreateTodo {
    constructor(name, description, date, color, parentListId, uniqueID) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.color = color;
        this.parentListId = parentListId;
        this.UID = uniqueID ? uniqueID : Math.floor(Math.random() * 1000000);
    }
}

function TodayTodos() {
    const id = "today";
    const today = new Date();

    const getTodos = (allTodos) => {
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
    getTodos(allTodos, selectedDate) {
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
    constructor(name, color, id) {
        this.name = name;
        this.color = color;
        this.id = id ? id : Math.floor(Math.random() * 10000);
    }
    getTodos(allTodos) {
        const todos = allTodos.getTodos().filter(todo => todo.parentListId == this.id);
        return todos;
    }
}

export {
    AllTodos,
    CreateTodo,
    TodayTodos,
    Calendar,
    TodoLists
}