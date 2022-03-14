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
}