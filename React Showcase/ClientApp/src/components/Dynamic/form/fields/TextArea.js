import React, { Component } from 'react';

/**
 * Dynamic form textarea element
 */
export default class Textarea extends Component {
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
            defaulValue: '',
            ...props
        };
    }

    /**
     * Change event
     *
     * @param event
     */
    change(event) {
        let newValue = event.target.value;
        let { selectionStart } = event.target;

        this.setState({ value: newValue, cursorPosition: selectionStart, isChanging: true }, () => {
            this.props.change(event, this.props.name, this.state);
            this.cursorReference.current.selectionStart = this.cursorReference.current.selectionEnd = this.state.cursorPosition;
        });
    }

    blur(event) {
        event.persist();
        if (this.props.onBlur) {
            this.setState({ isChanging: false }, function () {
                this.props.onBlur(event, this.props.name, this.state);
            });
        }
    }

    componentDidMount() {
        this.setState({ defaultValue: this.props.value });
    }

    /**
     * Check if the component has been updated
     *
     * @param prevProps
     */
    componentDidUpdate(prevProps, prevState) {
        if (this.props.value !== prevProps.value) {
            let newValue = (this.props.value === "") ? this.state.defaultValue : this.props.value;
            this.setState({ value: newValue });
        }
    }

    /**
     * Renders the input field
     *
     * @returns {*}
     */
    render() {
        return (
            <textarea {...this.state.props}
                className={this.props.className + ((this.props.autoHeight === true) ? 'autoHeight' : '')}
                name={this.props.name}
                id={'f-' + this.props.name}
                value={this.state.value}
                ref={this.cursorReference}
                belongstostep={this.props.belongstostep}
                onChange={(e) => { this.change(e) }}
                onBlur={(e) => { this.blur(e) }}
            />
        )
    }
}
