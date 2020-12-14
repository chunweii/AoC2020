const modulo = (a, b) => ((a % b) + b) % b;

const gcd = (a, b) => (a < b) 
                        ? gcd(b, a) 
                        : a === 0 
                            ? (b === 0 ? NaN : a) 
                            : (b === 0 ? a : gcd(modulo(a, b), b));

const xgcd = (a, b) => {
    if (a < b) {
        const flipped = xgcd(b, a);
        return [flipped[1], flipped[0], flipped[2]];
    }

    if (b === 0) {
        return a === 0 ? [NaN, NaN, NaN] : [1, 0, a];
    }

    const temp = xgcd(b, modulo(a, b));
    const x = temp[0];
    const y = temp[1];
    const d = temp[2];
    return [y, x - y * Math.floor(a / b), d];
};

const multiplicativeInverse = (a, b) => {
    const theXGCD = xgcd(b, a);
    return theXGCD[2] === 1 ? modulo(theXGCD[1], b) : NaN;
};

const chineseRemainder = (...arr) => { // arr is [[a_1, b_1], [a_2, b_2], ...] where each array means x \equiv a_i mod b_i
    const product = arr.reduce((acc, curr) => acc * curr[1], 1);
    const arrOfTerms = arr.map((x, i) => {
        let result = 1;
        for (let k = 0; k < arr.length; k++) {
            if (k === i) {continue;}
            result *= arr[k][1];
        }
        return result;
    });
    return arrOfTerms.map((x, i) => x * modulo(
                                            multiplicativeInverse(
                                                modulo(x, arr[i][1])
                                                , arr[i][1]) * arr[i][0],
                                            arr[i][1]))
                    .reduce((acc, curr) => acc + curr, 0) % product;
};

module.exports = {
    modulo: modulo,
    gcd: gcd,
    xgcd: xgcd,
    multiplicativeInverse: multiplicativeInverse,
    chineseRemainder: chineseRemainder
}
