const { sin, cos, PI, max, min } = Math

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

/**
 * Get a clean string representation of a table
 * 
 * @param table array of columns to space
 * @param sep column separator
 * @returns a string of the table properly spaced
 * 
 * @example
 * evenlySpaced([['hello', 1], ['world!', 23]])
 * >>> 'hello  :  1
 *      world! : 23' 
 */
const evenlySpaced = (table, sep = " : ") => {
    if (table.length === 0) return

    // convert contents to strings
    table = table.map(row => row.map(String))

    let maxes = table[0].map(col => 0)
    table.forEach(row => {
        row.forEach((col, idx) => {
            maxes[idx] = max(col.length, maxes[idx])
        })
    })

    return table.map(
        row => row.map(
            (col, idx) => col.padStart(maxes[idx])
        ).join(sep)
    ).join("\n")
}

export { createNThings, pointOnCircle, evenlySpaced }