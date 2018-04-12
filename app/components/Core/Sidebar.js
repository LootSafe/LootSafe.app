// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Trollbox from './Trollbox';

export default class Sidebar extends Component {
  render() {
    return (
      <div id="sidebar">
        <h3 className="section-header">Core</h3>
        <ul>
          <li>
            <Link to="/admin-item-list">List Items</Link>
          </li>
          <li>
            <Link to="/admin-item-new">New Item</Link>
          </li>
          <li>Distribute Item</li>
          <li>Burn Items</li>
        </ul>
        <Trollbox />
      </div>
    );
  }
}
