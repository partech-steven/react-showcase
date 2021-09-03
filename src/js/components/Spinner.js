import React, { Component } from "react";

class Spinner extends Component {
    /**
     * Constructor
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
              <div className="spinnyboi">
                  <em>{this.props.message && this.props.message}</em>
                </div>
            </div>
        );
    }
};

export default Spinner;