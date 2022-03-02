import Equations from "../Equations";

export default class Algebra extends Equations {
    symbols = super.symbols.push(["=", "."]);
    output = "";

    constructor() {
        super()
    }

    generateProblem() {}
}