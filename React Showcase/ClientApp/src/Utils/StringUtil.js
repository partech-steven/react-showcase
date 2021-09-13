/** String Utility */
export default class StringUtil {

    /**
     * Uppercase only the first character of a string
     *
     * @param string
     * @returns {string}
     */
    static uppercaseFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();;
    }
}