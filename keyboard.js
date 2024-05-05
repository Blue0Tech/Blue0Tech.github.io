import { characters, vowelToVowelMap } from './constants.js';
import { snkTokenize } from './tokeniser.js';
const keyboard = document.getElementById('keyboard');
let textarea = document.getElementById('textBox');
for(let row = 0; row < 5; row++) {
	for(let col = 0; col < 12; col++) {
		const key = document.createElement('button');
		key.classList.add('key');
		key.textContent = characters[row][col];
		if(row == 1 || col < 11) {
			key.addEventListener('click',()=>{insertCharacter(key.textContent);});
		} else if(row == 0) {
			key.addEventListener('click',()=>{textarea.value = textarea.value.slice(0,-1)});
		} else if(row == 2) {
			key.addEventListener('click',()=>{textarea.value += '\n';});
		} else if(row == 3) {
			key.addEventListener('click',()=>{textarea.value += ' ';});
		} else if(row == 4) {
			key.addEventListener('click',()=>{
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
		textarea.value += key;
	} else {
		textarea.value += vowelToVowelMap.get(key);
	};
};
function tokeniseLastWord(text) {
	let finalWord = text.split(' ').slice(-1)[0];
	if(finalWord.length > 0) {
		return snkTokenize(finalWord);
	} else {
		return '';
	};
};