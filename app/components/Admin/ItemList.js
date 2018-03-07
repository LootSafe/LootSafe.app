// @flow
import React, { Component } from 'react';

export default class ItemList extends Component {
  render() {
    return (
      <div id="wtf">
        <table>
          <tr className="table-heading">
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Age</th>
          </tr>
          <tr>
            <td>Jill</td>
            <td>Smith</td>
            <td>50</td>
          </tr>
          <tr>
            <td>Eve</td>
            <td>Jackson</td>
            <td>94</td>
          </tr>
        </table>
      </div>
    );
  }
}
