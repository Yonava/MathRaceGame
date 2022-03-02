import Equations from '../Equations'

export default class Arithmetic extends Equations {

    constructor() {
        super();
    }

    generateProblem() {
        this.evalForm = "";
        this.evalForm += this.numbers[this.randNum(9)];
        
        let loop = true;
        let index = 1;
        do {
            this.evalForm += this.symbols[this.randNum(4)];
            
            // For arithmetic, only powers of 2 are currently allowed (for speed and simplicity of the race questions)
            if (this.evalForm[index] == "^") this.evalForm += "2";
            else this.evalForm += this.numbers[this.randNum(9)];

            index += 2;
            
            let test = Math.random(); // [0, 1)
            if (test < 0.5) {
                loop = false;
            }

        } while (loop);

        // Get display compatible form
        this.output = this.toMathjax(this.evalForm);

        return this.output;
    }

    toMathjax(formula) {
        // Make compatible with Mathjax
        for (let i = 0; i < formula.length; i++) {
            if (formula[i] == "*") formula = formula.replace(formula[i], "\\cdot");
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

        return formula;
    }
}