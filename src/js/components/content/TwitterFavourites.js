import React, { Component } from "react";
import { Droppable } from 'react-beautiful-dnd';
import DraggableComponent from "../util/DraggableComponent";
import { TwitterTweetEmbed } from "react-twitter-embed";
import Notification from "../util/Notification";

class TwitterFavourites extends Component {
    //When people stop dragging things around
    onDragEnd(result) {
        const { source, destination, type } = result;
        let components = this.state.components;
        console.log(result)
        // dropped outside the list
        if (!destination) {
        return;
        }

        if(source.droppableId === destination.droppableId) {
        if(type === "CONTENT") {
            components = this.reorder(
            this.state.components,
            source.index,
            destination.index
            );
        }
        }

        this.setState({
        components,
        });
    }

    render() {
        return (
            <Droppable droppableId="tweets-favourites" direction="vertical" type="TWEETS">
                {(provided) => (
                    <div className="twitter-feed"  {...provided.droppableProps} ref={provided.innerRef}>
                        {!this.props.tweets 
                            ? <Notification message={"No favourites selected yet"} />
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

export default TwitterFavourites;