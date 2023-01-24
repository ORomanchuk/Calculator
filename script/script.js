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
const dotBtn = document.querySelector(".dotBtn");
const result = document.querySelector(".result");
const doubleZero = document.querySelector(".doubleZero");

let userInput = [];
let userHistoryArr = [];
let userHistory = '';
let counterArr = [];
let mathResult = 0;

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
	dotBtn.addEventListener("click", dotHandler);
	doubleZero.addEventListener("click", doubleZeroHandler);
}

// KEYBOARD
// KEYBOARD
// KEYBOARD

function keyboardHandler(e) {
    if (userInput.length > 9) return;
	if (e.key >= 0 && e.key <= 9) {
		userInput.push(e.key);
		counterArr.push(e.key);
		updateScreen();
	} else if (e.key === "Escape") {
		resetHandler();
	} else if (e.key === "Backspace" || e.key === "Delete") {
		deleteNumber();
	} else if (e.key === "=" || e.key === "Enter") {
		resultHandler();
	} else if (e.key === "." || e.key === ",") {
		dotHandler();
	} else if (
		e.key === "+" ||
		e.key === "-" ||
		e.key === "*" ||
		e.key === "/" 
	) {
		userInput.push(e.key);
		counterArr.push(e.key);
		updateScreen();
		updateHistory();
		clearScreenCurrent()
	}
}

// OPERATORS
// OPERATORS
// OPERATORS

function squareHandler() {
	if (userInput.length == 0) {
		userInput.push("0²");
		counterArr.push("0**2");
	} else if (userInput.length > 0) {
		userInput.push("²");
		counterArr.push("**2");
	}
	updateScreen();
}

function percentHandler() {
	if (userInput.length == 0) {
		userInput.push("0%");
		counterArr.push("0*0.01");
	} else if (userInput.length > 0) {
		userInput.push("%");
		counterArr.push("*0.01");
	}
	updateScreen();
}

function reverseHandler() {
	if (userInput[0] == "-") {
		userInput.shift();
	} else userInput.unshift("-");
	updateScreen();
	return;
}

function operatorsHandler() {
	let num = this.outerText;
	userInput.push(num);
	counterArr.push(num);
	updateScreen();
	updateHistory();
	clearScreenCurrent()
}

// VALUES
// VALUES
// VALUES

function valuesHandler() {
	let num = this.outerText;
	if (userInput.length > 9) return;
		userInput.push(num);
		counterArr.push(num);
		updateScreen();
}

function doubleZeroHandler() {
	if (userInput.length > 9) return;
	userInput.push("0");
	counterArr.push("0");
	userInput.push("0");
	counterArr.push("0");
	updateScreen();
}


function dotHandler() {
	if (userInput.length == 0) {
		userInput.push("0.");
		counterArr.push("0.");
	} else if (userInput.length > 0) {
		userInput.push(".");
		counterArr.push(".");
	}
	updateScreen();
}

// FUNCTIONAL BUTTONS
// FUNCTIONAL BUTTONS
// FUNCTIONAL BUTTONS


function delateHandler() {
    deleteNumber();
}

function resetHandler() {
    output.textContent = "0";
	history.textContent = "";
	userInput = [];
	userHistoryArr = [];
	counterArr = [];
	userHistory = '';
}

function deleteNumber() {
	userInput.pop();
	updateScreen();
}

function resultHandler() {
	let userInputString = userInput.join('');
		userHistoryArr.push(userInputString);
		userHistory += userHistoryArr.join('');
		userHistory += ('=');
		
		history.textContent = `${userHistory}`;
	let stringCounter = counterArr.join('');
		mathResult = eval(stringCounter);
		if (mathResult > 9999999999999) {
			output.style.fontSize = "26px";
			history.style.fontSize = "22px";
			output.textContent = `${mathResult}`;
		} else {
			output.textContent = `${mathResult}`;
		}
	userInput = [];
	userHistoryArr = [];
	counterArr = [];
	userHistory = '';
}

// INITIALIZATION
// INITIALIZATION
// INITIALIZATION

function init () {
    output.textContent = "0";
}

function clean () {
    output.textContent = "0";
	history.textContent = "";
	userInput = [];
	userHistoryArr = [];
	counterArr = [];
	userHistory = '';
}

function updateScreen () {
	if (arguments.length > 0 && !Number.isFinite(result)) {
		init();
		output.textContent = result;
		return;
	} 
	else if (arguments.length > 0) {
		screen = result;
	} else screen = userInput.join("");

	output.textContent = screen;
}

function updateHistory () {
	let userInputString = userInput.join('');
		userHistoryArr.push(userInputString);
		userHistory += userHistoryArr.join('');
		history.textContent = `${userHistory}`;
		userInput = [];
		userHistoryArr = [];
}

function clearScreenCurrent() {
	output.textContent = "0";
	userInput = [];
}

init();
setHandlers()