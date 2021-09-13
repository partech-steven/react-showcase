import React, { Component } from "react";
import { Droppable } from 'react-beautiful-dnd';
import TwitterUtil from "../../Utils/TwitterUtil";
import Spinner from "../Util/Spinner";

class TwitterFeed extends Component {
    render() {
        return (
            <Droppable droppableId="tweets" direction="vertical" type="TWEETS">
                {(provided) => (
                    <div className="twitter-feed"  {...provided.droppableProps} ref={provided.innerRef}>
                        {this.props.tweets.length === 0
                            ? <Spinner message={"Fetching tweets for @" + this.props.screenName} />
                            : TwitterUtil.createTwitterFeedDom(this.props.tweets, true)
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    }
};

export default TwitterFeed;