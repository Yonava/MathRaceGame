import Equations from "../Equations"

export default class Arithmetic extends Equations {

    constructor() { super(); }

    static BaseEq(operator, minOperand = null, maxOperand = null, precision = 0) {
        if (!this.operators.includes(operator)) throw new Error("Invalid Operator");

        // Set min and max if not given
        if (minOperand === null && maxOperand === null) {
            switch (operator) {
                case '+':
                    minOperand = 1;
                    maxOperand = 20;
                    break;
                case '-':
                    minOperand = 1;
                    maxOperand = 20;
                    break;
                case '*':
                    minOperand = 2;
                    maxOperand = 12;
                    break;
                case '/':
                    minOperand = 2;
                    maxOperand = 10;
                    break;
            }
        }
        else if (minOperand === null || maxOperand === null) {
            throw new Error("If Min or Max is passed in, both must be passed in")
        }

        return `${this.randNum(minOperand, maxOperand, precision)}${operator}${this.randNum(minOperand, maxOperand, precision)}`;
    }

    // a^b -- get a random a and random b in their respective ranges
    static ExpoEq(min, max, minExp = 0, maxExp = 2, precision = 0) {
        return `${this.randNum(min, max, precision)}**${this.randNum(minExp, maxExp)}`;
    }

    // TODO: Finish method
    // (expr)^b i.e. (12+7)^2
    static ExpoExpr(expr, minExp = 0, maxExp = 2) {
        let pow = this.randNum(minExp, maxExp);
        return {
            equation: `(${expr})**${pow}`,
            evaluation: `${eval(expr)**pow}`
        }
    }

    // Sqrt eq -- get a random num in range [min, max]
    static SqrtEq(min, max, precision = 0) {
        const number = this.randNum(min, max, precision);

        // Catch negative numbers
        if(min < 0 || max < 0) throw new Error("Invalid sqrt argument: cannot be a negative number.");

        return `Math.sqrt[[${number}]]`;
    }
}