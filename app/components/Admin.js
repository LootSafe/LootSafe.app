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
import SpawnItem from './Admin/SpawnItem';

// Crafting
import NewRecipe from './Admin/NewRecipe';
import NewDeconstructionRecipe from './Admin/NewDeconstructionRecipe';
import Craftables from './Admin/Craftables';
import Deconstructables from './Admin/Deconstructables';

// Lootbox
import AddLootable from './Admin/AddLootable';
import UpdateChances from './Admin/UpdateChances';
import UpdateCost from './Admin/UpdateCost';
import Lootables from './Admin/Lootables';

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
        <div className={styles.container} id="content" data-tid="container">
          <Switch>
            <Route path="/" exact component={ItemList} />
            <Route path="/admin-item-list" component={ItemList} />
            <Route path="/admin-item-new" component={NewItem} />
            <Route path="/admin-item-spawn" component={SpawnItem} />
            <Route path="/admin-crafter-new" component={NewRecipe} />
            <Route path="/admin-crafter-deconstruction-new" component={NewDeconstructionRecipe} />
            <Route path="/admin-crafter-craftables" component={Craftables} />
            <Route path="/admin-crafter-deconstructables" component={Deconstructables} />
            <Route path="/admin-lootbox-add" component={AddLootable} />
            <Route path="/admin-lootbox-chances" component={UpdateChances} />
            <Route path="/admin-lootbox-cost" component={UpdateCost} />
            <Route path="/admin-lootbox-lootables" component={Lootables} />
          </Switch>
        </div>
        <Sidebar />
      </div>
    );
  }
}
