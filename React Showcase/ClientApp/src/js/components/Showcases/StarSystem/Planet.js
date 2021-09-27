import React, { Component } from "react";

import './planet.css';

export class Planet extends Component {
    /**
  * Constructor
  * 
  * @param {*} props 
  */
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            properties: {
                classification: "",
                hibatable: false,
                popuplation: 0,
                temperature: {
                    celcius: 0,
                    kelvin: 0,
                    fahrenheit: 0
                },
                diameter: 0,
                circumference: 0,
                spin: 0,
                mass: 0,
                density: 0,
                distanceToStar: 0, //In AU
            },
            neighbors: [] //Store only name and distance in AU here
        }
    }

    render() {
        return (
            <div className="star">
                I'm a brick, HOUWSE!
            </div>
        );
    }
};