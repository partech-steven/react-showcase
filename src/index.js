//Dependencies
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { DragDropContext, Droppable} from 'react-beautiful-dnd';
import TwitterUtil from './js/utils/TwitterUtil';

//Style
import './style.scss';

//Components
import DraggableComponent from './js/components/DraggableComponent';

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
          content: TwitterUtil.getTimeline("ParTechIT"),
          includeKeyInClass: true,
        },
        {
          key: "twit-favs",
          className: "quarter no-padding content-box",
          title: "Twitter Favourites",
          subtitle: "@ParTechIT",
          content: "Twitfavs",
          includeKeyInClass: true
        },
        {
          key: "multi-step-form",
          className: "half half no-padding content-box",
          content: "Multi-step form",
          includeKeyInClass: true
        }
      ]
    }
  }

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

  // a little function to help us with reordering the result
  reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  render() {
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