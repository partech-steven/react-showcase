import React, { Component } from 'react';
import { NavMenu } from './Layout/NavMenu';
import { Footer } from './Layout/Footer';

export class Layout extends Component {
  static displayName = Layout.name;

    render () {
        return (
            <div className="le-content">
                <NavMenu />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}
