// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - -
// Problem #1 solution:
//      Return true if parentheses are valid, otherwise - false.
// - - - - - - - - - - - -
function isParenthesesValid(s) {
// isParenthesesValid = function(s) {

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






// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - -
// For degug:
// - - - - - - - - - - - -
// - - -
// Test calls from service-javacript-scripts.js
function test_function() {
    alert("hello")
}
