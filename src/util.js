// this function takes some data to do something on it 
export const sortData = (data) => {

    // sortedData takes copy to array
    const sortedData = [...data];

    // sort function here: take two thing a and b and do comparison between them and sort them based on the comparison
    // here will comparison based on the number of cases
    sortedData.sort((a, b) => {
        if (a.cases > b.cases) {
            // here is -1 means false
            return -1;
        } else {
            return 1;
        }
    })
    return sortedData;
};


// this is deffrant way to write function

/* export const sortData = (data) => {
     const sortedData = [...data];
     return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
}
*/
