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
    constructor(name, description, date, color, parentListId) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.color = color;
        this.parentListId = parentListId;
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
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.id = Math.floor(Math.random() * 10000);
    }
    getTodos(allTodos) {
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
    const menuDiv = document.querySelector('.menu-bar');
    const upcomingDiv = document.getElementById('upcoming');
    const todayDiv = document.getElementById('today');
    const calendarDiv = document.getElementById('calendar');
    const listsDiv = document.querySelector('.lists');
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

    tabNodes.forEach(node => node.onclick = toggleSelectClass);

    //---->Creatig example todos<----
    // Generate a date in the one of next 7 days
    const work = new TodoLists('Work Related', '#b90e0e');
    tabs.push(work);
    addNewListToDOM(work);

    const workoutPlan = new TodoLists('Workout Plan', '#008000');
    tabs.push(workoutPlan);
    addNewListToDOM(workoutPlan);

    const wellBeing = new TodoLists('Well Being', '#D2BF55');
    tabs.push(wellBeing);
    addNewListToDOM(wellBeing);

    const randomDate = () => new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + Math.floor(Math.random() * 7 + 1));
    const exampleTodos = [
        new CreateTodo("Healthy Eating Plan", `Plan balanced meals and snacks, focusing on whole foods, to fuel your body and promote overall well-being.
        Remember to adapt and adjust your to-do list as needed to ensure it remains challenging yet achievable.`, randomDate(), wellBeing.color+'90', wellBeing.id),
        new CreateTodo("Morning Jog", `Start the day with a 20-minute jog to boost cardiovascular health and increase energy levels.`, new Date(), workoutPlan.color+'90', workoutPlan.id),
        new CreateTodo("Yoga Sessions", `Dedicate two evenings a week to yoga practice to enhance flexibility and reduce muscle tension.`, randomDate(), workoutPlan.color+'90', workoutPlan.id),
        new CreateTodo("Strength Training", `Incorporate weightlifting three times a week to build muscle and improve overall strength.`, new Date(), workoutPlan.color+'90', workoutPlan.id),
        new CreateTodo('Social Media', `-Plan social content<br>-Build content calendar<br>-Plan promotion and distribution`, new Date(), work.color+'90', work.id),
        new CreateTodo("Networking Goals", `Attend at least one industry event per month to expand your professional network and create new opportunities.`, randomDate(), work.color+'90', work.id),
    ];

    exampleTodos.forEach(todo => allTodos.addTodo(todo));

    populateSelectedWindow(findSelectedTab());
    //<----   ----|

    //mos harro tbash updateCounters() function

    newStickerBtn.onclick = openNewTaskForm;
    addNewListBtn.onclick = openAddListForm;

    function closeForm() {
        document.querySelector('.form').remove();
    }

    function addNewTask() {
        const formInfo = getFormInfo();
        const selectedTab = findSelectedTab();
        if (!formInfo) return alert('Please fill out the fields!');

        const newTodo = new CreateTodo(...formInfo);
        allTodos.addTodo(newTodo);

        populateSelectedWindow(findSelectedTab());
        closeForm();
    }

    function addNewList() {
        const formInfo = getFormInfo();
        if (!formInfo) return alert('Please fill out the fields!');

        const newList = new TodoLists(...formInfo);
        tabs.push(newList);
        addNewListToDOM(newList);

        closeForm();
    }

    function getFormInfo() {
        const form = document.querySelector('.form');
        const inputValues = [...form.querySelectorAll('input')].map(input => input.value);
        for (let i = 0; i < inputValues.length; i++) {
            if (!inputValues[i]) return;
        }
        if (inputValues.length > 2) {
            inputValues[2] = new Date(inputValues[2]);
            inputValues[3] = inputValues[3] + '99';
        }
        if (Boolean(Number(form.dataset.id))) inputValues.push(Number(form.dataset.id));
        return inputValues;
    }

    function addNewListToDOM(newList) {
        const containerDiv = document.createElement('div');
        const squareDiv = document.createElement('div');
        const nameDiv = document.createElement('div');
        const counterDiv = document.createElement('div');

        squareDiv.classList.add('square');
        counterDiv.classList.add('counter'); // textContent i ksaj a = list.getTodos().length
        nameDiv.textContent = newList.name;
        counterDiv.textContent = newList.getTodos(allTodos).length;
        squareDiv.style.backgroundColor = newList.color;

        containerDiv.appendChild(squareDiv);
        containerDiv.appendChild(nameDiv);
        containerDiv.appendChild(counterDiv);
        containerDiv.dataset.id = newList.id;
        containerDiv.dataset.color = newList.color;
        containerDiv.onclick = toggleSelectClass;

        tabNodes.push(containerDiv);

        listsDiv.insertBefore(containerDiv, addNewListBtn);
    }

    function checkForOpenedForm() {
        return Boolean(document.querySelector('.form'));
    }

    function toggleSelectClass() {
        if (this.classList.contains("selected")) return;

        const prevSelectedTabNode = findSelectedTab();

        prevSelectedTabNode.classList.toggle("selected");

        this.classList.add('selected');
        populateSelectedWindow(this);
    }

    function findSelectedTab() {
        const selectedTabNode = tabNodes.find(tabNode => {
            return tabNode.classList.contains("selected");
        });
        return selectedTabNode;
    }

    function populateSelectedWindow(selectedTabNode) {
        const todos = selectedTabNode.dataset.id === "upcoming" ?
            allTodos.getTodos() :
            tabs.find(tab => tab.id == selectedTabNode.dataset.id).getTodos(allTodos);

        stickers.innerHTML = "";

        if(selectedTabNode.id !== 'calendar') selectedTabNode.querySelector('.counter').textContent = todos.length;
        todos.forEach(todo => stickers.appendChild(createSicker(todo)));
        stickers.appendChild(newStickerBtn);
    }

    function openAddListForm() {
        if (checkForOpenedForm()) return;
        const formDiv = document.createElement('div');
        formDiv.classList.add('form');

        const h1 = document.createElement('h1');
        h1.textContent = "Create New Todo List";

        const containerDiv = document.createElement('div');

        const nameDiv = document.createElement('div');
        const nameP = document.createElement('p');
        const nameInput = document.createElement('input')
        nameP.textContent = "Name:";
        nameInput.type = "text";
        nameDiv.appendChild(nameP);
        nameDiv.appendChild(nameInput);

        const colorDiv = document.createElement('div');
        const colorP = document.createElement('p');
        const colorInput = document.createElement('input')
        colorP.textContent = "Color:";
        colorInput.type = "color";
        colorDiv.appendChild(colorP);
        colorDiv.appendChild(colorInput);

        const buttonsDiv = document.createElement('div');
        const addBtn = document.createElement('button');
        const cancelBtn = document.createElement('button');
        buttonsDiv.classList.add('buttons');
        addBtn.classList.add('add');
        addBtn.textContent = "Add";
        addBtn.onclick = addNewList;
        cancelBtn.classList.add('cancel');
        cancelBtn.textContent = "Cancel";
        cancelBtn.onclick = closeForm;
        buttonsDiv.appendChild(addBtn);
        buttonsDiv.appendChild(cancelBtn);

        containerDiv.appendChild(nameDiv);
        containerDiv.appendChild(colorDiv);
        containerDiv.appendChild(buttonsDiv);

        formDiv.appendChild(h1);
        formDiv.appendChild(containerDiv);

        document.body.appendChild(formDiv);
    }


    function openNewTaskForm() {
        if (checkForOpenedForm()) return;
        const selectedTab = findSelectedTab();
        const newTaskDiv = document.createElement('div');
        newTaskDiv.classList.add("form");

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
        //in case today tab is selected
        if (selectedTab.dataset.id == 'today') {
            dateInput.disabled = true;
            dateInput.value = `${yearToday}-${monthToday}-${dateToday}`;
            dateDiv.style.opacity = '0.5';
        }

        const colorDiv = document.createElement('div');
        const colorP = document.createElement('p');
        const colorInput = document.createElement('input');
        colorP.textContent = "Color:";
        colorInput.type = "color";
        colorDiv.appendChild(colorP);
        colorDiv.appendChild(colorInput);
        if (selectedTab.dataset.color) {
            colorInput.disabled = true;
            colorInput.value = selectedTab.dataset.color;
            colorDiv.style.opacity = '0.5';
        };

        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('buttons');
        const addBtn = document.createElement('button');
        const cancelBtn = document.createElement('button');
        addBtn.classList.add('add');
        addBtn.textContent = "Add";
        addBtn.onclick = addNewTask;
        cancelBtn.classList.add('cancel');
        cancelBtn.textContent = "Cancel";
        cancelBtn.onclick = closeForm;
        buttonsDiv.appendChild(addBtn);
        buttonsDiv.appendChild(cancelBtn);

        formDiv.appendChild(titleDiv);
        formDiv.appendChild(descDiv);
        formDiv.appendChild(dateDiv);
        formDiv.appendChild(colorDiv);
        formDiv.appendChild(buttonsDiv);

        newTaskDiv.dataset.id = selectedTab.dataset.id;
        newTaskDiv.appendChild(h1);
        newTaskDiv.appendChild(formDiv);

        document.body.appendChild(newTaskDiv);
    }

    function createSicker(todo) {
        if (!todo) return;
        const todoDiv = document.createElement('div');
        const todoName = document.createElement('h2');
        const todoDescr = document.createElement('p');

        todoDiv.classList.add('sticker');
        todoDiv.style.backgroundColor = todo.color;
        todoName.textContent = todo.name;
        todoDescr.innerHTML = todo.description;

        todoDiv.appendChild(todoName);
        todoDiv.appendChild(todoDescr);

        return todoDiv;
    }
}
// Mos harro butonin completed edhe delete