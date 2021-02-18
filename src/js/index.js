import 'normalize.css';
import '../styles/main.scss';
import { setTodosToLocalStorage } from './localStorage';
import todoComponent from './todoComponent';
import { showAlert, hideAlert } from './alertMessage';

const body = document.querySelector('body');
const form = document.querySelector('.todo__form');
const todosList = document.querySelector('.todo__list');
const input = document.getElementById('add');
const clearCompletedBtn = document.querySelector('.btn--clear');
const filterBtns = document.querySelectorAll('.filter-list li .btn');
const switcher = document.querySelector('.todo');

// *** Change theme ***
function changeTheme(e) {
	if (e.target.classList.contains('switcher')) {
		body.classList.toggle('dark-theme');
	}
}

// *** Items left ***
function itemsLeft() {
	const count = todosList.childElementCount;
	const qty = document.querySelector('.qty');

	count === 1
		? (qty.innerHTML = `${count} item`)
		: (qty.innerHTML = `${count} items`);
}

itemsLeft();

// *** Add todo ***
function addTodo(e) {
	e.preventDefault();

	if (input.value === '') {
		showAlert();
		setTimeout(hideAlert, 1000);
	} else {
		todosList.insertAdjacentHTML('beforeend', todoComponent(input.value));

		input.value = '';

		setTodosToLocalStorage(input.value);

		itemsLeft();
	}
}

// *** Delete todo ***
function deleteTodo(e) {
	if (e.target.classList.contains('delete')) {
		e.target.parentElement.remove();
	}
	itemsLeft();
}

// *** Completed todo **
function completedTodo(e) {
	if (e.target.id === 'checkbox') {
		e.target.parentElement.classList.toggle('completed');
	}
}

// *** Clear completed ***
function clearCompleted(e) {
	if (e.target.classList.contains('btn--clear')) {
		Array.from(todosList.children).forEach((todo) => {
			if (todo.firstElementChild.classList.contains('completed')) {
				todo.remove();
			}
		});
	}
}

// *** Filter todos ***
function filterTodos(e) {
	filterBtns.forEach((filterBtn) => {
		filterBtn.classList.remove('active');
	});
	e.target.classList.add('active');
}

// *** Events ***
switcher.addEventListener('click', changeTheme);
body.addEventListener('click', deleteTodo);
form.addEventListener('submit', addTodo);
todosList.addEventListener('click', completedTodo);
clearCompletedBtn.addEventListener('click', clearCompleted);
filterBtns.forEach((filterBtn) => {
	filterBtn.addEventListener('click', filterTodos);
});
