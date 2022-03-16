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
        return Number.parseFloat(output).toFixed(precision); // Decimal places
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

    // Make compatible with Mathjax
    static toMathjax(formula) {
        
        //Divison
        // EDGE CASES WILL BREAK (i.e. decimals, multi-digit numbers) - IN PROGRESS
        if (formula.includes("/")) {
            formula = formula.replace("/", "\\over ");
        }
        // Squareroots
        if (formula.includes("Math.sqrt")) {
            formula = formula.replace("Math.sqrt(", "\\sqrt{");
            formula = formula.replace(")", "}");
        }
        // Exponents
        if (formula.includes("**")) formula = formula.replace("**", "^");
        // Multiplication
        for (let i = 0; i < formula.length; i++) {
            if (formula[i] == "*" && formula[i + 1] != "*") formula = formula.replace(formula[i], "\\cdot");
        }

        formula = "$$" + formula + "$$";

        return formula;
    }
}