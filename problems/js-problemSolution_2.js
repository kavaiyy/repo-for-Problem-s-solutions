var isValidSudoku = function(board) 
    {
        // Deginitions:
        let set_numberList = new Set();
        let res = true;
        let i = 0;
        let j = 0;
        let shift = 3;

        var isValid =  function(set, vElement) 
            {
                let out = true;
                if( set.has(vElement) ) {
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
                if(board[i][j]!='.')
                    if(isValid(set_numberList, board[i][j])) {
                        set_numberList.add(board[i][j]);
                    } else {
                        return false;
                    };
            set_numberList.clear();
        };

        //  Checks if columns are valid:
        for( j = 0; j < 9; j++) {
            for( i = 0; i < 9; i++) 
            {
                if(board[i][j]!='.')
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
                        if(board[i][j]!='.')
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


var isValidSudoku_old = function(board) {
    stack = [];
    let set_numberList = new Set();
    let res = true;
    let i = 0;
    let j = 0;
    let shift = 3;
    // set_numberList.add("5");
    // set_numberList.add("7");
    // set_numberList.delete("7");
    // set_numberList.has("7");
    // set_numberList.clear();
    // set_numberList.size;
    // for(let i = 0; i < 9; i++) {
        // stack.push(board[0][i]);
        // stack.push(board[i][0]);
    // };
    // console.log(stack)

// No need in breaks and EOP and Loop labels, just use return Its ends function!
    var isValid =  function(set, vElement) {
        let out = true;
        if( set.has(vElement) ) {
            out = false;
        }
        else {
            out = true;
        }
        return out;
    };

EOP:   {
Loop1:  for( i = 0; i < 9; i++) {
            for( j = 0; j < 9; j++) {
                if(board[i][j]!='.')
                    if(isValid(set_numberList, board[i][j])) {
                        set_numberList.add(board[i][j]);
                    } else {
                        res = false;
                        break Loop1;
                    };
            };
            set_numberList.clear();
        };
    if(!res) break EOP;


Loop2:  for( j = 0; j < 9; j++) {
            for( i = 0; i < 9; i++) {
                if(board[i][j]!='.')
                    if(isValid(set_numberList, board[i][j])) {
                        set_numberList.add(board[i][j]);
                    } else {
                        res = false;
                        break Loop2;
                    };
            };
            set_numberList.clear();
        };
    if(!res) break EOP;

Loop3:  for(let i_box=0; i_box < 3; i_box++)
            for(let j_box=0; j_box < 3; j_box++) {
                for(let i_sub=0; i_sub < 3; i_sub++)
                    for(let j_sub=0; j_sub < 3; j_sub++) {
                        i = i_sub + shift*i_box;
                        j = j_sub + shift*j_box;
                        if(board[i][j]!='.')
                            if(isValid(set_numberList, board[i][j])) {
                                set_numberList.add(board[i][j]);
                            } else {
                                res = false;
                                break Loop3;
                            };
                    };
                set_numberList.clear();
            };
        };
    // i_box = 2;
    // j_box = 2;
    // for(let i_sub=0; i_sub < 3; i_sub++)
    //     for(let j_sub=0; j_sub < 3; j_sub++) {
    //         i = i_sub + shift*i_box;
    //         j = j_sub + shift*j_box;
    //         set_numberList.add(board[i][j]);
    //     }


    // console.log(set_numberList);

    return res;
};