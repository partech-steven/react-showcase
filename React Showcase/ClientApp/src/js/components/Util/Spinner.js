import React, { Component } from "react";

class Spinner extends Component {
    render() {
        return (
            <div>
                <div className={"spinnyboi" + (this.props.className ? " " + this.props.className : "")}>
                    <em>{this.props.message && this.props.message}</em>
                </div>
            </div>
        );
    }
};

export default Spinner;