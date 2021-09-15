import React, { Component } from "react";
import { Link } from "react-router-dom";

export class InteractiveTile extends Component {
    render() {
        return (
            <div
                className={"interactive-tile" + (this.props.className ? " " + this.props.className : "")}
                onClick={(e) =>
                    {(this.props.hotlink
                        ? window.open(this.props.hotlink, '_blank').focus()
                        : console.log("You ain't goin' nowhere!")
                    )}
                }
            >
                <div className="interactive-tile__content">
                    {(this.props.backgroundImage &&
                        <img src={this.props.backgroundImage} className="interactive-tile__background" />
                    )}
                    <div className="interactive-tile__overlay"></div>
                    {(this.props.title &&
                        <h5 className="interactive-tile__title"><strong>{this.props.title}</strong></h5>
                    )}
                    {(this.props.subtitle &&
                        <h6 className="interactive-tile__subtitle"><em>{this.props.subtitle}</em></h6>
                    )}
                    {(this.props.description &&
                        <p className="interactive-tile__description">{this.props.description}</p>
                    )}
                </div>
            </div>
        );
    }
};