import React, { Component } from 'react';
import { Spinner } from '../../Util/Spinner';
import 'seedrandom';

import './star-system.css';
import { Toolbar } from './Toolbar';

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

    shouldComponentUpdate(newProps, newState) {
        let shouldUpdate = true;

        if (this.state.seed !== newState.seed && newState.seedChangedByUser) shouldUpdate = false;

        return shouldUpdate;
    }

    generateStarBackground(min = 512, max = 1280) {
        let totalStars = Math.round(min + (Math.random() * 100));
        if (totalStars > max) totalStars = max;

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

    //Generate a new randomised string
    refreshSystem(e, generateNewSeed = !this.state.seedChangedByUser) {
        let newState = { seedChangedByUser: false };
        if (generateNewSeed) {
            let result = '';
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?@#$%^&*()[]{}:;';
            let charactersLength = characters.length;
            for (let i = 0; i < Math.round(Math.random() * 100); i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }

            newState.seed = result
        }
        
        this.setState(newState);
    }

    seedChange(e, seed, seedChangedByUser) {
        if (this.state.seed !== seed) {
            this.setState({ seed: seed, seedChangedByUser: seedChangedByUser });
        }
    }

    adjustZoomLevel(e, zoomLevel) {
        this.setState({ zoomLevel: zoomLevel });
    }

    toggleSimulation() {
        this.setState({ simulationRunning: !this.state.simulationRunning });
    }

    getToolbar() {
        return (
            <div className="star-system__toolbar">
                <Toolbar
                    seed={this.state.seed}
                    seedChangedByUser={this.state.seedChangedByUser}
                    zoomLevel={this.state.zoomLevel}
                    onSeedChange={(e, seed, seedChangedByUser) => this.seedChange(e, seed, seedChangedByUser)}
                    refreshSystem={(e, generateNewSeed) => this.refreshSystem(e, generateNewSeed)}
                    adjustZoomLevel={(e, zoomLevel) => this.adjustZoomLevel(e, zoomLevel)}
                    toggleSimulation={(e) => this.toggleSimulation()}
                />
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
