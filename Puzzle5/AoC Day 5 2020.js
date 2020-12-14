{
const arr_of_boarding_passes = document.body.innerText.split("\n").slice(0,-1);
const arr_of_rowcolumns = arr_of_boarding_passes.map(pass => {
    let row_high = 127;
    let row_low = 0;
    let col_high = 7;
    let col_low = 0;
    for (let i = 0; i < 10; i++) {
        if (i < 7) {
            if (pass[i] === "F") {
                row_high = row_high - Math.pow(2, 6 - i);
            } else { // "B"
                row_low = row_low + Math.pow(2, 6 - i);
            }
        } else {
            if (pass[i] === "L") {
                col_high = col_high - Math.pow(2, 9 - i);
            } else { // "R"
                col_low = col_low + Math.pow(2, 9 - i);
            }
        }
    }
    return [row_low, col_low];
});
const arr_of_seat_ids = arr_of_rowcolumns.map(rc => rc[0] * 8 + rc[1]).sort((a, b) => a - b);
let my_seat_id;
let prev = arr_of_seat_ids[0];
for (let i = 1; i < 908; i++) {
    if (arr_of_seat_ids[i] - prev === 2) {
        my_seat_id = prev + 1;
        console.log(my_seat_id);
        break;
    } else {
        prev = arr_of_seat_ids[i];
    }
}
}