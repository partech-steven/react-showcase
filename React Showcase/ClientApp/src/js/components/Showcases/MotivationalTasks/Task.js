import React, { Component } from "react";
import { Timer } from "../../Util/Timer";

import './task.css';

export class Task extends Component {
    render() {
        let assignee = this.props.assignee;
        let task = this.props.details;

        return (
            <div className={"task col-sm-12 col-md-4 task--" + task.status}>
                <div className="task-container">
                    <div className="task__header">
                        <div className={"task__user task__user--" + assignee.status}>
                            <div className="task__user-img">
                                {(assignee.profileImg && <img src={assignee.profileImg} alt="profile-img" />)}
                            </div>
                            <div className="task__user-name">[{assignee.name}]</div>
                            <div className="task__user-role">&lt;{assignee.role}&gt;</div>
                        </div>
                        <div className="task__details">
                            <div className="task__title"><strong>{task.title}</strong></div>
                            <div className="task__title"><em>{task.project.name}</em></div>
                        </div>
                        <img className="task__logo" src={task.project.icon} alt="logo" />
                    </div>
                    <div className="task__content">
                        {task.description}
                    </div>
                    <div className="task__timer">
                        <Timer
                            totalTime={task.timer['total-time']}
                            goalTime={task.timer['goal-time']}
                            passedTime={task.timer['passed-time']}
                            mode={"empty-out"}
                        />
                    </div>
                </div>
            </div>
        );
    }
};