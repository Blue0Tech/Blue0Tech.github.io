import { characters, vowelToVowelMap } from './constants.js';
import { snkTokenize } from './tokeniser.js';
const swara = document.getElementById('swara');
const vyanjana = document.getElementById('vyanjana');
const symbol = document.getElementById('symbol');
let keys = [];
let textarea = document.getElementById('textBox');
const body = document.getElementsByTagName('body')[0];
textarea.readOnly = true;
textarea.value = localStorage.getItem('text')??'';
let recentCursorPosition = localStorage.getItem('cursorPosition')??(textarea.value.length-1);
if(textarea.value[recentCursorPosition]!='^') {
	textarea.value = textarea.value.substring(0,recentCursorPosition) + '^' + textarea.value.substring(recentCursorPosition);
};
textarea.selectionStart = textarea.selectionEnd = recentCursorPosition;
body.addEventListener('mousedown',(e)=>{
	if(e.target.type!='textarea') {
		e.preventDefault();
	};
});
textarea.addEventListener('click',function() {
	if(textarea.value[recentCursorPosition]=='^') {
		let start = textarea.selectionStart;
		let end = textarea.selectionEnd;
		if(end>recentCursorPosition) {
			end -= 1;
		};
		if(start>recentCursorPosition) {
			start -= 1;
		};
		textarea.value = textarea.value.substring(0,recentCursorPosition) + textarea.value.substring(parseInt(recentCursorPosition,10)+1);
		textarea.selectionStart = start;
		textarea.selectionEnd = end;
	};
	textarea.readOnly = false;
});
textarea.addEventListener('input',function() {
	let textToSave = textarea.value;
	if(textToSave[recentCursorPosition]=='^') {
		textToSave = textToSave.substring(0,recentCursorPosition) + textToSave.substring(parseInt(recentCursorPosition,10)+1);
	};
	localStorage.setItem('text',textarea.value);
	localStorage.setItem('cursorPosition',recentCursorPosition);
});
for(let row = 0; row < 5; row++) {
	keys.push([]);
	for(let col = 0; col < 15; col++) {
		const key = document.createElement('button');
		key.classList.add('key');
		key.classList.add(`row${row}`);
		key.classList.add(`col${col}`);
		key.setAttribute('id',`${row}-${col}`);
		key.textContent = characters[row][col];
		if(row == 0 && col == 13) {
			key.addEventListener('mousedown',(e)=>{
				switchCharacters();
				e.preventDefault();
			});
		} else if(row == 1 || col < 14) {
			key.addEventListener('mousedown',(e)=>{
				insertCharacter(key.textContent);
				e.preventDefault();
			});
		} else if(row == 0) {
			key.addEventListener('mousedown',(e)=>{
				let start = textarea.selectionStart;
				let end = textarea.selectionEnd;
				if(end > start || start == 0) {
					if(textarea.value[end]=='^') {
						textarea.value = textarea.value.substring(0,start) + textarea.value.substring(end);
					} else {
						textarea.value = textarea.value.substring(0,start) + '^' + textarea.value.substring(end);
					};
					textarea.selectionStart = start;
					textarea.selectionEnd = start;
					recentCursorPosition = start;
				} else { // if start > 0
					if(textarea.value[end]=='^') {
						textarea.value = textarea.value.substring(0,start - 1) + textarea.value.substring(end);
					} else {
						textarea.value = textarea.value.substring(0,start - 1) + '^' + textarea.value.substring(end);
					};
					textarea.selectionStart = start - 1;
					textarea.selectionEnd = start - 1;
					recentCursorPosition = start - 1;
				};
				textarea.readOnly = true;
				localStorage.setItem('text',textarea.value);
				localStorage.setItem('cursorPosition',recentCursorPosition);
				e.preventDefault();
			});
		} else if(row == 2) {
			key.addEventListener('mousedown',(e)=>{
				updateText('\n');
				localStorage.setItem('text',textarea.value);
				localStorage.setItem('cursorPosition',recentCursorPosition);
				e.preventDefault();
			});
		} else if(row == 3) {
			key.addEventListener('mousedown',(e)=>{
				updateText(' ');
				localStorage.setItem('text',textarea.value);
				localStorage.setItem('cursorPosition',recentCursorPosition);
				e.preventDefault();
			});
		} else if(row == 4) {
			key.addEventListener('mousedown',(e)=>{
				e.preventDefault();
				if(textarea.value[recentCursorPosition]=='^') {
					textarea.value = textarea.value.substring(0,recentCursorPosition) + textarea.value.substring(parseInt(recentCursorPosition,10)+1);
				};
				navigator.clipboard.writeText(textarea.value).then(()=>{
					alert("Copied text to clipboard successfully!");
				}).catch(()=>{
					alert("There was a problem copying to the clipboard.");
				});
				textarea.value = textarea.value.substring(0,recentCursorPosition) + '^' + textarea.value.substring(recentCursorPosition);
			});
		};
		if(col < 4) {
			swara.appendChild(key);
		} else if(col > 10) {
			symbol.appendChild(key);
		} else {
			vyanjana.appendChild(key);
		};
		keys[row].push(key);
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
	localStorage.setItem('cursorPosition',recentCursorPosition);
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
	if (textarea.value[start]=='^') {
		textarea.value = textarea.value.substring(0,start) + text + '^' + textarea.value.substring(textarea.selectionEnd + 1);
	} else {
		textarea.value = textarea.value.substring(0,start) + text + '^' + textarea.value.substring(textarea.selectionEnd);
	};
	textarea.selectionStart = start + 1;
	textarea.selectionEnd = start + 1;
	recentCursorPosition = start + 1;
	textarea.readOnly = true;
};
function switchCharacters() {
	if(keys[0][11].textContent=='1') {
		useSecondLayout();
	} else {
		useFirstLayout();
	};
};
function useFirstLayout() {
	keys[0][11].textContent = '1';
	keys[1][11].textContent = '2';
	keys[2][11].textContent = '3';
	keys[3][11].textContent = '4';
	keys[4][11].textContent = '5';
	keys[0][12].textContent = '6';
	keys[1][12].textContent = '7';
	keys[2][12].textContent = '8';
	keys[3][12].textContent = '9';
	keys[4][12].textContent = '0';
	keys[1][13].textContent = '?';
	keys[2][13].textContent = '!';
	keys[3][13].textContent = ',';
	keys[4][13].textContent = '.'; // character arrangement made by Pruthvi Shrikaanth https://github.com/Blue0Tech
};
function useSecondLayout() {
	keys[0][11].textContent = '೧';
	keys[1][11].textContent = '೨';
	keys[2][11].textContent = '೩';
	keys[3][11].textContent = '೪';
	keys[4][11].textContent = '೫';
	keys[0][12].textContent = '೬';
	keys[1][12].textContent = '೭';
	keys[2][12].textContent = '೮';
	keys[3][12].textContent = '೯';
	keys[4][12].textContent = '೦';
	keys[1][13].textContent = '"';
	keys[2][13].textContent = "'";
	keys[3][13].textContent = '-';
	keys[4][13].textContent = ':'; // character arrangement made by Pruthvi Shrikaanth https://github.com/Blue0Tech
};
