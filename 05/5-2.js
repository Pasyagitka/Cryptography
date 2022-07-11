const fs = require("fs");
const barChart = require('bar-charts');

let alphabet = "abcdefghijklmnopqrstuvwxyzäöü";
//let message = "Herr Braun, die DWS ist als Assetmanager eine Größe und hat eine";
let message = "Hello world"
let start = Date.now();
var encrypted = Encrypt('lizaveta', 'zinovich', message);
console.log(encrypted);
console.log('Enc time:', Date.now() - start);
console.log("----");
start = Date.now();
var decrypted = Decrypt('lizaveta', 'zinovich', encrypted);
console.log('Decr time:', Date.now() - start);
console.log(decrypted);


console.log('Message');
stat(alphabet.split(''), message);
console.log('Encrypted message');
stat(alphabet.split(''), encrypted);


function Encrypt(RowsKey, ColumnsKey, Text)
{
    let text = Text.toLowerCase();
    let n = text.length;
    let row = RowsKey.length;
    let column = ColumnsKey.length;
    let rowKey = new Array(row);
    let columnKey = new Array(column);
    let encText = "";

    if (n <= (row * column))  {
        let rowKeyNumber = 0;
        let columnKeyNumber = 0;
        for (let i = 0; i < alphabet.length; i++)  {
            for (let j = 0; j < row; j++)  {
                if (alphabet[i] == RowsKey[j]) {
                    rowKey[j] = rowKeyNumber;
                    rowKeyNumber++;
                }
            }
            for (let j = 0; j < column; j++)  {
                if (alphabet[i] == ColumnsKey[j])  {
                    columnKey[j] = columnKeyNumber;
                    columnKeyNumber++;
                }
            }
        }
        text = text.padEnd((row * column), ' ');
        let table = new Array(row).fill('').map(() => Array(column).fill(''));

        n = row * column;

        for (let i = 0; i < row; i++) {
            for (let j = 0; j < column; j++) {
                table[rowKey[i]][columnKey[j]] = text[(i * column) + j];
            }
        }

        for (let i = 0; i < n; i++) {
            let rowwww = i % row;
            let rowwww2 = Math.floor(i / row);
            encText += table[rowwww][rowwww2];
        }
        return encText;
    }
}

function Decrypt(RowsKey, ColumnsKey, Text)
{
    let encText = Text.toLowerCase();
    let n = encText.length;
    let row = RowsKey.length;
    let column = ColumnsKey.length;
    let rowKey = new Array(row);
    let columnKey =new Array(column);
    let text = "";

    
    if (n <= (row * column))  {
        let rowKeyNumber = 0;
        let columnKeyNumber = 0;
        for (let i = 0; i < alphabet.length; i++) {
            for (let j = 0; j < row; j++)   {
                if (alphabet[i] == RowsKey[j]) {
                    rowKey[j] = rowKeyNumber;
                    rowKeyNumber++;
                }
            }
            for (let j = 0; j < column; j++)  {
                if (alphabet[i] == ColumnsKey[j])  {
                    columnKey[j] = columnKeyNumber;
                    columnKeyNumber++;
                }
            }
        }

        encText = encText.padEnd((row * column), ' ');
        let table = new Array(row).fill('').map(() => Array(column).fill(''));

        n = row * column;

        for (let i = 0; i < n; i++)  {
            let rowwww = i % row;
            let rowwww2 = Math.floor(i / row);
            table[rowwww][rowwww2] = encText[i];
        }

        for (let i = 0; i < row; i++)  {
            for (let j = 0; j < column; j++) {
                text += table[rowKey[i]][columnKey[j]];
            }
        }
        return text;
    }
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
