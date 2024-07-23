// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - -
// Problem #1: 
// 				Validation of parangtheses - solution:
//      Return true if parentheses are valid, otherwise - false.
// - - - - - - - - - - - -

//			*	*	*	*	*	*	*	*	*
//					Main version:
//			*	*	*	*	*	*	*	*	*
function isParenthesesValid(s) {
	// Additional function:
		function StringCharToInteger(s) {
			  switch(s) {
					case '(':
						return 1;
					case ')':
						return -1;               
					case '{':
						return 2;
					case '}':
						return -2;
					case '[':
						return 3;
					case ']':
						return -3;
					default:
						return 0;
				};        
			};
	// code:
    let N = s.length;

    let last_expected_bracket = [];
    let i = 0;
    while(i<N) {
        current_bracket = StringCharToInteger(s.at(i));
        i=i+1;
        if(current_bracket===0) continue;
        if(current_bracket>0) last_expected_bracket.push( current_bracket )
        else {
            if(current_bracket!=(-1)*last_expected_bracket.pop()) return false;
        };      
    };
    if(last_expected_bracket.length > 0) return false;
    return true;	
};



//			*	*	*	*	*	*	*	*	*	*	*
//				Version with stack but, array:
//			*	*	*	*	*	*	*	*	*	*	*

var isParenthesesValid_v3 = function(s) {
	// Additional function:
		function StringCharToInteger(s) {
			  switch(s) {
					case '(':
						return 1;
					case ')':
						return -1;               
					case '{':
						return 2;
					case '}':
						return -2;
					case '[':
						return 3;
					case ']':
						return -3;
					default:
						return 0;
				};        
			};

	// Definitions:
    let N = s.length;
    let N2 = Math.ceil(N / 2);
    let positive_bracket_line = new Array(N2);
    let pointer_bracket_line = -1;
    let current_bracket = 0;
    let i = 0;
    // Algorithm:
    while(i<N) {
        current_bracket = StringCharToInteger(s[i]);
        i=i+1;
        if(current_bracket===0) continue;
        if(current_bracket>0) {
            pointer_bracket_line++;
            positive_bracket_line[pointer_bracket_line] = current_bracket;
        }
        else {
            if(current_bracket!=(-1)*positive_bracket_line[pointer_bracket_line]) return false;
            else {pointer_bracket_line--;};
        };
    };
    return !Boolean(pointer_bracket_line+1);
};

// *	*	*	Comment:
//~ As previous Solution but without pop and push
// And memory allocation before and with MAX-memory array.
// Can't undestand from leetcode which is faster, time changes between submition completly sometime.
// Probable because of memmory garbage.
// 47 ms on test cases with   let positive_bracket_line = [];
// 53 ms on test cases with   let positive_bracket_line = new Array(N2);
// 87.76% 51ms



//			*	*	*	*	*	*	*	*	*	*	*
//				Version with minimum and only ifs:
//			*	*	*	*	*	*	*	*	*	*	*

var isParenthesesValid_v4 = function(s) {
        stack = [];
        for( let i=0; i<s.length; i++){
            let current_bracket = s[i];
            if(current_bracket=='('){
                stack.push(')');
            }else if(current_bracket=='{'){
                stack.push('}');
            }else if(current_bracket== '['){
                stack.push(']');
            }else if(current_bracket!==']'&&current_bracket!=='}'&&current_bracket!==')') {
				continue;
			}else if(stack.length===0 || stack.pop()!=current_bracket){
                return false;
            }
        };
        return (stack.length===0);
};
// *	*	*	Comment:
// Intresting variant cause this solution will be the fastest as it utilizes minumun if statesments,
// althoug this is not very "clean code", as for example var with switch allows easy addition of different symbols.
// and nested if's for some taste might seem not good.






// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - -
// For deletion?:
// - - - - - - - - - - - -
// - - -

//			*	*	*	*	*	*	*	*	*
//				Very first bad version:
//			*	*	*	*	*	*	*	*	*
function isParenthesesValid_veryFirstVersion(s) {

    let res = true;
    let N = s.length-1;
    let stack = [];
    let expected_bracket = [];

    let i = -1;
    while(i < N) {
        i=i+1;
        if( (s[i]!='(')&&(s[i]!='{')&&(s[i]!='[')&&(s[i]!=')')&&(s[i]!='}')&&(s[i]!=']') ) {continue;}
        // stack.push(s[i])
        if( (s[i]=='(')||(s[i]=='{')||(s[i]=='[') ) {
            stack.push(s[i])
            switch(s[i]) {
                case '(':
                    expected_bracket.push(')');
                    break;
                case '{':
                    expected_bracket.push('}');
                    break;
                case '[':
                    expected_bracket.push(']');
                    break;
            }
        }
        else if (s[i] == expected_bracket.pop()) {
            stack.pop()
        } else {
            res = false;
            break;
        }
        // console.log(i, s[i])
    }

    if(expected_bracket.length !=0) { res = false;}
    return res;
};




//			*	*	*	*	*	*	*	*	*	*
//				Very first bad leetcode version:
//			*	*	*	*	*	*	*	*	*	*

var isParenthesesValid_v2_leetcodeVersion = function(s) {

	function StringCharToInteger(s) {
          switch(s) {
				case '(':
					return 1;
				case ')':
					return -1;               
                case '{':
					return 2;
                case '}':
					return -2;
                case '[':
					return 3;
                case ']':
					return -3;
				default:
					return 0;
            };        
		};

    let N = s.length;
    if(N%2 != 0) return false;

    let last_expected_bracket = [];
    let i = 0;
    while(i<N) {
        current_bracket = StringCharToInteger(s.at(i));
        if(current_bracket>0) last_expected_bracket.push( current_bracket )
        else {
            if(current_bracket!=(-1)*last_expected_bracket.pop()) return false;
        };
        i=i+1;
    };
    if(last_expected_bracket.length > 0) return false;
    return true;
};
// *	*	*	Comment:
// As it was in leetcode, cause condition is that No symbols except brackets,
// analog of main version.



// 
//			*	*	*	*	*	*	*	*	*
//		Might be compared to isParenthesesValid_v4 version:
//			*	*	*	*	*	*	*	*	*

//~ var isValid = function (s) {

    //~ let stack = []
    //~ for (let c of s) {
        //~ if (c === '(' || c === '{' || c === '[') {
            //~ stack.push(c)
        //~ } else {
            //~ if (!stack.length ||
                //~ (c === ')' && stack[stack.length - 1] !== '(') ||
                //~ (c === '}' && stack[stack.length - 1] !== '{') ||
                //~ (c === ']' && stack[stack.length - 1] !== '[')) {
                //~ return false
            //~ }
            //~ stack.pop()
        //~ }
    //~ }
    //~ return !stack.length
//~ }

//~ Nice try:

    //~ let N = s.length;
    //~ if(N%2 != 0) return false;

    //~ let N2 = N/2;
    //~ let i = 0;
    //~ while(i<N2) {
        //~ if(StringCharToInteger(s.at(i))!=StringCharToInteger(s.at(-i))) return false;
        //~ // arr_Hash[i]=StringCharToInteger(s[i]);
        //~ i=i+1;
    //~ };
    
    //~ return true;
//~ };
// *	*	*	Comment:
// As it was in leetcode, cause condition is that No symbols except brackets,
// analog of main version.
