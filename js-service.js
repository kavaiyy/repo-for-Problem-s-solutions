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
// Problem1
// - - - - - - - - - - - -

const problem1__inputTracker = document.getElementById('problem1__input-js-selector');
const problem1__outputTracker = document.getElementsByClassName('problem1__output-js-selector')[0];

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


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - -
// Problem2
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
	Sudoku = read_sudoku();
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
	Sudoku = read_sudoku();
	
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
	Sudoku = read_sudoku();
	
	// Make permutations over seed sudoku:
	for (let j = 1; j < 10; j++)
	{
		permutation(Sudoku, row1,j, row2,j);
	}
	
	// Write in numbers in sudoku on site:
	writeInSudoku(Sudoku);
	};

// Button 5: GenerateGameFrom_CompletedSudoku
function problem2__GenerateGameFrom_CompletedSudoku() {
	// Definitions:
	let Sudoku = null; // Sudoku[0-8][0-8]
	let cell = [0,0];
	let ncellsToDelte = 64; // [0;64]
	let DeletedCells = [];
	//~ let DeletedCells_set = new Set();
	let DeletedCells_map = new Map();
	let hash_key = -1;

	// Create seed sudoku:
	Sudoku = seedSudoku();
	
	// Make permutations over seed sudoku:
	for (k = 0; k < ncellsToDelte; k++)
	{
		do {
			cell = getRandomCell();
			hash_key = cell[0]*9+cell[1];
		} while(DeletedCells_map.has(hash_key));
		
		// Check if sudoku have only one Solution.
		
		DeletedCells_map.set(hash_key, cell);
	};
	DeletedCells_map.forEach((aValue, aKey) => {
		console.log(`${aKey} = ${aValue}`);
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

// Functions:
// 1. Read from the form sudoku.
// 2. Write in the form sudoku.
function read_sudoku() {
	let SudokuBoard = create_array();
	let msg_wrong_symbols = "Symbols beside 1-9 are ignored";
    for( let i = 0; i < 9; i++)
		for( let j = 0; j < 9; j++) {
			input_str = problem2__inputTracker[i*9 + j].value;
			if(input_str) {
				inp_num = Number(input_str);
				if(!inp_num) {
					//~ SudokuBoard[i][j]='.';
					SudokuBoard[i][j]=emptyCell; // emptyCell defined in js-problemSolution_2.js
					alert(msg_wrong_symbols);
					}
				else SudokuBoard[i][j] = input_str;
				};
			};
	console.log(SudokuBoard);
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









