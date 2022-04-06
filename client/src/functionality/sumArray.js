// Requires array elements to be a numerical type
export default function sumArray(inArray) {
    let sum = 0;
    inArray.forEach(element => {
        sum += element;
    });

    return sum;
}