import React, { Component } from "react";
import { Droppable } from 'react-beautiful-dnd';
import TwitterUtil from "../../Utils/TwitterUtil";
import Notification from "../Util/Notification";

class TwitterFavourites extends Component {
    render() {
        return (
            <Droppable droppableId="tweets-favourites" direction="vertical" type="TWEETS">
                {(provided) => (
                    <div className="twitter-feed"  {...provided.droppableProps} ref={provided.innerRef}>
                        {this.props.tweets.length === 0
                            ? <Notification message={"No favourites selected yet"} />
                            : TwitterUtil.createTwitterFeedDom(this.props.tweets, true)
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    }
};

export default TwitterFavourites;