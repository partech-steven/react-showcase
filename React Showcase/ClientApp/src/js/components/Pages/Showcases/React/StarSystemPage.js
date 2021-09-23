import React, { Component } from 'react';
import { StarSystem } from '../../../Showcases/StarSystem/StarSystem';

import './star-system-page.css';

export class StarSystemPage extends Component {
    render() {
        return (
            <div className="content content--star-system-page">
                <StarSystem />
            </div>
        );
    }
}
