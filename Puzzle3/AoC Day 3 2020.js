{
let arr_of_text = document.body.innerText.split("\n");
arr_of_text.pop();
let ans1 = arr_of_text.reduce((acc, current, index) => 
    current[3 * index % 31] === "#" ? acc + 1 : acc, 0);
console.log(ans1);
let ans2 = arr_of_text.reduce((acc, current, index) => 
    current[index % 31] === "#" ? acc + 1 : acc, 0);
let ans3 = arr_of_text.reduce((acc, current, index) => 
    current[5 * index % 31] === "#" ? acc + 1 : acc, 0);
let ans4 = arr_of_text.reduce((acc, current, index) => 
    current[7 * index % 31] === "#" ? acc + 1 : acc, 0);
let ans5 = arr_of_text.reduce((acc, current, index) => 
    index % 2 === 0 ? (current[(index/2) % 31] === "#" ? acc + 1 : acc) : acc, 0);
console.log(ans1 * ans2 * ans3 * ans4 * ans5);
}