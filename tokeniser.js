// Thanks to vinayakakv https://github.com/vinayakakv/akshara_tokenizer
// Sanketi modifications by Pruthvi Shrikaanth https://github.com/Blue0Tech
// Used in Vaarchol project, a Sanketi version of Wordle https://github.com/Blue0Tech/sanketi-wordle
let swara = '[\u0c85-\u0c94\u0ce0\u0ce1]';
let vyanjana = '[\u0c95-\u0cb9\u0cde]';
let halant = '\u0ccd';
let vowel_signs = '[\u0cbe-\u0ccc\u0ce2\u0ce3]'; // added vowel modifications
let anudaatta = '\u0952'; // extra character
let ardhaanuswara = '\u0c80'; // adding half circle that functions like anuswara
let anuswara = '\u0c82';
let visarga = '\u0c83';
let expression = new RegExp(`(?:(${swara})|((?:${vyanjana}${halant})*)(${vyanjana})(?:(${vowel_signs})|(${halant}))?)(${anuswara}|${visarga}|${ardhaanuswara}|${anudaatta})?`, 'g');

export const swaraExp = new RegExp(`(${swara})`)
export const vyanjanaExp = new RegExp(`(${vyanjana})`)
export const vowel_signsExp = new RegExp(`(${vowel_signs})`)
export const halantExp = new RegExp(`(${halant})`)
export const anuswara_visargeExp = new RegExp(`(${anuswara}|${visarga}||${ardhaanuswara}||${anudaatta})`)

export const snkTokenize = (mystring) => {
    const tokens = [...mystring.matchAll(expression)];
    return tokens;
};
