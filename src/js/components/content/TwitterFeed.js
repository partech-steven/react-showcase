import React, { Component } from "react";
import Spinner from '../util/Spinner';
import { DragDropContext, Droppable} from 'react-beautiful-dnd';
import DateTimeUtil from "../../utils/DateTimeUtil";

class TwitterFeed extends Component {
    /**
   * Constructor
   * 
   * @param {*} props 
   */
  constructor(props) {
        super(props);

        this.state = {
            screenname: "ParTechIT",
            twitUrl: "https://t.co/G1lhlJNUv7",
            tweets: {
                "data": [
                    {
                        "text": "👉 https://t.co/lsCXqFB5EP  👈\nOnze nieuwsbrief gemist? Geen probleem, hierboven vind je de online versie! 🤩\n\n📰 Wil jij vanaf nu geen nieuwsbrief meer missen? Schrijf je dan in via de link hieronder:\n👉 https://t.co/0Yok2uB87G \n\n#newsletter #partech #STL #sitecore https://t.co/nu2JOmOOXd",
                        "attachments": {
                            "media_keys": [
                                "3_1434818698762665984"
                            ]
                        },
                        "created_at": "2021-09-06T10:00:10.000Z",
                        "author_id": "428957143",
                        "id": "1434818702445326339"
                    },
                    {
                        "text": "What is boxing and unboxing in C#? Read it in today's article: https://t.co/1oXjWNjkBf \n \n#blog #boxing #unboxing #csharp",
                        "created_at": "2021-09-06T09:00:04.000Z",
                        "author_id": "428957143",
                        "id": "1434803576702971908"
                    },
                    {
                        "text": "Read about the beginners Guide to Microsoft Orleans in today's article: https://t.co/Y06XJsUGni \n \n#Blog #Guide #Microsoft #Orleans",
                        "created_at": "2021-09-03T09:00:17.000Z",
                        "author_id": "428957143",
                        "id": "1433716464712880131"
                    },
                    {
                        "text": "In today's article you read the introduction to Windows Communication Foundation: https://t.co/6NRUn2uEEr \n\n#blog #WCF#windows #communication #foundation",
                        "created_at": "2021-09-01T09:00:13.000Z",
                        "author_id": "428957143",
                        "id": "1432991672783224836"
                    },
                    {
                        "text": "What is Covariance and Contravariance in C#? Read it in today's article: https://t.co/ljEKPaSi88 \n\n#blog #covariance #contravariance #csharp",
                        "created_at": "2021-08-30T09:00:18.000Z",
                        "author_id": "428957143",
                        "id": "1432266917679673347"
                    },
                    {
                        "text": "Read about the introduction to Dynamic Link Library: https://t.co/eeLiwT66Qi \n\n#blog #dynamic #link #library",
                        "created_at": "2021-08-27T09:00:17.000Z",
                        "author_id": "428957143",
                        "id": "1431179749628563462"
                    },
                    {
                        "text": "What is Blue Green Deployment? Read it in today's article: https://t.co/sQ5N9m3bjT \n \n#blog #bluegreendeployment",
                        "created_at": "2021-08-25T09:00:08.000Z",
                        "author_id": "428957143",
                        "id": "1430454939348766720"
                    },
                    {
                        "text": "Read about Top Level Programs in C-Sharp 9: https://t.co/Lcw9agk8CZ \n \n#blog #toplevelprograms #csharp9",
                        "created_at": "2021-08-23T09:00:13.000Z",
                        "author_id": "428957143",
                        "id": "1429730184014487554"
                    },
                    {
                        "text": "Read about understanding XDR in Cybersecurity: https://t.co/w2Eh7rXz3f \n \n#blog #xdr #cybersecurity #extended #detection #response",
                        "created_at": "2021-08-20T09:00:03.000Z",
                        "author_id": "428957143",
                        "id": "1428642976192925696"
                    },
                    {
                        "text": "What is Azure Bastion Service? Read it in today's article: https://t.co/2pUbKrOCAw\n \n#blog #azure #bastion #service",
                        "created_at": "2021-08-18T09:00:15.000Z",
                        "author_id": "428957143",
                        "id": "1427918252831805443"
                    }
                ],
                "includes": {
                    "users": [
                        {
                            "profile_image_url": "https://pbs.twimg.com/profile_images/1215195018996191232/UM4YcLjs_normal.jpg",
                            "verified": false,
                            "id": "428957143",
                            "name": "ParTech IT",
                            "username": "ParTechIT"
                        }
                    ]
                },
                "meta": {
                    "oldest_id": "1427918252831805443",
                    "newest_id": "1434818702445326339",
                    "result_count": 10,
                    "next_token": "7140dibdnow9c7btw3z1mdmigqavfea4ij5eshg0xlcmr"
                }
            }
        }
    }

    //When people stop dragging things around
  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    let components = this.reorder(
      this.state.components,
      result.source.index,
      result.destination.index
    );

    this.setState({
      components,
    });
  }

  //Update the state for the main draggables
  reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

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
                                this.state.tweets.data.map((tweet, key) => {
                                    return(
                                        <div key={tweet.id} className="twitter-feed__tweet tweet"  {...provided.droppableProps} ref={provided.innerRef}>
                                            <div className="tweet__profile-img">
                                                <img src={this.state.tweets.includes.users[0].profile_image_url} alt="profile-img" />
                                            </div>
                                            <div className="tweet__info">
                                                <div className="tweet__names"><strong>{this.state.tweets.includes.users[0].name}</strong><em>@{this.state.screenname}</em></div>
                                                <div className="tweet__created-at"><em>{DateTimeUtil.getDate(tweet.created_at)}</em></div>
                                            </div>
                                            <div className="tweet__content">
                                                {tweet.text}
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </Droppable>
                    }
                </div>
            </DragDropContext>
        );
    }
};

export default TwitterFeed;