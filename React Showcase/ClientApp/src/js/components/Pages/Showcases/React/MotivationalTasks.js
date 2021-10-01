import React, { Component } from 'react';
import { Task } from '../../../Showcases/MotivationalTasks/Task';
import Spinner from '../../../Util/Spinner';

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
                            "passed-time": 0, //Do I really have to tell you by this point?
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
                            icon: "/images/project-icons/maintenance.png"
                        },
                        title: "Fix Desync issues",
                        description: "Clipping issues, long-distance grabs, sudden eliminations; all contribute to the chagrin of the players. It's high time we fix the issue!",
                        timer: {
                            "total-time": 1209600, //Time is in minutes
                            "goal-time": 864000, //Also in minutes
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
                            icon: "/images/project-icons/maintenance.png"
                        },
                        title: "Port game to the Nintendo Switch",
                        description: "It's about damn time!",
                        timer: {
                            "total-time": 2678400, //Time is in minutes
                            "goal-time": 2160000, //Also in minutes
                            "passed-time": 3600, //Do I really have to tell you by this point?
                        },
                        status: "active"
                    }
                },
                {
                    assignee: {
                        name: "Cloud Bean",
                        profileImg: "/images/profile-images/cloud-bean.png",
                        role: "Someone else's PC",
                        status: "away"
                    },
                    task: {
                        project: {
                            name: "Data accretion",
                            icon: "/images/project-icons/headstand.png"
                        },
                        title: "Observe players",
                        description: "We must have all of the metrics!",
                        timer: {
                            "total-time": 3600, //Time is in minutes
                            "goal-time": 3000, //Also in minutes
                            "passed-time": 3300, //Do I really have to tell you by this point?
                        },
                        status: "active"
                    }
                },
                {
                    assignee: {
                        name: "Peachy Knight",
                        profileImg: "/images/profile-images/peachy-knight.png",
                        role: "Knight of the Bean table",
                        status: "online"
                    },
                    task: {
                        project: {
                            name: "Server Security",
                            icon: "/images/project-icons/security.png"
                        },
                        title: "Hold the door!",
                        description: "Obvious reference.",
                        timer: {
                            "total-time": 3600000000, //Time is in minutes
                            "goal-time": 3600000000, //Also in minutes
                            "passed-time": 1800000000, //Do I really have to tell you by this point?
                        },
                        status: "active"
                    }
                },
                {
                    assignee: {
                        name: "Pooh Bean",
                        profileImg: "/images/profile-images/pooh-bean.png",
                        role: "Rookie",
                        status: "offline"
                    },
                    task: {
                        project: {
                            name: "Learn the game",
                            icon: "/images/project-icons/basic.png"
                        },
                        title: "Practise Main Show",
                        description: "Learn the ropes of the game by playing solo. No need to annoy people in Squad games.",
                        timer: {
                            "total-time": 36000, //Time is in minutes
                            "goal-time": 30000, //Also in minutes
                            "passed-time": 24000, //Do I really have to tell you by this point?
                        },
                        status: "active"
                    }
                }
            ]
        }
    }

    render() {
        if (this.state.tasks === null) return (<Spinner className="initial-spinner" message="Increasing pressure..." />);
        return (
            <div className="content no-background">
                <h1 className="page-title">Motivational Tasks - A showcase</h1>
                <p>
                    Each card represents a task that displays the following:

                </p>
                <ul>
                    <li>User information, such as their name and role/function and if they're online or not</li>
                    <li>The task <strong>(bold)</strong> and project <em>(italic)</em> over a banner</li>
                    <li>A description</li>
                    <li>A timebar which can be (de)activated. Also displays a line which shows the preferable target-time for a task. Changes colour depending how depleted the bar is.</li>
                </ul>
                <div className="tasklist row">
                    {
                        this.state.tasks.map((item, index) => {
                            return (
                                <Task
                                    key={index}
                                    assignee={item.assignee}
                                    details={item.task}
                                />
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}
