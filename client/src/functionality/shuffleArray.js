import Equations from "../classes/Equations"

// Shuffle a list using the Fisher-Yates Shuffle (Durstenfeld modern variation for computers)

/* NOTE: random numbers are generated on a uniform distribution.
Therefore, the shuffle is more likely to leave the first option as the answer comparative to statistical random. */

/* To combat this, the paramter 'n' can be used to define the number of shuffles to be performed, increasing the liklihood of the answers being shuffled. */

export default function shuffle(list, n = 1) {
    let counter = 0;
    do {
        for (let i = list.length - 1; i > 1; i--) {
            let j = Equations.randTo(i);
            swap(list, i, j);
        }
        counter++;
    } while (counter < n);
}

// Swap two list indices
function swap(list, a, b) {
    let temp = list[a];
    list[a] = list[b];
    list[b] = temp;
}