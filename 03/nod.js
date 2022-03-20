let numbers = process.argv.slice(2);

console.log(NOD([421, 457])); //5
console.log(NOD([65, 15, 90])); //6
//console.log(NOD(numbers));

function NOD (numbers) {
	return numbers.reduce(function (x, y) {
	    while (x && y) {
            if (x > y) {
                x = x % y;
            }
            else {
                y = y % x;
            }
	    }
	    return x + y;
	});
}