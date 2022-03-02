export default class Equations {
    numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    symbols = ['+', '-', '*', '/', '^'];

    constructor() {}

    generateProblem() {
        throw new Error("Error! Derived class must implement problem generation!");
    }
}