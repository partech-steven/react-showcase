import React, { Component } from "react";
import ColoursUtil from "../../../Utils/ColoursUtil";
import RandomNumUtil from "../../../Utils/RandomNumUtil";
import { Spinner } from "../../Util/Spinner";

import './star.css';

export class Star extends Component {
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
                colour: "#f0f",
                temperature: {
                    celcius: 0,
                    kelvin: 0,
                    fahrenheit: 0
                },
                measurements: {
                    radius: 0,
                    diameter: 0,
                    circumference: 0,
                    volume: 0,
                    mass: 0,
                    density: 0
                }
            }
        }
    }

    componentDidMount() {
        this.generate();
    }

    /**
     * Generating stars via the Harvard Spectral Classification:
     * https://en.wikipedia.org/wiki/Stellar_classification#Harvard_spectral_classification
     * */
    generate() {
        let star = this.state;
        let classLetters = ["O", "B", "A", "F", "G", "K", "M"]

        /** 
         *  Temperatures: in kelvin, as per the wiki article
         *  Mass: In solar masses
         *  Radius: In solar radii
         */
        let classes = {
            "O": {
                minTemp: 30000,
                maxTemp: 60000,
                minMass: 16,
                maxMass: 32,
                minRadius: 6.6,
                maxRadius: 13.2,
                minColour: "#9bb0ff",
                maxColour: "#92B5FF"
            },
            "B": {
                minTemp: 10000,
                maxTemp: 30000,
                minMass: 2.1,
                maxMass: 16,
                minRadius: 1.8,
                maxRadius: 6.6,
                minColour: "#aabfff",
                maxColour: "#A2C0FF"
            },
            "A": {
                minTemp: 7500,
                maxTemp: 10000,
                minMass: 1.4,
                maxMass: 2.1,
                minRadius: 1.4,
                maxRadius: 1.8,
                minColour: "#cad7ff",
                maxColour: "#D5E0FF"
            },
            "F": {
                minTemp: 6000,
                maxTemp: 7500,
                minMass: 1.04,
                maxMass: 1.4,
                minRadius: 1.15,
                maxRadius: 1.4,
                minColour: "#f8f7ff",
                maxColour: "#F9F5FF"
            },
            "G": {
                minTemp: 5200,
                maxTemp: 6000,
                minMass: 0.8,
                maxMass: 1.04,
                minRadius: 0.96,
                maxRadius: 1.15,
                minColour: "#fff4ea",
                maxColour: "#FFEDE3"
            },
            "K": {
                minTemp: 3700,
                maxTemp: 5200,
                minMass: 0.45,
                maxMass: 0.8,
                minRadius: 0.7,
                maxRadius: 0.96,
                minColour: "#ffd2a1",
                maxColour: "#FFDAB5"
            },
            "M": {
                minTemp: 2400,
                maxTemp: 3700,
                minMass: 0.08,
                maxMass: 0.45,
                minRadius: 0.2,
                maxRadius: 0.7,
                minColour: "#ffcc6f",
                maxColour: "#FFB56C"
            }
        };

        star.properties.classification = classLetters[Math.round(Math.random() * (classLetters.length - 1))];
        let starSettings = classes[star.properties.classification];

        //Temperatures
        star.properties.temperature.kelvin = RandomNumUtil.getBetween(starSettings.minTemp, starSettings.maxTemp);
        star.properties.temperature.celcius = star.properties.temperature.kelvin - 273.15;
        star.properties.temperature.fahrenheit = star.properties.temperature.kelvin * (9 / 5) + 32;

        //Spacial measurements
        star.properties.measurements.radius = RandomNumUtil.getBetween(starSettings.minRadius, starSettings.maxRadius);
        star.properties.measurements.diameter = star.properties.measurements.radius * 2;
        star.properties.measurements.circumference = star.properties.measurements.diameter * Math.PI;
        star.properties.measurements.mass = RandomNumUtil.getBetween(starSettings.minMass, starSettings.maxMass);
        star.properties.measurements.volume = (4 / 3) * Math.PI * (Math.pow(star.properties.measurements.radius, 3));
        star.properties.measurements.density = star.properties.measurements.mass / star.properties.measurements.volume;

        //Misc.
        star.properties.colour = ColoursUtil.getBetween(starSettings.minColour, starSettings.maxColour);

        this.setState({ ...star })
    }

    render() {
        console.log(this.state);
        return (
            this.state.classification === ""
                ? <Spinner key="star-spinner" message="A star is being born..." />
                : <div
                    className="star"
                    key="star"
                    style={{
                        backgroundColor: this.state.properties.colour,
                        transform: "translateX(-50%) translateY(-50%) scale(" + this.state.properties.measurements.diameter + ")"
                    }}
                >
                </div>
        );
    }
};