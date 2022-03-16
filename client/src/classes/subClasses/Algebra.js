import Equations from "../Equations";

export default class Algebra extends Equations {

    constructor() { super(); }

    static Problem(min = 2, max = 10) {
        let varset = []; // Potential variables to use
        let nums = []; // Potential numbers to use

        // Populate randomly
        for (let i = 0; i < 100; i++) {
            nums.push(this.randNum(min, max));
            varset.push(this.randVar());
        }

        // Sets eliminate repeating values, convert back to array
        varset = Array.from(new Set(varset));

        const template = [
            {
                equation: `${nums[0]} + ${varset[0]} - ${nums[2]} = ${nums[1]}`,
                evaluation: `${nums[1]} - ${nums[0]} + ${nums[2]}`,
                task: `Solve for ${varset[0]}`,
            },  
            {
                equation: `${nums[0]}${varset[0]} = ${nums[1]}`,
                evaluation: `${nums[1]} / ${nums[0]}`,
                task: `Solve for ${varset[0]}`
            },
            {
                equation: `${nums[0]}${varset[0]} + ${nums[2]} = ${nums[1]}`,
                evaluation: `(${nums[1]} - ${nums[2]}) / ${nums[0]}`,
                task: `Solve for ${varset[0]}`,
            }
        ];

        return this.randItem(template);
    }
}