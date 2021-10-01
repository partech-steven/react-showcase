import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TwitterFeed from '../../../Showcases/Twit-DragDrop/TwitterFeed';
import { ContactForm } from '../../../Showcases/Twit-DragDrop/ContactForm';
import DraggableComponent from '../../../Util/DraggableComponent';
import Spinner from '../../../Util/Spinner';
import DynamicForm from '../../../Dynamic/form/DynamicForm';

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
            "tweets-favourites": [],
            tweetsLimit: 10
        }
    }

    componentDidMount() {
        this.getTwitterUser("ParTechIT");
        this.getTweetsByUser("ParTechIT", this.state.tweetsLimit);
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
                case "TWEETS":
                    if (source.droppableId === "tweets-favourites") {
                        tweetFavs = this.reorder(
                            this.state['tweets-favourites'],
                            source.index,
                            destination.index
                        );
                    }
                    break;
                case "CONTENT":
                default:
                    components = this.reorder(
                        this.state.components,
                        source.index,
                        destination.index
                    );
                    break;
            }

            this.setState({
                components,
                "tweets-favourites": tweetFavs
            });
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

    filterSubmit(event) {
        let screenName = this.state.user.screenName;
        let tweetsLimit = this.state.tweetsLimit;

        if (event['twitter-handle']) screenName = event['twitter-handle'];
        if (event['tweets-limit']) tweetsLimit = event['tweets-limit'];
        if (event['twitter-handle'] || event['tweets-limit']) this.setState({ tweets: null, "tweets-favourites": [] },
            function () {
                this.getTwitterUser(screenName, true, tweetsLimit);
            }
        );
        
    }

    render() {
        if(this.state.tweets === null) return (<Spinner className="initial-spinner" message="Fetching data..." />);
        return ([
            <h1 className="page-title">Twitter, Drag-n-Drop and a form! - A showcase</h1>,
            <div className="twitter-filters" key="twitter-filters">
                <DynamicForm
                    className="twitter-filters__form"
                    submitText={"Refresh data"}
                    model={[
                        {
                            key: "twitter-filters",
                            type: "row",
                            inputs: [
                                {
                                    key: "twitter-handle",
                                    label: "Twitter Handle",
                                    value: this.state.user.screenName,
                                    prefix: "@",
                                    props: {
                                        required: true
                                    }
                                },
                                {
                                    key: "tweets-limit",
                                    label: "Tweets limit",
                                    value: this.state.tweetsLimit,
                                    type: "number",
                                    prefix: "#",
                                    pprops: {
                                        required: true
                                    }
                                }
                            ]
                        }]}
                    onSubmit={this.filterSubmit.bind(this)}
                />
            </div>,
            <DragDropContext key={"draggable-context"} onDragEnd={this.onDragEnd.bind(this)}>
                <Droppable droppableId="content" direction="horizontal" type="CONTENT">
                    {(provided) => (
                        <div key="content" className="content content--twitter row flex-nowrap no-background" {...provided.droppableProps} ref={provided.innerRef}>
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
        ]);
    }

    async getTwitterUser(screenName, fetchTweets = false, tweetsLimit = 10) {
        let user = await fetch('/twitter/get/user/' + screenName)
            .then((response) => response.json())
            .then((user) => {
                return user;
            });

        this.setState({ user: user }, function () {
            if (fetchTweets) {
                this.getTweetsByUser(this.state.user.screenName, tweetsLimit)
            }
        });
    }

    async getTweetsByUser(screenName, limit = 10) {
        let tweets = await fetch('/twitter/get/tweets/by/user/' + screenName + '?limit=' + limit)
            .then((response) => response.json())
            .then((tweets) => {
                return tweets;
            });

        this.setState({ tweets: tweets, tweetsLimit: limit });
    }
}
