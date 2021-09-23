import React, { Component } from "react";
import { Droppable } from 'react-beautiful-dnd';
import TwitterUtil from "../../../Utils/TwitterUtil";
import Notification from "../../Util/Notification";
import Spinner from "../../Util/Spinner";

import './twitterfeed.css';

export class TwitterFeed extends Component {
    render() {
        return (
            <Droppable droppableId={this.props.droppableId} direction="vertical" type="TWEETS">
                {(provided) => (
                    <div className="twitter-feed"  {...provided.droppableProps} ref={provided.innerRef}>
                        {this.props.tweets.length === 0
                            ? (this.props.droppableId === "tweets") ? <Spinner message={"Fetching tweets for @" + this.props.screenName} /> : <Notification message="No favourites dragged here yet." />
                            : TwitterUtil.createTwitterFeedDom(this.props.tweets, true)
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    }
};