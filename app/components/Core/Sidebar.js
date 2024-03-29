// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Trollbox from './Trollbox';

export default class Sidebar extends Component {
  render() {
    return (
      <div id="sidebar">
        <div id="menu">
          <h3 className="section-header">Core</h3>
          <ul>
            <li>
              <Link to="/admin-item-list">List Items</Link>
            </li>
            <li>
              <Link to="/admin-item-new">New Item</Link>
            </li>
            <li>
              <Link to="/admin-item-spawn">Distribute Item</Link>
            </li>
          </ul>
          <h3 className="section-header">Crafter</h3>
          <ul>
            <li>
              <Link to="/admin-crafter-new">Add Recipe</Link>
            </li>
            <li>
              <Link to="/admin-crafter-deconstruction-new">Add Deconstruction</Link>
            </li>
            <li>
              <Link to="/admin-crafter-craftables">Craftables</Link>
            </li>
            <li>
              <Link to="/admin-crafter-deconstructables">Deconstructables</Link>
            </li>
          </ul>
          <h3 className="section-header">LootBox</h3>
          <ul>
            <li>
              <Link to="/admin-lootbox-add">Add Item</Link>
            </li>
            <li>
              <Link to="/admin-lootbox-lootables">Lootables</Link>
            </li>
            <li>
              <Link to="/admin-lootbox-chances">Update Chances</Link>
            </li>
            <li>
              <Link to="/admin-lootbox-cost">Update Cost</Link>
            </li>
          </ul>
        </div>
        <Trollbox />
      </div>
    );
  }
}
