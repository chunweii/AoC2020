{
// let valid_passports = document.body.innerText.split("\n\n").reduce((accum, passport) => {
//     if (passport.includes("byr:") && passport.includes("iyr:") && passport.includes("eyr:") && passport.includes("hgt:") &&
//         passport.includes("hcl:") && passport.includes("ecl:") && passport.includes("pid:")) {
//         return accum + 1;
//     } else {return accum;}
// },0);
// console.log(valid_passports);
let arr_of_passports = document.body.innerText.split("\n\n").filter(passport => 
    passport.includes("byr:") && passport.includes("iyr:") && passport.includes("eyr:") && passport.includes("hgt:") &&
        passport.includes("hcl:") && passport.includes("ecl:") && passport.includes("pid:"));
function check_keys(str, str2) {
    let year;
    let height;
    let units;
    const arr_of_colours = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
    switch(str) {
        case "byr":
            year = parseInt(str2);
            return str2.length === 4 && year >= 1920 && year <= 2002;
        case "iyr":
            year = parseInt(str2);
            return str2.length === 4 && year >= 2010 && year <= 2020;            
        case "eyr":
            year = parseInt(str2);
            return str2.length === 4 && year >= 2020 && year <= 2030;
        case "hgt":
            height = parseInt(str2.slice(0,-2));
            units = str2.slice(-2);
            return units === "cm" ? (height >= 150 && height <= 193) : units === "in" ? (height >= 59 && height <= 76) : false;
        case "hcl":
            return /^#[0-9A-F]{6}$/i.test(str2);
        case "ecl":
            return arr_of_colours.includes(str2);
        case "pid":
            return /^[0-9]{9}/.test(str2);
        case "cid": return true;
        default: return false;
    }
}
console.log(arr_of_passports.reduce((accum, pp) => {
    let arr_of_key_values = pp.split(/[\s\n]+/).map(x => x.split(":"));
    let is_valid = true;
    for (let i = 0; i < arr_of_key_values.length && is_valid; i++) {
        if (check_keys(arr_of_key_values[i][0], arr_of_key_values[i][1])) {
            continue;
        } else {
            is_valid = false;
        }
    }
    return (is_valid) ? accum + 1 : accum;
}, 0));
}