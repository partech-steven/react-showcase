//Dependencies
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { DragDropContext, Droppable} from 'react-beautiful-dnd';

//Style
import './style.scss';

//Components
import DraggableComponent from './js/components/util/DraggableComponent';
import ContactForm from './js/components/content/ContactForm';
import TwitterFeed from './js/components/content/TwitterFeed';

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
          content: <TwitterFeed />,
          includeKeyInClass: true,
        },
        {
          key: "twit-favs",
          className: "quarter no-padding content-box",
          title: "Twitter Favourites",
          subtitle: "@ParTechIT",
          content: "No favourites selected",
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
      submittedData: null
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
    let currentyear = parseInt(new Date().getFullYear());

    return ([
      <header key="header">
        <h1>React Showcase</h1>
      </header>,
      <DragDropContext key={"draggable-context"} onDragEnd={this.onDragEnd.bind(this)}>
        <Droppable droppableId="content" direction="horizontal">
          {(provided) => (
            <div key="content" className="content" {...provided.droppableProps} ref={provided.innerRef}>
              {this.state.components.map((component, index) => {
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