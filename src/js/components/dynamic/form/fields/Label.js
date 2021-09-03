import React, { Component } from 'react';

/**
 * Dynamic form input element
 */
export default class Label extends Component
{
    /**
     * Constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {value: '', ...props};
    }

    /**
     * Renders the input field
     *
     * @returns {*}
     */
    render()
    {
        return (
            <label {...this.props.props} className={this.props.className}>
                {this.state.value}
            </label>
        )
    }
}
