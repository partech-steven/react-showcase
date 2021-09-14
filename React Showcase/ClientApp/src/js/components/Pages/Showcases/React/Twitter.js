import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { ContactForm } from '../../../Content/ContactForm';
import TwitterFeed from '../../../Content/TwitterFeed';
import DraggableComponent from '../../../Util/DraggableComponent';
import Spinner from '../../../Util/Spinner';

export class Twitter extends Component {
    /**
  * Constructor
  * 
  * @param {*} props 
  */
    constructor(props) {
        super(props);

        this.state = {
            components: [
                {
                    key: "twit-feed",
                    className: "quarter quarter no-padding content-box",
                    title: "Twitter Feed",
                    content: null,
                    includeKeyInClass: true,
                },
                {
                    key: "twit-favs",
                    className: "quarter no-padding content-box",
                    title: "Twitter Favourites",
                    content: null,
                    includeKeyInClass: true
                },
                {
                    key: "multi-step-form",
                    className: "half half no-padding content-box",
                    title: "Contact Form",
                    content: <ContactForm />,
                    includeKeyInClass: true
                }
            ],
            submittedData: null,
            user: "",
            tweets: [],
            "tweets-favourites": []
        }
    }

    componentDidMount() {
        this.getTwitterUser("ParTechIT");
    }

    //When people stop dragging things around
    onDragEnd(result) {
        const { source, destination, type } = result;
        let components = this.state.components;
        let tweetFavs = this.state['tweets-favourites'];
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            switch (type) {
                case "CONTENT":
                    components = this.reorder(
                        this.state.components,
                        source.index,
                        destination.index
                    );
                    break;

                case "TWEETS":
                    if (source.droppableId === "tweets-favourites") {
                        console.log(source.index, destination.index)
                        tweetFavs = this.reorder(
                            this.state['tweets-favourites'],
                            source.index,
                            destination.index
                        );
                    }
                    break
            }

            console.log(tweetFavs)
            this.setState({
                components,
                tweetFavs
            }, function () { console.log(this.state); });
        } else {
            const result = this.move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                tweets: result.tweets,
                "tweets-favourites": result["tweets-favourites"]
            });
        }
    }

    //Update the state for the main draggables
    reorder(list, startIndex, endIndex) {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    getList(id) {
        return this.state[id];
    }

    move(source, destination, droppableSource, droppableDestination) {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    }

    render() {
        if(this.state.tweets === null) return (<Spinner className="initial-spinner" message="Fetching initial data..." />);
        return (
            <DragDropContext key={"draggable-context"} onDragEnd={this.onDragEnd.bind(this)}>
                <Droppable droppableId="content" direction="horizontal" type="CONTENT">
                    {(provided) => (
                        <div key="content" className="content" {...provided.droppableProps} ref={provided.innerRef}>
                            {this.state.components.map((component, index) => {
                                if (component.key === "twit-feed" || component.key === "twit-favs") {
                                    let tweets = (component.key === "twit-feed") ? this.state.tweets : this.state['tweets-favourites'];
                                    component.title = (component.key === "twit-feed") ? "Twitter feed" : "Twitter favourites";
                                    component.subtitle = "@" + this.state.user.screenName;
                                    component.content = <TwitterFeed screenName={this.state.user.screenName} tweets={tweets} droppableId={(component.key === "twit-feed") ? "tweets" : "tweets-favourites"} />;
                                }

                                return (
                                    <DraggableComponent
                                        key={component.key}
                                        uniqueKey={component.key}
                                        className={component.className + (component.includeKeyInClass && " " + component.key)}
                                        title={component.title}
                                        subtitle={component.subtitle}
                                        content={component.content}
                                        index={index}
                                    />
                                )
                            })
                            }
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }

    async getTwitterUser(screenName) {
        let user = await fetch('/twitter/get/user/' + screenName)
            .then((response) => response.json())
            .then((user) => {
                return user;
            });

        this.setState(
            { user: user },
            function () {
                this.getTweetsByUser(this.state.user.screenName)
            }
        );
    }

    async getTweetsByUser(screenName) {
        let tweets = await fetch('/twitter/get/tweets/by/user/' + screenName)
            .then((response) => response.json())
            .then((tweets) => {
                return tweets;
            });

        this.setState({ tweets: tweets });
    }
}
