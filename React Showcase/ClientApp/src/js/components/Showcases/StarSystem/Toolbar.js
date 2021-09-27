import React, { Component } from "react";
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
            simulationRunning: true
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

    refreshSystem(e, generateNewSeed = !this.state.seedChangedByUser) {
        this.props.refreshSystem(e, generateNewSeed);
    }

    adjustZoomLevel(adjustment = 0, e) {
        let newZoom = this.state.zoomLevel + adjustment;
        if (newZoom < 0.2) {
            newZoom = 0.2;
        }
        if (newZoom > 5) {
            newZoom = 5;
        }

        /*
         * toFixed returns a string with [x] decimals, thus we're converting it back to a float afterwards
         * Make sure this is the final adjustment to the 'newZoom' variable.
         * */
        newZoom = parseFloat(newZoom.toFixed(1));

        this.setState({ zoomLevel: newZoom }, function () {
            this.props.adjustZoomLevel(e, newZoom);
        });
    }

    restartSimulation(e) {
        this.props.refreshSystem(e, false);
    }

    toggleSimulation() {
        this.setState({ simulationRunning: !this.state.simulationRunning }, function () {
            this.props.toggleSimulation();
        });
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
                        <FancyButton
                            className="star-system__action star-system__action--regen-and-refresh"
                            backgroundColor="#2b88d9"
                            icon={this.state.seedChangedByUser ? "/images/button-icons/go.png" : "/images/button-icons/refresh.png"}
                            tooltip={this.state.seedChangedByUser ? "Refresh based on input" : "Regenerate seed and refresh"}
                            onClick={(e) => this.refreshSystem(e)}
                        />
                    </div>
                </div>
                <div className="star-system__toolbar-item">
                    <div className="star-system__toolbar-actions">
                        <FancyButton
                            className="star-system__action star-system__action--restart"
                            backgroundColor="#2b88d9"
                            icon="/images/button-icons/restart.png"
                            tooltip="Restart simulation"
                            onClick={(e) => this.restartSimulation(e)}
                        />
                        <FancyButton
                            className={this.state.simulationRunning ? "star-system__action star-system__action--pause" : "star-system__action star-system__action--resume"}
                            backgroundColor="#2b88d9"
                            icon={this.state.simulationRunning ? "/images/button-icons/pause.png" : "/images/button-icons/resume.png"}
                            tooltip={this.state.simulationRunning ? "Pause simulation" : "Resume simulation"}
                            onClick={(e) => this.toggleSimulation()}
                        />
                    </div>
                </div>
                <div className="star-system__toolbar-item">
                    <div className="star-system__toolbar-input">
                        <label htmlFor="seed"><strong><em>Zoom </em></strong></label>
                        <FancyButton
                            className="star-system__action star-system__action--zoom-out"
                            backgroundColor="#2b88d9"
                            icon="/images/button-icons/zoom-out.png"
                            tooltip="Zoom out"
                            onClick={(e) => this.adjustZoomLevel(-0.2)}
                        />
                        <div className="star-system__toolbar-input">
                            <input name="zoom-level" type="number" className="zoom-level" step="0.2" readOnly value={this.state.zoomLevel} onChange={(e) => { }} />
                        </div>
                        <FancyButton
                            className="star-system__action star-system__action--zoom-in"
                            backgroundColor="#2b88d9"
                            icon="/images/button-icons/zoom-in.png"
                            tooltip="Zoom in"
                            onClick={(e) => this.adjustZoomLevel(0.2)}
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    }
};