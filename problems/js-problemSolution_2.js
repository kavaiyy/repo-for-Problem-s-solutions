// Definitions global constants:
const emptyCell = '';

function seedSudoku() {
	let array_2D = [
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
	return array_2D;
	};

function create_array() {
	let s = emptyCell;
	let array_2D = [
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
	return array_2D;
	};

function ChangeSudoku_DeleteElement(sudoku_board, i,j) {
	let s = emptyCell;
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
        //~ let emptyCell = '.';

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
                if(board[i][j]!=emptyCell)
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
                if(board[i][j]!=emptyCell)
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
                        if(board[i][j]!=emptyCell)
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


class ListNode {
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
// 9**8=43046721, 9**9=387420489, 9**4=6561, 9**5=59049, 9**6=531441, 9**7=531441
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
	
function CheckIfOnlyOneSolution(board, i_element, j_element) {

	// Deginitions:
	let set_numberList = new Set();
	let res = true;
	let i = 0;
	let j = 0;

	//~ code


	return 0;
	};

