import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './js/components/Layout';
import { Home } from './js/components/Pages/Home';
import { ReactShowcases } from './js/components/Pages/Showcases/ReactShowcases';
import { Twitter } from './js/components/Pages/Showcases/React/Twitter';
import { MotivationalTasks } from './js/components/Pages/Showcases/React/MotivationalTasks';

export default class App extends Component {
  static displayName = App.name;

    render () {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route exact path='/showcases/react' component={ReactShowcases} />
                <Route exact path='/showcases/react/twitter-dragdrop' component={Twitter} />
                <Route exact path='/showcases/react/motivational-tasks' component={MotivationalTasks} />
            </Layout>
        );
    }
}
