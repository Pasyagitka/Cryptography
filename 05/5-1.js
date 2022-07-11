const fs = require("fs");
const barChart = require('bar-charts');

//let message = fs.readFileSync('message.txt').toString().toLowerCase();
let message = "Herr Braun, die DWS ist als Assetmanager eine Größe und hat eine Stimme mit Gewicht. Die setzt sie unter anderem für mehr Nachhaltigkeit ein – zum Beispiel mit „Active Ownership“. Was ist das, und was kann das? „Active Ownership“ heißt: aktive Teilhabe – Anteilseigner einer Aktiengesellschaft üben ihre Eigentümerschaft aktiv aus.Sie können und sollten sich einbringen und so Einfluss auf Unternehmen, Märkte oder ganze Volkswirtschaften nehmen. Für die DWS als Vermögensverwalter ist das Teil de";
let alphabet = "abcdefghijklmnopqrsßtuvwxyzäöü";
let specialSymbol = '~';

var cryptTable = [[]];
var MessageTable = [[]];

var foundRow = 0, foundColumn = 0;

let start = Date.now();
var encrypted = Encrypt(25, 20, message);
console.log('Enc time:', Date.now() - start);
//console.log(encrypted);
fs.writeFileSync("messageenc.txt", encrypted, {encoding: "utf8"} );
//console.log("----");
start = Date.now();
var decrypted = Decrypt(25, 20, encrypted);
console.log('Decr time:', Date.now() - start);
//console.log(decrypted);
fs.writeFileSync("messagedec.txt", decrypted, {encoding: "utf8"} );


console.log('Message');
stat(alphabet.split(''), message);
console.log('Encrypted message');
stat(alphabet.split(''), encrypted);


function Encrypt(RowsCount, ColumnsCount, Text) {
    let rowsCount = +(RowsCount);
    let columnsCount = +(ColumnsCount);
    let text = Text.toLowerCase();

    FillTableForAlgoritm(rowsCount, columnsCount);
    FillMessageTable(text, rowsCount, columnsCount, false);


    let encText = "";


    for (let k = 0; k < rowsCount * columnsCount; k++) {
        for (let i = 0; i < rowsCount; i++) {
            for (let j = 0; j < columnsCount; j++)  {
                if (k == cryptTable[i][j] && MessageTable[i][j] != specialSymbol) {
                    encText += MessageTable[i][j];
                }
            }
        }
    }
    return encText;
}

function Decrypt(RowsCount, ColumnsCount, Text) {
    let rowsCount = +(RowsCount);
    let columnsCount = +(ColumnsCount);
    let text = Text.toLowerCase();

    FillTableForAlgoritm(rowsCount, columnsCount);
    FillMessageTable(text, rowsCount, columnsCount, true);
    //console.log(cryptTable);
    console.log(cryptTable, MessageTable)

    let origText = "";
    for (let i = 0; i < rowsCount; i++) {
        for (let j = 0; j < columnsCount; j++)  {
            if (MessageTable[i][j] != specialSymbol) origText += MessageTable[i][j]; 
        }
    }
    return origText;
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



function FillMessageTable(message, rowsCount, columnsCount, decr) {
    MessageTable = new Array(rowsCount).fill('').map(() => Array(columnsCount).fill(''));
    let charMessage = message;
    if (decr) {
        let k = 0, l = 0;
        for (let i = 0; i <= rowsCount; i++)  {
            for (let j = 0; j <= columnsCount; j++) {
                FindPlaceInTable(k, rowsCount, columnsCount);
                MessageTable[foundRow][foundColumn] = (foundRow * columnsCount + foundColumn < charMessage.length)  ?  charMessage[l++] : specialSymbol;
                k++;
            }
        }
    }
    else {
        for (let i = 0, m_i = 0; i < rowsCount; i++) {
            for (let j = 0; j < columnsCount; j++) {
                MessageTable[i][j] = (m_i < message.length) ? message[m_i++] : specialSymbol;
            }
        }
    }
}

function FillTableForAlgoritm(rowsCount, columnsCount)
{
    cryptTable = new Array(rowsCount).fill('').map(() => Array(columnsCount).fill(''));
    let x = 0, s = 0, i = 0, j = 0;

    for (s = 0; s < rowsCount * columnsCount; s++) {
        if (s % 2 == 1)  {
            for (i = 0; i < rowsCount; i++) {
                for (j = 0; j < columnsCount; j++)  {
                    if ((i + j) == s) cryptTable[i][j] = x++;
                }
            }
        }
        if (s % 2 == 0) {
            for (j = 0; j < columnsCount; j++)  {
                for (i = 0; i < rowsCount; i++) {
                    if ((i + j) == s) cryptTable[i][j] = x++;
                }
            }
        }

    }
}

function FindPlaceInTable(k, rowsCount, columnsCount)   {
    for (let i = 0; i < rowsCount; i++) {
        for (let j = 0; j < columnsCount; j++)  {
            if (k == cryptTable[i][j]) {
                foundRow = i;
                foundColumn = j;
                return;
            }
        }
    }
}