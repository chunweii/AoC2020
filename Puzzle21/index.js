const input = require("fs").readFileSync(__dirname + "/input.txt", "utf8").trim().split("\n").map(x => {
    const tempResult = x.slice(0, x.length - 1).split(" (contains ");
    tempResult[0] = tempResult[0].split(" ");
    tempResult[1] = tempResult[1].split(", ");
    return tempResult;
});
function intersect(arr1, arr2) {
    const ans = [];
    for (const entry1 of arr1) {
        if (arr2.includes(entry1)) {
            ans.push(entry1);
        }
    }
    return ans;
}
const theMapOfAllergens = new Map();
for (const [ingredients, allergens] of input) { // [[...ingredients], [...allergens]]
    for (const allergen of allergens) {
        const arrOfPossibleIngredients = theMapOfAllergens.get(allergen);
        if (arrOfPossibleIngredients === undefined) {
            theMapOfAllergens.set(allergen, ingredients);
        } else {
            const newIngredients = intersect(ingredients, arrOfPossibleIngredients);
            if (newIngredients.length === 1) {
                for (const [key, value] of theMapOfAllergens) {
                    if (key === allergen) {
                        continue;
                    } else {
                        const index = value.indexOf(newIngredients[0]);
                        if (index === -1) {
                            continue;
                        } else {
                            value.splice(index, 1);
                        }
                    }
                }
            }
            theMapOfAllergens.set(allergen, newIngredients);
        }
    }
}

const dangerousIngredients = new Array(theMapOfAllergens.size);
const iteratorForMap = theMapOfAllergens.entries();
for (let i = 0; i < dangerousIngredients.length; i++) {
    dangerousIngredients[i] = iteratorForMap.next().value;
    dangerousIngredients[i][1] = dangerousIngredients[i][1][0];
}
let count = 0;
const justIngredients = dangerousIngredients.map(x => x[1]);
for (const [ingredients, _] of input) {
    for (const ingredient of ingredients) {
        if (justIngredients.includes(ingredient)) {
            continue;
        } else {
            count ++;
        }
    }
}
dangerousIngredients.sort((a, b) => a[0] < b[0] ? -1 : 1);
console.log(count);
console.log(dangerousIngredients.map(x => x[1]).reduce((acc, curr) => acc + "," + curr, "").slice(1));