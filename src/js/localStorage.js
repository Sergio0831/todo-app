function setTodosToLocalStorage(todo) {
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}

	if (!(todos instanceof Array)) {
		todos = [todos];
	}

	todos.push(todo);

	localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodosFromLocalStorage() {
	const todos = localStorage.getItem('todos')
		? JSON.parse(localStorage.getItem('todos'))
		: [];
	return todos;
}

function removeTodoFromLocalStorage() {
	localStorage.removeItem('todos');
}

function clearLocalStorage() {
	localStorage.clear();
}

export {
	setTodosToLocalStorage,
	getTodosFromLocalStorage,
	removeTodoFromLocalStorage,
	clearLocalStorage,
};
