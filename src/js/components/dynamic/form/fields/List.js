import React, { Component } from 'react';
import $ from 'jquery';
import Input from "./Input";

/**
 * Dynamic form input element
 */
export default class List extends Component
{
    /**
     * Constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.cursorReference = React.createRef();
        this.state = {
            value: {},
            defaultValue: {},
            isChanging: false,
            ...props
        };
    }

    componentDidMount() {
        this.setState({
            value: this.props.props.values,
            defaultValue: this.props.props.values
        });
    }

    /**
     * Check if the component has been updated
     *
     * @param prevProps
     */
    componentDidUpdate(prevProps, prevState) {
        /*if(this.props.value !== prevProps.value) {
            let newValue = (this.props.value === "") ? this.state.defaultValue : this.props.value;
            this.setState({value: newValue});
        }*/
    }

    /**
     * Change event
     *
     * @param event
     */
    change(event) {
        let val = event.target.value;
        let newValues = $.extend({}, this.state.value, this.state.value);
        let {selectionStart} = event.target;

        newValues[$(event.target).attr("name")].name = val;

        this.setState({value: newValues, cursorPosition: selectionStart, isChanging: true}, function()
        {
            this.props.change(event, this.props.name, this.state);
            if(this.cursorReference.current.type === "text") {
                this.cursorReference.current.selectionStart = this.cursorReference.current.selectionEnd = this.state.cursorPosition;
            }
        });
    }

    /**
     * blur event
     *
     * @param event
     */
    blur(event) {
        event.persist();
        if (this.props.onBlur) {
            this.setState({isChanging: false}, function() {
                this.props.onBlur(event, this.props.name, this.state);
            });
        }
    }

    addNewValue(event) {
        let self = this;
        let newValues = $.extend({}, this.state.value, this.state.value);
        let latestKey = (Object.keys(this.state.value).length === 0) ? 0 : Object.keys(this.state.value).length-1;
        let latestValue = (this.state.value[latestKey]) ? this.state.value[latestKey].value : 0;
        let newValue = (latestValue === 0) ? 1 : (self.props.props.listtype === "inversebit") ? latestValue*2 : latestValue++;

        newValues[(Object.keys(newValues).length === 0) ? latestKey : latestKey+1] = {value: newValue, name: "", isNew: true};

        this.setState({value: newValues});
    }

    /**
     * Renders the input field
     *
     * @returns {*}
     */
    render()
    {
        let inputList = this.state.value;

        return (
            <div className={"input-list"}>
                {Object.keys(inputList).map((key, i) =>
                    <div key={key} className={"input-list__input"}>
                        <div className={"digit"}>{inputList[key].value}</div>
                        <input type={'input'}
                               name={key}
                               value={inputList[key].name}
                               digitvalue={inputList[key].value}
                               id={'f-' + key}
                               ref={this.cursorReference}
                               readOnly={this.props.props.readOnly && inputList[key].name && !inputList[key].isNew}
                               required={!inputList[key].name}
                               onChange={(e) => { this.change(e) }}
                               onBlur={(e) => { this.blur(e) }}
                        />
                    </div>
                )}
                <div key="new-listitem-btn" className="new-listitem-button" onClick={(e) => this.addNewValue(e)}>+</div>
            </div>
        )
    }
}
