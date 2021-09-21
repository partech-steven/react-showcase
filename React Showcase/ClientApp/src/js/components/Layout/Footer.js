import React, { Component } from 'react';
import './footer.css';

export class Footer extends Component {
    render() {
        let currentyear = parseInt(new Date().getFullYear());

        return (
            <footer>
                Made by Steven Nolles @ Partech, {currentyear === 2021 ? currentyear : "2021-" + currentyear}
            </footer>
        );
    }
}
