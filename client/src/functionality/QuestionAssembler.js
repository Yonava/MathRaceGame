import Equations from "../classes/Equations"
import Levels from "../classes/Levels"
import Algebra from "../classes/subClasses/Algebra"
import Calculus from "../classes/subClasses/Calculus";
import Geometry from "../classes/subClasses/Geometry";
import Trigonometry from "../classes/subClasses/Trigonometry";
import shuffle from "./shuffleArray"

// Each entry i in numQuestions is a different level.
// The value of i is how many questions of that level to make
// numOptions specifies how many choices to create (for multiple choice)
export default function GenerateQuestions(numQuestions = [5, 5, 5, 5], numOptions = 4) {
    let questionObj;
    let output = [];

    for (let i = 0; i < numQuestions.length; i++) {
        // numQuestions[i] value specifies how many to create at level i
        for (let j = 0; j < numQuestions[i]; j++) {
            let options = [];
            let question;

            switch(i) {
                case 0:
                    question = Levels.levelOne();
                    question.value = 1;
                    break;
                case 1:
                    question = Levels.levelTwo();
                    question.value = 2;
                    break;
                case 2:
                    question = Levels.levelThree();
                    question.value = 3;
                    break;
                case 3:
                    question = Algebra.Problem();
                    question.value = 4;
                    break;
                case 4:
                    question = Geometry.Problem();
                    question.value = 4;
                    break;
                case 5:
                    question = Trigonometry.Problem();
                    question.value = 4;
                    break;
                case 6:
                    question = Calculus.Problem();
                    question.value = 4;
                    break;
                default:
                    throw new Error("Invalid question level.");
            }

            question.evaluation = question.evaluation ?? question.equation;
            question.task = question.task ?? "Evaluate";
            options.push(eval(question.evaluation));

            if (parseFloat(options[0]) % 1 != 0) options[0] = Number(parseFloat(options).toFixed(2));

            // Continue generating wrong answers for multiple choice up to numOptions
            for (let k = 0; k < (numOptions - 1); k++) {
                let newOption;
                let mixIn = 0;
                if (options[0] % 1 === 0) {
                    do {
                        newOption = Math.round((options[0] + mixIn) * Equations.randNum(0.5, 1.5, 2));
                        Math.random() < .5 ? mixIn++:mixIn--;
                    } while (options.includes(newOption));
                    options.push(newOption);
                } else {
                    do {
                        newOption = ((options[0] + mixIn) * Equations.randNum(0.5, 1.5, 2)).toFixed(2);
                        Math.random() < .5 ? mixIn++:mixIn--;
                    } while (options.includes(newOption));
                    options.push(Number(newOption));
                }
            }

            // The data for the question, including answers
            questionObj = {
                equation: `${Equations.toMathjax(question.equation)}`,
                task: question.task,
                answer: options[0],
                value: question.value,
                options
            };

            // 15x shuffle the order of the multiple choice options
            shuffle(questionObj.options, 15);

            output.push(questionObj);
        }
    }

    return output;
}