import React, { Component } from 'react';
import * as CONSTANTS from "./../../../../constants";
import $ from 'jquery';

/**
 * Dynamic form input element
 */
export default class ImageField extends Component
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
        event.persist();
        let val = event.target.value;

        this.setState({value: URL.createObjectURL(event.target.files[0]), isChanging: true}, function()
        {
            this.props.change(event, this.props.name, this.state);
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
                height: this.props.props.height,
                width: this.props.props.width
            };
        }

        return (
            <span>
                <input {...this.props.props}
                    className={this.props.className}
                    type={"file"}
                    name={this.props.name}
                    id={'f-' + this.props.name}
                    onChange={(e) => { this.change(e) }}
                    onFocus={(e) => {this.onFocus(e)}}
                    onBlur={(e) => { this.blur(e) }}
                    style={{
                        height: this.props.props.height,
                        width: this.props.props.width
                    }}
                />
                <label 
                    htmlFor={'f-' + this.props.name}
                    style={{
                        backgroundImage: "url(" + this.state.value + ")",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        height: this.props.props.height,
                        width: this.props.props.width
                    }}>
                </label>
            </span>
        )
    }
}
