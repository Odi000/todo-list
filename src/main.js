class CreateSticker {
    constructor(name,description,time) {
        this.name = name;
        this.description = description;
        this.time = time;
    }
}

class TodoLists {
    constructor(name) {
        this.name = name;
        this.todos = [];
    };
    addTodo(todo) {
        this.todos.push(todo);
    }
}