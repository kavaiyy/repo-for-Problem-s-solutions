// Definitions global constants:
const emptyCell_symbol = '';

class MySudokuSet {
	constructor(inp_arr) {
		this.hash_table = [false, false, false, false, false, false, false, false, false];
		this.size = 0;
		if(inp_arr!==undefined){
			let valid_input = true;
			if( inp_arr.length > 9 ) valid_input = false;
			for (let i = 0; i < inp_arr.length; i++) if(inp_arr[i]<1 || inp_arr[i]>9) valid_input = false;
			if(valid_input)
				for (let i = 0; i < inp_arr.length; i++) {
					this.hash_table[inp_arr[i]-1] = true;
					this.size++;
				};
		};
	};
	DefineSize() {
		this.size = 0;
		for (let i = 0; i < this.hash_table.length; i++)
		{
			if(this.hash_table[i]) this.size++;
		}
	};
	difference(anotherSudokuSet) {
		for (let i = 0; i < 9; i++)
			if(this.hash_table[i]) if(anotherSudokuSet.hash_table[i]) this.hash_table[i] = false;
		this.DefineSize();
		return this;
	};
	toString() {
		let res = '';
		let space = ' ';
		let first = 0;
		for (let i = 0; i < this.hash_table.length; i++)
		{
			if(this.hash_table[i]) {
				first++;
				if(first!==1) res = res + space + Number(i+1)
				else res = res + Number(i+1);
				}
		}
		return res;
	};
};


function seedSudoku() {
	let arr_2D = [
	//~ ['5','3','4','6','7','8','9','1','2'],
	['5','3','4','6','7','8','9','1','2'],
	['6','7','2','1','9','5','3','4','8'],
	['1','9','8','3','4','2','5','6','7'],
	
	['8','5','9','7','6','1','4','2','3'],
	['4','2','6','8','5','3','7','9','1'],
	['7','1','3','9','2','4','8','5','6'],
	
	['9','6','1','5','3','7','2','8','4'],
	['2','8','7','4','1','9','6','3','5'],
	['3','4','5','2','8','6','1','7','9']
	];
	return arr_2D;
	};

function create_array() {
	let s = emptyCell_symbol;
	let arr_2D = [
	[s,s,s,s,s,s,s,s,s],
	[s,s,s,s,s,s,s,s,s],
	[s,s,s,s,s,s,s,s,s],
	
	[s,s,s,s,s,s,s,s,s],
	[s,s,s,s,s,s,s,s,s],
	[s,s,s,s,s,s,s,s,s],
	
	[s,s,s,s,s,s,s,s,s],
	[s,s,s,s,s,s,s,s,s],
	[s,s,s,s,s,s,s,s,s]
	];
	return arr_2D;
	};

function ChangeSudoku_DeleteElement(sudoku_board, i,j) {
	let s = emptyCell_symbol;
	sudoku_board[i][j] = s;
	return 0;
	};

function ChangeSudoku_SetElement(sudoku_board, element, cell) {
	sudoku_board[cell[0]][cell[1]] = element;
	return 0;
	};

function permutation(board, i1,j1, i2,j2) {
	let str_buff = '';
	i1--;
	j1--; 
	i2--;
	j2--;
	str_buff = board[i1][j1];
	board[i1][j1] = board[i2][j2];
	board[i2][j2] = str_buff;
	//~ alert(str_buff);
	return 0;
	};



var isValidSudoku = function(board) 
    {
        // Deginitions:
        let set_numberList = new Set();
        let res = true;
        let i = 0;
        let j = 0;
        let shift = 3;
        //~ let emptyCell_symbol = '.';

        var isValid =  function(vSet, vElement)
            {
                let out = true;
                if( vSet.has(vElement) ) {
                    out = false;
                }
                else {
                    out = true;
                }
                return out;
            };

        //  Checks if rows are valid:
        for( i = 0; i < 9; i++) {
            for( j = 0; j < 9; j++) 
                //~ if(board[i][j]!='.')
                if(board[i][j]!=emptyCell_symbol)
                    if(isValid(set_numberList, board[i][j])) {
                        set_numberList.add(board[i][j]);
                    } else {
						res = false;
                        return res;
                    };
            set_numberList.clear();
        };

        //  Checks if columns are valid:
        for( j = 0; j < 9; j++) {
            for( i = 0; i < 9; i++) 
            {
                //~ if(board[i][j]!='.')
                if(board[i][j]!=emptyCell_symbol)
                    if(isValid(set_numberList, board[i][j])) {
                        set_numberList.add(board[i][j]);
                    } else {
                        return false;
                    };
            };
            set_numberList.clear();
        };

        //  Checks if boxes 3x3 are valid:
        for(let i_box=0; i_box < 3; i_box++)
            for(let j_box=0; j_box < 3; j_box++) 
            {
                for(let i_sub=0; i_sub < 3; i_sub++)
                    for(let j_sub=0; j_sub < 3; j_sub++) {
                        i = i_sub + shift*i_box;
                        j = j_sub + shift*j_box;
                        if(board[i][j]!=emptyCell_symbol)
                        //~ if(board[i][j]!='.')
                            if(isValid(set_numberList, board[i][j])) {
                                set_numberList.add(board[i][j]);
                            } else {
                                return false;
                            };
                    };
                set_numberList.clear();
            };
        return res;
    };


class ListNode_cells {
  constructor(aCell, aDigit){
    this.cell = aCell;
    this.original_digit = aDigit;
    this.next = null;
  }
};


// Board are always full.
// cells are supplyied in form of lint to linked-list or Array. Need to follow which element is know.
// If push pop then its changes in array which is not good.
// If var i = i+1 is not elegant.
// 
// In each call current_cell is saved.
// 9**2=81, 9**3=729, 9**4=6561, 9**5=59049, 9**6=531441, 9**7=531441
// 9**8 = 43 046 721, 9**9 = 387 420 489, 9**10 = 3 486 784 401
function RecursiveCheck_forUniqnessOfSolution(board, cells) {

	// Definitions:
	let digit = 1;
	let current_cell = cells;
	let original_digit = current_cell.original_digit;
	//~ code
	for (digit = 1; digit < 10; digit++)
	{
		ChangeSudoku_SetElement(board, digit, current_cell.cell);
		if(cells.next)
			RecursiveCheck_forUniqnessOfSolution(board, cells.next);
		else { 	
				if(isValidSudoku(board)) {
					if(digit!=original_digit) return false};
			};
	};
	return true;
	};















	















function getEmptyCells(Sudoku_board) {
	const arr_emptyCells = [];
	for( let i = 0; i < 9; i++)
		for( let j = 0; j < 9; j++) 
			if(Sudoku_board[i][j]===emptyCell_symbol) arr_emptyCells.push([i,j]);
	return arr_emptyCells;
};
function GetsolvedHashTable(length) {
	const arr_emptyCells_Solved = new Array(length);
	arr_emptyCells_Solved.fill(false);
	return arr_emptyCells_Solved
};


function CrooksAlgorithm(Sudoku_board) {
		// Definitions:
	const emptyCells = getEmptyCells(Sudoku_board);
	const emptyCells_Solved = GetsolvedHashTable(emptyCells.length);
	const SudokuSets = create_Sets2Darr(Sudoku_board);

		// Algorithm:
	let HowManySolved = 0;
	let Solved = 0;
	do
	{
		Solved = 0;
		for (let i = 0; i < emptyCells.length; i++)
		{
			let row_i = emptyCells[i][0];
			let col_j = emptyCells[i][1];
			ExculdeRows( SudokuSets, emptyCells[i]);
			ExculdeCols( SudokuSets, emptyCells[i]);
			ExculdeBoxes( SudokuSets, emptyCells[i]);
			Solved = Solved + CheckIfHasSolvedCells(SudokuSets, emptyCells, emptyCells_Solved);
		};
	HowManySolved = HowManySolved + Solved;
	} while (Solved!==0)

		// Results:
	WriteInDebugSudoku(SudokuSets, emptyCells, emptyCells_Solved);
	WriteInSolvedCases(Sudoku_board, SudokuSets, emptyCells);
	console.log("How many have been solved solved?", HowManySolved);
	console.log("Is equal original one?", CheckIfSolved_Equal_Seed( Sudoku_board ));
	console.log("Have any zero sets?", CheckIfHasZeroSets( SudokuSets ));

};


function ExculdeRows(array_2D, one_emptyCell) {
	const row_i = one_emptyCell[0];
	const col_j = one_emptyCell[1];
	for (let j = 0; j < 9; j++)
	{
		if(array_2D[row_i][j].size===1 && j!==col_j) {
			array_2D[row_i][col_j] = array_2D[row_i][col_j].difference(array_2D[row_i][j]);
			}
	}
};
function ExculdeCols(array_2D, one_emptyCell) {
	const row_i = one_emptyCell[0];
	const col_j = one_emptyCell[1];
	for (let i = 0; i < 9; i++)
	{
		if(array_2D[i][col_j].size===1 && i!==row_i) {
			array_2D[row_i][col_j] = array_2D[row_i][col_j].difference(array_2D[i][col_j]);
			}
	}
};
function ExculdeBoxes(array_2D, one_emptyCell) {
	const row_i = one_emptyCell[0];
	const col_j = one_emptyCell[1];
	const box_i = GetBox_i(row_i);
	const box_j = GetBox_j(col_j);

	for(let i_sub=0; i_sub < 3; i_sub++)
		for(let j_sub=0; j_sub < 3; j_sub++) {
			let i = i_sub + 3*box_i;
			let j = j_sub + 3*box_j;
			if(array_2D[i][j].size===1 && i!==row_i && j!==col_j) {
			array_2D[row_i][col_j] = array_2D[row_i][col_j].difference(array_2D[i][j]);
			}
		};
};
function GetBox_i(row_i) {
	return Math.floor(row_i/3);
};
function GetBox_j(col_j){
	return Math.floor(col_j/3);
};



function WriteInSolvedCases(Sudoku, array_2D, arr_emptyCells) {
	for(let i = 0; i < arr_emptyCells.length; i++) {
		let row_i = arr_emptyCells[i][0];
		let col_j = arr_emptyCells[i][1];
		if(array_2D[row_i][col_j].size===1 && Sudoku[row_i][col_j]===emptyCell_symbol) {
			//~ Sudoku[row_i][col_j] = array_2D[row_i][col_j].values().next().value.toString();
			Sudoku[row_i][col_j] = array_2D[row_i][col_j].toString();
			console.log(array_2D[row_i][col_j].toString(), "cell:", row_i,col_j);
			};
	};
};









// Create Sudoku 2D array with sets:
function create_Sets2Darr(Sudoku) {
	const array_2D = createEmpty2D_arr();
	for( let i = 0; i < 9; i++)
		for( let j = 0; j < 9; j++) {
			if(Sudoku[i][j]===emptyCell_symbol) array_2D[i][j]=create_Set()
			else array_2D[i][j]=create_solvedSet(Number(Sudoku[i][j]));}
	return array_2D;
};
function createEmpty2D_arr() {
	const arr2D = new Array(9);
	for (let i = 0; i < 9; i++)
	{
		arr2D[i] = new Array(9);
	};
	return arr2D;
	};
function create_Set() {
	return new MySudokuSet([1,2,3,4,5,6,7,8,9]);
	//~ return new Set([1,2,3,4,5,6,7,8,9]);
	};
function create_solvedSet(int_n) {
	return new MySudokuSet([int_n]);
	//~ return new Set([int_n]);
	};



function CheckIfHasSolvedCells(array_2D, arr_emptyCells, emptyCells_Solved) {
	let vHowManySolved = 0;
	for(let i = 0; i < arr_emptyCells.length; i++) {
		let row_i = arr_emptyCells[i][0];
		let col_j = arr_emptyCells[i][1];
		if( (array_2D[row_i][col_j].size===1) && !(emptyCells_Solved[i]) ) {
			emptyCells_Solved[i]=true;
			vHowManySolved++;
			};
	};
	return vHowManySolved;
};
function CheckIfHasZeroSets( arr_2D ) {
	for(let i = 0; i < 9; i++)
		for(let j = 0; j < 9; j++) {
			if(arr_2D[i][j].size===0) return true;
		};
	return false;
};
function CheckIfSolved_Equal_Seed(SudokuSolved){
	const Seed = seedSudoku();
	for (let i = 0; i < 9; i++)
		for (let j = 0; j < 9; j++)
			if(SudokuSolved[i][j]!==Seed[i][j] && SudokuSolved[i][j]!==emptyCell_symbol ) return false;
	return true;
};
function CheckIfYetUnsolved(SudokuSolved){
	for (let i = 0; i < 9; i++)
		for (let j = 0; j < 9; j++)
			if(SudokuSolved[i][j]===emptyCell_symbol ) return true;
	return false;
};



















//~ function SupposeOneNumber(Sudoku, array_2D, arr_emptyCells, emptyCells_Solved) {
	
	//~ Supposed_int = Math.ceil( 0.4 + Math.random() * 8);
	//~ if(!emptyCells_Solved[i])
	
//~ };


// Python algorith from leetcode:
//~ class Solution:
    //~ def solveSudoku(self, board: List[List[str]]) -> None:
        //~ """
        //~ Do not return anything, modify board in-place instead.
        //~ """
        //~ def check(i,j,board,num):
            //~ if(num in board[i]):return False
            //~ if(num in [board[row][j] for row in range(9)]):return False
            //~ for r in range((i//3)*3,((i//3)*3)+3):
                //~ for c in range((j//3)*3,((j//3)*3)+3):
                    //~ if(board[r][c]==num):return False
            //~ return True

        //~ def rec(board,i,j):
            //~ if(j==9):
                //~ i+=1;j=0
            //~ if(i==9):
                //~ return True
            //~ if(board[i][j]=="."):
                //~ for num in range(1,10):
                    //~ if(check(i,j,board,str(num))):
                        //~ board[i][j]=str(num)
                        //~ if(rec(board,i,j+1)):return True
                        //~ board[i][j]="."
                //~ return False
            //~ else:
                //~ return rec(board,i,j+1)
        //~ rec(board,0,0)
        //~ return board
