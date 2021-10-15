import React from 'react';
import { Tweet } from 'react-twitter-widgets';
import DraggableComponent from '../components/Util/DraggableComponent';

/** String Utility */
export default class TwitterUtil {

    /**
     * Uppercase only the first character of a string
     *
     * @param string
     * @returns {string}
     */
    static createTwitterFeedDom(tweets, areDraggable = false) {
        return tweets = tweets.map((tweetId, key) => {
            let tweetDom = <Tweet tweetId={tweetId}/>;
            if(!areDraggable) {
                return tweetDom;
            } else {
                return (
                    <DraggableComponent
                        key={tweetId}
                        uniqueKey={tweetId}
                        props={
                            {
                                index: key,
                                className: "draggable-tweet"
                            }
                        }
                    >
                        {tweetDom}
                    </DraggableComponent>
                )
            }
        })
    }
}