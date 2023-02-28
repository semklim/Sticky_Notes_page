'use strict'

let storage = [];
const textarea = document.querySelector('#comment_text');
const addNote = document.querySelector('.addNote');
const main = document.querySelector('main');
const clearLS = document.querySelector('.clearStore');

// past note by onload page
function init(){
	if (Object.hasOwnProperty.call(localStorage, 'storage')) {
		storage = JSON.parse(localStorage.storage) || [];
		storage.forEach(el => {
			main.innerHTML += el;
		});
	}
}
init();
// Resizing Textarea
  textarea.addEventListener("input", OnInput);
  OnInput.elheight = textarea.offsetHeight;

function OnInput() {
  this.style.height = '30px';
  if(this.scrollHeight >= OnInput.elheight){
		this.style.height = (this.scrollHeight) + "px";
  }
}

function createBoxNote(text) {
	const txt = document.createTextNode(text);
	const div = document.createElement('div');
	const closeBnt = document.createElement('div');
	const dateP = document.createElement('p');
	
	closeBnt.classList.add('closeBtn');
	closeBnt.textContent = 'X';

	dateP.style.marginTop = '5px';
	dateP.style.textAlign = 'right';
	dateP.style.fontSize = '11px'
	dateP.textContent = (new Date()).toLocaleString();
	dateP.textContent = dateP.textContent.slice(0, dateP.textContent.length - 3);
	
	div.style.height = (textarea.clientHeight + 18) + 'px'; 
	div.classList.add('stickyNote');
	div.append(closeBnt, txt, dateP);
	return div;
}

function addingNoteInHtml() {
	const el = createBoxNote(textarea.value);

	storage.push(el.outerHTML);
	localStorage.setItem('storage', JSON.stringify(storage));

	main.append(el);

	textarea.value = '';
	textarea.style.height = '40px';
}

// event adding note in main section by clicking on button or by pressing Enter
addNote.addEventListener('click', addingNoteInHtml);
window.addEventListener('keydown', function keyEnter(e) {
	if (e.code === 'Enter' && e.shiftKey !== true) {
		e.preventDefault();
		addingNoteInHtml();
	}
});
// del notes from html ande storage
main.addEventListener('click', (e) => {
	if(e.target.className === 'closeBtn') {
		const mainEl = Array.from(main.children);
		const indxElm = mainEl.indexOf(e.target.parentElement);
		storage = storage.filter((e, i) => i !== indxElm);
		localStorage.setItem('storage', JSON.stringify(storage))
		e.target.parentElement.remove();
	}
});

//clear localStorage
clearLS.addEventListener('click', function clearLocalStorage(){
	main.innerHTML = '';
	localStorage.clear();
});

