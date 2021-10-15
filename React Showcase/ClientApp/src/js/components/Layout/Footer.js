import React, { Component } from 'react';

export class Footer extends Component {
    render() {
        let currentyear = parseInt(new Date().getFullYear());
        let yearNotation = "2021"; //2021 is when I started working here

        //Adjust the yearNotation variable based on the current year
        if (currentyear !== 2021) {
            yearNotation += "-" + currentyear;
        }

        return (
            <footer>
                Made by Steven Nolles @ Partech, {yearNotation}
            </footer>
        );
    }
}
