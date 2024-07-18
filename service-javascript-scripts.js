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

//~ const problem2__inputTracker = document.getElementById('problem2__input-js-selector');
const problem2__inputTracker = document.getElementsByClassName('js-selector-sudoku');
const problem2__outputTracker = document.getElementsByClassName('problem2__output-js-selector')[0];



function problem2__btnClick() {
	// Definitions:
	let res = false;
	let true_message = "Sudoku is valid";
	let false_message = "Sudoku is not valid";
	let err_message1 = "Symbols beside 1-9 are ignored";
	let input_board = null; // input_board[0-8][0-8]
	input_board = read_sudoku();
	// algorithm:
	res = isValidSudoku(input_board);
	// Print out the result;
	//~ problem2__outputTracker.textContent = res;
	if(res) problem2__outputTracker.textContent = true_message;
	else problem2__outputTracker.textContent = false_message;

};
//~ sudoku__inputs-container
//~ js-sudoku__i11
function read_sudoku() {
	let board = create_array();
	let msg_wrong_symbols = "Symbols beside 1-9 are ignored";
	//~ alert(board[8][8])
    for( let i = 0; i < 9; i++)
		for( let j = 0; j < 9; j++) {
			input_str = problem2__inputTracker[i*9 + j].value;
			if(input_str) {
				inp_num = Number(input_str);
				if(!inp_num) {
					board[i][j]='.';
					alert(msg_wrong_symbols);
					}
				else board[i][j] = input_str;
				};
			};
	return board;
	};

function writeInSudoku(board) {
    for( let i = 0; i < 9; i++)
		for( let j = 0; j < 9; j++) {
			problem2__inputTracker[i*9 + j].value = board[i][j];
			};
	};


function problem2__writeInSeedSudoku() {
	// Definitions:
	let msg_wrong_symbols = "Symbols beside 1-9 are ignored";
	
	// Create seed sudoku:
	var board = seedSudoku();
	
	// Write in numbers in sudoku on site:
	writeInSudoku(board);
	//~ return board;
	};

//~ const permute_i1 = document.getElementsByClassName('problem2__js-input-permutations_i1')[0];
//~ const permute_j1 = document.getElementsByClassName('problem2__js-input-permutations_j1')[0];
//~ const permute_i2 = document.getElementsByClassName('problem2__js-input-permutations_i2')[0];
//~ const permute_j2 = document.getElementsByClassName('problem2__js-input-permutations_j2')[0];

function problem2__PermutateSudoku() {
	// Definitions:
	//~ let msg_wrong_symbols = "Symbols beside 1-9 are ignored";
	let input_board = null; // input_board[0-8][0-8]

	const i1 = Number(document.getElementsByClassName('problem2__js-input-permutations_i1')[0].value);
	const j1 = Number(document.getElementsByClassName('problem2__js-input-permutations_j1')[0].value);
	const i2 = Number(document.getElementsByClassName('problem2__js-input-permutations_i2')[0].value);
	const j2 = Number(document.getElementsByClassName('problem2__js-input-permutations_j2')[0].value);
	
	// Create seed sudoku:
	input_board = read_sudoku();
	
	// Change in sudoku: permutations between rows 4 and 5.
	board = permutation(input_board, i1,j1, i2,j2);
	
	// Write in numbers in sudoku on site:
	writeInSudoku(input_board);
	};

function problem2__PermutateSudoku_2() {
	// Definitions:
	//~ let msg_wrong_symbols = "Symbols beside 1-9 are ignored";
	let input_board = null; // input_board[0-8][0-8]

	// Create seed sudoku:
	input_board = read_sudoku();
	
	// Make permutations over seed sudoku:
	//~ board = permutation(board, 0,0, 8,8);
	//~ alert(board[0][0]);
	
	// No change in the end: permutations between quadrants.
	//~ board = permutation(input_board, 7,3, 6,4);
	//~ board = permutation(input_board, 7,1, 4,6);
	//~ board = permutation(input_board, 7,1, 7,3);
	//~ board = permutation(input_board, 6,4, 4,6);
	
	// Change in sudoku: permutations between rows 4 and 5.
	board = permutation(input_board, 4,6, 5,6);
	board = permutation(input_board, 4,9, 5,9);
	//~ board = permutation(input_board, 7,1, 7,3);
	//~ board = permutation(input_board, 6,4, 4,6);
	//~ alert(board[0][0]);
	// Write in numbers in sudoku on site:
	writeInSudoku(input_board);
	//~ return board;
	};

function problem2__PermutateSudokuRows() {
	// Definitions:
	//~ let msg_wrong_symbols = "Symbols beside 1-9 are ignored";
	let Sudoku = null; // Sudoku[0-8][0-8]
	const row1 = Number(document.getElementsByClassName('problem2__js-input-permutate_row1')[0].value);
	const row2 = Number(document.getElementsByClassName('problem2__js-input-permutate_row2')[0].value);
	//~ alert(document.getElementsByClassName('problem2__js-input-permutate_row1')[0]);
	
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





















