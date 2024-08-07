class MySudokuSet {
	static space_symbol = ' ';
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
	static Check_ValidElement(element) {
		return 0<=element && element<=9;
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
	set_Elements(inp_arr) {
		this.clear();
		if(inp_arr!==undefined){
			for (let i = 0; i < 9; i++) {
				if(this.Check_ValidElement(inp_arr[i])) this.hash_table[inp_arr[i]-1] = true;
			};
		};
		this.DefineSize();
		return this;
	};
	toString() {
		let res = '';
		let first = 0;
		for (let i = 0; i < this.hash_table.length; i++)
		{
			if(this.hash_table[i]) {
				first++;
				if(first!==1) res = res + MySudokuSet.space_symbol + Number(i+1)
				else res = res + Number(i+1);
				}
		}
		return res;
	};
	clear() {
		for (let i = 0; i < 9; i++)
			this.hash_table[i] = false;
		this.size = 0;
		return this;
	};
	add(element) {
		if(MySudokuSet.Check_ValidElement(element)) {
			if(!this.hash_table[element-1]) {
				this.hash_table[element-1] = true;
				this.size++;
			}
		}
		return this;
	};
	has(element) {
		return this.hash_table[element-1];
	};
	values() {
		return this;
	};
	addAllElements() {
		for (let i = 0; i < 9; i++)
			this.hash_table[i] = true;
		this.size = 9;
		return this;
	};
};


class SudokuClass {
	// Properties:
	static emptyCell_symbol = '';

	constructor(sudoku_board) {
		if(sudoku_board!==undefined){
			this.sudoku_board = sudoku_board;
		}
		else {
			this.sudoku_board = SudokuClass.createEmpty2D_arr(SudokuClass.emptyCell_symbol);
		};

		this.sudokuSets = this.#Create_SudokuSets();
		this.emptyCells = [];
		this.emptyCells_solved = [];

		this.#init_solvedSets();
		this.#init_emptyCells();

		// Additional functions:
		this.task_board = SudokuClass.createEmpty2D_arr(SudokuClass.emptyCell_symbol);
		this.debug_board = SudokuClass.createEmpty2D_arr(SudokuClass.emptyCell_symbol);
		this.#setUp_taskBoard();
		this.#setUp_debugBoard();
		this.FocusedSet = new MySudokuSet();
	};

	// Methods:
	static setEmptyCell_symbol(symbol) {
			SudokuClass.emptyCell_symbol = symbol;
	};
	static getRandomCell() {
		const getRandomInt =  function() {return Math.floor(Math.random() * 9)}; // function: get random from 0 to 8
		return [getRandomInt(),getRandomInt()]
	};
	static createEmpty2D_arr(dummy_symbol) {
		const arr2D = new Array(9);
		for (let i = 0; i < 9; i++)
			{
			arr2D[i] = new Array(9);
			if(dummy_symbol!==undefined) arr2D[i].fill(dummy_symbol);
			};
		return arr2D;
	};
	static permutate_elements(board, i1,j1, i2,j2) {
		let str_buff = '';
		str_buff = board[i1][j1];
		board[i1][j1] = board[i2][j2];
		board[i2][j2] = str_buff;
		return 0;
	};
	#Create_SudokuSets() {
		const sudokuSets = SudokuClass.createEmpty2D_arr();
		for (let i = 0; i < 9; i++)
			for (let j = 0; j < 9; j++)
			{
				//~ this.sudokuSets[i][j] = new Set();
				sudokuSets[i][j] = new MySudokuSet();
			}
		return sudokuSets;
	};
	#init_solvedSets() {
		for( let i = 0; i < 9; i++)
			for( let j = 0; j < 9; j++) {
				if(this.sudoku_board[i][j]===SudokuClass.emptyCell_symbol) this.sudokuSets[i][j].add(1).add(2).add(3).add(4).add(5).add(6).add(7).add(8).add(9);
				else {
						this.sudokuSets[i][j].clear();
						this.sudokuSets[i][j].add(Number(this.sudoku_board[i][j]));
					}
			};
	};
	#init_emptyCells() {
		const arr1 = [];
		const arr2 = [];
		for( let i = 0; i < 9; i++)
			for( let j = 0; j < 9; j++)
				if(this.sudokuSets[i][j].size!==1)
					{arr1.push([i,j]);
					arr2.push(false)};
		this.emptyCells = arr1;
		this.emptyCells_solved = arr2;
	};
	#setUp_sudoku() {
		this.emptyCells = [];
		this.emptyCells_solved = [];
		this.init_solvedSets();
		this.init_emptyCells();
	};
	setSudoku_board(input_sudoku) {
		this.sudoku_board = input_sudoku;
		this.#setUp_sudoku();
		this.#setUp_taskBoard();
		this.#setUp_debugBoard();
	};
	#setUp_taskBoard() {
		for( let i = 0; i < 9; i++)
			for( let j = 0; j < 9; j++)
				this.task_board[i][j] = this.sudoku_board[i][j];
	};
	#setUp_debugBoard() {
		for( let i = 0; i < 9; i++)
			for( let j = 0; j < 9; j++)
				this.debug_board[i][j] = this.sudokuSets[i][j].toString();
	};
	#changeElement(element, i,j) {
		this.sudoku_board[i][j] = element;
	};
	static isValidSudoku(sudoku_board) {
		// Definitions:
		const set_numberList = new MySudokuSet();
		//~ const set_numberList = new Set();		
		const SHIFT = 3;
        const isRepeatInList =  function(vSet, vElement)
            {
				const elem_int = Number(vElement);
				if( elem_int!=SudokuClass.emptyCell_symbol )
					if( !vSet.has( elem_int ) ) {
						vSet.add( elem_int );
					} else {
						return true;
					};
				return false;
            };
        //  Checks if rows are valid:
		for(let i = 0; i < 9; i++) {
			for(let j = 0; j < 9; j++)
				//~ if(isRepeatInList(set_numberList, this.sudoku_board[i][j])) return false;
				if(isRepeatInList(set_numberList, sudoku_board[i][j])) return false;
			set_numberList.clear();
		};
		//  Checks if columns are valid:
		for(let j = 0; j < 9; j++) {
			for(let i = 0; i < 9; i++)
				//~ if(isRepeatInList(set_numberList, this.sudoku_board[i][j])) return false;
				if(isRepeatInList(set_numberList, sudoku_board[i][j])) return false;
			set_numberList.clear();
		};
		//  Checks if boxes 3x3 are valid:
		for(let i_box=0; i_box < 3; i_box++)
			for(let j_box=0; j_box < 3; j_box++) 
			{
				for(let i_sub=0; i_sub < 3; i_sub++)
					for(let j_sub=0; j_sub < 3; j_sub++) {
						let i = i_sub + SHIFT*i_box;
						let j = j_sub + SHIFT*j_box;
						//~ if(isRepeatInList(set_numberList, this.sudoku_board[i][j])) return false;
						if(isRepeatInList(set_numberList, sudoku_board[i][j])) return false;
					};
				set_numberList.clear();
			};
		return true;
	};
	#CheckIfHasSolvedCells() {
		let vHowManySolved = 0;
		for(let i = 0; i < this.emptyCells.length; i++) {
			let row_i = this.emptyCells[i][0];
			let col_j = this.emptyCells[i][1];
			if( (this.sudokuSets[row_i][col_j].size===1) && !(this.emptyCells_solved[i]) ) {
				this.emptyCells_solved[i]=true;
				vHowManySolved++;
				};
		};
		return vHowManySolved;
	};
	#WriteInSolvedCases() {
		for(let i = 0; i < this.emptyCells.length; i++) {
			let row_i = this.emptyCells[i][0];
			let col_j = this.emptyCells[i][1];
			if(this.sudokuSets[row_i][col_j].size===1 && this.sudoku_board[row_i][col_j]===SudokuClass.emptyCell_symbol) {
				//~ Sudoku[row_i][col_j] = array_2D[row_i][col_j].values().next().value.toString();
				this.sudoku_board[row_i][col_j] = this.sudokuSets[row_i][col_j].toString();
				console.log(this.sudokuSets[row_i][col_j].toString(), "cell:", row_i,col_j);
			};
		};
	};
	IfHasZeroSets() {
		for(let i = 0; i < 9; i++)
			for(let j = 0; j < 9; j++) {
				if(this.sudokuSets[i][j].size===0) return true;
			};
		return false;
	};
	IfSolved_Equal_Seed() { // Need to add task_board and debug_board ?
		const Seed = SudokuClass.seedSudoku();
		for (let i = 0; i < 9; i++)
			for (let j = 0; j < 9; j++)
				if(this.sudoku_board[i][j]!==Seed[i][j] && this.sudoku_board[i][j]!==SudokuClass.emptyCell_symbol ) return false;
		return true;
	};
	IfYetUnsolved() {
		for (let i = 0; i < 9; i++)
			for (let j = 0; j < 9; j++)
				if(this.sudoku_board[i][j]===SudokuClass.emptyCell_symbol ) return true;
		return false;
	};
	static seedSudoku() {
		const arr_2D = [
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
	static seedSudoku2() {
		let s = SudokuClass.emptyCell_symbol;
		let arr_2D = [
		[s,'1',s,s,s,s,s,s,s],
		[s,s,s,s,s,s,s,s,s],
		[s,s,s,s,s,s,s,s,s],
		
		[s,s,s,s,s,s,s,s,s],
		[s,s,s,s,'3',s,s,s,s],
		[s,s,s,s,s,s,s,s,s],
		
		[s,s,s,s,s,s,s,s,s],
		[s,s,s,s,'5',s,s,s,s],
		[s,s,s,s,s,s,s,s,s]
		];
		return arr_2D;
	};	
	
			//~ this.emptyCells = [];
		//~ this.emptyCells_solved = [];
		//~ this.#init_solvedSets();
		//~ this.#init_emptyCells();
		
		
	CrossOutSudokuCells(NUMBER_DELETED_CELLS) {
		const DeletedCells = new Map();
		//~ const NUMBER_DELETED_CELLS = 3; // [0;64] 8 30 50 44
		let cell = [0,0];
		let hash_key = 0;
		
		this.#init_solvedSets();
		this.#init_emptyCells();
		if( (81-this.emptyCells.length)<NUMBER_DELETED_CELLS ) return 1;
		for (let i = 0; i < this.emptyCells.length; i++)
		{
			hash_key = this.emptyCells[i][0]*9+this.emptyCells[i][1];
			DeletedCells.set(hash_key, this.emptyCells[i]);
		}

		for (let k = 0; k < NUMBER_DELETED_CELLS; k++) {
			do {
				cell = SudokuClass.getRandomCell();
				hash_key = cell[0]*9+cell[1];
			} while(DeletedCells.has(hash_key));
			DeletedCells.set(hash_key, cell);
		};
		DeletedCells.forEach((aValue, aKey) => {
			this.#changeElement(SudokuClass.emptyCell_symbol, aValue[0],aValue[1]);
		});
		this.#init_solvedSets();
		this.#init_emptyCells();
		this.#setUp_taskBoard();
		this.#setUp_debugBoard();
	};
	#ExcludeRows(altered_Set, row_i, col_j) {
		for (let j = 0; j < 9; j++)
		{
			if(this.sudokuSets[row_i][j].size===1 && j!==col_j) {
				altered_Set = altered_Set.difference(this.sudokuSets[row_i][j]);
				}
		}
	};
	#ExcludeCols(altered_Set, row_i, col_j) {
		for (let i = 0; i < 9; i++)
		{
			if(this.sudokuSets[i][col_j].size===1 && i!==row_i) {
				altered_Set = altered_Set.difference(this.sudokuSets[i][col_j]);
				}
		}
	};
	#ExcludeBoxes(altered_Set, row_i, col_j) {
		// Definitions:
		const GetBox_i = function(vrow_i) { return Math.floor(vrow_i/3) };
		const GetBox_j = function(vcol_j) { return Math.floor(vcol_j/3) };
		const box_i = GetBox_i(row_i);
		const box_j = GetBox_j(col_j);
		// Algorithm:		
		for(let i_sub=0; i_sub < 3; i_sub++)
			for(let j_sub=0; j_sub < 3; j_sub++) 
			{
				let i = i_sub + 3*box_i;
				let j = j_sub + 3*box_j;
				if(this.sudokuSets[i][j].size===1 && i!==row_i && j!==col_j) {
				altered_Set = altered_Set.difference(this.sudokuSets[i][j]);
				}
			};
	};
	#WorkOut_OneCell(altered_Set, row_i,col_j) {
		this.#ExcludeRows(  altered_Set, row_i, col_j );
		this.#ExcludeCols(  altered_Set, row_i, col_j );
		this.#ExcludeBoxes( altered_Set, row_i, col_j );
	};
	#OneRun_CrooksAlgorithm() {
		let Solved = 0;
		for (let i = 0; i < this.emptyCells.length; i++)
		{
			let row_i = this.emptyCells[i][0];
			let col_j = this.emptyCells[i][1];
			this.#WorkOut_OneCell( this.sudokuSets[row_i][col_j], row_i,col_j );
			Solved = Solved + this.#CheckIfHasSolvedCells();
		};
		return Solved;
	};
	CrooksAlgorithm() {
		let HowManySolved = 0;
		let Solved = 0;
		do
		{
			Solved = this.#OneRun_CrooksAlgorithm();
			HowManySolved = HowManySolved + Solved;
		} while (Solved!==0)
		// Results:
		this.#WriteInSolvedCases();
		this.#setUp_debugBoard();
		console.log("How many have been solved solved?", HowManySolved);
		console.log("Is equal original one?", this.IfSolved_Equal_Seed());
		console.log("Have any zero sets?", this.IfHasZeroSets());
	};
	Focused_Set(one_emptyCell) {
		this.FocusedSet.addAllElements();
		const row_i = one_emptyCell[0];
		const col_j = one_emptyCell[1];
		this.#WorkOut_OneCell( this.FocusedSet, row_i,col_j );	
	};
};



//~ let set1 = new MySudokuSet();
//~ console.log(set1.add(1).add(2).add(3).add(4).add(5).add(6).add(7).add(8).add(11));
//~ console.log(set1.has(9));
//~ console.log(set1.clear());

//~ let set1 = new Set([5,2]);
//~ let set2 = new MySudokuSet([5,2]);
//~ console.log(set1.values().toString());
//~ console.log(set2.toString());


//~ SudokuClass.setEmptyCell_symbol('.');
//~ board = SudokuClass.seedSudoku2();
//~ const obj_x = new SudokuClass(board);

//~ obj_x.CrooksAlgorithm();
//~ console.log(obj_x.IfHasZeroSets());

//~ obj_x.CrossOutSudokuCells(10);
//~ console.log(obj_x.task_board);
//~ obj_x.CrooksAlgorithm();



//~ console.log(obj_x.sudoku_board);
//~ console.log(obj_x.emptyCells.length);


//~ console.log(obj_x.debug_board);
//~ obj_x.CrossOutSudokuCells(10);




//~ console.log(obj_x.sudokuSets);
//~ // console.log("Number of cells = ", obj_x.emptyCells.length);
//~ // console.log(obj_x.emptyCells);
//~ // console.log("Number of cells = ", obj_x.emptyCells_solved.length);
//~ console.log(obj_x.emptyCells_solved);

//~ console.log(obj_x.isValidSudoku());

//~ // console.log(obj_x.emptyCells_solved);
//~ obj_x.CrooksAlgorithm();
//~ // console.log(obj_x.CrooksAlgorithm());
//~ console.log(obj_x.sudoku_board);



//~ colors: #c84224 red, #dd544c,  #e47670
//  grey #4c4f53 #2a2a2a
// orange #f9a970 #e1a174	
// blue #64a6b5 #83b8c4
// yellow or #ffbc0d
// white text: #f2f2f3
// #b5b8ba 
//~ ..#1f232c
// example boundary: https://directory.spb.ru/cp/

























	//~ #ExculdeRows(one_emptyCell) {
		//~ const row_i = one_emptyCell[0];
		//~ const col_j = one_emptyCell[1];
		//~ for (let j = 0; j < 9; j++)
		//~ {
			//~ if(this.sudokuSets[row_i][j].size===1 && j!==col_j) {
				//~ this.sudokuSets[row_i][col_j] = this.sudokuSets[row_i][col_j].difference(this.sudokuSets[row_i][j]);
				//~ }
		//~ }
	//~ };
	//~ #ExculdeCols(one_emptyCell) {
		//~ const row_i = one_emptyCell[0];
		//~ const col_j = one_emptyCell[1];
		//~ for (let i = 0; i < 9; i++)
		//~ {
			//~ if(this.sudokuSets[i][col_j].size===1 && i!==row_i) {
				//~ this.sudokuSets[row_i][col_j] = this.sudokuSets[row_i][col_j].difference(this.sudokuSets[i][col_j]);
				//~ }
		//~ }
	//~ };
	//~ #ExculdeBoxes(one_emptyCell) {
		//~ // Definitions:
		//~ let GetBox_i = function(row_i) { return Math.floor(row_i/3) };
		//~ let GetBox_j = function(col_j) { return Math.floor(col_j/3) };
		//~ const row_i = one_emptyCell[0];
		//~ const col_j = one_emptyCell[1];
		//~ const box_i = GetBox_i(row_i);
		//~ const box_j = GetBox_j(col_j);
		//~ // Algorithm:		
		//~ for(let i_sub=0; i_sub < 3; i_sub++)
			//~ for(let j_sub=0; j_sub < 3; j_sub++) 
			//~ {
				//~ let i = i_sub + 3*box_i;
				//~ let j = j_sub + 3*box_j;
				//~ if(this.sudokuSets[i][j].size===1 && i!==row_i && j!==col_j) {
				//~ this.sudokuSets[row_i][col_j] = this.sudokuSets[row_i][col_j].difference(this.sudokuSets[i][j]);
				//~ }
			//~ };
	//~ };
	//~ CrooksAlgorithm() {
		//~ let HowManySolved = 0;
		//~ let Solved = 0;
		//~ do
		//~ {
			//~ Solved = 0;
			//~ for (let i = 0; i < this.emptyCells.length; i++)
			//~ {
				//~ let row_i = this.emptyCells[i][0];
				//~ let col_j = this.emptyCells[i][1];
				//~ this.#ExculdeRows(  this.emptyCells[i] );
				//~ this.#ExculdeCols(  this.emptyCells[i] );
				//~ this.#ExculdeBoxes( this.emptyCells[i] );
				//~ Solved = Solved + this.#CheckIfHasSolvedCells();
			//~ };
		//~ HowManySolved = HowManySolved + Solved;
		//~ } while (Solved!==0)
		//~ // Results:
		//~ this.#WriteInSolvedCases();
		//~ this.#setUp_debugBoard();
		//~ console.log("How many have been solved solved?", HowManySolved);
		//~ console.log("Is equal original one?", this.IfSolved_Equal_Seed());
		//~ console.log("Have any zero sets?", this.IfHasZeroSets());
	//~ };

	//~ CrooksAlgorithm_test() {
		//~ let HowManySolved = 0;
		//~ let Solved = 0;
		//~ do
		//~ {
			//~ Solved = 0;
			//~ for (let i = 0; i < this.emptyCells.length; i++)
			//~ {
				//~ let row_i = this.emptyCells[i][0];
				//~ let col_j = this.emptyCells[i][1];
				//~ this.#WorkOut_OneCell( this.sudokuSets[row_i][col_j], row_i,col_j );
				//~ Solved = Solved + this.#CheckIfHasSolvedCells();
			//~ };
		//~ HowManySolved = HowManySolved + Solved;
		//~ } while (Solved!==0)
		//~ // Results:
		//~ this.#WriteInSolvedCases();
		//~ this.#setUp_debugBoard();
		//~ console.log("How many have been solved solved?", HowManySolved);
		//~ console.log("Is equal original one?", this.IfSolved_Equal_Seed());
		//~ console.log("Have any zero sets?", this.IfHasZeroSets());
	//~ };
