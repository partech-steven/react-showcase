import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Pages/Home';
import { Showcases } from './components/Pages/Showcases';

/*React showcases*/
import { ReactShowcases } from './components/Pages/Showcases/ReactShowcases';
import { Twitter } from './components/Pages/Showcases/React/Twitter';

export default class App extends Component {
  static displayName = App.name;

    render () {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route exact path='/showcases' component={Showcases} />
                <Route exact path='/showcases/react' component={ReactShowcases} />
                <Route exact path='/showcases/react/twitter-dragdrop' component={Twitter}/>
            </Layout>
        );
    }
}
