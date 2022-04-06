import Equations from '../Equations';

export default class Geometry extends Equations {

    constructor() { super(); }

    static Problem() {
        // Create dimensions of a shape
        let precision = this.randNum(0, 2);
        let length = this.randNum(1, 20, precision);
        let width = this.randNum(1, 20, precision);
        let height = this.randNum(1, 20, precision);

        // Define if shape is a square or retangle
        let type2D = (length === width) ? "square" : "rectangle";
        let type3D = (length === width && length === height) ? "cube" : "rectangular prism"

        // Change message based on square or retangle
        let msg2D = (type2D === "square") ? ` side length ${length}` : ` length ${length} and width ${width}`;
        let msg3D = (type3D === "cube") ? ` side length ${length}` : ` length ${length}, width ${width}, and height ${height}`;

        // Create questions
        const template = [
            {
                equation: "",
                evaluation: `${length} * ${width}`,
                task: `Find the area of the ${type2D} with ${msg2D}.`
            },
            {
                equation: "",
                evaluation: `${length} * ${width} * ${height}`,
                task: `Find the volume of the ${type3D} with ${msg3D}.`
            },
            {
                equation: "",
                evaluation: `(${length} * ${height}) / 2`,
                task: `Find the area of the triangle with base ${length} and height ${height}.`
            }
        ];

        return this.randItem(template);
    }
}