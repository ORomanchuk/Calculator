const app = document.querySelector(".workingSpase");
const history = document.querySelector(".history");
const output = document.querySelector(".output");
const delate = document.querySelector(".delate");
const reset = document.querySelector(".reset");
const percent = document.querySelector(".percent");
const square = document.querySelector(".square");
const reverse = document.querySelector(".reverse");
const operators = document.querySelectorAll(".operator");
const values = document.querySelectorAll(".value");
const result = document.querySelector(".result");
const doubleZero = document.querySelector(".doubleZero");

let userInput = [];
let userHistoryArr = [];
let userHistory = '';
let counterArr = [];
let screen = null;
let stack = null;
let stackOperation = null;
let inputOperation = null;
let currentOperation = null;
let mathResult = 0;

let shouldClearScreenCurrent = false;



function setHandlers() {
	document.addEventListener("keydown", keyboardHandler);
	values.forEach(btn => btn.addEventListener("click", valuesHandler));
	operators.forEach(btn => btn.addEventListener("click", operatorsHandler));
	result.addEventListener("click", resultHandler);
    delate.addEventListener("click", delateHandler);
    reset.addEventListener("click", resetHandler);
	percent.addEventListener("click", percentHandler);
	square.addEventListener("click", squareHandler);
	reverse.addEventListener("click", reverseHandler);
	doubleZero.addEventListener("click", doubleZeroHandler);
}

function keyboardHandler(e) {
    if (userInput.length > 9) return;
	if (e.key >= 0 && e.key <= 9) {
		userInput.push(e.key);
		updateScreen();
	} else if (e.key === "Escape") {
		clean();
	} else if (e.key === "Backspace" || e.key === "Delete") {
		deleteNumber();
	} else if (e.key === "=" || e.key === "Enter") {
		let push = userInput.join('');
		counterArr.push(push);
		resultHandler();
	} else if (e.key === "." || e.key === ",") {
		userInput.push(".");
		updateScreen();
	} else if (
		e.key === "+" ||
		e.key === "-" ||
		e.key === "*" ||
		e.key === "/" 
	) {
		userInput.push(e.key);
		addToCounter();
		updateScreen();
		updateHistory();
		clearScreenCurrent()
	}
}

function squareHandler() {
	userInput.push("²");
	counterArr.push("**2");
	updateScreen();
	updateHistory();
	clearScreenCurrent()
}

function percentHandler() {
	userInput.push("%");
	counterArr.push("*0.01");
	updateScreen();
	updateHistory();
	clearScreenCurrent()
}

function doubleZeroHandler() {
	if (userInput.length > 9) return;
	userInput.push("0");
	counterArr.push("0");
	userInput.push("0");
	counterArr.push("0");
	updateScreen();
}

function reverseHandler() {
	if (userInput[0] == "-") {
		userInput.shift();
	} else userInput.unshift("-");
	updateScreen();
	return;
}

function valuesHandler(e) {
	let num = this.outerText;

	if (userInput.length > 9) return;
		userInput.push(num);
		counterArr.push(num);
		updateScreen();
}

function operatorsHandler() {
	let num = this.outerText;

	userInput.push(num);
	// addToCounter();
	counterArr.push(num)
	updateScreen();
	updateHistory();
	clearScreenCurrent()
}

function delateHandler() {
    deleteNumber();
}

function resetHandler() {
    clean();
}

function resultHandler(e) {
	// addToCounter();
	let stringCounter = counterArr.join('');
	// counter();
	mathResult = eval(stringCounter);
	output.textContent = `${mathResult}`;
	// updateScreen();
	// updateHistory();
	// console.log(stringCounter);
}

// function counter (a) {;
	// console.log(counterArr);
	// console.log(userHistory);
// }

function init () {
    output.textContent = "0";
}

function clean () {
    output.textContent = "0";
	history.textContent = "";
	userInput = [];
	userHistoryArr = [];
	userHistory = '';
}

function addToCounter () {
	let userInputString = userInput.join('');
	counterArr.push(userInputString);

}

function updateScreen(result) {
	if (arguments.length > 0 && !Number.isFinite(result)) {
		init();
		output.textContent = result;
		return;
	} else if (arguments.length > 0) {
		screen = result;
	} else screen = userInput.join("");

	output.textContent = screen;
}

function updateHistory () {
	let userInputString = userInput.join('');
		userHistoryArr.push(userInputString);
		userHistory += userHistoryArr.join('');
		history.textContent = `${userHistory}`;
		console.log(userInput);
		console.log(userInputString);
		console.log(userHistoryArr);
		console.log(userHistory);
		userInput = [];
		userHistoryArr = [];
}

function deleteNumber() {
	userInput.pop();
	updateScreen();
}

function clearScreenCurrent() {
	output.textContent = "0";
	userInput = [];
	shouldClearScreenCurrent = false;
}

console.log(userInput);

console.log(stack);
console.log(output);
init();
setHandlers()