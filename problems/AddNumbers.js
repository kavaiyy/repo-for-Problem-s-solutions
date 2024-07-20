/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {

    var addTwoDigits = function(a,b, in_tens) {
        let [sum,tens,units] = [0,0,0];
        sum = a+b + in_tens;
        if(sum < 10){
            tens = 0;
            units = sum;
        } else{
            tens = 1;
            units = sum - 10;
        }
        return [tens, units];
    };


    let in_tens = 0;
    let units = 0;
    let a=0;
    let b=0;
    const l3_res = new ListNode(0, null);
    let l1_current_node = l1;
    let l2_current_node = l2;
    let l3_current_node = l3_res;
    let l3_previous_node = l3_res;
 while(l1_current_node || l2_current_node) {
        if(l1_current_node) {
            a=l1_current_node.val;
            l1_current_node = l1_current_node.next;
        }
        else a = 0;
        if(l2_current_node) {
            b=l2_current_node.val;
            l2_current_node = l2_current_node.next;
        }
        else b = 0;
        [in_tens,units] = addTwoDigits(a,b, in_tens)

        
        l3_current_node.val=units;
        l3_current_node.next = new ListNode(0, null);
        l3_previous_node = l3_current_node;
        l3_current_node = l3_current_node.next;
        // console.log( l3_current_node.val );
    };

    if(in_tens==0) l3_previous_node.next = null;
    else l3_current_node.val=in_tens;

    return l3_res;
};



/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    // console.log(l1.size());
    let res = 0;

    var addTwoDigits = function(a,b, in_tens) {
        let [sum,tens,units] = [0,0,0];
        sum = a+b + in_tens;
        if(sum < 10){
            tens = 0;
            units = sum;
        } else{
            tens = 1;
            units = sum - 10;
        }
        return [tens, units];
    };


    let in_tens = 0;
    let units = 0;
    let a=0;
    let b=0;
    var l3_res = new ListNode(0, null);
    let l1_current_node = l1;
    let l2_current_node = l2;
    let l3_current_node = l3_res;
    while(l1_current_node || l2_current_node) {
        if(l1_current_node) {
            a=l1_current_node.val;
            l1_current_node = l1_current_node.next;
        }
        else a = 0;
        if(l2_current_node) {
            b=l2_current_node.val;
            l2_current_node = l2_current_node.next;
        }
        else b = 0;
        [in_tens,units] = addTwoDigits(a,b, in_tens)

        
        l3_current_node.val=units;
        l3_current_node.next=new ListNode(0, null);
        console.log( l3_current_node.val );
        // console.log( units );

    };

    let i=0;
    var test_l = new ListNode(0, null);
    let test_l_current_node = test_l;
    while(i<5) {
        l3_current_node.val=-i;
        l3_current_node.next=new ListNode(0, null);
        i=i+1;
    }

    return test_l;
};
