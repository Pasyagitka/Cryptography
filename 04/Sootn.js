const fs = require('fs');
const barChart = require('bar-charts');

let alphabetString = 'abcdefghijklmnopqrsßtuvwxyzäöü';
let alphabet = 'abcdefghijklmnopqrsßtuvwxyzäöü'.split('');
let keyword = 'enigma';

let k = 7;
let message = fs.readFileSync('message1.txt').toString().toLowerCase();

let enc1 = encrypt(message, alphabet, k);
fs.writeFileSync("message1enc.txt", enc1, {encoding: "utf8"} );
fs.writeFileSync("message1decr.txt", decrypt(enc1, alphabet, k), {encoding: "utf8"} );


let table = getTableTrithemius(alphabetString, 6, keyword);
let enc2 = trithemius(table, message, 'ecrypt');
fs.writeFileSync("message2enc.txt", enc2, {encoding: "utf8"} );
fs.writeFileSync("message2decr.txt", trithemius(table, enc2, 'decrypt'), {encoding: "utf8"} );

console.log('Message');
stat(alphabet, message);
console.log('y ≡ x + k % N');
stat(alphabet, enc1);
console.log('Trithemius');
stat(alphabet, enc2);

//y ≡ x + k % N; 
function encrypt(message, alphabet, k) {
    let timeStart = Date.now();
    let kmodN = k % alphabet.length;
    let newMessage ='';
    for(let i = 0; i < message.length; i++) {
        let index = alphabet.indexOf(message[i]);
        if (index == -1) {
            newMessage += message[i];
        }
        else if (index + kmodN >= alphabet.length) {
            newMessage += alphabet[index - alphabet.length + kmodN];
        }
        else {
            newMessage += alphabet[index + kmodN]; 
        }
    }
    console.log(`Encryption time: ${Date.now() - timeStart}ms`);
    return newMessage;
}

//х ≡ у – k % N; 
function decrypt(message, alphabet, k) {
    let timeStart = Date.now();
    let kmodN = k % alphabet.length;
    let newMessage ='';
    for(let i = 0; i < message.length; i++) {
        let index = alphabet.indexOf(message[i]);
        if (index == -1) {
            newMessage += message[i];
        }
        else if (index - kmodN < 0) {
            newMessage += alphabet[alphabet.length + (index - kmodN)];
        }
        else {
            newMessage += alphabet[index - kmodN]; 
        }
    }
    console.log(`Decryption time: ${Date.now() - timeStart}ms`);
    return newMessage;
}

function getTableTrithemius(alphabet, columns, keyword) {
    let text = removeRepeated(keyword.concat(alphabet));
    let rowcount = Math.ceil(text.length / columns);
    let index = (column, rows) => columns*rows + column;
    let table = Array(rowcount * columns).fill('');
    console.log(`${columns}x${rowcount}`);
    for(let i = 0, currcol = 0, currrow = 0; i < text.length; i++) {
        if (currcol >= columns) {
            currrow++;
            currcol = 0;
        }
        table[index(currcol, currrow)] = text[i];
        currcol++;
    }
    return {table: table, columnCount: columns, rowCount: rowcount};
}

//6x5
function trithemius({table, columnCount, rowCount}, message, action) {
    let timeStart = Date.now();
    let enc = (ind)=> { return (ind.row+1 === rowCount) ? table[index(ind.col, 0)] : table[index(ind.col, ind.row+1)]}
    let decr = (ind) => {return (ind.row === 0) ? table[index(ind.col, rowCount-1)] : table[index(ind.col, ind.row-1)];}

    let index = (column, rows) => (columnCount)*rows + column;
    let newMessage = '';
    for(let i = 0, currcol = 0, currrow = 0; i < message.length; i++) {
        if (currcol >= columnCount) {
            currrow++;
            currcol = 0;
        }
        let ind = getIndex(message[i], columnCount, table);
        if (ind.ind === -1) {
            newMessage += message[i];
        }
        else {
            newMessage += action == 'ecrypt' ? enc(ind) : decr(ind);
        }
        currcol++;
    }
    console.log(`Trithemius ${action} time: ${Date.now() - timeStart}ms`);
    return newMessage;
}

function removeRepeated(text) {
    return [...new Set(text)].join('');
}


function getIndex(letter, columnCount, table) {
    let ind = table.indexOf(letter);
    let row = Math.ceil((ind+1)/columnCount)-1;
    let col = (ind)%columnCount;
    return {col, row, ind}
}


function stat(alphabet, text) {
    text = text.split('');
    let lettersCountInText = alphabet.map(uv => text.filter(i => i === uv).length);
    let p = lettersCountInText.map(letter => +(letter/text.length).toFixed(3));

    DrawChart(alphabet, p);
}

function DrawChart(alphabet, lettersPercentInText) {
    var arr = [];
    alphabet.forEach((element, i) => {arr.push({ label: element, count: lettersPercentInText[i]})});
    console.log(barChart(arr));
}
