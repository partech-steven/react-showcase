import React, { Component } from "react";
import TimeUtil from "../../Utils/TimeUtil";

import './timer.css';

export class Timer extends Component {
    render() {
        let mode = this.props.mode || "fill";
        let progressPercentage = (this.props.passedTime / this.props.totalTime) * 100;
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
                    
                </div>
                <div className="timer__bar">
                    <div className="timer__progress" style={{ width: progressPercentage + "%", backgroundColor: barColour }}></div>
                    <div className="timer__indicator">
                        {TimeUtil.minutesToHoursMinutes(this.props.passedTime, "visual") + " / " + TimeUtil.minutesToHoursMinutes(this.props.totalTime, "visual")}
                    </div>
                    {this.props.goalTime &&
                        <div className="timer__goal" style={{ left: goalTimePercentage + "%" }} >

                        </div>
                    }
                </div>
            </div>
        );
    }
};