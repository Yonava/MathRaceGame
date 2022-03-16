import Equations from "./Equations";
import Arithmetic from "./subClasses/Arithematic";

export default class Levels extends Equations {

    constructor() { super(); }

    static levelOne() {
        const template = [
            {
                equation: `${Arithmetic.BaseEq(this.randItem(this.operators))}`
            },
            {
                // random num in [0, 12] to a power in [0,2]
                equation: `${Arithmetic.ExpoEq(2, 12)}`
            },
            {
                // Decimals
                equation: `${Arithmetic.BaseEq(this.randItem(this.operators), 0.1, 2.5, 2)}`
            }
        ];

        return this.randItem(template);
    }

    // Introducing Order of Operations and basic Sqrt
    static levelTwo() {
        // Choose which perfect square to use for sqrt eq
        let root = this.randItem(this.squares);

        const template = [
            {
                equation: `${this.randNum(5,15)} + ${Arithmetic.BaseEq('*', 2, 10)}`
            },
            {
                equation: `${this.randNum(2, 7)} - ${Arithmetic.BaseEq('*', 2, 10)}`
            },
            {
                // random num in [3, 9] cubed
                equation: `${Arithmetic.ExpoEq(3, 9, 3, 3)}`
            },
            {
                equation: `${Arithmetic.SqrtEq(root, root)} + ${Arithmetic.BaseEq("-", 2, 20)}`,
            }
        ];
        
        return this.randItem(template);
    }

    // Introduce Algebra and more complex expressions, such as nested equations w exponents
    static levelThree() {
        // Uses random power in [0, 2]
        let eqObj = Arithmetic.ExpoExpr(Arithmetic.BaseEq('+', 1, 9), 0, 2);

        const template = [
            {
                equation: `${eqObj.equation}`,
                evaluation: `${eqObj.evaluation}`
            },
        ];

        return this.randItem(template);
    }
}