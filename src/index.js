//Dependencies
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable} from 'react-beautiful-dnd';

//Style
import './style.scss';

//Components
import DraggableComponent from './js/components/util/DraggableComponent';
import ContactForm from './js/components/content/ContactForm';
import TwitterFeed from './js/components/content/TwitterFeed';
import TwitterFavourites from './js/components/content/TwitterFavourites';

class App extends Component {
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
          subtitle: "@ParTechIT",
          content: null,
          includeKeyInClass: true,
        },
        {
          key: "twit-favs",
          className: "quarter no-padding content-box",
          title: "Twitter Favourites",
          subtitle: "@ParTechIT",
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
      screenName: "ZubajaOfficial",
      tweets: [
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
      "tweets-favourites": []
    }
  }

  //When people stop dragging things around
  onDragEnd(result) {
    const { source, destination, type } = result;
    let components = this.state.components;
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

      this.setState({
        components,
      });
    } else {
      const result = this.move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      console.log(result)

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
    let currentyear = parseInt(new Date().getFullYear());

    return ([
      <header key="header">
        <h1>React Showcase</h1>
      </header>,
      <DragDropContext key={"draggable-context"} onDragEnd={this.onDragEnd.bind(this)}>
        <Droppable droppableId="content" direction="horizontal" type="CONTENT">
          {(provided) => (
            <div key="content" className="content" {...provided.droppableProps} ref={provided.innerRef}>
              {this.state.components.map((component, index) => {
                if(component.key === "twit-feed") {
                  component.content = <TwitterFeed screenName="ParTechIT" tweets={this.state.tweets} />;
                } else if(component.key === "twit-favs") {
                  component.content = <TwitterFavourites screenName="ParTechIT" tweets={this.state["tweets-favourites"]} />
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
      </DragDropContext>,
      <footer key="footer">
        Made by Steven Nolles @ Partech, {currentyear === 2021 ? currentyear : "2021-" + currentyear}
      </footer>
    ]);
  }
}

if(document.getElementById('root')) {
  ReactDOM.render(<App/>, document.getElementById('root'));
}