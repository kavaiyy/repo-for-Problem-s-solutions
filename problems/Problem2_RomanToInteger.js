// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - -
// Problem #2: 
// 				Integer to Roman numbers - solution:
//      -	-	-	-	-	-	-	-	-	-	-	-	-	-	-.
// - - - - - - - - - - - -
 
//			*	*	*	*	*	*	*	*	*
//					Main version:
//			*	*	*	*	*	*	*	*	*
    var IntegerToRoman = function(num) {
		const ARR_SYMBOLS_INT = [1, 5, 10, 50, 100, 500, 1000];
		const ARR_SYMBOLS_ROMAN = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
		const ARR_SYMBOLS_ROMANSUBSTRACTIVEFORMS_INT = [4,9,40,90,400,900];
		const ARR_SYMBOLS_ROMANSUBSTRACTIVEFORMS_ROMAN = ['IV','IX','XL','XC','CD','CM'];
		const REPEATS_MAX = 3;
       
		let numStr = num.toString();
		let reduced_num = num;
		let current_reduced_num = 0;
		let resaltStr_arr = [];
		let count_repeats = 1;
		let last_repeat_symbol = 100;
		
		while(reduced_num!=0) {
			let i=0;
			if(numStr[0]!='4'&&numStr[0]!='9'&&count_repeats<REPEATS_MAX) {
					do {
						i++;
						current_reduced_num = reduced_num - ARR_SYMBOLS_INT.at(-i);
					} while(current_reduced_num<0); // Calcul and if num become positive hence this our value.
					resaltStr_arr.push(ARR_SYMBOLS_ROMAN.at(-i));
                    if(last_repeat_symbol===-i) count_repeats++;
                    else count_repeats=1;
                    last_repeat_symbol = -i;
				}
			else {
					do {
						i++;
						current_reduced_num = reduced_num - ARR_SYMBOLS_ROMANSUBSTRACTIVEFORMS_INT.at(-i);
					} while(current_reduced_num<0);
					resaltStr_arr.push(ARR_SYMBOLS_ROMANSUBSTRACTIVEFORMS_ROMAN.at(-i));
					count_repeats=1;
				};
			reduced_num = current_reduced_num;
			numStr = reduced_num.toString();
		};
		
		numStr = '';
		for (i = 0; i < resaltStr_arr.length; i++)
		{
			numStr = numStr.concat(resaltStr_arr[i]);
		}
    return numStr;
};
//			*	*	*	*	*	*	*	*	*
//				Version with recursion:
//			*	*	*	*	*	*	*	*	*
var IntToRoman_1 = function(num) {
    let resStr = '';
    arr_symbols_int = [1, 5, 10, 50, 100, 500, 1000];
    arr_symbols_Roman = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
    arr_symbols_RomanSubstractiveForms_int = [4,9,40,90,400,900];
    arr_symbols_RomanSubstractiveForms_Roman = ['IV','IX','XL','XC','CD','CM'];

    var Recursia = function(num, resStr) {
        let numStr = num.toString();
        let i = -1;
        let reduced_num = 0;
        let resStr_r = resStr;

        if(num!=0) {
        if(numStr[0]!='4'&&numStr[0]!='9') {
                    // coold be done more elegantly
                    do {
                        i++;
                        reduced_num = num - arr_symbols_int[i];
                    } while ( num - arr_symbols_int[i]>=0 );
                    i--;
                    
                    reduced_num = num - arr_symbols_int[i];
                    resStr_r = resStr.concat(arr_symbols_Roman[i]);
                    // resStr_r = resStr_r.concat('R');
                    resStr_r = Recursia(reduced_num, resStr_r);
                }
                else {
                    // resStr_r = resStr_r.concat('P');
                                // coold be done more elegantly
                    do {
                        i++;
                        reduced_num = num - arr_symbols_RomanSubstractiveForms_int[i];
                    } while ( num - arr_symbols_RomanSubstractiveForms_int[i]>=0 );
                    i--;

                    reduced_num = num - arr_symbols_RomanSubstractiveForms_int[i];
                    resStr_r = resStr.concat(arr_symbols_RomanSubstractiveForms_Roman[i]);
                    resStr_r = Recursia(reduced_num, resStr_r);            
                };
        };

        return resStr_r;
    };
    resStr = Recursia(num, resStr);
    return resStr;
};
//			*	*	*	*	*	*	*	*	*
//				Really good solution:
//			*	*	*	*	*	*	*	*	*
//~ class Solution {
//~ public:
    //~ string intToRoman(int num) {
    //~ string M[] = {"", "M", "MM", "MMM"};
    //~ string C[] = {"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"};
    //~ string X[] = {"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"};
    //~ string I[] = {"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"};
    //~ return M[num/1000] + C[(num%1000)/100] + X[(num%100)/10] + I[num%10];
    //~ }
//~ };

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - -
// Problem #3: 
// 				Roman to Integer numbers - solution:
//      -	-	-	-	-	-	-	-	-	-	-	-	-	-	-.
// - - - - - - - - - - - -

//			*	*	*	*	*	*	*	*	*
//				Main and first version:
//			*	*	*	*	*	*	*	*	*
var romanToInt = function(s) {
    let lenRomanNum = s.length-1;
    let res = 0;
		var romanToInt2 = function(inp_Roman_letter) {
				let out = 0;
				switch(inp_Roman_letter)
						{
						case 'I':
							out = 1;
							break;
						case 'V':
							out = 5;
							break;
						case 'X':
							out = 10;
							break;
						case 'L':
							out = 50;
							break;
						case 'C':
							out = 100;
							break;
						case 'D':
							out = 500;
							break;
						case 'M':
							out = 1000;
							break;
						default:
							out = -100000;
							break;
						}
				return out;
		};

    for (let i = 0; i <= lenRomanNum; i++) {
            let vNum = 0;
            switch(s[i]) 
                {
                case 'I':
                    switch(s[i+1]) {
                        case 'V':
                            vNum=4;
                            i=i+1;
                            break;
                        case 'X': 
                            vNum=9;
                            i=i+1;
                            break;
                        default:
                            vNum=1;
                            break;
                    }
                    break;
                case 'X':
                    switch(s[i+1]) {
                        case 'L':
                            vNum=40;
                            i=i+1;
                            break;
                        case 'C': 
                            vNum=90;
                            i=i+1;
                            break;
                        default:
                            vNum=10;
                            break;
                    }
                    break;
                case 'C':
                    switch(s[i+1]) {
                        case 'D':
                            vNum=400;
                            i=i+1;
                            break;
                        case 'M': 
                            vNum=900;
                            i=i+1;
                            break;
                        default:
                            vNum=100;
                            break;
                    }
                    break;
                default:
                    vNum = romanToInt2(s[i]);
                }
            res = res + vNum;
    }
    return res
};
