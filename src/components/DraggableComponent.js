import React, { Component } from 'react';
import dots from '../draggable-dots.svg';
import {Draggable } from 'react-beautiful-dnd';

export default class DraggableComponent extends Component {
    /**
     * Constructor
     * 
     * @param {*} props 
     */
    constructor(props) {
    super(props);
    }

    render() {
        return (
            <Draggable key={this.props.uniqueKey} draggableId={this.props.uniqueKey} index={this.props.index}>
                {(provided) => (
                    <div className={"draggable-component " + this.props.className} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div className={"draggable-component__header"}>
                            <div className="draggable-component__icon">
                                <img src={dots} alt="Dots! More dots!" />
                            </div>
                            {this.props.title &&
                                <div className="draggable-component__title-container">
                                    <div className="draggable-component__title"><strong>{this.props.title}</strong></div>
                                    {this.props.subtitle &&
                                        <div className="draggable-component__subtitle"><em>{this.props.subtitle}</em></div> 
                                    }
                                </div> 
                            }
                        </div>
                        <div className="draggable-component__content">
                            Henlo. Am draggable with class {this.props.className}.
                        </div>
                    </div>
                )}
            </Draggable>
        );
    }
}
