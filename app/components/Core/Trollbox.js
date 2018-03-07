// @flow
import React, { Component } from 'react';

export default class Trollbox extends Component {
  render() {
    return (
      <div id="trollbox">
        <div className="tb-header">
          <p>Trollbox</p>
        </div>
        <div className="tb-content">
          Matt: Welcome!
        </div>
        <div className="tb-text">
          <input type="text" placeholder="say something nice!" />
          <button>
            send
          </button>
        </div>
      </div>
    );
  }
}
