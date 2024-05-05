export const characters = [ // made by Pruthvi Shrikaanth https://github.com/Blue0Tech
	['ಅ','ಊ','ಐ','ೡ','ಕ','ಚ','ಟ','ತ','ಪ','ಯ','ಷ','⌫'],
	['ಆ','ಋ','ಒ','ಂ','ಖ','ಛ','ಠ','ಥ','ಫ','ರ','ಸ','್'],
	['ಇ','ೠ','ಓ','ಃ','ಗ','ಜ','ಡ','ದ','ಬ','ಲ','ಹ','↵'],
	['ಈ','ಎ','ಔ','॒','ಘ','ಝ','ಢ','ಧ','ಭ','ವ','ಳ','⎵'],
	['ಉ','ಏ','ಌ','ಀ','ಙ','ಞ','ಣ','ನ','ಮ','ಶ','ಽ','⎘']
];

export const vowelToVowelMap = new Map(); // kindly provided by Amogha Udupa https://github.com/amoghaUdupa
vowelToVowelMap.set('ಅ',''); // and modified for Sanketi by Pruthvi Shrikaanth https://github.com/Blue0Tech
vowelToVowelMap.set('ಆ','ಾ');
vowelToVowelMap.set('ಇ','ಿ');
vowelToVowelMap.set('ಈ','ೀ');
vowelToVowelMap.set('ಉ','ು');
vowelToVowelMap.set('ಊ','ೂ');
vowelToVowelMap.set('ಋ','ೃ');
vowelToVowelMap.set('ಎ','ೆ');
vowelToVowelMap.set('ಏ','ೇ');
vowelToVowelMap.set('ಐ','ೈ');
vowelToVowelMap.set('ಒ','ೊ');
vowelToVowelMap.set('ಓ','ೋ');
vowelToVowelMap.set('ಔ','ೌ');
vowelToVowelMap.set('ಌ','ೢ');
vowelToVowelMap.set('ೡ','ೣ');