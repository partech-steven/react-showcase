import React, { Component } from 'react';

export class Home extends Component {
    render() {
        return (
            <div className="content">
                <h1>Welcome!</h1>
                <p>
                    Welcome to this humble little website where I, Steven Nolles, show off some of my projects in different showcases.
                    <br/> Use the menu above to navigate through the website.
                </p>
                <p>
                    Please note that whilst this website was made using bootstrap it has not been optimized for mobile use. This is due to the fact that one of my projects, Twitter API Integration, contains drag-and-drop functionalities which can be slightly bothersome on mobile.
                    <br/> Should you view this website on a mobile device or tablet, don't be alarmed if things look slightly... out of place.
                </p>
                <p>
                    Am I planning to ever rectify this? Yes.
                    <br />Do I know when? Soon&#8482;
                </p>
            </div>
        );
    }
}
