const barChart = require('bar-charts');
const fs = require('fs');

let frenchAplhabet=('abcdefghijklmnopqrstuvwxéèàùêâôîûëïüÿç').toUpperCase().split('');
let bulgarianAlphabet = ('абвгдежзийклмнопрстуфхцчшщъьюя').toUpperCase().split('');


let bulgarianText = fs.readFileSync('bulgarianInput.txt');
bulgarianText = bulgarianText.toString().replace(/\s|\.|\,|\-|\’/gi, '').toUpperCase().split('').sort();

let frenchText = fs.readFileSync('frenchInput.txt');
frenchText = frenchText.toString().replace(/\s|\.|\,|\-|\’/gi, '').toUpperCase().split('').sort();


console.log('Bulgarian: ', Entropy(bulgarianAlphabet, bulgarianText));
console.log('French: ', Entropy(frenchAplhabet, frenchText));


let message = 'ЗИНОВИЧЕЛИЗАВЕТАИГОРЕВНА'.split('');
console.log('Количество информации в ФИО: ', Entropy(bulgarianAlphabet, bulgarianText) * message.length);


function Entropy (alphabet, text) {
    let lettersCountInText = alphabet.map(uv => text.filter(i => i === uv).length);
    let p = lettersCountInText.map(letter => +(letter/text.length).toFixed(3));

    DrawChart(alphabet, p);

    let entropy = - p.reduce(function(sum, current) {
        return current == 0 ? (sum + current) : (sum + current * Math.log2(current))}, 0
    );  
    return entropy;
}

function DrawChart(alphabet, lettersPercentInText) {
    var arr = [];
    alphabet.forEach((element, i) => {arr.push({ label: element, count: lettersPercentInText[i]})});
    console.log(barChart(arr));
}
