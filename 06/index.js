// Creating variables to reference for our main DOM elements is very useful
// const lightsDiv = document.getElementById('lights');
const keyboardDiv = document.getElementById('keyboard');
const messageDiv = document.getElementById('message');
const positionsDiv = document.getElementById('positions');

//Define arrays for use later. A keyboard array makes building things much faster, the alphabet array is for reference.
const qwerty   = "QWERTYUIOPASDFGHJKLZXCVBNM".split('');
const alpha    = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
const rotorI   = {
  array: "AJDKSIRUXBLHWTMCQGZNPYFVOE".split(''),
  notch: 25
}
const rotorII  = {
  array: "BDFHJLCPRTXVZNYEIWGAKMUSQO".split(''),
  notch: 25
}
const rotorIII = {
  array:  "ESOVPZJAYQUIRHXLNFTGKDCMWB".split(''),
  notch: 25
}
const reflector = "RDOBJNTKVEHMLFCWZRXGYIPSUQ".split('');

// Define Rotors in use, in this case we're just using some static rotors, but this can be changed later
var rotors = {
  rotor0: {
    array: rotorI.array,
    position: 0,
    notch: rotorI.notch
  },
  rotor1: {
    array: rotorII.array,
    position: 0,
    notch: rotorII.notch
  },
  rotor2: {
    array: rotorIII.array,
    position: 0,
    notch: rotorIII.notch
  }
}

// Define inital positions, and empty output array
var messageArr = [];

// Define a function that simply increments the rotor, and rotates when it hits 25
var cycle = function(rotor, inc) {
  let currentPos = rotor.position
  let newPos = 0;
  if (currentPos + inc >= 25) {
    newPos = (currentPos + inc - 25);
  }
  else {
    newPos = currentPos + inc;
  } 
  return newPos;
}

var rotate = function(rotors) {
  let newRotors = rotors;
  
  newRotors.rotor2.position = cycle(newRotors.rotor2, 4);

  if (newRotors.rotor2.position + 1 >= 25) {
    newRotors.rotor1.position = cycle(newRotors.rotor1, 1);
    if (newRotors.rotor1.position + 1 >= 25) {
      newRotors.rotor0.position = cycle(newRotors.rotor0, 1);
    }
  }

  return newRotors;
}

// Define a function that takes a letter in, as well as a rotor and outputs another letter based on the rotor and position
var rotorChange = function(letter, rotor) {
  // Get the index of our input letter, this is the position in the alphabet
  let index = alpha.indexOf(letter);
  // Offset the index by the position of the rotor
  index = ((index + rotor.position) % 26);
  let newLetter = rotor.array[index];
  let newIndex = alpha.indexOf(newLetter);
  //console.log(alpha, letter, index, newLetter, newIndex);
  newIndex = (newIndex - rotor.position + 26) % 26;
  console.log(`Letter ${letter}, alpha index ${index}, newLetter ${newLetter} (from rotor), alpha index of new letter ${alpha.indexOf(newLetter)}, ${newIndex}`)
  return alpha[newIndex];
}

var rotorBack = function(letter, rotor) {
  let index = alpha.indexOf(letter);
  index = ((index + rotor.position) % 26);
  let newIndex = rotor.array.indexOf(alpha[index]);
  let newLetter = alpha[(newIndex - rotor.position + 26) % 26]
  return newLetter;
}

var reflect = function(letter) {
  let index = alpha.indexOf(letter);
  return reflector[index];
}

var outputLetter = function(key) {
  // document.getElementById(key).classList.add('lit');
  //   setTimeout(function(){
  //   document.getElementById(key).classList.remove("lit"); 
  // }, 300);
  messageArr.push(key[0]);
  messageDiv.innerHTML = '<h1>' + messageArr.join(' ') + '</h1>';
  positionsDiv.innerHTML = '<p> Positions: ' + alpha[rotors.rotor0.position] + ' ' + alpha[rotors.rotor1.position] + ' ' + alpha[rotors.rotor2.position] + '</p>';
}

var handleKeyPress = function(key) {
  rotors = rotate(rotors)
  let newLetter = rotorChange(key, rotors.rotor2);
  console.log(newLetter)
  newLetter = rotorChange(newLetter, rotors.rotor1);
  console.log(newLetter)
  newLetter = rotorChange(newLetter, rotors.rotor0);
  console.log(newLetter)
  newLetter = reflect(newLetter);
  console.log(newLetter)
  newLetter = rotorBack(newLetter, rotors.rotor0);
  console.log(newLetter)
  newLetter = rotorBack(newLetter, rotors.rotor1);
  console.log(newLetter)
  newLetter = rotorBack(newLetter, rotors.rotor2);
  console.log(newLetter)

  // Output new Letter
  outputLetter(newLetter + 'light');
}

qwerty.map(function(letter){
  var lightText = document.createTextNode(letter);
  var newLight = document.createElement("div");
  newLight.appendChild(lightText);
  newLight.id = letter + 'light';
  newLight.classList.add("light");
  //lightsDiv.appendChild(newLight);
});

qwerty.map(function(letter){
  var keyText = document.createTextNode(letter);
  var newKey = document.createElement("div");
  newKey.appendChild(keyText);
  newKey.id = letter + 'key';
  newKey.classList.add("key");
  keyboardDiv.appendChild(newKey);
  newKey.addEventListener("click", function(){
    handleKeyPress(letter)
  });
});


document.addEventListener('keydown', (event) => {
  var keyName = event.key.toUpperCase();
  handleKeyPress(keyName);
});

document.addEventListener('keyup', (event) => {
  const keyName = event.key.toUpperCase() + 'light';
  document.getElementById(keyName).classList.remove("lit")
});

