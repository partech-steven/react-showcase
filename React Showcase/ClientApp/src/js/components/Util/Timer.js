import React, { Component } from "react";
import TimeUtil from "../../Utils/TimeUtil";

import './timer.css';

export class Timer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            timerRunning: false,
            passedTime: 0,
            intervalSet: false
        };
    }

    componentDidMount() {
        this.setState({ passedTime: this.props.passedTime, intervalSet: true });
    }

    shouldComponentUpdate(newProps, newState) {
        let self = this;

        if (this.state.intervalSet !== newState.intervalSet && this.state.intervalSet === false) {
            setInterval(function () {
                if (self.state.timerRunning && self.state.passedTime < self.props.totalTime) self.setState({ passedTime: self.state.passedTime + 1 });
            }, 10)
        }

        return true;
    }

    toggleProgress() {
        this.setState({
            timerRunning: !this.state.timerRunning
        });
    }

    render() {
        let mode = this.props.mode || "fill";
        let progressPercentage = (this.state.passedTime / this.props.totalTime) * 100;
        let goalTimePercentage = (this.props.goalTime) ? (this.props.goalTime / this.props.totalTime) * 100 : 0;
        let barColour = "#3aac00";

        //Change colour of the bar depending on progress
        if (this.props.goalTime) if (goalTimePercentage - progressPercentage <= 20) { barColour = "#d9a93c"; } //Close to goal!
        if (this.props.goalTime) if (progressPercentage > goalTimePercentage) { barColour = "#d30000" } //Overtime!

        //Reverse the bars
        if (mode === "empty-out") {
            progressPercentage = 100 - progressPercentage;
            if (this.props.goalTime) goalTimePercentage = 100 - goalTimePercentage;
        }

        return (
            <div className={"timer timer--" + mode}>
                <div className="timer__controls">
                    {!this.state.timerRunning
                        ? <div className="timer-control timer-control--start" onClick={(e) => this.toggleProgress()}></div>
                        : <div className="timer-control timer-control--pause" onClick={(e) => this.toggleProgress()}></div>
                    }
                </div>
                <div className="timer__bar">
                    <div className="timer__progress" style={{ width: (progressPercentage + 2) + "%", backgroundColor: barColour }}></div>
                    <div className="timer__indicator">
                        {TimeUtil.minutesToHoursMinutes(this.state.passedTime, "visual") + " / " + TimeUtil.minutesToHoursMinutes(this.props.totalTime, "visual")}
                    </div>
                    {(this.props.goalTime && goalTimePercentage > 0) && [
                        <div key="goal" className="timer__goal" style={{ left: "calc(" + goalTimePercentage + "% - 1em)" }} >

                        </div>,
                        <div key="goal-info" className="timer__goal-info" style={{ left: "calc(" + (goalTimePercentage + "% + " + 8 + "px)")}} >
                            {"Expected goal: " + TimeUtil.minutesToHoursMinutes(this.props.goalTime, "visual")}
                        </div>
                    ]}
                </div>
            </div >
        );
    }
};