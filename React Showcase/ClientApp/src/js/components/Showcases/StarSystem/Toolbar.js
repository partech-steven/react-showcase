import React, { Component, Fragment } from "react";
import { FancyButton } from "../../Util/FancyButton";

import './toolbar.css';

export class Toolbar extends Component {
    /**
  * Constructor
  * 
  * @param {*} props 
  */
    constructor(props) {
        super(props);

        this.state = {
            seed: "Generate me a Star System!",
            seedChangedByUser: false,
            zoomLevel: 1,
            simulationRunning: true,
            receivingNewProps: false
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps !== this.props) {
            this.setState({
                seed: nextProps.seed,
                seedChangedByUser: nextProps.seedChangedByUser,
                zoomLevel: nextProps.zoomLevel,
                simulationRunning: nextProps.simulationRunning
            });
        }

        return nextState !== this.state;
    }

    onSeedChange(e) {
        this.setState({ seed: e.currentTarget.value, seedChangedByUser: true }, function () {
            this.props.onSeedChange(e, this.state.seed, this.state.seedChangedByUser);
        })
    }

    refreshSystem(e) {
        this.props.refreshSystem(e);
    }

    render() {
        return (
            <React.Fragment>
                <div className="star-system__toolbar-item">
                    <div className="star-system__toolbar-input">
                        <label htmlFor="seed"><strong><em>Seed </em></strong></label>
                        <input name="seed" value={this.state.seed} onChange={(e) => { this.onSeedChange(e) }} />
                    </div>
                    <div className="star-system__toolbar-actions">
                        {!this.state.seedChangedByUser
                            ? <FancyButton
                                className="star-system__action star-system__action--regen-and-refresh"
                                backgroundColor="#2b88d9"
                                icon="/images/button-icons/refresh.png"
                                tooltip="Regenerate seed and refresh"
                                onClick={(e) => this.refreshSystem(e)}
                            />
                            : <FancyButton
                                className="star-system__action star-system__action--refresh"
                                backgroundColor="#2b88d9"
                                icon="/images/button-icons/refresh.png"
                                tooltip="Refresh based on input"
                                onClick={(e) => this.refreshSystem(e)}
                            />
                        }
                    </div>
                </div>
                <div className="star-system__toolbar-item">
                    <div className="star-system__toolbar-actions">
                        <div className="star-system__action star-system__action--restart">
                            <div className="star-system__action-tooltip">
                                Restart simulation
                            </div>
                        </div>
                        {this.state.seedChangedByUser
                            ? <div className="star-system__action star-system__action--pause">
                                <div className="star-system__action-tooltip">
                                    Pause simulation
                                </div>
                            </div>
                            : <div className="star-system__action star-system__action--resume">
                                <div className="star-system__action-tooltip">
                                    Resume simulation
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="star-system__toolbar-item">
                    <div className="star-system__toolbar-input">
                        <label htmlFor="seed"><strong><em>Zoom </em></strong></label>
                        <div className="star-system__action star-system__action--zoom-out">
                            <div className="star-system__action-tooltip">
                                -
                            </div>
                        </div>
                        <div className="star-system__toolbar-input">

                            <input name="seed" value={this.state.zoomLevel} onChange={(e) => { }} />
                        </div>
                        <div className="star-system__action star-system__action--zoom-in">
                            <div className="star-system__action-tooltip">
                                +
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
};