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
            <li>Distribute Item</li>
          </ul>
          <h3 className="section-header">Crafter</h3>
          <ul>
            <li>
              <Link to="/admin-crafter-new">Add Recipe</Link>
            </li>
            <li>
              <Link to="/admin-crafter-deconstruction">Add Deconstruction</Link>
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
              <Link to="/admin-item-list">Add Item</Link>
            </li>
            <li>
              <Link to="/admin-item-new">Lootables</Link>
            </li>
            <li>
              <Link to="/admin-item-new">Update Chances</Link>
            </li>
            <li>
              <Link to="/admin-item-new">Update Cost</Link>
            </li>
          </ul>
        </div>
        <Trollbox />
      </div>
    );
  }
}
