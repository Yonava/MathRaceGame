import Equations from "../Equations";

export default class Calculus extends Equations {

    constructor() { super(); }

    static Problem() {
        let number = this.randNum(1, 100);

        const template = [
            {
                equation: `${(number != 1) ? number : ""}`,
                evaluation: `0`,
                task: "Find the derivative of:"
            },
            {
                equation: `${(number != 1) ? number : ""}${this.randItem(this.vars)}`,
                evaluation: `${number}`,
                task: "Find the derivative of:"
            }
        ];

        return this.randItem(template);
    }
}