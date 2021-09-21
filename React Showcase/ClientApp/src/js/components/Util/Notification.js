import React, { Component } from "react";

import './notification.css';

class Notification extends Component {
    render() {
        return (
            <div>
                <div className="notification">
                    <em>{this.props.message && this.props.message}</em>
                </div>
            </div>
        );
    }
};

export default Notification;