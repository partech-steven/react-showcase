import React, { Component } from 'react';
import { InteractiveTile } from '../../Util/InteractiveTile';

export class ReactShowcases extends Component {
    /**
  * Constructor
  * 
  * @param {*} props 
  */
    constructor(props) {
        super(props);

        this.state = {
            tiles: [
                {
                    title: "Twitter API Integration",
                    subtitle: "With drag-and-drop",
                    hotlink: "/showcases/react/twitter-dragdrop",
                    description: "A small in-house assignment to initially create a showcase with: A simple Twitter-API integration using ASP.Net and a frontend made with React.",
                    backgroundImage: "/images/showcase-tile-backgrounds/react/twitter_bg.png",
                    releaseDate: "13-09-2021",
                    version: "1.1.0"
                },
                {
                    title: "TCGBox",
                    subtitle: "Create and print MtG Proxies",
                    hotlink: "https://tcgbox.stevennolles.nl",
                    description: "Originally created when my go-to MtG Proxy website hadn't received an update in almost a year: TCGBox is a small app that allows Magic: The Gathering players to create proxies for cards they wish to try in their decks before buying them. \
                                  The frontend is made in React/jQuery and the backend was done using PHP with Symfony/Doctrine",
                    backgroundImage: "/images/showcase-tile-backgrounds/react/tcgbox_bg.png",
                    releaseDate: "24-04-2021",
                    version: "1.2.1"
                },
                {
                    title: "Motivational Tasks",
                    subtitle: "Let the pressure of a passing timebar motivate you",
                    hotlink: "/showcases/react/motivational-tasks",
                    description: "Nothing motivates a person more than seeing a timebar fill, or empty out, at breakneck speed (note: depends on the time available). Hence these little cards are there to motivate one to finish their tasks before the timer runs out.",
                    backgroundImage: "/images/showcase-tile-backgrounds/react/motivational-tiles_bg.png",
                    releaseDate: "22-09-2021",
                    version: "1.0.0"
                }
            ]
        }
    }

    render() {
        return (
            <div className="content">
                <h1 className="page-title">React Showcase</h1>
                <div className="page-text">
                    <p>
                        Below is a gallery of all the different showcases and tiny projects I've worked on.
                        <br />Hover over a tile to see a short description, click on it to go to the corresponding page.
                    </p>
                </div>
                <div className="showcase-tiles row">
                    {this.state.tiles.map((item, key) =>
                        <InteractiveTile
                            key={key}
                            props={item}
                            className={"col-sm-12 col-md-4"}
                        />
                    )}
                </div>
            </div>
        );
    }
}
