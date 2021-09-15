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
                    title: "Twitter API",
                    subtitle: "With drag-and-drop",
                    hotlink: "/showcases/react/twitter-dragdrop",
                    description: "Lorem Ipsum and stuff"
                },
                {
                    title: "TCGBox",
                    subtitle: "Create and print MtG Proxies",
                    hotlink: "https://tcgbox.stevennolles.nl",
                    description: "Stuff and stuff and stuff",
                    backgroundImage: "/images/showcase-tile-backgrounds/react/tcgbox_bg.png"
                }
            ]
        }
    }

    render() {
        return (
            <div className="content">
                <h1>React Showcase</h1>
                <p>
                    Below is a gallery of all the different showcases and tiny projects I've worked on.
                    <br />Hover over a tile to see a short description, click on it to go to the corresponding page.
                </p>
                <div className="showcase-tiles row">
                    {this.state.tiles.map((item, key) =>
                        <InteractiveTile
                            key={key}
                            title={item.title}
                            subtitle={(item.subtitle ? item.subtitle : "")}
                            description={(item.description ? item.description : "")}
                            hotlink={(item.hotlink ? item.hotlink : "")}
                            backgroundImage={(item.backgroundImage ? item.backgroundImage : "")}
                            className={"col-sm-12 col-md-4"}
                        />
                    )}
                </div>
            </div>
        );
    }
}
