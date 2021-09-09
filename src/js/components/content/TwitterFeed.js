import React, { Component } from "react";
import Spinner from '../util/Spinner';
import { DragDropContext, Droppable} from 'react-beautiful-dnd';
import DraggableComponent from "../util/DraggableComponent";
import { TwitterTweetEmbed } from "react-twitter-embed";

class TwitterFeed extends Component {
    /**
   * Constructor
   * 
   * @param {*} props 
   */
  constructor(props) {
        super(props);

        this.state = {
            twitUrl: "https://t.co/G1lhlJNUv7",
            tweets: {
                "data": [
                    {
                        "id": "1435528397975920642",
                        "text": "In today's article you read about 10 APIs every developer must know in 2021: https://t.co/nCAA9rPhHo \n \n#Blog #APIs #2021 #Developer"
                    },
                    {
                        "id": "1434818702445326339",
                        "text": "👉 https://t.co/lsCXqFB5EP  👈\nOnze nieuwsbrief gemist? Geen probleem, hierboven vind je de online versie! 🤩\n\n📰 Wil jij vanaf nu geen nieuwsbrief meer missen? Schrijf je dan in via de link hieronder:\n👉 https://t.co/0Yok2uB87G \n\n#newsletter #partech #STL #sitecore https://t.co/nu2JOmOOXd"
                    },
                    {
                        "id": "1434803576702971908",
                        "text": "What is boxing and unboxing in C#? Read it in today's article: https://t.co/1oXjWNjkBf \n \n#blog #boxing #unboxing #csharp"
                    },
                    {
                        "id": "1433716464712880131",
                        "text": "Read about the beginners Guide to Microsoft Orleans in today's article: https://t.co/Y06XJsUGni \n \n#Blog #Guide #Microsoft #Orleans"
                    },
                    {
                        "id": "1432991672783224836",
                        "text": "In today's article you read the introduction to Windows Communication Foundation: https://t.co/6NRUn2uEEr \n\n#blog #WCF#windows #communication #foundation"
                    },
                    {
                        "id": "1432266917679673347",
                        "text": "What is Covariance and Contravariance in C#? Read it in today's article: https://t.co/ljEKPaSi88 \n\n#blog #covariance #contravariance #csharp"
                    },
                    {
                        "id": "1431179749628563462",
                        "text": "Read about the introduction to Dynamic Link Library: https://t.co/eeLiwT66Qi \n\n#blog #dynamic #link #library"
                    },
                    {
                        "id": "1430454939348766720",
                        "text": "What is Blue Green Deployment? Read it in today's article: https://t.co/sQ5N9m3bjT \n \n#blog #bluegreendeployment"
                    },
                    {
                        "id": "1429730184014487554",
                        "text": "Read about Top Level Programs in C-Sharp 9: https://t.co/Lcw9agk8CZ \n \n#blog #toplevelprograms #csharp9"
                    },
                    {
                        "id": "1428642976192925696",
                        "text": "Read about understanding XDR in Cybersecurity: https://t.co/w2Eh7rXz3f \n \n#blog #xdr #cybersecurity #extended #detection #response"
                    }
                ],
                "meta": {
                    "oldest_id": "1428642976192925696",
                    "newest_id": "1435528397975920642",
                    "result_count": 10,
                    "next_token": "7140dibdnow9c7btw3z1mfqcdaqcb2vncnmj6b86hg2eu"
                }
            }
        }
    }

    //When people stop dragging things around
    onDragEnd(result) {
        //Code goes here
    }

    render() {
        return (
            <DragDropContext key={"draggable-context"} onDragEnd={this.onDragEnd.bind(this)}>
                <div className="twitter-feed">
                    {
                        this.state.tweets === null 
                        ? <Spinner message="Fetching Twitter-feed"/>
                        :
                        <Droppable droppableId="tweets" direction="vertical">
                            {(provided) => (
                                <div className="twitter-feed"  {...provided.droppableProps} ref={provided.innerRef}>
                                    {this.state.tweets.data.map((tweet, key) => {
                                        return(
                                            <DraggableComponent 
                                                key={key}
                                                uniqueKey={key.toString()}
                                                className={"draggable-tweet"}
                                                content={<TwitterTweetEmbed tweetId={tweet.id}/>}
                                                index={key}
                                            />
                                        )
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    }
                </div>
            </DragDropContext>
        );
    }
};

export default TwitterFeed;