import React, { Component } from "react";

import './interactive-tile.css';

export class InteractiveTile extends Component {
    render() {
        return (
            console.log(this.props),
            <div
                className={"interactive-tile" + (this.props.className ? " " + this.props.className : "")}
                onClick={(e) =>
                    {(this.props.props.hotlink
                        ? window.open(this.props.props.hotlink, '_blank').focus()
                        : console.log("You ain't goin' nowhere!")
                    )}
                }
            >
                <div className="interactive-tile__content">
                    {(this.props.props.backgroundImage &&
                        <img src={this.props.props.backgroundImage} className="interactive-tile__background" alt="tile-bg" />
                    )}
                    <div className="interactive-tile__overlay"></div>
                    {(this.props.props.title &&
                        <h5 className="interactive-tile__title"><strong>{this.props.props.title}</strong></h5>
                    )}
                    {(this.props.props.subtitle &&
                        <h6 className="interactive-tile__subtitle"><em>{this.props.props.subtitle}</em></h6>
                    )}
                    {(this.props.props.description &&
                        <p className="interactive-tile__description">{this.props.props.description}</p>
                    )}
                    {((this.props.props.releaseDate || this.props.props.version) &&
                        <div className="interactive-tile__release-info">
                            {(this.props.props.releaseDate && < p className="interactive-tile__release-date">Released on: {this.props.props.releaseDate}</p>)}
                            {(this.props.props.version && < p className="interactive-tile__version">Current version: {this.props.props.version}</p>)}
                        </div>
                    )}
                </div>
            </div>
        );
    }
};