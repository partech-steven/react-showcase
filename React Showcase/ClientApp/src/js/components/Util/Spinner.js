import React, { Component } from "react";

import './spinner.css';

export class Spinner extends Component {
    render() {
        return (
            <div className={"spinnyboi" + (this.props.className ? " " + this.props.className : "")}>
                <em>{this.props.message && this.props.message}</em>
            </div>
        );
    }
};