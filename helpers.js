/**  
* Create an array of n objects
*
* @param n the number of things to create
* @param thing a function that takes an index and returns an object
* @return an array of the n created objects
*/
const createNThings = (n, thing) => {
    return new Array(n).fill(0).map((val, idx) => thing(idx));
};

// export { createNThings }