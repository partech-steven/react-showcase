/** Random Numbers Utility */
export default class RandomNumUtil{
    static getBetween(min, max, decimals = 2, base = 0) {
        return parseFloat((base + (Math.random() * (max - min) + min)).toFixed(decimals));
    }
}