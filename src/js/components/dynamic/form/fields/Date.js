import React, { Component } from 'react';
import DateTimeUtil from '../../../../utils/DateTimeUtil';

import DatePicker from "react-datepicker";

import { lightFormat, toDate, parseISO } from 'date-fns'

/**
 * Dynamic form input element
 */
export default class Date extends Component
{
    /**
     * Constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            newValue: '',
            minValue: '',
            defaultValue: '',
            ...props
        };
    }

    /**
     * Does nothing, but React gets an autistic spasm if "onChange" is not present on a field
     *
     * @param event
     */
    change(value)
    {
        let date = lightFormat(toDate(value), "yyyy-MM-dd");
        if(value !== date)
        {
            this.setState({value: date}, function ()
            {
                this.props.change(date, this.props.name, this.state);
            });
        }
    }

    blur(event)
    {
        event.persist();
        if (this.props.onBlur) this.props.onBlur(event, this.props.name, this.state);
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
     * Something something mounted
     *
     * @returns {string}
     */
    componentDidMount()
    {
        if(this.state.props.fromToday)
        {
            this.setState({minValue: parseISO(DateTimeUtil.getToday())});
        }
        else if (this.state.props.onlyFuture)
        {
            this.setState({minValue: parseISO(DateTimeUtil.getTomorrow())});
        }
    }

    /**
     * Quick 'n dirty thing that prevents people from typing in dates.
     * IT'S WHAT THE DATEPICKER IS FOR, DAMNIT!
     * @param event
     */
    handleKeyPress(event) {
        event.preventDefault();
        return false;
    }

    /**
     * Renders the input field
     *
     * @returns {*}
     */
    render()
    {
        let format = this.props.props.format || "yyyy-MM-dd";

        return (
            <DatePicker {...this.props.props}
                key={this.props.name}
                id={'f-' + this.props.name}
                className={this.props.className}
                selected={this.state.value ? parseISO(this.state.value) : ""}
                dateFormat={format}
                minDate={this.state.minValue}
                belongstostep={this.props.belongstostep}
                onChange={(e) => { this.change(e) }}
                onBlur={(e) => { this.blur(e) }}
            />
        )
    }
}
