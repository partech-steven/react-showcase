import DateTimeUtil from "./DateTimeUtil";

/** DateTime Utility */
export default class TimeUtil {
    /**
     * Convert minutes to hours and minutes
     * 
     * @param {any} minutes
     * @param {any} notation
     */
    static minutesToHoursMinutes(minutes, notation="classic") {
        let num = minutes;
        let hours = (num / 60);
        let rhours = DateTimeUtil.prependDigit(Math.floor(hours));
        let min = (hours - rhours) * 60;
        let rmin = DateTimeUtil.prependDigit(Math.round(min));
        let returnString = "";

        switch (notation) {
            default:
            case "classic":
                returnString = rhours + ":" + rmin;
                break;
            case "visual":
                returnString = rhours + "h" + rmin + "m";
                break;
        }

        return returnString;
    }
}