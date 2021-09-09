import React, { Component } from "react";
import { Droppable } from 'react-beautiful-dnd';
import DraggableComponent from "../util/DraggableComponent";
import { TwitterTweetEmbed } from "react-twitter-embed";
import Notification from "../util/Notification";

class TwitterFavourites extends Component {
    shouldComponentUpdate(prevProps, prevState) {
        let shouldUpdate = false;
        if(prevProps.tweets !== this.props.tweets) {
            shouldUpdate = true;
        }
        return shouldUpdate;
    }

    render() {
        return (
            <Droppable droppableId="tweets-favourites" direction="vertical" type="TWEETS">
                {(provided) => (
                    <div className="twitter-feed"  {...provided.droppableProps} ref={provided.innerRef}>
                        {this.props.tweets.length === 0 
                            ? <Notification message={"No favourites selected yet"} />
                            : this.props.tweets.map((tweet, key) => {
                                console.log(tweet.id)
                                return(
                                    <DraggableComponent 
                                        key={key + "-favourite"}
                                        uniqueKey={key.toString() + "-favourite"}
                                        className={"draggable-tweet"}
                                        content={<TwitterTweetEmbed tweetId={tweet.id}/>}
                                        index={key}
                                    />
                                )
                            })
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    }
};

export default TwitterFavourites;