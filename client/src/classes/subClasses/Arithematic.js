import Equations from '../Equations'

export default class Arithmetic extends Equations {
    output = "";

    constructor() {
        super();
    }

    generateProblem() {
        this.output = "";
        this.output += this.numbers[this.randNum(10)];
        
        let loop = true;
        do {
            let index = 1;
            this.output += this.symbols[this.randNum(6)];

            if (this.output[index] == "^") this.output += "2";
            else this.output += this.numbers[this.randNum(10)];

            index += 2;
            
            let test = Math.random(); // [0, 1)
            if (test < 0.5) {
                loop = false;
            }

        } while (loop);

        return this.output;
    }

    // Generate a random number between 1 and the target
    randNum(amount) {
        return Math.round(Math.random() * (amount - 1) + 1);
    }
}