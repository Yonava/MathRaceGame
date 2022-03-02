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
}