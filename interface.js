// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - -
// Dark/light mode toggle
// - - - - - - - - - - - -
	// var1: not good
// document.getElementById('theme-toggle').addEventListener('click', function () {
//   document.body.classList.toggle('dark-theme');
// });
// 	// var2:
// 	const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
//       document.documentElement.setAttribute('data-theme', theme)


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - -
// Show/hide js block
// - - - - - - - - - - - -

const validParantheses__pagesNum = document.getElementsByClassName('code-pages__page-buttons-list');
//~ const validParantheses__showCodeBtn = document.getElementsByClassName("code-pages__show-code-button");
var activePage_i = [];
for (j = 0; j < validParantheses__pagesNum.length; j++)
{
	validParantheses__pagesNum[j].id = j.toString();
	activePage_i.push(GetActivePageNum( validParantheses__pagesNum[j] ));
}

for (j = 0; j < validParantheses__pagesNum.length; j++)
{
	// Initialization of ""ShowCode" buttons
	ShowCodeButton_DOMelement = validParantheses__pagesNum[j].parentElement.previousElementSibling;
	//~ validParantheses__showCodeBtn[j].addEventListener('click', function(event) {
	ShowCodeButton_DOMelement.addEventListener('click', function(event) {
		element = event.target.nextElementSibling;
		element.classList.toggle("js-code-pages__show-code-toggle");
	});
	//~ console.log(j);
	// Initialization of pages buttons
	for (i = 0; i < validParantheses__pagesNum[j].childElementCount; i++)
	{
		validParantheses__pagesNum[j].children[i].addEventListener('click', function(event) {
			element_onclick = event.target;
			element_id = element_onclick.parentElement.id;
			if (!CheckIfActivePage(element_onclick))
			{	 
				HidePage(getActivePage(element_id));
				Deactivate_pageButton(validParantheses__pagesNum[element_id].children[activePage_i.at(element_id)]);
				
				Activate_pageButton(element_onclick);
				activePage_i[element_id] = GetActivePageNum( validParantheses__pagesNum[element_id] );
				
				ShowPage(getActivePage(element_id));
			}
		})
	};	
	
}

function GetActivePageNum( dom_element ) {
	for(i = 0; i<dom_element.childElementCount&&!dom_element.children[i].classList.contains("js-page-button-active__ValideParantheses"); i++) { };
	return i;
	}
function CheckIfActivePage(element) {
	return element.classList.contains("code-pages__js-Show-toggle-button");
	}
function getActivePage( pages_widget_id ) {
	//~ element = validParantheses__pagesNum.nextElementSibling;
	let i = activePage_i[pages_widget_id];
	element = validParantheses__pagesNum[pages_widget_id].nextElementSibling;
	return element.children[i];
	//~ return document.getElementsByClassName("code-pages__page-container")[0].children[activePage_i];
	}
function ShowPage(page) {
	page.classList.add("js-show-page__ValidParantheses");
	}
function HidePage(page) {
	page.classList.remove("js-show-page__ValidParantheses");
	}
function Activate_pageButton(button) {
	button.classList.add("js-page-button-active__ValideParantheses");
	}
function Deactivate_pageButton(button) {
	button.classList.remove("js-page-button-active__ValideParantheses");
	}

// Version for ine ex
//~ for (i = 0; i < validParantheses__pagesNum.childElementCount; i++)
//~ {
	//~ validParantheses__pagesNum.children[i].addEventListener('click', function(event) {
		//~ element_onclick = event.target;
		//~ if (!CheckIfActivePage(element_onclick))
		//~ {	 
			//~ HidePage(getActivePage());
			//~ Deactivate_pageButton(validParantheses__pagesNum.children[activePage_i]);
			
			//~ Activate_pageButton(element_onclick);
			//~ activePage_i = GetActivePageNum( validParantheses__pagesNum );
			
			//~ ShowPage(getActivePage());
		//~ }
	//~ })
//~ };

//~ const validParantheses__showCodeBtn = document.getElementsByClassName("code-pages__show-code-button")[0];
//~ validParantheses__showCodeBtn.addEventListener('click', function(event) {
	//~ element = event.target.nextElementSibling;
	//~ element.classList.toggle("js-code-pages__show-code-toggle");
//~ });



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - -
// Problem1 Valdation Parantheses
// - - - - - - - - - - - -
function Interface_ValidationParantheses() {
	// Definitions:
	const problem1__inputTracker = document.getElementById('problem1__input-js-selector');
	const problem1__outputTracker = document.getElementsByClassName('problem1__output-js-selector')[0];
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


// Experiment
function Interface_ValidationParantheses_v5() {
	// Definitions:
	const problem1__inputTracker = document.getElementById('problem1__input-js-selector');
	const problem1__outputTracker = document.getElementsByClassName('problem1__output-js-selector')[0];
	let input_text = problem1__inputTracker.value;
	let res = '';
	let index_res = -1;
	let true_message = "parentheses are valid";
	let false_message = "parentheses are not valid: ";
	let err_message1 = "no text is submitted";
	// algorithm:
	if(input_text) 
	{ 
		index_res = isParenthesesValid_v5(input_text);
		console.log(index_res);
		if(index_res>=0) {
			res = false_message + input_text.slice(0,index_res)+'-->'+input_text[index_res]+'<--'+input_text.slice(index_res+1);		
			}
		else {res = true_message};
	}
	else 
	{
		res = err_message1
	}
	// alert(res);
	problem1__outputTracker.textContent = res;
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - -
// Problem #2: Roman to Ineteger numbers
// - - - - - - - - - - - -
function Interface_RomanToInteger() {
	// Definitions:
	const inputTracker = document.getElementById('RomanToInteger__inputTracker-js');
	const outputTracker = document.getElementsByClassName('RomanToInteger__outputTracker-js')[0];
	let err_message1 = "In the input string there are not Roman symbols";
	var regex = new RegExp("^[M,D,C,L,X,V,I]+$");
	let res = "";
	
	let inp_str = inputTracker.value.trim();
	
	// algorithm:
	if(regex.test(inp_str)) {
		res = romanToInt(inp_str);
		}
	else {
		res = err_message1;}	
	
	// Text out result;
	outputTracker.textContent = res;
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - -
// Problem #3: Ineteger to Roman numbers
// - - - - - - - - - - - -
function Interface_integerToRoman() {
	// Definitions:
	const inputTracker = document.getElementById('IntegerToRoman__inputTracker-js');
	const outputTracker = document.getElementsByClassName('IntegerToRoman__outputTracker-js')[0];
	let err_message1 = "Input string contains not allowed symbols";
	var regex = new RegExp("^[0-9]+$");
	let res = "";

	let inp_str = inputTracker.value.trim();

	// algorithm:
	if(regex.test(inp_str)) {
		res = IntegerToRoman(Number(inp_str));
		}
	else {
		res = err_message1;}
	
	// Text out result;
	outputTracker.textContent = res;
};






// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - -
// Problem #4: Sudoku
// - - - - - - - - - - - -
const problem2__inputTracker = document.getElementsByClassName('js-selector-sudoku');
const problem2__outputTracker = document.getElementsByClassName('problem2__output-js-selector')[0];

// Button 1: Validation of sudoku
function ValidateSudoku() {
	// Definitions:
	let true_message = "Sudoku board is valid";
	let false_message = "Sudoku board is not valid";
	let err_message1 = "Symbols beside 1-9 are ignored";
	const Sudoku = readSudoku();
	// algorithm:
	let res = SudokuClass.isValidSudoku(Sudoku);
	// Print out the result;
	if(res) problem2__outputTracker.textContent = true_message;
	else problem2__outputTracker.textContent = false_message;
};

// Button 2: Write in site Seed Sudoku
function WriteInSeedSudoku() {
	writeInSudoku(SudokuClass.seedSudoku());
};

// Button 3: One not safe permutations (swap cell1 and cell2)
function SwapCells() {
	// Definitions:
	const i1 = Number(document.getElementsByClassName('problem2__js-input-permutations_i1')[0].value);
	const j1 = Number(document.getElementsByClassName('problem2__js-input-permutations_j1')[0].value);
	const i2 = Number(document.getElementsByClassName('problem2__js-input-permutations_i2')[0].value);
	const j2 = Number(document.getElementsByClassName('problem2__js-input-permutations_j2')[0].value);

	// Create seed sudoku:
	const Sudoku = readSudoku();

	// Change in sudoku: permutations between rows 4 and 5.
	SudokuClass.permutate_elements(Sudoku, i1-1,j1-1, i2-1,j2-1);

	// Write in numbers in sudoku on site:
	writeInSudoku(Sudoku);
};

// Button 4: Safe permutation (swap row1 and row2) // Sudoku[0-8][0-8]
function SwapRows() {
	// Definitions:
	const row1 = Number(document.getElementsByClassName('problem2__js-input-permutate_row1')[0].value);
	const row2 = Number(document.getElementsByClassName('problem2__js-input-permutate_row2')[0].value);

	// Create seed sudoku:
	const Sudoku = readSudoku();

	// Make permutations over seed sudoku:
	for (let j = 1; j < 10; j++)
	{
		SudokuClass.permutate_elements(Sudoku, row1-1,j-1, row2-1,j-1);
	}

	// Write in numbers in sudoku on site:
	writeInSudoku(Sudoku);
};

// No button yet: Safe permutation (swap col1 and col2)
function SwapCols() { // Sudoku[0-8][0-8]
	// Definitions:
	const col1 = Number(document.getElementsByClassName('problem2__js-input-permutate_row1')[0].value);
	const col2 = Number(document.getElementsByClassName('problem2__js-input-permutate_row2')[0].value);

	// Create seed sudoku:
	const Sudoku = readSudoku();

	// Make permutations over seed sudoku:
	for (let i = 1; i < 10; i++)
	{
		SudokuClass.permutate_elements(Sudoku, i-1,col1-1, i-1,col2-1);
	}

	// Write in numbers in sudoku on site:
	writeInSudoku(Sudoku);
};

// Button 5: ---- ----
function CrossOutSudokuCells() {
		// Definitions:
		const NUMBER_DELETED_CELLS = 10; // [0;64] 8 30 50

		// Create sudoku:
		const Sudoku = new SudokuClass( readSudoku() );  // Sudoku[0-8][0-8]
		//~ const Sudoku = SudokuClass.seedSudoku();
		
		// Make permutations over seed sudoku:
		Sudoku.CrossOutSudokuCells(NUMBER_DELETED_CELLS);
		
		// Write in numbers in sudoku on site:
		writeInSudoku(Sudoku.sudoku_board);
};

// Button 6: ---- ----
function SolveSudoku() {
		// Create seed sudoku:
		const Sudoku = new SudokuClass( readSudoku() ); // Sudoku[0-8][0-8]

		// Make permutations over seed sudoku:
		Sudoku.CrooksAlgorithm();

		// Write in numbers in sudoku on site:
		writeInSudoku(Sudoku.sudoku_board);
		
		// Write in numbers in sudoku_debug_board on site:
		WriteInDebugSudoku(Sudoku);
};



// Functions:
// 1. Read from the form sudoku.
// 2. Write in the form sudoku.
function readSudoku() {
	const msg_wrong_symbols = "Symbols beside 1-9 are ignored";
	let SudokuBoard = SudokuClass.createEmpty2D_arr(SudokuClass.emptyCell_symbol);
    for( let i = 0; i < 9; i++)
		for( let j = 0; j < 9; j++) {
			input_str = problem2__inputTracker[i*9 + j].value;
			if(input_str) {
				inp_num = Number(input_str);
				if(!inp_num) {
					SudokuBoard[i][j]=SudokuClass.emptyCell_symbol;
					alert(msg_wrong_symbols);
					}
				else SudokuBoard[i][j] = input_str;
				};
			};
	return SudokuBoard;
	};

function writeInSudoku(SudokuBoard) {
    for( let i = 0; i < 9; i++)
		for( let j = 0; j < 9; j++) {
			problem2__inputTracker[i*9 + j].value = SudokuBoard[i][j];
			};
	};

function WriteInDebugSudoku(Sudoku) { // Sudoku[0-8][0-8]
		// Definitions:
		const Sudoku__outputDegub = document.getElementsByClassName("js-selector-sudoku-debug")[0].children;
		const GetValuesOfSet = function(vSet) {
			//~ return Array.from(vSet.values());
			return vSet.toString();		
		};

		for (let i = 0; i < 9; i++)
			for (let j = 0; j < 9; j++) {
				let res = GetValuesOfSet(Sudoku.debug_board[i][j]);
				console.log("res",res);
				Sudoku__outputDegub[i*9+j].value = res;
				Sudoku__outputDegub[i*9+j].classList.remove("sudoku__SolvedJustNow-color");
				if(res.length>1) Sudoku__outputDegub[i*9+j].classList.add("sudoku__NotSolved-color");
				if(res.length===1) Sudoku__outputDegub[i*9+j].classList.remove("sudoku__NotSolved-color");
				//~ Sudoku__outputDegub[i*9+j].classList.add("sudoku__NotSolved-color");
				// .sudoku__SolvedJustNow-color
			};

		for (let i = 0; i < Sudoku.emptyCells_solved.length; i++)
		{
			if(Sudoku.emptyCells_solved[i]) Sudoku__outputDegub[Sudoku.emptyCells[i][0]*9+Sudoku.emptyCells[i][1]].classList.add("sudoku__SolvedJustNow-color");
		}
};

