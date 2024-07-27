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
function problem2__Validation() {
	// Definitions:
	let res = false;
	let true_message = "Sudoku is valid";
	let false_message = "Sudoku is not valid";
	let err_message1 = "Symbols beside 1-9 are ignored";
	let Sudoku = null; // input_board[0-8][0-8]
	Sudoku = readSudoku();
	// algorithm:
	res = isValidSudoku(Sudoku);
	// Print out the result;
	//~ problem2__outputTracker.textContent = res;
	if(res) problem2__outputTracker.textContent = true_message;
	else problem2__outputTracker.textContent = false_message;

};

// Button 2: Write in site Seed Sudoku
function problem2__GenerateSeedSudoku() {
	var Sudoku = seedSudoku();
	writeInSudoku(Sudoku);
	};

// Button 3: One not safe permutations (swap cell1 and cell2)
function problem2__PermutateSudoku() {
	// Definitions:
	let Sudoku = null; // input_board[0-8][0-8]
	const i1 = Number(document.getElementsByClassName('problem2__js-input-permutations_i1')[0].value);
	const j1 = Number(document.getElementsByClassName('problem2__js-input-permutations_j1')[0].value);
	const i2 = Number(document.getElementsByClassName('problem2__js-input-permutations_i2')[0].value);
	const j2 = Number(document.getElementsByClassName('problem2__js-input-permutations_j2')[0].value);
	
	// Create seed sudoku:
	Sudoku = readSudoku();
	
	// Change in sudoku: permutations between rows 4 and 5.
	permutation(Sudoku, i1,j1, i2,j2);
	
	// Write in numbers in sudoku on site:
	writeInSudoku(Sudoku);
	};

// Button 4: Safe permutation (swap row1 and row2)
function problem2__PermutateSudokuRows() {
	// Definitions:
	let Sudoku = null; // Sudoku[0-8][0-8]
	const row1 = Number(document.getElementsByClassName('problem2__js-input-permutate_row1')[0].value);
	const row2 = Number(document.getElementsByClassName('problem2__js-input-permutate_row2')[0].value);
	
	// Create seed sudoku:
	Sudoku = readSudoku();
	
	// Make permutations over seed sudoku:
	for (let j = 1; j < 10; j++)
	{
		permutation(Sudoku, row1,j, row2,j);
	}
	
	// Write in numbers in sudoku on site:
	writeInSudoku(Sudoku);
	};


var aCells = null;
// Button 5: GenerateGameFrom_CompletedSudoku RecursiveCheck_forUniqnessOfSolution(Sudoku, Cells);
function problem2__GenerateGameFrom_CompletedSudoku() {
		// Definitions:
		let Sudoku = null; // Sudoku[0-8][0-8]
		let Cells = null;
		let cell = [0,0];
		let ncellsToDelte = 50; // [0;64] 8 30
		let DeletedCells = [];
		//~ let DeletedCells_set = new Set();
		let DeletedCells_map = new Map();
		let hash_key = -1;

		// Create seed sudoku:
		Sudoku = seedSudoku();
		
		// Make permutations over seed sudoku:
		cell = getRandomCell();
		hash_key = cell[0]*9+cell[1];
		Cells = new ListNode_cells( cell, Sudoku[cell[0]][cell[1]] );
		aCells = Cells;
		DeletedCells_map.set(hash_key, cell);
		
		for (k = 1; k < ncellsToDelte; k++)
		{
			do {
				cell = getRandomCell();
				hash_key = cell[0]*9+cell[1];
			} while(DeletedCells_map.has(hash_key));
			
			// Check if sudoku have only one Solution.
			//~ CheckIfOnlyOneSolution();
			Cells.next = new ListNode_cells( cell, Sudoku[cell[0]][cell[1]] );
			Cells = Cells.next;
			//~ RecursiveCheck_forUniqnessOfSolution(Sudoku, Cells);
			
			DeletedCells_map.set(hash_key, cell);
		};
		DeletedCells_map.forEach((aValue, aKey) => {
			//~ console.log(`${aKey} = ${aValue}`);
			ChangeSudoku_DeleteElement(Sudoku, aValue[0],aValue[1]);
		});	
		
		
		//~ -------------------------------------------------
		// Test of deletion of cells
		//~ for (k = 0; k < ncellsToDelte; k++) {
			//~ cell = [0,k];
			//~ DeletedCells_map.set(k, cell);
		//~ };
		//~ DeletedCells_map.forEach((aValue, aKey) => {
			//~ console.log(`${aKey} = ${aValue}`);
			//~ ChangeSudoku_DeleteElement(Sudoku, aValue[0],aValue[1]);
		//~ });
		// Test of deletion of cells
		//~ -------------------------------------------------
		
		// Write in numbers in sudoku on site:
		writeInSudoku(Sudoku);
	};

// Button 6: 
function problem2__CheckIfOneSolution() {
		// Definitions:
		let Sudoku = null; // Sudoku[0-8][0-8]
		let Cells = null;
		let cell = [0,0];
		let ncellsToDelte = 6; // [0;64] 64
		let DeletedCells = [];
		//~ let DeletedCells_set = new Set();
		let DeletedCells_map = new Map();
		let hash_key = -1;

		// Create seed sudoku:
		Sudoku = readSudoku();
		
		// Make permutations over seed sudoku:
		let i = 0;
		Cells = aCells;
		while (Cells && i<6)
		{
			i = i + 1;
			console.log(Cells);
			Cells = Cells.next;
		}
		
		
		let res = RecursiveCheck_forUniqnessOfSolution(Sudoku, aCells);
		
		console.log(res);
		

		// Write in numbers in sudoku on site:
		//~ writeInSudoku(Sudoku);
	};


function SolveSudoku() {
		// Definitions:
		let Sudoku = null; // Sudoku[0-8][0-8]
		let Cells = null;
		let cell = [0,0];
		let ncellsToDelte = 6; // [0;64] 64
		let DeletedCells = [];
		//~ let DeletedCells_set = new Set();
		let DeletedCells_map = new Map();
		let hash_key = -1;

		// Create seed sudoku:
		Sudoku = readSudoku();
		
		// Make permutations over seed sudoku:
		CrooksAlgorithm(Sudoku);		

		// Write in numbers in sudoku on site:
		writeInSudoku(Sudoku);
	};



function test() {
	
	sett = new Set();
	sett2 = new Set();

	sett.add(111);
	sett.add(222);
	sett.add(1);
	sett.add(2);
	
	sett2.add(1);
	//~ sett2.add(2);
	
	
	console.log(sett.difference(sett2));
	
	
	};











// Functions:
// 1. Read from the form sudoku.
// 2. Write in the form sudoku.
function readSudoku() {
	let SudokuBoard = create_array();
	let msg_wrong_symbols = "Symbols beside 1-9 are ignored";
    for( let i = 0; i < 9; i++)
		for( let j = 0; j < 9; j++) {
			input_str = problem2__inputTracker[i*9 + j].value;
			if(input_str) {
				inp_num = Number(input_str);
				if(!inp_num) {
					SudokuBoard[i][j]=emptyCell_symbol; // emptyCell_symbol defined in js-problemSolution_2.js
					alert(msg_wrong_symbols);
					}
				else SudokuBoard[i][j] = input_str;
				};
			};
	//~ console.log(SudokuBoard);
	return SudokuBoard;
	};

function writeInSudoku(SudokuBoard) {
    for( let i = 0; i < 9; i++)
		for( let j = 0; j < 9; j++) {
			problem2__inputTracker[i*9 + j].value = SudokuBoard[i][j];
			};
	};

function getRandomCell() {
	var getRandomInt =  function() {
		//~ return Math.ceil(Math.random() * 8); // function: get random from 1 to 9
		return Math.floor(Math.random() * 9);    // function: get random from 0 to 8
		};
	i = getRandomInt();
	j = getRandomInt();
	return [i,j]
	};

