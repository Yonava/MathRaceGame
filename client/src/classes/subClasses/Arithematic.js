import Equations from '../Equations'

export default class Arithmetic extends Equations {
    symbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '^', '.'];
    output = "";

    constructor() {
        super();
    }

    generateProblem() {
        let len = Math.round((Math.random() * 10) + 1);
        
        for (let i = 0; i < len; i++) {
            let index = Math.round((Math.random() * 14) + 1);
            console.log(index);

            this.output += this.symbols[index];
        }

        return this.output;
    }
}