import React, { Component } from 'react';
import { Task } from '../../../Showcases/MotivationalTasks/Task';
import Spinner from '../../../Util/Spinner';

import './motivational-tasks.css';

export class MotivationalTasks extends Component {
    /**
  * Constructor
  * 
  * @param {*} props 
  */
    constructor(props) {
        super(props);

        this.state = {
            tasks: [
                {
                    assignee: {
                        name: "Golden Hotdog",
                        profileImg: "/images/profile-images/golden-hotdog.png",
                        role: "Glizzy Gang Member",
                        status: "online"
                    },
                    task: {
                        project: {
                            name: "Achieve 'Infallible' status",
                            icon: "/images/project-icons/infallible.png"
                        },
                        title: "Practise Main Show",
                        description: "To better prepare for the ultimate achievement one must learn how to depend only on themselves. Get at least one win on Main Show.",
                        timer: {
                            "total-time": 18000, //Time is in minutes
                            "goal-time": 10800, //Also in minutes
                            "passed-time": 3600, //Do I really have to tell you by this point?
                        },
                        status: "active"
                    }
                },
                {
                    assignee: {
                        name: "Bob the Beander",
                        profileImg: "/images/profile-images/bob-beander.png",
                        role: "Fixer",
                        status: "offline"
                    },
                    task: {
                        project: {
                            name: "Bug Fixing",
                            icon: "/images/project-icons/infallible.png"
                        },
                        title: "Fix Desync issues",
                        description: "Clipping issues, long-distance grabs, sudden eliminations; all contribute to the chagrin of the players. It's high time we fix the issue!",
                        timer: {
                            "total-time": 18000, //Time is in minutes
                            "goal-time": 10800, //Also in minutes
                            "passed-time": 3600, //Do I really have to tell you by this point?
                        },
                        status: "inactive"
                    }
                },
                {
                    assignee: {
                        name: "Bob the Beander",
                        profileImg: "/images/profile-images/bob-beander.png",
                        role: "Fixer",
                        status: "offline"
                    },
                    task: {
                        project: {
                            name: "Porting",
                            icon: "/images/project-icons/infallible.png"
                        },
                        title: "Port game to the Nintendo Switch",
                        description: "It's about damn time!",
                        timer: {
                            "total-time": 18000, //Time is in minutes
                            "goal-time": 10800, //Also in minutes
                            "passed-time": 3600, //Do I really have to tell you by this point?
                        },
                        status: "active"
                    }
                },
                {
                    assignee: {
                        name: "Golden Hotdog",
                        profileImg: "/images/profile-images/golden-hotdog.png",
                        role: "Glizzy Gang Member",
                        status: "online"
                    },
                    task: {
                        project: {
                            name: "Achieve 'Infallible' status",
                            icon: "/images/project-icons/infallible.png"
                        },
                        title: "Practise Main Show",
                        description: "To better prepare for the ultimate achievement one must learn how to depend only on themselves. Get at least one win on Main Show.",
                        timer: {
                            "total-time": 18000, //Time is in minutes
                            "goal-time": 10800, //Also in minutes
                            "passed-time": 3600, //Do I really have to tell you by this point?
                        },
                        status: "active"
                    }
                },
                {
                    assignee: {
                        name: "Golden Hotdog",
                        profileImg: "/images/profile-images/golden-hotdog.png",
                        role: "Glizzy Gang Member",
                        status: "online"
                    },
                    task: {
                        project: {
                            name: "Achieve 'Infallible' status",
                            icon: "/images/project-icons/infallible.png"
                        },
                        title: "Practise Main Show",
                        description: "To better prepare for the ultimate achievement one must learn how to depend only on themselves. Get at least one win on Main Show.",
                        timer: {
                            "total-time": 18000, //Time is in minutes
                            "goal-time": 10800, //Also in minutes
                            "passed-time": 3600, //Do I really have to tell you by this point?
                        },
                        status: "active"
                    }
                },
                {
                    assignee: {
                        name: "Golden Hotdog",
                        profileImg: "/images/profile-images/golden-hotdog.png",
                        role: "Glizzy Gang Member",
                        status: "online"
                    },
                    task: {
                        project: {
                            name: "Achieve 'Infallible' status",
                            icon: "/images/project-icons/infallible.png"
                        },
                        title: "Practise Main Show",
                        description: "To better prepare for the ultimate achievement one must learn how to depend only on themselves. Get at least one win on Main Show.",
                        timer: {
                            "total-time": 18000, //Time is in minutes
                            "goal-time": 10800, //Also in minutes
                            "passed-time": 3600, //Do I really have to tell you by this point?
                        },
                        status: "active"
                    }
                }
            ]
        }
    }

    adjustTasksStatus(index, newStatus, event) {
        let tasks = this.state.tasks;
        tasks[index].task.status = newStatus;

        this.setState({ tasks: tasks });
    }

    render() {
        if (this.state.tasks === null) return (<Spinner className="initial-spinner" message="Increasing pressure..." />);
        return (
            <div className="content no-background">
                <div className="tasklist row">
                    {
                        this.state.tasks.map((item, index) => {
                            return (
                                <Task
                                    key={index}
                                    assignee={item.assignee}
                                    details={item.task}
                                    completeTask={this.adjustTasksStatus.bind(this, index, "complete")}
                                    pauseTask={this.adjustTasksStatus.bind(this, index, "inactive")}
                                    cancelTask={this.adjustTasksStatus.bind(this, index, "cancelled")}
                                />
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}
