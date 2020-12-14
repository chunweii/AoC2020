const fs = require("fs");

let arr;
fs.readFile(__dirname + "/Puzzle1.txt", "utf8", (err, data) => {
    arr = data.split("\n").map(x => parseInt(x)).sort((a, b) => a - b);
    // let start = 0;
    // let end = arr.length - 1;
    // let sum = arr[start] + arr[end];
    // while (sum !== 2020) {
    //     if (sum < 2020) {
    //         start++;
    //         sum = arr[start] + arr[end];
    //     } else {
    //         end--;
    //         sum = arr[start] + arr[end];
    //     }
    // }
    // console.log(arr[start] * arr[end]);
    function iterator_helper(a, b, c) {
        if (a === b || b === c) { return 0; }
        const sum = arr[a] + arr[b] + arr[c];
        if (sum === 2020) {
            console.log(arr[a], arr[b], arr[c], a, b, c);
            return arr[a] * arr[b] * arr[c];
        } else if (sum < 2020) {
            const inc_a = iterator_helper(a + 1, b, c);
            if (inc_a === 0) {
                const inc_b = iterator_helper(a, b + 1, c);
                if (inc_b === 0) {
                    return iterator_helper(a, b, c + 1);
                } else { return inc_b; }
            } else { return inc_a; }
        } else { // exceeded
            return 0;
        }
    }
    console.log(iterator_helper(0, 1, 2))
});



// setTimeout(() => , 1000);