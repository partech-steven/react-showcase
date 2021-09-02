//Dependencies
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

//Style
import './style.scss';

//Components
import DraggableComponent from './components/DraggableComponent';

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
          className: "quarter quarter--no-left no-padding content-box",
          title: "Twitter Feed",
          subtitle: "@ParTechIT",
          includeKeyInClass: true
        },
        {
          key: "twit-favs",
          className: "quarter no-padding content-box",
          title: "Twitter Favourites",
          includeKeyInClass: true
        },
        {
          key: "multi-step-form",
          className: "half half--no-right no-padding content-box",
          includeKeyInClass: true
        }
      ]
    }
  }

  render() {
    return ([
      <header key="header">
        <h1>React Showcase</h1>
      </header>,
      <DragDropContext key={"draggable-context"}>
        <Droppable droppableId="content">
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
                    index={index}
                  />
                  )
                })
              }
            </div>
          )}
        </Droppable>
      </DragDropContext>,
      <footer key="footer">
        Made by Steven Nolles @ Partech, 2021-{new Date().getFullYear()}
      </footer>
    ]);
  }
}

if(document.getElementById('root')) {
  ReactDOM.render(<App/>, document.getElementById('root'));
}

/*
{this.state.components.map(component => {
  return (
    <Draggable key={component.key} draggableId={component.key} index={component.index}>
      {(componentProvided) => (
        <DraggableComponent 
          className={component.className + (component.includeKeyInClass && " " + component.key)}
          title={component.title}
          subtitle={component.subtitle}
          ref={componentProvided.innerRef} 
          {...componentProvided.draggableProps} 
          {...componentProvided.dragHandleProps}
        />
      )}
    </Draggable>
  );
})}
*/