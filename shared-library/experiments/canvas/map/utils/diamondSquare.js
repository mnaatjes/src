/**
 * @function diamondSquare
 * 
 * @param {Number} size - Dimension of square; MUST be 2^n + 1
 * @param {Number} roughness - Controls the variation of height; values 0.0 - 1.0; smoother closer to 0.0
 * @param {Object} range - object containing ranges
 * @param {Number} range.max - Top value for range; default = 1.0
 * @param {Number} range.min - Bottom value for range; default = 0.0
 * @param {Number} range.step - steps for normalizing; default = 0.25
 * @param {Number} [seed]
 * 
 * @property {Number} side - Size adjusted to 2^n + 1 if size != 2^n + 1
 * @property {Array} grid - 2D array grid generated from side value on which to perform algorithm; init array with values of 0
 * @property {Number} step - Equals 2^n; divided in half every iteration until <= 1
 * @property {Number} half - Equals center (init 2^n / 2) of square / diamond
 */
export function diamondSquare(size, roughness, range={min: 0.0, max: 1.0, step: 1.0}, seed){
    const scale = 0.125;
    /**
     * Validate size:
     * If value != 2^n + 1 --> find closest value
     */
    const side = Math.pow(2, Math.ceil(Math.log2(size - 1))) + 1;
    const grid = Array(side).fill(null).map(() => Array(side).fill(0));
    /**
     * Initialize values to 4 corners of main square
     */
    grid[0][0]                  = normalizeRange(getRandomRange(range), range);
    grid[0][side - 1]           = normalizeRange(getRandomRange(range), range);
    grid[side - 1][0]           = normalizeRange(getRandomRange(range), range);
    grid[side - 1][side - 1]    = normalizeRange(getRandomRange(range), range);
    /**
     * Init step value
     * Perform loop until step <= 1
     */
    let step = side - 1;
    while(step > 1){
        /**
         * Define half (center) value
         */
        const half = step / 2;
        /**
         * Perform Square Step
         */
        for(let y = half; y < side; y += step){
            for(let x = half; x < side; x += step){
                /**
                 * Define Points
                 */
                const a = grid[y - half][x - half];
                const b = grid[y - half][x + half];
                const c = grid[y + half][x - half];
                const d = grid[y + half][x + half];
                /**
                 * Average 4 defined corners of square
                 */
                const avg = (a + b + c + d) / 4;
                /**
                 * Use average and roughness as scale constant
                 * Clamp value to range
                 * Normalize Value
                 * Assign value to center
                 */
                grid[y][x] = normalizeRange(
                    scaleConstant(avg, roughness, step, range, scale),
                    range
                );
            }
        }
        /**
         * Perform Diamond Step:
         * 1) Find the midpoints of the grid: e.g. side = 5, (x: 0, y: 2), (x: 2 ,y: 0), (x: 4, y: 2), (x: 2, y: 4)
         * 2) Average Diamond Values; 
         *      NOTE! modulo operator will return positive number for negative value
         *      which occurs when a point (A, B, C, or D) is off the grid
         *      Returned coodinate (e.g. [0, 3]) has value of 0
         * 3) Assign value to midpoints
         */
        for(let y = 0; y < side; y += half){
            for(let x = (y + half) % step; x < side; x += step){
                const a = grid[(y - half + side) % side][x];
                const b = grid[(y + half) % side][x];
                const c = grid[y][(x + half) % side];
                const d = grid[y][(x - half + side) % side];
                /**
                 * Average Values
                 */
                const avg = (a + b + c + d) / 4;
                /**
                 * Assign average to midpoint with scale constant
                 */
                grid[y][x] = normalizeRange(
                    scaleConstant(avg, roughness, step, range, scale),
                    range
                );
            }
        }
        /**
         * Divide/Reduce step
         */
        step /= 2;
    }
    /**
     * Return generated grid
     */
    return grid;
}
/**
 * @function scaleConstant
 * @param {Number} avg - average from diamond-square coords
 * @param {Number} roughness - from diamondSquare function
 * @param {Number} step - from diamondSquare function loop
 * @param {Object} range - object containing ranges
 * @param {Number} range.max - Top value for range; default = 1.0
 * @param {Number} range.min - Bottom value for range; default = 0.0
 * @param {Number} range.step - steps for normalizing; default = 0.25
 * @param {Number} [scale] - default: 0.5
 * 
 * @property {Function} getRandomRange - returns random number from min, max range
 * 
 * @returns {Number} - scale constant value
 */
function scaleConstant(avg, roughness, step, range={min: 0.0, max: 1.0, step: 0.25}, scale=0.5){
    return (avg + (getRandomRange(range) - scale)) * roughness * step;
}
/**
 * @function getRandomRange
 * @param {Object} range - object containing ranges
 * @param {Number} range.max - Top value for range; default = 1.0
 * @param {Number} range.min - Bottom value for range; default = 0.0
 * @param {Number} range.step - steps for normalizing; default = 0.25
 * @returns {Number} - Randomly generated number
 */
function getRandomRange(range={min: 0.0, max: 1.0, step:0.25}){
    return Math.random() * (range.max - range.min) + range.min;
}
/**
 * @function normalizeRange
 * @param {Number} num - number to be normalized
 * @param {Object} range - object containing ranges
 * @param {Number} range.max - Top value for range; default = 1.0
 * @param {Number} range.min - Bottom value for range; default = 0.0
 * @param {Number} range.step - steps for normalizing; default = 0.25
 * @returns {Number} - normalized value
 */
function normalizeRange(num, range={min: 0.0, max: 1.0, step: 0.25}){
    /**
     * Clamp value
     */
    const clamped = num > range.max ? range.max : 
                    num < range.min ? range.min: 
                    num;
    /**
     * Round and return normalized value
     */
    return Math.round(clamped / range.step) * range.step;
}
/**
 * @function printDiamondSquare
 */
export function printDiamondSquare(arr){
    for(let y = 0; y < arr.length; y++){
        let row = "";
        for(let x = 0; x < arr[0].length; x++){
          row += arr[y][x] + ' | ';
        }
        console.log(row);
    }
}