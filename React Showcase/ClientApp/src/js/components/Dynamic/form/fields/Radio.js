import React, { Component } from 'react';
import Input from './Input';

/**
 * Dynamic form radio button element
 */
export default class Radio extends Component {
    /**
     * Constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = { value: '', ...props, shouldReRender: true };
    }

    /**
     * Change event
     *
     * @param event
     */
    change(event) {
        let self = this;
        if (event.target !== null) {
            let inputType = event.target.type;
            let shouldReRender = true;

            if (inputType === "text") {
                shouldReRender = false;
            }

            this.setState({ value: event.target.value, shouldReRender: shouldReRender }, function () {
                self.props.change(event, self.props.name, self.state);
            });
        }
    }

    shouldComponentUpdate(prevProps, prevState) {
        return prevState.shouldReRender;
    }

    blur(event) {
        event.persist();
        if (this.props.onBlur) this.props.onBlur(event, this.props.name, this.state);
    }

    /**
     * onFocus event
     *
     * @param event
     */
    onFocus(event) {

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
     * Renders the radio button field
     *
     * @returns {*}
     */
    render() {
        let input = this.props.options.map((o) => {
            let checked = (this.state.value && o.value === this.state.value);
            let enablesFreeInput = o.freeInput;
            return (
                <React.Fragment key={'fr' + o.key}>
                    <div className="radio-container">
                        <div className="radio-container__option">
                            <input {...this.props.props}
                                id={"radio-" + o.key + "-" + o.value}
                                className={"form-input " + this.props.className}
                                type="radio"
                                name={this.props.name}
                                checked={checked}
                                value={o.value}
                                belongstostep={this.props.belongstostep}
                                onChange={(e) => { this.change(e, this.props.name) }}
                                onBlur={(e) => { this.blur(e) }}
                            />

                            <label htmlFor={"radio-" + o.key + "-" + o.value}> {o.label}</label>
                        </div>
                        {(enablesFreeInput && checked) &&
                            <div className="radio-container__free-field">
                                <Input
                                    {...this.props.props}
                                    type="text"
                                    key={o.key}
                                    name={this.props.name}
                                    change={(e) => { this.change(e, this.props.name) }}
                                    blur={(e) => { this.blur(e) }}
                                />
                            </div>
                        }
                    </div>
                </React.Fragment>
            );
        });

        return (
            <div className="form-group-radio">{input}</div>
        )
    }
}
