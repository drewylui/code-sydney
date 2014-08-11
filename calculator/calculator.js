/* 
Start of code for calculator
*/

var inputArray = []; // Holds values of calculator button presses
var numString = ""; // Holds multi-digit numbers
var total = 0; // Running total

// Stores the contents of the HTML element passed to it as a string array. Called from click events on the divs in calculator.html
function storeValue(element) {	

	if (element.innerHTML === "+") {
		inputArray.push(numString);
		inputArray.push(element.innerHTML);
		numString = "";
	} 
	else if (element.innerHTML === "-") {
		inputArray.push(numString);
		inputArray.push(element.innerHTML);
		numString = "";
	}
	else if (element.innerHTML === "*") {
		inputArray.push(numString);
		inputArray.push(element.innerHTML);
		numString = "";
	}
	else if (element.innerHTML === "/") {
		inputArray.push(numString);
		inputArray.push(element.innerHTML);
		numString = "";
	}
	else {
		numString = numString + element.innerHTML;
		$("#result").html(numString);
	}

}


// checks an array for number * number or number / number and replaces the three elements with a single element that is the result
function resolveMultiplyDivide(array) {
	total = 0.0;
	for (i=0; i<array.length; i++) {		
			if (array[i] === "*") {
				total = multiply(parseFloat(inputArray[i-1]), parseFloat(inputArray[i+1]));
				array[i-1] = total;
				array.splice(i,2);
			}
			if (array[i] === "/") {
				total = divide(parseFloat(inputArray[i-1]), parseFloat(inputArray[i+1]));
				array[i-1] = total;
				array.splice(i,2);
			}
	}
}


function calculate() {
	var inputString = "";

	// Add the last number to the inputArray, since storeValue() does not add it
	if (numString != "") {
		inputArray.push(numString);
		numString = "";
	}

	// Check the first input. If it is an empty string, then the first input was not a number, due to the way that storeValue builds the array.
	if (inputArray[0] === "") {		
		alert("Error: Cannot calculate total as the first input is not a number. Try again.");
		clearValues();
	}
	else {
		// resolve multiply and divide operations first, before processing the array for add and subtract operations
		resolveMultiplyDivide(inputArray);

		// Set the total equal to the first number
		var total = parseFloat(inputArray[0]);
		// Iterate through the rest of the numbers
		for (i=0; i<inputArray.length; i++) {		

			if (inputArray[i] === "+") {
				total = add(total, parseInt(inputArray[i+1]));
			}
			else if (inputArray[i] === "-") {
				total = subtract(total, parseInt(inputArray[i+1]));
			}
			else if (inputArray[i] === "*") {
				total = multiply(total, parseInt(inputArray[i+1]));
			}
			else if (inputArray[i] === "/") {
				total = divide(total, parseInt(inputArray[i+1]));
			}
			else {
				// do nothing
			}	

			console.log(inputArray[i].toString());	
		}

		$("#result").html(total.toString());
		inputArray = [];
		numString = "";
		total = 0;
	}
}

function clearValues() {
	inputArray = [];
	numString = "";
	total = 0;
	$("#result").html("");
}

function add (number1, number2) {
	return number1 + number2;
}

function multiply (number1, number2) {
	return number1 * number2;
}

function divide (number1, number2) {
	return number1 / number2;
}

function subtract (number1, number2) {
	return number1 - number2;
}

/* 
These are test functions
*/
function test () {
	alert("test worked!");
}

function test_calculate () {
	var numberArray = [];

	// Split the string into an array of numbers and operators
	numberArray = clickedString.split(/[+|-|*|/]/);

	for (i=0; i<numberArray.length; i++) {		
		console.log(numberArray[i]);
	}

	for (i=0; i<numberArray.length; i++) {
		
	}

}

function test_storeValue(element) {	
	clickedString = clickedString + element.innerHTML;
}


/* 
These are the warmup exercises
*/

function my_max (array) {	
	var max = 0;
	for (i=1; i<array.length; i++) {
		if (array[i] > max) {
			max = array[i];
		}
	}
	return max;
}

function vowel_count (string) {
	stringArray=string.match(/[a|e|i|o|u]/gi);
	return stringArray.length;	
}

function reverse (string) {
	var reversedString = "";
	stringArray = string.split("");
	for (i=0; i<stringArray.length; i++) {
		reversedString = reversedString.concat(stringArray[i]);
	}
	return reversedString;
}
