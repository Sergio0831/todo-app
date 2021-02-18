export function setTodosToLocalStorage(todos) {
	localStorage.setItem('cartItems', JSON.stringify(todos));
}

export function getTodosFromLocalStorage() {
	const todos = localStorage.getItem('todos')
		? JSON.parse(localStorage.getItem('todos'))
		: [];
	return todos;
}

export function removeTodoFromLocalStorage() {
	localStorage.removeItem('todos');
}

export function clearLocalStorage() {
	localStorage.clear();
}
