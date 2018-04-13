// @flow
import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import styles from './Home.css';

import Header from './Core/Header';
import Sidebar from './Core/Sidebar';
import Welcome from './Core/Welcome';
import Status from './Core/Status';
import ItemList from './Admin/ItemList';
import NewItem from './Admin/NewItem';
import SpawnItem from './Admin/SpawnItem'

// Crafting
import NewRecipe from './Admin/NewRecipe';

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
        <Header />
        <div className={styles.container} id="content" data-tid="container">
          <Switch>
            <Route path="/admin-item-list" component={ItemList} />
            <Route path="/admin-item-new" component={NewItem} />
<<<<<<< HEAD
            <Route path="/admin-item-spawn" component={SpawnItem} />
=======

            <Route path="/admin-crafter-new" component={NewRecipe} />
>>>>>>> c27dbdda34c02922d41b11d0e749c64cc3374f9b
          </Switch>
        </div>
        <Sidebar />
        <Status />
      </div>
    );
  }
}
