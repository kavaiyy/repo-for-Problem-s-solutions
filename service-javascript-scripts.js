// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - -
// Problem1
// - - - - - - - - - - - -
const problem1__inputTracker = document.getElementById('problem1__input-js-selector');
const problem1__outputTracker = document.getElementsByClassName('problem1__output')[0];

function problem1_btnClick() {
	// Definitions:
	let input_text = problem1__inputTracker.value;
	let res = false;
	let true_message = "parentheses are valid";
	let false_message = "parentheses are not valid";
	let err_message1 = "no text is submitted";
	// algorithm:
	if(input_text) 
	{ 
		if(isParenthesesValid(input_text)) res = true_message;
		else res = false_message; 
	}
	else 
	{
		res = err_message1
	}
	// alert(res);
	problem1__outputTracker.textContent = res;
}

