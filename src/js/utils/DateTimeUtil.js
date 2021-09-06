/** DateTime Utility */
export default class DateTimeUtil {
    /**
     * Prepends a digit lower than 10 with a 0
     * @param digit
     *
     * @return integer
     */
    static prependDigit(digit) {
        return (digit < 10) ? "0"+digit : digit;
    }

    /**
     * Get today, conform to the API format (YYYY-MM-DD)
     *
     * @return string
     */
    static getToday(format = "yyyy-MM-dd")
    {
        return this.getDate(format, 0);
    }

    /**
     * Get tomorrow, conform to the API format (YYYY-MM-DD)
     *
     * @return string
     */
    static getTomorrow(format = "yyyy-MM-dd") {
        return this.getDate(format, 1);
    }

    /**
     * Get yesterday, conform to the API format (YYYY-MM-DD)
     *
     * @return string
     */
    static getYesterday(format = "yyyy-MM-dd") {
        return this.getDate(format, -1);
    }

    static getDaysFromNow(days, format = "yyyy-MM-dd") {
        return this.getDate(format, days);
    }

    /**
     * Returns a date, with given format and any adjustments (add or retract [x] days)
     *
     * @param format
     * @param adjustment
     * @returns {string}
     */
    static getDate(format = "yyyy-MM-dd", adjustment) {
        let date = new Date();
        date.setDate(date.getDate() + adjustment);

        let dateString = format.replace("yyyy", date.getFullYear())
                               .replace("MM", this.prependDigit(date.getMonth() + 1))
                               .replace("dd", this.prependDigit(date.getDate()))
                               .replace("kk", this.prependDigit(date.getHours()))
                               .replace("mm", this.prependDigit(date.getMinutes()))
                               .replace("ss", this.prependDigit(date.getSeconds()))
                               .replace("A", this.prependDigit(date.getMilliseconds()))

        return dateString;
    }

    /**
     * Convert a date to local time
     *
     * @param timestamp
     * @returns {string}
     */
    static convertToLocal(timestamp) {
        if(timestamp !== null && timestamp !== undefined) {
            let timezoneOffset = -((new Date()).getTimezoneOffset() / 60);
            let localDateTime = new Date(new Date(timestamp) - (new Date()).getTimezoneOffset() * 60000).toISOString().replace(".000Z", "+" + this.prependDigit(timezoneOffset) + ":00");

            return localDateTime;
        } else {
            return "-";
        }
    }

    /**
     * Get the current time
     *
     * @param showSeconds
     * @returns {string}
     */
    static getCurrentTime(showSeconds = false) {
        let now = new Date();
        let currentTime = this.prependDigit(now.getHours()) + ":" + this.prependDigit(now.getMinutes());
        if(showSeconds) { currentTime += ":" + this.prependDigit(now.getSeconds())}

        return currentTime;
    }

    /**
     * Returns the difference in days between two dates (positive result = days to go, negative result = days after),
     *
     * @param dateFrom
     * @param dateTo
     * @returns {number}
     */
    static getDayDifference(dateFrom, dateTo) {
        //Check if the dates are valid before continuing
        if(dateFrom !== null && dateFrom !== undefined && dateTo !== null && dateTo !== undefined) {
            let oneDay = 24 * 60 * 60 * 1000; //Hours*minutes*seconds*milliseconds

            if(typeof(dateFrom) === "string") {
                dateFrom = new Date(dateFrom);
            }

            if(typeof(dateTo) === "string") {
                dateTo = new Date(dateTo);
            }

            dateFrom = new Date(dateFrom.getYear(), dateFrom.getMonth()+1, dateFrom.getDate());
            dateTo = new Date(dateTo.getYear(), dateTo.getMonth()+1, dateTo.getDate());

            return Math.round(Math.abs((dateFrom - dateTo) / oneDay));
        } else {
            console.warn("the 'getDayDifference' functions requires two valid dates: 'null' or 'undefined' values found");
        }
    }

    static toIso(dateString)
    {
        let date = new Date(dateString);
        if(this.checkValidDate(date, dateString)) {
            return date.toISOString().replace(/\.000Z$/, '+00:00')
        }
    }

    static isFirstOfMonth(dateString)
    {
        var date = new Date(dateString);
        if(this.checkValidDate(date, dateString)) {
            return (date.getDate() === 1);
        }
    }

    static setFirstOfMonth(dateString)
    {
        var date = new Date(dateString);
        if(this.checkValidDate(date, dateString)) {
            return new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1));
        }
    }

    static checkValidDate(date, dateSourceString = "") {
        if(date.toString().toLowerCase() !== "invalid date") {
            return true;
        } else {
            if(dateSourceString !== "") {
                console.warn("Invalid date from string: '" + dateSourceString + "'")
            }

            return false;
        }
    }
}