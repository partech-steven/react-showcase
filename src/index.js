//Dependencies
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { DragDropContext, Droppable} from 'react-beautiful-dnd';

//Style
import './style.scss';

//Components
import DraggableComponent from './js/components/DraggableComponent';
import Spinner from './js/components/Spinner';
import DynamicForm from './js/components/dynamic/form/DynamicForm';

class App extends Component {
  /**
   * Constructor
   * 
   * @param {*} props 
   */
  constructor(props) {
    super(props);

    this.state = {
      screenname: "ZubajaOfficial",
      components: [
        {
          key: "twit-feed",
          className: "quarter quarter no-padding content-box",
          title: "Twitter Feed",
          subtitle: "@ParTechIT",
          content: <Spinner message="Fetching Tweet Feed..." />,
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
          content: 
            <DynamicForm className="contact__form"
              submitText={"Send"}
              model={[
                {
                  key: "step-one",
                  type: "step",
                  groups: [{
                    key: "techniques",
                    label: "Techiques you've worked with",
                    type: "group",
                    inputs: [
                      {
                        key: "react_js",
                        label: "ReactJS",
                        type: "checkbox"
                      },
                      {
                        key: "react_native",
                        label: "React Native",
                        type: "checkbox"
                      },
                      {
                        key: "dot_net",
                        label: ".NET",
                        type: "checkbox"
                      }
                    ]
                  }]
                },
                {
                  key: "step-two",
                  type: "step",
                  groups: [{
                    key: "experience",
                    label: "Years of work-experience",
                    type: "group",
                    inputs: [
                      {
                        key: "years_exp",
                        type: "radio",
                        options: [
                          {key: "two_years", value: "2", label: "Two years"},
                          {key: "two_to_four_years", value: "2-4", label: "Two to for years"},
                          {key: "four_to_six_years", value: "4-6", label: "Four to six years"},
                          {key: "six_to_eight_years", value: "6-8", label: "Six to eight years"},
                          {key: "eight_years_plus", value: "8+", label: "Over eight years"}
                        ],
                        props: {required: true}
                      }
                    ]
                  }]
                },
                {
                  key: "step-three",
                  type: "step",
                  groups: [{
                    key: "highest_education",
                    label: "Highest Education completed",
                    type: "group",
                    inputs: [
                      {
                        key: "highest_edu",
                        type: "radio",
                        options: [
                          {key: "hbo", value: "HBO", label: "HBO"},
                          {key: "mbo", value: "MBO", label: "MBO"},
                          {key: "different", value: "different", label: "Something else..."} //TODO: Implement textbox that appears when selected
                        ],
                        props: {required: true}
                      }
                    ]
                  }]
                },
                {
                  key: "step-four",
                  type: "step",
                  groups: [{
                    key: "basic_info",
                    label: "Basic Information",
                    type: "group",
                    inputs: [
                      {
                        key: "name",
                        label: "Name",
                        props: {
                          required: true
                        }
                      },
                      {
                        key: "email",
                        label: "Email address",
                        props: {
                          required: true,
                          pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
                        }
                      }
                    ]
                  }]
                }
              ]}
              onChange={this.formOnChange.bind(this)}
              onSubmit={this.formOnSubmit.bind(this)}
            />,
          includeKeyInClass: true
        }
      ]
    }
  }

  //Function used to check for changes in the form
  formOnChange(events, state) {
    //Put code here...
  }

  //Function to do stuff when someone submits the form
  formOnSubmit(event) {
    console.log(event);
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