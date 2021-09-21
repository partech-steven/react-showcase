import React, { Component } from "react";

import './task.css';

export class Task extends Component {

    completeTask(event) {
        this.props.completeTask(event);
    }

    pauseTask(event) {
        this.props.pauseTask(event);
    }

    cancelTask(event) {
        this.props.cancelTask(event);
    }

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
                        Here be timer
                    </div>
                    <div className="task__actions row">
                        <button className="task__action task__action--complete col-sm-12" onClick={(e) => this.completeTask(e)}>It's done. It's finally over.</button>
                        <button className="task__action task__action--pause col-sm-12 col-md-6" onClick={(e) => this.pauseTask(e)}>Just a small break...</button>
                        <button className="task__action task__action--cancel col-sm-12 col-md-6" onClick={(e) => this.cancelTask(e)}>I give up!</button>
                    </div>
                </div>
            </div>
        );
    }
};