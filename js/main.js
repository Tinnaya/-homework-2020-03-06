document.querySelector('body').addEventListener('click',  cickHandler);
function  cickHandler(event) {
	if(!event.target.hasAttribute('editable')) return;

	event.preventDefault();

	const {target:targetElement} = event;

	const type = targetElement.getAttribute('editable');
	console.log('type', type);
	const inputElement = document.createElement('input');
	inputElement.setAttribute('type', type);
	const buttonPrimary = document.createElement('button');
	const spanPrimary = document.createElement('span');
	const buttonDanger = document.createElement('button');
	const spanDanger = document.createElement('span');


	buttonPrimary.classList.add('btn', 'btn-primary');
	spanPrimary.classList.add('glyphicon', 'glyphicon-ok');

	buttonDanger.classList.add('btn', 'btn-danger');
	spanDanger.classList.add('glyphicon', 'glyphicon-remove');

	targetElement.parentNode.appendChild(inputElement).after(buttonDanger);
	inputElement.after(buttonPrimary);
	buttonPrimary.appendChild(spanPrimary);
	buttonDanger.appendChild(spanDanger);
	inputElement.value = targetElement.innerText;

	// targetElement.parentNode.removeChild(targetElement);
	targetElement.remove();
	// inputElement.focus();
	inputElement.select();

	inputElement.addEventListener('keyup', function(event) {
		switch (event.which) {
			case 13: //save
				inputElement.parentNode.appendChild(targetElement);
				targetElement.innerText = this.value;
				// targetElement.innerText = inputElement.value; или так
				inputElement.remove();
				break;
			case 27://cancel
				inputElement.parentNode.appendChild(targetElement);
				inputElement.remove();
				break;
			default:
				break;
		}
	});
	buttonPrimary.addEventListener('click', function() {
		inputElement.parentNode.appendChild(targetElement);
		targetElement.innerText = inputElement.value;
		// targetElement.innerText = inputElement.value; или так
		inputElement.remove();
		this.remove();
		buttonDanger.remove();
	});
	buttonDanger.addEventListener('click', function() {
		inputElement.parentNode.appendChild(targetElement);
		inputElement.remove();
		this.remove()
		buttonPrimary.remove();
	});

}