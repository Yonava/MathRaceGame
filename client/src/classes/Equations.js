export default class Equations {
    static vars = ['a', 'b', 'c', 'n', 'x', 'y', 'z'];
    static operators = ['+', '-', '*', '/'];
    static squares = [0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100,
        121, 144, 169, 196, 225, 256, 289, 324, 361, 400];

    constructor() {}

    // Generate a random number between 'min' and 'max'
    static randNum(min, max, precision = 0) {
        // [0,1) * (size of range) + min -> scales [0,1) to proper range
        let output = (Math.random() * (max - min)) + min;
        return output.toFixed(precision); // Decimal places
    }
    // Generate a random number in the interval [0, max]
    static randTo(max) {
        return Math.round(Math.random() * max);
    }
    // Get a random index of a list
    static randItem(list) {
        return list[Math.floor(Math.random() * list.length)];
    }   
    // Get a random variable
    static randVar() {
        return this.vars[Math.floor(Math.random() * this.vars.length)];
    }

    static toMathjax(formula) {
        // Make compatible with Mathjax
        for (let i = 0; i < formula.length; i++) {
            // Multiplication
            if (formula[i] == "*" && formula[i + 1] != "*") formula = formula.replace(formula[i], "\\cdot");
            // Exponents
            else if (formula[i] == "*" && formula[i + 1] == "*") formula = formula.substr(0, formula[i]) + "^" + formula.substr(formula[i + 2]);
            // Squareroots
            else if (formula[i] == "S") formula = formula.substr(0, formula[i]) + "\\sqrt{" + formula.substr(formula[i + 1]) + "}";
            // Division
            else if (formula[i] == "/") {
                // Get numbers to put on either side of division
                let firstNum = formula[i - 1];
                let secondNum = formula[i + 1];

                // Piece to remove
                let removeSlice = formula.slice(i - 1, i + 2);
                let replaceSlice = "{" + firstNum + "\\over" + secondNum + "}";
                formula = formula.replace(removeSlice, replaceSlice);
            }
        }

        formula = "$$" + formula + "$$";

        return formula;
    }
}