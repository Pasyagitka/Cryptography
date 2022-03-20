const fs = require('fs');


let alphabet = '01'.split('');

let bulgarianText = fs.readFileSync('bulgarianInput.txt');
bulgarianText = bulgarianText.toString().toUpperCase().replace(/\s|\.|\,|\-|\’/gi, '').split('');
let binaryBulgarianText = toBinaryString(Buffer.from(bulgarianText.join('')));

let frenchText = fs.readFileSync('frenchInput.txt');
frenchText = frenchText.toString().toUpperCase().replace(/\s|\.|\,|\-|\’/gi, '').split('');
let binaryFrenchText = toBinaryString(Buffer.from(frenchText.join('')));


console.log('Binary bulgarian: ', Entropy(alphabet, binaryBulgarianText.split('')));
console.log('Binary french: ', Entropy(alphabet, binaryFrenchText.split('')));


let message = 'ЗИНОВИЧЕЛИЗАВЕТАИГОРЕВНА'.split('');
let binaryMessage = toBinaryString(Buffer.from(message.join('')));
console.log('Количество информации в ФИО: ', Entropy(alphabet, binaryMessage.split('')) * binaryMessage.length);


console.log('Количество информации (p=0.1): ', EffectiveEntropy(0.1) * binaryMessage.length);
console.log('Количество информации (p=0.5): ', EffectiveEntropy(0.5) * binaryMessage.length);
console.log('Количество информации (p=1): ', EffectiveEntropy(1) * binaryMessage.length);



function Entropy (alphabet, text) {
    let lettersCountInText = alphabet.map(uv => text.filter(i => i === uv).length);
    let p = lettersCountInText.map(letter => letter/text.length);
    console.log(p);
    return -p[0] * Math.log2(p[0]) - p[1] * Math.log2(p[1]);
}

function EffectiveEntropy(p) {
    let q = 1 - p;
    //1 - условная
    return 1 -  (-p * (p != 0 ? Math.log2(p) : 1) - q *  (q!=0 ? Math.log2(q) : 1));
}


function toBinaryString (buf) {
    let result = []
    for (let b of buf) {
      result.push(b.toString(2).padStart(8, '0'))
    }
    return result.join('')
}