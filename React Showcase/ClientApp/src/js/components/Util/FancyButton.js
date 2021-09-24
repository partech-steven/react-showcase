import React, { Component } from "react";

import './fancybutton.css';

export class FancyButton extends Component {
    click(e) {
        this.props.onClick();
    }

    render() {
        let className = "fancy-button " + this.props.className || "fancy-button";
        let backgroundColor = this.props.backgroundColor || "#f0f";
        let label = this.props.label || "";

        let labelStyle = (this.props.icon) ? { padding: "0 0.5em 0 1.75em" } : "";

        return (
            <div className={className} style={{ backgroundColor: backgroundColor }} onClick={(e) => this.click(e)}>
                <div className="fancy-button__gradient-overlay"></div>
                {this.props.icon && <img className="fancy-button__icon" src={this.props.icon} alt="icon" />}
                {label && <div className="fancy-button__label" style={labelStyle}>{label}</div>}
                <div className="fancy-button__shade"></div>
            </div>
        );
    }
};