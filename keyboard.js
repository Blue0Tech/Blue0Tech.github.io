import { characters, vowelToVowelMap } from './constants.js';
import { snkTokenize } from './tokeniser.js';
const keyboard = document.getElementById('keyboard');
let textarea = document.getElementById('textBox');
textarea.value = localStorage.getItem('text')??'';
textarea.addEventListener('input',function() {
	localStorage.setItem('text',textarea.value);
});
for(let row = 0; row < 5; row++) {
	for(let col = 0; col < 12; col++) {
		const key = document.createElement('button');
		key.classList.add('key');
		key.textContent = characters[row][col];
		if(row == 1 || col < 11) {
			key.addEventListener('mousedown',(e)=>{
				insertCharacter(key.textContent);
				e.preventDefault();
			});
		} else if(row == 0) {
			key.addEventListener('mousedown',(e)=>{
				let start = textarea.selectionStart;
				let end = textarea.selectionEnd;
				if(end > start) {
					textarea.value = textarea.value.substring(0,start) + textarea.value.substring(end);
					textarea.selectionStart = start;
					textarea.selectionEnd = start;
				} else if(start > 0) {
					textarea.value = textarea.value.substring(0,start - 1) + textarea.value.substring(end);
					textarea.selectionStart = start - 1;
					textarea.selectionEnd = start - 1;
				};
				localStorage.setItem('text',textarea.value);
				e.preventDefault();
			});
		} else if(row == 2) {
			key.addEventListener('mousedown',(e)=>{
				updateText('\n');
				localStorage.setItem('text',textarea.value);
				e.preventDefault();
			});
		} else if(row == 3) {
			key.addEventListener('mousedown',(e)=>{
				updateText(' ');
				localStorage.setItem('text',textarea.value);
				e.preventDefault();
			});
		} else if(row == 4) {
			key.addEventListener('mousedown',(e)=>{
				e.preventDefault();
				navigator.clipboard.writeText(textarea.value).then(()=>{
					alert("Copied text to clipboard successfully!");
				}).catch(()=>{
					alert("There was a problem copying to the clipboard.");
				});
			});
		};
		keyboard.appendChild(key);
	};
};
function insertCharacter(key) {
	let tokens = tokeniseLastWord(textarea.value);
	if(tokens == '' || !(vowelToVowelMap.has(key))) {
		updateText(key);
	} else {
		updateText(vowelToVowelMap.get(key));
	};
	localStorage.setItem('text',textarea.value);
};
function tokeniseLastWord(text) {
	let finalWord = text.split(' ').slice(-1)[0];
	if(finalWord.length > 0) {
		return snkTokenize(finalWord);
	} else {
		return '';
	};
};
function updateText(text) {
	let start = textarea.selectionStart;
	textarea.value = textarea.value.substring(0,start) + text + textarea.value.substring(textarea.selectionEnd);
	textarea.selectionStart = start + 1;
	textarea.selectionEnd = start + 1;
};
