let start = process.argv[2] || 2;
let end = process.argv[3] || 457;

//6
function primeNumbers(start, end) {
    let primes = [];
    for (let i = start; i <= end; i++) {
        if(isPrime(i)) primes.push(i);
    }
    return primes;
}

function isPrime(i) {
    for (let j = 2; j < i; j++) {
        if (i % j == 0) return false;
    }
    return true;
}

//1, 2
let primes = primeNumbers(start, end);
console.log(end/Math.log(end))
console.log(`${start}-${end} (${primes.length}): ${primes.join(' ')}`)



//3 Записать числа m и n в виде произведения простых множителей (форма записи – каноническая).
function Divide(number) {
    let res = [];
    for (let i = 2; i <= number;) {
        if (number % i == 0)    {
            number = number / i;
            res.push(i)
        }
        else  {
            i++;
        }
    }
    return res;
}
console.log('400 * 500 = ', Divide(400).concat(Divide(500)).join(' * '))



//4 Проверить, является ли число, состоящее из конкатенации цифр m ǀǀ n (табл. 1.2), простым.
console.log(isPrime(421..toString() + 457))