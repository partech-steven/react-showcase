/** Colours Utility */
export default class ColoursUtil{
    /**
     * Solution slightly modified from the accepted answer of 'https://stackoverflow.com/questions/23277585/javascript-pick-a-random-hex-color-between-a-start-and-end-color'
     * Function takes two strings in the default hex-format (e.g.: #f0f)
     * */
    static getBetween(hex1, hex2) {
        let rgb1 = this.extractRGBFromHex(hex1);
        let rgb2 = this.extractRGBFromHex(hex2);

        var rgb3 = [];
        for (let i = 0; i < 3; i++) rgb3[i] = rgb1[i] + Math.random() * (rgb2[i] - rgb1[i]) | 0;

        let newColour = "#" + rgb3
            .map(function (n) { return n.toString(16) })
            .map(function (s) { return "00".slice(s.length) + s }).join('');
        return newColour;
    }

    //Takes a hex-string and converts it to an RGB integer
    static extractRGBFromHex(hex) {
        return hex.match(/\w\w/g).map(function (b) { return parseInt(b, 16) });
    }
}