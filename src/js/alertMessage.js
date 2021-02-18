function showAlert() {
	document.querySelector('.alert-message').classList.remove('hide');
	document.querySelector('.alert-message').classList.add('show');
}

function hideAlert() {
	document.querySelector('.alert-message').classList.add('hide');
}

export { showAlert, hideAlert };
