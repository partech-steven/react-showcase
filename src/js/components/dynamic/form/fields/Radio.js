import React, { Component } from 'react';

/**
 * Dynamic form radio button element
 */
export default class Radio extends Component
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
     * Change event
     *
     * @param event
     */
    change(event) {
        let self = this;
        this.setState({value: event.target.value}, function()
        {
            self.props.change(event, self.props.name, self.state);
        });
    }

    blur(event) {
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
     * Renders the radio button field
     *
     * @returns {*}
     */
    render()
    {
        let input = this.props.options.map((o) => {
            let checked = (this.state.value && o.value === this.state.value);
            return (
                <React.Fragment key={'fr' + o.key}>
                    <div className="radio-container">
                        <input {...this.props.props}
                            id={"radio-" + o.key + "-" + o.value}
                            className={"form-input " + this.props.className}
                            type="radio"
                            name={this.props.name}
                            checked={checked}
                            value={o.value}
                            onChange={(e) => { this.change(e, this.props.name)}}
                            onBlur={(e) => { this.blur(e)}}
                        />

                        <label htmlFor={"radio-" + o.key + "-" + o.value}> {o.label}</label>
                    </div>
                </React.Fragment>
            );
        });

        return (
            <div className="form-group-radio">{input}</div>
        )
    }
}
