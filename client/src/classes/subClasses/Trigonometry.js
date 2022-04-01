import Equations from "../Equations";

export default class Trigonometry extends Equations {

    constructor() { super(); }

    // Defaults to radians
    static Problem(form = 'r') {
        let trigFuncs = ["sin", "cos"];
        let values;
        let unit;

        // Degrees
        if (form === "d" || form === "D") {
            values = ["0", "90", "180", "270", "360"];
            unit = this.randItem(values);
        }
        else if (form === "r" || form === "R") {
            values = ["0", "pi/2", "pi", "3pi/2", "2pi"];
            unit = this.randItem(values);
            unit = unit.replace(/pi/g, "Math.PI");
        }
        else {
            throw new Error(`Invalid value '${form}' for trigonometry!`);
        }

        let item = this.randItem(trigFuncs);
        let num = this.randNum(1, 10);

        const template = [
            {
                equation: `${num}${item}[{${unit}}]`,
                evaluation: `Math.${item}(0) * ${num}`,
                // evaluation: `Math.${item}(${unit}) * ${num}`,
                task: "Evaluate"
            }
        ];

        return this.randItem(template);
    }
}