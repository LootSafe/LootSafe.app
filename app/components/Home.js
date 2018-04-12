// @flow
import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import styles from './Home.css';

import Header from './Core/Header';
import Sidebar from './Core/Sidebar';
import Status from './Core/Status';
import ItemList from './Admin/ItemList';
import NewItem from './Admin/NewItem';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <Header />
        <div className={styles.container} id="content" data-tid="container">
          <Switch>
            <Route path="/admin-item-list" component={ItemList} />
            <Route path="/admin-item-new" component={NewItem} />
          </Switch>
        </div>
        <Sidebar />
        <Status />
      </div>
    );
  }
}
