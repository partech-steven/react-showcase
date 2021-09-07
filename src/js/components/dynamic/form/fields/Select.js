import React, { Component } from 'react';
import StringUtil from '../../../../utils/StringUtil';

/**
 * Dynamic form select element
 */
export default class Select extends Component
{
    /**
     * Constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {value: '', ...props, defaultValue: ''};
    }

    /**
     * Change event
     *
     * @param event
     */
    change(event) {
        this.setState({value: event.target.value}, function()
        {
            this.props.change(event, this.props.name, this.state);
        });
    }

    blur(event)
    {
        event.persist();
        if (this.props.onBlur) this.props.onBlur(event, this.props.name, this.state);
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
     * Renders the select field
     *
     * @returns {*}
     */
    render()
    {
        let selected = false;

        if(this.props.options !== undefined) {
            console.log(this.props.options)
            let input = this.props.options.map((o) => {
                selected = (o.value === this.state.value);
                return (
                    <option
                            key={o.key}
                            value={o.value}>
                        {StringUtil.uppercaseFirst(o.label)}
                    </option>
                );
            });

            if(this.props.props.readOnly) {
                this.props.props.disabled = this.props.props.readOnly;
            }

            return (
                <select {...this.props.props}
                        className={this.props.className}
                        name={this.props.name}
                        value={this.state.value}
                        id={'f-' + this.props.name}
                        selected={selected}
                        disabled={this.props.options.length <= 1}
                        belongstostep={this.props.belongstostep}
                        onChange={(e) => { this.change(e) }}
                        onBlur={(e) => { this.blur(e) }}
                >
                    {input}
                </select>
            )
        } else {
            console.warn("No options passed to select field with id: " + this.props.name);
            return null;
        }
    }
}
