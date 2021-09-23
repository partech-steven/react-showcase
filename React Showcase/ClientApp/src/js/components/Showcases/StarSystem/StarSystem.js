import React, { Component } from 'react';
import Spinner from '../../Util/Spinner';
import 'seedrandom';

import './star-system.css';

export class StarSystem extends Component {
    /**
  * Constructor
  * 
  * @param {*} props 
  */
    constructor(props) {
        super(props);

        this.state = {
            stellarObjects: null,
            seed: "Generate me a Star System!",
            seedChangedByUser: false,
            zoomLevel: 1,
            simulationRunning: true
        }
    }

    generateStarBackground(min = 256, max = 640) {
        let totalStars = Math.round(min + (Math.random() * 100));
        if (totalStars > max) totalStars = max;

        console.log(totalStars);

        let stars = [];

        for (let i = 0; i < totalStars; i++) {
            let left = Math.random() * 100;
            let top = Math.random() * 100;
            let scale = Math.random();
            stars.push(
                <div
                    className="bg-star"
                    key={"bg-star-" + i}
                    style={{ left: left + "%", top: top + "%", transform: "scale(" + scale + ")" }}
                ></div>
            );
        }

        return (
            <div className="star-system__background" style={{ transform: "translateY(-50%) translateX(-50%) scale(" + this.state.zoomLevel + ")" }}>
                {stars}
            </div>
        );
    }

    getToolbar() {
        return (
            <div className="star-system__toolbar">
                <div className="star-system__toolbar-item">
                    <div className="star-system__toolbar-input">
                        <label htmlFor="seed"><strong><em>Seed </em></strong></label>
                        <input name="seed" value={this.state.seed} onChange={(e) => { }} />
                    </div>
                    <div className="star-system__toolbar-actions">
                        {this.state.seedChangedByUser
                            ? <div className="star-system__action star-system__action--regen-and-refresh">
                                <div className="star-system__action-tooltip">
                                    Regenerate new seed & refresh
                                </div>
                            </div>
                            : <div className="star-system__action star-system__action--refresh">
                                <div className="star-system__action-tooltip">
                                    Refresh
                                </div>
                            </div>
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
        );
    }

    render() {
        let seedrandom = require('seedrandom');
        seedrandom(this.state.seed, { global: true })
        return (
            <div className="star-system">
                {this.getToolbar()}
                {this.generateStarBackground()}
                {this.state.stellarObjects === null && <Spinner className="initial-spinner" message="Generating space..." />}
            </div>
        );
    }
}
