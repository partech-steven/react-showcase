export default class TwitterUtil {
    static getTimeline(screenname) {
        console.log(screenname)
        return(
            <div key="twitter-timeline" className="twitter-timeline">
                {screenname ? "Here be the Twitter timeline for : @" + screenname : "No screenname specified. Unable to retrieve Twitter timeline."}
            </div>
        );
    }
}