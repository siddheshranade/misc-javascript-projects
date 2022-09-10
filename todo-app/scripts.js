const formElement = document.querySelector('form');
const inputTextElement = document.querySelector('#input-text');
const listParentElement = document.querySelector('#todo-list');

formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodoListElement();
});

let storedTodoItems = JSON.parse(localStorage.getItem('todo'));
if (storedTodoItems && storedTodoItems.length) {
    storedTodoItems.forEach(item => addTodoListElement(item));
}

function addTodoListElement(todoItem) {
    const listElement = document.createElement('li');
    listElement.innerHTML = todoItem && todoItem['name'] ? todoItem['name'] : inputTextElement.value;
    if (todoItem && todoItem['completed'] === 'yes') {
        listElement.classList.add('cancelled-task');
    }
    listParentElement.appendChild(listElement);
    inputTextElement.value = '';

    updateLocalStorage();

    listElement.addEventListener('click', () => {
        listElement.classList.toggle('cancelled-task');
        updateLocalStorage();
    });

    listElement.oncontextmenu = function() {
        listParentElement.removeChild(listElement);
        updateLocalStorage();
        return false; /* So the right click menu doesn't appear */
    }
}

function updateLocalStorage() {
    const listElements = document.querySelectorAll('li');
    let listItems = [];
    listElements.forEach(el => {
        console.log(el.classList);
        listItems.push({
            'name' : el.innerHTML,
            'completed' : el.classList.contains('cancelled-task') ? 'yes' : 'no'
        });
    });

    localStorage.setItem('todo', JSON.stringify(listItems));
}