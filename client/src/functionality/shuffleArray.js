import Equations from "../classes/Equations"

// Shuffle a list using the Fisher-Yates Shuffle (Durstenfeld modern variation for computers)
export default function shuffle(list) {
    for (let i = list.length - 1; i > 1; i--) {
        let j = Equations.randNum(0, i);
        swap(list, i, j)
    }
}

// Swap two list indices
function swap(list, a, b) {
    let temp = list[a];
    list[a] = list[b];
    list[b] = temp;
}