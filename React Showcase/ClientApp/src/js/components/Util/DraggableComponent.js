import React, { Component } from 'react';
import dots from '../../../draggable-dots.svg';
import { Draggable } from 'react-beautiful-dnd';
import Input from '../Dynamic/form/fields/Input';

export default class DraggableComponent extends Component {
    onSubtitleChange(e, name, state) {
        this.props.onSubtitleChange(e, name, state);
    }

    change(e) {

    }

    render() {
        let props = this.props.props;

        return (
            <Draggable key={this.props.uniqueKey} draggableId={this.props.uniqueKey} index={props.index}>
                {(provided) => (
                    <div className={"draggable-component " + props.className} ref={provided.innerRef} {...provided.draggableProps}>
                        <div className={"draggable-component__header draggable-header"}>
                            <div className="draggable-component__icon draggable-icon" {...provided.dragHandleProps}>
                                <img src={dots} alt="Dots! More dots!" />
                            </div>
                            {this.props.title &&
                                <div className="draggable-component__title-container">
                                    <div className="draggable-component__title"><strong>{this.props.title}</strong></div>
                                {this.props.subtitle &&
                                    props.subtitleEditable
                                    ? <Input type="text" name="subtitle" value={this.props.subtitle} className="draggable-component__subtitle" change={(e) => this.change(e)} onBlur={(e, name, state) => { this.onSubtitleChange(e, name, state)}} />
                                    : <div className="draggable-component__subtitle"><em>{this.props.subtitle}</em></div>
                                }
                                </div>
                            }
                        </div>
                        <div className="draggable-component__content draggable-content">
                            {this.props.children ? this.props.children : "No content was specified for this component"}
                        </div>
                    </div>
                )}
            </Draggable>
        );
    }
}
