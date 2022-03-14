export default class Equations {
    numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    symbols = ['+', '-', '*', '/', '^'];
    output=""; // Mathjax compatible formula for display purposes
    evalForm=""; // Plain formula for backend evaluation purposes

    constructor() {}

    generateProblem() {
        throw new Error("Error! Derived class must implement problem generation!");
    }

    // Generate a random number between 0 and the target
    randNum(amount) {
        return Math.round(Math.random() * amount);
    }

    toMathjax(formula) {
        // Make compatible with Mathjax
        for (let i = 0; i < formula.length; i++) {
            //Multiplication
            if (formula[i] == "*") formula = formula.replace(formula[i], "\\cdot");
            //Division
            else if (formula[i] == "/") {
                // Get numbers to put on either side of division
                let firstNum = formula[i - 1];
                let secondNum = formula[i + 1];

                // Piece to remove
                let removeSlice = formula.slice(i - 1, i + 2);
                let replaceSlice = "{" + firstNum + "\\over" + secondNum + "}";
                formula = formula.replace(removeSlice, replaceSlice);

                console.log("FOUND");
            }
        }

        formula = "$$" + formula + "$$";

        return formula;
    }
}