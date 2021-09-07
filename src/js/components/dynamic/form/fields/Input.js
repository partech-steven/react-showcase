import React, { Component } from 'react';

/**
 * Dynamic form input element
 */
export default class Input extends Component
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
            value: '',
            cursorPosition: 0,
            isChanging: false,
            defaultValue: '',
            ...props
        };
    }

    componentDidMount() {
        this.setState({defaultValue: this.props.value});
    }

    /**
     * Check if the component has been updated
     *
     * @param prevProps
     */
    componentDidUpdate(prevProps, prevState) {
        if(this.props.value !== prevProps.value) {
            let newValue = (this.props.value === "") ? this.state.defaultValue : this.props.value;
            this.setState({value: newValue});
        }
    }

    /**
     * Change event
     *
     * @param event
     */
    change(event) {
        let val = event.target.value;
        let {selectionStart} = event.target;

        this.setState({value: val, cursorPosition: selectionStart, isChanging: true}, function()
        {
            this.props.change(event, this.props.name, this.state);
            if(this.cursorReference.current.type === "text") {
                this.cursorReference.current.selectionStart = this.cursorReference.current.selectionEnd = this.state.cursorPosition;
            }
        });
    }

    /**
     * onFocus event
     *
     * @param event
     */
    onFocus(event) {
        
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

    /**
     * Renders the input field
     *
     * @returns {*}
     */
    render()
    {
        let style = {};
        if(this.state.value && this.props.type === "image") {
            style = {
                backgroundImage: this.state.value
            };
        }

        return (
            <input {...this.props.props}
                className={this.props.className}
                type={this.props.type}
                name={this.props.name}
                value={this.state.value}
                id={'f-' + this.props.name}
                ref={this.cursorReference}
                belongstostep={this.props.belongstostep}
                onChange={(e) => { this.change(e) }}
                onFocus={(e) => {this.onFocus(e)}}
                onBlur={(e) => { this.blur(e) }}
                style={style}
            />
        )
    }
}
