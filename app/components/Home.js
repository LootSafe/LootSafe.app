// @flow
import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import styles from './Home.css';

import Admin from './Admin';

import Header from './Core/Header';
import Welcome from './Core/Welcome';
import Status from './Core/Status';

type Props = {};

export default class Home extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      showWelcome: false
    };
  }
  componentWillMount() {
    if (!localStorage.getItem('apiurl')) {
      this.setState({
        showWelcome: true
      });
      console.warn('API ADDRESS NOT SET!');
    }
    if (!localStorage.getItem('apikey')) {
      this.setState({
        showWelcome: true
      });
      console.warn('API KEY MISSING!');
    }
  }

  render() {
    return (
      <div>
        {
          this.state.showWelcome &&
          <Welcome
            close={() => {
              this.setState({
                showWelcome: false
              });
              window.location.reload();
            }}
          />
        }

        { !this.state.showWelcome &&
          <div>
            <Header />
            <Switch>
              { /* ADMIN ROUTES */ }
              <Route path="/" exact component={Admin} />
              <Route path="/admin-item-list" component={Admin} />
              <Route path="/admin-item-new" component={Admin} />
              <Route path="/admin-item-spawn" component={Admin} />
              <Route path="/admin-crafter-new" component={Admin} />
              <Route path="/admin-crafter-deconstruction-new" component={Admin} />
              <Route path="/admin-crafter-craftables" component={Admin} />
              <Route path="/admin-crafter-deconstructables" component={Admin} />
              <Route path="/admin-lootbox-add" component={Admin} />
              <Route path="/admin-lootbox-chances" component={Admin} />
              <Route path="/admin-lootbox-cost" component={Admin} />
              <Route path="/admin-lootbox-lootables" component={Admin} />
              { /* TRADE ROUTES */ }
            </Switch>
            <Status />
          </div>
        }
      </div>
    );
  }
}
