import DraggableComponent from "../components/util/DraggableComponent";
import { Tweet } from 'react-twitter-widgets';

/** String Utility */
export default class TwitterUtil {

    /**
     * Uppercase only the first character of a string
     *
     * @param string
     * @returns {string}
     */
    static createTwitterFeedDom(tweets, areDraggable = false) {
        return tweets = tweets.map((tweet, key) => {
            let tweetDom = <Tweet tweetId={tweet.id}/>;
            if(!areDraggable) {
                return tweetDom;
            } else {
                return(
                    <DraggableComponent 
                        key={key}
                        uniqueKey={key.toString()}
                        className={"draggable-tweet"}
                        content={tweetDom}
                        index={key}
                    />
                )
            }
        })
    }
}