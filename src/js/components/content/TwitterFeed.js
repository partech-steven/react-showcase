import React, { Component } from "react";
import Spinner from '../util/Spinner';
import { Droppable } from 'react-beautiful-dnd';
import DraggableComponent from "../util/DraggableComponent";
import { TwitterTweetEmbed } from "react-twitter-embed";

class TwitterFeed extends Component {
    render() {
        return (
            <Droppable droppableId="tweets" direction="vertical" type="TWEETS">
                {(provided) => (
                    <div className="twitter-feed"  {...provided.droppableProps} ref={provided.innerRef}>
                        {!this.props.tweets 
                            ? <Spinner message={"Fetching tweets for @" + this.props.screenName} />
                            : this.props.tweets.data.map((tweet, key) => {
                                return(
                                    <DraggableComponent 
                                        key={key}
                                        uniqueKey={key.toString()}
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

export default TwitterFeed;