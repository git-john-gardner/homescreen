const { sin, cos, PI } = Math

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

/**
 * Get a point on a circle centered at [0, 0]
 * 
 * @param {number} turns angle in turns
 * @param {number} r radius of circle
 * @returns an [x, y] point on the circle centered at [0, 0]
 */
const pointOnCircle = (turns, r = 1) => {
    return {
        x: r * sin(turns * 2 * PI),
        y: r * cos(turns * 2 * PI)
    }
}

export { createNThings, pointOnCircle }